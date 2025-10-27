'use client'

import PrecipitationIcon from '@/components/Icons/Precipitation'
import { useLocation } from '@/components/Provider/LocationProvider'
import LoadingMin from '@/components/reusable/LoadingMin'
import { useWeatherData } from '@/hooks/useWeatherData'
import React, { useEffect, useState } from 'react'
import Loading from './../../../app/loading';

interface WeatherData {
  date: string
  temp: string
  feelsLike: string
  condition: string
  wind: string
  humidity: string
  pressure: string
}

// const weatherData: WeatherData[] = [
//   { date: '01, Sep, 2025', temp: '+29℃', feelsLike: '+34℃', condition: 'Rain', wind: '2 ~ 5', humidity: '80%', pressure: '754' },
//   { date: '02, Sep, 2025', temp: '+29℃', feelsLike: '+34℃', condition: 'Rain', wind: '2 ~ 5', humidity: '80%', pressure: '754' },
//   { date: '03, Sep, 2025', temp: '+29℃', feelsLike: '+34℃', condition: 'Rain', wind: '2 ~ 5', humidity: '80%', pressure: '754' },
//   { date: '04, Sep, 2025', temp: '+29℃', feelsLike: '+34℃', condition: 'Rain', wind: '2 ~ 5', humidity: '80%', pressure: '754' },
//   { date: '05, Sep, 2025', temp: '+29℃', feelsLike: '+34℃', condition: 'Rain', wind: '3 ~ 5', humidity: '78%', pressure: '754' },
//   { date: '06, Sep, 2025', temp: '+29℃', feelsLike: '+34℃', condition: 'Rain', wind: '2 ~ 4', humidity: '75%', pressure: '754' },
//   { date: '07, Sep, 2025', temp: '+29℃', feelsLike: '+34℃', condition: 'Rain', wind: '2 ~ 5', humidity: '80%', pressure: '754' },
// ]

export default function DailyForecast({ data, loading }) {

  // const { location, refreshLocation } = useLocation()
  // const latitude = location?.latitude
  // const longitude = location?.longitude
  // console.log(location, '============================')
  // const { data, error, loading } = useWeatherData("forecast", "", latitude, longitude, 7)

  const [weatherData2, setWeatherData] = useState(data)


  useEffect(() => {
    setWeatherData(data)
  }, [data, location])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <LoadingMin />
      </div>
    )
  }

  // console.log(weatherData2?.forecast?.forecastday, 'user daily forecast data============================')

  return (
    <div className="w-full overflow-x-auto bg-[#FFFFFF] border rounded-sm">
      <div className="inline-block min-w-[914px] lg:w-full align-middle p-6 ">
        <table className="min-w-full text-sm text-[#2c261d] font-mulish border-collapse">

          {/* ✅ Header */}
          <thead>
            <tr className='text-[#1D1F2C] font-mulish text-[16px] not-italic font-medium leading-normal '>
              <th className="text-left text-[15px] sm:text-[16px">
                Date
              </th>
              <th className="text-start">Av. Tempreture</th>
              <th className="text-start">weather</th>
              {/* <th className="text-left  text-[15px] sm:text-[16px] ">
                Feels Like
              </th> */}
              <th className="text-left text-[15px] sm:text-[16px] ">
               Max Wind(kph)
              </th>
              <th className="text-left  text-[15px] sm:text-[16px] ">
                Humidity
              </th>
              <th className="text-left  text-[15px] sm:text-[16px] ">
                Rain Possibility
              </th>
            </tr>
          </thead>

          {/* ✅ Full-width border with top & bottom margin effect */}
          <tbody>
            <tr>
              <td colSpan={6}>
                <div className="border-b-1 border-[#7F7F7F]  mb-4 mt-1" />
              </td>
            </tr>
          </tbody>

          {/* ✅ Body */}
          <tbody className="min-w-full text-sm font-mulish text-[#1D1F2C] text-[16px] not-italic font-semibold leading-normal ">

            {weatherData2?.map((day, index) => {
              // const{}=day?.day;
              return (
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? 'bg-[#F3F3F3] ' : 'bg-white '
                    } hover:bg-[#F3F3F3] transition`}
                >

                  <td className="pl-3 whitespace-nowrap text-[14px] sm:text-[15px] py-4">
                    {day.date}
                  </td>

                  <td className=" space-x-3.5 whitespace-nowrap py-4">
                    <span>{day?.day?.avgtemp_c}°C</span>
                    {/* <PrecipitationIcon className='text-[#0080C4] h-5 w-5' /> */}
                  </td>
                  <td className=" flex  space-x-3.5 whitespace-nowrap py-4">
                    <span>
                      <img src={day?.day?.condition?.icon} alt="" className=' object-cover w-5 h-full ' />
                    </span>
                    <span>{day?.day?.condition?.text}</span>
                  </td>
{/* 
                  <td className="   whitespace-nowrap py-4">
                    {day?.hour?.[0].feelslike_c}
                    {day?.hour?. map((data)=>{
                      return (
                        data?.feelslike_c
                      )
                    })}
                  </td> */}

                  <td className="  whitespace-nowrap py-4 ">
                    {day?.day?.maxwind_kph}
                  </td>

                  <td className="  whitespace-nowrap py-4 ">
                    {day.day?.avghumidity}%
                  </td>

                  <td className="   whitespace-nowrap py-4 ">
                    {day?.day?.daily_chance_of_rain}%

                  </td>

                </tr>
              )
            }

            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}



