import { Hero } from "@/components/home/Hero";
import { Format } from "@/components/home/Format";
import { DividerLine } from "@/components/ui/DividerLine";
import { Metadata } from "next";
import dynamic from 'next/dynamic';

// Lazy load heavy components below the fold
const Problem = dynamic(() => import('@/components/home/Problem').then(mod => mod.Problem), {
  loading: () => <div className="h-[800px] bg-white animate-pulse" /> // Skeleton placeholder
});

const Team = dynamic(() => import('@/components/home/Team').then(mod => mod.Team), {
  loading: () => <div className="h-[800px] bg-[#0B0B0B]" />
});

const ApplicationForm = dynamic(() => import('@/components/home/ApplicationForm').then(mod => mod.ApplicationForm), {
  loading: () => <div className="h-[600px] bg-[#0B0B0B]" />
});

// ISR: Revalidate every hour
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "THE ITALIANS — Raccontiamo le Imprese Italiane | Riccardo Segna × Delos Lab",
  description: "THE ITALIANS è il format video che racconta le imprese italiane con storytelling cinematografico. Interviste autentiche nelle fabbriche, laboratori e cucine d'Italia. Un progetto di Riccardo Segna (Riccardo Segnalini) e Delos Lab.",
  openGraph: {
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "THE ITALIANS — Raccontiamo le Imprese Italiane" }],
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question", "name": "Cos'è THE ITALIANS?",
                "acceptedAnswer": { "@type": "Answer", "text": "Format video che racconta le imprese italiane con interviste cinematografiche di Riccardo Segna." }
              },
              {
                "@type": "Question", "name": "Quanto costa partecipare?",
                "acceptedAnswer": { "@type": "Answer", "text": "Nessun pagamento. Chiediamo solo collaborazione: disponibilità, accesso agli spazi e autenticità." }
              },
              {
                "@type": "Question", "name": "Come posso candidare la mia azienda?",
                "acceptedAnswer": { "@type": "Answer", "text": "Compila il form sulla pagina candidatura di the-italians.it." }
              },
              {
                "@type": "Question", "name": "Cosa ottiene l'azienda?",
                "acceptedAnswer": { "@type": "Answer", "text": "Due produzioni video professionali: una sul canale Riccardo Segna e una sul canale THE ITALIANS." }
              }
            ]
          }),
        }}
      />
      <Hero />
      <Problem />
      <DividerLine />
      <Format />
      <Team />
      <ApplicationForm />
    </>
  );
}
