import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Paradise Nursery | Premium Indoor & Outdoor Plants",
    template: "%s | Paradise Nursery",
  },
  description: "Discover Paradise Nursery's curated collection of exotic plants, handcrafted pots, and premium fertilizers. Elevate your space with nature's finest.",
  keywords: ["plants", "nursery", "indoor plants", "outdoor plants", "gardening", "pots", "fertilizers", "buy plants online"],
  openGraph: {
    title: "Paradise Nursery",
    description: "Where nature meets luxury. Explore our premium plant collection.",
    type: "website",
    locale: "en_US",
    siteName: "Paradise Nursery",
  },
  twitter: {
    card: "summary_large_image",
    title: "Paradise Nursery",
    description: "Premium plants for your home and garden.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
