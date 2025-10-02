import React from 'react'
import NewsAndMediaCard from './NewsAndMediaCard'

const RSS_FEEDS = {
    latestNews: 'https://feeds.npr.org/1165/rss.xml',
    weatherNews: 'https://www.fox4news.com/rss/category/weather',
    extremeWeather: 'https://feeds.npr.org/1165/rss.xml'
};

export default function TopWeatherStories() {

    return (
        <div>
            <NewsAndMediaCard RSS_FEEDS = {RSS_FEEDS} headerTitle = "Top Weather Stories" />
        </div>
    )
}
