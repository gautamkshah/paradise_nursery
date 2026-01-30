'use client';

import React, { useEffect, useState } from 'react';
import api from '../../lib/api';
import { DollarSign, ShoppingBag, Package, AlertTriangle, ArrowUpRight } from 'lucide-react';

export default function AdminDashboard() {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await api.get('/admin/dashboard');
                setStats(response.data.stats);
            } catch (error) {
                console.error("Failed to load dashboard stats", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return <div className="p-8 text-stone-500">Loading dashboard...</div>;

    if (!stats) return <div className="p-8 text-red-500">Failed to load statistics.</div>;

    const statCards = [
        {
            label: 'Total Revenue',
            value: `₹${(stats.totalRevenue || 0).toLocaleString()}`,
            icon: DollarSign,
            color: 'text-green-600',
            bg: 'bg-green-100'
        },
        {
            label: 'Total Orders',
            value: stats.totalOrders,
            icon: ShoppingBag,
            color: 'text-blue-600',
            bg: 'bg-blue-100'
        },
        {
            label: 'Pending Orders',
            value: stats.pendingOrders,
            icon: AlertTriangle,
            color: 'text-orange-600',
            bg: 'bg-orange-100'
        },
        {
            label: 'Low Stock Items',
            value: stats.lowStockProducts,
            icon: Package,
            color: 'text-purple-600',
            bg: 'bg-purple-100'
        },
    ];

    return (
        <div>
            <header className="mb-10">
                <h1 className="text-3xl font-serif font-bold text-green-950">Dashboard</h1>
                <p className="text-stone-500 mt-1">Overview of your store performance</p>
            </header>

            {/* KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {statCards.map((card) => (
                    <div key={card.label} className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-xl ${card.bg}`}>
                                <card.icon className={`w-6 h-6 ${card.color}`} />
                            </div>
                            <span className="text-xs font-medium text-stone-400 bg-stone-50 px-2 py-1 rounded-full">+12%</span>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-stone-500">{card.label}</p>
                            <h3 className="text-2xl font-bold text-gray-900 mt-1">{card.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Activity Section Placeholder */}
            <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-8 h-96 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center mb-4">
                    <ShoppingBag className="w-8 h-8 text-stone-300" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Recent Orders</h3>
                <p className="text-stone-500 max-w-sm mt-2">
                    Order management table will be implemented here. For now, check the "Orders" tab in the sidebar.
                </p>
                <button className="mt-6 text-green-700 font-semibold hover:underline flex items-center gap-1">
                    View All Orders <ArrowUpRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
