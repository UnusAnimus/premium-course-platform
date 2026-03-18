import MemberLayout from '@/components/layout/MemberLayout';
import { courses, lessons } from '@/lib/data';

const statCards = [
  { label: 'Courses Enrolled', value: '4', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { label: 'Lessons Completed', value: '28', icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z', color: 'text-green-400', bg: 'bg-green-500/10' },
  { label: 'Hours Learned', value: '42h', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', color: 'text-purple-400', bg: 'bg-purple-500/10' },
  { label: 'Day Streak', value: '7🔥', icon: 'M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z', color: 'text-orange-400', bg: 'bg-orange-500/10' },
];

const activity = [
  { text: 'Completed lesson "Server Actions" in Next.js Full-Stack', time: '2 hours ago' },
  { text: 'Started course "TypeScript Pro Patterns"', time: 'Yesterday' },
  { text: 'Earned certificate for "React 19 Mastery"', time: '3 days ago' },
  { text: 'Completed 5-lesson streak', time: '1 week ago' },
];

export default function MemberDashboard() {
  const enrolledCourses = courses.slice(0, 3);
  const upcomingLessons = lessons.slice(0, 3);

  return (
    <MemberLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-[#f0f0f0]">Welcome back, Alice! 👋</h1>
          <p className="text-[#6b7280] mt-1">You&apos;re on a 7-day streak. Keep it up!</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map(s => (
            <div key={s.label} className="bg-[#0f0f1a] border border-[#1f1f2e] rounded-2xl p-5">
              <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center mb-3`}>
                <svg className={`w-5 h-5 ${s.color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={s.icon} /></svg>
              </div>
              <div className="text-2xl font-bold text-[#f0f0f0]">{s.value}</div>
              <div className="text-xs text-[#6b7280] mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Continue Learning */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-semibold text-[#f0f0f0] mb-4">Continue Learning</h2>
            <div className="space-y-4">
              {enrolledCourses.map((c, i) => {
                const progress = [78, 45, 20][i];
                return (
                  <div key={c.id} className="bg-[#0f0f1a] border border-[#1f1f2e] rounded-2xl p-5 flex gap-4 hover:border-blue-500/30 transition-all">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-600/30 to-purple-600/30 flex items-center justify-center shrink-0 text-2xl font-bold text-white/20">
                      {c.title.slice(0, 2)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-[#f0f0f0] mb-1">{c.title}</h3>
                      <p className="text-xs text-[#6b7280] mb-3">by {c.instructor}</p>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-[#1f1f2e] rounded-full h-1.5">
                          <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-1.5 rounded-full" style={{ width: `${progress}%` }} />
                        </div>
                        <span className="text-xs text-[#6b7280] shrink-0">{progress}%</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="text-lg font-semibold text-[#f0f0f0] mb-4">Recent Activity</h2>
            <div className="bg-[#0f0f1a] border border-[#1f1f2e] rounded-2xl p-5 space-y-4">
              {activity.map((a, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 shrink-0" />
                  <div>
                    <p className="text-xs text-[#f0f0f0] leading-relaxed">{a.text}</p>
                    <span className="text-xs text-[#6b7280]">{a.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Lessons */}
        <div>
          <h2 className="text-lg font-semibold text-[#f0f0f0] mb-4">Upcoming Lessons</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {upcomingLessons.map(l => (
              <div key={l.id} className="bg-[#0f0f1a] border border-[#1f1f2e] rounded-2xl p-4 hover:border-blue-500/30 transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-blue-500/10 rounded-lg flex items-center justify-center">
                    <svg className="w-3 h-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /></svg>
                  </div>
                  <span className="text-xs text-[#6b7280]">{l.duration}</span>
                </div>
                <h4 className="text-sm font-medium text-[#f0f0f0]">{l.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MemberLayout>
  );
}
