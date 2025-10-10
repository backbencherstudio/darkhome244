import React from 'react';
import { Cloud, CloudRain, Sun, CloudDrizzle } from 'lucide-react';
import UvIndexIcon from '@/components/Icons/UvIndex';
import Example from './Calender';

interface WeatherDay {
  date: number;
  day: string;
  temp: number;
  icon: 'sun' | 'cloud' | 'rain' | 'drizzle';
}

interface CityWeather {
  name: string;
  temp: number;
  precipitation: number;
  humidity: number;
  wind: number;
  day: string;
  time: string;
  icon: 'sun' | 'cloud' | 'rain' | 'drizzle';
}

const MonthlyForecast: React.FC = () => {
  const currentWeather = {
    temp: 29,
    precipitation: 2,
    humidity: 70,
    wind: 3
  };

  const calendarDays: WeatherDay[] = [
    { date: 1, day: 'Mon', temp: 28, icon: 'sun' },
    { date: 2, day: 'Tue', temp: 28, icon: 'cloud' },
    { date: 3, day: 'Wed', temp: 27, icon: 'rain' },
    { date: 4, day: 'Thu', temp: 27, icon: 'drizzle' },
    { date: 5, day: 'Fri', temp: 27, icon: 'rain' },
    { date: 6, day: 'Sat', temp: 27, icon: 'cloud' },
    { date: 7, day: 'Sun', temp: 27, icon: 'cloud' },
    { date: 8, day: 'Mon', temp: 31, icon: 'cloud' },
    { date: 9, day: 'Tue', temp: 27, icon: 'rain' },
    { date: 10, day: 'Wed', temp: 27, icon: 'drizzle' },
    { date: 11, day: 'Thu', temp: 27, icon: 'drizzle' },
    { date: 12, day: 'Fri', temp: 27, icon: 'cloud' },
    { date: 13, day: 'Sat', temp: 27, icon: 'rain' },
    { date: 14, day: 'Sun', temp: 27, icon: 'drizzle' },
    { date: 15, day: 'Mon', temp: 31, icon: 'cloud' },
    { date: 16, day: 'Tue', temp: 27, icon: 'rain' },
    { date: 17, day: 'Wed', temp: 27, icon: 'drizzle' },
    { date: 18, day: 'Thu', temp: 27, icon: 'drizzle' },
    { date: 19, day: 'Fri', temp: 27, icon: 'cloud' },
    { date: 20, day: 'Sat', temp: 27, icon: 'rain' },
    { date: 21, day: 'Sun', temp: 27, icon: 'drizzle' },
    { date: 22, day: 'Mon', temp: 31, icon: 'cloud' },
    { date: 23, day: 'Tue', temp: 27, icon: 'cloud' },
    { date: 24, day: 'Wed', temp: 27, icon: 'rain' },
    { date: 25, day: 'Thu', temp: 27, icon: 'drizzle' },
    { date: 26, day: 'Fri', temp: 27, icon: 'cloud' },
    { date: 27, day: 'Sat', temp: 27, icon: 'rain' },
    { date: 28, day: 'Sun', temp: 27, icon: 'drizzle' },
    { date: 29, day: 'Mon', temp: 31, icon: 'cloud' },
    { date: 30, day: 'Tue', temp: 27, icon: 'rain' }
  ];

  const cities: CityWeather[] = [
    { name: 'Ankara', temp: 32, precipitation: 10, humidity: 44, wind: 14, day: 'Tuesday', time: '10:00 PM', icon: 'cloud' },
    { name: 'Alaska', temp: 25, precipitation: 10, humidity: 44, wind: 14, day: 'Tuesday', time: '10:00 PM', icon: 'rain' },
    { name: 'Berlin', temp: 24, precipitation: 10, humidity: 44, wind: 14, day: 'Tuesday', time: '10:00 PM', icon: 'rain' },
    { name: 'Paris', temp: 24, precipitation: 10, humidity: 44, wind: 14, day: 'Tuesday', time: '10:00 PM', icon: 'rain' }
  ];

  const getWeatherIcon = (icon: string, size: number = 24) => {
    const props = { size, className: 'text-blue-500' };
    switch (icon) {
      case 'sun': return <Sun {...props} className="text-yellow-500" />;
      case 'cloud': return <Cloud {...props} />;
      case 'rain': return <CloudRain {...props} />;
      case 'drizzle': return <CloudDrizzle {...props} />;
      default: return <Cloud {...props} />;
    }
  };

  return (
    <div className="">
      <div className="mx-auto flex gap-6">
        {/* Calendar Card */}
        <div className="bg-white p-6 w-[56.36%] relative h-fit">
          {/* <div className="flex items-center justify-between mb-8">
            <div className="flex gap-4">
              <UvIndexIcon className="size-12 text-[#0080C4]" />
              <div className="lg:text-[48px] md:text-[36px] text-[28px] text-[#3E3232] flex  leading-[100%] items-start ">{currentWeather.temp}<span className='md:text-base text-sm font-medium'>°C</span> </div>
              <div className='text-[#777980] text-sm flex flex-col gap-0 '>
                <div className="">
                  Precipitation: {currentWeather.precipitation}%
                </div>
                <div className="">
                  Humidity: {currentWeather.humidity}%
                </div>
                <div className="">
                  Wind: {currentWeather.wind} km/H
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-semibold">September</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div> */}

          {/* <div className="grid grid-cols-7 gap-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
              <div key={day} className="px-4 py-2 text-sm font-medium text-gray-500 mb-2 ">
                {day}
              </div>
            ))}

            {calendarDays.map((day, index) => (
              <div
                key={index}
                className={`aspect-square  px-4 py-2 flex items-center justify-between w-full border transition-all r hover:shadow-lg ${day.date === 3 ? 'bg-blue-500 text-white' : 'hover:bg-gray-50'
                  }`}
              >
                <div className='flex flex-col'>
                  <div className="text-lg font-semibold mb-1">{day.date}</div>
                  <div className="text-xs">{day.temp}°</div>
                </div>
                <div className="mb-1">{getWeatherIcon(day.icon, 20)}</div>
              </div>
            ))}
          </div> */}

          <Example/>
        </div>

        {/* City Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {cities.map((city, index) => (
            <div key={index} className="bg-white rounded-3xl p-6 shadow-2xl">
              <div className="flex items-start justify-between mb-4">
                <div className="text-5xl font-bold">{city.temp}°C</div>
                {getWeatherIcon(city.icon, 64)}
              </div>

              <div className="space-y-1 text-sm text-gray-600 mb-4">
                <div>Precipitation: {city.precipitation}%</div>
                <div>Humidity: {city.humidity}%</div>
                <div>Wind: {city.wind} Km/H</div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="text-2xl font-bold mb-1">{city.name}</div>
                <div className="text-sm text-gray-600">
                  {city.day} {city.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MonthlyForecast;