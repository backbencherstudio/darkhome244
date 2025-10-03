import React from 'react'
import HealthAndActivityCard from './HealthAndActivityCard';
import { RSS_PETS_ANIMALS_FEEDS } from '@/lib/RssFeeds';


export default function PetsAndAnimals() {
  return (
    <div>
     <HealthAndActivityCard RSS_FEEDS={RSS_PETS_ANIMALS_FEEDS} headerTitle="Latest Pets And Animals News" />
    </div>
  )
}
