"use client";

import { Truck, ShieldCheck, UserCheck } from "lucide-react";
import { motion } from "framer-motion";

const features = [
    {
        icon: Truck,
        title: "Fast Delivery",
        description: "Free shipping on orders over $50. Delivered in 1-3 days.",
    },
    {
        icon: UserCheck,
        title: "Verified Coaches",
        description: "Book sessions with certified professionals in your area.",
    },
    {
        icon: ShieldCheck,
        title: "Secure Checkout",
        description: "100% secure payments via Stripe, PayPal & Cryptocurrency.",
    },
];

export function FeatureSection() {
    return (
        <section className="py-20 bg-surface-light dark:bg-surface-dark">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="p-8 rounded-2xl bg-white dark:bg-gray-900 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-800"
                        >
                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary">
                                <feature.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
