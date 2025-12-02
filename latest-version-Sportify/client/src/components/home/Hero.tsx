"use client";

import { Button } from "../ui/Button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function Hero() {
    return (
        <section className="relative h-screen flex items-center overflow-hidden bg-black">
            {/* Animated Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        repeatType: "reverse",
                    }}
                    className="w-full h-full"
                >
                    <img
                        src="https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=2070&auto=format&fit=crop"
                        alt="Hero Background"
                        className="w-full h-full object-cover opacity-60"
                    />
                </motion.div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 relative z-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-3xl"
                >
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                        Unleash Your <br />
                        <span className="text-primary">Inner Athlete</span>
                    </h1>
                    <p className="text-xl text-gray-300 mb-8 max-w-xl leading-relaxed">
                        Premium sports equipment and professional coaching to help you reach your peak performance. Train harder, recover faster, and play better with Sportify.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link href="/products">
                            <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white border-none">
                                Shop Now <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </Link>
                        <Link href="/booking">
                            <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-black">
                                Book a Coach
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Floating Elements */}
            <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute bottom-10 right-10 z-20 hidden lg:block"
            >
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                        <span className="text-white font-medium">Live Coaching</span>
                    </div>
                    <p className="text-gray-300 text-sm">Join 100+ athletes training now</p>
                </div>
            </motion.div>
        </section>
    );
}
