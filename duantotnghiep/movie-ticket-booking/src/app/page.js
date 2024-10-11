import React from 'react';
import BlogSection from './component/blog';
import Event from './component/event';
import SapChieu from './component/sapchieu';
import PhimDangChieu from './component/phimdangchieu';
import QA from './component/qa';
import Banner from './component/banner';
import Checkout from './page/checkout/checkout';
import "bootstrap/dist/css/bootstrap.min.css";
export default function Home() {
  return (
    <div>
      <Banner/>
      <SapChieu/>
      <PhimDangChieu/>
      <Event/>
      <BlogSection />
      <QA/>
      {/* < Checkout /> */}

     
    </div>
  );
}






