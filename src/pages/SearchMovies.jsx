import React, { useState, useEffect } from "react";
import MovieCard from "../Components/MovieCard/MovieCard";
import { useSearchParams } from "react-router-dom";

import axios from "../plugins/axios"
export default function SearchMovies() {
  const [movies, setMovies] = useState([]);

   const [searchParams, setSearchParams] = useSearchParams();

   let keyWord = searchParams.get("query");

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await axios.get(
        `search/movie?include_adult=false&language=en-US&api_key=${
          import.meta.env.VITE_TMDB_API_KEY
        }&query=${keyWord}`
      );
      const data = await response?.data.results;
      setMovies(data);
    };

    fetchMovie();
  }, [keyWord]);

 
  return (
    <>
      <h3 className="mt-[4rem] text-3xl mb-3">Movie Results</h3>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 ">
        {movies.length <= 0 && <p>On your search , no result</p>}
        {movies.map((item, index) => {
          return (
            <div key={index}>
              <MovieCard movie={item} />
            </div>
          );
        })}
      </div>
    </>
  );
}
