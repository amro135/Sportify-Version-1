"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface FavoritesContextType {
    favorites: string[];
    addToFavorites: (productId: string) => void;
    removeFromFavorites: (productId: string) => void;
    isFavorite: (productId: string) => boolean;
    toggleFavorite: (productId: string) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
    const [favorites, setFavorites] = useState<string[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load favorites from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem("sportify_favorites");
        if (stored) {
            try {
                setFavorites(JSON.parse(stored));
            } catch (error) {
                console.error("Failed to parse favorites:", error);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save favorites to localStorage whenever they change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("sportify_favorites", JSON.stringify(favorites));
        }
    }, [favorites, isLoaded]);

    const addToFavorites = (productId: string) => {
        setFavorites((prev) => {
            if (!prev.includes(productId)) {
                return [...prev, productId];
            }
            return prev;
        });
    };

    const removeFromFavorites = (productId: string) => {
        setFavorites((prev) => prev.filter((id) => id !== productId));
    };

    const isFavorite = (productId: string) => {
        return favorites.includes(productId);
    };

    const toggleFavorite = (productId: string) => {
        if (isFavorite(productId)) {
            removeFromFavorites(productId);
        } else {
            addToFavorites(productId);
        }
    };

    return (
        <FavoritesContext.Provider
            value={{
                favorites,
                addToFavorites,
                removeFromFavorites,
                isFavorite,
                toggleFavorite,
            }}
        >
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    const context = useContext(FavoritesContext);
    if (context === undefined) {
        throw new Error("useFavorites must be used within a FavoritesProvider");
    }
    return context;
}
