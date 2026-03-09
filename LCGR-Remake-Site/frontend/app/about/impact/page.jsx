'use client';

import HeroBanner from '../../../components/HeroBanner';
import AnimatedSection from '../../../components/AnimatedSection';
import CTASection from '../../../components/CTASection';
import { motion } from 'framer-motion';
import { Users, Heart, Calendar, BookOpen, TrendingUp, Award } from 'lucide-react';

const stats = [
  { icon: Users, value: '1,000+', label: 'Community Members Served Annually' },
  { icon: Heart, value: '500+', label: 'Counseling Sessions Provided' },
  { icon: Calendar, value: '200+', label: 'Events & Programs Per Year' },
  { icon: BookOpen, value: '50+', label: 'Support Group Sessions Monthly' },
  { icon: TrendingUp, value: '300%', label: 'Growth in Services Since 2015' },
  { icon: Award, value: '15+', label: 'Community Partnerships' },
];

export default function ImpactPage() {
  return (
    <>
      <HeroBanner
        title="Our Impact"
        subtitle="See how we are making a difference in the Greater Reading community."
        backgroundImage={null}
        compact
      />

      {/* Stats */}
      <section className="section-padding bg-cream">
        <div className="container-wide">
          <AnimatedSection variant="slideUp" className="text-center mb-14">
            <span className="text-primary font-semibold text-sm tracking-wider uppercase">By the Numbers</span>
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mt-3">
              Making a <span className="gradient-text">Real Difference</span>
            </h2>
          </AnimatedSection>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                className="bg-white rounded-2xl p-8 shadow-lg shadow-black/5 border border-gray-100 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-5 shadow-lg">
                  <stat.icon className="w-7 h-7 text-white" />
                </div>
                <div className="text-4xl font-bold gradient-text mb-2">{stat.value}</div>
                <p className="text-secondary/60 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Impact Photo */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <AnimatedSection variant="slideRight">
              <div className="rounded-3xl overflow-hidden shadow-xl h-80 bg-gradient-to-br from-primary/20 via-accent/10 to-primary-light/20" />
            </AnimatedSection>
            <AnimatedSection variant="slideLeft">
              <div className="rounded-3xl overflow-hidden shadow-xl h-80 bg-gradient-to-br from-accent/10 via-primary/20 to-primary-light/10" />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Impact Story */}
      <section className="section-padding bg-cream">
        <div className="container-narrow">
          <AnimatedSection variant="slideUp">
            <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl p-10 md:p-16 text-center border border-primary/10">
              <span className="text-primary font-semibold text-sm tracking-wider uppercase">Community Impact</span>
              <h2 className="text-3xl md:text-4xl font-bold text-secondary mt-3 mb-6">
                Transforming Lives Every Day
              </h2>
              <p className="text-secondary/70 text-lg leading-relaxed max-w-3xl mx-auto mb-4">
                Every person who walks through our doors has a story. From the teenager finding acceptance
                for the first time, to the family learning to support a loved one, to the individual
                accessing vital health services - our impact is measured in lives changed.
              </p>
              <p className="text-secondary/70 text-lg leading-relaxed max-w-3xl mx-auto">
                With your support, we can continue to expand our services, reach more community
                members, and build a more inclusive Greater Reading for everyone.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <CTASection />
    </>
  );
}
