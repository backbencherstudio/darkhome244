import React from 'react'
import HealthAndActivityCard from './HealthAndActivityCard';
const RSS_FEEDS = {
  latestNews: 'https://www.outdoorlife.com/feed/',
  weatherNews: 'https://www.outdoorlife.com/feed/',
  extremeWeather: 'https://www.outdoorhub.com/feed/'
};


export default function TravelAndOutdoors() {
  return (
    <div>
      <HealthAndActivityCard RSS_FEEDS={RSS_FEEDS} headerTitle="Latest Travel & Outdoors News" />
    </div>
  )
}
