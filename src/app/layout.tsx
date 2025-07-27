import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/components/CartContext";
import { WishlistProvider } from "@/components/WishlistContext";
import { Toaster } from "react-hot-toast";



const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Furniro",
  description: "Furniro website developed by Muhammad Tayyab",
    icons: {
    icon: "/icon-hero.png",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-black`}
      >
        <Toaster position="bottom-right" reverseOrder={false}/>
        <WishlistProvider>
        <CartProvider>
        <Navbar/>
        {children}
        <Footer/>
        </CartProvider>
        </WishlistProvider>
      </body>
    </html>
  );
}
