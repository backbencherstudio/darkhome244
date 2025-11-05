

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
            } finally {
                setLoading(false)
            }
        }

        fetchNearestCitiesWithWeather()
    }, [latitude, longitude, apiKey, userName])

    console.log(nearCityData, "nearCityData")

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {loading ? <LoadingMin /> : (
                nearCityData?.map((city: any, index: number) => (
                    <div key={index} className='bg-white shadow rounded-[4px] p-4 transition hover:shadow-lg '>
                        <div className='flex justify-between'>
                            <div>
                                {/* <p>Precip:{city?.forecast?.forecastday[0]?.day?.daily_chance_of_rain}mm</p> */}
                                <p className='text-sm font-semibold text-[#4A4C56] '>Precip: <span className='text-xs font-medium'>{city?.current?.precip_mm} mm</span></p>
                                <p className='text-sm font-semibold text-[#4A4C56] '>Hum: <span className='text-xs font-medium'>{city?.current?.humidity}%</span></p>
                                <p className='text-sm font-semibold text-[#4A4C56] '>Wind: <span className='text-xs font-medium'>{city?.current?.wind_kph}km/h</span></p>
                            </div>
                            <div className='flex flex-col items-center'>
                                <p className='text-[#4A4C56] md:text-xl text-lg font-semibold '>
                                    {city?.location?.name}
                                </p>
                                <div className='text-[#4A4C56] text-sm flex flex-col'>
                                    <span  className=''>Sunrise: {city?.forecast?.forecastday[0]?.astro?.sunrise}</span>
                                    <span >Sunset: {city?.forecast?.forecastday[0]?.astro?.sunset}</span>
                                </div>
                            </div>
                        </div>
                        <div className='flex items-center justify-center'>
                            <img src={city?.current?.condition?.icon} alt="" />
                            <div className='flex items-start'>
                                <span className='text-[#3E3232] lg:text-[32px] md:text-[28px] text-2xl '>{city?.current?.temp_c}</span>
                                °C
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}