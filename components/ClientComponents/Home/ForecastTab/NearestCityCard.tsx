

// "use client"
// import { useLocation } from '@/components/Provider/LocationProvider'
// import LoadingMin from '@/components/reusable/LoadingMin'
// import React, { useEffect, useState } from 'react'

// export default function NearestCityCard() {
//     const { location } = useLocation()
//     const { latitude, longitude } = location || {}

//     const [nearCityData, setNearCityData] = useState([])
//     const [loading, setLoading] = useState(true);

//     const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY
//     const userName = process.env.NEXT_PUBLIC_GEONAMES_USERNAME

//     useEffect(() => {
//         if (!latitude || !longitude) return

//         const fetchNearestCitiesWithWeather = async () => {
//             try {
//                 // Fetch nearby cities
//                 setLoading(true);
//                 const geoResponse = await fetch(
//                     `http://api.geonames.org/findNearbyJSON?lat=${latitude}&lng=${longitude}&maxRows=8&radius=300&featureCode=ADM2&username=${userName}`
//                 )
//                 const geoData = await geoResponse.json()
//                 const cities = geoData?.geonames?.slice(1, 5) || []
//                 console.log(cities,"citys")
//                 // Fetch weather for all cities in parallel
//                 const weatherPromises = cities.map(async (city: any) => {
//                     const response = await fetch(
//                         `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city.name}&days=1&hourly=24&alerts=yes`
//                     )
//                     return response.json()
//                 })

//                 const weatherData = await Promise.all(weatherPromises)
//                 setNearCityData(weatherData)

//             } catch (error) {
//                 console.error('Error fetching city weather data:', error)
//             } finally {
//                 setLoading(false)
//             }
//         }

//         fetchNearestCitiesWithWeather()
//     }, [latitude, longitude, apiKey, userName])

//     console.log(nearCityData, "nearCityData")

//     return (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full h-full">
//             {loading ? <LoadingMin /> : (
//                 nearCityData?.map((city: any, index: number) => (
//                     <div key={index} className='bg-white shadow rounded-[4px] p-4 transition hover:shadow-lg flex flex-col justify-between'>
//                         <div className='flex flex-col items-center gap-'>
//                             <div className='flex items-center justify-center '>
//                                 <img className='h-14' src={city?.current?.condition?.icon} alt="" />
//                                 <div className='flex items-start text-[#3E3232]'>
//                                     <span className=' lg:text-[32px] md:text-[28px] text-2xl font-medium'>{city?.current?.temp_c}</span>
//                                     °C
//                                 </div>
//                             </div>
//                             <p className='text-[#4A4C56] md:text-2xl text-lg font-semibold '>
//                                 {city?.location?.name}
//                             </p>
//                         </div>
//                         <div className='flex justify-between'>
//                             <div>
//                                 {/* <p>Precip:{city?.forecast?.forecastday[0]?.day?.daily_chance_of_rain}mm</p> */}
//                                 <p className='text-sm font-semibold text-[#4A4C56] '>Precip: <span className='text-xs font-medium'>{city?.current?.precip_mm} mm</span></p>
//                                 <p className='text-sm font-semibold text-[#4A4C56] '>Hum: <span className='text-xs font-medium'>{city?.current?.humidity}%</span></p>
//                                 <p className='text-sm font-semibold text-[#4A4C56] '>Wind: <span className='text-xs font-medium'>{city?.current?.wind_kph}km/h</span></p>
//                             </div>
//                             <div className='flex flex-col items-center'>
//                                 <div className='text-[#4A4C56] text-sm flex flex-col'>
//                                     <p className='text-sm font-semibold text-[#4A4C56] '>Sunrise:<span  className='text-xs font-medium'>{city?.forecast?.forecastday[0]?.astro?.sunrise}</span></p>
//                                     <p  className='text-sm font-semibold text-[#4A4C56] '>Sunset: <span className='text-xs font-medium'>{city?.forecast?.forecastday[0]?.astro?.sunset}</span></p>

//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 ))
//             )}
//         </div>
//     )
// }

"use client"
import { useLocation } from '@/components/Provider/LocationProvider'
import LoadingMin from '@/components/reusable/LoadingMin'
import React, { useEffect, useState } from 'react'

export default function NearestCityCard() {
    const { location } = useLocation()
    const { latitude, longitude } = location || {}

    const [nearCityData, setNearCityData] = useState([])
    const [loading, setLoading] = useState(true)

    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY
    const userName = process.env.NEXT_PUBLIC_GEONAMES_USERNAME

    useEffect(() => {
        if (!latitude || !longitude) return

        const fetchNearestCitiesWithWeather = async () => {
            try {
                setLoading(true)

                const geoResponse = await fetch(
                    `https://secure.geonames.org/findNearbyJSON?lat=${latitude}&lng=${longitude}&&maxRows=15&radius=300&featureCode=ADM2&username=${userName}`
                )
                const geoData = await geoResponse.json()
                const cities = geoData?.geonames?.slice(1) || []
                console.log(cities, "cityssssssss")
     

                const validWeatherData = []
                const TARGET_CITIES = 4
                const seenLocations = new Set()
                // Fetch weather for cities using coordinates
                for (const city of cities) {
                    if (validWeatherData.length >= TARGET_CITIES) break


                    
                    const location = city?.name
                        ? encodeURIComponent(`${city?.name},${city?.countryName}`)
                        : `${city?.lat},${city?.lng}`;

                    // const location2 =  `${23.75},${90.58333}`
                    const location2 =  `${city?.lat},${city?.lng}`
                    console.log(location,"lat lonc",city?.lat, city?.lng)

                    try {
                        const response = await fetch(
                            `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location2}&days=1&hourly=24&alerts=yes`
                        )

                        if (!response.ok) {
                            continue
                        }

                        const data = await response.json()
                        if (data.error) {
                            continue
                        }
                        const locationKey = `${data?.location?.name?.toLowerCase()}-${data?.location?.region?.toLowerCase()}`

                        if (seenLocations.has(locationKey)) {
                            console.log(`Skipping duplicate: ${data?.location?.name}`)
                            continue // Skip if we already have this location
                        }

                        seenLocations.add(locationKey)
                        validWeatherData.push(data)

                    } catch (error) {
                        continue
                    }
                }

                setNearCityData(validWeatherData)

            } catch (error) {
                console.error('Error fetching city weather data:', error)
                setNearCityData([])
            } finally {
                setLoading(false)
            }
        }

        fetchNearestCitiesWithWeather()
    }, [latitude, longitude, apiKey, userName])

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full h-full">
            {loading ? (
                <LoadingMin />
            ) : nearCityData.length === 0 ? (
                <div className="col-span-full text-center py-8 text-gray-500">
                    No nearby cities found
                </div>
            ) : (
                nearCityData?.map((city: any, index: number) => (
                    <div key={index} className='bg-white shadow rounded-[4px] p-4 transition hover:shadow-lg flex flex-col gap-4 justify-between'>
                        <div className='flex flex-col items-center gap-'>
                            <div className='flex items-center justify-center '>
                                <img className='h-14' src={city?.current?.condition?.icon} alt="" />
                                <div className='flex items-start text-[#3E3232]'>
                                    <span className=' lg:text-[32px] md:text-[28px] text-2xl font-medium'>{city?.current?.temp_c}</span>
                                    °C
                                </div>
                            </div>
                            <p className='text-[#4A4C56] md:text-2xl text-lg font-semibold '>
                                {city?.location?.name}
                            </p>
                        </div>
                        <div className='flex lg:flex-col xl:flex-row xl:justify-between lg:justify-start justify-between'>
                            <div>
                                <p className='text-sm font-semibold text-[#4A4C56] '>Precip: <span className='text-xs font-medium'>{city?.current?.precip_mm} mm</span></p>
                                <p className='text-sm font-semibold text-[#4A4C56] '>Hum: <span className='text-xs font-medium'>{city?.current?.humidity}%</span></p>
                                <p className='text-sm font-semibold text-[#4A4C56] '>Wind: <span className='text-xs font-medium'>{city?.current?.wind_kph}km/h</span></p>
                            </div>
                            <div className='flex flex-col xl:items-center lg:items-start items-center'>
                                <div className='text-[#4A4C56] text-sm flex flex-col'>
                                    <p className='text-sm font-semibold text-[#4A4C56] '>Sunrise:<span className='text-xs font-medium'>{city?.forecast?.forecastday[0]?.astro?.sunrise}</span></p>
                                    <p className='text-sm font-semibold text-[#4A4C56] '>Sunset: <span className='text-xs font-medium'>{city?.forecast?.forecastday[0]?.astro?.sunset}</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}