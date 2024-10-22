"use client";

import React, { useEffect, useState } from 'react'; 
import Link from 'next/link';
import "../../../public/styles/sapchieu.css"; 

const SapChieu = () => {
  const [movies, setMovies] = useState([]); // State to hold movies

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("http://localhost:3000/sanpham/sapchieu/");
        console.log("Response status:", response.status); // Log the response status
        if (!response.ok) throw new Error("Failed to fetch movies.");

        const data = await response.json();
        console.log("Fetched data:", data); // Log the fetched data
        setMovies(data); // Store fetched movies in state
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchMovies(); // Call the fetch function
  }, []); // Empty dependency array to run once on mount

  return (
    <>
      <section className="sap-chieu">
        <h2 className="sap-chieu__title">Phim sắp chiếu</h2>
        <div className="sap-chieu__container">
          <div className="sap-chieu__row">
            {movies.map((movie) => ( // Use movies state instead of posts
              <div key={movie.id} className="sap-chieu__card">
                <img
                  src={`${movie.Anh}`} // Adjust path if needed
                  alt={movie.Ten}
                  className="sap-chieu__image"
                />
                <div className="sap-chieu__overlay">
                  <p className="sap-chieu__card-title">{movie.Ten}</p>
                  <ul className="sap-chieu__info">
                    <li>
                      <i
                        className="fa-solid fa-tag"
                        style={{ color: "#FFD43B" }}
                      ></i>{" "}
                      &nbsp; {movie.TheLoai.KieuPhim}
                    </li>
                    <li>
                      <i
                        className="fa-solid fa-clock"
                        style={{ color: "#FFD43B" }}
                      ></i>{" "}
                      &nbsp; {movie.TheLoai.ThoiLuong}
                    </li>
                    <li>
                      <i
                        className="fa-solid fa-earth-americas"
                        style={{ color: "#FFD43B" }}
                      ></i>{" "}
                      &nbsp; {movie.TheLoai.QuocGia}
                    </li>
                    <li>
                      <i
                        className="fa-solid fa-comment"
                        style={{ color: "#FFD43B" }}
                      ></i>{" "}
                      &nbsp; {movie.TheLoai.NgonNgu}
                    </li>
                  </ul>
                </div>
                <h6 className="SapChieu-name">{movie.Ten}</h6> {/* Ensure the class name is consistent */}
              </div>
            ))}
          </div>
        </div>
        <div className="button-container">
          <button className="button-hover">
          <Link className="text-white no-underline" href="/page/sapchieu">Xem thêm</Link>
          </button>
        </div>
      </section>
    </>
  );
};

export default SapChieu;
