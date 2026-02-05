import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className = '', variant = 'primary', size = 'md', children, ...props }, ref) => {

        const baseStyles = `
            relative inline-flex items-center justify-center
            font-body font-normal uppercase tracking-[3px]
            transition-all duration-400 ease-out
            overflow-hidden
            cursor-pointer
        `;

        // Note: Using template literals for Tailwind classes to ensure they are picked up, 
        // but structured as strings in the object.
        const variants = {
            primary: `
                bg-transparent border border-accent text-accent
                hover:bg-accent hover:text-bg
                before:absolute before:inset-0 before:bg-accent 
                before:translate-x-[-101%] before:transition-transform before:duration-500 before:ease-out
                hover:before:translate-x-0 before:z-0
            `,
            outline: `
                bg-transparent border border-white/20 text-text-muted
                hover:border-white/40 hover:text-white
            `,
            ghost: `
                bg-transparent text-text-muted
                hover:text-white
            `,
        };

        const sizes = {
            sm: 'px-6 py-3 text-[10px]',
            md: 'px-8 py-4 text-[11px]',
            lg: 'px-10 py-5 text-[11px]',
        };

        // Combine classes safely
        const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`.replace(/\s+/g, ' ').trim();

        return (
            <button
                ref={ref}
                className={combinedClassName}
                {...props}
            >
                <span className="relative z-10">{children}</span>
            </button>
        );
    }
);

Button.displayName = 'Button';
