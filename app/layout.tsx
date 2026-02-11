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
  metadataBase: new URL("https://the-italians.it"),
  title: {
    default: "THE ITALIANS | Raccontiamo le Imprese Italiane",
    template: "%s | THE ITALIANS",
  },
  description:
    "Format video che entra nelle fabbriche, nei laboratori e nelle cucine italiane per raccontare le storie del Made in Italy.",
  keywords: [
    "imprese italiane", "storie aziende italiane", "Made in Italy",
    "video imprese", "storytelling aziendale", "interviste imprenditori italiani",
    "PMI italiane", "eccellenza italiana", "the italians",
  ],
  authors: [
    { name: "Riccardo Segna" },
    { name: "Delos Lab", url: "https://delos-lab.it" },
  ],
  creator: "Riccardo Segna × Delos Lab",
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
  // verification: { google: "CODICE_VERIFICA" }, // TODO: Add verification code when available
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: "https://the-italians.it",
    siteName: "THE ITALIANS",
    title: "THE ITALIANS | Raccontiamo le Imprese Italiane",
    description: "Format video cinematografico che racconta le storie delle imprese italiane.",
    images: [{ url: "https://the-italians.it/og/home.jpg", width: 1200, height: 630, alt: "THE ITALIANS" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "THE ITALIANS | Raccontiamo le Imprese Italiane",
    description: "Format video che entra nelle fabbriche italiane per raccontare le storie del Made in Italy.",
    images: ["https://the-italians.it/og/home.jpg"],
    creator: "@riccardosegna", // Verify handle
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "THE ITALIANS",
              "url": "https://the-italians.it",
              "logo": "https://the-italians.it/logo.png",
              "description": "Format video che racconta le imprese italiane attraverso interviste autentiche.",
              "foundingDate": "2026",
              "founder": [{ "@type": "Person", "name": "Riccardo Segna" }],
              "sameAs": [
                "https://instagram.com/theitalians",
                "https://tiktok.com/@theitalians",
                "https://instagram.com/riccardosegna",
                "https://delos-lab.it"
              ]
            }),
          }}
        />
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
