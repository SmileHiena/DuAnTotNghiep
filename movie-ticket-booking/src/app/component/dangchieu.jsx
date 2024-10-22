"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "../../../public/styles/sapchieu.css";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

const DangChieu = () => {
  const [movies, setMovies] = useState([]); // State to hold movies

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/sanpham/dangchieu/"
        );
        console.log("Response status:", response.status); // Log the response status
        if (!response.ok) throw new Error("Failed to fetch movies.");

        const data = await response.json();
        console.log("Fetched data:", data); // Log the fetched data
        setMovies(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchMovies(); // Call the fetch function
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 200,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="dang-chieu">
      <div
        className="dang-chieu__container mx-auto py-8 max-w-full"
        style={{
          maxWidth: "1410px",
          backgroundImage: "url(/images/background.png)",
        }}
      >
        <h2 className="sap-chieu__title">Phim đang chiếu</h2>
        <div className="sap-chieu__slider">
          <Slider {...settings}>
            {movies.map((movie) => (
              <div key={movie.id} className="sap-chieu__card mx-3">
                {" "}
                <img
                  src={movie.Anh}
                  alt={movie.Ten}
                  className="w-full max-w-[250px] h-auto"
                />
                <div className="sap-chieu__overlay">
                  <p className="sap-chieu__card-title">{movie.Ten}</p>
                  <ul className="sap-chieu__info">
                    <li>
                      <i className="fa-solid fa-tag text-yellow-400"></i>{" "}
                      {/* Tailwind color for tag */}
                      &nbsp; {movie.TheLoai.KieuPhim}
                    </li>
                    <li>
                      <i className="fa-solid fa-clock text-yellow-400"></i>
                      &nbsp; {movie.TheLoai.ThoiLuong}
                    </li>
                    <li>
                      <i className="fa-solid fa-earth-americas text-yellow-400"></i>
                      &nbsp; {movie.TheLoai.QuocGia}
                    </li>
                    <li>
                      <i className="fa-solid fa-comment text-yellow-400"></i>
                      &nbsp; {movie.TheLoai.NgonNgu}
                    </li>
                  </ul>
                </div>
                <h6 className="sap-chieu__name">{movie.Ten}</h6>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default DangChieu;