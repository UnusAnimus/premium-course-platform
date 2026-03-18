'use client';
import { useState } from 'react';
import PublicLayout from '@/components/layout/PublicLayout';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <PublicLayout>
      <div className="min-h-screen pt-24 pb-16 px-4 bg-[#0a0a0f]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-blue-400 text-sm font-medium uppercase tracking-widest">Contact</span>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#f0f0f0] mt-3 mb-4">Get in Touch</h1>
            <p className="text-[#6b7280] max-w-xl mx-auto">Have a question or need help? We&apos;d love to hear from you.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Form */}
            <div className="lg:col-span-3 bg-[#0f0f1a] border border-[#1f1f2e] rounded-2xl p-8">
              {sent ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h3 className="text-xl font-semibold text-[#f0f0f0] mb-2">Message Sent!</h3>
                  <p className="text-[#6b7280]">We&apos;ll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form className="space-y-5" onSubmit={e => { e.preventDefault(); setSent(true); }}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input label="First Name" placeholder="John" type="text" required />
                    <Input label="Last Name" placeholder="Doe" type="text" required />
                  </div>
                  <Input label="Email" placeholder="john@example.com" type="email" required />
                  <Input label="Subject" placeholder="How can we help?" type="text" required />
                  <Input label="Message" placeholder="Tell us more..." textarea rows={5} required />
                  <Button type="submit" size="lg" className="w-full justify-center">Send Message</Button>
                </form>
              )}
            </div>

            {/* Info Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              {[
                { icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', title: 'Email', lines: ['support@academypro.com', 'enterprise@academypro.com'] },
                { icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z', title: 'Phone', lines: ['+1 (555) 123-4567', 'Mon-Fri, 9am-6pm PST'] },
                { icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z', title: 'Office', lines: ['123 Learning Lane', 'San Francisco, CA 94105'] },
              ].map(info => (
                <div key={info.title} className="bg-[#0f0f1a] border border-[#1f1f2e] rounded-2xl p-6 flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={info.icon} /></svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#f0f0f0] mb-1">{info.title}</h3>
                    {info.lines.map(l => <p key={l} className="text-sm text-[#6b7280]">{l}</p>)}
                  </div>
                </div>
              ))}

              {/* Map placeholder */}
              <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-[#1f1f2e] rounded-2xl h-48 flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-10 h-10 text-blue-400/50 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
                  <p className="text-xs text-[#6b7280]">Map Placeholder</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
