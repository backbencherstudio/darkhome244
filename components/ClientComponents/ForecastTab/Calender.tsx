'use client';

import UvIndexIcon from '@/components/Icons/UvIndex';
import {
    CalendarBody,
    CalendarDate,
    CalendarDatePicker,
    CalendarHeader,
    CalendarMonthPicker,
    CalendarProvider,
} from '@/components/ui/shadcn-io/calendar';

const Example = () => {
    return (
        <CalendarProvider className=''>
            <CalendarDate>
                <CalendarDatePicker className='w-full'>
                    {/* Only month dropdown */}
                    <div className='flex justify-between  w-full '>
                        <TodaysForecast />
                        <CalendarMonthPicker  className='border-0 cursor-pointer rounded-[4px] background-white shadow-[0_0_20px_0_rgba(19,142,255,0.10)] text-base leading-[140%] py-[13.5px] px-3 h-fit'/>
                    </div>
                </CalendarDatePicker>
            </CalendarDate>

            {/* Header (like week names: Mon, Tue, etc.) */}
            <CalendarHeader />

            {/* Calendar body (empty for now — can add items later if needed) */}
            <CalendarBody features={[]} />
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