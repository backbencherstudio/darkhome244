
"use client"

import AlertComponent from '@/components/ClientComponents/SevereWeather/AlertComponent'
import SevereWeatherFeed from '@/components/ClientComponents/SevereWeather/SeverWeatherFeed'
import dynamic from 'next/dynamic'

// 👇 Dynamically import the component with SSR off
const MapComponent = dynamic(() => import('../../components/ClientComponents/RadarAndMaps/RadarAndMaps'), {
    ssr: false,
})

import React from 'react'

export default function SeverWeatherpage() {



    return (
        <div>
            <MapComponent overlay='efiRain' />
            <div>
                <AlertComponent />
            </div>
            <div className='maxContainer xl:mt-[60px]  md:mt-[40px] pb-8'>
                <SevereWeatherFeed />
            </div>
        </div>
    )
}
