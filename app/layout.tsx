import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google"; // Google Fonts
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/legal/CookieBanner";
import { StructuredData } from "@/components/StructuredData";

// Configure Fonts
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700"], // Regular, SemiBold, Bold
  variable: "--font-heading",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"], // Light, Regular, Medium, SemiBold
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://the-italians.it"),
  title: {
    default: "THE ITALIANS — Raccontiamo le Imprese Italiane | Riccardo Segna × Delos Lab",
    template: "%s | THE ITALIANS",
  },
  description:
    "THE ITALIANS è il format video che racconta le imprese italiane attraverso storytelling cinematografico. Un progetto di Riccardo Segna (Riccardo Segnalini) e Delos Lab. Entriamo nelle fabbriche, laboratori e cucine d'Italia per dare voce all'eccellenza del Made in Italy.",
  keywords: [
    "THE ITALIANS", "imprese italiane", "storytelling imprese",
    "Riccardo Segna", "Riccardo Segnalini", "Delos Lab",
    "video imprese italiane", "Made in Italy", "format video aziende",
    "content creator imprese", "raccontare aziende italiane",
    "storytelling aziendale", "video storytelling Italia",
    "delos lab roma", "the italians riccardo segna",
  ],
  authors: [
    { name: "Riccardo Segna" },
    { name: "Delos Lab", url: "https://delos-lab.it" },
  ],
  creator: "Delos Lab",
  publisher: "THE ITALIANS",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://the-italians.it",
  },
  verification: {
    google: "vm551VGqd1UtxPU_FYY4HblvJfipUsRUn_dEIWVY4F8",
  },
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: "https://the-italians.it",
    siteName: "THE ITALIANS",
    title: "THE ITALIANS — Raccontiamo le Imprese Italiane",
    description: "Format video che racconta l'eccellenza delle imprese italiane. Un progetto di Riccardo Segna e Delos Lab.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "THE ITALIANS — Raccontiamo le Imprese Italiane",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "THE ITALIANS — Raccontiamo le Imprese Italiane",
    description: "Format video che racconta l'eccellenza delle imprese italiane. Riccardo Segna × Delos Lab.",
    images: ["/og-image.png"],
    creator: "@riccardosegna",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <head>
        <StructuredData />
      </head>
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
