import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cartContext";
import { AuthProvider } from "@/context/AuthContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { ChatBot } from "@/components/layout/ChatBot";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });

export const metadata: Metadata = {
    title: "Sportify - Premium Sports Equipment",
    description: "Gear Up. Train Hard. Play Better.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <AuthProvider>
                    <FavoritesProvider>
                        <CartProvider>
                            {children}
                            <ChatBot />
                        </CartProvider>
                    </FavoritesProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
