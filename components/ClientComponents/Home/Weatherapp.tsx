"use client";
import { useWeatherData } from '@/hooks/useWeatherData';
import { useState, useEffect } from 'react';

const WeatherApp = () => {
    const [location, setLocation] = useState({ latitude: 52.52, longitude: 13.41 });
    console.log(location)
    console.log(location, "dddddddddd")
    const { data, loading, error } = useWeatherData(location?.latitude, location?.longitude);
    console.log("weather data", data)

    // Get user's current location
    const getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    });
                },
                (error) => {
                    console.error('Geolocation error:', error);
                    alert('Unable to get your location');
                }
            );
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center">
                <div>Loading weather data...</div>
            </div>
        );
    }

    return (
        <div className='maxContainer py-10 text-center'>
            <button
                onClick={getUserLocation}
                className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
            >
                Use My Location
            </button>
        </div>
    );
};

export default WeatherApp;