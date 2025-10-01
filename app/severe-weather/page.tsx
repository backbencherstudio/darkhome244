
"use client"
import dynamic from 'next/dynamic'

// 👇 Dynamically import the component with SSR off
const MapComponent = dynamic(() => import('../../components/ClientComponents/RadarAndMaps/RadarAndMaps'), {
    ssr: false,
})

import React from 'react'

export default function SeverWeatherpage() {
    return (
        <div><MapComponent /></div>
    )
}
