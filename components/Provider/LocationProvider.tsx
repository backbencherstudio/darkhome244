"use client";
// import { useWeatherData } from "@/hooks/useWeatherData";
import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { toast } from "sonner";

type GeoLocation = { latitude: number; longitude: number } | null;

const LocationContext = createContext(null);

export const LocationProvider = ({ children, fallback = { latitude: 52.52, longitude: 13.41 } }) => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  // const { data } = useWeatherData("forecast",location?.latitude, location?.longitude,1)
  // const { data:data2 } = useWeatherData("forecast",location?.latitude, location?.longitude,1)

  const getLocation = useCallback(() => {
    if (!navigator?.geolocation) {
      setLocation(fallback);
      setError(new Error("Geolocation is not supported by this browser."));
      setLoading(false);
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });

        setLoading(false);
      },
      (err) => {
        // user denied or other error — fallback is preserved
        console.log(err, "erooooor")
        if (err.code === 1) {
          toast.error("You have denied location access. Please allow location manually in your browser settings and Refresh the page again")
        } else if (err.code === 2) {
          // POSITION_UNAVAILABLE
          toast.warning("Location information is unavailable.");
        } else if (err.code === 3) {
          // TIMEOUT
          toast.warning("Location request timed out. Please try again.");
        }

        setError(err);
        setLoading(false);
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 5 * 60 * 1000, // 5 minutes
      }
    );
  }, []);

  useEffect(() => {
    // automatically get location on mount
    getLocation();
  }, [getLocation]);

  return (
    <LocationContext.Provider value={{ location, setLocation, loading, error, refreshLocation: getLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => useContext(LocationContext);
