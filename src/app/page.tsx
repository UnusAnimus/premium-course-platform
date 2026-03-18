import PublicLayout from '@/components/layout/PublicLayout';
import HeroSection from '@/components/sections/HeroSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import PricingSection from '@/components/sections/PricingSection';
import CourseCard from '@/components/sections/CourseCard';
import { courses } from '@/lib/data';
import Link from 'next/link';

export default function HomePage() {
  const featured = courses.filter(c => c.featured).slice(0, 3);

  return (
    <PublicLayout>
      <HeroSection />
      <FeaturesSection />

      {/* Popular Courses */}
      <section className="py-24 px-4 bg-[#0a0a0f]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-blue-400 text-sm font-medium uppercase tracking-widest">Courses</span>
              <h2 className="text-4xl font-bold text-[#f0f0f0] mt-2">Popular Courses</h2>
            </div>
            <Link href="/courses" className="text-sm text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1">
              View all
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map(course => <CourseCard key={course.id} course={course} />)}
          </div>
        </div>
      </section>

      <TestimonialsSection />
      <PricingSection />

      {/* CTA Section */}
      <section className="py-24 px-4 bg-[#0a0a0f]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-blue-500/20 rounded-3xl p-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-[#f0f0f0] mb-6">Ready to Level Up?</h2>
            <p className="text-[#6b7280] text-lg mb-10 max-w-xl mx-auto">Join 48,000+ developers who are already mastering the skills of tomorrow.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/member/login" className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-medium px-8 py-4 rounded-xl transition-all shadow-lg shadow-blue-500/20">
                Start Learning Free
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
              </Link>
              <Link href="/pricing" className="inline-flex items-center justify-center gap-2 border border-[#1f1f2e] hover:border-blue-500/50 text-[#f0f0f0] font-medium px-8 py-4 rounded-xl transition-all">
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
