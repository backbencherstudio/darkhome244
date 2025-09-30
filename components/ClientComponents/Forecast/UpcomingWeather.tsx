"use client"
import React from 'react';
import ForecastTable from './ForecastTable';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import UpcomingCalender from './UpcomingCalender';

const selectItem = [
    { value: "3 days", label: "3 Days" },
    { value: "7 days", label: "7 Days" },
    { value: "10 days", label: "10 Days" }
]






export default function WeatherForecast() {

    const [value, setValue] = React.useState("");

    return (
        <div className='maxContainer'>
            <div className='flex items-center justify-between'>
                <h2 className='text-[#1D1F2C] lg:leading-[32px] md:text-[28px] text-2xl font-bold leading-[130%]'>Upcoming Weather Forecast</h2>
                <div className='flex gap-4 '>
                    <div>
                        <Select  value={value} onValueChange={setValue}>
                            <SelectTrigger className="md:py-6 py-4 shadow-sm rounded-[4px] px-3 w-[128px] cursor-pointer focus-visible:border-none focus-visible:ring-none focus-visible:ring-[0px] border-0  bg-white text-[#4A4C56] md:text-base text-sm leading-[130%] font-normal ">
                                <SelectValue placeholder="Select Day" />
                            </SelectTrigger>
                            <SelectContent>
                                {selectItem?.map((item) => (
                                    <SelectItem key={item?.label} className='cursor-pointer' value={item?.value} >{item?.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div >
                        <UpcomingCalender/>
                    </div>

                </div>
            </div>
            <div className='flex md:flex-row flex-col gap-6 '>
                <div className="md:w-[66%] w-full  my-6">
                    <ForecastTable />
                </div>
                <div className='md:w-[32.12%] w-full mt-4'>
                    Google adds here
                </div>
            </div>
        </div>
    );
}
