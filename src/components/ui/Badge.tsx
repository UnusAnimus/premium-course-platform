type Variant = 'blue' | 'purple' | 'cyan' | 'green' | 'red' | 'gray';
type Size = 'sm' | 'md';

interface BadgeProps {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
}

const variantClasses: Record<Variant, string> = {
  blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  green: 'bg-green-500/10 text-green-400 border-green-500/20',
  red: 'bg-red-500/10 text-red-400 border-red-500/20',
  gray: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
};

export default function Badge({ children, variant = 'blue', size = 'sm', className = '' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center font-medium border rounded-full ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}>
      {children}
    </span>
  );
}
