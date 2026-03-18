'use client';
import AdminLayout from '@/components/layout/AdminLayout';
import Table from '@/components/ui/Table';
import Badge from '@/components/ui/Badge';
import { users, pricingPlans } from '@/lib/data';

type User = typeof users[0];

const columns = [
  { header: 'User', render: (u: User) => <span className="font-medium text-[#f0f0f0]">{u.name}</span> },
  { header: 'Email', accessor: 'email' as const },
  { header: 'Plan', render: (u: User) => <Badge variant={u.plan === 'Enterprise' ? 'purple' : u.plan === 'Pro' ? 'blue' : 'gray'}>{u.plan}</Badge> },
  { header: 'Joined', accessor: 'joinedAt' as const, sortable: true },
  { header: 'Status', render: () => <Badge variant="green">Active</Badge> },
];

const planCounts = {
  Basic: users.filter(u => u.plan === 'Basic').length,
  Pro: users.filter(u => u.plan === 'Pro').length,
  Enterprise: users.filter(u => u.plan === 'Enterprise').length,
};
const total = users.length;

export default function AdminMembershipsPage() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        <h1 className="text-2xl font-bold text-[#f0f0f0]">Memberships</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: 'Active Members', value: users.length, color: 'text-green-400', bg: 'bg-green-500/10' },
            { label: 'Cancelled (30d)', value: 3, color: 'text-red-400', bg: 'bg-red-500/10' },
            { label: 'MRR', value: '$94,320', color: 'text-blue-400', bg: 'bg-blue-500/10' },
          ].map(s => (
            <div key={s.label} className="bg-[#0f0f1a] border border-[#1f1f2e] rounded-2xl p-6">
              <div className={`text-3xl font-bold ${s.color} mb-1`}>{s.value}</div>
              <div className="text-sm text-[#6b7280]">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Plan Distribution */}
        <div className="bg-[#0f0f1a] border border-[#1f1f2e] rounded-2xl p-6">
          <h2 className="text-sm font-semibold text-[#f0f0f0] mb-6">Plan Distribution</h2>
          <div className="space-y-4">
            {Object.entries(planCounts).map(([plan, count]) => {
              const pct = Math.round((count / total) * 100);
              const planInfo = pricingPlans.find(p => p.name === plan);
              return (
                <div key={plan}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-[#f0f0f0]">{plan}</span>
                    <span className="text-sm text-[#6b7280]">{count} users ({pct}%) · ${planInfo?.price}/mo</span>
                  </div>
                  <div className="w-full bg-[#1f1f2e] rounded-full h-2">
                    <div className={`h-2 rounded-full ${plan === 'Enterprise' ? 'bg-purple-500' : plan === 'Pro' ? 'bg-blue-500' : 'bg-gray-500'}`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-[#f0f0f0] mb-4">All Members</h2>
          <Table columns={columns} data={users} />
        </div>
      </div>
    </AdminLayout>
  );
}
