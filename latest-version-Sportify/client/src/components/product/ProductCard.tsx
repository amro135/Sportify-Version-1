"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { Button } from "../ui/Button";
import { motion } from "framer-motion";
import { useFavorites } from "@/context/FavoritesContext";
import { useCart } from "@/lib/cartContext";

interface ProductCardProps {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
    rating: number;
}

export function ProductCard({ id, name, price, image, category, rating }: ProductCardProps) {
    const { isFavorite, toggleFavorite } = useFavorites();
    const { addToCart } = useCart();
    const favorited = isFavorite(id);

    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(id);
    };

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart({
            id,
            name,
            price,
            image,
            qty: 1
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="group relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800"
        >
            {/* Image Container */}
            <div className="relative h-64 w-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={handleFavoriteClick}
                    className={`absolute top-3 right-3 p-2 backdrop-blur-sm rounded-full transition-all ${favorited
                        ? "bg-red-500 text-white hover:bg-red-600"
                        : "bg-white/80 dark:bg-black/50 text-gray-600 dark:text-gray-300 hover:text-red-500 hover:bg-white"
                        }`}
                    aria-label={favorited ? "Remove from wishlist" : "Add to wishlist"}
                >
                    <Heart className={`w-5 h-5 ${favorited ? "fill-current" : ""}`} />
                </motion.button>
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/60 to-transparent">
                    <Button
                        size="sm"
                        className="w-full"
                        onClick={handleAddToCart}
                        aria-label={`Add ${name} to cart`}
                    >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Quick Add
                    </Button>
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                <div className="text-xs text-primary font-semibold mb-1 uppercase tracking-wider">
                    {category}
                </div>
                <Link href={`/products/${id}`}>
                    <h3 className="text-lg font-bold text-text-main mb-2 line-clamp-1 hover:text-primary transition-colors">
                        {name}
                    </h3>
                </Link>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-yellow-400">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            {rating}
                        </span>
                    </div>
                    <div className="text-xl font-bold text-text-main">
                        ${price.toFixed(2)}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
