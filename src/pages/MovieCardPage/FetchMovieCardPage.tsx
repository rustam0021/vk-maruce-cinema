import { useQuery } from "@tanstack/react-query";
import { fetchCurrentMovie } from "../../api/Movie";
import { queryClient } from "../../api/qyeryClient";
import { MovieCardPage } from "./MovieCardPage";
import { useParams } from "react-router-dom";



export const FetchMovieCardPage = () => {

    const { movieId } = useParams() as { movieId: string }
    
    const movieCardPageQuery = useQuery({
        queryKey: ["movieId"],
        queryFn: () => fetchCurrentMovie(movieId),
    }, queryClient)

    switch (movieCardPageQuery.status) {
        case 'pending':
            return <div>Загрузка....</div>

        case 'success': 
            return <MovieCardPage movie={movieCardPageQuery.data} />

        case 'error': 
            return (
                <div>
                    <span>Произошла ошибка при загрузке жанра: </span>
                    <button onClick={() => movieCardPageQuery.refetch()}>Повторить запрос</button>
                </div>
            );
    }
}