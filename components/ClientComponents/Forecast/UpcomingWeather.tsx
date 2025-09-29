import React from 'react';
import { CloudRain, Sun, Cloud, CloudDrizzle } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

export default function WeatherForecast() {
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

    return (
        <div className='maxContainer'>
            <div>
                <h2 className='text-[#1D1F2C] lg:leading-[32px] md:text-[28px] text-2xl font-bold leading-[130%]'>Upcoming Weather Forecast</h2>
            </div>
            <div className='flex gap-6 '>
                <div className="w-[66%] space-y-6 my-6">
                    {weatherData.map((day, dayIndex) => (
                        <div key={dayIndex} className="bg-white rounded-[4px] p-6">
                            {/* Date Header */}


                            {/* Weather Table */}
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[200px]">
                                            <div className="">
                                                <h2 className="text-lg md:text-xl lg:text-2xl lg:w-[40%]  text-[#1D1F2C] font-semibold py-1.5">{day.date}</h2>
                                            </div>
                                        </TableHead>

                                        <TableHead className="text-[#1D1F2C] md:text-base text-sm font-semibold text-center"></TableHead>
                                        <TableHead className="text-[#1D1F2C] md:text-base text-sm font-semibold text-center">Feels Like</TableHead>
                                        <TableHead className="text-[#1D1F2C] md:text-base text-sm font-semibold text-center">Wind</TableHead>
                                        <TableHead className="text-[#1D1F2C] md:text-base text-sm font-semibold text-center">Humidity</TableHead>
                                        <TableHead className="text-[#1D1F2C] md:text-base text-sm font-semibold text-center">Pressure</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {day.periods.map((period, periodIndex) => (
                                        <TableRow key={periodIndex} className="hover:bg-gray-50">
                                            <TableCell className="font-semibold">{period.time}</TableCell>
                                            <TableCell className='flex gap-4'>
                                                <span className="text-lg font-bold text-gray-800">{period.temp}</span>
                                                <div className="flex items-center gap-2">
                                                    {getWeatherIcon(period.condition)}
                                                    <span className="text-gray-700">{period.condition}</span>
                                                </div>
                                            </TableCell>
                                            {/* <TableCell className="hidden sm:table-cell">
                                        </TableCell> */}
                                            <TableCell className="text-center font-semibold">{period.feelsLike}</TableCell>
                                            <TableCell className="text-center font-semibold">{period.wind}</TableCell>
                                            <TableCell className="text-center font-semibold">{period.humidity}</TableCell>
                                            <TableCell className="text-center font-semibold">{period.pressure}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    ))}
                </div>
                <div className='w-[32.12%]'>

                </div>
            </div>
        </div>
    );
}