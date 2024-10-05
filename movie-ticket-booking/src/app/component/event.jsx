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
      <div className="pt-4">
        <h1 className='text-center uppercase text-[40px] text-[#FFFFFF] font-bold mb-8'>Khuyến mãi</h1>
      </div>
      <div className="mx-auto" style={{ maxWidth: '1410px', paddingBottom: '80px' }}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-[20px] lg:gap-[20px]">
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