import React from 'react'
import HealthAndActivityCard from './HealthAndActivityCard';
const RSS_FEEDS = {
  latestNews: 'https://www.nursingtimes.net/cancer/feed/',
  weatherNews: 'https://healthykidshappykids.com/feed/',
  extremeWeather: 'https://feeds.npr.org/1165/rss.xml'
};


export default function ColdAndFluTracker() {
  return (
    <div>
       <HealthAndActivityCard RSS_FEEDS={RSS_FEEDS} headerTitle="Latest Cold & Flu Tracker News" />
    </div>
  )
}
