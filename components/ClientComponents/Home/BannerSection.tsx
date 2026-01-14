"use client"
import Loading from '@/app/loading';
import CloudIcon from '@/components/Icons/CloudIcon';
import PrecipitationIcon from '@/components/Icons/Precipitation';
import UvIndexIcon from '@/components/Icons/UvIndex';
import WindSpeedIcon from '@/components/Icons/WindSpeedIcon';
import { useLocation } from '@/components/Provider/LocationProvider';
import getFormattedDate from '@/helper/formatedDate';
import formatPublishDate from '@/helper/formatedPublishDate';
import { useWeatherData } from '@/hooks/useWeatherData';
import { countries } from 'countries-list';
import { CloudRain, LocateFixed, MapPin, Search, Sun, Wind } from 'lucide-react';
import React, { useEffect, useState } from 'react'

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";


export default function BannerSection() {
  return (
    <div>
      <div className='w-full h-[588px] '
        style={{
          backgroundImage: "url('/home-banner.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
        <div className=' flex  h-full items-center justify-center md:w-[648px] mx-auto px-5 md:px-0'>
          <WeatherDashboard />
        </div>
      </div>
    </div>
  )
}


function WeatherDashboard() {

  const [searchQuery, setSearchQuery] = useState('');
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const { location, refreshLocation } = useLocation()
  const [cityName, setCityName] = useState("")
  // const { data, error, loading } = useWeatherData("current", cityName, location?.latitude, location?.longitude, 1)
  const { data, error, loading } = useWeatherData("forecast", cityName, location?.latitude, location?.longitude, 1)


  const [query, setQuery] = useState("");
  // const [hanldeSearchInput, setHandleSearchInput] = useState(false)
  // const [country, setCountry] = useState(null)
  // const [city, setCityName] = useState(null)
  const [weather, setWeather] = useState(null)




  useEffect(() => {
    if (data) {
      setWeather(data);
    }
  }, [data, loading, cityName, refreshLocation]);

  // useEffect(() => {
  //   const dataFetch = async () => {

  //     try {
  //       const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${location?.latitude}&lon=${location?.longitude}&units=metric&appid=${OPENWEATHERMAP_API_KEY}`;
  //       const weatherRes = await fetch(weatherUrl);
  //       const weatherData = await weatherRes.json();
  //       setWeather(weatherData)

  //       const countryCode = weatherData?.sys?.country
  //       const countryName = countries[countryCode]?.name;
  //       setCountry(countryName)



  //       const locationUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${location?.latitude}&lon=${location?.longitude}&limit=1&appid=${OPENWEATHERMAP_API_KEY}`;
  //       const locationRes = await fetch(locationUrl);
  //       const locations = await locationRes.json();
  //       console.log(locations, "loca=====")
  //       setCityName(locations[0]?.name || locations[0]?.state)


  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   dataFetch()
  // }, [loading])

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

  // search submit (form submit or icon click)
  async function handleSearch(e?: React.FormEvent) {
    e?.preventDefault();
    e?.stopPropagation();
    const q = searchQuery.trim();
    if (!q) return;
    setCityName(q);                 // use city
    addRecentSearch(q);             // save to recent
    setShowLocationDropdown(false);
  }

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


const isUSA = weather?.location?.country === "United States of America";


const temperatureText = isUSA
  ? `${Math.round(weather?.current?.temp_f)}°F`
  : `${Math.round(weather?.current?.temp_c)}°C`;

const windSpeedText = isUSA
  ? `${weather?.current?.wind_mph} Mp/h`
  : `${weather?.current?.wind_kph} Km/h`;

  const weatherStats = [
    {
      icon: <WindSpeedIcon />,
      title: "Wind Speed",
      value: windSpeedText,
    },
    {
      icon: <PrecipitationIcon />,
      title: "Precipitation",
      value: `${weather?.forecast?.forecastday[0]?.day?.daily_chance_of_rain}%`,
    },
    {
      icon: <UvIndexIcon />,
      title: "UV Index",
      value: weather?.current?.uv,
    }
  ];

  return (
    <div className="w-full">
      <div className="">
        {/* Search Bar */}
        <div className="mb-4">
          <div className="relative z-50   ">
            <form onSubmit={handleSearch} className="flex items-center bg-[#FFFFFFE5] w-full rounded-[4px] backdrop-blur-sm  shadow-md">
              <button type="submit" className='flex items-center cursor-pointer group'>
                <Search className="absolute md:left-6 left-4 text-[#777980] hover:text-[#3399D0]" size={20} />
              </button>
              <input
                type="text"
                placeholder="Search by City or Zip Code"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className=" md:pl-[56px] pl-10 pr-4 py-4 rounded-[4px] md:py-[21.5px]   text-[#777980] md:text-base text-xs font-light leading-[130%] placeholder-gray-500 focus:outline-none focus:ring-1  focus:ring-blue-500 md:w-[648px] w-full "
              />
              <button
                onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                type='button'
                className="absolute flex items-center gap-[9px] text-[#3399D0] right-3  top-1/2 -translate-y-1/2  md:px-6 px-4 py-2 md:py-3 rounded-[2px] leading-[100%] font-semibold md:text-base text-sm cursor-pointer  "
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
            {/* {showLocationDropdown && (
              <div className="absolute md:text-base text-sm  top-full left-0 right-0 mt-2 bg-white rounded-[4px] shadow-lg border border-gray-200 z-50">
                <div className="p-2">
                  <div onClick={handleCurrentLocation} className="px-3 md:py-2 py-1 hover:bg-gray-100 rounded cursor-pointer">Current Location</div>
                  <div className="px-3 md:py-2 py-1 hover:bg-gray-100 rounded cursor-pointer">Sydney, NSW</div>
                  <div className="px-3 md:py-2 py-1 hover:bg-gray-100 rounded cursor-pointer">Melbourne, VIC</div>
                </div>
              </div>
            )} */}
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

        {/* Weather Card */}
        <div className="bg-[#0000004D] backdrop-blur-[50px] rounded-[4px] p-6 md:p-8 text-white   ">
          {/* Header */}
          {loading ? <Loading height='60px' /> : error ? <div
            className="mb-4 rounded-md border border-red-500/40 bg-red-500/10 p-4 text-red-200"
            role="alert"
            aria-live="assertive"
          >
            <p className="font-semibold text-center">{error ? error : "No matching City found."}</p>

            {/* Optional retry button if you have a refetch or can re-trigger search */}
            {/* <button
        onClick={() => handleSearch()}
        className="mt-3 rounded px-3 py-1 text-sm bg-red-500/20 hover:bg-red-500/30"
      >
        Try again
      </button> */}
          </div> : (
            <div>
              <div className="flex justify-between items-start pb-3 border-b border-[#FFFFFF26]">
                <div>
                  <h3 className="text-base md:text-lg leading-[160%] font-semibold mb-2">Today's Weather</h3>
                  <p className="text-[#E9E9EA] text-sm leading-[136%] md:text-base">{getFormattedDate(weather?.location?.localtime)}</p>
                </div>
                <div className="text-right">
                  <h2 className="text-base md:text-lg leading-[160%] font-semibold mb-2">{weather?.location?.name}</h2>
                  <p className="text-[#E9E9EA] text-sm leading-[136%] md:text-base">{weather?.location?.country}</p>
                </div>
              </div>

              {/* Main Weather Display */}
              <div className="flex md:flex-row flex-col md:mt-8 mt-6 md:gap-10">
                {/* Temperature and Condition */}
                <div className="w-auto flex justify-center md:justify-start items-center mb-6 md:mb-0  ">
                  <div className=' flex gap-4 items-center '>
                    <div className="block ">
                      {/* Weather Icon - Sunny Cloudy */}
                      {/* {weather?.weather[0]?.main === "Rain" ? <img src="/rain.png" alt="" className=' object-cover w-[72px] h-full ' /> : <img src="/cloudy.png" alt="" className=' object-cover w-full h-full ' />} */}
                      <img src={weather?.current?.condition?.icon} alt="" className=' object-cover w-[72px] h-full ' />

                    </div>
                    <div className='flex flex-col'>
                      {/* <div className="lg:text-[32px] md:text-[28px] text-2xl capitalize  font-bold font-geist">{weather?.location?.country === "United States of America" ? Math.round(weather?.current?.temp_f) : Math.round(weather?.current?.temp_c) } {Math.round(weather?.current?.temp_f)}°
                      f</div> */}
                      <div className="lg:text-[32px] md:text-[28px] text-2xl capitalize font-bold font-geist">
                        {/* {weather?.location?.country === "United States of America"
                          ? `${Math.round(weather?.current?.temp_f)}°F`
                          : `${Math.round(weather?.current?.temp_c)}°C`} */}
                          {temperatureText}
                      </div>
                      <div className="text-gray-300 text-sm md:text-base">{weather?.current?.condition?.text}</div>
                    </div>
                  </div>
                </div>

                {/* Weather Stats */}
                <div className="flex-1 flex gap-3 justify-between">
                  {/* Wind Speed */}
                  {weatherStats.map((stat, index) => (
                    <div className="border-l border-[#FFFFFF26] md:pl-4 pl-4" key={index}>

                      <div className="flex mb-4">
                        <span>{stat?.icon}</span>
                      </div>
                      <div className="text-xs md:text-sm text-white mb-2 font-semibold">{stat?.title}</div>
                      <div className="text-sm leading-[100%] text-[#E9E9EA] ">{stat?.value}</div>
                    </div>
                  ))}

                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

