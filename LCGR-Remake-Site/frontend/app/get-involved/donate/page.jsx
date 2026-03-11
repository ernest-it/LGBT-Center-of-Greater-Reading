'use client';

import HeroBanner from '../../../components/HeroBanner';
import AnimatedSection from '../../../components/AnimatedSection';
import { motion } from 'framer-motion';
import { Heart, Users, Stethoscope, Apple, BookOpen, Calendar, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const impactStats = [
  { icon: Users, value: '$25', label: 'Provides a youth group session for 10 young people' },
  { icon: Stethoscope, value: '$50', label: 'Funds a free health screening for a community member' },
  { icon: Apple, value: '$100', label: 'Stocks our food pantry for a week' },
  { icon: BookOpen, value: '$250', label: 'Sponsors a full month of counseling sessions' },
  { icon: Calendar, value: '$500', label: 'Funds a community event for 50+ attendees' },
  { icon: Heart, value: '$1,000', label: 'Supports our operations for an entire week' },
];

export default function DonatePage() {
  return (
    <>
      <HeroBanner
        title="Support Our Mission"
        subtitle="Your generosity creates safe spaces, funds vital services, and changes lives."
        ctaText="Donate Now"
        ctaHref="#donate-options"
        backgroundImage={null}
        compact
      />

      {/* Impact */}
      <section className="section-padding bg-cream">
        <div className="container-wide">
          <AnimatedSection variant="slideUp" className="text-center mb-14">
            <span className="text-primary font-semibold text-sm tracking-wider uppercase">Your Impact</span>
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mt-3">
              See How Your Donation <span className="gradient-text">Makes a Difference</span>
            </h2>
          </AnimatedSection>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {impactStats.map((stat) => (
              <motion.div
                key={stat.value}
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                className="bg-white rounded-2xl p-6 shadow-lg shadow-black/5 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0 shadow-lg">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                    <p className="text-secondary/60 text-sm mt-1">{stat.label}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Embedded Donation Form (isolated in iframe to prevent script conflicts) */}
          <AnimatedSection variant="slideUp" className="mt-14">
            <iframe
              src="/donate-embed"
              className="w-full max-w-2xl mx-auto border-0 rounded-2xl"
              style={{ minHeight: '600px' }}
              title="Donation Form"
              loading="lazy"
            />
          </AnimatedSection>
        </div>
      </section>

      {/* Donate Options */}
      <section id="donate-options" className="section-padding bg-white">
        <div className="container-narrow">
          <AnimatedSection variant="slideUp">
            <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl p-10 md:p-16 text-center border border-primary/10">
              <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">
                Ways to Give
              </h2>
              <p className="text-secondary/70 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
                The LGBT Center of Greater Reading is a 501(c)(3) nonprofit organization.
                All donations are tax-deductible to the fullest extent permitted by law.
              </p>

              <div className="max-w-md mx-auto mb-10">
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-lg font-bold text-secondary mb-2">Mail a Check</h3>
                  <p className="text-secondary/60 text-sm mb-4">
                    Send to: LGBT Center of Greater Reading<br />
                    501 Washington St, Reading, PA 19601
                  </p>
                  <div className="text-primary font-medium text-sm">Make payable to &quot;LGBT Center of Greater Reading&quot;</div>
                </div>
              </div>

              <div className="text-secondary/50 text-sm">
                For questions about donations, planned giving, or corporate sponsorships,
                contact us at{' '}
                <a href="tel:6103756070" className="text-primary hover:text-accent transition-colors">
                  (610) 375-6070
                </a>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection variant="slideUp" className="mt-12 text-center">
            <p className="text-secondary/60 mb-4">Other ways to help:</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/get-involved/volunteer" className="btn-outline">
                Volunteer Your Time
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link href="/resources/partners" className="btn-outline">
                Become a Partner
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
