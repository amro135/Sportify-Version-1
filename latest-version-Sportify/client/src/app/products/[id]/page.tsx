"use client";

import { useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { products } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { Star, Heart, Truck, ShieldCheck, Minus, Plus, ArrowLeft } from "lucide-react";
import { useCart } from "@/lib/cartContext";
import { useFavorites } from "@/context/FavoritesContext";

export default function ProductDetailPage() {
    const params = useParams();
    const router = useRouter();
    const product = products.find((p) => p.id === params.id) || products[0]; // Fallback for demo
    const [qty, setQty] = useState(1);
    const [selectedSize, setSelectedSize] = useState("M");
    const { addToCart } = useCart();
    const { isFavorite, toggleFavorite } = useFavorites();
    const favorited = isFavorite(product.id);

    const sizes = ["US 7", "US 8", "US 9", "US 10", "US 11"];

    const handleAddToCart = () => {
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            qty: qty,
            size: selectedSize,
        });
        alert("Added to cart!");
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Back Navigation */}
            <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary transition-colors mb-6 group"
            >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="font-medium">Back</span>
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Gallery */}
                <div className="space-y-4">
                    <div className="relative aspect-square bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden">
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>

                {/* Info */}
                <div>
                    <div className="mb-6">
                        <h1 className="text-3xl md:text-4xl font-bold text-text-main mb-2">
                            {product.name}
                        </h1>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="flex items-center text-yellow-400">
                                <Star className="w-5 h-5 fill-current" />
                                <span className="ml-1 font-bold text-text-main">{product.rating}</span>
                                <span className="ml-1 text-gray-500">(128 reviews)</span>
                            </div>
                            <span className="text-green-500 font-medium">In Stock</span>
                        </div>
                        <div className="text-3xl font-bold text-primary">
                            ${product.price.toFixed(2)}
                        </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                        {product.description} Engineered for performance and durability, this product features advanced materials and ergonomic design to help you reach your peak potential.
                    </p>

                    {/* Selectors */}
                    <div className="space-y-6 mb-8">
                        <div>
                            <label className="block font-bold mb-2">Select Size</label>
                            <div className="flex flex-wrap gap-3">
                                {sizes.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`px-4 py-2 rounded-lg border transition-all ${selectedSize === size
                                            ? "border-primary bg-primary/5 text-primary font-bold"
                                            : "border-gray-200 dark:border-gray-700 hover:border-primary/50"
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block font-bold mb-2">Quantity</label>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg">
                                    <button
                                        onClick={() => setQty(Math.max(1, qty - 1))}
                                        className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="w-12 text-center font-bold">{qty}</span>
                                    <button
                                        onClick={() => setQty(qty + 1)}
                                        className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4 mb-8">
                        <Button size="lg" className="flex-1" onClick={handleAddToCart}>
                            Add to Cart - ${(product.price * qty).toFixed(2)}
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className={`px-4 ${favorited ? "bg-red-50 dark:bg-red-900/20 border-red-500 text-red-500" : ""}`}
                            onClick={() => toggleFavorite(product.id)}
                        >
                            <Heart className={`w-6 h-6 ${favorited ? "fill-current" : ""}`} />
                        </Button>
                    </div>

                    {/* Features */}
                    <div className="grid grid-cols-2 gap-4 pt-8 border-t border-gray-200 dark:border-gray-800">
                        <div className="flex items-center gap-3">
                            <Truck className="w-5 h-5 text-primary" />
                            <span className="text-sm font-medium">Free Delivery &gt; $50</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <ShieldCheck className="w-5 h-5 text-primary" />
                            <span className="text-sm font-medium">2 Year Warranty</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
