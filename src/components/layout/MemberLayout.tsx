import { ReactNode } from 'react';
import MemberSidebar from './MemberSidebar';
import Link from 'next/link';

export default function MemberLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#0a0a0f]">
      <MemberSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-[#0f0f1a] border-b border-[#1f1f2e] flex items-center justify-between px-6 sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <Link href="/" className="text-sm font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent md:hidden">AcademyPro</Link>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-[#6b7280] hover:text-[#f0f0f0] relative">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
              <span className="absolute top-0 right-0 w-2 h-2 bg-blue-500 rounded-full"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">AM</div>
          </div>
        </header>
        <main className="flex-1 p-6 pb-20 md:pb-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
