import React from 'react'
import NewsAndMediaCard from './NewsAndMediaCard'
import { RSS_TOP_WEATHER_FEEDS } from '@/lib/RssFeeds'



export default function TopWeatherStories() {

    return (
        <div>
            <NewsAndMediaCard RSS_FEEDS = {RSS_TOP_WEATHER_FEEDS} headerTitle = "Top Weather Stories" />
        </div>
    )
}
