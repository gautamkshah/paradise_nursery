'use client';

import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import api from '../../lib/api';
import { Loader2, Package, ShoppingBag, ArrowRight, Leaf } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface OrderItem {
    id: string;
    qty: number;
    price: number;
    product: {
        name: string;
        images: string[];
    };
}

interface Order {
    id: string;
    totalAmount: number;
    status: string;
    createdAt: string;
    items: OrderItem[];
}

export default function ProfilePage() {
    const { user, isAuthenticated, updateUser } = useAuthStore();
    const router = useRouter();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    // Edit Profile State
    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        phone: '',
        address: '',
        city: '',
        pincode: ''
    });

    useEffect(() => {
        if (!isAuthenticated() || !user) {
            router.push('/login');
            return;
        }

        // Initialize form data
        setFormData({
            phone: user.phone || '',
            address: user.address || '',
            city: user.city || '',
            pincode: user.pincode || ''
        });

        fetchOrders();
    }, [isAuthenticated, router, user]);

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            if (!user) return;
            const res = await api.put(`/auth/profile/${user.id}`, {
                ...formData,
                name: user.name // Preserve name
            });
            updateUser(res.data.user);
            setEditing(false);
        } catch (error) {
            alert("Failed to update profile");
        } finally {
            setSaving(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const fetchOrders = async () => {
        if (!user) return;
        try {
            const response = await api.get(`/orders/user/${user.id}`);
            setOrders(response.data);
        } catch (error) {
            console.error("Failed to fetch orders");
        } finally {
            setLoading(false);
        }
    };

    if (!user) return null;

    return (
        <div className="min-h-screen bg-[#f0f9f0] pt-24 pb-12 px-4 md:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-serif font-bold text-green-950">My Profile</h1>
                    <div className="mt-4 bg-white p-6 rounded-2xl shadow-sm border border-green-50 flex items-center gap-4">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-2xl font-bold text-green-800">
                            {user.name.charAt(0)}
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-green-900">{user.name}</h2>
                            <p className="text-stone-500">{user.email}</p>
                            <span className="inline-block mt-2 px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full border border-green-100">
                                {user.role} Account
                            </span>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Address Section */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 mb-8">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-green-900 flex items-center gap-2">
                                <Leaf className="w-5 h-5" />
                                Shipping Address
                            </h2>
                            {!editing && (
                                <button
                                    onClick={() => setEditing(true)}
                                    className="text-green-700 font-bold text-sm hover:underline"
                                >
                                    Edit
                                </button>
                            )}
                        </div>

                        {editing ? (
                            <form onSubmit={handleUpdateProfile} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-stone-700 mb-1">Phone</label>
                                        <input
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full p-2 bg-stone-50 border border-stone-200 rounded-lg outline-none focus:ring-2 focus:ring-green-500 text-stone-900"
                                            placeholder="Mobile Number"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-stone-700 mb-1">Pincode</label>
                                        <input
                                            name="pincode"
                                            value={formData.pincode}
                                            onChange={handleChange}
                                            className="w-full p-2 bg-stone-50 border border-stone-200 rounded-lg outline-none focus:ring-2 focus:ring-green-500 text-stone-900"
                                            placeholder="ZIP / Postal Code"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-stone-700 mb-1">Address</label>
                                    <textarea
                                        name="address"
                                        rows={2}
                                        value={formData.address}
                                        onChange={handleChange}
                                        className="w-full p-2 bg-stone-50 border border-stone-200 rounded-lg outline-none focus:ring-2 focus:ring-green-500 text-stone-900 resize-none"
                                        placeholder="Full delivery address"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-stone-700 mb-1">City</label>
                                    <input
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        className="w-full p-2 bg-stone-50 border border-stone-200 rounded-lg outline-none focus:ring-2 focus:ring-green-500 text-stone-900"
                                        placeholder="City / District"
                                    />
                                </div>
                                <div className="flex gap-3 pt-2">
                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="px-6 py-2 bg-green-800 text-white rounded-lg font-bold shadow-md hover:bg-green-900 transition-colors flex items-center gap-2"
                                    >
                                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Details'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setEditing(false)}
                                        className="px-6 py-2 bg-stone-100 text-stone-700 rounded-lg font-bold hover:bg-stone-200 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 text-stone-600">
                                <div>
                                    <p className="text-xs text-stone-400 uppercase font-bold tracking-wider mb-1">Phone</p>
                                    <p className="font-medium text-stone-900">{user.phone || '—'}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-stone-400 uppercase font-bold tracking-wider mb-1">City / Pincode</p>
                                    <p className="font-medium text-stone-900">{user.city ? `${user.city}, ${user.pincode}` : '—'}</p>
                                </div>
                                <div className="md:col-span-2">
                                    <p className="text-xs text-stone-400 uppercase font-bold tracking-wider mb-1">Address</p>
                                    <p className="font-medium text-stone-900">{user.address || '—'}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    <h2 className="text-2xl font-serif font-bold text-green-950 flex items-center gap-2">
                        <ShoppingBag className="w-6 h-6" />
                        Order History
                    </h2>

                    {loading ? (
                        <div className="flex justify-center p-12">
                            <Loader2 className="w-8 h-8 animate-spin text-green-700" />
                        </div>
                    ) : orders.length === 0 ? (
                        <div className="bg-white p-12 rounded-2xl shadow-sm text-center border border-dashed border-stone-200">
                            <Package className="w-12 h-12 text-stone-300 mx-auto mb-4" />
                            <p className="text-stone-500 text-lg">You haven't placed any orders yet.</p>
                            <button
                                onClick={() => router.push('/')}
                                className="mt-6 text-green-700 font-bold hover:underline flex items-center justify-center gap-1"
                            >
                                Start Shopping <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    ) : (
                        <div className="grid gap-6">
                            {orders.map((order) => (
                                <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden hover:shadow-md transition-shadow">
                                    <div className="p-6 border-b border-stone-50 flex flex-wrap justify-between items-center gap-4">
                                        <div>
                                            <p className="text-xs text-stone-500 uppercase tracking-wider font-bold">Order ID</p>
                                            <p className="font-mono text-sm text-stone-900">#{order.id.slice(-8)}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-stone-500 uppercase tracking-wider font-bold">Date</p>
                                            <p className="text-sm text-stone-900">{new Date(order.createdAt).toLocaleDateString()}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-stone-500 uppercase tracking-wider font-bold">Total</p>
                                            <p className="font-bold text-green-800">₹{Number(order.totalAmount).toFixed(2)}</p>
                                        </div>
                                        <div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold
                                                ${order.status === 'DELIVERED' ? 'bg-green-100 text-green-700' :
                                                    order.status === 'CANCELLED' ? 'bg-red-100 text-red-700' :
                                                        'bg-orange-100 text-orange-700'
                                                }`}>
                                                {order.status}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-6 bg-stone-50/50">
                                        <div className="space-y-4">
                                            {order.items.map((item) => (
                                                <div key={item.id} className="flex items-center gap-4">
                                                    <div className="w-16 h-16 bg-white rounded-lg border border-stone-100 relative overflow-hidden flex-shrink-0">
                                                        {item.product.images?.[0] && (
                                                            <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                                                        )}
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="font-medium text-stone-900">{item.product.name}</p>
                                                        <p className="text-sm text-stone-500">Qty: {item.qty} × ₹{item.price}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
