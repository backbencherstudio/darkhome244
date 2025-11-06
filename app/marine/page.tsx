import WeatherForecastTab from '@/components/ClientComponents/Home/WeatherForecasatTab'
import MarineFeed from '@/components/ClientComponents/MarineForecast/MarineFeed'
import MarineForecast from '@/components/ClientComponents/MarineForecast/MarineForecast'

import React from 'react'

export default function MarinePage() {
  return (
    <div>
      <div className='py-[60px]  w-full '
        style={{
          background: "linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%), url('/forecastBanner.png') lightgray 50% / cover no-repeat",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: "no-repeat"
        }}>
        <div className='text-white'>
          <MarineForecast />
        </div>
      </div>

      <div className='maxContainer py-8'>
        <MarineFeed />
      </div>
    </div>
  )
}
