"use client";

import Image from "next/image";
import { Star, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface Coach {
    id: string;
    name: string;
    specialty: string;
    rating: number;
    image: string;
    location: string;
    pricePerHour: number;
}

interface CoachCardProps {
    coach: Coach;
    onBook: (coach: Coach) => void;
}

export function CoachCard({ coach, onBook }: CoachCardProps) {
    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-lg transition-all duration-300">
            <div className="flex flex-col md:flex-row">
                <div className="relative w-full md:w-48 h-48 md:h-auto bg-gray-100">
                    <Image
                        src={coach.image}
                        alt={coach.name}
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h3 className="text-xl font-bold text-text-main">{coach.name}</h3>
                                <p className="text-primary font-medium">{coach.specialty}</p>
                            </div>
                            <div className="flex items-center gap-1 text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded-lg">
                                <Star className="w-4 h-4 fill-current" />
                                <span className="text-sm font-bold">{coach.rating}</span>
                            </div>
                        </div>

                        <div className="flex items-center text-gray-500 text-sm mb-4">
                            <MapPin className="w-4 h-4 mr-1" />
                            {coach.location}
                        </div>

                        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-4">
                            Professional coach with over 10 years of experience training elite athletes. Specialized in strength and conditioning.
                        </p>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                        <div>
                            <span className="text-2xl font-bold text-text-main">${coach.pricePerHour}</span>
                            <span className="text-gray-500 text-sm">/session</span>
                        </div>
                        <Button onClick={() => onBook(coach)}>Book Now</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
