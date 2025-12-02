"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface CartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    qty: number;
    size?: string;
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
    updateQty: (id: string, qty: number) => void;
    cartTotal: number;
    cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    // Load cart from local storage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
            setCartItems(JSON.parse(savedCart));
        }
    }, []);

    // Save cart to local storage on change
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (item: CartItem) => {
        setCartItems((prev) => {
            const existing = prev.find((i) => i.id === item.id && i.size === item.size);
            if (existing) {
                return prev.map((i) =>
                    i.id === item.id && i.size === item.size ? { ...i, qty: i.qty + item.qty } : i
                );
            }
            return [...prev, item];
        });
    };

    const removeFromCart = (id: string) => {
        setCartItems((prev) => prev.filter((i) => i.id !== id));
    };

    const updateQty = (id: string, qty: number) => {
        setCartItems((prev) =>
            prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i))
        );
    };

    const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

    return (
        <CartContext.Provider
            value={{ cartItems, addToCart, removeFromCart, updateQty, cartTotal, cartCount }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
