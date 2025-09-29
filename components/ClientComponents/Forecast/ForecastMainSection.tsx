"use client"
import React from 'react'
import WeatherForecasat from '../Home/WeatherForecasat'
import ForecastCurrentCard from './ForecastCurrentCard'



export default function ForecastMainSection() {




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
            <ForecastCurrentCard/>
          
        </div>
    )
}


