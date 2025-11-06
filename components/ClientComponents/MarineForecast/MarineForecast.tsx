
"use client"
import { useLocation } from '@/components/Provider/LocationProvider'
import { useWeatherData } from '@/hooks/useWeatherData'
import React, { useEffect, useRef, useState } from 'react'
import { WeatherAPIResponse } from '../Home/ForecastTab/HourlyForecast'
import TempretureChart from '../Home/ForecastTab/TempretureChart'
import Loading from '@/app/loading'
import LoadingMin from '@/components/reusable/LoadingMin'
import getFormattedDate from '@/helper/formatedDate'



export default function MarineForecast() {

    const { location, refreshLocation } = useLocation()
    const latitude = location?.latitude
    const longitude = location?.longitude

    const { data, error, loading } = useWeatherData("forecast", "", latitude, longitude, 1)
    const { data: marinsDatas } = useWeatherData("marine", "", latitude, longitude, 1)
    console.log(marinsDatas, "marineeeeeeeeeee")
    const [forecastData, setForecastData] = useState<WeatherAPIResponse | null>(null);
    const [marineData, setMarineData] = useState(null);
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
                {loading ? <Loading height='h-[15vh]' /> : (
                    <div>
                        <div className="flex justify-between items-start">
                            <div className="flex gap-20">
                                <div className="flex flex-col md:flex-row md:gap-6 gap-3 items-center">
                                    <div className="flex flex-col items-center">
                                        <div className='flex items-center '>
                                            <span> <img src={marinsDatas?.forecast?.forecastday[0]?.day?.condition?.icon} alt="" className=' object-cover w-15 h-full ' /></span>
                                            <div className="lg:text-[48px] md:text-[36px] text-[28px] text-[#3E3232] flex  leading-[100%] items-start ">{Math.round(Number(marinsDatas?.forecast?.forecastday[0]?.day?.avgtemp_c))}<span className='md:text-base text-sm font-medium'>°C</span> </div>
                                        </div>
                                        <span className='text-sm font-semibold text-[#4A4C56] '>
                                            {marinsDatas?.forecast?.forecastday[0]?.day?.condition?.text}
                                        </span>
                                    </div>
                                    <div className="text-[#777980] text-sm flex flex-col gap-0 ">
                                            <p className='text-sm font-semibold text-[#4A4C56] '>Totalprecip: {marinsDatas?.forecast?.forecastday[0]?.day?.totalprecip_mm} mm</p>
                                        <p className='text-sm font-semibold text-[#4A4C56] '>Avg.humidity: {marinsDatas?.forecast?.forecastday[0]?.day?.avghumidity}%</p>
                                            <p className='text-sm font-semibold text-[#4A4C56] '>Totalsnow: {marinsDatas?.forecast?.forecastday[0]?.day?.totalsnow_cm} cm</p>

                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <h2 className="text-2xl font-semibold text-gray-800">
                                    {marinsDatas?.location?.name}
                                </h2>

                                <div className='text-[#4A4C56] text-sm flex flex-col'>
                                    <p className='text-sm font-semibold text-[#4A4C56] '>Sunrise:<span >{marinsDatas?.forecast?.forecastday[0]?.astro?.sunrise}</span></p>
                                    <p className='text-sm font-semibold text-[#4A4C56] '>Sunset: <span >{marinsDatas?.forecast?.forecastday[0]?.astro?.sunset}</span></p>
                                </div>
                                <div className="text-[#777980]">
                                    <span className=" leading-[136%] md:text-base lg:text-lg font-semibold">{getFormattedDate(marinsDatas?.forecast?.forecastday[0]?.date)}</span>
                                </div>
                            </div>
                        </div>
                        <TempretureChart forecastData={forecastData} />
                    </div>

                )}

            </div>
        </div>
    )
}
