const Event = () => {
  const Sukien = [
    { id: 1, Anh: '/images/logovn.png' },
    { id: 2, Anh: '/images/logovn.png' },
    { id: 3, Anh: '/images/logovn.png' },
    { id: 4, Anh: '/images/logovn.png' },
    { id: 5, Anh: '/images/logovn.png' },
    { id: 6, Anh: '/images/logovn.png' },
    { id: 7, Anh: '/images/logovn.png' },
    { id: 8, Anh: '/images/logovn.png' },
    { id: 9, Anh: '/images/logovn.png' },
    { id: 10, Anh: '/images/logovn.png' },
    { id: 11, Anh: '/images/logovn.png' },
    { id: 12, Anh: '/images/logovn.png' }
  ];

  return (
    <section style={{ backgroundColor: 'rgba(0, 0, 0, 0.45)' }}>
      <div className="pt-4"> {/* Thay margin top bằng padding top */}
        <h1 className='text-center uppercase text-[40px] text-[#FFFFFF] font-bold mb-8'>Khuyến mãi</h1>
      </div>
      <div className="container mx-auto mt-4" style={{ maxWidth: '1410px' }}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-[20px] lg:gap-[20px] mb-24">
          {Sukien.slice(0, 6).map(item => (
            <div className="mb-[5px]" key={item.id}>
              <div className="rounded-lg overflow-hidden shadow-md">
                <img
                  src={item.Anh}
                  className="w-[457px] h-[212px] object-cover" // Kích thước ảnh 457x212
                  alt={`Image ${item.id}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Event;
