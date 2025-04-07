import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather } from '../slices/weatherSlice';
import { FaHotjar } from "react-icons/fa";
import { MdDateRange, MdAccessTimeFilled } from "react-icons/md";

function Weather() {
  const dispatch = useDispatch();
  const weather = useSelector((state) => state.weather.data);
  const error = useSelector((state) => state.weather.error);
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    dispatch(fetchWeather());
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
      setCurrentDate(now.toLocaleDateString());
    }, 1000);
    return () => clearInterval(interval);
  }, [dispatch]);

  const getWeatherWarning = () => {
    if (!weather) return null;
    const condition = weather.weather?.[0]?.main?.toLowerCase();
    const temperature = weather.main?.temp;
    if (condition === 'rain') return '☔ Rainy weather. Outdoor tasks may be affected.';
    if (condition === 'clear') return '☀️ Clear skies — great for outdoor tasks!';
    if (temperature > 35) return '🔥 High temperature. Stay hydrated!';
    return null;
  };

  if (error) return <p className="text-red-500">{error}</p>;
  if (!weather) return <p className="text-gray-500">Loading weather...</p>;

  return (
    <div className="mb-4 text-center bg-gradient-to-r from-blue-200 to-blue-300 p-4 rounded-lg shadow">
      <p className="text-lg font-medium flex flex-wrap items-center justify-center gap-4">
        <span className="flex items-center gap-1"><FaHotjar /> {weather.main?.temp ?? 'N/A'}°C</span>
        <span className="flex items-center gap-1"><MdDateRange /> {currentDate}</span>
        <span className="flex items-center gap-1"><MdAccessTimeFilled /> {currentTime}</span>
      </p>
      {getWeatherWarning() && (
        <p className="mt-2 text-sm font-semibold text-orange-600">{getWeatherWarning()}</p>
      )}
    </div>
  );
}

export default Weather;
