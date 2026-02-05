'use client';

import { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import Link from 'next/link';
import { clsx } from 'clsx';

type CookiePreferences = {
    necessary: boolean;
    analytics: boolean;
    marketing: boolean;
};

export function CookieBanner() {
    const [isVisible, setIsVisible] = useState(false);
    const [showCustomize, setShowCustomize] = useState(false);
    const [preferences, setPreferences] = useState<CookiePreferences>({
        necessary: true,
        analytics: false,
        marketing: false,
    });

    useEffect(() => {
        // Check if consent is already saved
        const storedConsent = localStorage.getItem('cookie-consent');
        if (!storedConsent) {
            // Delay slightly for animation
            const timer = setTimeout(() => setIsVisible(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const savePreferences = (prefs: CookiePreferences) => {
        localStorage.setItem('cookie-consent', JSON.stringify(prefs));
        setIsVisible(false);
        // Here you would trigger analytics/pixels based on prefs
        if (prefs.analytics) {
            // Load Analytics (e.g. GA4)
            console.log('Analytics cookies accepted');
        }
    };

    const handleAcceptAll = () => {
        savePreferences({
            necessary: true,
            analytics: true,
            marketing: true,
        });
    };

    const handleAcceptNecessary = () => {
        savePreferences({
            necessary: true,
            analytics: false,
            marketing: false,
        });
    };

    const handleSaveCustom = () => {
        savePreferences(preferences);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6">
            <div className="max-w-4xl mx-auto bg-bg-card/95 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-sm shadow-2xl animate-fade-in-up">
                {!showCustomize ? (
                    <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                        <div className="flex-1 space-y-2">
                            <h3 className="font-display text-xl text-white">Rispetto della tua Privacy</h3>
                            <p className="text-text-muted text-sm leading-relaxed max-w-2xl">
                                Utilizziamo cookie tecnici per il funzionamento del sito e, previo tuo consenso, cookie di profilazione per migliorare la tua esperienza.
                                Puoi accettare tutti i cookie, rifiutare quelli non necessari o personalizzare le tue scelte.
                                Per maggiori informazioni consulta la <Link href="/cookie-policy" className="text-accent underline hover:text-white transition-colors">Cookie Policy</Link>.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                            <Button variant="outline" size="sm" onClick={() => setShowCustomize(true)}>
                                Personalizza
                            </Button>
                            <Button variant="outline" size="sm" onClick={handleAcceptNecessary}>
                                Solo Necessari
                            </Button>
                            <Button variant="primary" size="sm" onClick={handleAcceptAll}>
                                Accetta Tutti
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <h3 className="font-display text-xl text-white">Personalizza le preferenze</h3>
                            <p className="text-text-muted text-sm">Scegli quali cookie vuoi autorizzare.</p>
                        </div>

                        <div className="space-y-4 border-t border-white/10 pt-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-white text-sm font-medium">Tecnici (Necessari)</p>
                                    <p className="text-text-subtle text-xs">Indispensabili per il funzionamento del sito.</p>
                                </div>
                                <input type="checkbox" checked disabled className="accent-accent" />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-white text-sm font-medium">Analitici</p>
                                    <p className="text-text-subtle text-xs">Ci aiutano a capire come usi il sito (GDPR compilant).</p>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={preferences.analytics}
                                    onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                                    className="accent-accent cursor-pointer w-4 h-4"
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-white text-sm font-medium">Marketing</p>
                                    <p className="text-text-subtle text-xs">Per offrirti contenuti in linea con i tuoi interessi.</p>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={preferences.marketing}
                                    onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                                    className="accent-accent cursor-pointer w-4 h-4"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 border-t border-white/10 pt-6">
                            <Button variant="ghost" size="sm" onClick={() => setShowCustomize(false)}>
                                Indietro
                            </Button>
                            <Button variant="primary" size="sm" onClick={handleSaveCustom}>
                                Salva Preferenze
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
