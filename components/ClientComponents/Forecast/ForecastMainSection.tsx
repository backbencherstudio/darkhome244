"use client"
import React from 'react'
import WeatherForecasat from '../Home/WeatherForecasat'
import UvIndexIcon from '@/components/Icons/UvIndex'
import RainUmbrellaIcon from '@/components/Icons/RainUmbrellaIcon'
import WindSpeedIcon from '@/components/Icons/WindSpeedIcon'
import TempretureIcon from '@/components/Icons/TempretureIcon'
import RadialChart from './RadialChart'
import { useLocation } from '@/components/Provider/LocationProvider'
import { useWeatherData } from '@/hooks/useWeatherData'




export default function ForecastMainSection() {

    const { location, refreshLocation } = useLocation()
    const { data, error, loading } = useWeatherData(location?.latitude, location?.longitude)
    console.log(data, "user current location data")

    const getPercentageValue = (value: number, type: string): number => {
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

    const cardData = [
        { title: "UV Index", type: "uv", value: `${data?.daily?.uv_index_max[0]}`, rawValue: data?.daily?.uv_index_max[0], icon: <UvIndexIcon className='text-[#0080C4]' /> },
        { title: "Rain", type: "rain", value: `${data?.hourly?.precipitation_probability[0]}%`, rawValue: data?.hourly?.precipitation_probability[0] ?? 0, icon: <RainUmbrellaIcon className='' /> },
        { title: "Wind Speed", type: "wind", value: `${data?.current?.wind_speed_10m} km/h`, rawValue: data?.current?.wind_speed_10m, icon: <WindSpeedIcon className='text-[#0080C4]' /> },
        { title: "Temperature", type: "temperature", value: `${data?.current?.temperature_2m}°C`, rawValue: data?.current?.temperature_2m, icon: <TempretureIcon className='fill-[#0080C4]' /> },
    ]
    console.log(data?.hourly?.precipitation_probability[0],"temsfdffffff     ")

    return (
        <div>
            <div className='py-[60px] h-[588px] w-full '
                style={{
                    background: "linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%), url('/forecastBanner.png') lightgray 50% / cover no-repeat",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: "no-repeat"
                }}>
                <div className='text-white'>
                    <WeatherForecasat />
                </div>
            </div>
            <div className='maxContainer py-[40px]'>
                <div className='grid lg:grid-cols-4 md:grid-cols-2  xl:gap-8 lg:gap-6 gap-4'>
                    {cardData?.map((item) => (
                        <div key={item?.title} className='bg-white pb-4 flex items-center flex-col justify-center'>
                            <RadialChart series={getPercentageValue(item?.rawValue, item.type)} value={item?.value} startAngle={-135} endAngle={135} chartId="chart1" />
                            {/* <span>{item?.value}</span> */}
                            <div className='flex items-center gap-2 mt-2'>
                                <span>{item?.icon}</span>
                                <span className='text-[#1D1F2C] md:text-base text-sm font-bold leading-[120%]'>{item?.title}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}


