'use client';

import React from 'react';
import { motion } from 'framer-motion';

const BambooNode = ({ delay = 0, x = 0, scale = 1 }: { delay?: number, x?: number, scale?: number }) => (
    <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 2.5, delay, ease: "easeOut" }}
        className="absolute bottom-0 w-8 bg-gradient-to-r from-emerald-800 to-emerald-600 opacity-20 rounded-t-full origin-bottom will-change-transform"
        style={{ left: `${x}%`, transform: `scaleX(${scale})` }} // scaleX handled via style to avoid conflict, scaleY via motion
    >
        {/* Bamboo segments */}
        {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="absolute w-full h-1 bg-emerald-900/30" style={{ bottom: `${i * 20}%` }}></div>
        ))}
    </motion.div>
);

const BambooBackground = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Layered Bamboo looking creates depth */}
            <BambooNode x={10} scale={0.8} delay={0.2} />
            <BambooNode x={20} scale={1.2} delay={0.5} />
            <BambooNode x={80} scale={0.9} delay={0.3} />
            <BambooNode x={90} scale={1.1} delay={0.6} />
            <BambooNode x={5} scale={0.6} delay={0.1} />
            <BambooNode x={95} scale={0.7} delay={0.4} />
        </div>
    );
};

export default BambooBackground;
