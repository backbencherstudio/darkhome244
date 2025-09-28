import React from 'react'
import WeatherForecasat from '../Home/WeatherForecasat'
import UvIndexIcon from '@/components/Icons/UvIndex'
import RainUmbrellaIcon from '@/components/Icons/RainUmbrellaIcon'
import WindSpeedIcon from '@/components/Icons/WindSpeedIcon'
import TempretureIcon from '@/components/Icons/TempretureIcon'

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
            <div className='maxContainer py-[40px]'>
                <div className='grid grid-cols-4 gap-8'>
                    {cardData?.map((item) => (
                        <div key={item?.title} className='bg-white py-4 flex items-center flex-col justify-center'>
                            <span>{item?.value}</span>
                            <div className='flex items-center gap-2 mt-4'>
                                <span>{item?.icon}</span>
                                <span>{item?.title}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}


const cardData = [
    { title: "UV Index", value: "6", icon: <UvIndexIcon className='text-[#0080C4]' /> },
    { title: "Rain", value: "5%", icon: <RainUmbrellaIcon className='' /> },
    { title: "Wind Speed", value: "6", icon: <WindSpeedIcon className='fill-[#0080C4]' /> },
    { title: "Temperature", value: "23 C", icon: <TempretureIcon className='fill-[#0080C4]' /> },
]