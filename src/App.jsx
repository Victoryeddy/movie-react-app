import { Router, Route, Routes, Link } from "react-router-dom";

import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import MovieLayout from "./Layouts/MovieLayout/MovieLayout";
function App() {
  return (
    <>
      {/* <Navbar /> */}
      <MovieLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </MovieLayout>
    </>
  );
}

export default App;
