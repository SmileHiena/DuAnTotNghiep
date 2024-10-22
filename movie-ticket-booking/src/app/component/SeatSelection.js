// Chọn ghế

// components/SeatSelection.js
import { useState } from 'react';

const SeatSelection = ({ seats }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSelectSeat = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  return (
    <div>
      <h3>Chọn ghế</h3>
      <div className="seats">
        {seats.map((seat) => (
          <button
            key={seat.id}
            className={selectedSeats.includes(seat.id) ? 'selected' : ''}
            onClick={() => handleSelectSeat(seat.id)}
          >
            {seat.number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SeatSelection;