'use client';
import { useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import Table from '@/components/ui/Table';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { users } from '@/lib/data';

type User = typeof users[0];

const columns = [
  { header: 'Name', render: (u: User) => (
    <div className="flex items-center gap-2">
      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">{u.name.slice(0, 2)}</div>
      <span className="font-medium text-[#f0f0f0]">{u.name}</span>
    </div>
  )},
  { header: 'Email', accessor: 'email' as const },
  { header: 'Plan', render: (u: User) => <Badge variant={u.plan === 'Enterprise' ? 'purple' : u.plan === 'Pro' ? 'blue' : 'gray'}>{u.plan}</Badge> },
  { header: 'Joined', accessor: 'joinedAt' as const, sortable: true },
  { header: 'Courses', accessor: 'coursesEnrolled' as const, sortable: true },
  { header: 'Last Active', accessor: 'lastActive' as const, sortable: true },
  { header: 'Actions', render: () => (
    <div className="flex gap-2">
      <button className="text-xs text-blue-400 bg-blue-500/10 px-2 py-1 rounded-lg">Edit</button>
      <button className="text-xs text-red-400 bg-red-500/10 px-2 py-1 rounded-lg">Ban</button>
    </div>
  )},
];

export default function AdminUsersPage() {
  const [search, setSearch] = useState('');
  const filtered = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#f0f0f0]">Users</h1>
          <Button size="sm">+ Invite User</Button>
        </div>
        <div className="flex gap-4">
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users..." className="flex-1 bg-[#0f0f1a] border border-[#1f1f2e] rounded-xl px-4 py-2.5 text-sm text-[#f0f0f0] placeholder-[#6b7280] focus:outline-none focus:border-blue-500" />
          <select className="bg-[#0f0f1a] border border-[#1f1f2e] rounded-xl px-3 py-2.5 text-sm text-[#6b7280] focus:outline-none">
            <option>All Plans</option><option>Basic</option><option>Pro</option><option>Enterprise</option>
          </select>
        </div>
        <Table columns={columns} data={filtered} />
      </div>
    </AdminLayout>
  );
}
