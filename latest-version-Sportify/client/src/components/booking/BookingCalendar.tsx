"use client";

import { useState } from "react";
import { format, addDays, startOfWeek, addWeeks, subWeeks, isSameDay } from "date-fns";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface BookingCalendarProps {
    onSelectSlot: (date: Date, time: string) => void;
    selectedDate?: Date;
    selectedTime?: string;
}

export function BookingCalendar({ onSelectSlot, selectedDate, selectedTime }: BookingCalendarProps) {
    const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));

    const timeSlots = [
        "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"
    ];

    const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(currentWeekStart, i));

    const nextWeek = () => setCurrentWeekStart(addWeeks(currentWeekStart, 1));
    const prevWeek = () => setCurrentWeekStart(subWeeks(currentWeekStart, 1));

    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg">Select a Time</h3>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={prevWeek}>
                        <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <span className="font-medium min-w-[140px] text-center">
                        {format(currentWeekStart, "MMM d")} - {format(addDays(currentWeekStart, 6), "MMM d, yyyy")}
                    </span>
                    <Button variant="outline" size="sm" onClick={nextWeek}>
                        <ChevronRight className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2 mb-4">
                {weekDays.map((day) => (
                    <div key={day.toString()} className="text-center">
                        <div className="text-xs text-gray-500 mb-1">{format(day, "EEE")}</div>
                        <div className={`text-sm font-bold p-2 rounded-lg ${isSameDay(day, new Date()) ? 'bg-primary/10 text-primary' : ''}`}>
                            {format(day, "d")}
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
                {weekDays.map((day) => (
                    <div key={day.toString()} className="space-y-2">
                        {timeSlots.map((time) => {
                            const isSelected = selectedDate && isSameDay(day, selectedDate) && selectedTime === time;
                            // Mock random availability
                            const isAvailable = Math.random() > 0.3;

                            return (
                                <button
                                    key={`${day}-${time}`}
                                    disabled={!isAvailable}
                                    onClick={() => onSelectSlot(day, time)}
                                    className={`w-full py-2 text-xs rounded-md border transition-all ${isSelected
                                            ? "bg-primary text-white border-primary"
                                            : isAvailable
                                                ? "border-gray-200 dark:border-gray-700 hover:border-primary hover:text-primary"
                                                : "bg-gray-100 dark:bg-gray-800 text-gray-400 border-transparent cursor-not-allowed"
                                        }`}
                                >
                                    {time}
                                </button>
                            );
                        })}
                    </div>
                ))}
            </div>

            <div className="mt-6 flex items-center justify-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full border border-gray-300"></div>
                    <span>Available</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gray-100 dark:bg-gray-800"></div>
                    <span>Booked</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                    <span>Selected</span>
                </div>
            </div>
        </div>
    );
}
