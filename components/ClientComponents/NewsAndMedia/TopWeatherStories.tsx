import React from 'react'
import WeatherStoriesCard from './WeatherStoriesCard'

export default function TopWeatherStories() {
    return (
        <div>
            {/* Header */}
            <div className="flex justify-between items-center mb-6 mt-8">
                <h1 className="lg:text-[32px] md:text-[28px]  text:2xl leading-[130%] font-bold text-[#4A4C56] py-[3px]">Latest Weather News</h1>
                <button className="leading-[130%] text-[#4A4C56] md:text-base text-sm font-normal md:py-[13.5px] py-[8px] md:px-[20px] px-4 bg-[] rounded-[4px] bg-white cursor-pointer shadow-[0 0 20px 0 rgba(19, 142, 255, 0.10)]">
                    View All
                </button>
            </div>
            <div>
                <div className='flex md:flex-row flex-col gap-6 '>
                    <div className="md:w-[66%] w-full ">
                        <WeatherStoriesCard/>
                    </div>
                    <div className='md:w-[32.12%] w-full  border'>
                        Google adds will show here
                    </div>
                </div>
            </div>
        </div>
    )
}
