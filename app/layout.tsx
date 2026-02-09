import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google"; // Google Fonts
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/legal/CookieBanner";

// Configure Fonts
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700"], // Regular, SemiBold, Bold
  variable: "--font-heading",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"], // Light, Regular, Medium, SemiBold
  variable: "--font-body",
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
        className={`${inter.variable} ${poppins.variable} antialiased font-body bg-bg text-text`}
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
