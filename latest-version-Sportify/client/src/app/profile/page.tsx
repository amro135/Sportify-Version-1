"use client";

import { useAuth } from "@/context/AuthContext";

import { Button } from "@/components/ui/Button";
import { User, Package, MapPin, LogOut, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
    const { user, logout } = useAuth();

    // Mock orders (since we don't have an order API yet)
    const orders = [
        { id: "1024", date: "2025-12-01", total: 129.99, status: "Processing", items: 2 },
        { id: "1018", date: "2025-11-15", total: 89.50, status: "Delivered", items: 1 },
    ];

    if (!user) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-2xl font-bold mb-4">Please log in to view your profile</h1>
                <Link href="/login">
                    <Button>Log In</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar / User Info */}
                <div className="w-full md:w-80 space-y-6">
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 text-center">
                        <div className="w-24 h-24 mx-auto mb-4 relative">
                            {user.profileImage ? (
                                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary/10">
                                    <img
                                        src={user.profileImage}
                                        alt={user.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ) : (
                                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                                    <User className="w-10 h-10" />
                                </div>
                            )}
                        </div>
                        <h2 className="text-xl font-bold mb-1">{user.name}</h2>
                        <p className="text-gray-500 mb-6">{user.email}</p>
                        <Link href="/products" className="block w-full mb-2">
                            <Button variant="primary" className="w-full">
                                <ShoppingBag className="w-4 h-4 mr-2" />
                                Browse Products
                            </Button>
                        </Link>
                        <Link href="/profile/edit" className="block w-full mb-2">
                            <Button variant="outline" className="w-full">
                                Edit Profile
                            </Button>
                        </Link>
                        <Button
                            variant="ghost"
                            className="w-full text-red-500 hover:bg-red-50 hover:text-red-600"
                            onClick={logout}
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            Sign Out
                        </Button>
                    </div>

                    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
                        <h3 className="font-bold mb-4 flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            Default Address
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                            123 Sportify Lane<br />
                            Fitness City, FC 12345<br />
                            United States
                        </p>
                    </div>
                </div>

                {/* Main Content / Orders */}
                <div className="flex-1">
                    <h1 className="text-3xl font-bold mb-8">My Orders</h1>

                    <div className="space-y-4">
                        {orders.map((order) => (
                            <div key={order.id} className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl">
                                        <Package className="w-6 h-6 text-gray-500" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-lg">Order #{order.id}</div>
                                        <div className="text-sm text-gray-500">
                                            {order.date} • {order.items} items
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                                    <div className="text-right">
                                        <div className="font-bold">${order.total.toFixed(2)}</div>
                                        <div className={`text-sm font-medium ${order.status === 'Delivered' ? 'text-green-500' : 'text-yellow-500'
                                            }`}>
                                            {order.status}
                                        </div>
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => alert(`Order #${order.id} details:\n\nStatus: ${order.status}\nTotal: $${order.total}\nItems: ${order.items}\n\n(Full receipt view coming soon)`)}
                                    >
                                        View Details
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
