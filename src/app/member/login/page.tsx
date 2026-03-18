'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function LoginPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);
    const particles: Array<{ x: number; y: number; vx: number; vy: number; r: number; o: number }> = [];
    for (let i = 0; i < 50; i++) particles.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4, r: Math.random() * 1.5 + 0.5, o: Math.random() * 0.4 + 0.1 });
    let id: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139,92,246,${p.o})`; ctx.fill();
      });
      id = requestAnimationFrame(draw);
    };
    draw();
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(id); };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex relative overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Left Brand Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative z-10 flex-col justify-between p-12 bg-gradient-to-br from-blue-900/50 to-purple-900/50 border-r border-[#1f1f2e]">
        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">AcademyPro</Link>
        <div>
          <h1 className="text-4xl font-bold text-[#f0f0f0] mb-4">Master the Future.<br />Learn from the Best.</h1>
          <p className="text-[#6b7280] mb-10">Join 48,000+ developers learning cutting-edge skills from industry experts.</p>
          <div className="bg-[#0f0f1a]/80 border border-[#1f1f2e] rounded-2xl p-6">
            <div className="flex items-center gap-1 mb-3">
              {[1,2,3,4,5].map(s => <svg key={s} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>)}
            </div>
            <p className="text-sm text-[#6b7280] italic mb-4">&ldquo;AcademyPro got me my dream job at a FAANG company. The React course is incredibly detailed.&rdquo;</p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">SM</div>
              <div><div className="text-sm font-medium text-[#f0f0f0]">Sarah Mitchell</div><div className="text-xs text-[#6b7280]">Senior Engineer at Google</div></div>
            </div>
          </div>
        </div>
        <div className="flex gap-6 text-sm text-[#6b7280]">
          <span>48K+ Students</span><span>·</span><span>120+ Courses</span><span>·</span><span>4.8★ Rating</span>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="flex-1 relative z-10 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 text-center">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">AcademyPro</Link>
          </div>
          <div className="bg-[#0f0f1a]/90 backdrop-blur-md border border-[#1f1f2e] rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-[#f0f0f0] mb-2">Welcome back</h2>
            <p className="text-[#6b7280] text-sm mb-8">Sign in to continue your learning journey.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input label="Email" type="email" placeholder="you@example.com" required
                prefixIcon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" /></svg>} />
              <Input label="Password" type="password" placeholder="••••••••" required
                prefixIcon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>} />

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-[#6b7280] cursor-pointer">
                  <input type="checkbox" className="rounded border-[#1f1f2e] bg-[#0a0a0f]" />
                  Remember me
                </label>
                <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">Forgot password?</a>
              </div>

              <Button type="submit" loading={loading} size="lg" className="w-full justify-center mt-2">Sign In</Button>
            </form>

            <div className="mt-6 text-center text-sm text-[#6b7280]">
              Don&apos;t have an account?{' '}
              <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">Sign up free</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
