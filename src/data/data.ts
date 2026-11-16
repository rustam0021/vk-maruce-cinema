

// Импортируем картинки локально так как сервер их не дает
import dramaImage from "../styles/images/drama.png";
import comedyImage from "../styles/images/comedy.png";
import detektivImage from "../styles/images/detektiv.png";
import familyImage from "../styles/images/family.png";
import historicImage from "../styles/images/historic.png";
import trillerImage from "../styles/images/triller.png";
import fantasticImage from "../styles/images/fantastic.png";
import adventureImage from "../styles/images/adventure.png";
import horrorImage from "../styles/images/horror.png";
import scifiImage from "../styles/images/scifi.png";
import standUpImage from "../styles/images/stand-up.png";
import mysteryImage from "../styles/images/mystery.png";
import romanceImage from "../styles/images/romance.png";
import musicImage from "../styles/images/music.png";
import crimeImage from "../styles/images/crime.png";
import tvMovieImage from "../styles/images/tv-movie.png";
import documentaryImage from "../styles/images/documentary.png";
import actionImage from "../styles/images/action.png";
import westernImage from "../styles/images/western.png";
import animationImage from "../styles/images/animation.png"
import warImage from "../styles/images/war.png"

// Массив картинок и имен каждого жанра
export const genreDataList: Record<string, { name: string; img: string }> = {
    "drama": { name: "Драма", img: dramaImage },
    "comedy": { name: "Комедия", img: comedyImage },
    "detektiv": { name: "Детектив", img: detektivImage },
    "family": { name: "Семейный", img: familyImage },
    "history": { name: "История", img: historicImage },
    "thriller": { name: "Триллер", img: trillerImage },
    "fantasy": { name: "Фэнтези", img: fantasticImage },
    "adventure": { name: "Приключения", img: adventureImage },
    "horror": { name: "Ужасы", img: horrorImage },
    "scifi": { name: "Фантастика", img: scifiImage },
    "stand-up": { name: "Стендап", img: standUpImage },
    "mystery": { name: "Мистика", img: mysteryImage },
    "romance": { name: "Мелодрама", img: romanceImage },
    "music": { name: "Музыка", img: musicImage },
    "crime": { name: "Криминал", img: crimeImage },
    "tv-movie": { name: "Телефильм", img: tvMovieImage },
    "documentary": { name: "Документальный", img: documentaryImage },
    "action": { name: "Боевик", img: actionImage },
    "western": { name: "Вестерн", img: westernImage },
    "animation": { name: "Мультфильм", img: animationImage },
    "war": { name: "Военный", img: warImage }
};

