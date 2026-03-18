import { ReactNode } from 'react';
import AdminSidebar from './AdminSidebar';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#0a0a0f]">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-[#0f0f1a] border-b border-[#1f1f2e] flex items-center justify-between px-6 sticky top-0 z-30">
          <h1 className="text-sm font-semibold text-[#6b7280]">Admin Panel</h1>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-[#6b7280] hover:text-[#f0f0f0] transition-colors">View Site</Link>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold">AD</div>
          </div>
        </header>
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
