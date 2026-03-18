'use client';
import { useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import Button from '@/components/ui/Button';

export default function DesignSettingsPage() {
  const [colors, setColors] = useState({ primary: '#3b82f6', secondary: '#8b5cf6', accent: '#06b6d4', background: '#0a0a0f' });
  const [fonts, setFonts] = useState({ heading: 'Geist', body: 'Geist' });
  const [spacing, setSpacing] = useState({ padding: 24, radius: 12, gap: 16 });
  const [layout, setLayout] = useState({ sidebarLeft: true, compactMode: false });
  const [saved, setSaved] = useState(false);

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#f0f0f0]">Design Settings</h1>
          <Button onClick={handleSave} variant={saved ? 'secondary' : 'primary'}>
            {saved ? '✓ Saved!' : 'Save Changes'}
          </Button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="space-y-4">
            {/* Colors */}
            <div className="bg-[#0f0f1a] border border-[#1f1f2e] rounded-2xl p-6">
              <h2 className="text-sm font-semibold text-[#f0f0f0] mb-4">Color Palette</h2>
              <div className="space-y-4">
                {Object.entries(colors).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-[#f0f0f0] capitalize">{key}</div>
                      <div className="text-xs text-[#6b7280]">{value}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg border border-[#1f1f2e]" style={{ background: value }} />
                      <input type="color" value={value} onChange={e => setColors(c => ({ ...c, [key]: e.target.value }))} className="w-10 h-8 rounded cursor-pointer border-0 bg-transparent" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Fonts */}
            <div className="bg-[#0f0f1a] border border-[#1f1f2e] rounded-2xl p-6">
              <h2 className="text-sm font-semibold text-[#f0f0f0] mb-4">Typography</h2>
              <div className="space-y-4">
                {Object.entries(fonts).map(([key, value]) => (
                  <div key={key}>
                    <label className="text-sm text-[#f0f0f0] capitalize block mb-2">{key} Font</label>
                    <select value={value} onChange={e => setFonts(f => ({ ...f, [key]: e.target.value }))}
                      className="w-full bg-[#0a0a0f] border border-[#1f1f2e] rounded-xl px-3 py-2.5 text-sm text-[#f0f0f0] focus:outline-none focus:border-blue-500">
                      {['Geist', 'Inter', 'Roboto', 'Open Sans', 'Poppins', 'Fira Code'].map(f => <option key={f}>{f}</option>)}
                    </select>
                  </div>
                ))}
              </div>
            </div>

            {/* Spacing */}
            <div className="bg-[#0f0f1a] border border-[#1f1f2e] rounded-2xl p-6">
              <h2 className="text-sm font-semibold text-[#f0f0f0] mb-4">Spacing & Sizing</h2>
              <div className="space-y-5">
                {Object.entries(spacing).map(([key, value]) => (
                  <div key={key}>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm text-[#f0f0f0] capitalize">{key}</label>
                      <span className="text-sm text-[#6b7280]">{value}px</span>
                    </div>
                    <input type="range" min="4" max="48" value={value}
                      onChange={e => setSpacing(s => ({ ...s, [key]: parseInt(e.target.value) }))}
                      className="w-full h-1.5 bg-[#1f1f2e] rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:rounded-full" />
                  </div>
                ))}
              </div>
            </div>

            {/* Layout */}
            <div className="bg-[#0f0f1a] border border-[#1f1f2e] rounded-2xl p-6">
              <h2 className="text-sm font-semibold text-[#f0f0f0] mb-4">Layout Options</h2>
              <div className="space-y-4">
                {[
                  { key: 'sidebarLeft', label: 'Sidebar on Left', desc: 'Place navigation sidebar on the left side' },
                  { key: 'compactMode', label: 'Compact Mode', desc: 'Reduce spacing for denser layout' },
                ].map(opt => (
                  <div key={opt.key} className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-[#f0f0f0]">{opt.label}</div>
                      <div className="text-xs text-[#6b7280]">{opt.desc}</div>
                    </div>
                    <button onClick={() => setLayout(l => ({ ...l, [opt.key]: !l[opt.key as keyof typeof layout] }))}
                      className={`w-10 h-5 rounded-full relative transition-colors ${layout[opt.key as keyof typeof layout] ? 'bg-blue-500' : 'bg-[#1f1f2e]'}`}>
                      <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${layout[opt.key as keyof typeof layout] ? 'right-0.5' : 'left-0.5'}`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Live Preview */}
          <div className="bg-[#0f0f1a] border border-[#1f1f2e] rounded-2xl p-6 h-fit sticky top-24">
            <h2 className="text-sm font-semibold text-[#f0f0f0] mb-4">Live Preview</h2>
            <div className="rounded-xl overflow-hidden border border-[#1f1f2e]" style={{ background: colors.background }}>
              <div className="flex">
                {layout.sidebarLeft && (
                  <div className="w-14 border-r border-[#1f1f2e] flex flex-col items-center py-4 gap-3">
                    {[0,1,2,3].map(i => <div key={i} className="w-6 h-6 rounded" style={{ background: i === 0 ? colors.primary + '33' : '#1f1f2e' }} />)}
                  </div>
                )}
                <div className="flex-1 p-4">
                  <div className="h-6 rounded mb-3" style={{ background: colors.primary, width: '60%', borderRadius: spacing.radius / 4 }} />
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {[0,1,2,3].map(i => (
                      <div key={i} className="h-12 rounded border border-[#1f1f2e]" style={{ background: '#0f0f1a', borderRadius: spacing.radius / 4 }}>
                        <div className="h-2 rounded m-2" style={{ background: i % 2 === 0 ? colors.secondary + '44' : colors.accent + '44', width: '70%' }} />
                      </div>
                    ))}
                  </div>
                  <div className="h-8 rounded flex items-center justify-center text-white text-xs" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`, borderRadius: spacing.radius / 4, fontFamily: fonts.body }}>
                    Button Preview
                  </div>
                </div>
              </div>
            </div>
            <p className="text-xs text-[#6b7280] mt-4 text-center">Preview updates in real-time</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
