"use client";

import React, { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  LayersControl,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import { countries } from 'countries-list';

// Fix leaflet default icons
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { useLocation } from "@/components/Provider/LocationProvider";
import CurrentLocationIcon from "@/components/Icons/CurrentLocation";
import SearchIcon from "@/components/Icons/SearchIcon";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const OPENWEATHERMAP_API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY as string;

// Small helper component to fly map when center changes
function FlyTo({ center, zoom = 8 }: { center: [number, number]; zoom?: number }) {
  const map = useMap();
  React.useEffect(() => {
    if (center) {
      map.flyTo(center, zoom, { animate: true, duration: 1.5 });
    }
  }, [center, zoom, map]);
  return null;
}

const MapComponent = () => {

  const { location, refreshLocation } = useLocation()
  // console.log(refreshLocation, "locationnnnnnnnnnnnnnnnnnn")

  const defaultCenter: [number, number] = [location?.latitude, location?.longitude];

  const [query, setQuery] = useState("");
  const [markerPos, setMarkerPos] = useState<[number, number]>(defaultCenter);
  const [placeLabel, setPlaceLabel] = useState("• Dhaka, Bangladesh");
  const [temperature, setTemperature] = useState<number | null>(null);
  const [btnBorder, setButtonBorder] = useState(false)
  const [hanldeSearchInput, setHandleSearchInput] = useState(false)

  useEffect(() => {
    setMarkerPos([location?.latitude, location?.longitude])
  }, [location])


  async function handleSearch(e?: React.FormEvent) {
    e.preventDefault();
    e.stopPropagation();
    const q = query.trim();
    setHandleSearchInput(!hanldeSearchInput)
    if (!q) return;
    try {
      const countryEntry = Object.entries(countries).find(
        ([code, country]) => country.name.toLowerCase() === q.toLowerCase()
      );
      // If it's a country, search for its capital instead
      const searchQuery = countryEntry
      ? `${countryEntry[1].capital},${countryEntry[0]}`
      : q;
      
   

      const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
        searchQuery
      )}&limit=1&appid=${OPENWEATHERMAP_API_KEY}`;

      const res = await fetch(url);
      const data = await res.json();


      


      if (!data?.length) {
        alert("No results found. Try 'City, CountryCode' (e.g. Paris, FR)");
        return;
      }

      const top = data[0];
      const center: [number, number] = [top.lat, top.lon];

      // Fetch weather data for temperature
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${top.lat}&lon=${top.lon}&units=metric&appid=${OPENWEATHERMAP_API_KEY}`;
      const weatherRes = await fetch(weatherUrl);
      const weatherData = await weatherRes.json();

      console.log(weatherData,"weathererrrrrrrr")   

      setMarkerPos(center);
      setPlaceLabel([top.name, top.state, top.country].filter(Boolean).join(", "));
      setTemperature(weatherData.main?.temp ? Math.round(weatherData.main.temp) : null);
      setButtonBorder(false)
    } catch (err) {
      console.error(err);
      alert("Search error. Please try again.");
    }
  }

  const handleCurrentLocation = () => {
    refreshLocation()
    setButtonBorder(true)
  }


  return (
    <div className="relative h-[80vh] w-full rounded-2xl overflow-hidden border border-[#ffffff1a]">
      <MapContainer
        center={defaultCenter}
        zoom={12}
        minZoom={3}
        scrollWheelZoom
        style={{ height: "100%", width: "100%" }}
      >
        {/* Automatically fly to searched location */}
        <FlyTo center={markerPos} zoom={8} />

        <LayersControl position="topright">
          {/* Base Map */}
          <LayersControl.BaseLayer checked name="OpenStreetMap">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>

          {/* Weather Layers */}
          <LayersControl.Overlay name="🌡 Temperature">
            <TileLayer
              url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${OPENWEATHERMAP_API_KEY}`}
              attribution="&copy; OpenWeatherMap"
            />
          </LayersControl.Overlay>

          <LayersControl.Overlay name="☁ Clouds">
            <TileLayer
              url={`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${OPENWEATHERMAP_API_KEY}`}
              attribution="&copy; OpenWeatherMap"
            />
          </LayersControl.Overlay>

          <LayersControl.Overlay name="🌧 Precipitation">
            <TileLayer
              url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${OPENWEATHERMAP_API_KEY}`}
              attribution="&copy; OpenWeatherMap"
            />
          </LayersControl.Overlay>

          <LayersControl.Overlay name="💨 Wind">
            <TileLayer
              url={`https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${OPENWEATHERMAP_API_KEY}`}
              attribution="&copy; OpenWeatherMap"
            />
          </LayersControl.Overlay>
          <LayersControl.Overlay name="🌊 pressure">
            <TileLayer
              url={`https://tile.openweathermap.org/map/pressure_new/{z}/{x}/{y}.png?appid=${OPENWEATHERMAP_API_KEY}`}
              attribution="&copy; OpenWeatherMap"
            />
          </LayersControl.Overlay>

        </LayersControl>

        <div className="absolute z-400 right-3 top-15">
          <div className="flex flex-col gap-1 items-end bg-transparent">
            <button className={`w-[46px] h-[46px] flex items-center justify-center  rounded-[4px] hover:border-[#0080C4] hover:border-2  cursor-pointer ${btnBorder ? "border-[#0080C4] bg-[#99a196] text-white" : "bg-white text-[#0080C4] border-transparent "} `} onClick={handleCurrentLocation}>
              <CurrentLocationIcon />
            </button>
            <form className="flex" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search city or country (e.g., Dhaka)"
                className={`flex-1  outline-none text-sm md:text-base ${hanldeSearchInput ? "w-[230px] bg-white px-4" : "w-0  px-0"}`}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button className={`w-[46px] h-[46px] flex items-center justify-center   hover:border-2 hover:border-[#0080C4] hover:border-2 cursor-pointer ${!hanldeSearchInput && "rounded-[4px]"} ${btnBorder ? "border-[#0080C4] bg-[#99a196] text-white" : "bg-white text-[#0080C4] border-transparent rounded-tr-[4px] rounded-br-[4px]"} `} type="submit">
                <SearchIcon />
              </button>
            </form>
          </div>
        </div>

        {/* Search Bar */}
        {/* <form
          onSubmit={handleSearch}
          className="absolute z-400 right-3 top-40  md:w-[360px] flex gap-2 bg-white/90 backdrop-blur px-3 py-2 rounded-xl shadow"
        >

          <input
            type="text"
            placeholder="Search city or country (e.g., Dhaka)"
            className="flex-1 outline-none bg-transparent text-sm md:text-base"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="submit"
            className="px-3 py-1.5 rounded-lg bg-black text-white text-sm md:text-base"
          >
            Search
          </button>
        </form> */}

        {/* Marker */}
        <Marker position={markerPos}>
          <Popup>
            <div className="text-center">
              <h3 className="font-bold text-base mb-1">{placeLabel}</h3>
              {temperature !== null && (
                <p className="text-sm font-semibold text-orange-600 mb-1">
                  🌡️ {temperature}°C
                </p>
              )}
              <p className="text-xs opacity-70">Search to update location</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;