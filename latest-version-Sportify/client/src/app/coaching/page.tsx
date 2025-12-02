"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Check, Star, User, Trophy, Calendar } from "lucide-react";
import Link from "next/link";

export default function CoachingPage() {
    const coaches = [
        {
            id: 1,
            name: "Sarah Jenkins",
            specialty: "Marathon Training",
            image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop",
            rating: 4.9,
            reviews: 124,
            price: "$50/session"
        },
        {
            id: 2,
            name: "Mike Thompson",
            specialty: "Strength & Conditioning",
            image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=1974&auto=format&fit=crop",
            rating: 4.8,
            reviews: 98,
            price: "$45/session"
        },
        {
            id: 3,
            name: "Elena Rodriguez",
            specialty: "Yoga & Flexibility",
            image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2070&auto=format&fit=crop",
            rating: 5.0,
            reviews: 156,
            price: "$60/session"
        }
    ];

    return (
        <main className="min-h-screen flex flex-col bg-surface-light dark:bg-surface-dark">
            <Header />

            {/* Hero Section */}
            <section className="relative py-24 bg-black overflow-hidden">
                <div className="absolute inset-0 opacity-40">
                    <img
                        src="https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=2070&auto=format&fit=crop"
                        alt="Coaching Background"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-5xl font-bold text-white mb-6">Train Like a Pro</h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
                        Connect with elite coaches who can help you achieve your fitness goals.
                        Personalized plans, video analysis, and 1-on-1 sessions.
                    </p>
                    <Link href="/booking">
                        <Button size="lg" className="bg-primary hover:bg-primary/90 text-white border-none">
                            Book a Session
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Coaches Grid */}
            <section className="py-20 container mx-auto px-4">
                <h2 className="text-3xl font-bold text-text-main mb-12 text-center">Meet Our Expert Coaches</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {coaches.map((coach) => (
                        <div key={coach.id} className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800 group hover:shadow-xl transition-all">
                            <div className="h-64 overflow-hidden">
                                <img
                                    src={coach.image}
                                    alt={coach.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-text-main">{coach.name}</h3>
                                        <p className="text-primary font-medium">{coach.specialty}</p>
                                    </div>
                                    <div className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900/30 px-2 py-1 rounded-lg">
                                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                        <span className="font-bold text-sm text-yellow-700 dark:text-yellow-500">{coach.rating}</span>
                                    </div>
                                </div>

                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                                        <User className="w-4 h-4" />
                                        <span>{coach.reviews} Verified Reviews</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                                        <Trophy className="w-4 h-4" />
                                        <span>Certified Professional</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                                        <Calendar className="w-4 h-4" />
                                        <span>Available this week</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                                    <span className="text-lg font-bold text-text-main">{coach.price}</span>
                                    <Link href={`/booking?coach=${coach.id}`}>
                                        <Button size="sm" variant="outline">View Profile</Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Features */}
            <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-text-main mb-6">Why Choose Sportify Coaching?</h2>
                            <div className="space-y-6">
                                {[
                                    "Personalized training plans tailored to your goals",
                                    "Video analysis of your form and technique",
                                    "Nutrition guides and meal planning support",
                                    "24/7 chat support with your coach",
                                    "Progress tracking and performance analytics"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-4">
                                        <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                                            <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                                        </div>
                                        <span className="text-gray-700 dark:text-gray-300">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary opacity-20 rounded-3xl transform rotate-3"></div>
                            <img
                                src="https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=2069&auto=format&fit=crop"
                                alt="Training Session"
                                className="relative rounded-3xl shadow-2xl"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
