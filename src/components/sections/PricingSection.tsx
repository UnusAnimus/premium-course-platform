import { pricingPlans } from '@/lib/data';
import Link from 'next/link';

export default function PricingSection() {
  return (
    <section className="py-24 px-4 bg-[#0a0a0f]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-cyan-400 text-sm font-medium uppercase tracking-widest">Pricing</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#f0f0f0] mt-3 mb-4">Simple, Transparent Pricing</h2>
          <p className="text-[#6b7280] max-w-2xl mx-auto">Start for free. Upgrade when you&apos;re ready. Cancel anytime.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {pricingPlans.map(plan => (
            <div key={plan.id} className={`relative rounded-2xl p-6 flex flex-col ${plan.highlighted ? 'bg-[#0f0f1a] border-2 border-blue-500 shadow-xl shadow-blue-500/20 animate-pulse-glow' : 'bg-[#0f0f1a] border border-[#1f1f2e]'}`}>
              {plan.highlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-[#f0f0f0] mb-1">{plan.name}</h3>
                <p className="text-sm text-[#6b7280] mb-4">{plan.description}</p>
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-bold text-[#f0f0f0]">${plan.price}</span>
                  <span className="text-[#6b7280] mb-1">/{plan.period}</span>
                </div>
              </div>
              <ul className="space-y-3 flex-1 mb-8">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#6b7280]">
                    <svg className="w-4 h-4 text-green-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/member/login"
                className={`w-full text-center py-3 rounded-xl font-medium text-sm transition-all ${plan.highlighted ? 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white' : 'border border-[#1f1f2e] hover:border-blue-500/50 text-[#f0f0f0]'}`}>
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
