'use client';

import { motion } from 'framer-motion';
import { Heart, Stethoscope, Apple, Library } from 'lucide-react';
import HeroBanner from '../../components/HeroBanner';
import ServiceCard from '../../components/ServiceCard';
import AnimatedSection from '../../components/AnimatedSection';
import CTASection from '../../components/CTASection';

const services = [
  {
    title: 'Counseling Services',
    description: 'Professional, LGBTQ+-affirming individual, couples, and family counseling in a safe and confidential environment.',
    icon: Heart,
    href: '/services/counseling',
  },
  {
    title: 'Health & Wellness',
    description: 'Comprehensive health screenings, HIV/STI testing, wellness programs, and health education resources.',
    icon: Stethoscope,
    href: '/services/health-wellness',
  },
  {
    title: 'Food Pantry',
    description: 'Free, nutritious food distribution for community members experiencing food insecurity. No ID or proof of income required.',
    icon: Apple,
    href: '/services/food-pantry',
  },
  {
    title: 'Community Library',
    description: 'A curated collection of LGBTQ+ literature, films, educational materials, and resources available for borrowing.',
    icon: Library,
    href: '/services/library',
  },
];

export default function ServicesPage() {
  return (
    <>
      <HeroBanner
        title="Our Services"
        subtitle="Comprehensive, affirming services designed to support the health and wellbeing of our community."
        backgroundImage={null}
        compact
      />

      <section className="section-padding bg-cream">
        <div className="container-wide">
          <AnimatedSection variant="slideUp" className="text-center mb-14">
            <span className="text-primary font-semibold text-sm tracking-wider uppercase">How We Help</span>
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mt-3">
              Services for Our Community
            </h2>
            <p className="text-secondary/60 mt-4 max-w-2xl mx-auto">
              All of our services are provided in a safe, inclusive, and affirming environment.
              Many services are available at no cost.
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
            {services.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </motion.div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
