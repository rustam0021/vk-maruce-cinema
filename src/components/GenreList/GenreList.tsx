import { genreDataList } from "../../data/data";
import { Link } from "react-router-dom";
import { GenreListType } from "../../api/ValidationSchema";

import style from "./GenreList.module.scss";

type GenreListProps = {
    genres: GenreListType;
}

export const GenreList = ({ genres }: GenreListProps) => {
    return (
        <div className={style.genresGrid}>
            <ul className={style.genresGrid__list}>
                {genres.map((genre) => (
                    <li className={style.genresGrid__item} key={genre}>
                        <Link to={`/genres/${genre}`}>
                            <img 
                                src={genreDataList[genre].img} 
                                className={style.genresGrid__itemImg} 
                                alt="Изображения жанра" 
                            />
                            <span className={style.genresGrid__itemName}>
                                {genreDataList[genre].name}
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};