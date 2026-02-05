'use client';

import { useState } from 'react';
import { updateApplicationStatus } from '@/app/admin/actions';
import { clsx } from 'clsx';

interface StatusSelectorProps {
    id: string;
    currentStatus: string;
}

const statuses = [
    { value: 'new', label: 'Nuovo', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
    { value: 'contacted', label: 'Contattato', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
    { value: 'reviewing', label: 'In Valutazione', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
    { value: 'scheduled', label: 'In Programma', color: 'bg-orange-500/20 text-orange-400 border-orange-500/30' },
    { value: 'completed', label: 'Completato', color: 'bg-green-500/20 text-green-400 border-green-500/30' },
    { value: 'rejected', label: 'Archiviato', color: 'bg-red-500/20 text-red-400 border-red-500/30' },
];

export function StatusSelector({ id, currentStatus }: StatusSelectorProps) {
    const [loading, setLoading] = useState(false);

    const activeStatus = statuses.find(s => s.value === currentStatus) || statuses[0];

    async function handleStatusChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const newStatus = e.target.value;
        if (newStatus === currentStatus) return;

        setLoading(true);
        try {
            await updateApplicationStatus(id, newStatus);
        } catch (error) {
            alert('Errore aggiornamento stato');
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="relative group">
            <div className={clsx(
                "flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] uppercase tracking-wide font-medium transition-all cursor-pointer",
                activeStatus.color,
                loading && "opacity-50 cursor-wait"
            )}>
                <span className={clsx("w-1.5 h-1.5 rounded-full", activeStatus.color.replace('bg-', 'bg-current '))} />
                {activeStatus.label}
            </div>

            <select
                value={currentStatus}
                onChange={handleStatusChange}
                disabled={loading}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
            >
                {statuses.map((status) => (
                    <option key={status.value} value={status.value} className="bg-bg-elevated text-white">
                        {status.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
