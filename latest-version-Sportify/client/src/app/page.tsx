import { Hero } from "@/components/home/Hero";
import { FeatureSection } from "@/components/home/FeatureSection";
import { MissionVision } from "@/components/home/MissionVision";
import { CustomizeSection } from "@/components/home/CustomizeSection";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/product/ProductCard";
import { products } from "@/lib/data";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";

export default function Home() {
    const featuredProducts = products.slice(0, 8);
    const topCategories = [
        { name: "Running Shoes", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop" },
        { name: "Apparel", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2080&auto=format&fit=crop" },
        { name: "Basketball", image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?q=80&w=2071&auto=format&fit=crop" },
        { name: "Equipment", image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=2071&auto=format&fit=crop" }
    ];

    return (
        <main className="min-h-screen flex flex-col bg-surface-light dark:bg-surface-dark overflow-x-hidden">
            <Header />
            <Hero />
            <FeatureSection />

            {/* Categories Showcase */}
            <section className="py-20 bg-black relative overflow-hidden">
                {/* Animated Background Gradient */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary via-transparent to-accent animate-pulse"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <h2 className="text-4xl font-bold mb-12 text-white text-center">Shop by Category</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {topCategories.map((category) => (
                            <Link key={category.name} href={`/products?category=${category.name}`}>
                                <div className="group relative h-80 rounded-3xl overflow-hidden cursor-pointer shadow-2xl">
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                                    <div className="absolute bottom-0 left-0 w-full p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                        <h3 className="text-white text-2xl font-bold mb-2">{category.name}</h3>
                                        <span className="text-primary font-medium flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                                            Explore Collection →
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <MissionVision />

            {/* Featured Products */}
            <section className="py-24 container mx-auto px-4">
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <h2 className="text-4xl font-bold text-text-main mb-2">Trending Now</h2>
                        <p className="text-text-alt">Top picks for your next workout</p>
                    </div>
                    <Link href="/products">
                        <Button variant="outline" className="hidden sm:flex">View All Products</Button>
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {featuredProducts.map((product) => (
                        <ProductCard key={product.id} {...product} />
                    ))}
                </div>
                <div className="mt-8 text-center sm:hidden">
                    <Link href="/products">
                        <Button variant="outline" className="w-full">View All Products</Button>
                    </Link>
                </div>
            </section>

            <CustomizeSection />

            {/* Newsletter CTA */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-red-800"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>

                <div className="container mx-auto px-4 text-center relative z-10">
                    <h2 className="text-4xl font-bold text-white mb-6">Join the Sportify Community</h2>
                    <p className="text-white/90 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
                        Subscribe to get exclusive deals, training tips, and be the first to know about new products.
                        <br />
                        <span className="text-sm opacity-80 mt-2 block">(We'll send a confirmation email to verify your subscription)</span>
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            className="flex-1 px-6 py-4 rounded-xl focus:outline-none focus:ring-4 focus:ring-white/30 text-gray-900 shadow-xl"
                        />
                        <Button className="bg-black hover:bg-gray-900 text-white px-8 py-4 rounded-xl shadow-xl transition-transform hover:scale-105">
                            Subscribe
                        </Button>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
