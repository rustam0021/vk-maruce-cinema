import { FC, useState, useRef, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { searchMovies } from '../../api/Movie'; 
import { useDebounce } from '../../hooks/hooks';
import { genreDataList } from '../../data/data';
import { Movie } from '../../types/Types';

import style from './Search.module.scss';

export const Search: FC = () => {
    const [searchValue, setSearchValue] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    
    const searchRef = useRef<HTMLDivElement>(null);
    const debouncedSearch = useDebounce(searchValue, 300);

    const { data: movies, isFetching } = useQuery<Movie[]>({
        queryKey: ['movies', 'search', debouncedSearch],
        queryFn: () => searchMovies(debouncedSearch),
        enabled: debouncedSearch.trim().length > 0,
    });

    // Закрытие при клике ВНЕ компонента
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Закрытие по нажатию Esc (активно только когда меню открыто)
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsOpen(false);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    const handleClear = () => {
        setSearchValue('');
        setIsOpen(false);
    };

    // Вспомогательная функция для безопасного форматирования времени
    const formatRuntime = (runtime?: number) => {
        if (!runtime) return null;
        const hours = Math.floor(runtime / 60);
        const minutes = runtime % 60;
        return `${hours}ч ${minutes}мин`;
    };

    // Вспомогательная функция для получения названия жанра
    const getGenreName = (genreId?: string) => {
        if (!genreId) return null;
        return genreDataList[genreId]?.name || null;
    };

    return (
        <div className={style.searchPanel} ref={searchRef}>
            <div className={style.search}>
                <input
                    type="text"
                    className={style.search__input}
                    placeholder="Поиск"
                    value={searchValue}
                    onFocus={() => setIsOpen(true)} 
                    onChange={(e) => {
                        setSearchValue(e.target.value);
                        setIsOpen(true);
                    }}
                />
                
                {searchValue && (
                    <button 
                        className={style.search__clearBtn} 
                        onClick={handleClear} 
                        type="button"
                        aria-label="Очистить поиск"
                    >
                        ✕
                    </button>
                )}
            </div>

            {isOpen && debouncedSearch.trim().length > 0 && (
                <div className={style.search__results}>
                    {isFetching && <div className={style.search__status}>Загрузка...</div>}

                    {!isFetching && movies && movies.length === 0 && (
                        <div className={style.search__status}>Ничего не найдено</div>
                    )}

                    {!isFetching && movies && movies.length > 0 && (
                        <ul className={style.search__resultsList}>
                            {movies.map((movie) => {
                                const genreName = getGenreName(movie.genres?.[0]);
                                const formattedRuntime = formatRuntime(movie.runtime);

                                return (
                                    <li key={movie.id} className={style.search__resultsItem}>
                                        <Link 
                                            to={`/movie/${movie.id}`} 
                                            onClick={handleClear}
                                            className={style.resultsItemLink}
                                        >
                                            <img 
                                                className={style.resultsItemImg} 
                                                src={movie.posterUrl || movie.backdropUrl || ''} 
                                                alt={movie.title}
                                            />
                                            <div className={style.resultsItemWrapper}>
                                                <div className={style.resultsItemData}>
                                                    {movie.tmdbRating && (
                                                        <p className={style.resultsItemRatingValue}>★ {movie.tmdbRating}</p>
                                                    )}
                                                    {movie.releaseYear && (
                                                        <p className={style.resultsItemYear}>{movie.releaseYear}</p>
                                                    )}
                                                    {genreName && (
                                                        <p className={style.resultsItemGenre}>{genreName}</p>
                                                    )}
                                                    {formattedRuntime && (
                                                        <p className={style.resultsItemDuration}>{formattedRuntime}</p>
                                                    )}
                                                </div>
                                                <h3 className={style.resultsItemTitle}>{movie.title}</h3>
                                            </div>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
};