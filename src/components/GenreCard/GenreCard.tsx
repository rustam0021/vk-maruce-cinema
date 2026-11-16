import { Link } from "react-router-dom";
import placeholderImage from "../../styles/images/poster-fail.jpg";
import { Movie } from "../../api/ValidationSchema";

import style from "./GenreCard.module.scss";

type MovieListProp = {
    movies: Movie[];
}

export const GenreCard = ({ movies }: MovieListProp) => {
    return (
        <ul className={style.genreCardMovies}>
            {movies.map((movie) => (
                <li key={movie.id} className={style.genreCardMovies__movie}>
                    <Link to={`/movie/${movie.id}`}>
                        <img 
                            className={style.genreCardMovies__movieImg} 
                            src={movie.posterUrl || placeholderImage} 
                            alt={movie.title} 
                        />
                    </Link>
                </li>
            ))}
        </ul>
    );
};