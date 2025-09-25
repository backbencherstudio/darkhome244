"use client"
import React from 'react';
import { Bookmark } from 'lucide-react';
import { useRSSFeed } from '@/hooks/useXmlApi';
import { useXMLParser } from '@/hooks/usexmlParser';

const LatesWeatherSection = () => {
    const newsData = [
        {
            id: 1,
            title: "Weather Alert: Unprecedented Heatwave Sweeps Across the US",
            description: "Experts warn of record-breaking temperatures as a severe heatwave grips the nation, urging as a severe heatwave grips the nat.....",
            author: "James",
            date: "August, 18, 2025",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center"
        },
        {
            id: 2,
            title: "Extreme Weather Patterns: Are They the New Normal?",
            description: "Scientists investigate the increasing frequency of extreme weather events and what they mean weather events and what the.....",
            author: "James",
            date: "August, 18, 2025",
            image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=300&fit=crop&crop=center"
        },
        {
            id: 3,
            title: "Rainfall Records Shattered in Europe: Flooding on the Rise",
            description: "Historic rainfall levels cause widespread flooding in multiple European countries, with many area's European countries, with many area's.....",
            author: "James",
            date: "August, 18, 2025",
            image: "/halter.jpg"
        }
    ];
    const rssUrl = "https://feeds.bbci.co.uk/news/rss.xml"
    const { data, loading, error } = useRSSFeed(rssUrl)
    const parsedNews = useXMLParser(data)
    console.log(parsedNews,"parseddddddd ")
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
                {newsData.map((news, index) => (
                    <div
                        key={news.id}
                        className={` group rounded-[4px] overflow-hidden  bg-white hover:bg-[#0080C4] transition-colors duration-300 cursor-pointer p-5 flex flex-col md:gap-8 gap-6 `}
                    >
                        {/* Image */}
                        <div className="relative max-h-[280px] overflow-hidden">
                            <img
                                src={news.image}
                                alt={news.title}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Content */}
                        <div className="">
                            <h2 className={`md:text-2xl text-xl font-bold transition-colors duration-300 group-hover:text-white group-hover:underline leading-[130%] underline-offset-[25%] `}>
                                {news.title}
                            </h2>

                            <p className={`md:text-base text-sm  mb-6 mt-5 leading-[160%] tracking-[-0.0160px] transition-colors group-hover:text-[#E9E9EA] duration-300 `}>
                                {news.description}
                            </p>

                            {/* Author and Bookmark */}
                            <div className="flex items-center justify-betweenbg-red-500 px-4 py-3 rounded-[8px] bg-[#F5F5F5] group-hover:bg-white transition-colors duration-300 ">
                                <div className="flex items-center gap-2.5">
                                    <div className={`w-[44px] h-[44px] rounded-[4px] `}>
                                        <img src="" alt="" className='h-full w-full ' />
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <p className={`md:text-base text-sm font-semibold leading-[100%] tracking-[-.016px] text-[#4A4C56] transition-colors duration-300 `}>
                                            {news.author}
                                        </p>
                                        <p className={`md:text-sm text-xs text-[#777980] leading-[100%] tracking-[-.014px] transition-colors duration-300`}>
                                            {news.date}
                                        </p>
                                    </div>
                                </div>

                                {/* <button className={`p-2 rounded-full transition-colors duration-300 `}>
                                    <Bookmark size={16} />
                                </button> */}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LatesWeatherSection;