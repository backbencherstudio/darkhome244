import React from 'react'
import HealthAndActivityCard from './HealthAndActivityCard';
const RSS_FEEDS = {
  latestNews: 'https://feeds.feedburner.com/EsoTopNews',
  weatherNews: 'https://feeds.feedburner.com/EsoTopNews',
  extremeWeather: 'https://feeds.npr.org/1165/rss.xml'
};


export default function PetsAndAnimals() {
  return (
    <div>
     <HealthAndActivityCard RSS_FEEDS={RSS_FEEDS} headerTitle="Latest Pets And Animals News" />
    </div>
  )
}
