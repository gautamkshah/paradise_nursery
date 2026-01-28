'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '../../store/authStore';
import { LayoutDashboard, ShoppingBag, Package, LogOut, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, isAdmin, logout } = useAuthStore();
    const router = useRouter();
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (!isAdmin()) {
            router.push('/login');
        }
    }, [isAdmin, router]);

    if (!mounted || !user) return null;

    const navItems = [
        { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
        { name: 'Products', href: '/admin/products', icon: Package },
        { name: 'Categories', href: '/admin/categories', icon: Package },
        { name: 'Orders', href: '/admin/orders', icon: ShoppingBag },
    ];

    return (
        <div className="min-h-screen bg-stone-50 flex">

            {/* Mobile Toggle */}
            <button
                onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
                className="md:hidden fixed top-4 left-4 z-50 p-2 bg-green-950 text-white rounded-lg shadow-lg"
            >
                <Leaf className="w-6 h-6" />
            </button>

            {/* Sidebar Overlay */}
            {mobileSidebarOpen && (
                <div
                    onClick={() => setMobileSidebarOpen(false)}
                    className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm"
                />
            )}

            {/* Sidebar */}
            <aside
                className={`w-64 bg-green-950 text-white flex flex-col fixed inset-y-0 left-0 z-40 transition-transform duration-300 ease-in-out shadow-2xl
                    ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
                `}
            >
                <div className="p-8 flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center shadow-lg">
                        <Leaf className="w-6 h-6 text-white bg-transparent" />
                    </div>
                    <div>
                        <h1 className="text-xl font-serif font-bold">Paradise</h1>
                        <p className="text-xs text-green-400">Admin Panel</p>
                    </div>
                </div>

                <nav className="flex-1 px-4 space-y-2 mt-4">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link key={item.name} href={item.href} onClick={() => setMobileSidebarOpen(false)}>
                                <div className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-green-800 text-white font-medium shadow-md' : 'text-green-200 hover:bg-green-900 hover:text-white'}`}>
                                    <item.icon className="w-5 h-5" />
                                    <span>{item.name}</span>
                                </div>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-green-900">
                    <div className="flex items-center gap-3 px-4 py-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-green-800 flex items-center justify-center text-xs font-bold ring-2 ring-green-700">
                            {user.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{user.name}</p>
                            <p className="text-xs text-green-400 truncate">{user.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => router.push('/')}
                        className="w-full flex items-center gap-3 px-4 py-2 text-green-200 hover:bg-green-900/50 hover:text-white rounded-lg transition-colors text-sm mb-1"
                    >
                        <ShoppingBag className="w-4 h-4 ml-1" />
                        Back to Store
                    </button>
                    <button
                        onClick={() => { logout(); router.push('/'); }}
                        className="w-full flex items-center gap-3 px-4 py-2 text-red-300 hover:bg-red-900/30 hover:text-red-200 rounded-lg transition-colors text-sm"
                    >
                        <LogOut className="w-4 h-4 ml-1" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-4 md:p-8 pt-20 md:pt-8 overflow-y-auto h-screen scrollbar-thin scrollbar-thumb-stone-300">
                {children}
            </main>
        </div>
    );
}
