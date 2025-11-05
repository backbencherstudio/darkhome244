import { useState, useEffect } from 'react';

export const useWeatherData = (method: string, cityName?: string, latitude?: number, longitude?: number, days?: number) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

  const location = cityName
    ? encodeURIComponent(cityName)
    : `${latitude},${longitude}`;

  // console.log(location, "Fetching weather data for location");
  // console.log(latitude, longitude, "Fetching weather data for location");


   
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `https://api.weatherapi.com/v1/${method}.json?key=${apiKey}&q=${location}&days=${days}&hourly=24&alerts=yes`
      );
      // console.log(response, "response from weather api");
    
      

      const result = await response.json();
      if (!response.ok) {
        setError(result.error?.message || 'Error fetching weather data');
        return
      } else {
        setError(null);
        setData(result);
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   fetchData();
  // }, [latitude, longitude, cityName, method, days, apiKey, location]);

  useEffect(() => {
    if (!location.includes('undefined')) {
      fetchData();
    }
  }, [location, method, days, apiKey]);


  return { data, loading, error };
};