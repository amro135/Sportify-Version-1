"use client";

import { Button } from "../ui/Button";
import Link from "next/link";
import { Brain, ArrowRight } from "lucide-react";

export function CustomizeSection() {
    return (
        <section className="py-20 bg-black text-white overflow-hidden relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1 space-y-6">
                        <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full border border-primary/30">
                            <Brain className="w-4 h-4" />
                            <span className="font-bold text-sm">New Feature</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                            AI-Powered <br />
                            <span className="text-primary">Gear Recommender</span>
                        </h2>
                        <p className="text-gray-400 text-lg max-w-xl">
                            Not sure what you need? Our advanced AI analyzes your sport, experience level, and goals to build the perfect equipment bundle just for you.
                        </p>
                        <Link href="/customize">
                            <Button size="lg" className="bg-white text-black hover:bg-gray-200 border-none">
                                Try AI Recommender <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </Link>
                    </div>
                    <div className="flex-1 relative">
                        <div className="relative z-10 bg-gradient-to-tr from-gray-900 to-gray-800 p-2 rounded-2xl border border-gray-700 shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                            <img
                                src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop"
                                alt="AI Technology"
                                className="rounded-xl w-full"
                            />
                            <div className="absolute -bottom-6 -right-6 bg-primary text-white p-4 rounded-xl shadow-lg flex items-center gap-3 animate-bounce">
                                <Brain className="w-8 h-8" />
                                <div>
                                    <div className="font-bold text-sm">AI Analysis</div>
                                    <div className="text-xs opacity-80">Processing...</div>
                                </div>
                            </div>
                        </div>
                        {/* Decorative Elements */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/20 blur-3xl rounded-full -z-10"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
