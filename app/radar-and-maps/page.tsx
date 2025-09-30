
"use client"
import dynamic from 'next/dynamic'

// 👇 Dynamically import the component with SSR off
const MapComponent = dynamic(() => import('./RadarAndMaps'), {
  ssr: false,
})

export default function RadarPage() {
  return (
    <div>
      <MapComponent />
    </div>
  )
}
