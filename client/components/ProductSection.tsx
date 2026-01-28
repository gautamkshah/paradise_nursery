'use client';

import React, { useEffect, useState } from 'react';
import api from '../lib/api';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Search, Filter } from 'lucide-react';
import Image from 'next/image';
import { useCartStore } from '../store/cartStore';

interface Category {
    id: string;
    name: string;
    slug: string;
    image?: string;
    description?: string;
}

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    images: string[];
    category?: Category;
    tags: string[];
}

const ProductSection = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<Category | 'all' | null>(null); // Changed to object or null for initial view
    const [viewMode, setViewMode] = useState<'categories' | 'products'>('categories');

    // Cart Store
    const { addItem } = useCartStore();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productsRes, categoriesRes] = await Promise.all([
                    api.get('/products'),
                    api.get('/categories')
                ]);
                setProducts(productsRes.data);
                setFilteredProducts(productsRes.data);
                setCategories(categoriesRes.data);
            } catch (err) {
                console.error("Failed to fetch data", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        let result = products;

        if (selectedCategory && selectedCategory !== 'all') {
            result = result.filter(p => p.category?.id === selectedCategory.id);
        }

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(p =>
                p.name.toLowerCase().includes(query) ||
                p.description.toLowerCase().includes(query)
            );
        }

        setFilteredProducts(result);
    }, [searchQuery, selectedCategory, products]);

    const handleCategorySelect = (category: Category | 'all') => {
        setSelectedCategory(category);
        setViewMode('products');
        // Optional: Scroll to products
    };

    const handleBackToCategories = () => {
        setSelectedCategory(null);
        setViewMode('categories');
        setSearchQuery('');
    };

    if (loading) return <div className="py-20 text-center text-green-800">Cultivating collection...</div>;

    return (
        <section id="products" className="py-24 px-4 md:px-12 bg-white relative z-10">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-serif text-green-950 mb-4">
                            {viewMode === 'categories' ? 'Curated Collections' : (selectedCategory === 'all' ? 'All Plants' : selectedCategory?.name)}
                        </h2>
                        <div className="w-20 h-1 bg-green-200 rounded-full"></div>
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto">
                        {viewMode === 'products' && (
                            <button
                                onClick={handleBackToCategories}
                                className="text-sm font-bold text-stone-500 hover:text-green-800 transition-colors uppercase tracking-wider"
                            >
                                ← Back to Categories
                            </button>
                        )}
                        {/* Search Bar (only show in product view or if we want global search) */}
                        <div className="relative group flex-1 md:w-80">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-700 group-focus-within:text-green-900 transition-colors" />
                            <input
                                type="text"
                                placeholder="Search plants..."
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    if (viewMode === 'categories' && e.target.value) {
                                        setViewMode('products'); // Auto-switch to products on search
                                        setSelectedCategory('all');
                                    }
                                }}
                                className="pl-10 pr-4 py-3 bg-stone-50 border border-transparent focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-100 rounded-full w-full outline-none transition-all"
                            />
                        </div>
                    </div>
                </div>

                {/* VIEW: CATEGORIES */}
                {viewMode === 'categories' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* All Plants Card */}
                        <button
                            onClick={() => handleCategorySelect('all')}
                            className="group relative h-64 rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 text-left"
                        >
                            <div className="absolute inset-0 bg-green-900/10 group-hover:bg-green-900/20 transition-colors z-10"></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-20"></div>
                            {/* Abstract Pattern/Image for All */}
                            <div className="absolute inset-0 bg-stone-200">
                                <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1459156212016-c812468e2115?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center group-hover:scale-105 transition-transform duration-700"></div>
                            </div>

                            <div className="absolute bottom-0 left-0 p-8 z-30 w-full">
                                <h3 className="text-3xl font-serif text-white mb-2 group-hover:translate-x-2 transition-transform">All Plants</h3>
                                <p className="text-green-100 text-sm line-clamp-2 opacity-90">Explore our complete collection of exotic flora.</p>
                            </div>
                        </button>

                        {/* Valid Categories */}
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => handleCategorySelect(cat)}
                                className="group relative h-64 rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 text-left"
                            >
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors z-10"></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-20"></div>

                                <div className="absolute inset-0 bg-stone-100">
                                    {cat.image ? (
                                        <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-6xl">🌿</div>
                                    )}
                                </div>

                                <div className="absolute bottom-0 left-0 p-8 z-30 w-full">
                                    <h3 className="text-3xl font-serif text-white mb-2 group-hover:translate-x-2 transition-transform">{cat.name}</h3>
                                    <p className="text-green-100 text-sm line-clamp-2 opacity-90">{cat.description || 'Discover our curated selection.'}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                )}

                {/* VIEW: PRODUCTS */}
                {viewMode === 'products' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                        <AnimatePresence mode='popLayout'>
                            {filteredProducts.map((product) => (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                    key={product.id}
                                    className="group relative"
                                >
                                    {/* Card Container */}
                                    <div className="bg-white rounded-[2rem] p-4 shadow-xl border border-green-50 transition-all duration-300 hover:shadow-2xl hover:border-green-200 h-full flex flex-col z-0 hover:z-20 relative">

                                        {/* Image Container */}
                                        <div className="relative w-full h-64 bg-[#f4f7f4] rounded-[1.5rem] mb-6 flex items-center justify-center">
                                            {/* Background Blob decoration */}
                                            <div className="absolute w-40 h-40 bg-green-200/50 rounded-full blur-2xl group-hover:bg-green-300/60 transition-colors duration-500"></div>

                                            {/* Pop-out Image */}
                                            <div className="relative w-48 h-48 transition-transform duration-500 ease-out group-hover:-translate-y-12 group-hover:scale-125 z-10 drop-shadow-xl group-hover:drop-shadow-2xl">
                                                {product.images?.[0] ? (
                                                    <Image
                                                        src={product.images[0]}
                                                        alt={product.name}
                                                        fill
                                                        className="object-contain"
                                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                    />
                                                ) : (
                                                    <span className="text-6xl flex items-center justify-center h-full">🌿</span>
                                                )}
                                            </div>

                                            {/* Price Tag */}
                                            <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md px-4 py-1.5 rounded-full text-green-900 font-bold shadow-sm z-20">
                                                ${Number(product.price).toFixed(0)}
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="px-2 pb-2 flex flex-col flex-grow text-center">
                                            <span className="text-xs font-bold tracking-wider text-green-600 uppercase mb-2">{product.category?.name || 'Plant'}</span>
                                            <h3 className="text-2xl font-serif text-green-950 mb-3">{product.name}</h3>
                                            <p className="text-stone-500 text-sm leading-relaxed mb-6 line-clamp-2">
                                                {product.description}
                                            </p>

                                            <button
                                                onClick={() => {
                                                    if (!product) return;
                                                    const itemToAdd = {
                                                        id: product.id,
                                                        name: product.name,
                                                        price: Number(product.price),
                                                        image: product.images?.[0],
                                                    };
                                                    addItem(itemToAdd);
                                                }}
                                                className="mt-auto w-full bg-stone-900 text-white py-3.5 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-green-800 transition-colors group-hover:shadow-lg active:scale-95"
                                            >
                                                <ShoppingCart className="w-4 h-4" />
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                        {filteredProducts.length === 0 && (
                            <div className="col-span-full text-center py-20 opacity-50">
                                <p className="text-xl text-green-900">No plants found in this collection.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};

export default ProductSection;
