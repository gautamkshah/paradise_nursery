'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface AnimatedPlantProps {
    direction?: 'left' | 'right';
    text: string;
    delay?: number;
    className?: string; // e.g. w-[500px] h-[500px]
    imageSrc: string; // URL to the realistic image
}

const AnimatedPlant: React.FC<AnimatedPlantProps> = ({
    direction = 'left',
    text,
    delay = 0,
    className = "w-[400px] h-[400px]",
    imageSrc
}) => {
    const isLeft = direction === 'left';

    return (
        <div className={`relative ${className} will-change-transform overflow-hidden`}>
            {/* Mask Reveal Animation */}
            <motion.div
                initial={{ clipPath: "inset(100% 0% 0% 0%)" }} // Fully hidden (masked from bottom)
                animate={{ clipPath: "inset(0% 0% 0% 0%)" }}   // Fully visible
                transition={{ duration: 2.5, delay: delay, ease: "easeOut" }}
                className="w-full h-full relative"
            >
                <Image
                    src={imageSrc}
                    alt={text}
                    fill
                    className="object-contain"
                    priority
                />

                {/* Text Overlay - Absolute positioned on top of the image */}
                {/* Opacity fade in after plant has started growing */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: delay + 1.5 }}
                    className={`absolute text-white font-bold text-xl md:text-2xl drop-shadow-md bg-black/20 px-2 rounded-lg backdrop-blur-sm
                        ${isLeft ? 'top-[20%] left-[30%]' : 'top-[20%] right-[30%]'}
                    `}
                    style={{ transform: isLeft ? 'rotate(-10deg)' : 'rotate(10deg)' }}
                >
                    {text}
                </motion.div>
            </motion.div>
        </div>
    );
};

export default AnimatedPlant;
