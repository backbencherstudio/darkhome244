import React from 'react'
import NewsAndMediaCard from './NewsAndMediaCard';

const RSS_FEEDS = {
  latestNews: 'https://gunsamerica.com/digest/feed/',
  weatherNews: 'https://gunsamerica.com/digest/feed/',
  extremeWeather: 'https://feeds.npr.org/1165/rss.xml'
};


export default function SpaceAndAstronomy() {
  return (
    <div>
      <NewsAndMediaCard RSS_FEEDS={RSS_FEEDS} />
    </div>
  )
}
