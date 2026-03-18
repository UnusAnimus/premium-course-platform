'use client';
import { useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import Table from '@/components/ui/Table';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { lessons, courses } from '@/lib/data';

type Lesson = typeof lessons[0];

const getCourseTitle = (courseId: string) => courses.find(c => c.id === courseId)?.title || 'Unknown';

const columns = [
  { header: '#', accessor: 'order' as const, sortable: true },
  { header: 'Title', render: (l: Lesson) => <span className="font-medium text-[#f0f0f0]">{l.title}</span> },
  { header: 'Course', render: (l: Lesson) => <span className="text-sm text-[#6b7280]">{getCourseTitle(l.courseId)}</span> },
  { header: 'Duration', accessor: 'duration' as const },
  { header: 'Access', render: (l: Lesson) => <Badge variant={l.isFree ? 'green' : 'gray'}>{l.isFree ? 'Free' : 'Paid'}</Badge> },
  { header: 'Actions', render: () => (
    <div className="flex gap-2">
      <button className="text-xs text-blue-400 bg-blue-500/10 px-2 py-1 rounded-lg">Edit</button>
      <button className="text-xs text-red-400 bg-red-500/10 px-2 py-1 rounded-lg">Delete</button>
    </div>
  )},
];

export default function AdminLessonsPage() {
  const [search, setSearch] = useState('');
  const filtered = lessons.filter(l => l.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#f0f0f0]">Lessons</h1>
          <Button size="sm">+ Add Lesson</Button>
        </div>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search lessons..." className="w-full max-w-sm bg-[#0f0f1a] border border-[#1f1f2e] rounded-xl px-4 py-2.5 text-sm text-[#f0f0f0] placeholder-[#6b7280] focus:outline-none focus:border-blue-500" />
        <Table columns={columns} data={filtered} />
      </div>
    </AdminLayout>
  );
}
