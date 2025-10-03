"use client"

import CustomImage from '@/components/reusable/CustomImage';
import formatPublishDate from '@/helper/formatedPublishDate';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React from 'react'

interface NewsItem {
    id?: string;
    link?: string;
    image?: string;
    title?: string;
    description?: string;
    author?: string;
    pubDate?: string;
}

interface NewsGridProps {
    newsItems: NewsItem[];
    //   adConfig?: AdConfig;
}


export default function WeatherStoriesCard({ newsItems }: NewsGridProps) {

    const router = useRouter();

    return (
        <div className=''>
            {newsItems?.length === 0 ? (
                <div className="col-span-full text-center py-8">
                    {/* Fallback message or image */}
                    <img
                        src="/placeholder-img.png" // Fallback image
                        alt="No data available"
                        className="w-[150px] h-[150px] mx-auto object-cover mb-4"
                    />
                    <p className="text-lg text-gray-500">No news available at the moment</p>
                </div>
            ) : (<div className='flex flex-col gap-6'>
                {newsItems?.map((news) => (
                    <div onClick={() => router.push(`/news-and-media/${news?.id}`) } key={news?.id} className='flex md:flex-row flex-col gap-8 bg-white rounded-[4px] shadow-md p-5 group hover:bg-[#0080C4]'>
                        <div className='md:w-[310px] md:max-h-[250px]'>
                            <Image src={news?.image ? news?.image : "/placeholder-img.png"} alt={news?.title} width={100} height={100} className='w-full h-full object-cover' unoptimized />
                            {/* <CustomImage src={news?.image} alt='dfd' /> */}
                        </div>
                        <div className="flex flex-col flex-grow flex-1">
                            <a target='_blank' href={news?.link} className="lg:text-[32px] md:text-[28px] text-2xl font-bold transition-colors duration-300 group-hover:text-white hover:underline text-[#1D1F2C] leading-[120%] underline-offset-[25%]">
                                {news?.title?.length > 80
                                    ? `${news.title.slice(0, 80)}…`
                                    : news?.title}
                            </a>
                            <p className="md:text-base text-sm mb-3 mt-3 leading-[160%] tracking-[-0.0160px] text-[#4A4C56] transition-colors group-hover:text-[#E9E9EA] duration-300">
                                {news?.description?.length > 200
                                    ? `${news.description.slice(0, 200)}…`
                                    : news?.description}
                            </p>
                            <p className="md:text-sm text-xs text-[#777980] leading-[100%] tracking-[-.014px] transition-colors duration-300 group-hover:text-[#E9E9EA]">
                                {formatPublishDate(news?.pubDate)}
                            </p>
                        </div>
                    </div>
                ))}
            </div>)}

        </div >
    )
}
