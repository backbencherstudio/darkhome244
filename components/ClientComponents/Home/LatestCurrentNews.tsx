"use client"
import React from 'react';
import { Bookmark } from 'lucide-react';
import { useRSSFeed } from '@/hooks/useXmlApi';
import { useXMLParser } from '@/hooks/usexmlParser';
import Link from 'next/link';
import { useFilterPagination } from '@/hooks/useFilterHook';
import PaginationComponent from '@/components/reusable/PaginationComponent';

import Loading from '@/app/loading';
import LatestWeatherGridCard from '@/components/reusable/LatestWeatherGridCard';



const RSS_FEEDS = {
    latestNews: 'https://moxie.foxweather.com/google-publisher/latest.xml',
    weatherNews: 'https://moxie.foxweather.com/google-publisher/weather-news.xml',
    extremeWeather: 'https://moxie.foxweather.com/google-publisher/extreme-weather.xml'
};

const LatestCurrentNews = () => {


    const idRef = React.useRef<HTMLDivElement>(null);
    const { data, loading, error } = useRSSFeed(RSS_FEEDS.latestNews)
    const parsedNews = useXMLParser(data)
    const { currentItems, currentPage, totalPages, setCurrentPage } =
        useFilterPagination(parsedNews, 6);

    console.log(parsedNews, "parseddddddd ")
    if (loading) return <Loading />;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="" ref={idRef} >
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="lg:text-[32px] md:text-[28px]  text:2xl leading-[130%] font-bold text-[#4A4C56] py-[3px]">Latest Current News</h1>
                <button className="leading-[130%] text-[#4A4C56] md:text-base text-sm font-normal md:py-[13.5px] py-[8px] md:px-[20px] px-4 bg-[] rounded-[4px] bg-white cursor-pointer shadow-[0 0 20px 0 rgba(19, 142, 255, 0.10)]">
                    View All
                </button>
            </div>

            {/* News Grid */}
            <LatestWeatherGridCard newsItems={currentItems} />
            {/* pagination component  */}
            <div>
                {!loading && (
                    <div
                        className={`flex justify-center pt-12 pb-4 ${parsedNews?.length >= 5 ? "block" : "hidden"
                            } `}
                    >
                        <PaginationComponent
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                            scrollTargetRef={idRef}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default LatestCurrentNews;