import React from 'react'
import HealthAndActivityCard from './HealthAndActivityCard'
import { RSS_HEALTH_FEEDS } from '@/lib/RssFeeds'


export default function HealthSection() {
  return (
    <div>
        <HealthAndActivityCard RSS_FEEDS={RSS_HEALTH_FEEDS} headerTitle = "Latest Health News"  />
    </div>
  )
}
