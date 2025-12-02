"use client";

import { DollarSign, ShoppingBag, Package, Users, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
    const stats = [
        { label: "Total Revenue", value: "$12,345.00", icon: DollarSign, change: "+12%", color: "text-green-500" },
        { label: "Total Orders", value: "156", icon: ShoppingBag, change: "+8%", color: "text-blue-500" },
        { label: "Products", value: "48", icon: Package, change: "+2", color: "text-purple-500" },
        { label: "Total Users", value: "2,300", icon: Users, change: "+15%", color: "text-orange-500" },
    ];

    return (
        <div>
            <h1 className="text-3xl font-bold text-text-main mb-8">Dashboard Overview</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div key={stat.label} className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-3 rounded-xl bg-opacity-10 ${stat.color.replace('text-', 'bg-')}`}>
                                    <Icon className={`w-6 h-6 ${stat.color}`} />
                                </div>
                                <span className="flex items-center text-sm font-medium text-green-500 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded-full">
                                    <TrendingUp className="w-3 h-3 mr-1" />
                                    {stat.change}
                                </span>
                            </div>
                            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">{stat.label}</h3>
                            <p className="text-2xl font-bold text-text-main mt-1">{stat.value}</p>
                        </div>
                    );
                })}
            </div>

            {/* Recent Orders Placeholder */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-xl font-bold mb-6">Recent Orders</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-200 dark:border-gray-700 text-gray-500 text-sm">
                                <th className="pb-4 font-medium">Order ID</th>
                                <th className="pb-4 font-medium">Customer</th>
                                <th className="pb-4 font-medium">Date</th>
                                <th className="pb-4 font-medium">Amount</th>
                                <th className="pb-4 font-medium">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <tr key={i} className="group hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                    <td className="py-4 font-mono text-sm">#ORD-00{i}</td>
                                    <td className="py-4">John Doe</td>
                                    <td className="py-4 text-gray-500">Dec 1, 2025</td>
                                    <td className="py-4 font-medium">$120.00</td>
                                    <td className="py-4">
                                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                            Paid
                                        </span>
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
