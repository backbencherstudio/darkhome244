"use client"

import React, { useEffect, useState } from 'react'
import WeatherStoriesCard from './WeatherStoriesCard'
import { useRSSFeed } from '@/hooks/useXmlApi';
import { useXMLParser } from '@/hooks/usexmlParser';
import { useFilterPagination } from '@/hooks/useFilterHook';
import Loading from '@/app/loading';
import PaginationComponent from '@/components/reusable/PaginationComponent';
import { useRSSStore } from '@/store/rssStore';




export default function NewsAndMediaCard({ RSS_FEEDS, headerTitle }) {


    const idRef = React.useRef<HTMLDivElement>(null);
    const { data, loading, error } = useRSSFeed(RSS_FEEDS?.weatherNews || RSS_FEEDS?.latestNews || RSS_FEEDS?.extremeWeather)
    const parsedNews = useXMLParser(data)
    const [viewAll, setViewAll] = useState(false)
    const [currentPageItem, setCurrentPageItems] = useState(8)
    const { currentItems, currentPage, totalPages, setCurrentPage } =
        useFilterPagination(parsedNews, currentPageItem);

    // Save only if this category doesn't exist yet
    const { categoryData, addOrUpdateCategoryData, clearData } = useRSSStore()
    const category = "News And Media"

    // Clear old data on first mount (remove this after clearing once)
    useEffect(() => {
        clearData()
    }, [])

    // Save only once
    useEffect(() => {
        if (parsedNews?.length > 0 && !loading) {
            const exists = categoryData.some(cat => cat.category === category)
            if (!exists) {
                addOrUpdateCategoryData(category, parsedNews)
            }
        }
    }, [parsedNews, loading])


    if (error) return <div>Error: Failed To Fetch {error}</div>;

    const viewHandlerButton = () => {
        if (viewAll) {
            setCurrentPageItems(8);
            setViewAll(false);
        } else {
            setCurrentPageItems(parsedNews?.length || 0);
            setViewAll(true);
        }
    }

    return (
        <div ref={idRef}>
            {/* Header */}
            <div className="flex justify-between items-center mb-6 mt-8">
                <h1 className="lg:text-[32px] md:text-[28px]  text:2xl leading-[130%] font-bold text-[#4A4C56] py-[3px]">{headerTitle}</h1>
                <button onClick={viewHandlerButton} className="leading-[130%] text-[#4A4C56] md:text-base text-sm font-normal md:py-[13.5px] py-[8px] md:px-[20px] px-4 bg-[] rounded-[4px] bg-white cursor-pointer shadow-[0 0 20px 0 rgba(19, 142, 255, 0.10)] hover:bg-[#0080C4] hover:text-white duration-200">
                    {viewAll ? "See Less" : "View All"}
                </button>
            </div>
            <div>
                <div className='flex lg:flex-row flex-col gap-6 '>
                    <div className="lg:w-[66%] w-full ">
                        {loading ? <Loading height='h-[40vh]' /> :
                            <WeatherStoriesCard newsItems={currentItems} />
                        }

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
                    <div className='lg:w-[32.12%] w-full  '>
                        {/* Google adds */}
                    </div>
                </div>
            </div>
        </div>
    )
}
