"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Cloud, CloudRain, Sun, CloudDrizzle } from "lucide-react";
import LoadingMin from "@/components/reusable/LoadingMin";

// ⛳ ApexCharts dynamic import
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

// ✅ Type Definitions
interface WeatherCondition {
  text: string;
  icon?: string;
  code?: number;
}

interface WeatherHour {
  time: string;
  temp_c: number;
  condition: WeatherCondition;
}

interface WeatherDayData {
  maxtemp_c: number;
  mintemp_c: number;
  avgtemp_c: number;
  avghumidity: number;
  totalprecip_mm: number;
  maxwind_kph: number;
  condition: WeatherCondition;
}

interface ForecastDay {
  date: string;
  day: WeatherDayData;
  hour: WeatherHour[];
}

interface LocationData {
  name: string;
  region?: string;
  country?: string;
  localtime: string;
}

interface CurrentData {
  temp_c: number;
  humidity: number;
  wind_kph: number;
  precip_mm: number;
  condition: WeatherCondition;
}

interface WeatherAPIResponse {
  location: LocationData;
  current: CurrentData;
  forecast: {
    forecastday: ForecastDay[];
  };
}

interface HourlyForecastProps {
  data: WeatherAPIResponse;
}

const HourlyForecast = ({ data }: HourlyForecastProps) => {
  const [forecastData, setForecastData] = useState<ForecastDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  // ✅ Run only on client (fix hydration issue)
  useEffect(() => {
    setIsClient(true);
  }, []);

  // ✅ Set forecast data
  useEffect(() => {
    const forecast = data?.forecast?.forecastday;
    if (forecast && forecast.length > 0) {
      setForecastData(forecast);
    }
    setLoading(false);
  }, [data]);

  if (loading || !isClient) {
    return (
      <div className="flex justify-center items-center h-60">
        <LoadingMin />
      </div>
    );
  }

  // ✅ Current Weather
  const current = {
    temp: data?.current?.temp_c ?? forecastData[0]?.day?.avgtemp_c ?? 0,
    humidity: data?.current?.humidity ?? forecastData[0]?.day?.avghumidity ?? 0,
    wind: data?.current?.wind_kph ?? forecastData[0]?.day?.maxwind_kph ?? 0,
    precipitation:
      data?.current?.precip_mm ?? forecastData[0]?.day?.totalprecip_mm ?? 0,
    location: data?.location?.name ?? "Dhaka",
    date: data?.location?.localtime ?? forecastData[0]?.date ?? "",
    condition:
      data?.current?.condition?.text ??
      forecastData[0]?.day?.condition?.text ??
      "",
    icon:
      data?.current?.condition?.icon ??
      forecastData[0]?.day?.condition?.icon ??
      "",
  };

  // ✅ Safe formatted date (only on client)
  const formatDateTime = (dateString: string) => {
    if (typeof window === "undefined") return ""; // skip SSR render
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      weekday: "long",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  // ✅ Weather Icon (real API icon)
  const renderWeatherIcon = (icon?: string, text?: string, size: number = 64) => {
    if (icon) {
      const url = icon.startsWith("http") ? icon : `https:${icon}`;
      return (
        <img
          src={url}
          alt={text || "weather-icon"}
          width={size}
          height={size}
          className="object-cover"
        />
      );
    }
    // fallback if no icon
    return <Cloud size={size} className="text-blue-500" />;
  };

  // ✅ Add random variation (client-side only)
  const addVariation = (value: number, range: number = 3) => {
    if (!isClient) return value; // SSR fix
    const offset = (Math.random() * range * 2 - range).toFixed(1);
    return Math.max(0, Number(value) + Number(offset));
  };

  // ✅ Filter every 3 hours
  const filteredHours =
    forecastData[0]?.hour?.filter((_, i) => i % 3 === 0) || [];

  // ✅ Chart Config
  const chartOptions: any = {
    chart: { type: "area", height: 128, toolbar: { show: false } },
    dataLabels: { enabled: false },
    stroke: { curve: "smooth", width: 2, colors: ["#0ea5e9"] },
    fill: { type: "gradient", gradient: { opacityFrom: 0.45, opacityTo: 0.05 } },
    xaxis: {
      categories: filteredHours.map((h) =>
        new Date(h.time).toLocaleString("en-US", { hour: "numeric", hour12: true })
      ),
      labels: { style: { colors: "#9ca3af", fontSize: "12px" } },
    },
    yaxis: { show: false },
    grid: { show: false },
    tooltip: { theme: "light", y: { formatter: (val: number) => `${val}°C` } },
  };

  const chartSeries = [
    {
      name: "Temperature",
      data: filteredHours.map((h) => h.temp_c),
    },
  ];

  const cities = ["Gazipur", "Pabna", "Kustia", "Khulna"];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* 🌤️ Current Weather */}
      <div className="w-full p-6 bg-white shadow rounded-xl">
        <div className="flex justify-between items-start">
          <div className="flex gap-20">
            <div className="flex gap-6 items-center">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                {renderWeatherIcon(current.icon, current.condition)}
                <div className="flex">
                  <span className="text-5xl font-bold">{current.temp}</span>
                  <p className="ml-2 text-xl -mt-2">°C</p>
                </div>
              </div>
              <div className="text-gray-600 space-y-1">
                <p>Precipitation: {current.precipitation} mm</p>
                <p>Humidity: {current.humidity}%</p>
                <p>Wind: {current.wind.toFixed(1)} Km/h</p>
              </div>
            </div>
          </div>
          <div className="text-right">
            <h2 className="text-2xl font-semibold text-gray-800">{current.location}</h2>
            <p className="text-gray-500">{formatDateTime(current.date)}</p>
          </div>
        </div>

        {/* 📊 Chart */}
        <div className="relative bg-white rounded-lg overflow-hidden py-8">
          <Chart options={chartOptions} series={chartSeries} type="area" height={128} />
        </div>
      </div>

      {/* 🕐 Forecast Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cities.map((city, index) => {
          const today = forecastData[0];
          if (!today) return null;

          const humidity = addVariation(current.humidity, 5);
          const wind = addVariation(current.wind, 2);

          return (
            <div
              key={index}
              className="bg-white shadow rounded-xl p-6 transition hover:shadow-lg"
            >
              <div className="flex gap-3 flex-col md:flex-row justify-center items-center pb-4">
                {renderWeatherIcon(today.day.condition?.icon, today.day.condition?.text)}
                <div className="flex gap-2">
                  <p className="text-4xl font-bold text-gray-800">{current.temp}</p>
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
                  <p className="text-sm text-gray-500 mt-1">
                    {formatDateTime(today.date).split(" ")[0]}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
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






