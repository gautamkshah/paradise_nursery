'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '../../../lib/api';
import { Plus, Pencil, Trash2, Search, Loader2 } from 'lucide-react';
import Image from 'next/image';

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    images: string[];
    category?: { name: string };
    stock: number;
}

export default function AdminProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await api.get('/products');
            setProducts(response.data);
        } catch (error) {
            console.error("Failed to fetch products", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this product?')) return;

        try {
            await api.delete(`/products/${id}`);
            setProducts(products.filter(p => p.id !== id));
        } catch (error) {
            alert('Failed to delete product');
        }
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className="p-8"><Loader2 className="animate-spin text-green-700" /></div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-green-950">Products</h1>
                    <p className="text-stone-500">Manage your plant catalog</p>
                </div>
                <Link href="/admin/products/new">
                    <button className="bg-green-800 hover:bg-green-900 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 shadow-sm transition-all">
                        <Plus className="w-5 h-5" />
                        Add Product
                    </button>
                </Link>
            </div>

            {/* Search */}
            <div className="mb-6 relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-stone-200 rounded-xl outline-none focus:ring-2 focus:ring-green-500"
                />
            </div>

            {/* Table */}
            <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full">
                    <thead className="bg-stone-50 border-b border-stone-100">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-bold text-stone-500 uppercase tracking-wider">Product</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-stone-500 uppercase tracking-wider">Category</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-stone-500 uppercase tracking-wider">Price</th>
                            <th className="px-6 py-4 text-right text-xs font-bold text-stone-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                        {filteredProducts.map((product) => (
                            <tr key={product.id} className="hover:bg-stone-50/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-stone-100 rounded-lg relative overflow-hidden flex-shrink-0">
                                            {product.images?.[0] && (
                                                <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                                            )}
                                        </div>
                                        <div>
                                            <div className="font-semibold text-stone-900">{product.name}</div>
                                            <div className="text-xs text-stone-400 truncate max-w-[200px]">{product.description}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="bg-stone-100 text-stone-600 text-xs px-2 py-1 rounded-full font-medium">
                                        {product.category?.name || 'Uncategorized'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-stone-900 font-medium">
                                    ${product.price}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                            <Pencil className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product.id)}
                                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filteredProducts.length === 0 && (
                    <div className="p-12 text-center text-stone-500">
                        No products found.
                    </div>
                )}
            </div>
        </div>
    );
}
