import React from 'react'
import NewsAndMediaCard from './NewsAndMediaCard';
import { RSS_SAFETY_FEEDS } from '@/lib/RssFeeds';

export default function SafetyAndPreparation() {
  return (
    <div>
      <NewsAndMediaCard RSS_FEEDS={RSS_SAFETY_FEEDS} headerTitle = "Safety And Preparation" />
    </div>
  )
}
