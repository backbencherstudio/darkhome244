import Image from 'next/image'
import React from 'react'

export default function WeatherStoriesCard() {
    return (
        <div className='bg-white rounded-[4px] shadow-md p-5 group hover:bg-[#0080C4]'>
            <div className='flex gap-8 '>
                <div className='w-[310px] '>
                    <Image src={"/forecastBanner.png"} alt='' width={100} height={100} className='w-full h-full object-cover' />
                </div>
                <div className="flex flex-col flex-grow flex-1">
                    <a target='_blank' href="#" className="lg:text-[32px] md:text-[28px] text-2xl font-bold transition-colors duration-300 group-hover:text-white hover:underline text-[#1D1F2C] leading-[120%] underline-offset-[25%]">
                        {/* {news?.title} */}
                        Weather Alert: Unprecedented Heatwave Sweeps Across
                    </a>
                    <p className="md:text-base text-sm mb-3 mt-3 leading-[160%] tracking-[-0.0160px] text-[#4A4C56] transition-colors group-hover:text-[#E9E9EA] duration-300">
                        {/* {news?.description} */}
                        Experts warn of record-breaking temperatures as a severe heatwave grips the nation, urging as a severe heatwave grips the nat......
                    </p>
                    <p className="md:text-sm text-xs text-[#777980] leading-[100%] tracking-[-.014px] transition-colors duration-300 group-hover:text-[#E9E9EA]">
                        {/* {formatDate(news?.pubDate)} */}
                        24-4-25
                    </p>
                </div>
            </div>
        </div>
    )
}
