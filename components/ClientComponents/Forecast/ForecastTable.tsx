"use client"
import React from 'react'
import { CloudRain, Sun, Cloud, CloudDrizzle } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import LoadingMin from '@/components/reusable/LoadingMin';


export default function ForecastTable({ forecastData, loading }) {


    if (!forecastData?.length)
        return <p>No forecast data available.</p>;

    const getWeatherIcon = (condition) => {
        switch (condition.toLowerCase()) {
            case 'rain':
                return <CloudRain className="w-5 h-5 text-blue-500" />;
            case 'sunny':
                return <Sun className="w-5 h-5 text-yellow-500" />;
            case 'cloudy':
                return <Cloud className="w-5 h-5 text-gray-500" />;
            case 'partly cloudy':
                return <CloudDrizzle className="w-5 h-5 text-gray-400" />;
            default:
                return <CloudRain className="w-5 h-5 text-blue-500" />;
        }
    };

    console.log(forecastData,"forecast Dataaaaaaaaaaaaaaaa")

    return (
        <div className='space-y-6'>
            {loading ? <LoadingMin /> : (
                <>
                    {forecastData?.map((day, dayIndex) => (
                        <div key={dayIndex} className="bg-white rounded-[4px] p-6">
                            {/* Weather Table */}
                            <Table>
                                <TableHeader className=''>
                                    <TableRow className=''>
                                        <TableHead className="md:w-[200px]  ">
                                            <div className=" ">
                                                <h2 className="text-lg md:text-xl lg:text-2xl lg:w-[40%]  text-[#1D1F2C] font-semibold py-1.5">{day?.date}</h2>
                                            </div>
                                        </TableHead>

                                        <TableHead className="text-[#1D1F2C] md:text-base text-sm font-semibold text-center"></TableHead>
                                        <TableHead className="text-[#1D1F2C] md:text-base text-sm font-semibold text-center">Feels Like</TableHead>
                                        <TableHead className="text-[#1D1F2C] md:text-base text-sm font-semibold text-center">Wind</TableHead>
                                        <TableHead className="text-[#1D1F2C] md:text-base text-sm font-semibold text-center">Humidity</TableHead>
                                        <TableHead className="text-[#1D1F2C] md:text-base text-sm font-semibold text-center">Pressure</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody className=''>
                                    {day?.periods?.map((period, periodIndex) => (
                                        <TableRow key={periodIndex} className="hover:bg-gray-50 border-b-0 ">
                                            <TableCell className={`text-[#1D1F2C] md:text-base text-sm font-semibold  ${periodIndex === 0 ? "md:mt-8 pt-6" : ""}`}>{period?.time}</TableCell>
                                            <TableCell className={`flex gap-4 ${periodIndex === 0 ? "md:pt-8 pt-6" : ""}`}>
                                                <span className="text-[#1D1F2C] md:text-base text-sm font-semibold ">{period?.temp}</span>
                                                <div className="flex items-center gap-2">
                                                    {getWeatherIcon(period?.condition)}
                                                    <span className="text-[#1D1F2C] md:text-base text-sm font-semibold ">{period?.condition}</span>
                                                </div>
                                            </TableCell>
                                            {/* <TableCell className="hidden sm:table-cell">
                                        </TableCell> */}
                                            <TableCell className={`text-[#1D1F2C] md:text-base text-sm font-semibold  text-center ${periodIndex === 0 ? "md:pt-8 pt-6" : ""}`}>{period?.feelsLike}</TableCell>
                                            <TableCell className={`text-[#1D1F2C] md:text-base text-sm font-semibold  text-center ${periodIndex === 0 ? "md:pt-8 pt-6" : ""}`}>{period?.wind}</TableCell>
                                            <TableCell className={`text-[#1D1F2C] md:text-base text-sm font-semibold  text-center ${periodIndex === 0 ? "md:pt-8 pt-6" : ""}`}>{period?.humidity}</TableCell>
                                            <TableCell className={`text-[#1D1F2C] md:text-base text-sm font-semibold  text-center ${periodIndex === 0 ? "md:pt-8 pt-6" : ""}`}>{period?.pressure}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    ))}
                </>
            )}

        </div>
    )
}


const weatherData = [
    {
        date: "11, Sep, 2025",
        periods: [
            {
                time: "Morning",
                temp: "+29°C",
                condition: "Rain",
                feelsLike: "+34°C",
                wind: "2 — 5",
                humidity: "80%",
                pressure: "754"
            },
            {
                time: "Afternoon",
                temp: "+29°C",
                condition: "Rain",
                feelsLike: "+34°C",
                wind: "2 — 5",
                humidity: "80%",
                pressure: "754"
            },
            {
                time: "Evening",
                temp: "+29°C",
                condition: "Rain",
                feelsLike: "+34°C",
                wind: "2 — 5",
                humidity: "80%",
                pressure: "754"
            },
            {
                time: "Night",
                temp: "+29°C",
                condition: "Rain",
                feelsLike: "+34°C",
                wind: "2 — 5",
                humidity: "80%",
                pressure: "754"
            }
        ]
    },
    {
        date: "12, Sep, 2025",
        periods: [
            {
                time: "Morning",
                temp: "+29°C",
                condition: "Rain",
                feelsLike: "+34°C",
                wind: "2 — 5",
                humidity: "80%",
                pressure: "754"
            },
            {
                time: "Afternoon",
                temp: "+29°C",
                condition: "Rain",
                feelsLike: "+34°C",
                wind: "2 — 5",
                humidity: "80%",
                pressure: "754"
            },
            {
                time: "Evening",
                temp: "+29°C",
                condition: "Rain",
                feelsLike: "+34°C",
                wind: "2 — 5",
                humidity: "80%",
                pressure: "754"
            },
            {
                time: "Night",
                temp: "+29°C",
                condition: "Rain",
                feelsLike: "+34°C",
                wind: "2 — 5",
                humidity: "80%",
                pressure: "754"
            }
        ]
    },
    {
        date: "13, Sep, 2025",
        periods: [
            {
                time: "Morning",
                temp: "+29°C",
                condition: "Rain",
                feelsLike: "+34°C",
                wind: "2 — 5",
                humidity: "80%",
                pressure: "754"
            },
            {
                time: "Afternoon",
                temp: "+29°C",
                condition: "Rain",
                feelsLike: "+34°C",
                wind: "2 — 5",
                humidity: "80%",
                pressure: "754"
            },
            {
                time: "Evening",
                temp: "+29°C",
                condition: "Rain",
                feelsLike: "+34°C",
                wind: "2 — 5",
                humidity: "80%",
                pressure: "754"
            },
            {
                time: "Night",
                temp: "+29°C",
                condition: "Rain",
                feelsLike: "+34°C",
                wind: "2 — 5",
                humidity: "80%",
                pressure: "754"
            }
        ]
    },
    {
        date: "14, Sep, 2025",
        periods: [
            {
                time: "Morning",
                temp: "+27°C",
                condition: "Cloudy",
                feelsLike: "+31°C",
                wind: "3 — 6",
                humidity: "75%",
                pressure: "752"
            },
            {
                time: "Afternoon",
                temp: "+30°C",
                condition: "Sunny",
                feelsLike: "+35°C",
                wind: "4 — 7",
                humidity: "65%",
                pressure: "753"
            },
            {
                time: "Evening",
                temp: "+28°C",
                condition: "Partly Cloudy",
                feelsLike: "+32°C",
                wind: "3 — 5",
                humidity: "70%",
                pressure: "752"
            },
            {
                time: "Night",
                temp: "+26°C",
                condition: "Rain",
                feelsLike: "+30°C",
                wind: "2 — 4",
                humidity: "82%",
                pressure: "751"
            }
        ]
    }
];