import Hero from "@/components/Hero";
import ProductSection from "@/components/ProductSection";
import AboutSection from "@/components/AboutSection";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f0f9f0] overflow-x-hidden">
      <Navbar />
      <CartDrawer />
      <Hero />
      <AboutSection />
      <ProductSection />

      {/* Simple Footer */}
      <Footer />
    </main>
  );
}
