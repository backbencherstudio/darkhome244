import React from 'react'
import NewsAndMediaCard from './NewsAndMediaCard';
import { RSS_SPACE_ASTRONY_FEEDS } from '@/lib/RssFeeds';



export default function SpaceAndAstronomy() {
  return (
    <div>
      <NewsAndMediaCard RSS_FEEDS={RSS_SPACE_ASTRONY_FEEDS} headerTitle = "Space And Astronomy" />
    </div>
  )
}
