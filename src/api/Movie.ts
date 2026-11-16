import { Movie, GenreListSchema, GenreListType, MovieList, MovieListSchema } from "./ValidationSchema";
import { RandomMovieSchema, RandomMovieType } from "./ValidationSchema";

const API_URL = "https://cinemaguide.skillbox.cc";


// 1. Получаем массив фильмов
export const fetchMovies = async (): Promise<MovieList> => {
    const response = await fetch(`${API_URL}/movie`);

    if (!response.ok) {
    throw new Error(`Ошибка сети: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return MovieListSchema.parse(data);
};


// 2. Получаем случайного фильма
export const fetchRandomMovie = async (): Promise<RandomMovieType> => {
    const response = await fetch(`${API_URL}/movie/random`);

    if(!response.ok) {
        throw new Error(`Ошибка сети: ${response.status} ${response.statusText}`)
    }

    const data = await response.json();
    return RandomMovieSchema.parse(data)
}


// 3. Получаем топ 10 фильмов
export const fetchTopMovies = async (): Promise<MovieList> => {
    const response = await fetch(`${API_URL}/movie/top10`);

    if(!response.ok) {
        throw new Error(`Ошибка сети: ${response.status} ${response.statusText}`)
    }

    const data = await response.json();
    return data // Валидация пропущена
}


// 4. Получаем список жанров
export const fetchMovieGenres = async (): Promise<GenreListType> => {
    const response = await fetch(`${API_URL}/movie/genres`);

    if(!response.ok) {
        throw new Error(`Ошибка сети: ${response.status} ${response.statusText}`)
    }

    const data = await response.json();
    return GenreListSchema.parse(data);
};


// 5. Получаем фильм по id
export const fetchCurrentMovie = async (id: string): Promise<Movie> => {
    const response = await fetch(`${API_URL}/movie/${id}`);

    if(!response.ok) {
        throw new Error(`Ошибка сети: ${response.status} ${response.statusText}`)
    }

    const data = response.json();
    return data // Валидация пропущена
}


// 6. Получаем массив фильмов по жанру
export const fetchCurrentGenre = async (genreName: string, count: number): Promise<MovieList> => {
    const response = await fetch(`${API_URL}/movie?genre=${genreName}&count=${count}`);

    if(!response.ok) {
        throw new Error(`Ошибка: ${response.status} ${response.statusText}`)
    }

    const data = response.json();
    return data // Валидация пропущена
}


// 7. Получвем список избранных фильмов
export const fetchFavoriteMovies = async (): Promise<MovieList> => {
    const response = await fetch(`${API_URL}/favorites`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
    });

    if(!response.ok) {
        throw new Error(`Ошибка: ${response.status} ${response.statusText}`)
    }

    const data = response.json();
    return data;
}


// 8. Добавляем фильм в избранное 
export const addMovieToFavorites = async (id: string) => {

    const response = await fetch(`${API_URL}/favorites`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        
        credentials: 'include', 

        body: JSON.stringify({ id }),
    });

    if (!response.ok) {
        throw new Error(`Ошибка ${response.status} ${response.statusText}`);
    }
};


// 9. Удаляем фильм из избранных
export const deleteMovieFromFavorites = async (id: number) => {
    const response = await fetch(`${API_URL}/favorites/${id}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
    });

    if(!response.ok) {
        throw new Error(`Ошибка ${response.status} ${response.statusText}`)
    }
}


// 10. Получаем список фильм по названию (для поиска)
export const searchMovies = async (title: string) => {
    if(!title.trim()) {
        return [];
    }

    const response = await fetch(`${API_URL}/movie?title=${title}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });

    if(!response.ok) {
        throw new Error(`Ошибка поиска: ${response.status} ${response.statusText}`)
    };

    return await response.json();
}






