import React, { useState, useEffect, useRef } from "react";

const Event = () => {
  const [sukien, setSukien] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchSukien = async () => {
      try {
        const response = await fetch("http://localhost:3000/event");
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        setSukien(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSukien();
  }, []);

  if (loading) {
    return <p className="text-center">Loading events...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <section style={{ backgroundColor: "rgba(0, 0, 0, 0.45)" }}>
      <div className="pt-10">
        <h1 className="text-center uppercase text-[40px] text-[#FFFFFF] font-bold mb-8">
          Khuyến mãi
        </h1>
      </div>
      <div
        className="mx-auto w-full relative"
        style={{ maxWidth: "1410px", paddingBottom: "80px" }}
      >

        {/* Event Cards */}
        <div
          ref={containerRef}
          className="grid gap-4 justify-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-[repeat(3,400px)] overflow-x-auto"
          style={{ scrollBehavior: "smooth" }}
        >
          {sukien.slice(0, 6).map((item) => (
            <div
              className="rounded-lg overflow-hidden shadow-md bg-white p-4"
              key={item.id}
            >
              <img
                src={item.Anh}
                className="w-full h-[212px] object-cover"
                alt={`Event ${item.Ten}`} 
              />
              <h2 className="text-xl font-bold mt-4">{item.Ten}</h2>
              <p className="text-sm mt-2">{item.NoiDung}</p>
              <p className="text-sm mt-2 font-semibold">
                Ngày bắt đầu: {item.NgayBatDau}
              </p>
              <p className="text-sm mt-2 font-semibold">
                Ngày kết thúc: {item.NgayKetThuc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Event;
