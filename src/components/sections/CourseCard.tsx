import Link from 'next/link';
import Badge from '@/components/ui/Badge';

interface Course {
  id: string; slug: string; title: string; description: string;
  lessonsCount: number; price: number; instructor: string; thumbnail: string;
  duration: string; level: string; rating: number; studentsCount: number;
  tags: string[]; featured: boolean;
}

const levelVariants: Record<string, 'blue' | 'purple' | 'cyan' | 'green'> = {
  Beginner: 'green', Intermediate: 'blue', Advanced: 'purple',
};

export default function CourseCard({ course }: { course: Course }) {
  return (
    <div className="bg-[#0f0f1a] border border-[#1f1f2e] rounded-2xl overflow-hidden hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 group flex flex-col">
      <div className="h-44 bg-gradient-to-br from-blue-900/50 to-purple-900/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 group-hover:from-blue-600/30 group-hover:to-purple-600/30 transition-all" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-4xl font-bold text-white/10">{course.title.slice(0, 2)}</div>
        </div>
        {course.featured && (
          <div className="absolute top-3 left-3">
            <Badge variant="cyan" size="sm">Featured</Badge>
          </div>
        )}
        <div className="absolute top-3 right-3">
          <Badge variant={levelVariants[course.level] || 'blue'} size="sm">{course.level}</Badge>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-base font-semibold text-[#f0f0f0] mb-2 group-hover:text-blue-400 transition-colors line-clamp-1">{course.title}</h3>
        <p className="text-sm text-[#6b7280] mb-4 line-clamp-2 flex-1">{course.description}</p>

        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
            {course.instructor.slice(0, 1)}
          </div>
          <span className="text-xs text-[#6b7280]">{course.instructor}</span>
        </div>

        <div className="flex items-center gap-3 text-xs text-[#6b7280] mb-4">
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
            {course.rating}
          </span>
          <span>·</span>
          <span>{course.lessonsCount} lessons</span>
          <span>·</span>
          <span>{course.duration}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-[#f0f0f0]">${course.price}</span>
          <Link href={`/courses/${course.slug}`} className="text-sm font-medium bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 px-4 py-1.5 rounded-lg transition-colors">
            Enroll
          </Link>
        </div>
      </div>
    </div>
  );
}
