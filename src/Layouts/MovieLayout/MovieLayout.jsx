import React, { useState } from "react";
import { Navbar } from "../../Components/Navbar/Navbar";

const MovieLayout = ({ children }) => {
  const [isAsideOpen, setIsAsideOpen] = useState(false);

  const toggleAside = () => {
    setIsAsideOpen(!isAsideOpen);
  };

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Layout Wrapper */}
      <div className="flex flex-col lg:flex-row relative">
        {/* Aside - Hidden on small screens, toggled visibility */}
        <button
          className="block text-white mb-4 bg-blue-900 lg:hidden"
          onClick={toggleAside}
        >
          Close Menu
        </button>
        <aside
          className={`fixed lg:sticky top-0 bg-[#EAEFBD] p-4 lg:z-90 z-20 
          ${isAsideOpen ? "left-0" : "-left-full"} 
          lg:left-0 transition-all duration-300 lg:w-[20%] 
          w-[80%] h-full lg:h-auto`}
        >
          <ul className="text-white">
            <li className="text-black">Home</li>
            <li className="text-black">Favorites</li>
            <li className="text-black">Categories</li>
          </ul>
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
