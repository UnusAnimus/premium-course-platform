import PublicLayout from '@/components/layout/PublicLayout';
import CourseCard from '@/components/sections/CourseCard';
import { courses } from '@/lib/data';

const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];
const categories = ['All', 'React', 'Next.js', 'TypeScript', 'DevOps', 'Python', 'Web3'];

export default function CoursesPage() {
  return (
    <PublicLayout>
      <div className="min-h-screen pt-24 pb-16 px-4 bg-[#0a0a0f]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-[#f0f0f0] mb-4">All Courses</h1>
            <p className="text-[#6b7280] text-lg max-w-2xl mx-auto">Browse our complete library of expert-led courses. Filter by category, level, or price.</p>
          </div>

          {/* Filter Bar */}
          <div className="bg-[#0f0f1a] border border-[#1f1f2e] rounded-2xl p-4 mb-10 flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-48">
              <input type="text" placeholder="Search courses..." className="w-full bg-[#0a0a0f] border border-[#1f1f2e] rounded-xl px-4 py-2.5 text-sm text-[#f0f0f0] placeholder-[#6b7280] focus:outline-none focus:border-blue-500" />
            </div>
            <div className="flex gap-2 flex-wrap">
              <select className="bg-[#0a0a0f] border border-[#1f1f2e] rounded-xl px-3 py-2.5 text-sm text-[#6b7280] focus:outline-none focus:border-blue-500">
                {categories.map(c => <option key={c}>{c}</option>)}
              </select>
              <select className="bg-[#0a0a0f] border border-[#1f1f2e] rounded-xl px-3 py-2.5 text-sm text-[#6b7280] focus:outline-none focus:border-blue-500">
                {levels.map(l => <option key={l}>{l}</option>)}
              </select>
              <select className="bg-[#0a0a0f] border border-[#1f1f2e] rounded-xl px-3 py-2.5 text-sm text-[#6b7280] focus:outline-none focus:border-blue-500">
                <option>Any Price</option>
                <option>Under $100</option>
                <option>$100-$150</option>
                <option>$150+</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-[#6b7280]">Showing <span className="text-[#f0f0f0]">{courses.length}</span> courses</p>
            <select className="bg-[#0f0f1a] border border-[#1f1f2e] rounded-xl px-3 py-2 text-sm text-[#6b7280] focus:outline-none">
              <option>Most Popular</option>
              <option>Newest</option>
              <option>Price: Low to High</option>
              <option>Highest Rated</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {courses.map(course => <CourseCard key={course.id} course={course} />)}
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
