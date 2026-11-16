import { useQuery } from "@tanstack/react-query";
import { fetchRandomMovie } from "../../api/Movie"
import { RandomMovie } from "./RandomMovie";
import { queryClient } from "../../api/qyeryClient";

export const FetchRandomMovie = () => {

    const randomMovieQuery = useQuery({
        queryFn: () => fetchRandomMovie(),
        queryKey: ["random"]
    }, queryClient)

    switch(randomMovieQuery.status) {
        case 'pending': 
            return <span>Загрузка...</span>;
        
        case "success":
            return <RandomMovie movie={randomMovieQuery.data} refetch={() => randomMovieQuery.refetch()} />;

        case "error":
            return (
                <div>
                    <span>Произашла ошибка: </span>
                    <button onClick={() => randomMovieQuery.refetch()}>Повторить запрос</button>
                 </div>
            )
    }
}