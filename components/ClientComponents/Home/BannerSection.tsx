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
import { CloudRain, MapPin, Search, Sun, Wind } from 'lucide-react';
import React, { useEffect, useState } from 'react'




export default function BannerSection() {
  return (
    <div>
      <div className='w-full h-[588px]'
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
  const { location, refreshLocation } = useLocation()
  const { data, error, loading } = useWeatherData(location?.latitude, location?.longitude)
  console.log(data, "Dataaaaa")

  const [query, setQuery] = useState("");
  const [hanldeSearchInput, setHandleSearchInput] = useState(false)
  const [country, setCountry] = useState(null)
  const [city, setCityName] = useState(null)
  const [weather, setWeather] = useState(null)

  console.log(weather, "dhddddddddddddddddddd")

  const OPENWEATHERMAP_API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY as string;

  useEffect(() => {
    const dataFetch = async () => {

      try {
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${location?.latitude}&lon=${location?.longitude}&units=metric&appid=${OPENWEATHERMAP_API_KEY}`;
        const weatherRes = await fetch(weatherUrl);
        const weatherData = await weatherRes.json();
        setWeather(weatherData)

        const countryCode = weatherData?.sys?.country
        const countryName = countries[countryCode]?.name;
        setCountry(countryName)



        const locationUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${location?.latitude}&lon=${location?.longitude}&limit=1&appid=${OPENWEATHERMAP_API_KEY}`;
        const locationRes = await fetch(locationUrl);
        const locations = await locationRes.json();
        console.log(locations, "loca=====")
        setCityName(locations[0]?.name || locations[0]?.state)


      } catch (error) {
        console.log(error)
      }
    }
    dataFetch()
  }, [loading])

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

      const countryCode = data[0]?.country;
      const countryName = countries[countryCode]?.name;
      console.log(data, "Dataaaaaaa")
      setCountry(countryName)
      setCityName(data?.name || data?.state)

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

      console.log(weatherData, "weathererrrrrrrr")

    } catch (err) {
      console.error(err);
      alert("Search error. Please try again.");
    }
  }

  const handleCurrentLocation = () => {
    refreshLocation()
  }

  const weatherData = {
    location: 'Sydney NSW',
    country: 'Australia',
    date: 'Sep, 07, 2025',
    temperature: '32°',
    condition: 'Sunny Cloudy',
    windSpeed: '22 km/h',
    precipitation: '75%',
    uvIndex: ` ${data?.daily?.uv_index_max[0]} of 15`
  };

  const weatherStats = [
    {
      icon: <WindSpeedIcon />,
      title: "Wind Speed",
      value: `${weather?.wind?.speed} Km/h`,
    },
    {
      icon: <PrecipitationIcon />,
      title: "Precipitation",
      value: `${data?.hourly?.precipitation_probability[0]}%`,
    },
    {
      icon: <UvIndexIcon />,
      title: "UV Index",
      value: weatherData.uvIndex,
    }
  ];

  return (
    <div className="w-full">
      <div className="">
        {/* Search Bar */}
        <div className="mb-4">
          <div className="relative z-50   ">
            <div className="flex items-center bg-[#FFFFFFE5] w-full rounded-[4px] backdrop-blur-sm  shadow-md">
              <Search className="absolute md:left-6 left-4 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by City or Zip Code"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className=" md:pl-[56px] pl-10 pr-4 py-4 rounded-[4px] md:py-[21.5px]   text-[#777980] md:text-base text-xs font-light leading-[130%] placeholder-gray-500 focus:outline-none focus:ring-1  focus:ring-blue-500 md:w-[648px] w-full "
              />
              <button
                onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                className="absolute flex items-center gap-[9px] text-[#3399D0] right-3  top-1/2 -translate-y-1/2  md:px-6 px-4 py-2 md:py-3 rounded-[2px] leading-[100%] font-semibold md:text-base text-sm cursor-pointer"
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
            </div>

            {/* {showLocationDropdown && (
              <div className="absolute md:text-base text-sm  top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-2">
                  <div className="px-3 md:py-2 py-1 hover:bg-gray-100 rounded cursor-pointer">Current Location</div>
                  <div className="px-3 md:py-2 py-1 hover:bg-gray-100 rounded cursor-pointer">Sydney, NSW</div>
                  <div className="px-3 md:py-2 py-1 hover:bg-gray-100 rounded cursor-pointer">Melbourne, VIC</div>
                </div>
              </div>
            )} */}
          </div>
        </div>

        {/* Weather Card */}
        <div className="bg-[#0000004D] backdrop-blur-[50px] rounded-[4px] p-6 md:p-8 text-white   ">
          {/* Header */}
          {loading ? <Loading height='60px' /> : (
            <div>
              <div className="flex justify-between items-start pb-3 border-b border-[#FFFFFF26]">
                <div>
                  <h3 className="text-base md:text-lg leading-[160%] font-semibold mb-2">Today's Weather</h3>
                  <p className="text-[#E9E9EA] text-sm leading-[136%] md:text-base">{getFormattedDate(data?.current?.time)}</p>
                </div>
                <div className="text-right">
                  <h2 className="text-base md:text-lg leading-[160%] font-semibold mb-2">{city}</h2>
                  <p className="text-[#E9E9EA] text-sm leading-[136%] md:text-base">{country}</p>
                </div>
              </div>

              {/* Main Weather Display */}
              <div className="flex md:flex-row flex-col md:mt-8 mt-6">
                {/* Temperature and Condition */}
                <div className="md:w-[43%] w-full flex justify-center md:justify-start items-center mb-6 md:mb-0  ">
                  <div className=' flex gap-4 items-center '>
                    <div className="block ">
                      {/* Weather Icon - Sunny Cloudy */}
                      <img src="/cloudy.png" alt="" className=' object-cover w-full h-full ' />

                    </div>
                    <div className='flex flex-col'>
                      <div className="lg:text-[32px] md:text-[28px] text-2xl capitalize  font-bold font-geist">{Math.round(weather?.main?.temp)}°</div>
                      <div className="text-gray-300 text-sm md:text-base">{weather?.weather[0]?.description}</div>
                    </div>
                  </div>
                </div>

                {/* Weather Stats */}
                <div className="md:w-[53%] w-full flex gap-3 justify-between">
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

