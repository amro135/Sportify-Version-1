"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ShoppingCart, Search, Menu, User, X, Home, ShoppingBag, Calendar, Heart } from "lucide-react";
import { Button } from "../ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { NavBar } from "../ui/tubelight-navbar";
import { cn } from "@/lib/utils";
import { useFavorites } from "@/context/FavoritesContext";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/lib/cartContext";

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const { favorites } = useFavorites();
    const { user } = useAuth();
    const { cartCount } = useCart();
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navItems = [
        { name: 'Home', url: '/', icon: Home },
        { name: 'Shop', url: '/products', icon: ShoppingBag },
        { name: 'Coaching', url: '/coaching', icon: Calendar },
        { name: 'About', url: '/about', icon: User }
    ];

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ease-in-out",
                isScrolled
                    ? "bg-black/50 backdrop-blur-xl border-b border-white/10 shadow-lg py-2"
                    : "bg-transparent border-transparent py-4"
            )}
        >
            <div className="container mx-auto px-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <img src="/logo.png" alt="Sportify Logo" className="h-12 w-auto transition-all duration-300" />
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:block">
                    <NavBar
                        items={navItems}
                        className="relative bottom-auto top-auto left-auto translate-x-0 mb-0 sm:pt-0"
                    />
                </div>

                {/* Search Bar (Desktop) */}
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (searchQuery.trim()) {
                            router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
                        }
                    }}
                    className="hidden md:flex items-center relative w-64"
                >
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-full bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-primary text-sm text-white placeholder-gray-400"
                    />
                    <button type="submit" className="absolute left-3 top-1/2 -translate-y-1/2">
                        <Search className="w-4 h-4 text-gray-400 hover:text-white transition-colors" />
                    </button>
                </form>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <Link href="/favorites" className="relative p-2 hover:bg-white/10 rounded-full transition-colors">
                        <Heart className="w-6 h-6 text-white" />
                        {favorites.length > 0 && (
                            <span className="absolute top-0 right-0 bg-primary text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                {favorites.length}
                            </span>
                        )}
                    </Link>

                    <Link href="/cart" className="relative p-2 hover:bg-white/10 rounded-full transition-colors">
                        <ShoppingCart className="w-6 h-6 text-white" />
                        {cartCount > 0 && (
                            <span className="absolute top-0 right-0 bg-primary text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    {user ? (
                        <Link href="/profile" className="hidden md:flex items-center gap-2 p-2 hover:bg-white/10 rounded-lg transition-colors">
                            {user.profileImage ? (
                                <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20">
                                    <img
                                        src={user.profileImage}
                                        alt={user.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ) : (
                                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                            )}
                            <span className="text-white font-medium">{user.name}</span>
                        </Link>
                    ) : (
                        <Link href="/login" className="hidden md:block">
                            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 hover:text-primary">
                                <User className="w-5 h-5 mr-2" />
                                Login
                            </Button>
                        </Link>
                    )}

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-surface-light dark:bg-surface-dark"
                    >
                        <div className="flex flex-col p-4 gap-4">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800"
                            />
                            <Link href="/products" className="py-2 text-lg font-medium">Shop</Link>
                            <Link href="/coaching" className="py-2 text-lg font-medium">Coaching</Link>
                            <Link href="/about" className="py-2 text-lg font-medium">About</Link>
                            <Link href="/login" className="py-2 text-lg font-medium text-primary">Login / Register</Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
