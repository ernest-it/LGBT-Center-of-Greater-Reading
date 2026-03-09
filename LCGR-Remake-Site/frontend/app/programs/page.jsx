'use client';

import { motion } from 'framer-motion';
import { Users, Smile, Palette, Sparkles } from 'lucide-react';
import HeroBanner from '../../components/HeroBanner';
import ServiceCard from '../../components/ServiceCard';
import AnimatedSection from '../../components/AnimatedSection';
import CTASection from '../../components/CTASection';

const programs = [
  {
    title: 'Support Groups',
    description: 'Peer-led support groups for youth, adults, families, and specific community needs in a safe, confidential setting.',
    icon: Users,
    href: '/programs/support-groups',
  },
  {
    title: 'Social Groups',
    description: 'Fun social activities, game nights, movie screenings, and community gatherings for connection and friendship.',
    icon: Smile,
    href: '/programs/social-groups',
  },
  {
    title: 'Arts & Culture',
    description: 'Creative expression through art exhibits, performances, workshops, writing groups, and cultural celebrations.',
    icon: Palette,
    href: '/programs/arts-culture',
  },
  {
    title: 'Trans & Nonbinary Programs',
    description: 'Dedicated programming, support, and resources for transgender and nonbinary community members.',
    icon: Sparkles,
    href: '/programs/trans-nonbinary',
  },
];

export default function ProgramsPage() {
  return (
    <>
      <HeroBanner
        title="Our Programs"
        subtitle="Community programs designed to connect, support, and empower."
        backgroundImage={null}
        compact
      />

      <section className="section-padding bg-cream">
        <div className="container-wide">
          <AnimatedSection variant="slideUp" className="text-center mb-14">
            <span className="text-primary font-semibold text-sm tracking-wider uppercase">Get Connected</span>
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mt-3">
              Programs & Groups
            </h2>
            <p className="text-secondary/60 mt-4 max-w-2xl mx-auto">
              Whether you are looking for support, social connection, or creative expression,
              we have a program for you.
            </p>
          </AnimatedSection>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          >
            {programs.map((program) => (
              <ServiceCard key={program.title} {...program} />
            ))}
          </motion.div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
