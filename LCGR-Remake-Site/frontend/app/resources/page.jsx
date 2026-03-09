'use client';

import HeroBanner from '../../components/HeroBanner';
import AnimatedSection from '../../components/AnimatedSection';
import CTASection from '../../components/CTASection';
import { ExternalLink, Phone, Globe, Shield } from 'lucide-react';
import Link from 'next/link';

const resources = [
  {
    category: 'Crisis & Emergency',
    items: [
      { name: 'The Trevor Project', desc: 'Crisis intervention for LGBTQ+ youth.', phone: '1-866-488-7386', url: 'https://www.thetrevorproject.org' },
      { name: 'Trans Lifeline', desc: 'Peer support for transgender people.', phone: '877-565-8860', url: 'https://translifeline.org' },
      { name: '988 Suicide & Crisis Lifeline', desc: '24/7 crisis support.', phone: '988', url: 'https://988lifeline.org' },
    ],
  },
  {
    category: 'Health & Wellness',
    items: [
      { name: 'GLMA', desc: 'Find LGBTQ+-affirming healthcare providers.', url: 'https://www.glma.org' },
      { name: 'CDC LGBTQ+ Health', desc: 'Health information and resources.', url: 'https://www.cdc.gov/lgbthealth/' },
      { name: 'SAMHSA', desc: 'Substance abuse and mental health services.', phone: '1-800-662-4357', url: 'https://www.samhsa.gov' },
    ],
  },
  {
    category: 'Legal & Advocacy',
    items: [
      { name: 'Lambda Legal', desc: 'Legal advocacy for LGBTQ+ civil rights.', url: 'https://www.lambdalegal.org' },
      { name: 'ACLU', desc: 'Civil liberties advocacy and legal resources.', url: 'https://www.aclu.org' },
      { name: 'National Center for Transgender Equality', desc: 'Advocacy for trans rights and policies.', url: 'https://transequality.org' },
    ],
  },
  {
    category: 'Youth & Family',
    items: [
      { name: 'PFLAG', desc: 'Support for LGBTQ+ people, families, and allies.', url: 'https://pflag.org' },
      { name: 'GSA Network', desc: 'Empowering LGBTQ+ youth activists.', url: 'https://gsanetwork.org' },
      { name: 'Family Acceptance Project', desc: 'Research-based family support.', url: 'https://familyproject.sfsu.edu' },
    ],
  },
];

export default function ResourcesPage() {
  return (
    <>
      <HeroBanner
        title="Resources"
        subtitle="Helpful resources for the LGBTQ+ community and allies."
        backgroundImage={null}
        compact
      />

      <section className="section-padding bg-cream">
        <div className="container-wide">
          {resources.map((group, gi) => (
            <div key={group.category} className={gi > 0 ? 'mt-16' : ''}>
              <AnimatedSection variant="slideUp">
                <h2 className="text-2xl font-bold text-secondary mb-6 flex items-center gap-3">
                  <Shield className="w-6 h-6 text-primary" />
                  {group.category}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {group.items.map((item) => (
                    <div
                      key={item.name}
                      className="bg-white rounded-2xl p-6 shadow-lg shadow-black/5 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    >
                      <h3 className="text-lg font-bold text-secondary mb-2">{item.name}</h3>
                      <p className="text-secondary/60 text-sm mb-4">{item.desc}</p>
                      <div className="space-y-2">
                        {item.phone && (
                          <a href={`tel:${item.phone}`} className="flex items-center gap-2 text-sm text-primary hover:text-accent transition-colors">
                            <Phone className="w-4 h-4" />
                            {item.phone}
                          </a>
                        )}
                        {item.url && (
                          <a href={item.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-primary hover:text-accent transition-colors">
                            <Globe className="w-4 h-4" />
                            Visit Website
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          ))}

          <AnimatedSection variant="slideUp" className="mt-16 text-center">
            <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl p-10 border border-primary/10">
              <h3 className="text-xl font-bold text-secondary mb-3">Know of a resource we should list?</h3>
              <p className="text-secondary/60 mb-6">
                Help us keep this list comprehensive and up to date.
              </p>
              <a href="mailto:info@lgbtcentergreaterreading.org" className="btn-primary">
                Suggest a Resource
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <CTASection />
    </>
  );
}
