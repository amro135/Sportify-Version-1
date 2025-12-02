"use client";

import { Button } from "@/components/ui/Button";
import { Eye, Truck } from "lucide-react";

export default function AdminOrdersPage() {
    const orders = [
        { id: "1024", user: "John Doe", date: "2025-12-01", total: 129.99, isPaid: true, isDelivered: false },
        { id: "1023", user: "Jane Smith", date: "2025-11-30", total: 89.50, isPaid: true, isDelivered: true },
        { id: "1022", user: "Mike Johnson", date: "2025-11-29", total: 245.00, isPaid: false, isDelivered: false },
    ];

    return (
        <div>
            <h1 className="text-3xl font-bold text-text-main mb-8">Orders</h1>

            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 dark:bg-gray-900/50 text-gray-500 text-sm">
                            <tr>
                                <th className="px-6 py-4 font-medium">Order ID</th>
                                <th className="px-6 py-4 font-medium">Customer</th>
                                <th className="px-6 py-4 font-medium">Date</th>
                                <th className="px-6 py-4 font-medium">Total</th>
                                <th className="px-6 py-4 font-medium">Payment</th>
                                <th className="px-6 py-4 font-medium">Delivery</th>
                                <th className="px-6 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {orders.map((order) => (
                                <tr key={order.id} className="group hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                    <td className="px-6 py-4 font-mono text-sm">#{order.id}</td>
                                    <td className="px-6 py-4">{order.user}</td>
                                    <td className="px-6 py-4 text-gray-500">{order.date}</td>
                                    <td className="px-6 py-4 font-medium">${order.total.toFixed(2)}</td>
                                    <td className="px-6 py-4">
                                        {order.isPaid ? (
                                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                                Paid
                                            </span>
                                        ) : (
                                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                                                Pending
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        {order.isDelivered ? (
                                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                                Delivered
                                            </span>
                                        ) : (
                                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
                                                Processing
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-500 hover:text-primary transition-colors" title="View Details">
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            {!order.isDelivered && (
                                                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-500 hover:text-green-500 transition-colors" title="Mark Delivered">
                                                    <Truck className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
