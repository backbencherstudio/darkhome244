"use client";


import CurrentLocationIcon from '@/components/Icons/CurrentLocation';
import { useLocation } from '@/components/Provider/LocationProvider';
import { useWeatherData } from '@/hooks/useWeatherData';
import { LocateFixed, MapPin, Search, SearchIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react'

export default function RadarAndMaps({overlay}:{overlay?:string}) {

const { location, refreshLocation } = useLocation()

 const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
 const [searchQuery, setSearchQuery] = useState('');
 const [cityName, setCityName] = useState("")
  const {  data, error, loading  } = useWeatherData("current", cityName, location?.latitude, location?.longitude, 1)
  const [lat,setLat] = useState<number | null>(null);
  const [lon,setLon] = useState<number | null>(null);
  console.log(data,"data from maps")



   useEffect(() => {
      try {
        const saved = JSON.parse(localStorage.getItem("recentWeatherSearches") || "[]");
        if (Array.isArray(saved)) setRecentSearches(saved.slice(0, 2));
      } catch { }
    }, []);
  
    // helper to keep last two unique searches
    function addRecentSearch(q: string) {
      setRecentSearches(prev => {
        const next = [q, ...prev.filter(x => x.toLowerCase() !== q.toLowerCase())].slice(0, 2);
        localStorage.setItem("recentWeatherSearches", JSON.stringify(next));
        return next;
      });
    }

    async function handleSearch(e?: React.FormEvent) {
        e?.preventDefault();
    e?.stopPropagation();
    const q = searchQuery.trim();
    if (!q) return;
    setCityName(q);                 // use city
    addRecentSearch(q);             // save to recent
    setShowLocationDropdown(false);
    }

useEffect(() => {
  if (location && data && !loading) {
   setLat(data?.location?.lat || null);
   setLon(data?.location?.lon || null);
  }
}, [location,cityName,data,loading]);

  const handleCurrentLocation = () => {
    setCityName("");
    setSearchQuery("");
    setShowLocationDropdown(false);
    refreshLocation();
  }

  const handleChooseRecent = (q: string) => {
    setCityName(q);
    setSearchQuery(q);
    setShowLocationDropdown(false);
  };


  return (
    <div className="relative h-[80vh] w-full  overflow-hidden border border-[#ffffff1a]">
      <iframe  width="100%" height="100%" src={`https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=mm&metricTemp=°C&metricWind=km/h&zoom=5&overlay=${overlay}&product=ecmwf&level=surface&lat=${lat}&lon=${lon}&detailLat=${lat}&detailLon=${lon}&marker=true`} ></iframe>
         <div className="absolute z-400 sm:left-1/2 left-2   sm:w-[400px] w-[70%] sm:-translate-x-1/2 top-2">
          <div className=" gap-1 w-full bg-transparent">
             <form onSubmit={handleSearch} className="flex items-center bg-[#FFFFFFE5] w-full  rounded-[4px] backdrop-blur-sm  shadow-md">
              <button type="submit" className='flex items-center cursor-pointer group'>
                <Search className="absolute  left-4 text-[#777980] hover:text-[#3399D0]" size={20} />
              </button>
              <input
                type="text"
                placeholder="Search by City"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="  pl-12 pr-4 py-4 rounded-[4px]  text-[#777980] md:text-base text-xs font-light leading-[130%] placeholder-gray-500 focus:outline-none      "
              />
              <button
                onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                type='button'
                className="absolute flex items-center gap-[9px] text-[#3399D0] right-0  top-1/2 -translate-y-1/2  md:px-6 px-4 py-2 md:py-3 rounded-[2px] leading-[100%] font-semibold md:text-base text-sm cursor-pointer  "
              >
                <MapPin size={16} />
                Location
                <svg
                  className={`w-4 h-4 transform transition-transform ${showLocationDropdown ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </form>

            {showLocationDropdown && (
              <div className="absolute md:text-base text-sm top-full left-0 right-0 mt-2 bg-white rounded-[4px] shadow-lg border border-gray-200 z-50">
                <div className="p-2">
                  <div
                    onClick={handleCurrentLocation}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleCurrentLocation()}
                    className="px-3 md:py-2 py-1 hover:bg-gray-100 rounded cursor-pointer flex items-center gap-1 text-[#777980] hover:text-[#3399D0]"
                  >
                    <LocateFixed className='' /> Current Location
                  </div>

                  {/* recent searches (newest first) */}
                  {recentSearches.length === 0 ? (
                    <div className="px-3 md:py-2 py-1 text-center text-gray-500">No recent cities</div>
                  ) : (
                    recentSearches.map((q) => (
                      <div
                        key={q}
                        onClick={() => handleChooseRecent(q)}
                        className="px-3 md:py-2 py-1 hover:bg-gray-100 rounded cursor-pointer text-[#777980] hover:text-[#3399D0] capitalize"
                      >
                        {q}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
           </div>
         </div>
    </div>
  )
}

// import React, { useEffect, useState } from "react";




// import {
//   MapContainer,
//   Marker,
//   Popup,
//   TileLayer,
//   LayersControl,
//   useMap,
// } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";

// import { countries } from 'countries-list';

// // Fix leaflet default icons
// import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
// import markerIcon from "leaflet/dist/images/marker-icon.png";
// import markerShadow from "leaflet/dist/images/marker-shadow.png";
// import { useLocation } from "@/components/Provider/LocationProvider";
// import CurrentLocationIcon from "@/components/Icons/CurrentLocation";
// import SearchIcon from "@/components/Icons/SearchIcon";

// delete (L.Icon.Default.prototype as any)._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: markerIcon2x,
//   iconUrl: markerIcon,
//   shadowUrl: markerShadow,
// });

// const OPENWEATHERMAP_API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY as string;

// // Small helper component to fly map when center changes
// function FlyTo({ center, zoom = 8 }: { center: [number, number]; zoom?: number }) {
//   const map = useMap();
//   React.useEffect(() => {
//     if (center) {
//       map.flyTo(center, zoom, { animate: true, duration: 1.5 });
//     }
//   }, [center, zoom, map]);
//   return null;
// }

// const MapComponent = () => {

//   const { location, refreshLocation } = useLocation()
//   // console.log(refreshLocation, "locationnnnnnnnnnnnnnnnnnn")

//   const defaultCenter: [number, number] = [location?.latitude, location?.longitude];

//   const [query, setQuery] = useState("");
//   const [markerPos, setMarkerPos] = useState<[number, number]>(defaultCenter);
//   const [placeLabel, setPlaceLabel] = useState("• Dhaka, Bangladesh");
//   const [temperature, setTemperature] = useState<number | null>(null);
//   const [btnBorder, setButtonBorder] = useState(false)
//   const [hanldeSearchInput, setHandleSearchInput] = useState(false)

//   useEffect(() => {
//     setMarkerPos([location?.latitude, location?.longitude])
//   }, [location])


//   async function handleSearch(e?: React.FormEvent) {
//     e.preventDefault();
//     e.stopPropagation();
//     const q = query.trim();
//     setHandleSearchInput(!hanldeSearchInput)
//     if (!q) return;
//     try {
//       const countryEntry = Object.entries(countries).find(
//         ([code, country]) => country.name.toLowerCase() === q.toLowerCase()
//       );
//       // If it's a country, search for its capital instead
//       const searchQuery = countryEntry
//       ? `${countryEntry[1].capital},${countryEntry[0]}`
//       : q;
      
   

//       const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
//         searchQuery
//       )}&limit=1&appid=${OPENWEATHERMAP_API_KEY}`;

//       const res = await fetch(url);
//       const data = await res.json();


      


//       if (!data?.length) {
//         alert("No results found. Try 'City, CountryCode' (e.g. Paris, FR)");
//         return;
//       }

//       const top = data[0];
//       const center: [number, number] = [top.lat, top.lon];

//       // Fetch weather data for temperature
//       const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${top.lat}&lon=${top.lon}&units=metric&appid=${OPENWEATHERMAP_API_KEY}`;
//       const weatherRes = await fetch(weatherUrl);
//       const weatherData = await weatherRes.json();

//       console.log(weatherData,"weathererrrrrrrr")   

//       setMarkerPos(center);
//       setPlaceLabel([top.name, top.state, top.country].filter(Boolean).join(", "));
//       setTemperature(weatherData.main?.temp ? Math.round(weatherData.main.temp) : null);
//       setButtonBorder(false)
//     } catch (err) {
//       console.error(err);
//       alert("Search error. Please try again.");
//     }
//   }

//   const handleCurrentLocation = () => {
//     refreshLocation()
//     setButtonBorder(true)
//   }


//   return (
//     <div className="relative h-[80vh] w-full  overflow-hidden border border-[#ffffff1a]">
//       <iframe width="100%" height="100%" src={`https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=mm&metricTemp=°C&metricWind=km/h&zoom=4&overlay=wind&product=ecmwf&level=surface&lat=${location?.latitude}&lon=${location?.longitude}&detailLat=${location?.latitude}&detailLon=${location?.longitude}&marker=true`}frameborder="0"></iframe>
//     </div>
//   );
// };

// export default MapComponent;


//-------------------------this is leaflet map code ----------------now its have been commentd========
 // <MapContainer
//         center={defaultCenter}
//         zoom={12}
//         minZoom={3}
//         scrollWheelZoom
//         style={{ height: "100%", width: "100%" }}
//       >
//         {/* Automatically fly to searched location */}
//         <FlyTo center={markerPos} zoom={8} />

//         <LayersControl position="topright">
//           {/* Base Map */}
//           <LayersControl.BaseLayer checked name="OpenStreetMap">
//             <TileLayer
//               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             />
//           </LayersControl.BaseLayer>

//           {/* Weather Layers */}
//           <LayersControl.Overlay name="🌡 Temperature">
//             <TileLayer
//               url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${OPENWEATHERMAP_API_KEY}`}
//               attribution="&copy; OpenWeatherMap"
//             />
//           </LayersControl.Overlay>

//           <LayersControl.Overlay name="☁ Clouds">
//             <TileLayer
//               url={`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${OPENWEATHERMAP_API_KEY}`}
//               attribution="&copy; OpenWeatherMap"
//             />
//           </LayersControl.Overlay>

//           <LayersControl.Overlay name="🌧 Precipitation">
//             <TileLayer
//               url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${OPENWEATHERMAP_API_KEY}`}
//               attribution="&copy; OpenWeatherMap"
//             />
//           </LayersControl.Overlay>

//           <LayersControl.Overlay name="💨 Wind">
//             <TileLayer
//               url={`https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${OPENWEATHERMAP_API_KEY}`}
//               attribution="&copy; OpenWeatherMap"
//             />
//           </LayersControl.Overlay>
//           <LayersControl.Overlay name="🌊 pressure">
//             <TileLayer
//               url={`https://tile.openweathermap.org/map/pressure_new/{z}/{x}/{y}.png?appid=${OPENWEATHERMAP_API_KEY}`}
//               attribution="&copy; OpenWeatherMap"
//             />
//           </LayersControl.Overlay>

//         </LayersControl>

//         <div className="absolute z-400 right-3 top-15">
//           <div className="flex flex-col gap-1 items-end bg-transparent">
//             <button className={`w-[46px] h-[46px] flex items-center justify-center  rounded-[4px] hover:border-[#0080C4] hover:border-2  cursor-pointer ${btnBorder ? "border-[#0080C4] bg-[#99a196] text-white" : "bg-white text-[#0080C4] border-transparent "} `} onClick={handleCurrentLocation}>
//               <CurrentLocationIcon />
//             </button>
//             <form className="flex" onSubmit={handleSearch}>
//               <input
//                 type="text"
//                 placeholder="Search city or country (e.g., Dhaka)"
//                 className={`flex-1  outline-none text-sm md:text-base ${hanldeSearchInput ? "w-[230px] bg-white px-4" : "w-0  px-0"}`}
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//               />
//               <button className={`w-[46px] h-[46px] flex items-center justify-center   hover:border-2 hover:border-[#0080C4] hover:border-2 cursor-pointer ${!hanldeSearchInput && "rounded-[4px]"} ${btnBorder ? "border-[#0080C4] bg-[#99a196] text-white" : "bg-white text-[#0080C4] border-transparent rounded-tr-[4px] rounded-br-[4px]"} `} type="submit">
//                 <SearchIcon />
//               </button>
//             </form>
//           </div>
//         </div>

//         {/* Search Bar */}
//         {/* <form
//           onSubmit={handleSearch}
//           className="absolute z-400 right-3 top-40  md:w-[360px] flex gap-2 bg-white/90 backdrop-blur px-3 py-2 rounded-xl shadow"
//         >

//           <input
//             type="text"
//             placeholder="Search city or country (e.g., Dhaka)"
//             className="flex-1 outline-none bg-transparent text-sm md:text-base"
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//           />
//           <button
//             type="submit"
//             className="px-3 py-1.5 rounded-lg bg-black text-white text-sm md:text-base"
//           >
//             Search
//           </button>
//         </form> */}

//         {/* Marker */}
//         <Marker position={markerPos}>
//           <Popup>
//             <div className="text-center">
//               <h3 className="font-bold text-base mb-1">{placeLabel}</h3>
//               {temperature !== null && (
//                 <p className="text-sm font-semibold text-orange-600 mb-1">
//                   🌡️ {temperature}°C
//                 </p>
//               )}
//               <p className="text-xs opacity-70">Search to update location</p>
//             </div>
//           </Popup>
//         </Marker>
//       </MapContainer> 