"use client";

import { Button } from "@/components/ui/Button";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/lib/cartContext";

export default function CheckoutSuccessPage() {
    // Clear cart on mount (optional, or handle in checkout)
    // const { clearCart } = useCart(); 
    // useEffect(() => clearCart(), []);

    return (
        <div className="container mx-auto px-4 py-20 text-center">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
                <CheckCircle className="w-10 h-10" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Order Confirmed!</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-2">
                Thank you for your purchase.
            </p>
            <p className="text-gray-500 mb-8">
                Order ID: <span className="font-mono font-bold text-text-main">SP1024</span>
            </p>
            <div className="flex justify-center gap-4">
                <Link href="/products">
                    <Button>Continue Shopping</Button>
                </Link>
                <Link href="/profile">
                    <Button variant="outline">View Order</Button>
                </Link>
            </div>
        </div>
    );
}
