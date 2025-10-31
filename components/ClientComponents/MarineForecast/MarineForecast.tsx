
"use client"
import { useLocation } from '@/components/Provider/LocationProvider'
import { useWeatherData } from '@/hooks/useWeatherData'
import React, { useEffect, useRef, useState } from 'react'
import { WeatherAPIResponse } from '../Home/ForecastTab/HourlyForecast'
import TempretureChart from '../Home/ForecastTab/TempretureChart'
import Loading from '@/app/loading'
import LoadingMin from '@/components/reusable/LoadingMin'



export default function MarineForecast() {

    const { location, refreshLocation } = useLocation()
    const latitude = location?.latitude
    const longitude = location?.longitude
    console.log(location, '============================')
    const { data, error, loading } = useWeatherData("forecast", "", latitude, longitude, 1)
    console.log(data,"dataaaaaaaa marine")
    const [forecastData, setForecastData] = useState<WeatherAPIResponse | null>(null);
    const timeRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (data && !loading) {
            setForecastData(data);
        }
    }, [data, loading, refreshLocation]);


    return (
        <div className='maxContainer py-0'>
            <h3 className={` lg:text-[32px] md:text-[28px] text-2xl leading-[130%] font-bold mb-8`}>Marine Forecast</h3>
            <div className="p-6 bg-white shadow rounded-[4px]">
                {loading ? <Loading height='20vh' /> : (
                    <div className="flex justify-between items-start">
                        <div className="flex gap-20">
                            <div className="flex gap-6 items-center">
                                <div className="flex flex-col md:flex-row  items-center">
                                    <span> <img src={forecastData?.current?.condition?.icon} alt="" className=' object-cover w-15 h-full ' /></span>
                                    <div className="lg:text-[48px] md:text-[36px] text-[28px] text-[#3E3232] flex  leading-[100%] items-start ">{Math.round(Number(forecastData?.current?.temp_c))}<span className='md:text-base text-sm font-medium'>°C</span> </div>
                                </div>
                                <div className="text-[#777980] text-sm flex flex-col gap-0 ">
                                    <p>Precipitation: {forecastData?.current?.precip_mm} mm</p>
                                    <p>Humidity: {forecastData?.current?.humidity}%</p>
                                    <p>Wind: {forecastData?.current?.wind_kph} Km/h</p>
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
                )}

                <TempretureChart forecastData={forecastData} />
            </div>
        </div>
    )
}
