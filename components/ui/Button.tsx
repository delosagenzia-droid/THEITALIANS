import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className = '', variant = 'primary', size = 'md', children, ...props }, ref) => {

        const baseStyles = "inline-flex items-center justify-center transition-all duration-300 font-body font-semibold text-[16px] rounded-lg tracking-wide disabled:opacity-50 disabled:cursor-not-allowed";

        const variants = {
            primary: "bg-accent text-white hover:bg-accent-hover shadow-md hover:shadow-lg active:scale-[0.98]",
            outline: "border-2 border-accent text-accent hover:bg-accent hover:text-white bg-transparent",
            ghost: "text-text-subtle hover:text-accent hover:bg-white/5 bg-transparent",
        };

        const sizes = {
            sm: 'px-4 py-2 text-[14px]',
            md: 'px-6 py-3 text-[16px]', // Standard from prompt: 12px 24px
            lg: 'px-8 py-4 text-[18px]',
        };

        // Combine classes safely
        const combinedClassName = `${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`;

        return (
            <button
                ref={ref}
                className={combinedClassName.trim()}
                {...props}
            >
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';
