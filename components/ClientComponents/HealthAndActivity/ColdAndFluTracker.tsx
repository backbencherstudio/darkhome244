import React from 'react'
import HealthAndActivityCard from './HealthAndActivityCard';
import { RSS_COLD_FLU_FEEDS } from '@/lib/RssFeeds';


export default function ColdAndFluTracker() {
  return (
    <div>
       <HealthAndActivityCard RSS_FEEDS={RSS_COLD_FLU_FEEDS} headerTitle="Latest Cold & Flu Tracker News" />
    </div>
  )
}
