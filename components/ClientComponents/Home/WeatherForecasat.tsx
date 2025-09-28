"use client"

import SelectedTabComponent from '@/components/reusable/SelectedTabComponent';
import React, { useState } from 'react'
import HourlyForecast from '../ForecastTab/HourlyForecast';
import DailyForecast from '../ForecastTab/DailyForecast';
import WeeklyForecast from '../ForecastTab/WeeklyForecast';
import MonthlyForecast from '../ForecastTab/MonthlyForecast';

export default function WeatherForecasat() {

    const types = ["Hourly", "Daily", "Weekly", "Monthly"]
    const [selectedType, setSelectedType] = useState(types[0]);

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
            <div className='flex justify-between items-center'>
                <div>
                    <h3 className='text-[#4A4C56] lg:text-[32px] md:text-[28px] text-2xl leading-[130%] font-bold'>Weather Forecast</h3>
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
