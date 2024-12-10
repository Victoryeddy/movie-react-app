import { Router, Route, Routes, Link } from "react-router-dom";

import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import GenresList from "./pages/Genres";
import ShowGenreDetail from "./pages/Genres/Show";

import MovieLayout from "./Layouts/MovieLayout/MovieLayout";

function App() {
  return (
    <>
      {/* <ul>
        <li>
          <Link to="/genres/3/movies/">Genres</Link>
        </li>
        <li>
          <Link to="/genres/3/movies/4">show genre</Link>
        </li>
      </ul> */}
      <MovieLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/genres/:id/movies/">
            <Route index element={<GenresList />} />
            <Route path=":id" element={<ShowGenreDetail />} />
          </Route>
        </Routes>
      </MovieLayout>
    </>
  );
}

export default App;
