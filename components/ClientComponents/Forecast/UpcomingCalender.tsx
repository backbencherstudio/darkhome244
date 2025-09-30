import React from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { ChevronDownIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import CalenderIcon from '@/components/Icons/CalenderIcon';



export default function UpcomingCalender() {

    const [open, setOpen] = React.useState(false)
    const [date, setDate] = React.useState<Date | undefined>(undefined)

    return (
        <div>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        id="date"
                        className="md:py-6 py-4 shadow-sm rounded-[4px] px-3 w-[252px] cursor-pointer focus-visible:border-none focus-visible:ring-none focus-visible:ring-[0px] border-0  bg-white text-[#4A4C56] md:text-base text-sm leading-[130%] font-normal flex justify-between"
                    >
                        {date ? date.toLocaleDateString() : "View Forecast"}
                        <CalenderIcon />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="end">
                    <Calendar
                        mode="range"
                        defaultMonth={date}
                        numberOfMonths={1}
                        min={1} max={14}
                        className="rounded-lg border shadow-sm"
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}
