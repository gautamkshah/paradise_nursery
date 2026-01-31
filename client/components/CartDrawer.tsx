'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ArrowRight, CheckCircle, ArrowLeft } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useCartStore } from '../store/cartStore';
import Image from 'next/image';
import api from '../lib/api';

const CartDrawer = () => {
    const { isOpen, closeCart, items, removeItem, updateQuantity, totalPrice, clearCart } = useCartStore();
    const { user } = useAuthStore();
    const [view, setView] = useState<'cart' | 'checkout' | 'success'>('cart');
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        customerName: '',
        phone: '',
        whatsapp: '',
        address: '',
        city: '',
        pincode: ''
    });

    // Pre-fill form when user is available
    // Pre-fill form when user is available, but ONLY if we haven't started typing yet (rough check)
    // Or simpler: just on mount/user change, fill gaps
    React.useEffect(() => {
        if (user) {
            setFormData(prev => ({
                customerName: prev.customerName || user.name || '',
                phone: prev.phone || user.phone || '',
                whatsapp: prev.whatsapp || '',
                address: prev.address || user.address || '',
                city: prev.city || user.city || '',
                pincode: prev.pincode || user.pincode || ''
            }));
        }
    }, [user]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckout = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const orderPayload = {
                ...formData,
                items: items.map(item => ({
                    productId: item.id,
                    qty: item.quantity,
                    price: item.price
                })),
                totalAmount: totalPrice(),
                paymentMode: 'COD', // Defaulting to COD for guest checkout
                userId: user?.id || null,
            };

            await api.post('/orders', orderPayload);

            clearCart();
            setView('success');
        } catch (error) {
            console.error("Order failed", error);
            alert("Failed to place order. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const resetCart = () => {
        setView('cart');
        closeCart();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeCart}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
                    />

                    {/* Drawer Panel */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full md:w-[500px] bg-white shadow-2xl z-[70] flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-stone-100 flex items-center justify-between bg-white/50 backdrop-blur">
                            <div className="flex items-center gap-2">
                                {view === 'checkout' && (
                                    <button onClick={() => setView('cart')} className="mr-2 p-1 hover:bg-stone-100 rounded-full">
                                        <ArrowLeft className="w-5 h-5 text-stone-600" />
                                    </button>
                                )}
                                <h2 className="text-2xl font-serif font-bold text-green-950">
                                    {view === 'cart' && 'Your Jungle'}
                                    {view === 'checkout' && 'Checkout'}
                                    {view === 'success' && 'Order Confirmed'}
                                </h2>
                            </div>
                            <button onClick={closeCart} className="p-2 hover:bg-stone-100 rounded-full transition-colors">
                                <X className="w-6 h-6 text-stone-500" />
                            </button>
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 overflow-y-auto p-6">

                            {/* VIEW: CART */}
                            {view === 'cart' && (
                                <>
                                    <div className="space-y-6">
                                        {items.length === 0 ? (
                                            <div className="h-[60vh] flex flex-col items-center justify-center text-center opacity-50 space-y-4">
                                                <span className="text-6xl">🪴</span>
                                                <p className="text-lg font-medium text-stone-600">Your cart is empty.</p>
                                                <button onClick={closeCart} className="text-green-700 font-bold hover:underline">
                                                    Start browsing plants
                                                </button>
                                            </div>
                                        ) : (
                                            items.map((item) => (
                                                <motion.div
                                                    layout
                                                    key={item.id}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="flex gap-4"
                                                >
                                                    <div className="w-24 h-24 bg-stone-100 rounded-xl relative overflow-hidden flex-shrink-0 border border-stone-200">
                                                        {item.image ? (
                                                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center text-2xl">🌱</div>
                                                        )}
                                                    </div>

                                                    <div className="flex-1 flex flex-col justify-between">
                                                        <div>
                                                            <h4 className="font-bold text-green-900 text-lg leading-tight">{item.name}</h4>
                                                            <p className="text-stone-500 text-sm mt-1">₹{item.price.toFixed(2)}</p>
                                                        </div>

                                                        <div className="flex items-center justify-between mt-2">
                                                            <div className="flex items-center gap-3 bg-stone-100 rounded-full px-3 py-1">
                                                                <button
                                                                    onClick={() => item.quantity > 1 ? updateQuantity(item.id, item.quantity - 1) : removeItem(item.id)}
                                                                    className="w-6 h-6 flex items-center justify-center text-green-800 hover:bg-white rounded-full transition-colors text-xs"
                                                                >
                                                                    <Minus className="w-3 h-3" />
                                                                </button>
                                                                <span className="font-semibold text-sm w-4 text-center text-stone-900">{item.quantity}</span>
                                                                <button
                                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                                    className="w-6 h-6 flex items-center justify-center text-green-800 hover:bg-white rounded-full transition-colors text-xs"
                                                                >
                                                                    <Plus className="w-3 h-3" />
                                                                </button>
                                                            </div>

                                                            <button
                                                                onClick={() => removeItem(item.id, true)}
                                                                className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-full transition-colors"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))
                                        )}
                                    </div>
                                </>
                            )}

                            {/* VIEW: CHECKOUT FORM */}
                            {view === 'checkout' && (
                                <form
                                    id="checkout-form"
                                    onSubmit={handleCheckout}
                                    className="space-y-4"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                        }
                                    }}
                                >
                                    <div className="bg-green-50 p-4 rounded-xl mb-6">
                                        <h3 className="font-bold text-green-900 mb-2">Order Summary</h3>
                                        <p className="text-sm text-green-700">{items.length} items • <span className="font-bold">₹{totalPrice().toFixed(2)}</span></p>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-stone-700 mb-1">Full Name</label>
                                            <input required name="customerName" value={formData.customerName} onChange={handleInputChange} className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none text-stone-900" placeholder="e.g. John Doe" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-stone-700 mb-1">Phone</label>
                                                <input required name="phone" value={formData.phone} onChange={handleInputChange} className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none text-stone-900" placeholder="Mobile Number" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-stone-700 mb-1">WhatsApp (Optional)</label>
                                                <input name="whatsapp" value={formData.whatsapp} onChange={handleInputChange} className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none text-stone-900" placeholder="If different" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-stone-700 mb-1">Address</label>
                                            <textarea required name="address" value={formData.address} onChange={handleInputChange} rows={3} className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none resize-none text-stone-900" placeholder="Street address, Apt, etc." />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-stone-700 mb-1">City</label>
                                                <input required name="city" value={formData.city} onChange={handleInputChange} className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none text-stone-900" placeholder="City" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-stone-700 mb-1">Pincode</label>
                                                <input required name="pincode" value={formData.pincode} onChange={handleInputChange} className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none text-stone-900" placeholder="ZIP Code" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-6 p-4 border border-green-100 rounded-xl bg-green-50/50">
                                        <p className="text-sm text-green-800 flex items-center gap-2">
                                            <CheckCircle className="w-4 h-4" />
                                            Wait for confirmation call for payment.
                                        </p>
                                    </div>
                                </form>
                            )}

                            {/* VIEW: SUCCESS */}
                            {view === 'success' && (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                        <CheckCircle className="w-10 h-10 text-green-600" />
                                    </div>
                                    <h3 className="text-3xl font-serif font-bold text-green-950">Order Placed!</h3>
                                    <p className="text-stone-600 max-w-xs">
                                        Thank you for choosing Paradise. We have received your order and will contact you shortly to confirm delivery details.
                                    </p>
                                    <button onClick={resetCart} className="bg-green-800 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-green-900 transition-transform hover:scale-105">
                                        Continue Shopping
                                    </button>
                                </div>
                            )}

                        </div>

                        {/* Footer / Actions */}
                        {view !== 'success' && items.length > 0 && (
                            <div className="p-6 border-t border-stone-100 bg-stone-50">
                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-stone-500">
                                        <span>Subtotal</span>
                                        <span>₹{totalPrice().toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-stone-500">
                                        <span>Shipping</span>
                                        <span className="text-green-600 font-medium">Free</span>
                                    </div>
                                    <div className="flex justify-between text-xl font-bold text-green-900 pt-3 border-t border-stone-200">
                                        <span>Total</span>
                                        <span>₹{totalPrice().toFixed(2)}</span>
                                    </div>
                                </div>

                                {view === 'cart' ? (
                                    <button
                                        type="button"
                                        key="btn-proceed"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            setView('checkout');
                                        }}
                                        className="w-full bg-green-800 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-green-900 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
                                    >
                                        Proceed to Checkout
                                        <ArrowRightIcon className="w-5 h-5" />
                                    </button>
                                ) : (
                                    <button
                                        key="btn-confirm"
                                        form="checkout-form"
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-green-800 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-green-900 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {loading ? 'Placing Order...' : 'Confirm Order'}
                                    </button>
                                )}
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

// Simple icon wrapper
const ArrowRightIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
    </svg>
);

export default CartDrawer;
