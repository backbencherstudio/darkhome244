"use client"
import React from 'react';
import { Bookmark } from 'lucide-react';
import { useRSSFeed } from '@/hooks/useXmlApi';
import { useXMLParser } from '@/hooks/usexmlParser';
import Link from 'next/link';
import { useFilterPagination } from '@/hooks/useFilterHook';
import PaginationComponent from '@/components/reusable/PaginationComponent';

const RSS_FEEDS = {
    latest: 'https://moxie.foxweather.com/google-publisher/latest.xml',
    weatherNews: 'https://moxie.foxweather.com/google-publisher/weather-news.xml',
    extremeWeather: 'https://moxie.foxweather.com/google-publisher/extreme-weather.xml'
};

const LatesWeatherSection = () => {

    const { data, loading, error } = useRSSFeed(RSS_FEEDS.weatherNews)
    const parsedNews = useXMLParser(data)
    const { currentItems, currentPage, totalPages, setCurrentPage } =
        useFilterPagination(parsedNews, 6);



    console.log(parsedNews, "parseddddddd ")
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="lg:text-[32px] md:text-[28px]  text:2xl leading-[130%] font-bold text-[#4A4C56] py-[3px]">Latest Weather News</h1>
                <button className="leading-[130%] text-[#4A4C56] md:text-base text-sm font-normal md:py-[13.5px] py-[8px] md:px-[20px] px-4 bg-[] rounded-[4px] bg-white cursor-pointer shadow-[0 0 20px 0 rgba(19, 142, 255, 0.10)]">
                    View All
                </button>
            </div>

            {/* News Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">
                {currentItems?.map((news, index) => (
                    <Link
                        href={news?.link}
                        key={news?.id}
                        className={` group rounded-[4px] overflow-hidden  bg-white hover:bg-[#0080C4] transition-colors duration-300 cursor-pointer p-5 flex flex-col h-full md:gap-8 gap-6 `}
                    >
                        {/* Image */}
                        <div className="relative max-h-[280px] overflow-hidden">
                            <img
                                src={news?.image}
                                alt={news?.title}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Content */}
                        <div className="flex flex-col flex-grow ">
                            <div className=''>
                                <h2 className={`md:text-2xl text-xl font-bold transition-colors duration-300 group-hover:text-white group-hover:underline leading-[130%] underline-offset-[25%] `}>
                                    {news?.title}
                                </h2>

                                <p className={`md:text-base text-sm  mb-6 mt-5 leading-[160%] tracking-[-0.0160px] transition-colors group-hover:text-[#E9E9EA] duration-300 `}>
                                    {news?.description}
                                </p>
                            </div>

                            {/* Author and Bookmark */}
                            {/* to take the bottom you have to use flex grow in the parrent div and which section you want to take bottom simple use mt-auto */}
                            <div className='mt-auto   '>
                                <div className="flex w-full items-center justify-between px-4 py-3 rounded-[8px] bg-[#F5F5F5] group-hover:bg-white transition-colors duration-300 ">
                                    <div className="flex items-center gap-2.5">
                                        <div className={`w-[44px] h-[44px] rounded-[4px] `}>
                                            {/* <img src="" alt="" className='h-full w-full ' /> */}
                                        </div>
                                        <div className='flex flex-col gap-1'>
                                            <p className={`md:text-base text-sm font-semibold leading-[100%] tracking-[-.016px] text-[#4A4C56] transition-colors duration-300 `}>
                                                {news?.author}
                                            </p>
                                            <p className={`md:text-sm text-xs text-[#777980] leading-[100%] tracking-[-.014px] transition-colors duration-300`}>
                                                {news?.pubDate}

                                                {/* <span>
                                                    {(() => {
                                                        const s = news?.pubDate ?? "";
                                                        const m = s.match(/^(?:[A-Za-z]{3},\s*)?(\d{1,2}\s+[A-Za-z]{3}\s+\d{4})\s+(\d{2}):(\d{2})/);
                                                        if (!m) return s; // fallback if unexpected
                                                        const [, datePart, HH, MM] = m;
                                                        const h = (parseInt(HH, 10) % 12) || 12;
                                                        const ampm = parseInt(HH, 10) >= 12 ? "pm" : "am";
                                                        return `${datePart} at ${h}:${MM} ${ampm}`;
                                                    })()}
                                                </span> */}
                                            </p>
                                        </div>
                                    </div>

                                    {/* <button className={`p-2 rounded-full transition-colors duration-300 `}>
                                    <Bookmark size={16} />
                                </button> */}
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
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
              />
            </div>
          )}
        </div>
        </div>
    );
};

export default LatesWeatherSection;