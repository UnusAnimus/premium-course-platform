import PublicLayout from '@/components/layout/PublicLayout';
import { stats } from '@/lib/data';

const team = [
  { name: 'Sarah Chen', role: 'CEO & Co-Founder', initials: 'SC', grad: 'from-blue-500 to-purple-600', bio: 'Former engineering lead at Google with 15 years building developer education platforms.' },
  { name: 'Marcus Rivera', role: 'CTO', initials: 'MR', grad: 'from-purple-500 to-pink-600', bio: 'Ex-Meta infrastructure engineer. Passionate about scalable systems and teaching.' },
  { name: 'Aisha Johnson', role: 'Head of Content', initials: 'AJ', grad: 'from-cyan-500 to-blue-600', bio: 'Author of 3 bestselling programming books. 10+ years curriculum design experience.' },
  { name: 'David Park', role: 'Head of Engineering', initials: 'DP', grad: 'from-green-500 to-cyan-600', bio: 'Previously at Stripe and Shopify. Loves distributed systems and open source.' },
];

const values = [
  { title: 'Quality First', desc: 'Every course goes through rigorous review before publication. We never compromise on quality.' },
  { title: 'Practical Learning', desc: 'Real-world projects, not toy examples. You learn by building things that matter.' },
  { title: 'Community Driven', desc: 'Our learners shape what we build. Every piece of feedback matters.' },
  { title: 'Always Evolving', desc: 'Tech moves fast. Our content is updated continuously to stay relevant.' },
];

export default function AboutPage() {
  return (
    <PublicLayout>
      <div className="min-h-screen pt-24 pb-16 bg-[#0a0a0f]">
        {/* Hero */}
        <section className="px-4 py-16 text-center max-w-4xl mx-auto">
          <span className="text-blue-400 text-sm font-medium uppercase tracking-widest">About Us</span>
          <h1 className="text-5xl sm:text-6xl font-bold text-[#f0f0f0] mt-4 mb-6">We&apos;re on a Mission to<br /><span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Democratize Tech Education</span></h1>
          <p className="text-lg text-[#6b7280] max-w-2xl mx-auto">AcademyPro was founded in 2022 by engineers who believed world-class coding education shouldn&apos;t cost $20,000. Today, we serve 48,000+ learners worldwide.</p>
        </section>

        {/* Stats */}
        <section className="px-4 py-12">
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: `${(stats.totalStudents / 1000).toFixed(0)}K+`, label: 'Students Worldwide' },
              { value: `${stats.totalCourses}+`, label: 'Expert Courses' },
              { value: `${stats.totalLessons.toLocaleString()}+`, label: 'Video Lessons' },
              { value: `${stats.avgRating}/5`, label: 'Average Rating' },
            ].map(s => (
              <div key={s.label} className="bg-[#0f0f1a] border border-[#1f1f2e] rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-[#f0f0f0] mb-1">{s.value}</div>
                <div className="text-sm text-[#6b7280]">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="px-4 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#f0f0f0]">Meet the Team</h2>
              <p className="text-[#6b7280] mt-3">Engineers who left big tech to build better education.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map(m => (
                <div key={m.name} className="bg-[#0f0f1a] border border-[#1f1f2e] rounded-2xl p-6 text-center hover:border-blue-500/30 transition-all">
                  <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${m.grad} flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4`}>{m.initials}</div>
                  <h3 className="text-[#f0f0f0] font-semibold">{m.name}</h3>
                  <p className="text-sm text-blue-400 mb-3">{m.role}</p>
                  <p className="text-xs text-[#6b7280] leading-relaxed">{m.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="px-4 py-16">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#f0f0f0]">Our Values</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {values.map(v => (
                <div key={v.title} className="bg-[#0f0f1a] border border-[#1f1f2e] rounded-2xl p-6">
                  <h3 className="text-[#f0f0f0] font-semibold mb-2">{v.title}</h3>
                  <p className="text-sm text-[#6b7280] leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
}
