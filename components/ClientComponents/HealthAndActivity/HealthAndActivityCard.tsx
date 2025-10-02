"use client"

import Loading from '@/app/loading';
import formatPublishDate from '@/helper/formatedPublishDate';
import { useFilterPagination } from '@/hooks/useFilterHook';
import { useRSSFeed } from '@/hooks/useXmlApi';
import { useXMLParser } from '@/hooks/usexmlParser';
// components/reusable/NewsGridComponent.tsx
import Link from 'next/link';
import React, { useState } from 'react';
import HealthCard from './HealthCard';
import PaginationComponent from '@/components/reusable/PaginationComponent';



const HealthAndActivityCard = ({ RSS_FEEDS, headerTitle }) => {

    const idRef = React.useRef<HTMLDivElement>(null);
    const { data, loading, error } = useRSSFeed(RSS_FEEDS?.weatherNews || RSS_FEEDS?.latestNews || RSS_FEEDS?.extremeWeather)
    const parsedNews = useXMLParser(data)

    const [viewAll, setViewAll] = useState(false)
    const [currentPageItem, setCurrentPageItems] = useState(4)
    const { currentItems, currentPage, totalPages, setCurrentPage } =
        useFilterPagination(parsedNews, currentPageItem);

    console.log(parsedNews, "parseddddddd ")
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
        <div>
            <div className="flex justify-between items-center mb-6 mt-8">
                <h1 className="lg:text-[32px] md:text-[28px]  text:2xl leading-[130%] font-bold text-[#4A4C56] py-[3px]">{headerTitle}</h1>
                <button onClick={viewHandlerButton} className="leading-[130%] text-[#4A4C56] md:text-base text-sm font-normal md:py-[13.5px] py-[8px] md:px-[20px] px-4 bg-[] rounded-[4px] bg-white cursor-pointer shadow-[0 0 20px 0 rgba(19, 142, 255, 0.10)] hover:bg-[#0080C4] hover:text-white duration-200">
                    {viewAll ? "See Less" : "View All"}
                </button>
            </div>
            <div className='flex lg:flex-row flex-col gap-6 '>
                <div className="lg:w-[66%] w-full ">
                    {loading ? <Loading height='h-[40vh]' /> :
                        <HealthCard newsItems={currentItems} />
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
                <div className='lg:w-[32.12%] w-full  border'>
                    Google adds will show here
                </div>
            </div>
        </div>
    );
};

export default HealthAndActivityCard;