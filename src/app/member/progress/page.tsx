import MemberLayout from '@/components/layout/MemberLayout';

const weeklyActivity = [
  { day: 'Mon', minutes: 45 }, { day: 'Tue', minutes: 90 }, { day: 'Wed', minutes: 30 },
  { day: 'Thu', minutes: 120 }, { day: 'Fri', minutes: 75 }, { day: 'Sat', minutes: 0 }, { day: 'Sun', minutes: 60 },
];
const maxMinutes = Math.max(...weeklyActivity.map(d => d.minutes));
const CHART_HEIGHT = 128;
const BAR_MAX_HEIGHT = 96;

const courseProgress = [
  { title: 'React 19 Mastery', progress: 78, lessons: 33, total: 42 },
  { title: 'Next.js Full-Stack', progress: 45, lessons: 17, total: 38 },
  { title: 'TypeScript Pro Patterns', progress: 20, lessons: 6, total: 28 },
  { title: 'System Design Fundamentals', progress: 60, lessons: 19, total: 32 },
];

const achievements = [
  { title: 'First Lesson', desc: 'Completed your first lesson', unlocked: true, icon: '🎯' },
  { title: '7-Day Streak', desc: 'Studied 7 days in a row', unlocked: true, icon: '🔥' },
  { title: 'Course Complete', desc: 'Finished your first course', unlocked: true, icon: '🏆' },
  { title: 'Speed Learner', desc: 'Complete 5 lessons in a day', unlocked: false, icon: '⚡' },
  { title: 'Night Owl', desc: 'Study after midnight', unlocked: false, icon: '🦉' },
  { title: 'Perfectionist', desc: 'Score 100% on a quiz', unlocked: false, icon: '💎' },
];

export default function ProgressPage() {
  return (
    <MemberLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-[#f0f0f0]">My Progress</h1>
          <p className="text-[#6b7280] mt-1">Track your learning journey.</p>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Hours', value: '42h' }, { label: 'Lessons Done', value: '75' },
            { label: 'Certificates', value: '1' }, { label: 'Current Streak', value: '7 days' },
          ].map(s => (
            <div key={s.label} className="bg-[#0f0f1a] border border-[#1f1f2e] rounded-2xl p-5 text-center">
              <div className="text-2xl font-bold text-[#f0f0f0]">{s.value}</div>
              <div className="text-xs text-[#6b7280] mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Weekly Activity Chart */}
        <div className="bg-[#0f0f1a] border border-[#1f1f2e] rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-[#f0f0f0] mb-6">Weekly Activity</h2>
        <div className="flex items-end gap-3" style={{ height: `${CHART_HEIGHT}px` }}>
            {weeklyActivity.map(d => {
              const barHeight = maxMinutes > 0 ? Math.round((d.minutes / maxMinutes) * BAR_MAX_HEIGHT) : 0;
              return (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex items-end justify-center" style={{ height: `${BAR_MAX_HEIGHT}px` }}>
                    <div className="w-full rounded-t-lg bg-gradient-to-t from-blue-600 to-blue-400 transition-all"
                      style={{ height: `${barHeight}px`, minHeight: d.minutes > 0 ? '8px' : '2px', opacity: d.minutes === 0 ? 0.2 : 1 }} />
                  </div>
                  <span className="text-xs text-[#6b7280]">{d.day}</span>
                </div>
              );
            })}
          </div>
          <div className="mt-4 text-xs text-[#6b7280] text-right">{weeklyActivity.reduce((a, b) => a + b.minutes, 0)} min this week</div>
        </div>

        {/* Course Progress */}
        <div>
          <h2 className="text-lg font-semibold text-[#f0f0f0] mb-4">Course Progress</h2>
          <div className="space-y-3">
            {courseProgress.map(c => (
              <div key={c.title} className="bg-[#0f0f1a] border border-[#1f1f2e] rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-[#f0f0f0]">{c.title}</h3>
                  <span className="text-xs text-[#6b7280]">{c.lessons}/{c.total} lessons</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-[#1f1f2e] rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all" style={{ width: `${c.progress}%` }} />
                  </div>
                  <span className="text-sm font-medium text-[#f0f0f0] w-10 text-right">{c.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div>
          <h2 className="text-lg font-semibold text-[#f0f0f0] mb-4">Achievements</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {achievements.map(a => (
              <div key={a.title} className={`bg-[#0f0f1a] border rounded-2xl p-4 text-center ${a.unlocked ? 'border-blue-500/30' : 'border-[#1f1f2e] opacity-50'}`}>
                <div className="text-3xl mb-2">{a.icon}</div>
                <div className="text-xs font-medium text-[#f0f0f0]">{a.title}</div>
                <div className="text-xs text-[#6b7280] mt-1 leading-tight">{a.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MemberLayout>
  );
}
