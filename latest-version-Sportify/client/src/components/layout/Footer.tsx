"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, Mail } from "lucide-react";
import { Button } from "../ui/Button";

export function Footer() {
    return (
        <footer className="bg-gradient-to-b from-gray-900 to-black border-t border-white/10 pt-16 pb-8 text-gray-300">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link href="/" className="block">
                            <img src="/logo.png" alt="Sportify Logo" className="h-24 w-auto" />
                        </Link>
                        <p className="text-gray-400">
                            Premium sports equipment and professional coaching for athletes of all levels.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Facebook className="w-5 h-5" /></a>
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Twitter className="w-5 h-5" /></a>
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Instagram className="w-5 h-5" /></a>
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Youtube className="w-5 h-5" /></a>
                        </div>
                    </div>

                    {/* Shop */}
                    <div>
                        <h4 className="font-bold mb-4 text-white">Shop</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><Link href="/products?category=running" className="hover:text-primary">Running</Link></li>
                            <li><Link href="/products?category=football" className="hover:text-primary">Football</Link></li>
                            <li><Link href="/products?category=basketball" className="hover:text-primary">Basketball</Link></li>
                            <li><Link href="/products?category=training" className="hover:text-primary">Training</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="font-bold mb-4 text-white">Company</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
                            <li><Link href="/booking" className="hover:text-primary">Book a Coach</Link></li>
                            <li><Link href="/careers" className="hover:text-primary">Careers</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="font-bold mb-4 text-white">Stay Updated</h4>
                        <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                            Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
                        </p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                            />
                            <Button size="sm">
                                <Mail className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-800 pt-8 text-center text-gray-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} Sportify. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
