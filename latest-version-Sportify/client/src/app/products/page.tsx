"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/product/ProductCard";
import { products } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { Filter, SlidersHorizontal, ChevronDown, ArrowLeft } from "lucide-react";

export default function ProductsPage() {
    const searchParams = useSearchParams();
    const categoryParam = searchParams.get("category");
    const searchParam = searchParams.get("search");
    const [selectedCategory, setSelectedCategory] = useState(categoryParam || "All");
    const [sortBy, setSortBy] = useState("popular");
    const router = useRouter();

    // Update selected category when URL changes
    useEffect(() => {
        if (categoryParam) {
            setSelectedCategory(categoryParam);
        }
    }, [categoryParam]);

    const categories = ["All", "Running Shoes", "Apparel", "Basketball", "Soccer", "Tennis", "Equipment", "Accessories"];

    const filteredProducts = products.filter((product) => {
        // Filter by category
        const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;

        // Filter by search query
        const matchesSearch = !searchParam ||
            product.name.toLowerCase().includes(searchParam.toLowerCase()) ||
            product.description.toLowerCase().includes(searchParam.toLowerCase()) ||
            product.category.toLowerCase().includes(searchParam.toLowerCase());

        return matchesCategory && matchesSearch;
    });

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary transition-colors group"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    </button>
                    <div>
                        <h1 className="text-3xl font-bold text-text-main mb-2">
                            {searchParam ? `Search Results for "${searchParam}"` : "Shop All Products"}
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Showing {filteredProducts.length} results
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto">
                    {/* Mobile Filter Button (could be a drawer trigger) */}
                    <Button variant="outline" className="md:hidden flex-1">
                        <Filter className="w-4 h-4 mr-2" />
                        Filters
                    </Button>

                    {/* Sort Dropdown (Mock) */}
                    <div className="relative flex-1 md:flex-none">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="w-full md:w-48 appearance-none px-4 py-2 pr-8 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                            <option value="popular">Most Popular</option>
                            <option value="newest">Newest Arrivals</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Filters (Desktop) */}
                <aside className="hidden md:block w-64 flex-shrink-0 space-y-8">
                    <div>
                        <h3 className="font-bold mb-4 flex items-center gap-2">
                            <SlidersHorizontal className="w-4 h-4" />
                            Categories
                        </h3>
                        <div className="space-y-2">
                            {categories.map((category) => (
                                <label key={category} className="flex items-center gap-2 cursor-pointer group">
                                    <input
                                        type="radio"
                                        name="category"
                                        checked={selectedCategory === category}
                                        onChange={() => setSelectedCategory(category)}
                                        className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                                    />
                                    <span className={`text-sm group-hover:text-primary transition-colors ${selectedCategory === category ? 'font-medium text-primary' : 'text-gray-600 dark:text-gray-400'}`}>
                                        {category}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold mb-4">Price Range</h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <input type="number" placeholder="Min" className="w-full px-3 py-2 rounded border border-gray-200 dark:border-gray-700 bg-transparent text-sm" />
                                <span className="text-gray-400">-</span>
                                <input type="number" placeholder="Max" className="w-full px-3 py-2 rounded border border-gray-200 dark:border-gray-700 bg-transparent text-sm" />
                            </div>
                            <Button variant="outline" size="sm" className="w-full">Apply</Button>
                        </div>
                    </div>
                </aside>

                {/* Product Grid */}
                <div className="flex-1">
                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProducts.map((product) => (
                                <ProductCard key={product.id} {...product} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
                            <p className="text-gray-500">No products found in this category.</p>
                            <Button
                                variant="ghost"
                                className="mt-4 text-primary"
                                onClick={() => setSelectedCategory("All")}
                            >
                                Clear Filters
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
