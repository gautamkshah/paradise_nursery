'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useAnimationFrame } from 'framer-motion';

// --- SVG Leaf Components (Memoized for performance) ---

const MonsteraLeaf = React.memo(({ color = "#15803d", className = "" }: { color?: string, className?: string }) => (
    <svg viewBox="0 0 100 100" className={className} fill={color}>
        <path d="M50 95 C 45 80, 20 60, 25 30 C 30 10, 60 5, 80 25 C 90 35, 95 60, 60 90 L 50 95 Z M 35 40 Q 40 45 30 50 M 70 35 Q 65 40 75 45" />
        <circle cx="35" cy="40" r="3" fill="rgba(255,255,255,0.2)" />
        <circle cx="70" cy="35" r="3" fill="rgba(255,255,255,0.2)" />
    </svg>
));

const FernLeaf = React.memo(({ color = "#166534", className = "" }: { color?: string, className?: string }) => (
    <svg viewBox="0 0 100 200" className={className} fill={color}>
        <path d="M50 200 Q 50 100 30 0 Q 70 0 50 200 Z" />
        <path d="M50 180 Q 20 160 30 140 L 50 160" />
        <path d="M50 180 Q 80 160 70 140 L 50 160" />
        <path d="M50 140 Q 10 120 20 100 L 50 120" />
        <path d="M50 140 Q 90 120 80 100 L 50 120" />
        <path d="M50 100 Q 10 80 20 60 L 50 80" />
        <path d="M50 100 Q 90 80 80 60 L 50 80" />
    </svg>
));

const SimpleLeaf = React.memo(({ color = "#22c55e", className = "" }: { color?: string, className?: string }) => (
    <svg viewBox="0 0 100 100" className={className} fill={color}>
        <path d="M50 90 Q 10 50 50 10 Q 90 50 50 90 Z" />
        <line x1="50" y1="90" x2="50" y2="20" stroke="rgba(0,0,0,0.1)" strokeWidth="2" />
    </svg>
));

// --- Interactive Leaf Component ---
interface InteractiveLeafProps {
    children: React.ReactNode;
    baseRotation?: number;
    swayAmount?: number;
    period?: number;
    delay?: number;
    className?: string;
    timeValue: any; // MotionValue<number>
}

const InteractiveLeaf = ({
    children,
    baseRotation = 0,
    swayAmount = 5,
    period = 2000,
    delay = 0,
    className = "",
    timeValue
}: InteractiveLeafProps) => {
    // Oscillate rotation based on the global accelerated time
    const rotate = useTransform(timeValue, (t: number) => {
        return baseRotation + Math.sin((t + delay) / period) * swayAmount;
    });

    return (
        <motion.div
            style={{ rotate, willChange: "transform" }}
            className={`absolute ${className}`}
        >
            {children}
        </motion.div>
    );
};

const GreeneryBackground = () => {
    const time = useMotionValue(0);
    const speed = useSpring(1, { stiffness: 50, damping: 20 });
    const mousePos = useRef({ x: 0, y: 0 });
    const lastMousePos = useRef({ x: 0, y: 0 });

    // Track mouse movement to increase speed ("Wind")
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []); // Empty dependency array as mousePos is a ref

    // Drive the time variable and dynamic speed
    useAnimationFrame((t, delta) => {
        // Calculate mouse velocity within the animation frame
        const dx = mousePos.current.x - lastMousePos.current.x;
        const dy = mousePos.current.y - lastMousePos.current.y;
        const currentFrameVelocity = Math.sqrt(dx * dx + dy * dy);

        // Update speed spring based on mouse velocity
        if (currentFrameVelocity > 0.1) { // Small threshold to avoid noise
            speed.set(Math.min(currentFrameVelocity / 5, 15)); // Max speed 15x
        } else {
            // Decay speed back to 1 if no significant movement
            speed.set(1);
        }

        lastMousePos.current = { x: mousePos.current.x, y: mousePos.current.y };

        // Increment time by delta * current speed
        const currentSpeed = speed.get();
        time.set(time.get() + delta * currentSpeed);
    });

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {/* --- BACKGROUND LAYER --- */}
            <InteractiveLeaf timeValue={time} period={3000} swayAmount={3} baseRotation={45} className="-left-20 top-20 opacity-40 blur-[1px]">
                <MonsteraLeaf color="#064e3b" className="w-[400px] h-[400px]" />
            </InteractiveLeaf>

            <InteractiveLeaf timeValue={time} period={4000} swayAmount={-4} baseRotation={-12} delay={1000} className="absolute -right-20 top-40 opacity-40 blur-[1px]">
                <FernLeaf color="#064e3b" className="w-[300px] h-[600px]" />
            </InteractiveLeaf>

            {/* --- MIDGROUND LAYER --- */}

            {/* Top Hanging */}
            <InteractiveLeaf timeValue={time} period={2500} swayAmount={8} baseRotation={160} className="-top-10 -left-10 origin-top-left">
                <FernLeaf color="#15803d" className="w-[200px] h-[400px]" />
            </InteractiveLeaf>

            <InteractiveLeaf timeValue={time} period={2800} swayAmount={-8} baseRotation={200} delay={500} className="-top-20 -right-20 origin-top-right">
                <MonsteraLeaf color="#166534" className="w-[300px] h-[300px]" />
            </InteractiveLeaf>

            {/* Bottom Bushes */}
            <InteractiveLeaf timeValue={time} period={3200} swayAmount={5} baseRotation={-12} className="-bottom-20 -left-10 origin-bottom-left">
                <MonsteraLeaf color="#15803d" className="w-[400px] h-[400px]" />
            </InteractiveLeaf>

            <InteractiveLeaf timeValue={time} period={2200} swayAmount={10} baseRotation={-45} delay={200} className="bottom-0 left-20 origin-bottom-left">
                <SimpleLeaf color="#22c55e" className="w-[200px] h-[200px]" />
            </InteractiveLeaf>

            <InteractiveLeaf timeValue={time} period={3500} swayAmount={-6} baseRotation={12} className="-bottom-40 -right-20 origin-bottom-right">
                <FernLeaf color="#166534" className="w-[500px] h-[700px]" />
            </InteractiveLeaf>

            <InteractiveLeaf timeValue={time} period={2000} swayAmount={15} baseRotation={45} delay={800} className="bottom-10 right-40 origin-bottom-right opacity-80">
                <SimpleLeaf color="#4ade80" className="w-[150px] h-[150px]" />
            </InteractiveLeaf>

            {/* --- FOREGROUND LAYER (Reduced blur for performance) --- */}
            <InteractiveLeaf timeValue={time} period={5000} swayAmount={20} baseRotation={90} className="bottom-0 left-1/2 opacity-60">
                <SimpleLeaf color="#14532d" className="w-[200px] h-[200px]" />
            </InteractiveLeaf>

        </div>
    );
};

export default GreeneryBackground;
