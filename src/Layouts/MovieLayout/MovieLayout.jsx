import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../../plugins/axios";
import { Navbar } from "../../Components/Navbar/Navbar";

import Popular from "../../assets/svg/popular.svg";
import TopRated from "../../assets/svg/star.svg";
import Upcoming from "../../assets/svg/computer.svg";

const MovieLayout = ({ children }) => {
  const [isAsideOpen, setIsAsideOpen] = useState(false);

  const navigate = useNavigate();

  const toggleAside = () => {
    setIsAsideOpen(!isAsideOpen);
  };

  const [menuCategories, setMenuCategories] = useState([
    {
      id: 1,
      icon: `${Popular}`,
      menuName: "Now Playing",
      value: "now_playing",
    },
    { id: 2, icon: `${Popular}`, menuName: "Popular", value: "popular" },
    { id: 3, icon: `${TopRated}`, menuName: "Top Rated", value: "top_rated" },
    { id: 4, icon: `${Upcoming}`, menuName: "Upcoming", value: "upcoming" },
  ]);

  const [genres, setGenres] = useState([]);

  async function getGenres() {
    try {
      let response = await axios.get(
        `genre/movie/list?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
      );
      setGenres((g) => (g = response.data.genres));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getGenres();
  }, []);

  return (
    <>
      {/* Navbar */}
      <Navbar onEmit={toggleAside} />

      {/* Layout Wrapper */}
      <div className="flex flex-col lg:flex-row">
        <aside
          className={`fixed bg-[#EAEFBD] p-4 lg:z-90 z-20
          ${isAsideOpen ? "left-0" : "-left-full"} 
          lg:left-0 transition-all duration-300 lg:w-[20%] 
         w-[60%] md:w-[40%] h-full  overflow-scroll`}
        >
          <div>
            <div>
              <h3>Categories</h3>
              <ul className="text-white">
                {menuCategories.map((item, index) => (
                  <li
                    className={`text-black p-2 font-light  hover:bg-gray-300 rounded-lg hover:ms-3  ${
                      item?.id == 1 ? "mt-3" : "mt-0"
                    } `}
                    key={item?.id}
                  >
                    <Link
                      to={{
                        pathname: `/`,
                        search: `?category=${item?.value}`,
                      }}
                      className="flex items-center"
                      state={{ some: `${item?.value}` }}
                    >
                      <img src={item.icon} alt="" className="me-1" />
                      {item?.menuName}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mt-4">Genres</h3>
              <ul className="text-white">
                {genres.map((item, index) => (
                  <li
                    className={`text-black p-2 font-light flex items-center hover:bg-gray-300 rounded-lg hover:ms-3  ${
                      index == 0 ? "mt-2" : "mt-0"
                    } `}
                    key={item?.id}
                  >
                    <Link
                      to={{
                        pathname: `/genres/${item?.id}/movies/`,
                        search: `?name=${item?.name}`,
                      }}
                    >
                      {" "}
                      {item?.name}{" "}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main
          className={`min-h-screen bg-[#EFEFEF] flex flex-col w-full lg:w-[80%] transition-all duration-300 lg:ms-[18rem]`}
        >
          <div className="flex-1 container mx-auto p-4 ">{children}</div>
        </main>
      </div>

      {/* Footer Section */}
      <footer>
        <p className="text-center text-gray-600 p-2">
          This product uses the TMDB API but is not endorsed or certified by
          TMDB.
        </p>
      </footer>
    </>
  );
};

export default MovieLayout;
