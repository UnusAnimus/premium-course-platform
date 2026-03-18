'use client';
import AdminLayout from '@/components/layout/AdminLayout';
import Table from '@/components/ui/Table';
import { users } from '@/lib/data';
import Badge from '@/components/ui/Badge';

const statCards = [
  { label: 'Total Users', value: '48,200', change: '+12%', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { label: 'Monthly Revenue', value: '$94,320', change: '+8%', color: 'text-green-400', bg: 'bg-green-500/10' },
  { label: 'Active Courses', value: '120', change: '+3', color: 'text-purple-400', bg: 'bg-purple-500/10' },
  { label: 'Completion Rate', value: '73%', change: '+2%', color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
];

const columns = [
  { header: 'Name', accessor: 'name' as const, sortable: true },
  { header: 'Email', accessor: 'email' as const },
  { header: 'Plan', render: (u: typeof users[0]) => <Badge variant={u.plan === 'Enterprise' ? 'purple' : u.plan === 'Pro' ? 'blue' : 'gray'}>{u.plan}</Badge> },
  { header: 'Courses', accessor: 'coursesEnrolled' as const, sortable: true },
  { header: 'Progress', render: (u: typeof users[0]) => (
    <div className="flex items-center gap-2">
      <div className="w-16 bg-[#1f1f2e] rounded-full h-1.5">
        <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${u.progress}%` }} />
      </div>
      <span className="text-xs text-[#6b7280]">{u.progress}%</span>
    </div>
  )},
];

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#f0f0f0]">Admin Dashboard</h1>
            <p className="text-[#6b7280] mt-1">Overview of your platform.</p>
          </div>
          <div className="text-xs text-[#6b7280] bg-[#0f0f1a] border border-[#1f1f2e] px-3 py-2 rounded-xl">
            Last updated: just now
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map(s => (
            <div key={s.label} className="bg-[#0f0f1a] border border-[#1f1f2e] rounded-2xl p-5">
              <div className={`text-xs font-medium ${s.color} ${s.bg} px-2 py-1 rounded-lg inline-block mb-3`}>{s.change}</div>
              <div className="text-2xl font-bold text-[#f0f0f0]">{s.value}</div>
              <div className="text-xs text-[#6b7280] mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-lg font-semibold text-[#f0f0f0] mb-4">Recent Users</h2>
          <Table columns={columns} data={users.slice(0, 5)} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#0f0f1a] border border-[#1f1f2e] rounded-2xl p-6">
            <h2 className="text-sm font-semibold text-[#f0f0f0] mb-4">Recent Enrollments</h2>
            <div className="space-y-3">
              {users.slice(0, 4).map(u => (
                <div key={u.id} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                    {u.name.slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#f0f0f0]">{u.name}</p>
                    <p className="text-xs text-[#6b7280]">Enrolled in React 19 Mastery</p>
                  </div>
                  <span className="text-xs text-[#6b7280]">{u.joinedAt}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#0f0f1a] border border-[#1f1f2e] rounded-2xl p-6">
            <h2 className="text-sm font-semibold text-[#f0f0f0] mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              {['Add Course', 'Add Lesson', 'Invite User', 'Send Email', 'View Reports', 'Export Data'].map(a => (
                <button key={a} className="text-sm text-[#6b7280] hover:text-[#f0f0f0] bg-[#0a0a0f] hover:bg-[#1f1f2e] border border-[#1f1f2e] px-3 py-2.5 rounded-xl transition-all text-left">
                  {a}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
