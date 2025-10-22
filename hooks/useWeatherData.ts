import { useState, useEffect } from 'react';

export const useWeatherData = (method,latitude , longitude,days ) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY2;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(
          `https://api.weatherapi.com/v1/${method}.json?key=${apiKey}&q=${latitude},${longitude}&days=${days}&hourly=24&alerts=yes`
        );

        if (!response.ok) throw new Error('API request failed');
        
        const result = await response.json();
        setData(result);
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [latitude, longitude]);

  return { data, loading, error };
};