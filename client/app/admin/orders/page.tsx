'use client';

import React, { useEffect, useState } from 'react';
import api from '../../../lib/api';
import { Loader2, Package, CheckCircle, Clock } from 'lucide-react';

interface Order {
    id: string;
    customerName: string;
    phone: string;
    totalAmount: number;
    status: string;
    createdAt: string;
    items: any[];
}

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await api.get('/orders');
            setOrders(response.data);
        } catch (error) {
            console.error("Failed to fetch orders", error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id: string, status: string) => {
        try {
            await api.put(`/orders/${id}/status`, { status });
            setOrders(orders.map(o => o.id === id ? { ...o, status } : o));
        } catch (error) {
            alert("Failed to update status");
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'PENDING': return 'bg-orange-100 text-orange-700';
            case 'SHIPPED': return 'bg-blue-100 text-blue-700';
            case 'DELIVERED': return 'bg-green-100 text-green-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    if (loading) return <div className="p-8"><Loader2 className="animate-spin text-green-700" /></div>;

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-serif font-bold text-green-950">Orders</h1>
                <p className="text-stone-500">Track and manage customer orders</p>
            </div>

            <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full">
                    <thead className="bg-stone-50 border-b border-stone-100">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-bold text-stone-500 uppercase tracking-wider">Order ID</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-stone-500 uppercase tracking-wider">Customer</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-stone-500 uppercase tracking-wider">Phone</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-stone-500 uppercase tracking-wider">Items</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-stone-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-stone-500 uppercase tracking-wider">Amount</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-stone-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-right text-xs font-bold text-stone-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                        {orders.map((order) => (
                            <tr key={order.id} className="hover:bg-stone-50/50 transition-colors">
                                <td className="px-6 py-4 text-stone-500 font-mono text-xs align-top">
                                    #{order.id.slice(-6)}
                                </td>
                                <td className="px-6 py-4 font-medium text-stone-900 align-top">
                                    {order.customerName}
                                </td>
                                <td className="px-6 py-4 text-stone-500 text-sm align-top">
                                    {order.phone}
                                </td>
                                <td className="px-6 py-4 text-stone-500 text-sm align-top">
                                    <ul className="space-y-1">
                                        {order.items.map((item: any) => (
                                            <li key={item.id} className="text-xs">
                                                <span className="font-bold text-stone-700">{item.qty}x</span> {item.product?.name || 'Unknown Product'}
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                                <td className="px-6 py-4 text-stone-500 text-sm align-top">
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 font-bold text-green-800 align-top">
                                    ${Number(order.totalAmount).toFixed(2)}
                                </td>
                                <td className="px-6 py-4 align-top">
                                    <span className={`text-xs px-2 py-1 rounded-full font-bold ${getStatusColor(order.status)}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right align-top">
                                    <select
                                        value={order.status}
                                        onChange={(e) => updateStatus(order.id, e.target.value)}
                                        className="text-sm border border-stone-200 rounded-lg p-1 bg-white outline-none focus:ring-2 focus:ring-green-500"
                                    >
                                        <option value="PENDING">Pending</option>
                                        <option value="SHIPPED">Shipped</option>
                                        <option value="DELIVERED">Delivered</option>
                                        <option value="CANCELLED">Cancelled</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {orders.length === 0 && (
                    <div className="p-12 text-center text-stone-500">
                        No orders found.
                    </div>
                )}
            </div>
        </div>
    );
}
