import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google"; // Keep Inter from Google
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/legal/CookieBanner";

// Configure Garet Local Font
const garet = localFont({
  src: [
    {
      path: '../public/fonts/Garet-Book.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Garet-Heavy.otf',
      weight: '800',
      style: 'normal',
    },
  ],
  variable: "--font-display",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "THE ITALIANS",
  description: "Diamo potenza cinematografica alle imprese italiane.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${garet.variable} ${inter.variable} antialiased font-body bg-bg text-text`}
      >
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
