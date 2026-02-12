import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Contatti — THE ITALIANS | Scrivici',
    description:
        'Contatta THE ITALIANS per candidature, collaborazioni o informazioni. Email: info@the-italians.it. Seguici su Instagram, TikTok e YouTube.',
    openGraph: {
        title: 'Contatti — THE ITALIANS',
        description: 'Scrivici per collaborazioni, candidature o informazioni.',
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'THE ITALIANS — Contatti' }],
    },
    alternates: {
        canonical: 'https://the-italians.it/contatti',
    },
};

export default function ContattiPage() {
    const igIcon = (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
    );
    const tiktokIcon = (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
        </svg>
    );
    const youtubeIcon = (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
    );
    const linkedinIcon = (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
    );

    const socialGroups = [
        {
            title: 'Riccardo Segna',
            links: [
                { name: 'Instagram', handle: '@riccardosegna', href: 'https://www.instagram.com/riccardosegna/', icon: igIcon },
                { name: 'TikTok', handle: '@riccardosegna', href: 'https://www.tiktok.com/@riccardosegna', icon: tiktokIcon },
            ],
        },
        {
            title: 'Delos Lab',
            links: [
                { name: 'Instagram', handle: '@delos.lab', href: 'https://www.instagram.com/delos.lab/', icon: igIcon },
                { name: 'LinkedIn', handle: 'Delos Lab', href: 'https://www.linkedin.com/company/deloslab/', icon: linkedinIcon },
            ],
        },
        {
            title: 'THE ITALIANS',
            links: [
                { name: 'Instagram', handle: '@theitalians.it', href: 'https://www.instagram.com/theitalians.it/', icon: igIcon },
                { name: 'TikTok', handle: '@theitalians.it', href: 'https://www.tiktok.com/@theitalians.it', icon: tiktokIcon },
                { name: 'YouTube', handle: '@theitalians.it', href: 'https://www.youtube.com/@theitalians.it', icon: youtubeIcon },
                { name: 'LinkedIn', handle: 'THE ITALIANS', href: 'https://www.linkedin.com/company/theitalians-it/', icon: linkedinIcon },
            ],
        },
    ];

    return (
        <div className="relative min-h-screen bg-[#0B0B0B] overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(246,158,0,0.1),transparent_70%)]" />
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    }}
                />
            </div>

            <div className="relative z-10 mx-auto max-w-5xl px-6 pt-36 pb-24 md:pt-44 md:pb-32">
                {/* Header */}
                <div className="text-center mb-16 md:mb-20">
                    <p className="font-body text-[13px] font-medium uppercase tracking-[0.32em] text-[#F69E00] mb-4">
                        Contatti
                    </p>
                    <h1 className="font-heading text-[clamp(2.2rem,5vw,3.5rem)] font-bold leading-[1.05] tracking-tight text-white mb-6">
                        Parliamone
                    </h1>
                    <p className="font-body text-[17px] text-white/65 leading-relaxed max-w-2xl mx-auto">
                        Per candidature, collaborazioni, informazioni sul format o semplicemente
                        per salutarci — scrivici. Rispondiamo a tutti.
                    </p>
                </div>

                {/* Email card */}
                <div className="max-w-2xl mx-auto mb-16">
                    <a
                        href="mailto:info@the-italians.it"
                        className="group block relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-8 md:p-10 transition-all duration-300 hover:border-[#F69E00]/30 hover:bg-white/[0.05]"
                    >
                        <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-[#F69E00]/50 via-white/10 to-transparent opacity-80" />

                        <div className="flex flex-col md:flex-row md:items-center gap-6">
                            <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-full bg-[#F69E00]/10 border border-[#F69E00]/20 group-hover:bg-[#F69E00]/20 transition-colors">
                                <svg className="w-6 h-6 text-[#F69E00]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                </svg>
                            </div>

                            <div>
                                <p className="font-heading text-xl font-semibold text-white mb-1">
                                    info@the-italians.it
                                </p>
                                <p className="font-body text-[14px] text-white/50">
                                    Email principale — candidature, collaborazioni, info generali
                                </p>
                            </div>

                            <svg className="hidden md:block ml-auto h-5 w-5 text-white/30 group-hover:text-[#F69E00] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </div>
                    </a>
                </div>

                {/* Social profiles */}
                <div className="max-w-2xl mx-auto">
                    <h2 className="font-heading text-lg font-semibold text-white mb-8">
                        Seguici sui social
                    </h2>

                    <div className="space-y-8">
                        {socialGroups.map((group) => (
                            <div key={group.title}>
                                <h3 className="font-body text-[12px] font-medium uppercase tracking-[0.28em] text-[#F69E00]/80 mb-3">
                                    {group.title}
                                </h3>
                                <div className="grid sm:grid-cols-2 gap-3">
                                    {group.links.map((social) => (
                                        <a
                                            key={social.href}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group flex items-center gap-4 rounded-xl border border-white/8 bg-white/[0.02] px-5 py-4 transition-all duration-300 hover:border-white/15 hover:bg-white/[0.05]"
                                        >
                                            <div className="text-white/50 group-hover:text-[#F69E00] transition-colors">
                                                {social.icon}
                                            </div>
                                            <div>
                                                <p className="font-body text-[14px] font-medium text-white/85">
                                                    {social.name}
                                                </p>
                                                <p className="font-body text-[12px] text-white/40">
                                                    {social.handle}
                                                </p>
                                            </div>
                                            <svg className="ml-auto h-4 w-4 text-white/20 group-hover:text-white/50 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                                            </svg>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA bottom */}
                <div className="text-center mt-16 md:mt-20">
                    <p className="font-body text-[14px] text-white/40 mb-4">
                        Vuoi raccontare la tua impresa?
                    </p>
                    <Link
                        href="/candidati"
                        className="inline-flex items-center gap-2 rounded-lg bg-[#F69E00] px-7 py-3.5 font-body text-[15px] font-semibold text-white transition-all duration-300 hover:bg-[#E08E00] hover:shadow-[0_8px_30px_rgba(246,158,0,0.35)]"
                    >
                        Candidati ora
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
}
