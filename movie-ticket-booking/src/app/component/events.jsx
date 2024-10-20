import React, { useState, useEffect } from 'react';

const Event = () => {
  const [sukien, setSukien] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSukien = async () => {
      try {
        const response = await fetch('http://localhost:3000/event'); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch events');
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
    <section style={{ backgroundColor: 'rgba(0, 0, 0, 0.45)' }}>
      <div className="pt-10">
        <h1 className='text-center uppercase text-[40px] text-[#FFFFFF] font-bold mb-8'>Khuyến mãi</h1>
      </div>
      <div className="mx-auto w-full" style={{ maxWidth: '1410px', paddingBottom: '80px' }}>
        <div 
          className="grid gap-4 justify-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-[repeat(3,400px)]" 
        >
          {sukien.slice(0, 6).map(item => (
            <div className="rounded-lg overflow-hidden shadow-md" key={item.id}>
              <img
                src={item.Anh}
                className="w-full h-[212px] object-cover"
                alt={`Image ${item.id}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Event;
