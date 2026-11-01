import { TopMovieList } from '../../api/ValidationSchema';
import { Link } from 'react-router-dom';
import placeholderImage from '../../styles/images/poster-fail.jpg';

import style from './TopMovies.module.scss';


type TopMoviesProps = {
    movies: TopMovieList;
}

export const TopMovies = ({movies}: TopMoviesProps) => {

    
    return (
        <div className={style.topMovies}>
            <div className={style.topMovies__container}>
                <h2 className={style.topMovies__title}>Топ 10 фильмов</h2>
                <ul className={style.topMovies__list}>
                    
                    {movies.map((movie, index) => {
                        const rank = index+1;
                        return (
                            <li className={style.topMovies__item} key={movie.id}>
                                <Link to={`/movie/${movie.id}`}>
                                    <span className={style.topMovies__rank}>{rank}</span>
                                    <img className={style.topMovies__image} src={movie.posterUrl || placeholderImage} alt={movie.title} />
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    )
}
