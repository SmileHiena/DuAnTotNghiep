import Slider from 'react-slick';
import React from 'react';


const MovieSlider = ({ movies }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <section className="bg-black text-white py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-6">Phim đang chiếu</h2>
        <Slider {...settings}>
          {movies.map((movie) => (
            <div key={movie.id} className="px-4">
              <img src={movie.poster} alt={movie.title} className="rounded-lg shadow-lg" />
              <p className="mt-2 text-center">{movie.title}</p>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default MovieSlider;
