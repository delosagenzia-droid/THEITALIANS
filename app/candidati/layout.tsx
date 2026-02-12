import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Candidati — Racconta la Tua Impresa con THE ITALIANS',
    description:
        'Candidati per essere raccontato da THE ITALIANS. Nessun costo: cerchiamo imprese italiane autentiche con una storia da raccontare. Un progetto di Riccardo Segna e Delos Lab.',
    openGraph: {
        title: 'Candidati — Racconta la Tua Impresa con THE ITALIANS',
        description:
            'Candidati per essere raccontato da THE ITALIANS. Nessun costo.',
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'THE ITALIANS — Candidati' }],
    },
    alternates: {
        canonical: 'https://the-italians.it/candidati',
    },
};

export default function CandidatiLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
