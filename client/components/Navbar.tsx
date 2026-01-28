'use client';

import React, { useState, useEffect } from 'react';
import { ShoppingCart, Leaf, Menu } from 'lucide-react'; // Assuming valid icons
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useCartStore } from '../store/cartStore';
import Link from 'next/link';
import { useAuthStore } from '../store/authStore';
import { User } from 'lucide-react';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const { scrollY } = useScroll();
    const { totalItems, toggleCart } = useCartStore();
    const { user, logout } = useAuthStore();
    const [menuOpen, setMenuOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-12 py-4
                ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'}
            `}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 cursor-pointer">
                    <div className="w-10 h-10 bg-green-600 rounded-tr-[15px] rounded-bl-[15px] flex items-center justify-center shadow-lg">
                        <Leaf className="w-5 h-5 text-white" fill="currentColor" />
                    </div>
                    <span className={`text-2xl font-serif font-bold tracking-tight transition-colors ${isScrolled ? 'text-green-950' : 'text-green-900'}`}>
                        Paradise
                    </span>
                </Link>

                {/* Actions */}
                <div className="flex items-center gap-4 md:gap-6">
                    <button
                        onClick={toggleCart}
                        className="relative p-2.5 rounded-full hover:bg-black/5 transition-colors group"
                    >
                        <ShoppingCart className={`w-6 h-6 transition-colors ${isScrolled ? 'text-green-900' : 'text-green-800'}`} />

                        {/* Cart Badge */}
                        {mounted && totalItems() > 0 && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                key={totalItems()} // Animate on change
                                className="absolute top-0 right-0 w-5 h-5 bg-orange-500 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white shadow-sm"
                            >
                                {totalItems()}
                            </motion.div>
                        )}
                    </button>

                    {/* Desktop User Menu */}
                    <div className="hidden md:block">
                        {user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setMenuOpen(!menuOpen)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all border ${isScrolled ? 'bg-green-50 border-green-200 text-green-900' : 'bg-white/50 backdrop-blur border-white/40 text-green-900'}`}
                                >
                                    <User className="w-4 h-4" />
                                    <span className="font-medium text-sm">{user.name.split(' ')[0]}</span>
                                </button>

                                {/* Dropdown Menu */}
                                {menuOpen && (
                                    <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-stone-100 py-2 flex flex-col items-start z-50">
                                        <div className="px-4 py-2 text-xs text-stone-500 font-bold uppercase tracking-wider">Account</div>
                                        {user.role === 'ADMIN' && (
                                            <Link href="/admin" className="w-full px-4 py-2 text-left hover:bg-green-50 text-green-800 text-sm">Admin Dashboard</Link>
                                        )}
                                        <Link href="/profile" className="w-full px-4 py-2 text-left hover:bg-green-50 text-green-800 text-sm">My Profile</Link>
                                        <button onClick={() => { logout(); setMenuOpen(false); }} className="w-full px-4 py-2 text-left hover:bg-red-50 text-red-600 text-sm">Sign Out</button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link href="/login">
                                <button className={`px-6 py-2 rounded-full font-medium transition-all ${isScrolled ? 'bg-green-800 text-white hover:bg-green-900' : 'bg-white/50 backdrop-blur text-green-900 hover:bg-white'}`}>
                                    Sign In
                                </button>
                            </Link>
                        )}
                    </div>

                    {/* Mobile Hamburger */}
                    <div className="md:hidden">
                        <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 text-green-900">
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {menuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-stone-100 shadow-xl p-4 flex flex-col gap-2">
                    {user ? (
                        <>
                            <div className="px-4 py-2 text-sm font-bold text-green-900 border-b border-stone-100 mb-2">
                                Hi, {user.name}
                            </div>
                            {user.role === 'ADMIN' && (
                                <Link href="/admin" onClick={() => setMenuOpen(false)} className="px-4 py-3 bg-green-50 rounded-xl text-green-800 font-medium">
                                    Admin Dashboard
                                </Link>
                            )}
                            <Link href="/profile" onClick={() => setMenuOpen(false)} className="px-4 py-3 bg-stone-50 rounded-xl text-stone-700 font-medium">
                                My Profile
                            </Link>
                            <button
                                onClick={() => { logout(); setMenuOpen(false); }}
                                className="px-4 py-3 text-red-600 font-medium text-left"
                            >
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <Link href="/login" onClick={() => setMenuOpen(false)}>
                            <button className="w-full py-3 bg-green-800 text-white rounded-xl font-bold">
                                Sign In
                            </button>
                        </Link>
                    )}
                </div>
            )}
        </motion.nav>
    );
};

export default Navbar;
