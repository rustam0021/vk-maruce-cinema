import { boolean, success, z } from 'zod';

// 1. Схема обьекта Movie
export const MovieSchema = z.object({
    id: z.number(),
    title: z.string(),
    originalTitle: z.string(),
    language: z.string(),
    releaseYear: z.number(),
    releaseDate: z.string(), 
    genres: z.array(z.string()),
    plot: z.string(),
    runtime: z.number(),
    budget: z.string()
        .or(z.number())
        .nullable()
        .transform((val: string | number | null) => (val === null ? 0 : Number(val))),

    revenue: z.string()
        .or(z.number())
        .nullable()
        .transform((val: string | number | null) => (val === null ? 0 : Number(val))),
    homepage: z.string().nullable(),
    status: z.string(), 
    posterUrl: z.string().nullable().transform(val => val ?? undefined), 
    backdropUrl: z.string().nullable(),
    trailerUrl: z.string(),
    trailerYouTubeId: z.string(),
    tmdbRating: z.number(),
    searchL: z.string(),
    keywords: z.array(z.string()),
    countriesOfOrigin: z.array(z.string()),
    languages: z.array(z.string()),
    cast: z.array(z.string()),
    director: z.string().nullable(),
    production: z.string().nullable(),
    awardsSummary: z.string().nullable(),
});

// Вывод TypeScript типа из Zod схемы 
export type Movie = z.infer<typeof MovieSchema>;
export type MovieList = Movie[];
// Схема для валидации массива фильмов
export const MovieListSchema = z.array(MovieSchema);





// 2. Схема обьекта RandomMovie
export const RandomMovieSchema = MovieSchema
  // 1. Убираем поле posterUrl, так как его нет в типе RandomMovie
  .omit({ 
    posterUrl: true 
  })
  // 2. Переопределяем изменившиеся поля
  .extend({
    budget: z.number().nullable(),               // Теперь только число или null
    revenue: z.number().nullable(),              // Теперь только число или null
    backdropUrl: z.string(),                     // Теперь строго строка (не nullable)
  });

// Автоматически выводим тип из схемы, чтобы не писать export type RandomMovie вручную
export type RandomMovieType = z.infer<typeof RandomMovieSchema>;



// 3. Схема массива жанров
export const MovieGenreSchema = z.string();

// Схема для массива жанров 
export const MovieGenresListSchema = z.array(MovieGenreSchema);

// Вывод TypeScript типа, если он вам понадобится
export type MovieGenre = z.infer<typeof MovieGenreSchema>;



// 4. Схема топ фильмов
export const TopMovieSchema = MovieSchema
  .extend({
    // posterUrl: z.string(), 
    budget: z.string().nullable(),
    revenue: z.string().nullable(),
    backdropUrl: z.string().nullable(),
  });

export const TopMovieListSchema = z.array(TopMovieSchema);
export type TopMovie = z.infer<typeof TopMovieSchema>;
export type TopMovieList = z.infer<typeof TopMovieListSchema>;


// 5․ Схема список жанров
export const GenreListSchema = z.array(z.string());
export type GenreListType = z.infer<typeof GenreListSchema>;


// 6. Схема для пользователя
export const UserSchema = z.object({
  email: z.string(),
  favorites: z.array(z.any()),
  name: z.string(),
  surname: z.string(),
})
export type UserType = z.infer<typeof UserSchema>;


// 7. Схема валидации форме регистрации
export const SignUpSchema = z.object({
  email: z.string().email("Некорректный формат почты").min(1, "Поле обязательно"),
  name: z.string().min(1, "Поле обязательно"),
  surname: z.string().min(1, "Поле обязательно"),
  password: z.string().min(4, "Пароль слишком короткий"),
  confirmPassword: z.string().min(1, "Подтвердите пароль"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
});

export type FormErrors = Partial<Record<keyof z.infer<typeof SignUpSchema> | 'api', string>>;