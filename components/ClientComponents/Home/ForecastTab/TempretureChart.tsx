"use client"
import React, { useEffect, useState } from 'react'
import dynamic from "next/dynamic";
import { useLocation } from '@/components/Provider/LocationProvider';
import { useWeatherData } from '@/hooks/useWeatherData';
import { off } from 'process';
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export interface WeatherCondition {
    text: string;
    icon: string;
    code: number;
}

export interface WeatherHour {
    time: string;
    temp_c: number;
    temp_f?: number;
    is_day?: number;
    condition: WeatherCondition;
}


export default function TempretureChart({ forecastData }: { forecastData: any }) {

    // const { location, refreshLocation } = useLocation()
    // const latitude = location?.latitude
    // const longitude = location?.longitude
    // console.log(location, '============================')
    // const { data, error, loading } = useWeatherData("forecast", "", latitude, longitude, 1)
    // const [currentHourData, setCurrentHourData] = useState<WeatherHour | null>(null);

    console.log(forecastData, "dataaaaaaaxx")

    // useEffect(() => {
    //     if (forecastData) {
    //         const currentHour = new Date(forecastData.location.localtime).getHours();
    //         const todayHours = forecastData?.forecast?.forecastday[0]?.hour ?? [];

    //         const hourMatch = todayHours.find((h: any) => {
    //             const hourTime = new Date(h.time).getHours();
    //             return hourTime === currentHour;
    //         })
    //         if (hourMatch) {
    //             setCurrentHourData(hourMatch);
    //         }
    //     }
    // }, [forecastData]);

  const isUSA = forecastData?.location?.country === "United States of America";

  const temp = isUSA ? forecastData?.current?.temp_f : forecastData?.current?.temp_c;
  const unit = isUSA ? "°F" : "°C";


    const filteredHours =
        forecastData?.forecast?.forecastday[0]?.hour?.filter((h: any) => {
            const currentHour = new Date(forecastData?.location?.localtime).getHours();
            const hourTime = new Date(h.time).getHours();
            return hourTime > currentHour; // only future hours today
        }) || [];


    const chartOptions: any = {
        chart: { type: "area", height: 232, toolbar: { show: false } },
        dataLabels: {
            enabled: true,
            formatter: (val: number) => `${Math.round(val)}°`,
            style: {
                colors: ['rgba(62, 50, 50, 0.75)'],
                fontSize: '12px',
                fontWeight: 'bold',
            },
            background: {
                enabled: false,
            },
            offsetY: -4,
        },
        stroke: { curve: "smooth", width: 1, colors: ["#0ea5e9"] },
        fill: {
            type: "gradient",
            gradient: { opacityFrom: 0.50, opacityTo: 0.05 },
        },
        xaxis: {
            categories: filteredHours.map((h) => {
                const date = new Date(h.time);
                return date.toLocaleString("en-US", {
                    hour: "numeric",
                    hour12: true,
                });
            }),
            labels: {
                style: { colors: "#9ca3af", fontSize: "12px" },
            },
            offsetX: 12,
        },
        yaxis: { show: false, },
        grid: { show: false },
        tooltip: { theme: "dark", y: { formatter: (val: number) => `${Math.round(val)}${unit}` } },
    };

    const chartSeries = [
        {
            name: "Temperature",
            data: filteredHours?.map((h) =>    isUSA ? h.temp_f : h.temp_c),
        },
    ];

    return (
        <div>
            <div className="relative bg-white rounded-lg overflow-hidden border-none   xl:h-[320px] lg:h-[350px] h-[250px]">
                <Chart
                    options={chartOptions}
                    series={chartSeries}
                    type="area"
                    // height={200}
                    height="100%"
                />
            </div>
        </div>
    )
}
