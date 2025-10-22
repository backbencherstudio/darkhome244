"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

type GeoLocation = { latitude: number; longitude: number } | null;

const LocationContext = createContext(null);

export const LocationProvider = ({ children}) => {
  const [location, setLocation] = useState<GeoLocation>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const getLocation = useCallback(() => {
    if (!navigator?.geolocation) {
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
        setError(err);
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 5 * 60 * 1000, // 5 minutes
      }
    );
  }, []);

  useEffect(() => {
    // automatically get location on mount
    getLocation();
    getLocation();
  }, [getLocation]);

  return (
    <LocationContext.Provider value={{ location, setLocation, loading, error, refreshLocation: getLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => useContext(LocationContext);
