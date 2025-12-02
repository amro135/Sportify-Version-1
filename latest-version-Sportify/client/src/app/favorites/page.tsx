"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/product/ProductCard";
import { useFavorites } from "@/context/FavoritesContext";
import { products } from "@/lib/data";
import { Heart, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function FavoritesPage() {
    const { favorites } = useFavorites();

    const favoriteProducts = products.filter((product) =>
        favorites.includes(product.id)
    );

    return (
        <main className="min-h-screen flex flex-col bg-surface-light dark:bg-surface-dark">
            <Header />

            <section className="flex-1 py-20 container mx-auto px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
                            <Heart className="w-4 h-4 fill-current" />
                            <span className="font-bold text-sm">MY WISHLIST</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-text-main mb-4">
                            Favorite Products
                        </h1>
                        <p className="text-xl text-text-alt max-w-2xl mx-auto">
                            {favoriteProducts.length > 0
                                ? `You have ${favoriteProducts.length} item${favoriteProducts.length > 1 ? 's' : ''} in your wishlist`
                                : "Your wishlist is empty"
                            }
                        </p>
                    </div>

                    {/* Products Grid */}
                    {favoriteProducts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {favoriteProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    id={product.id}
                                    name={product.name}
                                    price={product.price}
                                    image={product.image}
                                    category={product.category}
                                    rating={product.rating}
                                />
                            ))}
                        </div>
                    ) : (
                        /* Empty State */
                        <div className="text-center py-20">
                            <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full mb-6">
                                <Heart className="w-12 h-12 text-gray-400" />
                            </div>
                            <h2 className="text-2xl font-bold text-text-main mb-4">
                                No favorites yet
                            </h2>
                            <p className="text-text-alt mb-8 max-w-md mx-auto">
                                Start adding products to your wishlist by clicking the heart icon on any product
                            </p>
                            <Link href="/products">
                                <Button className="gap-2">
                                    <ShoppingBag className="w-5 h-5" />
                                    Browse Products
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
