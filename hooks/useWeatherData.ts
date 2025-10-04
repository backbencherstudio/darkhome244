import { useState, useEffect } from 'react';

export const useWeatherData = (latitude  , longitude ) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=uv_index_max,uv_index_clear_sky_max,surface_pressure_min,sunset,sunrise&hourly=uv_index,uv_index_clear_sky,is_day,temperature_2m,precipitation,precipitation_probability,rain,weather_code,surface_pressure,wind_speed_10m&current=temperature_2m,is_day,precipitation,rain,snowfall,weather_code,wind_speed_10m&timezone=auto&past_days=92&forecast_days=16&daily=temperature_2m_max,weather_code `
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