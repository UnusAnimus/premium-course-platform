'use client';
import { useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Tabs from '@/components/ui/Tabs';

function GeneralTab() {
  return (
    <div className="space-y-5 max-w-lg">
      <Input label="Site Name" defaultValue="AcademyPro" />
      <Input label="Site Description" defaultValue="Premium Learning Platform" textarea rows={3} />
      <Input label="Logo URL" placeholder="https://..." type="url" />
      <Input label="Support Email" defaultValue="support@academypro.com" type="email" />
      <Button>Save Changes</Button>
    </div>
  );
}

function EmailTab() {
  return (
    <div className="space-y-5 max-w-lg">
      <Input label="SMTP Host" placeholder="smtp.example.com" />
      <Input label="SMTP Port" placeholder="587" type="number" />
      <Input label="SMTP Username" placeholder="noreply@academypro.com" />
      <Input label="SMTP Password" type="password" placeholder="••••••••" />
      <Input label="From Name" defaultValue="AcademyPro" />
      <Button>Save Email Settings</Button>
    </div>
  );
}

function SecurityTab() {
  return (
    <div className="space-y-5 max-w-lg">
      <div className="bg-[#0a0a0f] border border-[#1f1f2e] rounded-xl p-4 space-y-3">
        {['Two-Factor Authentication', 'Login Attempt Limit', 'Session Timeout'].map(item => (
          <div key={item} className="flex items-center justify-between">
            <span className="text-sm text-[#f0f0f0]">{item}</span>
            <button className="w-10 h-5 bg-blue-500 rounded-full relative">
              <span className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full" />
            </button>
          </div>
        ))}
      </div>
      <Input label="Max Login Attempts" defaultValue="5" type="number" />
      <Input label="Session Timeout (minutes)" defaultValue="60" type="number" />
      <Button>Save Security Settings</Button>
    </div>
  );
}

function IntegrationsTab() {
  return (
    <div className="space-y-4 max-w-lg">
      {[
        { name: 'Stripe', desc: 'Payment processing', status: true },
        { name: 'SendGrid', desc: 'Email delivery', status: true },
        { name: 'Intercom', desc: 'Customer support', status: false },
        { name: 'Google Analytics', desc: 'Analytics tracking', status: false },
      ].map(int => (
        <div key={int.name} className="flex items-center justify-between bg-[#0a0a0f] border border-[#1f1f2e] rounded-xl p-4">
          <div>
            <div className="text-sm font-medium text-[#f0f0f0]">{int.name}</div>
            <div className="text-xs text-[#6b7280]">{int.desc}</div>
          </div>
          <button className={`w-10 h-5 rounded-full relative transition-colors ${int.status ? 'bg-blue-500' : 'bg-[#1f1f2e]'}`}>
            <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${int.status ? 'right-0.5' : 'left-0.5'}`} />
          </button>
        </div>
      ))}
    </div>
  );
}

export default function AdminSettingsPage() {
  const tabs = [
    { label: 'General', content: <GeneralTab /> },
    { label: 'Email', content: <EmailTab /> },
    { label: 'Security', content: <SecurityTab /> },
    { label: 'Integrations', content: <IntegrationsTab /> },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-[#f0f0f0]">Settings</h1>
        <div className="bg-[#0f0f1a] border border-[#1f1f2e] rounded-2xl p-6">
          <Tabs tabs={tabs} />
        </div>
      </div>
    </AdminLayout>
  );
}
