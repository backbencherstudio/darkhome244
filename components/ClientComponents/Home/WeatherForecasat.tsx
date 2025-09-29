"use client"

import SelectedTabComponent from '@/components/reusable/SelectedTabComponent';
import React, { useState } from 'react'
import HourlyForecast from '../ForecastTab/HourlyForecast';
import DailyForecast from '../ForecastTab/DailyForecast';
import WeeklyForecast from '../ForecastTab/WeeklyForecast';
import MonthlyForecast from '../ForecastTab/MonthlyForecast';
import { usePathname } from 'next/navigation';

export default function WeatherForecast() {

    const types = ["Hourly", "Daily", "Weekly", "Monthly"]
    const [selectedType, setSelectedType] = useState(types[0]);
    
    const pathName = usePathname()
    console.log(pathName)

    const renderSelectedComponent = () => {
        switch (selectedType) {
            case "Hourly":
                return <HourlyForecast/>;
            case "Daily":
                return <DailyForecast/>;
            case "Weekly":
                return <WeeklyForecast/>;
            case "Monthly":
                return <MonthlyForecast/>;
            default:
                return;
        }
    }

    return (
        <div className='maxContainer md:py-[60px] py-12'>
            <div className='flex md:flex-row flex-col gap-4 md:gap-0 md:justify-between md:items-center'>
                <div>
                    <h3 className={` lg:text-[32px] md:text-[28px] text-2xl leading-[130%] font-bold ${pathName.includes("forecast") ? "text-white":"text-[#4A4C56]"}`}>Weather Forecast</h3>
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
