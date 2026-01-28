'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '../../../../lib/api';
import { ArrowLeft, Loader2, Save } from 'lucide-react';
import Link from 'next/link';
import ImageUpload from '../../../../components/ui/ImageUpload';

interface Category {
    id: string;
    name: string;
}

export default function NewProductPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        categoryId: '',
        imageUrl: '',
        stock: '10' // Keep as string for input, parse on submit
    });

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await api.get('/categories');
            setCategories(res.data);
            if (res.data.length > 0) {
                setFormData(prev => ({ ...prev, categoryId: res.data[0].id }));
            }
        } catch (error) {
            console.error("Failed to load categories");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (!formData.categoryId) {
            alert("Please select a category");
            setLoading(false);
            return;
        }

        try {
            await api.post('/products', {
                ...formData,
                price: parseFloat(formData.price),
                stock: parseInt(formData.stock), // Ensure int
                // Convert single URL to array
                images: formData.imageUrl ? [formData.imageUrl] : [],
                tags: []
            });
            router.push('/admin/products');
        } catch (error) {
            console.error("Failed to create product", error);
            alert("Failed to create product");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="max-w-2xl mx-auto">
            <Link href="/admin/products" className="inline-flex items-center gap-2 text-stone-500 hover:text-green-800 mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Back to Products
            </Link>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100">
                <h1 className="text-2xl font-serif font-bold text-green-950 mb-6">Add New Plant</h1>

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1">Product Name</label>
                        <input
                            required
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none text-stone-900"
                            placeholder="e.g. Monstera Deliciosa"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1">Description</label>
                        <textarea
                            required
                            name="description"
                            rows={4}
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none resize-none text-stone-900"
                            placeholder="Describe the plant..."
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        {/* Price */}
                        <div>
                            <label className="block text-sm font-medium text-stone-700 mb-1">Price ($)</label>
                            <input
                                required
                                type="number"
                                step="0.01"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none text-stone-900"
                                placeholder="0.00"
                            />
                        </div>

                        {/* Stock */}
                        <div>
                            <label className="block text-sm font-medium text-stone-700 mb-1">Stock</label>
                            <input
                                required
                                type="number"
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none text-stone-900"
                            />
                        </div>
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1">Category</label>
                        <select
                            name="categoryId"
                            value={formData.categoryId}
                            onChange={handleChange}
                            className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none text-stone-900"
                        >
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Image URL */}
                    <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1">Product Image</label>
                        <ImageUpload
                            value={formData.imageUrl ? [formData.imageUrl] : []}
                            disabled={loading}
                            onChange={(url) => setFormData(prev => ({ ...prev, imageUrl: url }))}
                            onRemove={() => setFormData(prev => ({ ...prev, imageUrl: '' }))}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-800 text-white py-4 rounded-xl font-bold shadow-lg hover:bg-green-900 transition-all flex items-center justify-center gap-2"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : <><Save className="w-5 h-5" /> Save Product</>}
                    </button>

                </form>
            </div>
        </div>
    );
}
