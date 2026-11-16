import { useState } from "react";
import { useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import { fetchUser } from "../../api/Users";
import { FavoriteIcon } from "../../styles/icons/FavoriteIcon/FavoriteIcon";
import { CheckedFavoriteIcon } from "../../styles/icons/CheckedFavoriteIcon/CheckedFavoriteIcon";
import { UpdateIcon } from "../../styles/icons/UpdateIcon/UpdateIcon";
import { RandomMovieType } from "../../api/ValidationSchema";
import { genreDataList } from "../../data/data";
import { addMovieToFavorites } from "../../api/Movie";
import { FavoriteIconType } from "../../types/Types";
import { useDispatch } from "react-redux";
import { openAuthModal } from "../../store/slices/authSlice";
import { openTrailerModal } from "../../store/slices/trailerSlice";


import style from "./RandomMovie.module.scss";

type RandomMovieProps = {
    movie: RandomMovieType;
    refetch: () => void;
};


export const RandomMovie = ({movie, refetch}: RandomMovieProps ) => {
    const [icon, setIcon] = useState<FavoriteIconType>('inActive');

    const dispatch = useDispatch();
    const queryClient = useQueryClient();

    // запрос пользователя для проверки авторизации
    const {data: user, status: authStatus} = useQuery({
        queryFn: () => fetchUser(),
        queryKey: ['users', 'me']
    })

    // проверка находится ли фильм в избранном
    const isFavorite = user?.favorites?.includes(`${movie.id}`)

    // добавление в избранное
    const favoriteAddMutation = useMutation({
            mutationFn: (id: string) => addMovieToFavorites(id),
            onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users', 'me'] });
        },
    });


    const handleAddToFavorite = (id: string) => {
        if(authStatus === 'error') {
            dispatch(openAuthModal('login'));
            return;
        } 
        setIcon('active');
        favoriteAddMutation.mutate(id)
    }

    return (
        <div className={style.movie} key={movie.id}>
            <div className={style.movie__container}>
                <div className={style.movie__info}>
                    <div className={style.movie__rating}>
                        <p className={style.movie__ratingValue}>★ {movie.tmdbRating}</p>
                        <p className={style.movie__year}>{movie.releaseYear}</p>
                        <p className={style.movie__genre}>{genreDataList[`${movie.genres[0]}`].name}</p>
                        <p className={style.movie__duration}>{Math.floor(movie.runtime / 60)}ч {movie.runtime % 60}мин</p>
                    </div>
                    <h1 className={style.movie__title}>{movie.title}</h1>
                    <p className={style.movie__description}>{movie.plot}</p>
                    <div className={style.movie__buttons}>
                        <button 
                            className={style.movie__btn} 
                            onClick={() => dispatch(openTrailerModal(movie.trailerUrl))}
                        >
                            Трейлер
                        </button>
                        <a href={`/movie/${movie.id}`} className={style.movie__btn}>О фильме</a>
                        <button 
                            className={style.movie__btnFavorite}
                            onClick={() => handleAddToFavorite(`${movie.id}`)}
                        > 
                            {isFavorite ? <CheckedFavoriteIcon /> : <FavoriteIcon />}
                        </button>
                        <button
                            className={style.movie__btnUpdate}
                            onClick={() => refetch()}
                        >
                            {<UpdateIcon />}
                        </button>
                    </div>
                </div>
                <div className={style.movie__poster}>
                    <img src={movie.backdropUrl}  alt="Movie Poster" />
                </div>
            </div>
        </div>
    )
}
