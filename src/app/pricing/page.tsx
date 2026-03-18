'use client';
import { useState } from 'react';
import PublicLayout from '@/components/layout/PublicLayout';
import PricingSection from '@/components/sections/PricingSection';
import Link from 'next/link';

const faqs = [
  { q: 'Can I cancel my subscription anytime?', a: 'Yes, you can cancel at any time. You\'ll retain access until the end of your billing period with no cancellation fees.' },
  { q: 'Is there a free trial available?', a: 'Yes! Basic plan includes free access to 20+ courses. You can upgrade to Pro anytime to unlock the full library.' },
  { q: 'What payment methods do you accept?', a: 'We accept all major credit cards (Visa, Mastercard, Amex), PayPal, and bank transfers for Enterprise plans.' },
  { q: 'Can I get a refund?', a: 'We offer a 30-day money-back guarantee on all paid plans, no questions asked.' },
  { q: 'Do you offer student discounts?', a: 'Yes! Students get 50% off all plans with a valid .edu email address. Contact support to apply.' },
];

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <PublicLayout>
      <div className="pt-16 bg-[#0a0a0f]">
        <PricingSection />

        {/* FAQ */}
        <section className="py-16 px-4 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-[#f0f0f0] text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-[#0f0f1a] border border-[#1f1f2e] rounded-2xl overflow-hidden">
                <button className="w-full text-left px-6 py-4 flex items-center justify-between gap-4" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="text-sm font-medium text-[#f0f0f0]">{faq.q}</span>
                  <svg className={`w-5 h-5 text-[#6b7280] shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === i && <div className="px-6 pb-4 text-sm text-[#6b7280] leading-relaxed border-t border-[#1f1f2e] pt-4">{faq.a}</div>}
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-[#f0f0f0] mb-4">Still have questions?</h2>
            <p className="text-[#6b7280] mb-8">Our team is here to help. Reach out and we&apos;ll get back to you within 24 hours.</p>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium px-8 py-3 rounded-xl hover:from-blue-500 hover:to-blue-400 transition-all">
              Contact Support
            </Link>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
}
