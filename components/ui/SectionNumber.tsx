import { cn } from '@/lib/utils';

interface SectionNumberProps {
    number: string;
    className?: string;
}

export function SectionNumber({ number, className }: SectionNumberProps) {
    return (
        <div className={cn("flex items-center gap-4 mb-8", className)}>
            <span className="text-accent font-display text-lg italic block">
                {number}
            </span>
            <div className="h-[1px] w-12 bg-accent/30" />
        </div>
    );
}
