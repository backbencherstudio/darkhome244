import React from 'react'
import HealthAndActivityCard from './HealthAndActivityCard';
import { RSS_RECIPE_FEEDS } from '@/lib/RssFeeds';


export default function RecipesSection() {
  return (
    <div>
      <HealthAndActivityCard RSS_FEEDS={RSS_RECIPE_FEEDS} headerTitle="Latest Recipes News" />
    </div>
  )
}
