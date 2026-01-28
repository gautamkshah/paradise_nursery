"use client";

import { Flower2, Shovel, PenTool, Sprout, PaintBucket, Container } from "lucide-react";
import { motion } from "framer-motion";

const services = [
    {
        title: "Exotic Plants & Flowers",
        description: "Curated collection of rare indoor and outdoor flora to enliven your space.",
        icon: Flower2,
        color: "bg-green-100 text-green-700",
    },
    {
        title: "Premium Pots & Planters",
        description: "Handcrafted pots and modern planters designed to complement any aesthetic.",
        icon: Container, // Approximating generic container/pot
        color: "bg-orange-100 text-orange-700",
    },
    {
        title: "Garden Maintenance",
        description: "Professional care for your green spaces by our expert gardeners.",
        icon: Shovel,
        color: "bg-blue-100 text-blue-700",
    },
    {
        title: "Landscape & Interior Design",
        description: "Expert styling advice on where to place plants for optimal growth and beauty.",
        icon: PenTool,
        color: "bg-purple-100 text-purple-700",
    },
];

export default function ServicesSection() {
    return (
        <section className="py-16 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-4">Our Premium Services</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Beyond just selling plants, we provide a holistic experience to transform your environment.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="p-6 rounded-2xl bg-gray-50 hover:bg-green-50 transition-colors duration-300 group"
                        >
                            <div className={`w-14 h-14 rounded-full ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                <service.icon size={28} />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
