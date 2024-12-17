import { useNavigate } from "react-router-dom";

import Documentary from "../../assets/svg/documentary.svg";

const MovieCard = ({ movie }) => {

  const navigate = useNavigate();
  const getFormattedDate = (date) => {
      var options = {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
      };

      const theDate = new Date(date);

      var formattedDate = theDate.toLocaleDateString("en-US", options);

      return formattedDate;
    };

  return (
    <>
      {movie?.length == 0 ? (
        <img src={LoadingIcon} alt="Loading Icon" />
      ) : (
        <div className="bg-gradient-to-r from-[#1F2937] to-[#425876] rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out flex items-stretch flex-col">
          <div className="relative">
            <img
              src={movie?.poster_path ? `https://image.tmdb.org/t/p/w500${
                movie?.backdrop_path || movie?.poster_path
              }`: Documentary}
              alt={movie?.title}
              className="w-full h-[300px] object-cover"
            />
          </div>
          <div className="p-4">
            <h2 className="text-xl font-bold text-white mb-2">{movie.title ?? "No Title"}</h2>
            <p className="text-gray-300 mb-2">
              Release Date:{" "}
              {movie?.release_date
                ? getFormattedDate(movie?.release_date)
                : "TBD"}
            </p>
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-gray-400">Rating:</span>
              <span className="text-yellow-500">
                {movie?.vote_average?.toFixed(1)}
              </span>
              <span className="text-gray-400">/10</span>
            </div>
            <p className="mb-2 text-sm text-gray-300">
              Overview: {movie?.overview?.slice(0, 150) + "..."}
            </p>
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => navigate(`/view-movie/${movie?.id}`)}
                className="bg-[#EAEFBD] text-black px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-300 ease-in-out"
              >
                Watch Now
              </button>
              
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieCard;
