"use client"
import React, { useEffect, useState } from 'react';
import ForecastTable from './ForecastTable';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import UpcomingCalender from './UpcomingCalender';
import { useLocation } from '@/components/Provider/LocationProvider';
import { useWeatherData } from '@/hooks/useWeatherData';

const selectItem = [
    { value: "3", label: "3 Days" },
    { value: "7", label: "7 Days" },
]






export default function WeatherForecast() {

    const { location, refreshLocation } = useLocation()
    const latitude = location?.latitude
    const longitude = location?.longitude


    const [forecastData, setForecastData] = useState({});

    const [value, setValue] = React.useState("");
    const [date, setDate] = React.useState<{ from: Date | undefined; to?: Date | undefined } | undefined>(undefined)

    const { data, error, loading } = useWeatherData("forecast", "", latitude, longitude, Number(value ? value : 3))

    useEffect(() => {
        if (data && !loading) {
            setForecastData(data.forecast?.forecastday || []);
        }
    }, [data, location, value])


    return (
        <div className='maxContainer'>
            <div className='flex md:flex-row flex-col md:items-center md:justify-between gap-4'>
                <h2 className='text-[#1D1F2C] lg:leading-[32px] md:text-[28px] text-2xl font-bold leading-[130%]'>Upcoming Weather Forecast</h2>
                <div className='flex  gap-4 '>
                    <div>
                        <Select value={value} onValueChange={setValue}>
                            <SelectTrigger className="md:py-6 py-4 shadow-sm rounded-[4px] px-3 w-[128px] cursor-pointer focus-visible:border-none focus-visible:ring-none focus-visible:ring-[0px] border-0  bg-white text-[#4A4C56] md:text-base text-sm leading-[130%] font-normal ">
                                <SelectValue placeholder="Select Day"  />
                            </SelectTrigger>
                            <SelectContent>
                                {selectItem?.map((item) => (
                                    <SelectItem key={item?.label} className='cursor-pointer' value={item?.value} >{item?.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div >
                        {/* <UpcomingCalender date={date} setDate={setDate} /> */}
                    </div>

                </div>
            </div>
            <div className='flex md:flex-row flex-col gap-6 '>
                <div className="md:w-[66%] w-full  my-6">
                    <ForecastTable forecastData={forecastData} location = {data?.location?.country} loading={loading} />
                </div>
                <div className='md:w-[32.12%] w-full mt-4'>
                    {/* Google adds */}
                </div>
            </div>
        </div>
    );
}
