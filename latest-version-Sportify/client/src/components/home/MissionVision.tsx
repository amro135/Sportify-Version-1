"use client";

import { Target, Users, Award, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export function MissionVision() {
    const values = [
        {
            icon: Target,
            title: "Our Mission",
            description: "To empower athletes of all levels with premium sports equipment and professional coaching services."
        },
        {
            icon: Users,
            title: "Community First",
            description: "Building a global community of sports enthusiasts who inspire and support each other."
        },
        {
            icon: Award,
            title: "Quality Guaranteed",
            description: "Every product is carefully selected and tested to meet the highest performance standards."
        },
        {
            icon: TrendingUp,
            title: "Innovation",
            description: "Constantly evolving with the latest sports technology and training methodologies."
        }
    ];

    return (
        <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold text-text-main mb-4">Why Choose Sportify</h2>
                    <p className="text-xl text-text-alt max-w-2xl mx-auto">
                        We're more than just a store - we're your partner in achieving greatness
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {values.map((value, index) => {
                        const Icon = value.icon;
                        return (
                            <motion.div
                                key={value.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800"
                            >
                                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                                    <Icon className="w-8 h-8 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold text-text-main mb-3">{value.title}</h3>
                                <p className="text-text-alt leading-relaxed">{value.description}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
