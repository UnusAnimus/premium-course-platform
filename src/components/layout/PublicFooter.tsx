import Link from 'next/link';

const columns = [
  { title: 'Platform', links: [{ label: 'Courses', href: '/courses' }, { label: 'Pricing', href: '/pricing' }, { label: 'Dashboard', href: '/member/dashboard' }, { label: 'Blog', href: '#' }] },
  { title: 'Courses', links: [{ label: 'React', href: '/courses' }, { label: 'Next.js', href: '/courses' }, { label: 'TypeScript', href: '/courses' }, { label: 'DevOps', href: '/courses' }] },
  { title: 'Company', links: [{ label: 'About', href: '/about' }, { label: 'Careers', href: '#' }, { label: 'Partners', href: '#' }, { label: 'Press', href: '#' }] },
  { title: 'Support', links: [{ label: 'Contact', href: '/contact' }, { label: 'FAQ', href: '/pricing' }, { label: 'Docs', href: '#' }, { label: 'Status', href: '#' }] },
];

export default function PublicFooter() {
  return (
    <footer className="bg-[#0a0a0f] border-t border-[#1f1f2e] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          <div className="md:col-span-1">
            <div className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-3">AcademyPro</div>
            <p className="text-sm text-[#6b7280] leading-relaxed mb-6">Master the future. Learn from the best instructors in the industry.</p>
            <div className="flex gap-3">
              {[
                { label: 'Twitter', path: 'M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84' },
                { label: 'GitHub', path: 'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22' },
                { label: 'LinkedIn', path: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z' },
              ].map(s => (
                <a key={s.label} href="#" className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#1f1f2e] hover:bg-blue-500/20 text-[#6b7280] hover:text-blue-400 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
          {columns.map(col => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-[#f0f0f0] mb-4">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map(l => (
                  <li key={l.label}><Link href={l.href} className="text-sm text-[#6b7280] hover:text-[#f0f0f0] transition-colors">{l.label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-[#1f1f2e] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#6b7280]">© 2024 AcademyPro. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-[#6b7280] hover:text-[#f0f0f0]">Privacy Policy</a>
            <a href="#" className="text-sm text-[#6b7280] hover:text-[#f0f0f0]">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
