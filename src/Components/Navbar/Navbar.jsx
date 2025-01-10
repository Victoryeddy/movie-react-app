import React, { useState, useRef } from "react";
import { Link, useNavigate, createSearchParams } from "react-router-dom";

import styles from "./Navbar.module.css";

import Love from "../../assets/svg/love.svg";
import Home from "../../assets/svg/home.svg";

import TMDBLogo from "../../assets/svg/tmdb-logo.svg";

export const Navbar = ({ onEmit }) => {
  const debounceTimeout = useRef(null);
  let [keyword, setKeyWord] = useState("");

  const emitSidebar = () => {
    onEmit();
  };

  const navigate = useNavigate();

  const handleInputSearch = (e) => {
    setKeyWord((prev) => (prev = e.target.value));

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      search(e.target.value);
    }, 600);
  };

  const search = (query) => {
    if (query.trim()) {
      navigate({
        pathname: "/movie-results",
        search: createSearchParams({
          query: query,
        }).toString(),
      });
    }
  };

  return (
    <nav className="bg-gray-800 text-white sticky top-0 z-30 lg:z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-2">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold">
              <img src={TMDBLogo} alt="" width="60" />
              Movie Explorer
            </Link>
          </div>

          {/* Desktop Menu */}
          <div>
            <input
              type="text"
              value={keyword}
              onInput={(e) => handleInputSearch(e)}
              className="rounded p-1 w-80 hidden lg:flex text-black"
              placeholder="Search for movies"
            />
          </div>
          <div className="hidden md:flex space-x-4 items-center">
            <Link
              to="/"
              className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium flex items-center"
            >
              <img src={Home} alt="heart emoji" className="me-2" />
              Home
            </Link>
            <Link
              to="/favorites"
              className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium flex items-center"
            >
              <img src={Love} alt="heart emoji" className="me-2" />
              Favorite Movies
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button onClick={() => emitSidebar()}>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
