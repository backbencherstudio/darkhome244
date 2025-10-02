import React from 'react'
import HealthAndActivityCard from './HealthAndActivityCard'
const RSS_FEEDS = {
  latestNews: 'https://artofhealthyliving.com/category/wellbeing/feed/',
  weatherNews: 'https://blog.myfitnesspal.com/feed/',
  extremeWeather: 'https://www.kff.org/feed/'
};

export default function HealthSection() {
  return (
    <div>
        <HealthAndActivityCard RSS_FEEDS={RSS_FEEDS} headerTitle = "Latest Health News"  />
    </div>
  )
}
