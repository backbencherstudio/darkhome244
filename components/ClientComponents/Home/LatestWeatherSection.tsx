"use client"
import React, { useEffect, useState } from 'react';
import { Bookmark } from 'lucide-react';
import { useRSSFeed } from '@/hooks/useXmlApi';
import { useXMLParser } from '@/hooks/usexmlParser';
import Link from 'next/link';
import { useFilterPagination } from '@/hooks/useFilterHook';
import PaginationComponent from '@/components/reusable/PaginationComponent';

import Loading from '@/app/loading';
import { usePathname } from 'next/navigation';
import LatestWeatherGridCard from '@/components/reusable/LatestWeatherGridCard';
import { RSS_LATEST_WEATHER_FEEDS } from '@/lib/RssFeeds';
import { useRSSStore } from '@/store/rssStore';




const LatesWeatherSection = () => {

    const pathName = usePathname()
    const itemPerPage = pathName.includes("forecast") ? 3 : 6;

    const [viewAll, setViewAll] = useState(false)
    const [currentPageItem, setCurrentPageItems] = useState(itemPerPage)
    const idRef = React.useRef<HTMLDivElement>(null);
    const { data, loading, error } = useRSSFeed(RSS_LATEST_WEATHER_FEEDS?.weatherNews)
    const parsedNews = useXMLParser(data)
    const { currentItems, currentPage, totalPages, setCurrentPage } =
        useFilterPagination(parsedNews, currentPageItem);

    const { categoryData, addOrUpdateCategoryData, clearData } = useRSSStore()
    const category = "Latest Weather News"

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

    console.log(parsedNews, "parseddddddd ")
    if (error) return <div>Error: {error}</div>;


    const viewHandlerButton = () => {
        if (viewAll) {
            setCurrentPageItems(itemPerPage);
            setViewAll(false);
        } else {
            setCurrentPageItems(parsedNews?.length || 0);
            setViewAll(true);
        }
    }

    return (
        <div className="" ref={idRef} >
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="lg:text-[32px] md:text-[28px]  text:2xl leading-[130%] font-bold text-[#4A4C56] py-[3px]">Latest Weather News</h1>
                <button onClick={viewHandlerButton} className="leading-[130%] text-[#4A4C56] md:text-base text-sm font-normal md:py-[13.5px] py-[8px] md:px-[20px] px-4 bg-[] rounded-[4px] bg-white cursor-pointer shadow-[0 0 20px 0 rgba(19, 142, 255, 0.10)] hover:bg-[#0080C4] hover:text-white duration-200">
                    {viewAll ? "See Less" : "View All"}
                </button>
            </div>

            {loading ? <Loading /> :
                <LatestWeatherGridCard newsItems={currentItems} />
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
    );
};

export default LatesWeatherSection;