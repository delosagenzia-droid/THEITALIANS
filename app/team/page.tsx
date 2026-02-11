import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Team } from '@/components/home/Team';
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Chi Siamo | Riccardo Segna × Delos Lab",
    description: "Il team dietro THE ITALIANS. Unione di storytelling cinematografico e strategia digitale per raccontare le imprese italiane.",
};

export default function TeamPage() {
    return (
        <>
            <div className="pt-24 min-h-screen bg-bg">
                {/* We reuse the Team component but maybe we want to adjust spacing if reused exactly. 
            The existing component has 'py-32', which is good. */}
                <Team />
            </div>
        </>
    );
}
