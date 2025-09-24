"use client"
import { CloudRain, MapPin, Search, Sun, Wind } from 'lucide-react';
import React, { useState } from 'react'


export default function BannerSection() {
    return (
        <div>
            <div className='w-full h-[588px]'
                style={{
                    backgroundImage: "url('/home-banner.png')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}>
                <div className=' flex  h-full items-center justify-center w-[648px] mx-auto'>
                   <WeatherDashboard/>
                </div>
            </div>
        </div>
    )
}



 function WeatherDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);

  const weatherData = {
    location: 'Sydney NSW',
    country: 'Australia',
    date: 'Sep, 07, 2025',
    temperature: '32°',
    condition: 'Sunny Cloudy',
    windSpeed: '22 km/h',
    precipitation: '75%',
    uvIndex: '2 out of 10'
  };

  return (
    <div className="">
      <div className="">
        {/* Search Bar */}
        <div className="mb-8 ">
          <div className="relative z-50 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg">
            <div className="flex items-center">
              <Search className="absolute left-4 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by City or Zip Code"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-transparent text-gray-700 placeholder-gray-400 focus:outline-none rounded-l-lg"
              />
              <button
                onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                className="flex items-center gap-2 px-4 py-4 text-blue-500 font-medium border-l border-gray-200 rounded-r-lg hover:bg-gray-50 transition-colors cursor-pointer"
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
            
            {showLocationDropdown && (
              <div className="absolute  top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-2">
                  <div className="px-3 py-2 hover:bg-gray-100 rounded cursor-pointer">Current Location</div>
                  <div className="px-3 py-2 hover:bg-gray-100 rounded cursor-pointer">Sydney, NSW</div>
                  <div className="px-3 py-2 hover:bg-gray-100 rounded cursor-pointer">Melbourne, VIC</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Weather Card */}
        <div className="bg-[#0000004D] backdrop-blur-[50px] rounded-2xl p-6 md:p-8 text-white shadow-2xl  ">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-xl md:text-2xl font-medium mb-2">Today's Weather</h1>
              <p className="text-gray-300 text-sm md:text-base">{weatherData.date}</p>
            </div>
            <div className="text-right">
              <h2 className="text-xl md:text-2xl font-medium mb-1">{weatherData.location}</h2>
              <p className="text-gray-300 text-sm md:text-base">{weatherData.country}</p>
            </div>
          </div>

          {/* Main Weather Display */}
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between mb-8">
            {/* Temperature and Condition */}
            <div className="flex items-center mb-6 md:mb-0">
              <div className="relative mr-4 md:mr-6">
                {/* Weather Icon - Sunny Cloudy */}
                <div className="w-16 h-16 md:w-20 md:h-20 relative">
                  {/* Cloud */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-8 md:w-14 md:h-10 bg-gradient-to-r from-gray-300 to-gray-200 rounded-full relative">
                      <div className="absolute -left-2 top-1 w-6 h-6 md:w-7 md:h-7 bg-gray-300 rounded-full"></div>
                      <div className="absolute -right-1 -top-1 w-4 h-4 md:w-5 md:h-5 bg-gray-200 rounded-full"></div>
                    </div>
                  </div>
                  {/* Sun */}
                  <div className="absolute top-0 right-0 w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 md:w-5 md:h-5 bg-yellow-200 rounded-full"></div>
                  </div>
                </div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl lg:text-6xl font-light mb-2">{weatherData.temperature}</div>
                <div className="text-gray-300 text-sm md:text-base">{weatherData.condition}</div>
              </div>
            </div>

            {/* Weather Stats */}
            <div className="grid grid-cols-3 gap-6 md:gap-8 w-full md:w-auto">
              {/* Wind Speed */}
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Wind className="text-gray-300" size={24} />
                </div>
                <div className="text-xs md:text-sm text-gray-300 mb-1">Wind Speed</div>
                <div className="text-sm md:text-base font-medium">{weatherData.windSpeed}</div>
              </div>

              {/* Precipitation */}
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <CloudRain className="text-gray-300" size={24} />
                </div>
                <div className="text-xs md:text-sm text-gray-300 mb-1">Precipitation</div>
                <div className="text-sm md:text-base font-medium">{weatherData.precipitation}</div>
              </div>

              {/* UV Index */}
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Sun className="text-gray-300" size={24} />
                </div>
                <div className="text-xs md:text-sm text-gray-300 mb-1">UV Index</div>
                <div className="text-sm md:text-base font-medium">{weatherData.uvIndex}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}