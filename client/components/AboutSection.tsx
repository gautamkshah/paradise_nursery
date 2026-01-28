'use client';

import React from 'react';
import { motion } from 'framer-motion';

const AboutSection = () => {
    return (
        <section className="py-24 px-4 md:px-12 bg-[#f0f9f0] relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-200 rounded-full blur-[100px] opacity-30"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-200 rounded-full blur-[120px] opacity-30"></div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-12 h-[1px] bg-green-600"></div>
                        <span className="text-green-700 font-medium uppercase tracking-widest text-sm">Our Philosophy</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-serif text-green-950 mb-6 leading-tight">
                        Cultivating joy, <br />
                        <span className="italic text-green-700">one leaf at a time.</span>
                    </h2>
                    <p className="text-green-800 text-lg leading-relaxed mb-6">
                        At Paradise Nursery, we believe that plants are more than just decor—they are living companions that transform spaces into sanctuaries.
                    </p>
                    <p className="text-stone-600 leading-relaxed mb-8">
                        Our journey began with a simple monstera taking over a living room. Today, we meticulously cure soil blends, acclimatize every plant, and offer expert guidance to ensure your home jungle thrives. Whether you're a seasoned botanist or a budding plant parent, we're here to help you grow.
                    </p>

                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <h4 className="text-3xl font-bold text-green-900 mb-1">5k+</h4>
                            <p className="text-stone-500 text-sm">Happy Plant Parents</p>
                        </div>
                        <div>
                            <h4 className="text-3xl font-bold text-green-900 mb-1">100%</h4>
                            <p className="text-stone-500 text-sm">Healthy Guarantee</p>
                        </div>
                    </div>
                </motion.div>

                {/* Image Content - Using CSS Shapes/Placeholders since we lack assets */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative h-[500px] bg-stone-200 rounded-3xl overflow-hidden shadow-2xl"
                >
                    {/* Abstract composition representing an image */}
                    <div className="absolute inset-0 bg-gradient-to-br from-green-800 to-emerald-950"></div>
                    <div className="absolute bottom-0 right-0 w-full h-full bg-[url('/plant-right.svg')] opacity-20 bg-no-repeat bg-right-bottom bg-contain"></div>

                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white/20">
                        <span className="text-6xl">🌱</span>
                        <div className="relative w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl group">
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                            <img
                                src="https://images.unsplash.com/photo-1545241047-6083a3684587?q=80&w=1200&auto=format&fit=crop"
                                alt="Lush Green Paradise"
                                className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                            />
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default AboutSection;
