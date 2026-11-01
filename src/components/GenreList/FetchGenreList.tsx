import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../api/qyeryClient";
import { fetchMovieGenres } from "../../api/Movie";
import { GenreList } from "./GenreList";


export const FetchGenreList = () => {

    const genreListQuery = useQuery({
        queryFn: () => fetchMovieGenres(),
        queryKey: ["genres"]
    }, queryClient)

    switch(genreListQuery.status) {
        case 'pending': 
            return <div>Загрузка...</div>;
        
        case 'success': 
            return <GenreList genres={genreListQuery.data} />;

        case 'error':
            return (
                <div>
                    <span>Произашла ошибка: </span>
                    <button onClick={() => genreListQuery.refetch()}>Повторить запрос</button>
                 </div>
            )
    }
}