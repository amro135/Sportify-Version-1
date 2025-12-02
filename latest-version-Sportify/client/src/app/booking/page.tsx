"use client";

import { useState } from "react";
import { CoachCard } from "@/components/booking/CoachCard";
import { BookingCalendar } from "@/components/booking/BookingCalendar";
import { Button } from "@/components/ui/Button";
import { X } from "lucide-react";
import { format } from "date-fns";

// Mock Data
const coaches = [
    {
        id: "1",
        name: "Sarah Jenkins",
        specialty: "Tennis Pro",
        rating: 4.9,
        location: "Sportify Center, NY",
        pricePerHour: 85,
        image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop",
    },
    {
        id: "2",
        name: "Mike Ross",
        specialty: "Personal Trainer",
        rating: 4.8,
        location: "Downtown Gym",
        pricePerHour: 60,
        image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=1974&auto=format&fit=crop",
    },
    {
        id: "3",
        name: "Emma Wilson",
        specialty: "Yoga Instructor",
        rating: 5.0,
        location: "Zen Studio",
        pricePerHour: 55,
        image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2070&auto=format&fit=crop",
    },
];

export default function BookingPage() {
    const [selectedCoach, setSelectedCoach] = useState<typeof coaches[0] | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined);
    const [step, setStep] = useState<"list" | "calendar" | "confirm">("list");

    const handleBookClick = (coach: typeof coaches[0]) => {
        setSelectedCoach(coach);
        setStep("calendar");
    };

    const handleSlotSelect = (date: Date, time: string) => {
        setSelectedDate(date);
        setSelectedTime(time);
        setStep("confirm");
    };

    const handleConfirmBooking = async () => {
        if (!selectedCoach || !selectedDate || !selectedTime) return;

        try {
            const res = await fetch('/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${token}` // TODO: Add auth token
                },
                body: JSON.stringify({
                    serviceType: selectedCoach.name,
                    date: selectedDate,
                    timeSlot: selectedTime,
                }),
            });

            if (res.ok) {
                alert(`Booking Confirmed with ${selectedCoach?.name} on ${format(selectedDate!, "MMM d")} at ${selectedTime}`);
                setStep("list");
                setSelectedCoach(null);
                setSelectedDate(undefined);
                setSelectedTime(undefined);
            } else {
                const data = await res.json();
                alert(data.message || 'Booking failed');
            }
        } catch (error) {
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-text-main mb-2">Book a Coach</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Find the perfect professional to help you reach your goals.
                </p>
            </div>

            {step === "list" && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {coaches.map((coach) => (
                        <CoachCard key={coach.id} coach={coach} onBook={handleBookClick} />
                    ))}
                </div>
            )}

            {step !== "list" && selectedCoach && (
                <div className="max-w-4xl mx-auto">
                    <Button
                        variant="ghost"
                        className="mb-4"
                        onClick={() => setStep("list")}
                    >
                        ← Back to Coaches
                    </Button>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Coach Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 sticky top-24">
                                <h3 className="font-bold text-lg mb-4">Booking Summary</h3>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100">
                                        <img src={selectedCoach.image} alt={selectedCoach.name} className="object-cover w-full h-full" />
                                    </div>
                                    <div>
                                        <div className="font-bold">{selectedCoach.name}</div>
                                        <div className="text-sm text-gray-500">{selectedCoach.specialty}</div>
                                    </div>
                                </div>

                                {selectedDate && selectedTime && (
                                    <div className="bg-primary/5 p-4 rounded-xl mb-4 border border-primary/10">
                                        <div className="text-sm text-gray-500 mb-1">Date & Time</div>
                                        <div className="font-bold text-primary">
                                            {format(selectedDate, "EEEE, MMM d")}
                                        </div>
                                        <div className="font-bold text-primary text-xl">
                                            {selectedTime}
                                        </div>
                                    </div>
                                )}

                                <div className="border-t border-gray-100 dark:border-gray-800 pt-4 mt-4">
                                    <div className="flex justify-between mb-2">
                                        <span className="text-gray-500">Price</span>
                                        <span className="font-bold">${selectedCoach.pricePerHour}</span>
                                    </div>
                                    <div className="flex justify-between mb-4">
                                        <span className="text-gray-500">Service Fee</span>
                                        <span className="font-bold">$5.00</span>
                                    </div>
                                    <div className="flex justify-between text-lg font-bold">
                                        <span>Total</span>
                                        <span className="text-primary">${selectedCoach.pricePerHour + 5}</span>
                                    </div>
                                </div>

                                {step === "confirm" && (
                                    <Button className="w-full mt-6" onClick={handleConfirmBooking}>
                                        Confirm Booking
                                    </Button>
                                )}
                            </div>
                        </div>

                        {/* Calendar */}
                        <div className="lg:col-span-2">
                            <BookingCalendar
                                onSelectSlot={handleSlotSelect}
                                selectedDate={selectedDate}
                                selectedTime={selectedTime}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
