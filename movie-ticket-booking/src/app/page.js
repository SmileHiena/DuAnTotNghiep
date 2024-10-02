import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
// import HeroSection from './component/banner';
// import MovieSlider from './component/MovieSlider';
// import Promotions from './component/promotion';
import BlogSection from './component/blog';
// import FAQSection from './component/FAQ';
import Event from './component/event';
// import PhimDangChieu from './component/sapchieu';
export default function Home() {
  return (
    <div>
      {/* <Header /> */}
      {/* <HeroSection /> */}
      {/* <MovieSlider movies={movies} /> */}
      {/* <Promotions /> */}
      <BlogSection posts={posts} />
      {/* <FAQSection /> */}
      {/* <Footer /> */}
    </div>
  );
}






