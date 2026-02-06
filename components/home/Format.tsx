import { SectionNumber } from '../ui/SectionNumber';
import { Camera, Clapperboard, MessageSquare, Send } from 'lucide-react';

const steps = [
    {
        number: "01",
        title: "Contatto e Selezione",
        description: "Facciamo una prima call per conoscerci e capire come valorizzare al meglio i vostri punti di forza",
        icon: Send
    },
    {
        number: "02",
        title: "Pianificazione",
        description: "Definiamo insieme i temi, le persone da intervistare, la giornata di riprese. Sopralluogo (se necessario) per organizzare al meglio.",
        icon: MessageSquare
    },
    {
        number: "03",
        title: "Giornata di Riprese",
        description: "Veniamo da voi con una troupe leggera. Riprendiamo interviste, ambienti, processo produttivo.",
        icon: Camera
    },
    {
        number: "04",
        title: "Post-produzione e Pubblicazione",
        description: "Montiamo i contenuti, li revisioniamo insieme a voi. Pubblichiamo sui canali secondo il piano concordato.",
        icon: Clapperboard
    }
];

export function Format() {
    return (
        <section id="format" className="py-32 bg-[#080808] relative overflow-hidden">
            {/* Background geometrico minimale */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:100px_100px]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
                    <div className="max-w-2xl">
                        <SectionNumber number="02" className="mb-6" />
                        <h2 className="font-display text-5xl md:text-7xl text-white leading-none tracking-tight">
                            Come <br />
                            <span className="text-accent italic font-light">funziona.</span>
                        </h2>
                    </div>
                    <p className="text-text-muted text-lg max-w-sm font-light border-l border-white/10 pl-6">
                        Dalla selezione alla pubblicazione
                    </p>
                </div>

                <div className="space-y-4">
                    {steps.map((step, idx) => (
                        <div
                            key={idx}
                            className="group relative flex flex-col md:flex-row items-center gap-8 p-8 md:p-12 bg-white/[0.01] border border-white/5 rounded-2xl hover:bg-white/[0.03] hover:border-white/10 transition-all duration-700"
                        >
                            {/* Numero d'ordine gigante sfumato */}
                            <span className="absolute right-12 top-1/2 -translate-y-1/2 text-[10rem] font-display font-bold text-white/[0.02] group-hover:text-accent/[0.05] transition-colors duration-700 hidden lg:block">
                                {step.number}
                            </span>

                            {/* Icona con cerchio cromato */}
                            <div className="relative flex-shrink-0">
                                <div className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center bg-black shadow-2xl group-hover:border-accent/50 transition-colors duration-500">
                                    <step.icon className="w-8 h-8 text-white group-hover:text-accent transition-transform duration-500 group-hover:scale-110" />
                                </div>
                                <div className="absolute -inset-2 bg-accent/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            </div>

                            {/* Testo */}
                            <div className="flex-1 text-center md:text-left relative z-10">
                                <div className="flex items-center justify-center md:justify-start gap-4 mb-2">
                                    <span className="text-accent font-mono text-sm tracking-widest">{step.number}</span>
                                    <div className="w-8 h-px bg-accent/30" />
                                </div>
                                <h3 className="text-2xl md:text-3xl text-white font-display mb-4 tracking-wide">
                                    {step.title}
                                </h3>
                                <p className="text-text-muted text-lg font-light leading-relaxed max-w-2xl">
                                    {step.description}
                                </p>
                            </div>

                            {/* Call to action interna discreta */}
                            <div className="hidden md:block opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
                                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center">
                                    <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}