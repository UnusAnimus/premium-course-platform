'use client';
import { ReactNode, useEffect } from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
}

export default function Modal({ open, onClose, title, children, footer }: ModalProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-lg bg-[#0f0f1a] border border-[#1f1f2e] rounded-2xl shadow-2xl">
        {title && (
          <div className="flex items-center justify-between p-6 border-b border-[#1f1f2e]">
            <h2 className="text-lg font-semibold text-[#f0f0f0]">{title}</h2>
            <button onClick={onClose} className="text-[#6b7280] hover:text-[#f0f0f0] transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
        <div className="p-6">{children}</div>
        {footer && <div className="p-6 border-t border-[#1f1f2e] flex gap-3 justify-end">{footer}</div>}
      </div>
    </div>
  );
}
