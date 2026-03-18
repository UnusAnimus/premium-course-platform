'use client';
import { useState } from 'react';
import MemberLayout from '@/components/layout/MemberLayout';
import { courses } from '@/lib/data';
import Link from 'next/link';

const tabs = ['All', 'In Progress', 'Completed'];
const progresses = [78, 45, 100, 20, 0, 60];

export default function MemberCoursesPage() {
  const [activeTab, setActiveTab] = useState(0);

  const filtered = courses.slice(0, 6).filter((_, i) => {
    if (activeTab === 0) return true;
    if (activeTab === 1) return progresses[i] > 0 && progresses[i] < 100;
    return progresses[i] === 100;
  });

  return (
    <MemberLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-[#f0f0f0]">My Courses</h1>

        <div className="flex border-b border-[#1f1f2e] gap-1">
          {tabs.map((t, i) => (
            <button key={t} onClick={() => setActiveTab(i)}
              className={`px-4 py-2.5 text-sm font-medium transition-all border-b-2 -mb-px ${activeTab === i ? 'border-blue-500 text-blue-400' : 'border-transparent text-[#6b7280] hover:text-[#f0f0f0]'}`}>
              {t}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-[#6b7280]">No courses found in this category.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map((course, i) => {
              const progress = progresses[i] ?? 0;
              return (
                <div key={course.id} className="bg-[#0f0f1a] border border-[#1f1f2e] rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all">
                  <div className="h-32 bg-gradient-to-br from-blue-900/40 to-purple-900/40 relative flex items-center justify-center">
                    <span className="text-5xl font-bold text-white/10">{course.title.slice(0, 2)}</span>
                    {progress === 100 && (
                      <div className="absolute top-3 right-3 bg-green-500/20 text-green-400 text-xs font-bold border border-green-500/30 px-2 py-0.5 rounded-full">Completed</div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="text-sm font-semibold text-[#f0f0f0] mb-1">{course.title}</h3>
                    <p className="text-xs text-[#6b7280] mb-4">by {course.instructor}</p>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex-1 bg-[#1f1f2e] rounded-full h-1.5">
                        <div className={`h-1.5 rounded-full ${progress === 100 ? 'bg-green-500' : 'bg-gradient-to-r from-blue-500 to-purple-500'}`} style={{ width: `${progress}%` }} />
                      </div>
                      <span className="text-xs text-[#6b7280]">{progress}%</span>
                    </div>
                    <Link href={`/member/courses/${course.slug}/lesson-1`} className="w-full flex items-center justify-center text-sm font-medium bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 py-2 rounded-xl transition-colors">
                      {progress === 100 ? 'Review Course' : progress > 0 ? 'Continue' : 'Start Course'}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </MemberLayout>
  );
}
