"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Brain, Check, Sparkles, ArrowRight, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function CustomizePage() {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);

    const [preferences, setPreferences] = useState({
        sport: "",
        level: "",
        goal: ""
    });

    const handleSelect = (key: string, value: string) => {
        setPreferences(prev => ({ ...prev, [key]: value }));
    };

    const generateRecommendation = () => {
        setLoading(true);

        // AI Logic Simulation
        setTimeout(() => {
            setLoading(false);

            let bundle = {
                title: "Elite Performance Bundle",
                description: "Based on your goal to improve marathon time, we've curated this lightweight, high-endurance kit.",
                products: [
                    { name: "AeroMax Running Shoes", price: 129.99, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop" },
                    { name: "Performance Training Shirt", price: 45.99, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2080&auto=format&fit=crop" },
                    { name: "HydroFlow Water Bottle", price: 19.99, image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=1974&auto=format&fit=crop" }
                ]
            };

            // Dynamic Bundle Selection
            if (preferences.sport === "Basketball") {
                bundle = {
                    title: "Court Dominator Kit",
                    description: "Maximize your vertical and control with this pro-level basketball setup.",
                    products: [
                        { name: "SlamDunk Pro Shoes", price: 159.99, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop" },
                        { name: "HoopMaster Basketball", price: 34.99, image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?q=80&w=2071&auto=format&fit=crop" },
                        { name: "Performance Training Shirt", price: 45.99, image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=1974&auto=format&fit=crop" }
                    ]
                };
            } else if (preferences.sport === "Soccer") {
                bundle = {
                    title: "Striker's Essential Pack",
                    description: "Everything you need to improve your agility and ball control on the field.",
                    products: [
                        { name: "SpeedBolt Cleats", price: 119.99, image: "https://images.unsplash.com/photo-1511886929837-354d827aae26?q=80&w=2064&auto=format&fit=crop" },
                        { name: "StrikerPro Soccer Ball", price: 39.99, image: "https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?q=80&w=1974&auto=format&fit=crop" },
                        { name: "Training Cones Set", price: 19.99, image: "https://images.unsplash.com/photo-1626247346610-487afdcd0cb9?q=80&w=2070&auto=format&fit=crop" }
                    ]
                };
            } else if (preferences.sport === "Training") {
                bundle = {
                    title: "Total Body Strength Set",
                    description: "Build muscle and endurance with this versatile home gym setup.",
                    products: [
                        { name: "PowerGrip Dumbbells Set", price: 89.99, image: "https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?q=80&w=2070&auto=format&fit=crop" },
                        { name: "Yoga Mat Premium", price: 29.99, image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?q=80&w=2080&auto=format&fit=crop" },
                        { name: "Resistance Bands Pro Set", price: 24.99, image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?q=80&w=2074&auto=format&fit=crop" }
                    ]
                };
            }

            // Customize description based on goal
            if (preferences.goal === "Recovery & Wellness") {
                bundle.description = `Optimize your recovery and stay injury-free with this ${preferences.sport} focused wellness kit.`;
                bundle.products[2] = { name: "Foam Roller", price: 24.99, image: "https://images.unsplash.com/photo-1600881333168-2ef49b341f30?q=80&w=2070&auto=format&fit=crop" };
            }

            setResult(bundle);
            setStep(4);
        }, 2500);
    };

    return (
        <main className="min-h-screen flex flex-col bg-surface-light dark:bg-surface-dark">
            <Header />

            <section className="flex-1 py-20 container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
                            <Brain className="w-4 h-4" />
                            <span className="font-bold text-sm">Sportify AI Engine</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-text-main mb-6">AI Gear Recommender</h1>
                        <p className="text-xl text-text-alt max-w-2xl mx-auto">
                            Stop guessing. Let our advanced AI analyze your profile and build the perfect equipment loadout for your goals.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800 min-h-[500px] relative">
                        {/* Progress Bar */}
                        <div className="absolute top-0 left-0 w-full h-2 bg-gray-100 dark:bg-gray-800">
                            <div
                                className="h-full bg-primary transition-all duration-500"
                                style={{ width: `${(step / 4) * 100}%` }}
                            />
                        </div>

                        <div className="p-8 md:p-12 h-full flex flex-col justify-center">
                            {step === 1 && (
                                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                                    <h2 className="text-2xl font-bold mb-8">What's your primary sport?</h2>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {['Running', 'Basketball', 'Soccer', 'Training'].map(sport => (
                                            <button
                                                key={sport}
                                                onClick={() => { handleSelect('sport', sport); setStep(2); }}
                                                className="p-6 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-primary hover:bg-primary/5 transition-all text-lg font-medium"
                                            >
                                                {sport}
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                                    <h2 className="text-2xl font-bold mb-8">What's your experience level?</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {['Beginner', 'Intermediate', 'Pro Athlete'].map(level => (
                                            <button
                                                key={level}
                                                onClick={() => { handleSelect('level', level); setStep(3); }}
                                                className="p-6 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-primary hover:bg-primary/5 transition-all text-lg font-medium"
                                            >
                                                {level}
                                            </button>
                                        ))}
                                    </div>
                                    <button onClick={() => setStep(1)} className="mt-8 text-gray-500 hover:text-primary">Back</button>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                                    <h2 className="text-2xl font-bold mb-8">What's your main goal?</h2>
                                    <div className="grid grid-cols-1 gap-4 mb-8">
                                        {['Improve Speed & Agility', 'Build Strength & Power', 'Endurance & Stamina', 'Recovery & Wellness'].map(goal => (
                                            <button
                                                key={goal}
                                                onClick={() => { handleSelect('goal', goal); generateRecommendation(); }}
                                                className="p-4 text-left rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-primary hover:bg-primary/5 transition-all text-lg font-medium flex justify-between items-center group"
                                            >
                                                {goal}
                                                <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                                            </button>
                                        ))}
                                    </div>
                                    <button onClick={() => setStep(2)} className="text-gray-500 hover:text-primary">Back</button>
                                </motion.div>
                            )}

                            {loading && (
                                <div className="absolute inset-0 bg-white dark:bg-gray-900 flex flex-col items-center justify-center z-20">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                        className="mb-8"
                                    >
                                        <Sparkles className="w-16 h-16 text-primary" />
                                    </motion.div>
                                    <h3 className="text-2xl font-bold mb-2">Analyzing Biometrics...</h3>
                                    <p className="text-gray-500">Matching gear to your {preferences.level} {preferences.sport} profile</p>
                                </div>
                            )}

                            {step === 4 && result && (
                                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
                                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                                        <Check className="w-8 h-8" />
                                    </div>
                                    <h2 className="text-3xl font-bold mb-2">{result.title}</h2>
                                    <p className="text-gray-500 mb-8 max-w-lg mx-auto">{result.description}</p>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-left">
                                        {result.products.map((product: any, i: number) => (
                                            <div key={i} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
                                                <img src={product.image} alt={product.name} className="w-full h-32 object-cover rounded-lg mb-4" />
                                                <h4 className="font-bold text-sm mb-1">{product.name}</h4>
                                                <p className="text-primary font-bold">${product.price}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex gap-4 justify-center">
                                        <Button onClick={() => { setStep(1); setLoading(false); }} variant="outline">
                                            <RefreshCw className="w-4 h-4 mr-2" /> Start Over
                                        </Button>
                                        <Link href="/cart">
                                            <Button className="bg-primary hover:bg-primary/90 text-white px-8">
                                                Add Bundle to Cart - $195.97
                                            </Button>
                                        </Link>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
