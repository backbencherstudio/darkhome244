"use client"
import { useRSSFeed } from '@/hooks/useXmlApi'
import { useXMLParser } from '@/hooks/usexmlParser'
import { useRSSStore } from '@/store/rssStore'
import { useParams } from 'next/navigation'
import React from 'react'

export default function NewsDetailsPage() {

    const { id } = useParams()
    // console.log(id, "path")


    const categoryData = useRSSStore(state => state.categoryData)
    // console.log(categoryData,"categorrrrrrrrrrry")

    // const newsItem = parsedNews?.find((news) => news.id === id);

    // if (!newsItem) {
    //     return <div>News item not found!</div>;
    // }

    return (
        <div>
            news details page
        </div>
    )
}
