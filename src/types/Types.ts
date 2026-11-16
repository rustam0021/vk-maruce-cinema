export type FavoriteIconType = 'active' | 'inActive';

export interface Movie {
    id: number;
    title: string;
    posterUrl?: string;
    backdropUrl?: string;
    tmdbRating?: number;
    releaseYear?: number;
    genres?: string[];
    runtime?: number;
}