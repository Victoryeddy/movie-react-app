import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../plugins/axios"

import Documentary from "../assets/svg/documentary.svg"

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  const [notFound, setNotFound] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await axios.get(
        `movie/${id}?api_key=${
          import.meta.env.VITE_TMDB_API_KEY
        }&language=en-US`
      );
      const data = await response?.data;

      if (
        !response?.success 
      ) {
        setNotFound(true);
      }
      setMovie(data);
    };

    fetchMovie();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  if (notFound){
    return (
      <div>
        oops page not found
        <Link to="/" style={{ backgroundColor: "#1F2937" , color: '#fff', padding: '0.5rem'}}>
          Go Back
        </Link>
      </div>
    );
  }
    return (
      <>
        <p>
          {" "}
          <Link
            to="/"
            style={{
              backgroundColor: "#1F2937",
              color: "#fff",
              padding: "0.5rem",
            }}
            className="rounded-lg"
          >
            Go Back
          </Link>
        </p>
        <div className="bg-[#1F2937] text-white min-h-fit rounded-lg mt-4">
          <div className="flex flex-col md:flex-row items-center ">
            {/* Movie Poster */}
            <img
              className="w-full md:w-1/3 rounded-lg shadow-lg m-5"
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : Documentary
              }
              alt={movie.title}
            />

            {/* Movie Details */}
            <div className="md:ml-8 mt-4 md:mt-0 lg:pe-3">
              <h1 className="text-4xl font-bold">
                {movie.title} ({movie.release_date.split("-")[0]})
              </h1>
              <div className="flex items-center my-2">
                <span className="text-yellow-500 mr-2">
                  {movie.vote_average}/10
                </span>
                <span className="text-sm">
                  | {movie.runtime} min |{" "}
                  {movie.genres.map((g) => g.name).join(", ")}
                </span>
              </div>
              <p className="text-sm text-gray-400">{movie.tagline}</p>
              <p className="my-4">{movie.overview}</p>
              <div className="flex space-x-4">
                <button className="bg-red-500 px-4 py-2 rounded-lg">
                  Favorite
                </button>
                <button className="bg-blue-500 px-4 py-2 rounded-lg">
                  Watchlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
};

export default MovieDetail;
