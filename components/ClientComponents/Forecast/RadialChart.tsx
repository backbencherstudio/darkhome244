"use client"; // Needed if using Next.js App Router (app directory)

import dynamic from "next/dynamic";
import React from "react";

const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

const RadialChart = ({ series, startAngle, endAngle, chartId }) => {
    const options = {
        chart: {
            id: chartId,
            height: 280,
            type: "radialBar" as "radialBar",
        },
        series: [series],
        colors: ["#20E647"],
        plotOptions: {
            radialBar: {
                startAngle,
                endAngle,
                track: {
                    background: "#333",
                    startAngle,
                    endAngle,
                },
                dataLabels: {
                    name: {
                        show: false,
                    },
                    value: {
                        fontSize: "30px",
                        show: true,
                    },
                },
            },
        },
        fill: {
            type: "gradient",
            gradient: {
                shade: "dark",
                type: "horizontal",
                gradientToColors: ["#87D4F9"],
                stops: [0, 100],
            },
        },
        stroke: {
            lineCap: "butt" as "butt",
        },
        labels: ["Progress"],
    };

    return <ApexCharts options={options} series={[series]} type="radialBar" height={280} />;
};

export default RadialChart;
