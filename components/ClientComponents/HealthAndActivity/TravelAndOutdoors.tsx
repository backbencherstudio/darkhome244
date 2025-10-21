import React from 'react'
import HealthAndActivityCard from './HealthAndActivityCard';
import { RSS_TRAVEL_OUTDOOR_FEEDS } from '@/lib/RssFeeds';


export default function TravelAndOutdoors() {
  return (
    <div>
      <HealthAndActivityCard RSS_FEEDS={RSS_TRAVEL_OUTDOOR_FEEDS} headerTitle="Travel" />
    </div>
  )
}
