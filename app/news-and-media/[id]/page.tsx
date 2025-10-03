"use client"
import { useRSSFeed } from '@/hooks/useXmlApi'
import { useXMLParser } from '@/hooks/usexmlParser'
import { useParams } from 'next/navigation'
import React from 'react'

export default function NewsDetailsPage() {

    const { id } = useParams()
    console.log(id, "path")

    const { data, loading, error } = useRSSFeed("your RSS feed URL here"); // Adjust with your actual RSS feed URL
    const parsedNews = useXMLParser(data); // Parse the data

    const newsItem = parsedNews?.find((news) => news.id === id);

    if (!newsItem) {
        return <div>News item not found!</div>;
    }

    return (
        <div>
            news details page
        </div>
    )
}
