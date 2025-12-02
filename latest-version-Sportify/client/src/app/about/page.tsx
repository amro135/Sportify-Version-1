import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Users, Target, Award, Heart } from "lucide-react";
import { Counter } from "@/components/ui/Counter";

export default function AboutPage() {
    return (
        <main className="min-h-screen flex flex-col">
            <Header />
            <div className="flex-1 bg-surface-light dark:bg-surface-dark">
                {/* Hero Section */}
                <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-20">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-5xl font-bold mb-6">About Sportify</h1>
                        <p className="text-xl max-w-3xl mx-auto">
                            Your trusted partner in sports excellence since 2020
                        </p>
                    </div>
                </section>

                {/* Story Section */}
                <section className="py-20 container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold mb-6 text-text-main">Our Story</h2>
                        <div className="prose prose-lg max-w-none text-text-alt space-y-4">
                            <p>
                                Founded in 2020, Sportify emerged from a simple belief: every athlete deserves access to premium equipment and professional coaching, regardless of their level or background.
                            </p>
                            <p>
                                What started as a small online store has grown into a comprehensive sports commerce platform, serving thousands of athletes worldwide. We've partnered with leading brands and professional coaches to bring you the best in sports equipment and training services.
                            </p>
                            <p>
                                Today, Sportify is more than just an e-commerce platform - we're a community of passionate athletes, coaches, and sports enthusiasts working together to push the boundaries of human performance.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <section className="py-20 bg-white dark:bg-gray-900">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold mb-12 text-text-main text-center">Our Core Values</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                { icon: Target, title: "Excellence", desc: "We never compromise on quality" },
                                { icon: Users, title: "Community", desc: "Together we achieve more" },
                                { icon: Award, title: "Integrity", desc: "Honest and transparent always" },
                                { icon: Heart, title: "Passion", desc: "We love what we do" }
                            ].map((value) => {
                                const Icon = value.icon;
                                return (
                                    <div key={value.title} className="text-center">
                                        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Icon className="w-10 h-10 text-primary" />
                                        </div>
                                        <h3 className="text-xl font-bold mb-2 text-text-main">{value.title}</h3>
                                        <p className="text-text-alt">{value.desc}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="py-20 container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            { number: 5000, suffix: "+", label: "Happy Customers" },
                            { number: 100, suffix: "+", label: "Products" },
                            { number: 30, suffix: "+", label: "Expert Coaches" },
                            { number: 98, suffix: "%", label: "Satisfaction Rate" }
                        ].map((stat) => (
                            <div key={stat.label}>
                                <div className="text-4xl font-bold text-primary mb-2">
                                    <Counter value={stat.number} suffix={stat.suffix} />
                                </div>
                                <div className="text-text-alt">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
            <Footer />
        </main>
    );
}
