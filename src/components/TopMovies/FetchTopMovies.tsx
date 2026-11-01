import { useQuery } from "@tanstack/react-query";
import { fetchTopMovies } from "../../api/Movie";
import { queryClient } from "../../api/qyeryClient";
import { TopMovies } from "./TopMovies";


export const FetchTopMovies = () => {


    const topMoviesQuery = useQuery({
        queryFn: () => fetchTopMovies(),
        queryKey: ['top']
    }, queryClient)

    switch(topMoviesQuery.status) {
        case 'pending':
            return <span>Загрузка...</span>;

        case 'success':
            return <TopMovies movies={topMoviesQuery.data}/>
        
        case 'error':
            console.error("React Query Error Details:", topMoviesQuery.error);
            return (
                <div>
                    <span>Произашла ошибка: </span>
                    <button onClick={() => topMoviesQuery.refetch()}>Повторить запрос</button>
                 </div>
            )
    }
}