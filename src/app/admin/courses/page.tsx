'use client';
import { useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import Table from '@/components/ui/Table';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { courses } from '@/lib/data';

type Course = typeof courses[0];

const columns = [
  { header: 'Title', render: (c: Course) => <span className="font-medium text-[#f0f0f0]">{c.title}</span> },
  { header: 'Instructor', accessor: 'instructor' as const, sortable: true },
  { header: 'Level', render: (c: Course) => <Badge variant={c.level === 'Advanced' ? 'purple' : c.level === 'Intermediate' ? 'blue' : 'green'}>{c.level}</Badge> },
  { header: 'Price', render: (c: Course) => <span className="text-[#f0f0f0]">${c.price}</span> },
  { header: 'Students', accessor: 'studentsCount' as const, sortable: true },
  { header: 'Rating', render: (c: Course) => <span className="text-yellow-400">★ {c.rating}</span> },
  { header: 'Actions', render: () => (
    <div className="flex gap-2">
      <button className="text-xs text-blue-400 hover:text-blue-300 bg-blue-500/10 px-2 py-1 rounded-lg transition-colors">Edit</button>
      <button className="text-xs text-red-400 hover:text-red-300 bg-red-500/10 px-2 py-1 rounded-lg transition-colors">Delete</button>
    </div>
  )},
];

export default function AdminCoursesPage() {
  const [search, setSearch] = useState('');
  const filtered = courses.filter(c => c.title.toLowerCase().includes(search.toLowerCase()) || c.instructor.toLowerCase().includes(search.toLowerCase()));

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#f0f0f0]">Courses</h1>
          <Button size="sm">+ Add Course</Button>
        </div>

        <div className="flex gap-4">
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search courses..." className="flex-1 bg-[#0f0f1a] border border-[#1f1f2e] rounded-xl px-4 py-2.5 text-sm text-[#f0f0f0] placeholder-[#6b7280] focus:outline-none focus:border-blue-500" />
          <select className="bg-[#0f0f1a] border border-[#1f1f2e] rounded-xl px-3 py-2.5 text-sm text-[#6b7280] focus:outline-none">
            <option>All Levels</option><option>Beginner</option><option>Intermediate</option><option>Advanced</option>
          </select>
        </div>

        <Table columns={columns} data={filtered} />
      </div>
    </AdminLayout>
  );
}
