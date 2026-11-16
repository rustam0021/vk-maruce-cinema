import { FC } from "react";
import { FetchGenreList } from "../../components/GenreList/FetchGenreList";

import style from "./GenreListPage.module.scss";

const GenreListPage: FC = () => {
    return (
        <div className={style.genrePage}>
            <div className={style.genrePage__container}>
                <h1 className={style.genrePage__title}>Жанры фильмов</h1>
                <FetchGenreList />
            </div>
        </div>
    );
};

export default GenreListPage;