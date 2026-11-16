import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../../api/qyeryClient";
import { Link } from 'react-router-dom';
import { deleteMovieFromFavorites } from "../../api/Movie";
import { fetchFavoriteMovies } from "../../api/Movie";
import { RemoveIcon } from "../../styles/icons/RemoveIcon/RemoveIcon";
import { Movie } from "../../api/ValidationSchema";
import placeholderImage from '../../styles/images/poster-fail.jpg';

import style from './FavoriteMovies.module.scss';

export const FavoriteMovies = () => {
    const favoriteMoviesQuery = useQuery({
        queryFn: () => fetchFavoriteMovies(),
        queryKey: ['favorites']
    }, queryClient);

    const deleteFavoriteMutation = useMutation({
        mutationFn: (id: number) => deleteMovieFromFavorites(id),
        mutationKey: ['favorite', 'delete'],
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ['favorites'] });
        }
    }, queryClient);

    const handleDeleteFavoriteMovie = (id: number) => {
        deleteFavoriteMutation.mutate(id);
    }

    const movies: Movie[] | undefined = favoriteMoviesQuery.data;

    return (
        <ul className={style.userPageMovies}>
            {favoriteMoviesQuery.status === 'pending' && (
                <span className={style.userPageInfo}>Загрузка избранных фильмов....</span>
            )}

            {favoriteMoviesQuery.status === 'error' && (
                <div>
                    <span className={style.userPageInfo}>Ошибка загрузки!</span>
                    <button onClick={() => favoriteMoviesQuery.refetch()}>Повторить загрузку!</button>
                </div>
            )}

            {movies !== undefined ? movies.length === 0 && (
                <span className={style.userPageInfo}>Список избранных фильмов пусто!</span>
            ) : ""}

            {movies !== undefined ? movies.map((movie) => (
                <li className={style.userPageMovie} key={movie.id}>
                    <Link to={`/movie/${movie.id}`}>
                        <img 
                            className={style.userPageMovieImage} 
                            src={movie.posterUrl || placeholderImage} 
                            alt={movie.title} 
                        />
                        <button
                            className={style.userPageMovieRemove}
                            onClick={(event) => {
                                event.preventDefault();
                                handleDeleteFavoriteMovie(movie.id);
                            }}
                        >
                            <RemoveIcon />
                        </button>
                    </Link>
                </li>
            )) : ""}
        </ul>
    );
};