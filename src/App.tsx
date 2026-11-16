import { FC } from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import CustomLayout from './components/CustomLayout/CustomLayout';
import './App.css';

import HomePage from "./pages/HomePage";
import GenreListPage from "./pages/GenreListPage/GenreListPage";
import { UserAccountPage } from "./pages/UserAccountPage/UserAccountPage";
import { FetchGenreCardPage } from "./pages/GenreCardPage/FetchGenreCardPage";
import { FetchMovieCardPage } from "./pages/MovieCardPage/FetchMovieCardPage";



const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CustomLayout />} >
          <Route index element={<HomePage />} />
          <Route path="genres" element={<GenreListPage />} />
          <Route path="genres/:genreName" element={<FetchGenreCardPage />} />
          <Route path="movie/:movieId" element={<FetchMovieCardPage />} />
          <Route path="user-account" element={<UserAccountPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
