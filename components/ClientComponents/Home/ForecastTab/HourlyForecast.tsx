"use client";

import { useEffect, useRef, useState } from "react";

import { Cloud, CloudRain, Sun, CloudDrizzle, Cog } from "lucide-react";
import LoadingMin from "@/components/reusable/LoadingMin";
import TempretureChart from "./TempretureChart";
import { useLocation } from "@/components/Provider/LocationProvider";
import { useWeatherData } from "@/hooks/useWeatherData";
import NearestCityCard from "./NearestCityCard";
import Loading from "@/app/loading";



// Weather condition details (used in both current and forecast)
export interface WeatherCondition {
  text: string;
  icon: string;
  code: number;
}

// Hourly forecast entry
export interface WeatherHour {
  time: string;
  temp_c: number;
  temp_f?: number;
  is_day?: number;
  condition: WeatherCondition;
}

//  Daily forecast summary
export interface WeatherDayData {
  maxtemp_c: number;
  mintemp_c: number;
  avgtemp_c: number;
  avghumidity: number;
  totalprecip_mm: number;
  maxwind_kph: number;
  condition: WeatherCondition;
}

//  A forecast day (with date, daily data, and 24-hour breakdown)
export interface ForecastDay {
  date: string;
  day: WeatherDayData;
  hour: WeatherHour[];
}

//  Location metadata
export interface LocationData {
  name: string;
  region: string;
  country: string;
  lat?: number;
  lon?: number;
  tz_id?: string;
  localtime: string;
}

//  Current weather section
export interface CurrentData {
  temp_c: number;
  temp_f?: number;
  humidity: number;
  wind_kph: number;
  wind_mph: number;
  precip_mm: number;
  condition: WeatherCondition;
}

// The full weather API response
export interface WeatherAPIResponse {
  location?: LocationData;
  current?: CurrentData;
  forecast?: {
    forecastday: ForecastDay[];
  };
}

const HourlyForecast = () => {

  const { location, refreshLocation } = useLocation()
  const latitude = location?.latitude
  const longitude = location?.longitude

  const { data, error, loading } = useWeatherData("forecast", "", latitude, longitude, 1)

  const [forecastData, setForecastData] = useState<WeatherAPIResponse | null>(null);







  // ✅ Bangladeshi Districts
  const cities = ["Gazipur", "Pabna", "Kustia", "Khulna"];

  // Real-time
  const timeRef = useRef<HTMLSpanElement>(null);
  const locale = navigator.language || "en-US";

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString(locale, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });


      if (timeRef.current) {
        timeRef.current.textContent = `${timeString}`;
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (data && !loading) {
      setForecastData(data);
    }
  }, [data, loading, refreshLocation]);


  const isUSA = forecastData?.location?.country === "United States of America";

  const temp = isUSA ? forecastData?.current?.temp_f : forecastData?.current?.temp_c;
  const wind = isUSA ? `${forecastData?.current?.wind_mph} Mp/h` : `${forecastData?.current?.wind_kph} Km/h`;
  const unit = isUSA ? "°F" : "°C";

  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center h-60">
  //       <LoadingMin />
  //     </div>
  //   );
  // }


  return (
    <div className="flex lg:flex-row flex-col gap-4">
      {/* 🌤️ Current Weather Section */}
      <div className="lg:w-[58%] lg:p-6 p-4 bg-white shadow rounded-[4px]">
        {loading ? <Loading height="h-[15vh]" /> : (
          <div>
            <div className="flex justify-between items-start">
              <div className="flex gap-20">
                <div className="flex gap-6 items-center">
                  <div className="flex flex-col md:flex-row  items-center">
                    <span> <img src={forecastData?.current?.condition?.icon} alt="" className=' object-cover w-15 h-full ' /></span>
                    {/* <div className="lg:text-[48px] md:text-[36px] text-[28px] text-[#3E3232] flex  leading-[100%] items-start ">{Math.round(Number(forecastData?.current?.temp_c))}<span className='md:text-base text-sm font-medium'>°C</span> </div> */}
                    <div className="lg:text-[48px] md:text-[36px] text-[28px] text-[#3E3232] flex leading-[100%] items-start">
                      {temp != null ? (
                        <>
                          {Math.round(Number(temp))}
                          <span className="md:text-base text-sm font-medium">{unit}</span>
                        </>
                      ) : (
                        "--"
                      )}
                    </div>
                  </div>
                  <div className="text-[#777980] text-sm flex flex-col gap-0 ">
                    <p>Precipitation: {forecastData?.current?.precip_mm} mm</p>
                    <p>Humidity: {forecastData?.current?.humidity}%</p>
                    {/* <p>Wind: {forecastData?.current?.wind_kph} Km/h</p> */}
                    <p>Wind: {wind}</p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {forecastData?.location?.name}
                </h2>
                <div className="text-[#777980]">
                  <span ref={timeRef}></span>
                </div>
              </div>
            </div>
            <TempretureChart forecastData={forecastData} />
          </div>
        )}

      </div>

      {/* 🕐 Forecast Cards */}
      <div className="flex-1 ">
        <NearestCityCard />
        {/* {cities.map((city, index) => {
          const today = forecastData?.forecast?.forecastday?.[0];
          if (!today) return null;



          return (
            <div
              key={index}
              className="bg-white shadow rounded-[4px] p-6 transition hover:shadow-lg"
            >
              <div className="flex gap-3 flex-col md:flex-row items-center pb-4">

                <div className="flex gap-2">
                  <p className="text-4xl font-bold text-gray-800">

                  </p>
                  <span className="text-xl text-gray-500 -mt-2">°C</span>
                </div>
              </div>

              <div className="flex justify-between items-start">
                <div className="text-gray-700 space-y-1 text-sm">
                  <p>Precipitation: {today.day.totalprecip_mm} mm</p>
                  <p>Humidity: {humidity}%</p>
                  <p>Wind: {wind.toFixed(1)} Km/h</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-800">{city}</p>
                  <p className="text-sm text-red-500 mt-1">

                  </p>
                </div>
              </div>
            </div>
          );
        })} */}
      </div>
    </div>
  );
};

export default HourlyForecast;





// "use client";

// import { useEffect, useState } from "react";
// import dynamic from "next/dynamic";

// // Dynamically import ApexCharts
// const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
// import { Cloud, CloudRain, Sun, CloudDrizzle } from 'lucide-react';
// interface HourleyWeather {
//   name: string;
//   temp: number;
//   precipitation: number;
//   humidity: number;
//   wind: number;
//   day: string;
//   time: string;
//   icon: 'sun' | 'cloud' | 'rain' | 'drizzle';
// }


// interface HourlyData { time: string; temp: number; }
// interface ForecastDay { day: string; high: number; low: number; condition: string; icon: string; }
// interface WeatherData {
//   temp: number; condition: string; location: string; date: string;
//   precipitation: number; humidity: number; windSpeed: number;
//   hourlyData: HourlyData[]; forecast: ForecastDay[];
// }

// const HourlyForecast = () => {
//   const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(true);



//   useEffect(() => {
//     const mockData: WeatherData = {
//       temp: 29, condition: "Sunny", location: "New York, NY", date: "Wednesday 04:00",
//       precipitation: 2, humidity: 70, windSpeed: 3,
//       hourlyData: [
//         { time: "5 AM", temp: 27 }, { time: "8 AM", temp: 19 },
//         { time: "11 AM", temp: 20 }, { time: "2 PM", temp: 25 },
//         { time: "5 PM", temp: 21 }, { time: "8 PM", temp: 28 },
//         { time: "11 PM", temp: 29 }, { time: "2 AM", temp: 21 },
//       ],
//       forecast: [
//         { day: "Tue", high: 29, low: 20, condition: "rainbow", icon: "" },
//         { day: "Wed", high: 29, low: 20, condition: "calendar", icon: "" },
//         { day: "Thu", high: 29, low: 20, condition: "location", icon: "" },
//         { day: "Fri", high: 29, low: 20, condition: "Rainy", icon: "" },
//         { day: "Sat", high: 29, low: 20, condition: "Sunny", icon: "" },
//         { day: "Sun", high: 29, low: 20, condition: "Night", icon: "" },
//         { day: "Mon", high: 29, low: 20, condition: "Cloudy", icon: "" },
//         { day: "Tue", high: 29, low: 20, condition: "Rainy", icon: "" },
//       ],
//     };
//     setWeatherData(mockData); setIsLoading(false);
//   }, []);

//   const Hourly: HourleyWeather[] = [
//     { name: 'Ankara', temp: 32, precipitation: 10, humidity: 44, wind: 14, day: 'Tuesday', time: '10:00 PM', icon: 'cloud' },
//     { name: 'Alaska', temp: 25, precipitation: 10, humidity: 44, wind: 14, day: 'Tuesday', time: '10:00 PM', icon: 'rain' },
//     { name: 'Berlin', temp: 24, precipitation: 10, humidity: 44, wind: 14, day: 'Tuesday', time: '10:00 PM', icon: 'rain' },
//     { name: 'Paris', temp: 24, precipitation: 10, humidity: 44, wind: 14, day: 'Tuesday', time: '10:00 PM', icon: 'rain' }
//   ];

//   if (isLoading || !weatherData) return <div className="p-6 text-center text-gray-500">Loading weather data...</div>;

//   const chartOptions = {
//     chart: { type: "area" as const, height: 128, sparkline: { enabled: false }, toolbar: { show: false } },
//     dataLabels: { enabled: false },
//     stroke: { curve: "smooth" as const, width: 2, colors: ["#0ea5e9"] },
//     fill: { type: "gradient", gradient: { opacityFrom: 0.45, opacityTo: 0.05 } },
//     xaxis: { categories: weatherData.hourlyData.map(d => d.time), axisBorder: { show: false }, axisTicks: { show: false }, labels: { style: { colors: "#9ca3af", fontSize: "12px" } } },
//     yaxis: { show: false },
//     grid: { show: false },
//     tooltip: { theme: "light", y: { formatter: (value: number) => `${value}°C` } },
//   };

//   const chartSeries = [{ name: "Temperature", data: weatherData.hourlyData.map(d => d.temp) }];

//   const getWeatherIcon = (condition: string) => {
//     switch (condition.toLowerCase()) {
//       case "rainbow": return <Cloud className="h-12 w-12 text-blue-600" />;
//       case "calendar": return <Sun className="h-12 w-12 text-red-600" />;
//       case "location": return <Sun className="h-12 w-12 text-green-600" />;
//       default: return <Sun className="h-[48px] w-[48px] text-[#0080C4]" />;
//     }
//   };

// const getWeatherIcons = (icon: string, size: number = 24) => {
//     const props = { size, className: 'text-blue-500' };
//     switch (icon) {
//       case 'sun': return <Sun {...props} className="text-yellow-500" />;
//       case 'cloud': return <Cloud {...props} />;
//       case 'rain': return <CloudRain {...props} />;
//       case 'drizzle': return <CloudDrizzle {...props} />;
//       default: return <Cloud {...props} />;
//     }
//   };

//   return (
//   <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">

//        <div className="w-full p-6 bg-white ">
//       {/* Current Weather Section */}
//       <div className="flex justify-between items-start ">
//        <div className="flex justify-between gap-[120px]">
//          <div className="flex gap-[27px]">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-2 lg:gap-4 items-center">
//             {getWeatherIcon(weatherData.condition)}
//             <div className="flex">
//               <span className="text-3xl font-bold text-[48px]">{weatherData.temp}</span>
//               <p className="ml-2 text-xl">°C</p>
//             </div>
//           </div>
//           <div className="text-sm text-gray-600">
//             <p className="text-[var(--Gray-Black-300,#777980)] text-sm leading-normal font-normal capitalize">
//               Precipitation: {weatherData.precipitation}%
//             </p>
//             <p className="text-[var(--Gray-Black-300,#777980)] text-sm leading-normal font-normal capitalize">
//               Humidity: {weatherData.humidity}%
//             </p>
//             <p className="text-[var(--Gray-Black-300,#777980)] text-sm leading-normal font-normal capitalize">
//               Wind: {weatherData.windSpeed} Km/H
//             </p>
//           </div>
//         </div>

//        </div>
//         <div className="text-right">
//           <h2 className="text-[var(--Gray-Black-500,#1D1F2C)] text-right text-[18px] md:text-[24px]  font-medium leading-normal capitalize [font-family:'Mulish',sans-serif] [font-feature-settings:'liga'_off,'clig'_off]">
//             {weatherData.location}
//           </h2>
//           <p className="text-gray-500">{weatherData.date}</p>
//         </div>
//       </div>

//       {/* Temperature Trend Chart */}
//       <div className="relative bg-white rounded-lg overflow-hidden border-none py-[38px]">

//         <Chart options={chartOptions} series={chartSeries} type="area" height={128} />
//       </div>

//       {/* 8-Day Forecast */}
//       {/* <div className="">
//         <div className="grid grid-cols-4 gap-3 md:grid-cols-8">
//           {weatherData.forecast.map((day, index) => (
//             <div
//               key={index}
//               className="flex flex-col items-center p-2 bg-white rounded-lg hover:bg-[#F5F5F5] transition-colors duration-200"
//             >
//               <p className="text-sm font-semibold text-gray-700 mb-1">{day.day}</p>
//               <div className="mb-1">{getWeatherIcon(day.condition)}</div>
//               <div className="text-xs text-center flex gap-3">
//                 <p className="font-semibold text-gray-800">{day.high}°</p>
//                 <p className="text-gray-500">{day.low}°</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div> */}


//      </div>
//      <div className=" grid grid-cols-1 md:grid-cols-2  gap-6 ">
//         {
//           Hourly.map((index)=>{
//             return <div key={index.temp} className="bg-white gap-8 p-6 ">
//               <div className="flex gap-4 justify-center items-center mx-auto pb-6">
//                 <div className="flex">
//                   <p className="text-[var(--Black,#3E3232)] text-[36px] font-semibold leading-normal [font-family:'Mulish',sans-serif] [font-feature-settings:'liga'_off,'clig'_off]"

// >{index.temp}</p>
//                   <p>°C</p>
//                 </div>
//               {getWeatherIcons(index.icon, 64)}
//               </div>
//              <div className=" flex gap-4"
// >
//                <div className="">
//                 <p className="text-[var(--Gray-Black-400,#4A4C56)] text-[16px] font-normal leading-[132%] capitalize [font-family:'Mulish',sans-serif] [font-feature-settings:'liga'_off,'clig'_off]">Precipitation: {index.precipitation}</p>
//                   <p className="text-[var(--Gray-Black-400,#4A4C56)] text-[16px] font-normal leading-[132%] capitalize [font-family:'Mulish',sans-serif] [font-feature-settings:'liga'_off,'clig'_off]"> Humidity:   {index.humidity}</p>
//                   <p className="text-[var(--Gray-Black-400,#4A4C56)] text-[16px] font-normal leading-[132%] capitalize [font-family:'Mulish',sans-serif] [font-feature-settings:'liga'_off,'clig'_off]">Wind: {index.wind}</p>

//               </div>
//               <div className="">

//                 <p className="text-end text-[20px] font-bold ">{index.name}</p>
//                 <div className="flex  gap-1 mt-4">
//                   <p className="text-[14px]">{index.day}</p>
//                 <p className="text-[14px]">{index.time}</p>

//                 </div>
//               </div>
//              </div>

//             </div>
//           })
//         }
//       </div>

//   </div>
//   );
// };

// export default HourlyForecast;






