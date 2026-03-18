import { testimonials } from '@/lib/data';

const gradients = ['from-blue-500 to-purple-600', 'from-purple-500 to-pink-600', 'from-cyan-500 to-blue-600', 'from-green-500 to-cyan-600', 'from-orange-500 to-red-600', 'from-pink-500 to-rose-600'];

export default function TestimonialsSection() {
  return (
    <section className="py-24 px-4 bg-[#0a0a0f]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-purple-400 text-sm font-medium uppercase tracking-widest">Testimonials</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#f0f0f0] mt-3 mb-4">Loved by Thousands</h2>
          <p className="text-[#6b7280] max-w-2xl mx-auto">Don&apos;t take our word for it. Hear from engineers who transformed their careers with AcademyPro.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={t.id} className="bg-[#0f0f1a] border border-[#1f1f2e] rounded-2xl p-6 hover:border-purple-500/30 transition-all duration-300">
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, s) => (
                  <svg key={s} className={`w-4 h-4 ${s < t.rating ? 'text-yellow-400' : 'text-[#1f1f2e]'}`} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-[#6b7280] leading-relaxed mb-6">&ldquo;{t.content}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${gradients[i % gradients.length]} flex items-center justify-center text-white text-sm font-bold`}>
                  {t.avatar}
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#f0f0f0]">{t.name}</div>
                  <div className="text-xs text-[#6b7280]">{t.role} at {t.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
