'use client';

import UvIndexIcon from '@/components/Icons/UvIndex';
import { useLocation } from '@/components/Provider/LocationProvider';
import {
    CalendarBody,
    CalendarDate,
    CalendarDatePicker,
    CalendarHeader,
    CalendarItem,
    CalendarMonthPicker,
    CalendarProvider,
} from '@/components/ui/shadcn-io/calendar';
import { useWeatherData } from '@/hooks/useWeatherData';
import { CloudRain, CloudSun, Sun } from 'lucide-react';



const Example = () => {

    const { location } = useLocation()
    const { data } = useWeatherData(location?.latitude, location?.longitude)
    console.log(data, "dataaaaaaaa")

    // ✅ Transform API data into calendar features
    const weatherData =
        data?.daily?.time?.map((time: string, index: number) => {
            const date = new Date(time);

            const temp = data?.daily?.temperature_2m_max?.[index] ?? 0;
            const code = data?.daily?.weather_code?.[index]; // optional, depending on your API

            let icon;
            let name = 'Sunny';

            if ([61, 63, 65, 80, 81, 82,85,86,95,96,99].includes(code)) {
                icon = <CloudRain className="w-6 h-6 text-blue-500" />;
                name = 'Rainy';
            } else if ([ 2, 3, 45, 48].includes(code)) {
                icon = <CloudSun className="w-6 h-6 text-gray-500" />;
                name = 'Cloudy';
            } else if([0,1].includes(code)) {
                icon = <Sun className="w-6 h-6 text-yellow-400" />;
                name = 'Sunny';
            }

            return {
                id: `${time}`,
                name,
                startAt: date,
                endAt: date,
                status: {
                    id: `${time}`,
                    name,
                    color: code === 61 ? '#3B82F6' : code === 3 ? '#6B7280' : '#FDB813',
                },
                icon,
                temp,
                isToday:
                    date.getDate() === new Date().getDate() &&
                    date.getMonth() === new Date().getMonth(),
            };
        }) ?? [];


    return (
        <CalendarProvider className=''>
            <CalendarDate>
                <CalendarDatePicker className='w-full'>
                    {/* Only month dropdown */}
                    <div className='flex justify-between  w-full '>
                        <TodaysForecast />
                        <CalendarMonthPicker className='border-0 cursor-pointer rounded-[4px] background-white shadow-[0_0_20px_0_rgba(19,142,255,0.10)] text-base leading-[140%] py-[13.5px] px-3 h-fit' />
                    </div>
                </CalendarDatePicker>
            </CalendarDate>

            {/* Header (like week names: Mon, Tue, etc.) */}
            <CalendarHeader />

            {/* Calendar body (empty for now — can add items later if needed) */}
            <CalendarBody features={weatherData} />

        </CalendarProvider>
    );
};

export default Example;

const TodaysForecast = () => {
    return (
        <div className="flex items-center justify-between mb-8">
            <div className="flex gap-4">
                <UvIndexIcon className="size-12 text-[#0080C4]" />
                <div className="lg:text-[48px] md:text-[36px] text-[28px] text-[#3E3232] flex  leading-[100%] items-start ">44<span className='md:text-base text-sm font-medium'>°C</span> </div>
                <div className='text-[#777980] text-sm flex flex-col gap-0 '>
                    <div className="">
                        Precipitation: 73%
                    </div>
                    <div className="">
                        Humidity: 44%
                    </div>
                    <div className="">
                        Wind: 33 km/H
                    </div>
                </div>
            </div>
        </div>
    )
}