import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import axios from "../plugins/axios";

import MovieCard from "../Components/MovieCard/MovieCard";

import LoadingIcon from "../assets/svg/loading-movie.gif";

// import Swiper core and required modules
import {
  EffectFade,
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();

  let category = searchParams.get("category");

  let [numbers, setNumbers] = useState([1, 2, 3, 4, 5, 6, 7, 8]);

  let [nowPlaying, setNowPlaying] = useState([]);

  let [trending, setTrending] = useState([]);

  async function getNowPlaying() {
    try {
      let response = await axios.get(
        `movie/${category}?language=en-US&api_key=${
          import.meta.env.VITE_TMDB_API_KEY
        }`
      );

      setNowPlaying((p) => (p = response.data.results));
    } catch (error) {
      console.log(error);
    }
  }

  async function getTrending() {
    try {
      let response = await axios.get(
        `trending/all/day?language=en-US&api_key=${
          import.meta.env.VITE_TMDB_API_KEY
        }`
      );

      setTrending((t) => (t = response.data.results));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (!category) {
      category = "now_playing";
    }
    getTrending();
    getNowPlaying();
  }, []);

  useEffect(() => {
    getNowPlaying();
  }, [category]);
  return (
    <>
      <div className="container px-3">
        <h1 className="text-xl mb-4">Welcome Back 😀</h1>
        <div>
          <h3 className="mt-[2rem] text-3xl mb-3">
            {category == "upcoming"
              ? "Upcoming"
              : category == "now_playing"
              ? "Now Playing"
              : category == "popular"
              ? "Popular"
              : "Top rated"}
          </h3>
          {nowPlaying.length == 0 ? (
            <img src={LoadingIcon} alt="Loading Icon" />
          ) : (
            <Swiper
              // install Swiper modules
              effect={"fade"}
              modules={[
                EffectFade,
                Autoplay,
                Navigation,
                Pagination,
                Scrollbar,
                A11y,
              ]}
              spaceBetween={70}
              slidesPerView={1}
              navigation={true}
              pagination={{ clickable: true }}
              scrollbar={{ draggable: false }}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
            
              className="mySwiper"
            >
              {nowPlaying.slice(0, 6).map((num, index) => (
                <SwiperSlide key={index}>
                  <div className="swiper-slide-content">
                    <div className="flex justify-between flex-col">
                      <div className=" z-20 absolute bottom-[25%] left-[7%] text-white">
                        <span className="text-2xl">{num?.title}</span>
                        <p className=" text-white w-2/3 font-light mt-3">
                          {num?.overview}
                        </p>
                      </div>
                    </div>
                    <img
                      src={`https://image.tmdb.org/t/p/w500${num?.backdrop_path}`}
                      alt={num?.title}
                      className="swiper-image-cover rounded-2xl"
                    />
                    <div className="overlay"></div>
                  </div>
                </SwiperSlide> // Add `return` or use parentheses
              ))}
            </Swiper>
          )}
        </div>

        <h3 className="mt-[4rem] text-3xl mb-3">Trending</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 ">
          {trending.slice(0, 9).map((item, index) => {
            return (
              <div key={index}>
                <MovieCard movie={item} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
