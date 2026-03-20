import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AnnouncementBar from "../components/AnnouncementBar"; // <-- ON AJOUTE L'IMPORT ICI
import { CartProvider } from "../components/CartContext"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "C.Malicorne | Vêtements",
  description: "Boutique officielle",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <CartProvider>
          {/* LA BARRE D'ANNONCE EST TOUT EN HAUT */}
          <AnnouncementBar /> 
          
          <Navbar />
          
          <main className="flex-1">
            {children}
          </main>
          
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}