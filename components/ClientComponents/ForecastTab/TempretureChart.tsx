import React from 'react'
import dynamic from "next/dynamic";
import { useLocation } from '@/components/Provider/LocationProvider';
import { useWeatherData } from '@/hooks/useWeatherData';
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function TempretureChart({forecastData}: {forecastData:any}) {

    // const { location, refreshLocation } = useLocation()
    // const latitude = location?.latitude
    // const longitude = location?.longitude
    // console.log(location, '============================')
    // const { data, error, loading } = useWeatherData("forecast", "", latitude, longitude, 1)
    

    console.log(forecastData,"dataaaaaaa")

    const filteredHours =
        forecastData?.forecast?.forecastday[0]?.hour?.filter((_, i) => i) || [];

    const chartOptions: any = {
        chart: { type: "area", height: 232, toolbar: { show: false } },
        dataLabels: { enabled: false },
        stroke: { curve: "smooth", width: 2, colors: ["#0ea5e9"] },
        fill: {
            type: "gradient",
            gradient: { opacityFrom: 0.45, opacityTo: 0.05 },
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
        },
        yaxis: { show: false },
        grid: { show: false },
        tooltip: { theme: "dark", y: { formatter: (val: number) => `${val}°C` } },
    };

    const chartSeries = [
        {
            name: "Temperature",
            data: filteredHours?.map((h) => h.temp_c),
        },
    ];

    return (
        <div>
            <div className="relative bg-white rounded-lg overflow-hidden border-none py-[38px]">
                <Chart
                    options={chartOptions}
                    series={chartSeries}
                    type="area"
                    height={232}
                />
            </div>
        </div>
    )
}
