import React, { Profiler } from 'react';
import BlogSection from './component/blog';
import Event from './component/sukien';
import SapChieu from './component/sapchieu';
import DangChieu from './component/dangchieu';
import QA from './component/qa';
import Banner from './component/banner';
import "bootstrap/dist/css/bootstrap.min.css";
import Profile from './page/frofile/frofile';
export default function Home() {
  return (
    <div>
      {/* <Banner />
      <DangChieu />
      <SapChieu />
      <Event />
      <BlogSection />
      <QA /> */}
      <Profile />
    </div>
  );
}






