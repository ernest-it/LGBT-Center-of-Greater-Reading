'use client';

import HeroBanner from '../../../components/HeroBanner';
import AnimatedSection from '../../../components/AnimatedSection';
import CTASection from '../../../components/CTASection';
import { Handshake, ArrowRight } from 'lucide-react';

const partners = [
  { name: 'Berks County Community Foundation', desc: 'Supporting community development and philanthropy in Berks County.' },
  { name: 'United Way of Berks County', desc: 'Investing in community programs that improve lives.' },
  { name: 'Reading Health System', desc: 'Providing healthcare resources and collaboration.' },
  { name: 'Berks AIDS Network', desc: 'HIV/AIDS prevention, education, and support services.' },
  { name: 'Berks Counseling Center', desc: 'Mental health counseling and crisis intervention services.' },
  { name: 'Albright College', desc: 'Academic partnership and student volunteer programs.' },
];

export default function PartnersPage() {
  return (
    <>
      <HeroBanner
        title="Our Partners"
        subtitle="The organizations and businesses that help make our work possible."
        backgroundImage={null}
        compact
      />

      <section className="section-padding bg-cream">
        <div className="container-wide">
          <AnimatedSection variant="slideUp" className="text-center mb-14">
            <span className="text-primary font-semibold text-sm tracking-wider uppercase">Community Partners</span>
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mt-3">
              Stronger Together
            </h2>
            <p className="text-secondary/60 mt-4 max-w-2xl mx-auto">
              We are grateful for the partnerships that help us expand our reach and deepen our impact.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {partners.map((partner, i) => (
              <AnimatedSection key={partner.name} variant="slideUp" delay={i * 0.08}>
                <div className="bg-white rounded-2xl p-6 shadow-lg shadow-black/5 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Handshake className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-secondary mb-2">{partner.name}</h3>
                  <p className="text-secondary/60 text-sm">{partner.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection variant="slideUp" className="mt-16 text-center">
            <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl p-10 border border-primary/10 max-w-2xl mx-auto">
              <h3 className="text-xl font-bold text-secondary mb-3">Become a Partner</h3>
              <p className="text-secondary/60 mb-6">
                Interested in partnering with the LGBT Center of Greater Reading? We welcome collaborations with businesses,
                organizations, and institutions that share our commitment to equality and inclusion.
              </p>
              <a href="mailto:info@lgbtcentergreaterreading.org" className="btn-primary">
                Contact Us About Partnerships
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <CTASection />
    </>
  );
}
