'use client';
import { ReactNode, useState } from 'react';

interface Tab {
  label: string;
  content: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultIndex?: number;
  value?: number;
  onChange?: (index: number) => void;
}

export default function Tabs({ tabs, defaultIndex = 0, value, onChange }: TabsProps) {
  const [internal, setInternal] = useState(defaultIndex);
  const active = value !== undefined ? value : internal;

  const handleClick = (i: number) => {
    if (value === undefined) setInternal(i);
    onChange?.(i);
  };

  return (
    <div>
      <div className="flex border-b border-[#1f1f2e] gap-1 mb-6" role="tablist">
        {tabs.map((tab, i) => (
          <button key={i} onClick={() => handleClick(i)}
            role="tab"
            aria-selected={active === i}
            aria-label={tab.label}
            className={`px-4 py-2.5 text-sm font-medium transition-all border-b-2 -mb-px ${
              active === i
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-[#6b7280] hover:text-[#f0f0f0]'
            }`}>
            {tab.label}
          </button>
        ))}
      </div>
      <div>{tabs[active]?.content}</div>
    </div>
  );
}
