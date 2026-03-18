'use client';
import { ReactNode, TextareaHTMLAttributes, InputHTMLAttributes } from 'react';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  prefixIcon?: ReactNode;
  suffixIcon?: ReactNode;
  textarea?: false;
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  prefixIcon?: ReactNode;
  suffixIcon?: ReactNode;
  textarea: true;
  rows?: number;
}

type Props = InputProps | TextareaProps;

export default function Input(props: Props) {
  const { label, error, prefixIcon, suffixIcon, className = '', ...rest } = props;
  const base = `w-full bg-[#0f0f1a] border ${error ? 'border-red-500' : 'border-[#1f1f2e]'} rounded-xl px-4 py-3 text-[#f0f0f0] placeholder-[#6b7280] focus:outline-none focus:border-blue-500 transition-colors text-sm`;
  const inputClass = `${base} ${prefixIcon ? 'pl-10' : ''} ${suffixIcon ? 'pr-10' : ''} ${className}`;

  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-medium text-[#f0f0f0]">{label}</label>}
      <div className="relative">
        {prefixIcon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6b7280]">{prefixIcon}</span>}
        {props.textarea ? (
          <textarea
            {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
            className={inputClass}
            rows={(props as TextareaProps).rows || 4}
          />
        ) : (
          <input {...(rest as InputHTMLAttributes<HTMLInputElement>)} className={inputClass} />
        )}
        {suffixIcon && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b7280]">{suffixIcon}</span>}
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
