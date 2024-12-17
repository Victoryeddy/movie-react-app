import { Router, Route, Routes, Link } from "react-router-dom";

import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import GenresList from "./pages/Genres";
import MovieDetail from "./pages/ViewMore";

import SearchMovies from "./pages/SearchMovies";

import MovieLayout from "./Layouts/MovieLayout/MovieLayout";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <>
      <ThemeProvider>
        <MovieLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/genres/:id/movies/">
              <Route index element={<GenresList />} />
            </Route>
            <Route path="/view-movie/:id" element={<MovieDetail />} />
            <Route path="/movie-results" element={<SearchMovies />} />
          </Routes>
        </MovieLayout>
      </ThemeProvider>
    </>
  );
}

export default App;
