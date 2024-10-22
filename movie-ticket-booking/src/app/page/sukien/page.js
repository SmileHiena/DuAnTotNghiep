"use client"

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const EventPage = () => {
  const [events, setEvents] = useState([]); // State to hold events

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:3000/event/");
        if (!response.ok) throw new Error("Failed to fetch events.");
        const data = await response.json();
        setEvents(data); // Store fetched events in state
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchEvents(); // Call the fetch function when component mounts
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#212529' }}>
      <div className="max-w-[1410px] w-full">
        <h1 className="text-3xl font-bold mt-10 mb-10">Chương Trình Khuyến Mãi</h1>
        <div className="space-y-6 mb-4">
          {events.map((event) => (
            <div key={event.id} className="mb-8 overflow-hidden flex h-[450px] rounded-lg shadow" style={{ backgroundColor: 'rgba(0, 0, 0, 0.35)' }}>
              <div className="w-1/2 h-[450px] flex justify-center items-center">
                <Image
                  src={event.Anh}
                  alt={event.Ten}
                  layout="intrinsic"
                  width={400}
                  height={600}
                  className="px-4 object-cover max-h-[350px] w-full"
                />
              </div>
              <div className="p-14 w-1/2 flex flex-col justify-between">
                <div className="flex-grow flex flex-col justify-between">
                  <h2 className="text-xl font-semibold text-[#F5CF49]">{event.Ten}</h2>
                  <p className="text-gray-300 flex-grow">{event.NoiDung}</p>
                  <div className="text-white mt-2">
                    Ngày bắt đầu: <span className="font-medium">{event.NgayBatDau}</span>
                  </div>
                  <div className="text-white mt-2">
                    Ngày kết thúc: <span className="font-medium">{event.NgayKetThuc}</span>
                  </div>
                  <div className="text-white mt-2">
                    Lưu ý: <span className="font-medium">{event.Luuy}</span>
                  </div>
                  <div className="text-white mt-2">
                    Điều kiện: <span className="font-medium">{event.DieuKien}</span>
                  </div>
                </div>
                {/* Button to book tickets */}
                <Link href="/page/danhsach">
                  <button
                    className="mt-4 bg-[#F5CF49] text-black py-2 px-4 rounded hover:bg-[#e0b52e] transition duration-200 text-lg font-semibold"
                    style={{ width: '150px', height: '40px' }}
                  >
                    Đặt Ngay
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventPage;
