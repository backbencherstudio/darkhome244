import React from 'react'
import HealthAndActivityCard from './HealthAndActivityCard';
const RSS_FEEDS = {
  latestNews: 'https://www.petplay.com/blogs/tips.atom',
  weatherNews: 'https://iheartcats.com/feed/',
  extremeWeather: 'https://farmtopettreats.com/blogs/word-on-the-treats.atom'
};


export default function PetsAndAnimals() {
  return (
    <div>
     <HealthAndActivityCard RSS_FEEDS={RSS_FEEDS} headerTitle="Latest Pets And Animals News" />
    </div>
  )
}
