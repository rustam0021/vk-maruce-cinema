import { Link } from "react-router-dom";
import { BackIcon } from "../../styles/icons/BackIcon/BackIcon";
import { GenreCard } from "../../components/GenreCard/GenreCard";
import { Movie } from "../../api/ValidationSchema";

import style from "./GenreCardPage.module.scss";

interface GenreCardPageProps {
    movies: Movie[];
    onShowMore: () => void;
    hasMore: boolean;
    isFetching: boolean;
}

export const GenreCardPage = ({ movies, onShowMore, hasMore, isFetching }: GenreCardPageProps) => {
    return (
        <div className={style.genreCard}>
            <div className={style.genreCard__container}>
                <div className={style.genreCard__header}>
                    <Link to="/genres" className={style.genreCard__back}>
                        <BackIcon />
                    </Link>
                    <h1 className={style.genreCard__title}>Фантастика</h1>
                </div>
                <GenreCard movies={movies} />
                {hasMore && (
                    <button 
                        onClick={onShowMore} 
                        className={style.genreCard__more} 
                        disabled={isFetching}
                    >
                        {isFetching ? "Загрузка..." : "Показать ещё"}
                    </button>
                )}
            </div>
        </div>
    );
};