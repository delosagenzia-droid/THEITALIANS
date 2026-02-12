'use client';

export function StructuredData() {
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "THE ITALIANS",
        alternateName: "The Italians - Raccontiamo le Imprese Italiane",
        url: "https://the-italians.it",
        logo: "https://the-italians.it/logo-email.png",
        description:
            "Format video che racconta le imprese italiane attraverso storytelling cinematografico. Progetto di Riccardo Segna e Delos Lab.",
        foundingDate: "2026",
        founders: [
            {
                "@type": "Person",
                name: "Riccardo Segnalini",
                alternateName: "Riccardo Segna",
                jobTitle: "Content Creator & Host",
                url: "https://instagram.com/riccardosegna",
                sameAs: [
                    "https://instagram.com/riccardosegna",
                    "https://tiktok.com/@riccardosegna",
                    "https://www.youtube.com/@riccardosegna",
                ],
            },
            {
                "@type": "Organization",
                name: "Delos Lab",
                url: "https://delos-lab.it",
                description:
                    "Agenzia di marketing e produzione video con sede a Roma",
                address: {
                    "@type": "PostalAddress",
                    streetAddress: "Via Gaetano Donizetti 7/b",
                    addressLocality: "Roma",
                    postalCode: "00198",
                    addressCountry: "IT",
                },
                sameAs: [
                    "https://delos-lab.it",
                    "https://it.linkedin.com/company/deloslab",
                ],
            },
        ],
        sameAs: [
            "https://instagram.com/riccardosegna",
            "https://tiktok.com/@riccardosegna",
            "https://delos-lab.it",
        ],
        contactPoint: {
            "@type": "ContactPoint",
            email: "info@theitalians.it",
            contactType: "customer service",
            availableLanguage: "Italian",
        },
    };

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "THE ITALIANS",
        url: "https://the-italians.it",
        description:
            "Raccontiamo le Imprese Italiane — Format video di storytelling aziendale",
        inLanguage: "it-IT",
        publisher: {
            "@type": "Organization",
            name: "THE ITALIANS",
        },
    };

    const videoSeriesSchema = {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        name: "THE ITALIANS — Format Video Imprese Italiane",
        description:
            "Serie video che racconta le imprese italiane attraverso interviste autentiche, riprese cinematografiche e storytelling. Ogni episodio entra in un'azienda italiana per raccontarne storia, persone e processi.",
        thumbnailUrl: "https://the-italians.it/og-image.png",
        uploadDate: "2026-01-01",
        publisher: {
            "@type": "Organization",
            name: "THE ITALIANS",
            url: "https://the-italians.it",
        },
        creator: {
            "@type": "Person",
            name: "Riccardo Segnalini",
            alternateName: "Riccardo Segna",
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(organizationSchema),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(websiteSchema),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(videoSeriesSchema),
                }}
            />
        </>
    );
}
