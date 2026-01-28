'use client';

import React, { useEffect, useState } from 'react';
import api from '../../../lib/api';
import { Loader2, Plus, Tag } from 'lucide-react';
import ImageUpload from '../../../components/ui/ImageUpload';

interface Category {
    id: string;
    name: string;
    slug: string;
    image?: string;
    description?: string;
    _count?: {
        products: number;
    }
}

export default function AdminCategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null); // For Edit Mode
    const [formData, setFormData] = useState({ name: '', image: '', description: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await api.get('/categories');
            setCategories(res.data);
        } catch (error) {
            console.error("Failed to fetch categories", error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (cat: Category) => {
        setEditingCategory(cat);
        setFormData({
            name: cat.name,
            image: cat.image || '',
            description: cat.description || ''
        });
    };

    const handleCancel = () => {
        setEditingCategory(null);
        setFormData({ name: '', image: '', description: '' });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name.trim()) return;

        setIsSubmitting(true);
        try {
            if (editingCategory) {
                // Update existing
                await api.put(`/categories/${editingCategory.id}`, formData);
            } else {
                // Create new
                await api.post('/categories', formData);
            }
            handleCancel(); // Reset form
            fetchCategories();
        } catch (error) {
            alert(editingCategory ? "Failed to update category" : "Failed to create category");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) return <div className="p-8"><Loader2 className="animate-spin text-green-700" /></div>;

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-serif font-bold text-green-950">Categories</h1>
                <p className="text-stone-500">Manage product categories</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* List Section */}
                <div className="lg:col-span-2 bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
                    <div className="p-6 border-b border-stone-100">
                        <h2 className="font-bold text-gray-900">All Categories</h2>
                    </div>
                    <table className="w-full">
                        <thead className="bg-stone-50 border-b border-stone-100">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-stone-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-stone-500 uppercase tracking-wider">Slug</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100">
                            {categories.map((category) => (
                                <tr key={category.id} className="hover:bg-stone-50/50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-stone-900">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-green-600 overflow-hidden">
                                                {category.image ? (
                                                    <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <Tag className="w-4 h-4" />
                                                )}
                                            </div>
                                            {category.name}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-stone-500 font-mono text-xs">
                                        {category.slug}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => handleEdit(category)}
                                            className="text-stone-400 hover:text-green-600 font-medium text-sm underline transition-colors"
                                        >
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {categories.length === 0 && (
                                <tr>
                                    <td colSpan={2} className="px-6 py-8 text-center text-stone-500">
                                        No categories found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Add Form Section */}
                {/* Form Section */}
                <div className="lg:col-span-1">
                    <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm p-6 sticky top-8">
                        <h2 className="font-bold text-gray-900 mb-4">{editingCategory ? 'Edit Category' : 'Add New Category'}</h2>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <div>
                                <label className="block text-sm font-medium text-stone-700 mb-1">
                                    Category Name
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition-all text-stone-900"
                                    placeholder="e.g. Indoor Plants"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-stone-700 mb-1">
                                    Description (Optional)
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition-all text-stone-900 resize-none"
                                    placeholder="Short description..."
                                    rows={2}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-stone-700 mb-1">
                                    Category Image
                                </label>
                                <ImageUpload
                                    value={formData.image ? [formData.image] : []}
                                    disabled={isSubmitting}
                                    onChange={(url) => setFormData(prev => ({ ...prev, image: url }))}
                                    onRemove={() => setFormData(prev => ({ ...prev, image: '' }))}
                                />
                            </div>
                            <div className="flex gap-2">
                                {editingCategory && (
                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        className="bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold py-2 px-4 rounded-lg transition-colors"
                                    >
                                        Cancel
                                    </button>
                                )}
                                <button
                                    type="submit"
                                    disabled={isSubmitting || !formData.name.trim()}
                                    className="flex-1 bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                                    {editingCategory ? 'Update Changes' : 'Add Category'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
