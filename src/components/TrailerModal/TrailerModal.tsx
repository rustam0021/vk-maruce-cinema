import { FC, useEffect, useRef } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { useAppSelector } from '../../store/hooks';
import { closeTrailerModal } from '../../store/slices/trailerSlice';

import style from './TrailerModal.module.scss';

const getEmbedUrl = (url: string | null): string => {
    if (!url) return '';
    
    // Если ссылка уже правильного формата embed
    if (url.includes('/embed/')) return url;

    // Конвертируем https://www.youtube.com/watch?v=ID
    if (url.includes('watch?v=')) {
        const videoId = url.split('watch?v=')[1]?.split('&')[0];
        return `https://www.youtube.com/embed/${videoId}`;
    }

    // Конвертируем короткую ссылку https://youtu.be/ID
    if (url.includes('youtu.be/')) {
        const videoId = url.split('youtu.be/')[1]?.split('?')[0];
        return `https://www.youtube.com/embed/${videoId}`;
    }

    return url;
};

export const TrailerModal: FC = () => {
    const dispatch = useAppDispatch();
    const { isOpen, trailerUrl } = useAppSelector((state) => state.trailer);
    const dialogRef = useRef<HTMLDialogElement | null>(null);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (isOpen) {
            dialog.showModal();
        } else {
            dialog.close();
        }
    }, [isOpen]);

    const handleClose = () => {
        dispatch(closeTrailerModal());
    };

    const handleCancel = (event: React.SyntheticEvent<HTMLDialogElement, Event>) => {
        event.preventDefault();
        handleClose();
    };

    const handleBackdropClick = (event: React.MouseEvent<HTMLDialogElement>) => {
        if (event.target === dialogRef.current) {
            handleClose();
        }
    };

    if (!isOpen || !trailerUrl) return null;

    return (
        <dialog
            ref={dialogRef} 
            onCancel={handleCancel} 
            onClick={handleBackdropClick}
            className={style.trailerModal}
        >
            <div className={style.trailerModal__content}>
                <button
                    className={style.trailerModal__closeBtn}
                    type='button'
                    onClick={() => dispatch(closeTrailerModal())}
                >
                    ✕
                </button>

                <div className={style.trailerModal__iframeWrapper}>
                    <iframe
                        src={getEmbedUrl(trailerUrl)}
                        title="Трейлер фильма"  
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                    />
                </div>
            </div>
        </dialog>
    );
};