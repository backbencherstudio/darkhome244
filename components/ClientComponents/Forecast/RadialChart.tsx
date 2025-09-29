"use client"; // Needed if using Next.js App Router (app directory)

import dynamic from "next/dynamic";
import React from "react";

const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

const RadialChart = ({ series, startAngle, endAngle, chartId, value }) => {
    const options = {
        chart: {
            id: chartId,
            height: 64,
            type: "radialBar" as "radialBar",
        },
        series: [series],
        colors: ["#0080C4"],
        plotOptions: {
            radialBar: {
                startAngle,
                endAngle,
                track: {
                    background: "#E6F2F9",
                    startAngle,
                    endAngle,
                },
                dataLabels: {
                    name: {
                        show: false,
                    },
                    value: {
                        fontSize: "20px",
                        show: true,
                        formatter: (val: number) => {
                            // If you want to show a special text, use display; otherwise fallback to the numeric val
                            if (value !== undefined && value !== null) {
                                return String(value);
                            }
                            // format as integer or keep decimals as you need
                            return String(Math.round(val));
                        },
                    },
                },
            },
        },
        fill: {
            type: "gradient",
            gradient: {
                shade: "dark",
                type: "horizontal",
                gradientToColors: ["#0080C4"],
                stops: [0, 100],
            },
        },
        stroke: {
            lineCap: "butt" as "butt",
        },
        labels: ["Progress"],
    };

    return <ApexCharts options={options} series={[series]} type="radialBar" height={164} />;
};

export default RadialChart;
