// src/redux/slices/bookingSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movieId: null,
  showtime: null,
  theater: null,
  seats: [],
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBookingDetails: (state, action) => {
      const { movieId, showtime, theater } = action.payload;
      state.movieId = movieId;
      state.showtime = showtime;
      state.theater = theater;
    },
    setSeats: (state, action) => {
      state.seats = action.payload;
    },
    clearBooking: (state) => {
      state.movieId = null;
      state.showtime = null;
      state.theater = null;
      state.seats = [];
    },
  },
});

export const { setBookingDetails, setSeats, clearBooking } = bookingSlice.actions;

export default bookingSlice.reducer;
