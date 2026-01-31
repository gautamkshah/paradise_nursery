'use client';

import React from 'react';
import { Leaf, MapPin, Phone, User, Instagram, Facebook, Twitter } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-green-950 text-green-100 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

                {/* Brand */}
                <div>
                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-10 h-10 bg-green-500 rounded-tr-[15px] rounded-bl-[15px] flex items-center justify-center shadow-lg">
                            <Leaf className="w-6 h-6 text-white" fill="currentColor" />
                        </div>
                        <span className="text-2xl font-serif font-bold tracking-tight text-white">
                            Paradise
                        </span>
                    </div>
                    <p className="text-green-300 leading-relaxed max-w-sm">
                        Bringing nature closer to you. Explore our curated collection of exotic plants and create your own green sanctuary.
                    </p>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="text-lg font-bold text-white mb-6 font-serif">Contact Us</h3>
                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <User className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                            <div>
                                <p className="text-xs text-green-400 uppercase font-bold tracking-wider mb-1">Owner</p>
                                <p className="font-medium text-white">Kartik Kumar</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Phone className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                            <div>
                                <p className="text-xs text-green-400 uppercase font-bold tracking-wider mb-1">Phone</p>
                                <a href="tel:9284372889" className="font-medium text-white hover:text-green-400 transition-colors block">9284372889</a>
                                <a href="tel:7822803944" className="font-medium text-white hover:text-green-400 transition-colors block">7822803944</a>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                            <div>
                                <p className="text-xs text-green-400 uppercase font-bold tracking-wider mb-1">Visit Us</p>
                                <a
                                    href="https://www.google.com/maps/place/18%C2%B035'18.5%22N+73%C2%B046'44.9%22E"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-medium text-white hover:text-green-400 transition-colors block leading-snug"
                                >
                                    View on Google Maps
                                    <span className="block text-sm text-green-300 mt-1">Hinjavaadi, Pune, Maharashtra</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Links */}
                <div>
                    <h3 className="text-lg font-bold text-white mb-6 font-serif">Quick Links</h3>
                    <ul className="space-y-3">
                        <li><Link href="/" className="text-green-300 hover:text-white transition-colors">Home</Link></li>
                        <li><Link href="/profile" className="text-green-300 hover:text-white transition-colors">My Profile</Link></li>
                        <li><Link href="/login" className="text-green-300 hover:text-white transition-colors">Sign In</Link></li>
                    </ul>
                    <div className="mt-8 pt-8 border-t border-green-900 flex gap-4">
                        <a href="#" className="p-2 bg-green-900 rounded-full hover:bg-green-800 transition-colors text-white"><Instagram className="w-5 h-5" /></a>
                        <a href="#" className="p-2 bg-green-900 rounded-full hover:bg-green-800 transition-colors text-white"><Facebook className="w-5 h-5" /></a>
                        <a href="#" className="p-2 bg-green-900 rounded-full hover:bg-green-800 transition-colors text-white"><Twitter className="w-5 h-5" /></a>
                    </div>
                </div>
            </div>

            <div className="border-t border-green-900 py-8 text-center text-green-400 text-sm">
                <p>&copy; {new Date().getFullYear()} Paradise Nursery. All rights reserved.</p>
                <p className="mt-2 text-green-500">Made with love by Gautam Kumar, contact number 9450645829</p>
            </div>
        </footer>
    );
};

export default Footer;
