"use client"
import React from 'react'
import { useLocation } from '@/components/Provider/LocationProvider'
import { useWeatherData } from '@/hooks/useWeatherData'
import UvIndexIcon from '@/components/Icons/UvIndex'
import RainUmbrellaIcon from '@/components/Icons/RainUmbrellaIcon'
import WindSpeedIcon from '@/components/Icons/WindSpeedIcon'
import TempretureIcon from '@/components/Icons/TempretureIcon'
import RadialChart from './RadialChart'
import "@/style/style.css"
import LoadingMin from '@/components/reusable/LoadingMin'

export default function ForecastCurrentCard() {

    const { location, refreshLocation } = useLocation()
    const latitude = location?.latitude
    const longitude = location?.longitude
    const { data, error, loading } = useWeatherData("forecast",latitude, longitude,1)

    const getPercentageValue = (value: number, type: string): number => {

        console.log(value, "type")
        switch (type) {
            case 'uv':
                // UV Index typically ranges from 0-11+, so we'll use 15 as max for better visualization
                return Math.min((value / 15) * 100, 100);
            case 'rain':
                // Rain percentage is already 0-100
                return value;
            case 'wind':
                // Wind speed - assuming max of 50 km/h for visualization
                return Math.min((value / 50) * 100, 100);
            case 'temperature':
                // Temperature - assuming range of -10 to 50°C, normalized to 0-100%
                return Math.floor(Math.min(Math.max(((value + 10) / 60) * 100, 0), 100));
            default:
                return value;
        }
    };


    // const cardData = [
    //     { title: "UV Index", type: "uv", value:  Number(data?.current?.uv) || 0, rawValue: data?.curremt?.uv, icon: <UvIndexIcon className='text-[#0080C4]' /> },
    //     { title: "Rain", type: "rain", value: `${data?.hourly?.precipitation_probability[0]}%`, rawValue: data?.hourly?.precipitation_probability[0] ?? 0, icon: <RainUmbrellaIcon className='' /> },
    //     { title: "Wind Speed", type: "wind", value: `${data?.current?.wind_speed_10m} km/h`, rawValue: data?.current?.wind_speed_10m, icon: <WindSpeedIcon className='text-[#0080C4]' /> },
    //     { title: "Temperature", type: "temperature", value: `${data?.current?.temperature_2m}°C`, rawValue: data?.current?.temperature_2m, icon: <TempretureIcon className='fill-[#0080C4]' /> },
    // ]
     const cardData = [
        {
            title: "UV Index", 
            type: "uv", 
            value: Number(data?.current?.uv) || 0,  // Ensure it's a number
            rawValue: data?.current?.uv,
            icon: <UvIndexIcon className='text-[#0080C4]' />
        },
        {
            title: "Rain", 
            type: "rain", 
            value: `${data?.forecast?.forecastday[0]?.day?.daily_chance_of_rain}%`,
            rawValue: data?.forecast?.forecastday[0]?.day?.daily_chance_of_rain ?? 0,
            icon: <RainUmbrellaIcon className='' />
        },
        {
            title: "Wind Speed", 
            type: "wind", 
            value: `${(data?.current?.wind_kph)?.toFixed(1)} km/h`, 
            rawValue: data?.current?.wind_kph, 
            icon: <WindSpeedIcon className='text-[#0080C4]' />
        },
        {
            title: "Temperature", 
            type: "temperature", 
            value: `${data?.current?.temp_c}°c`,  // Ensure it's a number
            rawValue: data?.current?.temp_c,
            icon: <TempretureIcon className='fill-[#0080C4]' />
        },
    ];


    return (
        <div className='maxContainer py-[40px]'>
            <div className='grid lg:grid-cols-4 md:grid-cols-2  xl:gap-8 lg:gap-6 gap-4'>
                {cardData?.map((item) => (
                    <div key={item?.title} className='bg-white pb-4 flex items-center flex-col justify-center'>
                        {loading ?
                            <LoadingMin /> : (
                            <RadialChart series={getPercentageValue(item?.rawValue, item.type)} value={item?.value} startAngle={-135} endAngle={135} chartId="chart1" />
                        )}
                        {/* <span>{item?.value}</span> */}
                        <div className='flex items-center gap-2 mt-2'>
                            <span>{item?.icon}</span>
                            <span className='text-[#1D1F2C] md:text-base text-sm font-bold leading-[120%]'>{item?.title}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}


// "use client";
// import React from 'react';
// import { useLocation } from '@/components/Provider/LocationProvider';
// import { useWeatherData } from '@/hooks/useWeatherData';
// import UvIndexIcon from '@/components/Icons/UvIndex';
// import RainUmbrellaIcon from '@/components/Icons/RainUmbrellaIcon';
// import WindSpeedIcon from '@/components/Icons/WindSpeedIcon';
// import TempretureIcon from '@/components/Icons/TempretureIcon';
// import RadialChart from './RadialChart';
// import "@/style/style.css";
// import LoadingMin from '@/components/reusable/LoadingMin';

// export default function ForecastCurrentCard() {
//     const { location, refreshLocation } = useLocation();
//     const latitude = location?.latitude;
//     const longitude = location?.longitude;

//     // Fetching weather data
//     const { data, error, loading } = useWeatherData("forecast", latitude, longitude);
//     console.log(data, "user current location data");

//     // Utility function to get percentage value for visualization
//     const getPercentageValue = (value: number, type: string): number => {
//         console.log(value, "type");
//         switch (type) {
//             case 'uv':
//                 // UV Index typically ranges from 0-11+, so we'll use 15 as max for better visualization
//                 return Math.min((value / 15) * 100, 100);
//             case 'rain':
//                 // Rain percentage is already 0-100
//                 return value;
//             case 'wind':
//                 // Wind speed - assuming max of 50 km/h for visualization
//                 return Math.min((value / 50) * 100, 100);
//             case 'temperature':
//                 // Temperature - assuming range of -10 to 50°C, normalized to 0-100%
//                 return Math.floor(Math.min(Math.max(((value + 10) / 60) * 100, 0), 100));
//             default:
//                 return value;
//         }
//     };

//     // Data for the forecast card
//     const cardData = [
//         {
//             title: "UV Index", 
//             type: "uv", 
//             value: Number(data?.current?.uv) || 0,  // Ensure it's a number
//             rawValue: data?.current?.uv,
//             icon: <UvIndexIcon className='text-[#0080C4]' />
//         },
//         {
//             title: "Rain", 
//             type: "rain", 
//             value: `${data?.hourly?.precipitation_probability[0]}%`,
//             rawValue: data?.hourly?.precipitation_probability[0] ?? 0,
//             icon: <RainUmbrellaIcon className='' />
//         },
//         {
//             title: "Wind Speed", 
//             type: "wind", 
//             value: `${data?.current?.wind_speed_10m} km/h`, 
//             rawValue: data?.current?.wind_speed_10m, 
//             icon: <WindSpeedIcon className='text-[#0080C4]' />
//         },
//         {
//             title: "Temperature", 
//             type: "temperature", 
//             value: Number(data?.current?.temperature_2m) || 0,  // Ensure it's a number
//             rawValue: data?.current?.temperature_2m,
//             icon: <TempretureIcon className='fill-[#0080C4]' />
//         },
//     ];

//     return (
//         <div className='maxContainer py-[40px]'>
//             <div className='grid lg:grid-cols-4 md:grid-cols-2 xl:gap-8 lg:gap-6 gap-4'>
//                 {loading ? (
//                     // Loading state, show a spinner or loading indicator
//                     <LoadingMin />
//                 ) : (
//                     cardData?.map((item) => (
//                         <div key={item?.title} className='bg-white pb-4 flex items-center flex-col justify-center'>
//                             <RadialChart
//                                 series={getPercentageValue(item.rawValue, item.type)}
//                                 value={item.value}
//                                 startAngle={-135}
//                                 endAngle={135}
//                                 chartId="chart1"
//                             />
//                             <div className='flex items-center gap-2 mt-2'>
//                                 <span>{item.icon}</span>
//                                 <span className='text-[#1D1F2C] md:text-base text-sm font-bold leading-[120%]'>{item?.title}</span>
//                             </div>
//                         </div>
//                     ))
//                 )}
//             </div>
//         </div>
//     );
// }
