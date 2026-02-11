import { Hero } from "@/components/home/Hero";
import { Problem } from "@/components/home/Problem";
import { Format } from "@/components/home/Format";
import { Team } from "@/components/home/Team";
import { ApplicationForm } from "@/components/home/ApplicationForm";
import { DividerLine } from "@/components/ui/DividerLine";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "THE ITALIANS | Raccontiamo le Imprese Italiane",
  description: "Format video che entra nelle fabbriche, laboratori e cucine italiane per raccontare le storie del Made in Italy.",
  openGraph: {
    images: [{ url: "https://the-italians.it/og/home.jpg", width: 1200, height: 630, alt: "THE ITALIANS Homepage" }],
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
