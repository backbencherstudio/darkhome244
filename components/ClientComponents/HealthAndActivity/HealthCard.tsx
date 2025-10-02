import formatPublishDate from '@/helper/formatedPublishDate';
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


export default function HealthCard({ newsItems }: NewsGridProps) {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2  gap-6'>
            {newsItems?.map((news) => (
                <div key={news?.id}>
                    {/* News Item */}
                    <div

                        className="group rounded-[4px] overflow-hidden bg-white hover:bg-[#0080C4] transition-colors duration-300  p-5 flex flex-col h-full md:gap-8 gap-6"
                    >
                        {/* Image */}
                        <div className="relative h-[280px] overflow-hidden">
                            <img
                                src={news?.image || "/placeholder-img.png"}
                                alt={news?.title}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Content */}
                        <div className="flex flex-col flex-grow">
                            <div>
                                <a target='_blank' href={news?.link} className="md:text-2xl text-xl font-bold transition-colors duration-300 group-hover:text-white hover:underline leading-[130%] underline-offset-[25%]">
                                    {news?.title}
                                </a>
                                <p className="md:text-base text-sm mb-6 mt-5 leading-[160%] tracking-[-0.0160px] transition-colors group-hover:text-[#E9E9EA] duration-300">
                                    {news?.description}
                                </p>
                            </div>

                            {/* Author and Date */}
                            <div className="mt-auto">
                                <div className="flex w-full items-center justify-between px-4 py-3 rounded-[8px] bg-[#F5F5F5] group-hover:bg-white transition-colors duration-300">
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-[44px] h-[44px] rounded-[4px] bg-gray-200">
                                            {/* Placeholder for author image */}
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <p className="md:text-base text-sm font-semibold leading-[100%] tracking-[-.016px] text-[#4A4C56] transition-colors duration-300">
                                                {news?.author}
                                            </p>
                                            <p className="md:text-sm text-xs text-[#777980] leading-[100%] tracking-[-.014px] transition-colors duration-300">
                                                {formatPublishDate(news?.pubDate)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Google Ad after specific position */}
                    {/* {adConfig && index + 1 === adConfig.position && adConfig.adComponent} */}
                </div>
            ))}
        </div>
    )
}
