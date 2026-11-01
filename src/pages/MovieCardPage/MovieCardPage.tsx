import { useState } from "react";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../api/qyeryClient";
import { genreDataList } from "../../data/data";
import { FavoriteIcon } from "../../styles/icons/FavoriteIcon/FavoriteIcon";
import { addMovieToFavorites } from "../../api/Movie";
import { Movie } from "../../api/ValidationSchema";
import placeholderImage from "../../styles/images/Poster-fail-horizontal.png";
import { CheckedFavoriteIcon } from "../../styles/icons/CheckedFavoriteIcon/CheckedFavoriteIcon";
import { FavoriteIconType } from "../../types/Types";
import { openAuthModal } from "../../store/slices/authSlice";
import { openTrailerModal } from "../../store/slices/trailerSlice";

import style from "./MovieCardPage.module.scss";

export type MovieCardPageProp = {
    movie: Movie;
}

export const MovieCardPage = ({ movie }: MovieCardPageProp) => {
    const dispatch = useDispatch(); 
    const [icon, setIcon] = useState<FavoriteIconType>('inActive');
 
    const favoriteAddMutation = useMutation({
        mutationFn: (id: string) => addMovieToFavorites(id),
        mutationKey: ['favorites', 'add']
    }, queryClient);

    const handleAddToFavorite = (id: string) => {
        if(favoriteAddMutation.status === 'error') {
            dispatch(openAuthModal());
        }

        setIcon('active');
        favoriteAddMutation.mutate(id);
    }

    return (
        <div className={style.movieCard}>
            <div className={style.movieCard__container}>
                <div className={style.movieCard__wrapper}>
                    <div className={style.movieCard__info}>
                        <div className={style.movieCard__rating}>
                            <p className={style.movieCard__ratingValue}>★ {movie.tmdbRating}</p>
                            <p className={style.movieCard__year}>{movie.releaseYear}</p>
                            <p className={style.movieCard__genre}>{movie.genres?.[0] && genreDataList[movie.genres[0]] ? genreDataList[movie.genres[0]].name : "Жанр не указан"}</p>
                            <p className={style.movieCard__duration}>{Math.floor(movie.runtime / 60)}ч {movie.runtime % 60}мин</p>
                        </div>
                        <h1 className={style.movieCard__title}>{movie.title}</h1>
                        <p className={style.movieCard__description}>{movie.plot}</p>
                        <div className={style.movieCard__buttons}>
                            <button
                                className={style.movieCard__btn}
                                onClick={() => dispatch(openTrailerModal(movie.trailerUrl))}
                            >
                                Трейлер
                            </button>
                            <button 
                                className={`${style.movieCard__btn} ${style.movieCard__btnFavorite}`}
                                onClick={() => handleAddToFavorite(`${movie.id}`)}
                            >
                                {icon === 'inActive' ? <FavoriteIcon /> : <CheckedFavoriteIcon />}
                            </button>
                        </div>
                    </div>
                    <div className={style.movieCard__poster}>
                        <img src={movie.backdropUrl !== null ? movie.backdropUrl : placeholderImage} alt="Movie Poster" />
                    </div>
                </div>
                <div className={style.movieCard__about}>
                    <div className={style.movieCard__aboutBox}>
                        <h2 className={style.movieCard__aboutTitle}>О фильме</h2>
                        <dl className={style.movieCard__infoList}>
                            <div className={style.movieCard__row}>
                                <dt className={style.movieCard__label}>Язык оригинала</dt>
                                <dd className={style.movieCard__value}>{movie.language === "en" ? "Английский" : "Русский"}</dd>
                            </div>
                            <div className={style.movieCard__row}>
                                <dt className={style.movieCard__label}>Бюджет</dt>
                                <dd className={style.movieCard__value}>{movie.budget > 0 ? movie.budget + "$" : "Неизвестно"}</dd>
                            </div>
                            <div className={style.movieCard__row}>
                                <dt className={style.movieCard__label}>Выручка</dt>
                                <dd className={style.movieCard__value}>{movie.revenue > 0 ? movie.revenue + "$" : "Неизвестно"}</dd>
                            </div>
                            <div className={style.movieCard__row}>
                                <dt className={style.movieCard__label}>Режиссёр</dt>
                                <dd className={style.movieCard__value}>{movie.director !== null ? movie.director : "Неизвестно"}</dd>
                            </div>
                            <div className={style.movieCard__row}>
                                <dt className={style.movieCard__label}>Продакшен</dt>
                                <dd className={style.movieCard__value}>{movie.production !== null ? movie.production : "Неизвестно"}</dd>
                            </div>
                            <div className={style.movieCard__row}>
                                <dt className={style.movieCard__label}>Награды</dt>
                                <dd className={style.movieCard__value}>{movie.awardsSummary !== null ? movie.awardsSummary : "Неизвестно"}</dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
};