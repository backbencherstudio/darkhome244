import React from 'react'
import NewsAndMediaCard from './NewsAndMediaCard';
const RSS_FEEDS = {
  latestNews: 'https://feeds.feedburner.com/EsoTopNews',
  weatherNews: 'https://feeds.feedburner.com/EsoTopNews',
  extremeWeather: 'https://feeds.npr.org/1165/rss.xml'
};
export default function SafetyAndPreparation() {
  return (
    <div>
      <NewsAndMediaCard RSS_FEEDS={RSS_FEEDS} headerTitle = "Safety And Preparation" />
    </div>
  )
}
