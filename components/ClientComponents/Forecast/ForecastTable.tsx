"use client"
import React from 'react'
import { CloudRain, Sun, Cloud, CloudDrizzle } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import LoadingMin from '@/components/reusable/LoadingMin';
import getFormattedDate from '@/helper/formatedDate';


export default function ForecastTable({ forecastData, location, loading }) {


    if (!forecastData?.length)
        return <p>No forecast data available.</p>;


    const getHour = (timeStr) => {
        const [time, modifier] = timeStr.split(' ');
        let [hour, minute] = time.split(':').map(Number);
        if (modifier === 'PM' && hour !== 12) hour += 12;
        if (modifier === 'AM' && hour === 12) hour = 0;
        return hour;
    };

    const findHourData = (hours, targetHour) => {
        return hours.find(h => new Date(h.time).getHours() === targetHour)
    }



    const summarizedData = forecastData?.map(day => {
        const sunriseHour = getHour(day?.astro.sunrise);
        const sunsetHour = getHour(day?.astro?.sunset);
        return {
            date: day?.date,
            morning: findHourData(day?.hour, sunriseHour),
            afternoon: findHourData(day?.hour, 14),
            evening: findHourData(day?.hour, sunsetHour),
            night: findHourData(day?.hour, 23)
        }
    })

    const getWeatherIcon = (condition) => {
        switch (condition.toLowerCase()) {
            case 'rain':
                return <CloudRain className="w-5 h-5 text-blue-500" />;
            case 'sunny':
                return <Sun className="w-5 h-5 text-yellow-500" />;
            case 'cloudy':
                return <Cloud className="w-5 h-5 text-gray-500" />;
            case 'partly cloudy':
                return <CloudDrizzle className="w-5 h-5 text-gray-400" />;
            default:
                return <CloudRain className="w-5 h-5 text-blue-500" />;
        }
    };


    const isUSA = location === "United States of America";

    console.log(forecastData, "]]]]]]")
    return (
        <div className='space-y-6 max-h-screen overflow-y-auto custom-scroll'>
            {loading ? <LoadingMin /> : (
                <>
                    {summarizedData?.map((day, dayIndex) => (
                        <div key={dayIndex} className="bg-white rounded-[4px] p-6">
                            {/* Weather Table */}
                            <Table>
                                <TableHeader className=''>
                                    <TableRow className=''>
                                        <TableHead className="px-0">
                                            <div className=" ">
                                                <h2 className="text-lg md:text-xl lg:text-2xl text-[#1D1F2C] font-semibold py-1.5">{new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" })
                                                    .format(new Date(day?.date))
                                                    .replace(" ", ", ")}</h2>
                                            </div>
                                        </TableHead>

                                        <TableHead className="text-[#1D1F2C] md:text-base text-sm font-semibold text-start">Temp</TableHead>
                                        <TableHead className="text-[#1D1F2C] md:text-base text-sm font-semibold text-start">Condition</TableHead>
                                        <TableHead className="text-[#1D1F2C] md:text-base text-sm font-semibold text-start">Feels Like</TableHead>
                                        <TableHead className="text-[#1D1F2C] md:text-base text-sm font-semibold text-start">Wind</TableHead>
                                        <TableHead className="text-[#1D1F2C] md:text-base text-sm font-semibold text-start">Humidity</TableHead>
                                        <TableHead className="text-[#1D1F2C] md:text-base text-sm font-semibold text-start">Pressure</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody className=''>
                                    {["morning", "afternoon", "evening", "night"].map((periodKey, periodIndex) => {
                                        const period = day[periodKey]
                                        if (!period) return null;
                                        return (
                                            <TableRow key={periodIndex} className="hover:bg-gray-50 border-b-0 ">
                                                <TableCell className={`text-[#1D1F2C] md:text-base text-sm font-semibold  ${periodIndex === 0 ? "md:mt-8 pt-6" : ""}`}>{periodKey?.charAt(0).toUpperCase() + periodKey.slice(1)}</TableCell>
                                                <TableCell className={`flex gap-4 ${periodIndex === 0 ? " pt-6" : ""}`}>
                                                    <span className="text-[#1D1F2C] md:text-base text-sm font-semibold ">
                                                        {/* {period?.temp_c}°C */}
                                                        {isUSA ? `${period?.temp_f}°F` : `${period?.temp_c}°C`}
                                                    </span>

                                                </TableCell>
                                                <TableCell className={`gap-4 ${periodIndex === 0 ? " pt-6" : ""}`}>
                                                    <div className="flex items-center gap-2">
                                                        <span> <img src={period?.condition?.icon} alt="" className=' object-cover w-6' /></span>
                                                        <span className="text-[#1D1F2C] md:text-base text-sm font-semibold ">{period?.condition?.text}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className={`gap-4 ${periodIndex === 0 ? " pt-6" : ""}`}>
                                                    <span className="text-[#1D1F2C] md:text-base text-sm font-semibold ">
                                                        {/* {period?.feelslike_c}°C */}
                                                        {isUSA ? `${period?.feelslike_f}°F` : `${period?.feelslike_c}°C`}
                                                    </span>
                                                </TableCell>
                                                <TableCell className={`gap-4 ${periodIndex === 0 ? " pt-6" : ""}`}>
                                                    <span className="text-[#1D1F2C] md:text-base text-sm font-semibold ">

                                                        {/* {period?.wind_kph} km/h */}
                                                        {isUSA ? `${period?.wind_mph} Mp/h` : `${period?.wind_kph} km/h`}

                                                    </span>

                                                </TableCell>
                                                <TableCell className={`gap-4 ${periodIndex === 0 ? " pt-6" : ""}`}>
                                                    <span className="text-[#1D1F2C] md:text-base text-sm font-semibold pl-2">{period?.humidity}%</span>
                                                </TableCell>
                                                <TableCell className={`gap-4 ${periodIndex === 0 ? " pt-6" : ""}`}>
                                                    <span className="text-[#1D1F2C] md:text-base text-sm font-semibold ">{period?.pressure_mb}</span>
                                                </TableCell>
                                                {/* <TableCell className="hidden sm:table-cell">
                                                </TableCell>
                                                <TableCell className={`text-[#1D1F2C] md:text-base text-sm font-semibold  text-center ${periodIndex === 0 ? "md:pt-8 pt-6" : ""}`}>{period?.feelsLike}</TableCell>
                                                <TableCell className={`text-[#1D1F2C] md:text-base text-sm font-semibold  text-center ${periodIndex === 0 ? "md:pt-8 pt-6" : ""}`}>{period?.wind}</TableCell>
                                                <TableCell className={`text-[#1D1F2C] md:text-base text-sm font-semibold  text-center ${periodIndex === 0 ? "md:pt-8 pt-6" : ""}`}>{period?.humidity}</TableCell>
                                                <TableCell className={`text-[#1D1F2C] md:text-base text-sm font-semibold  text-center ${periodIndex === 0 ? "md:pt-8 pt-6" : ""}`}>{period?.pressure}</TableCell> */}
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </div>
                    ))}
                </>
            )}

        </div>
    )
}

