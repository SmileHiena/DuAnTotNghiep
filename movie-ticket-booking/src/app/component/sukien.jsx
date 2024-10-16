"use client";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faChevronLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const Event = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const eventsPerPage = 6; // Number of events to display per page

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:3000/events/");
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

  // Calculate total pages
  const totalPages = Math.ceil(events.length / eventsPerPage);

  // Get current events for the current page
  const currentEvents = events.slice(currentPage * eventsPerPage, (currentPage + 1) * eventsPerPage);

  // Handle page changes
  const handleNextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <section style={{ backgroundColor: 'rgba(0, 0, 0, 0.45)' }}>
      <div className="pt-10">
        <h1 className="text-center uppercase text-[40px] text-[#FFFFFF] font-bold mb-8">
          Khuyến mãi
        </h1>
      </div>
      <div className="mx-auto w-full" style={{ maxWidth: '1410px', paddingBottom: '80px' }}>
        <div
          className="grid gap-4 justify-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-[repeat(3,400px)]"
        >
          {currentEvents.map(item => (
            <div className="rounded-lg overflow-hidden shadow-md" key={item.id}>
              <img
                src={item.Anh}
                className="w-full h-[212px] object-cover"
                alt={item.Ten}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center mt-4">
          <button 
            onClick={handlePreviousPage}
            className="px-4 py-2 rounded text-white "
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          {/* <span className="self-center text-white">
            Page {currentPage + 1} of {totalPages}
          </span> */}
          <button 
            onClick={handleNextPage}
            className="px-4 py-2 rounded text-white"
          >
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Event;