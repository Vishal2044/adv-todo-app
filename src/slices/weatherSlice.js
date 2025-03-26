import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;

// Async thunk to fetch weather data from OpenWeather API
export const fetchWeather = createAsyncThunk('weather/fetchWeather', async () => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=Jamnagar&appid=${API_KEY}&units=metric`
  );
  return response.data;
});

// Slice to manage weather state
const weatherSlice = createSlice({
  name: 'weather',
  initialState: { data: null, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.data = action.payload; // Store fetched weather data
        state.error = null; // Clear any previous errors
      })
      .addCase(fetchWeather.rejected, (state) => {
        state.error = 'Failed to fetch weather data.'; // Set error message on failure
      });
  },
});

export const weatherReducer = weatherSlice.reducer;
