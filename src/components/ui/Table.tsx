'use client';
import { useState, ReactNode } from 'react';

interface Column<T> {
  header: string;
  accessor?: keyof T;
  render?: (row: T) => ReactNode;
  sortable?: boolean;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  className?: string;
}

export default function Table<T extends Record<string, unknown>>({ columns, data, className = '' }: TableProps<T>) {
  const [sortCol, setSortCol] = useState<keyof T | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const handleSort = (col: Column<T>) => {
    if (!col.sortable || !col.accessor) return;
    if (sortCol === col.accessor) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortCol(col.accessor);
      setSortDir('asc');
    }
  };

  const sorted = [...data].sort((a, b) => {
    if (!sortCol) return 0;
    const av = a[sortCol]; const bv = b[sortCol];
    if (av === bv) return 0;
    const cmp = String(av) < String(bv) ? -1 : 1;
    return sortDir === 'asc' ? cmp : -cmp;
  });

  return (
    <div className={`overflow-x-auto rounded-xl border border-[#1f1f2e] ${className}`}>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[#1f1f2e] bg-[#0f0f1a]">
            {columns.map((col, i) => (
              <th key={i} onClick={() => handleSort(col)}
                className={`px-4 py-3 text-left text-[#6b7280] font-medium ${col.sortable ? 'cursor-pointer hover:text-[#f0f0f0]' : ''}`}>
                <span className="flex items-center gap-1">
                  {col.header}
                  {col.sortable && sortCol === col.accessor && (
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sortDir === 'asc' ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'} />
                    </svg>
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, ri) => (
            <tr key={ri} className={`border-b border-[#1f1f2e] ${ri % 2 === 0 ? 'bg-[#0a0a0f]' : 'bg-[#0d0d16]'} hover:bg-[#1f1f2e]/40 transition-colors`}>
              {columns.map((col, ci) => (
                <td key={ci} className="px-4 py-3 text-[#f0f0f0]">
                  {col.render ? col.render(row) : col.accessor ? String(row[col.accessor] ?? '') : ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
