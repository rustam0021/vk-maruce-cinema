import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { queryClient } from "../../api/qyeryClient";
import { GenreCardPage } from "./GenreCardPage";
import { fetchCurrentGenre } from "../../api/Movie";

type GenreNameProps = {
    genreName: string
}


export const FetchGenreCardPage = () => {
    // Получаем название жанра с URL
    const { genreName } = useParams<GenreNameProps>();
    
    // Стейт для количества фильмов
    const [count, setCount] = useState(15);

    const genreMoviesQuery = useQuery({
        // Включаем count в queryKey, чтобы React Query реагировал на его изменение
        queryKey: ["genres", genreName, count],
        // Передаем count в функцию запроса
        queryFn: () => fetchCurrentGenre(genreName || "", count),
        // placeholderData для таго, чтобы контент в странице сохранился и не обновился страница при клике на кнопку "Показать ещё"
        placeholderData: keepPreviousData,
    }, queryClient);

    switch(genreMoviesQuery.status) {
        case 'pending':
            return <div>Загрузка фильмов...</div>;

        case 'success': {
            const movies = genreMoviesQuery.data || [];
            
            return (
                <GenreCardPage movies={movies}

                    // Функция увеличения счетчика на +15 при клике
                    onShowMore={() => setCount((prev) => prev + 15)}

                    // Если сервер вернул меньше фильмов, чем мы просили, значит они закончились
                    hasMore={movies.length >= count}
                    
                    // Передаем флаг фоновой дозагрузки, чтобы задизейблить кнопку в процессе
                    isFetching={genreMoviesQuery.isFetching}
                />
            );
        }

        case 'error': 
            return (
                <div>
                    <span>Произошла ошибка при загрузке жанра: </span>
                    <button onClick={() => genreMoviesQuery.refetch()}>Повторить запрос</button>
                </div>
            );
    }
};