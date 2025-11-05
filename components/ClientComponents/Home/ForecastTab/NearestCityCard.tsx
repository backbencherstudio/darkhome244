

"use client"
import { useLocation } from '@/components/Provider/LocationProvider'
import LoadingMin from '@/components/reusable/LoadingMin'
import React, { useEffect, useState } from 'react'

export default function NearestCityCard() {
    const { location } = useLocation()
    const { latitude, longitude } = location || {}

    const [nearCityData, setNearCityData] = useState([])
    const [loading, setLoading] = useState(true);

    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY
    const userName = process.env.NEXT_PUBLIC_GEONAMES_USERNAME

    useEffect(() => {
        if (!latitude || !longitude) return

        const fetchNearestCitiesWithWeather = async () => {
            try {
                // Fetch nearby cities
                setLoading(true);
                const geoResponse = await fetch(
                    `http://api.geonames.org/findNearbyJSON?lat=${latitude}&lng=${longitude}&maxRows=8&radius=300&featureCode=ADM2&username=${userName}`
                )
                const geoData = await geoResponse.json()
                const cities = geoData?.geonames?.slice(1, 5) || []

                // Fetch weather for all cities in parallel
                const weatherPromises = cities.map(async (city: any) => {
                    const response = await fetch(
                        `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city.name}&days=1&hourly=24&alerts=yes`
                    )
                    return response.json()
                })

                const weatherData = await Promise.all(weatherPromises)
                setNearCityData(weatherData)

            } catch (error) {
                console.error('Error fetching city weather data:', error)
            }finally{
                setLoading(false)
            }
        }

        fetchNearestCitiesWithWeather()
    }, [latitude, longitude, apiKey, userName])

    console.log(nearCityData, "nearCityData")

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {loading ? <LoadingMin/> : (
                nearCityData?.map((city:any,index:number) => (
                    <div key={index} className='bg-white shadow rounded-[4px] p-6 transition hover:shadow-lg'>
                        
                    </div>
                ))
            )}
        </div>
    )
}