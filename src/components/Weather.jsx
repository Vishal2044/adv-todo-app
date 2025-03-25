// Weather.js
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather } from '../slices/weatherSlice';
import { FaHotjar } from "react-icons/fa";
import { MdDateRange, MdAccessTimeFilled  } from "react-icons/md";

function Weather() {
  const dispatch = useDispatch();
  const weather = useSelector((state) => state.weather.data);
  const error = useSelector((state) => state.weather.error);
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    dispatch(fetchWeather());

    // Update the current time every second
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
      setCurrentDate(now.toLocaleDateString());
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [dispatch]);

  const getWeatherWarning = () => {
    if (!weather) return null;
    const condition = weather.weather?.[0]?.main?.toLowerCase();
    const temperature = weather.main?.temp;

    if (condition === 'rain') {
      return 'Warning: Rainy weather. Outdoor tasks may be affected.';
    }
    if (condition === 'clear') {
      return 'Great weather for outdoor tasks!';
    }
    if (temperature > 35) {
      return 'Warning: High temperature. Stay hydrated and avoid prolonged outdoor activities.';
    }
    return null;
  };

  if (error) return <p>{error}</p>;
  if (!weather) return <p>Loading...</p>;

  return (
    <div>
      <p>
        <FaHotjar size={20} className='hot'/> {weather.main?.temp ?? 'N/A'}°C                
        <MdDateRange size={20} className='date'/> {currentDate}                
        <MdAccessTimeFilled size={20} className='time'/> {currentTime}
      </p>
      {getWeatherWarning() && (
        <p className="text-warning">{getWeatherWarning()}</p>
      )}
    </div>
  );
}

export default Weather;
