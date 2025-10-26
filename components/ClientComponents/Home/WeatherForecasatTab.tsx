"use client"

import SelectedTabComponent from '@/components/reusable/SelectedTabComponent';
import React, { useState } from 'react'
import HourlyForecast from '../ForecastTab/HourlyForecast';
import DailyForecast from '../ForecastTab/DailyForecast';
import WeeklyForecast from '../ForecastTab/WeeklyForecast';
import MonthlyForecast from '../ForecastTab/MonthlyForecast';
import { usePathname } from 'next/navigation';
import { useLocation } from '@/components/Provider/LocationProvider';
import { useWeatherData } from '@/hooks/useWeatherData';

export default function WeatherForecastTab() {


    const { location, refreshLocation } = useLocation()
    const latitude = location?.latitude
    const longitude = location?.longitude
    if (!latitude || !longitude || !location) {
        console.log("⏳ Waiting for location...");
        return null; 
    }

    const { data, error, loading } = useWeatherData("forecast", "", latitude, longitude, 7)
    const types = ["Hourly", "Daily", "Weekly", "Monthly"]
    const [selectedType, setSelectedType] = useState(types[0]);

    const pathName = usePathname()


    const renderSelectedComponent = () => {
        switch (selectedType) {
            case "Hourly":
                return <HourlyForecast data={data} />;
            case "Daily":
                return <DailyForecast data={data?.forecast?.forecastday} loading={loading} />;
            case "Weekly":
                return <WeeklyForecast />;
            case "Monthly":
                return <MonthlyForecast data={data}/>;
            default:
                return;
        }
    }
    console.log(data?.forecast, 'user daily forecast data============================')
    return (
        <div className='maxContainer md:py-[60px] py-12'>
            <div className='flex md:flex-row flex-col gap-4 md:gap-0 md:justify-between md:items-center mb-6 md:mb-8'>
                <div>
                    <h3 className={` lg:text-[32px] md:text-[28px] text-2xl leading-[130%] font-bold ${pathName.includes("forecast") ? "text-white" : "text-[#4A4C56]"}`}>Weather Forecast</h3>
                </div>
                <div className=' '>
                    <SelectedTabComponent
                        types={types}
                        selectedType={selectedType}
                        setSelectedType={setSelectedType}
                    />
                </div>
            </div>
            {renderSelectedComponent()}
        </div>
    )
}
