import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Team } from '@/components/home/Team';

export const metadata = {
    title: 'Team | THE ITALIANS',
    description: 'Conosci il team dietro il progetto editoriale dedicata alle imprese italiane.',
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
