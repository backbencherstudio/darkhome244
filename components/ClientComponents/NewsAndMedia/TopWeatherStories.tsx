"use client"

import React from 'react'
import WeatherStoriesCard from './WeatherStoriesCard'
import { useRSSFeed } from '@/hooks/useXmlApi';
import { useXMLParser } from '@/hooks/usexmlParser';
import { useFilterPagination } from '@/hooks/useFilterHook';
import Loading from '@/app/loading';

const RSS_FEEDS = {
    latestNews: 'https://feeds.npr.org/1165/rss.xml',
    weatherNews: 'https://www.fox4news.com/rss/category/weather',
    extremeWeather: 'https://fox2now.com/news/weather/feed/'
};


export default function TopWeatherStories() {

    const { data, loading, error } = useRSSFeed(RSS_FEEDS?.weatherNews)
    const parsedNews = useXMLParser(data)
    const { currentItems, currentPage, totalPages, setCurrentPage } =
        useFilterPagination(parsedNews, 8);

    console.log(parsedNews, "parseddddddd ")
    if (loading) return <Loading />;
    if (error) return <div>Error: Failed To Fetch {error}</div>;

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
                        <WeatherStoriesCard newsItems={currentItems} />
                    </div>
                    <div className='md:w-[32.12%] w-full  border'>
                        Google adds will show here
                    </div>
                </div>
            </div>
        </div>
    )
}
