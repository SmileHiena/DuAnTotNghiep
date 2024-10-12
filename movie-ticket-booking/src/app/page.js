import React from 'react';
import BlogSection from './component/blog';
import Event from './component/event';
import SapChieu from './component/sapchieu';
import PhimDangChieu from './component/dangchieu';
import QA from './component/qa';
import Banner from './component/banner';
import "bootstrap/dist/css/bootstrap.min.css";

// import Detail from './page/details/[id]/page';

import DatVe from './page/datve/page';
export default function Home() {
  return (
    <div>
      {/* <Banner/>
      <PhimDangChieu/>
      <SapChieu/>
      <Event/>
      <BlogSection />
      <QA/> */}

      {/* // <Detail/> */}
     

        <DatVe/>
    </div>
  );
}






