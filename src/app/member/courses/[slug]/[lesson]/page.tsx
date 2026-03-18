import MemberLayout from '@/components/layout/MemberLayout';
import LessonCard from '@/components/sections/LessonCard';
import { courses, lessons } from '@/lib/data';
import Link from 'next/link';

export default function LessonPage({ params }: { params: { slug: string; lesson: string } }) {
  const course = courses.find(c => c.slug === params.slug) || courses[0];
  const courseLessons = lessons.filter(l => l.courseId === course.id);
  const currentLesson = courseLessons[0];
  const completedIds = ['1', '2'];

  return (
    <MemberLayout>
      <div className="flex flex-col xl:flex-row gap-6">
        <div className="flex-1 min-w-0">
          <div className="bg-black rounded-2xl aspect-video flex items-center justify-center mb-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black" />
            <div className="relative z-10 flex flex-col items-center gap-4">
              <button className="w-16 h-16 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all group">
                <svg className="w-7 h-7 text-white ml-1 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
              <p className="text-sm text-white/50">Click to play</p>
            </div>
          </div>

          <div className="bg-[#0f0f1a] border border-[#1f1f2e] rounded-2xl p-6 mb-4">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h1 className="text-xl font-bold text-[#f0f0f0] mb-1">{currentLesson?.title || 'Introduction to React 19'}</h1>
                <p className="text-sm text-[#6b7280]">{course.title} · Lesson {currentLesson?.order || 1}</p>
              </div>
              <span className="text-sm text-[#6b7280] shrink-0">{currentLesson?.duration || '12:30'}</span>
            </div>
            <p className="text-sm text-[#6b7280] leading-relaxed">{currentLesson?.description || 'In this lesson, we dive deep into the fundamentals.'}</p>
          </div>

          <div className="flex items-center justify-between">
            <button className="flex items-center gap-2 text-sm text-[#6b7280] hover:text-[#f0f0f0] bg-[#0f0f1a] border border-[#1f1f2e] px-4 py-2.5 rounded-xl transition-all">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              Previous
            </button>
            <div className="flex items-center gap-2 text-xs text-[#6b7280]">
              <div className="w-32 bg-[#1f1f2e] rounded-full h-1.5">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-1.5 rounded-full" style={{ width: '40%' }} />
              </div>
              <span>40%</span>
            </div>
            <button className="flex items-center gap-2 text-sm text-white bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-2.5 rounded-xl hover:from-blue-500 hover:to-blue-400 transition-all">
              Next
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>

        <div className="xl:w-80 shrink-0">
          <div className="bg-[#0f0f1a] border border-[#1f1f2e] rounded-2xl p-4 sticky top-24">
            <h2 className="text-sm font-semibold text-[#f0f0f0] mb-4 px-1">Course Outline</h2>
            <div className="space-y-2">
              {courseLessons.map(l => (
                <Link key={l.id} href={`/member/courses/${course.slug}/${l.slug}`}>
                  <LessonCard lesson={l} completed={completedIds.includes(l.id)} active={l.id === currentLesson?.id} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MemberLayout>
  );
}
