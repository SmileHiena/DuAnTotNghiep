const Event = () => {
  const Sukien = [
    { id: 1, Anh: '/images/phim/cong-tu-bac-lieu.jpg' },
    { id: 2, Anh: '/images/phim/cong-tu-bac-lieu.jpg' },
    { id: 3, Anh: '/images/phim/cong-tu-bac-lieu.jpg' },
    { id: 4, Anh: '/images/phim/cong-tu-bac-lieu.jpg' },
    { id: 5, Anh: '/images/phim/cong-tu-bac-lieu.jpg' },
    { id: 6, Anh: '/images/phim/cong-tu-bac-lieu.jpg' },
    { id: 7, Anh: '/images/phim/cong-tu-bac-lieu.jpg' },
    { id: 8, Anh: '/images/phim/cong-tu-bac-lieu.jpg' },
    { id: 9, Anh: '/images/phim/cong-tu-bac-lieu.jpg' },
    { id: 10, Anh: '/images/phim/cong-tu-bac-lieu.jpg' },
    { id: 11, Anh: '/images/phim/cong-tu-bac-lieu.jpg' },
    { id: 12, Anh: '/images/phim/cong-tu-bac-lieu.jpg' }
  ];

  return (
    <section style={{ backgroundColor: 'rgba(0, 0, 0, 0.45)' }}>
      <div className="pt-10">
        <h1 className='text-center uppercase text-[40px] text-[#FFFFFF] font-bold mb-8'>Khuyến mãi</h1>
      </div>
      <div className="mx-auto w-full" style={{ maxWidth: '1410px', paddingBottom: '80px' }}>
        <div 
          className="grid gap-4 justify-center  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-[repeat(3,400px)]" 
        >
          {Sukien.slice(0, 6).map(item => (
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