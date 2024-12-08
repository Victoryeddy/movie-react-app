import React, { useState } from "react";
import { Navbar } from "../../Components/Navbar/Navbar";

import Popular from "../../assets/svg/popular.svg";
import TopRated from "../../assets/svg/star.svg";
import Upcoming from "../../assets/svg/computer.svg";


import Action from "../../assets/svg/action.svg";
import Adventure from "../../assets/svg/adventure.svg";
import Animation from "../../assets/svg/animation.svg";
import Comedy from "../../assets/svg/comedy.svg";
import Crime from "../../assets/svg/crime.svg";
import Documentary from "../../assets/svg/documentary.svg";

const MovieLayout = ({ children }) => {
  const [isAsideOpen, setIsAsideOpen] = useState(false);

  const toggleAside = () => {
    setIsAsideOpen(!isAsideOpen);
  };

  const [menuCategories, setMenuCategories] = useState([
    {id: 1, icon: `${Popular}`, menuName: 'Popular'},
    {id: 2, icon: `${TopRated}`, menuName: 'Top Rated'},
    {id: 3, icon: `${Upcoming}`, menuName: 'Upcoming'},
  ])

  const [genres, setGenres] = useState([
    {id: 1, icon: `${Action}`, menuName: 'Action'},
    {id: 2, icon: `${Adventure}`, menuName: 'Adventure'},
    {id: 3, icon: `${Animation}`, menuName: 'Animation'},
    {id: 4, icon: `${Comedy}`, menuName: 'Comedy'},
    {id: 5, icon: `${Crime}`, menuName: 'Crime'},
    {id: 6, icon: `${Documentary}`, menuName: 'Documentary'},
  ])

  return (
    <>
      {/* Navbar */}
      <Navbar onEmit={toggleAside} />

      {/* Layout Wrapper */}
      <div className="flex flex-col lg:flex-row relative">
        <aside
          className={`fixed lg:sticky top-0 bg-[#EAEFBD] p-4 lg:z-90 z-20 
          ${isAsideOpen ? "left-0" : "-left-full"} 
          lg:left-0 transition-all duration-300 lg:w-[20%] 
          w-[80%] h-full lg:h-auto`}
        >
          <div>
            <h3>Categories</h3>
            <ul className="text-white">
              {menuCategories.map((item, index) => (
                <li
                  className={`text-black p-2 font-light flex items-center hover:bg-gray-300 rounded-lg hover:ms-3  ${
                    item.id == 1 ? "mt-3" : "mt-0"
                  } `}
                  key={item.id}
                >
                  <img src={item.icon} alt="" className="me-1" />
                  {item.menuName}
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
                    item.id == 1 ? "mt-2" : "mt-0"
                  } `}
                  key={item.id}
                >
                  <img src={item.icon} alt="" className="me-1" />
                  {item.menuName}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Main Content */}
        <main
          className={`min-h-screen bg-[#EFEFEF] flex flex-col w-full lg:w-[80%] transition-all duration-300`}
        >
          <div className="flex-1 container mx-auto p-4">{children}</div>
        </main>
      </div>
    </>
  );
};

export default MovieLayout;
