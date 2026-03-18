import { ReactNode } from 'react';

type Variant = 'default' | 'glass' | 'highlight';
type Padding = 'none' | 'sm' | 'md' | 'lg';

interface CardProps {
  children: ReactNode;
  variant?: Variant;
  padding?: Padding;
  hover?: boolean;
  className?: string;
}

const variantClasses: Record<Variant, string> = {
  default: 'bg-[#0f0f1a] border border-[#1f1f2e]',
  glass: 'bg-white/5 backdrop-blur-md border border-white/10',
  highlight: 'bg-[#0f0f1a] border border-blue-500/50 shadow-lg shadow-blue-500/10',
};

const paddingClasses: Record<Padding, string> = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export default function Card({ children, variant = 'default', padding = 'md', hover = false, className = '' }: CardProps) {
  const hoverClass = hover ? 'hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 cursor-pointer' : '';
  return (
    <div className={`rounded-2xl ${variantClasses[variant]} ${paddingClasses[padding]} ${hoverClass} ${className}`}>
      {children}
    </div>
  );
}
