'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import GreeneryBackground from './GreeneryBackground';

const Hero = () => {
  return (
    <section className="relative w-full h-screen bg-gradient-to-b from-[#f0f9f0] to-[#e6f5e6] overflow-hidden flex items-center justify-center">
      {/* Atmospheric Background */}
      <GreeneryBackground />

      <div className="z-10 text-center flex flex-col items-center max-w-4xl px-4">

        {/* Logo / Text Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-20 bg-white/60 backdrop-blur-md p-10 md:p-14 rounded-3xl shadow-2xl border border-white/40"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
            className="w-16 h-16 bg-green-600 rounded-tr-[40px] rounded-bl-[40px] mx-auto mb-6 shadow-lg flex items-center justify-center"
          >
            <div className="w-8 h-8 border-2 border-white rounded-full opacity-50"></div>
          </motion.div>

          <h1 className="text-5xl md:text-8xl font-bold text-green-950 tracking-tight font-serif drop-shadow-sm">
            Paradise <span className="text-green-700">Nursery</span>
          </h1>

          <p className="mt-6 text-lg md:text-2xl text-green-800 font-light tracking-wide">
            Where nature meets luxury.
          </p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="mt-10 flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6"
          >
            <button
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
              className="group bg-green-800 hover:bg-green-900 text-white px-10 py-4 rounded-full flex items-center shadow-xl transition-all hover:scale-105 cursor-pointer text-lg font-medium"
            >
              Browse Collection
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="ml-2"
              >
                <ArrowRight className="w-5 h-5" />
              </motion.span>
            </button>
            <button
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white/80 hover:bg-white text-green-900 border border-green-200 px-10 py-4 rounded-full shadow-lg transition-all hover:scale-105 cursor-pointer text-lg backdrop-blur-sm"
            >
              View Combos
            </button>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
