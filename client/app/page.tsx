import Hero from "@/components/Hero";
import ProductSection from "@/components/ProductSection";
import AboutSection from "@/components/AboutSection";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";

import { Metadata } from "next";

import ServicesSection from "@/components/ServicesSection";

export const metadata: Metadata = {
  title: "Paradise Nursery | Best Online Plant Nursery",
  description: "Shop the finest collection of indoor and outdoor plants. Fresh from our nursery to your doorstep. Rated #1 for quality and service.",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f0f9f0] overflow-x-hidden">
      <Navbar />
      <CartDrawer />
      <Hero />
      <ServicesSection />
      <AboutSection />
      <ProductSection />

      {/* Simple Footer */}
      <Footer />
    </main>
  );
}
