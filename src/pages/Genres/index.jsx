import React, { useEffect, useState } from "react";

import { useParams, Link, useSearchParams } from "react-router-dom";
import axios from "../../plugins/axios";
import MovieCard from "../../Components/MovieCard/MovieCard";

export default function GenresList() {
  let { id } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();

  const name = searchParams.get("name");

  let [movies, setMovies] = useState([]);

  async function getMoviesByGenre() {
    try {
      let response = await axios.get(
        `discover/movie?api_key=${
          import.meta.env.VITE_TMDB_API_KEY
        }&with_genres=${id}`
      );
      setMovies(response.data.results);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getMoviesByGenre();
  }, [id]);

  return (
    <>
      <h3 className="text-3xl pt-10 mb-4">{name}</h3>
      <div className="container px-3">
        <div className="grid grid-cols-3 gap-4">
          {movies.map((item, index) => (
            <div key={index}>
              <MovieCard movie={item} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
