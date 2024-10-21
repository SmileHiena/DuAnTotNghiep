"use client";
import React, { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import Link from 'next/link';
import "../../../public/styles/dangchieu.css";

// Dynamically import the slider
const Slider = dynamic(() => import('react-slick'), { ssr: false });

const Event = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:3000/event/");
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <p className="text-center">Loading events...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  const settings = {
    dots: false, 
    infinite: true,
    speed: 200,
    slidesToShow: 3,
    slidesToScroll: 1, 
    rows: 2,
    autoplay: true, 
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          rows: 2
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          rows: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 2
        }
      }
    ]
  };

  return (
    <section className="dang-chieu pb-5">
      <div className="dang-chieu__container mx-auto py-8">
        <div className=" max-w-full mx-auto py-8">
          <h2 className="dang-chieu__title pt-4">KHUYỄN MÃI</h2>
          <Slider {...settings}>
            {events.map((event) => (
              <div key={event.id} className="dang-chieu__card">
                <Link href={`page/eventdetails/${event.id}`}>
                  <img
                    src={event.Anh}
                    alt={event.Ten}
                    className="dang-chieu__image"
                  />
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Event;
