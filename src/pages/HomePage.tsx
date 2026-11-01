import { FC } from "react";
import { FetchRandomMovie } from "../components/RandomMovie/FetchRandomMovie";
import { FetchTopMovies } from "../components/TopMovies/FetchTopMovies";


const HomePage: FC = () => {
    return (
        <>
            <FetchRandomMovie />
            <FetchTopMovies />
        </>
    )
}

export default HomePage;