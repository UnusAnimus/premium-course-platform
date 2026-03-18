'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { navItems } from '@/lib/data';

export default function PublicHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0a0a0f]/90 backdrop-blur-md border-b border-[#1f1f2e]' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            AcademyPro
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navItems.map(item => (
              <Link key={item.href} href={item.href} className="text-sm text-[#6b7280] hover:text-[#f0f0f0] transition-colors">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/member/login" className="text-sm text-[#6b7280] hover:text-[#f0f0f0] transition-colors px-3 py-2">
              Sign In
            </Link>
            <Link href="/member/login" className="text-sm font-medium bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-4 py-2 rounded-xl transition-all">
              Get Started
            </Link>
          </div>

          <button className="md:hidden text-[#6b7280] p-2" onClick={() => setMenuOpen(!menuOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden py-4 border-t border-[#1f1f2e]">
            {navItems.map(item => (
              <Link key={item.href} href={item.href} className="block py-2 text-[#6b7280] hover:text-[#f0f0f0]" onClick={() => setMenuOpen(false)}>
                {item.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 mt-4">
              <Link href="/member/login" className="text-sm text-center text-[#6b7280] py-2">Sign In</Link>
              <Link href="/member/login" className="text-sm text-center font-medium bg-blue-600 text-white py-2 rounded-xl">Get Started</Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
