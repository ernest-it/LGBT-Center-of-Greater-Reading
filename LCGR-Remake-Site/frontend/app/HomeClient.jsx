'use client';

import { motion } from 'framer-motion';
import {
  Heart,
  Users,
  Stethoscope,
  Apple,
  Library,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';
import HeroBanner from '../components/HeroBanner';
import ServiceCard from '../components/ServiceCard';
import EventCard from '../components/EventCard';
import NewsSection from '../components/NewsSection';
import CTASection from '../components/CTASection';
import AnimatedSection from '../components/AnimatedSection';
import Newsletter from '../components/Newsletter';

const services = [
  {
    title: 'Counseling Services',
    description: 'Professional, affirming counseling services for individuals, couples, and families in a safe and welcoming environment.',
    icon: Heart,
    href: '/services/counseling',
  },
  {
    title: 'Health & Wellness',
    description: 'Comprehensive health screenings, wellness programs, and resources to support your physical and mental wellbeing.',
    icon: Stethoscope,
    href: '/services/health-wellness',
  },
  {
    title: 'Food Pantry',
    description: 'Free, nutritious food available for community members facing food insecurity. No questions asked.',
    icon: Apple,
    href: '/services/food-pantry',
  },
  {
    title: 'Community Library',
    description: 'Browse our curated collection of LGBTQ+ literature, films, and educational resources.',
    icon: Library,
    href: '/services/library',
  },
  {
    title: 'Support Groups',
    description: 'Peer-led support groups for youth, adults, families, and specific community needs.',
    icon: Users,
    href: '/programs/support-groups',
  },
  {
    title: 'Arts & Culture',
    description: 'Creative expression through art exhibits, performances, workshops, and cultural events.',
    icon: Sparkles,
    href: '/programs/arts-culture',
  },
];

const placeholderEvents = [
  {
    id: 1,
    title: 'Community Game Night',
    description: 'Join us for a fun evening of board games, card games, and snacks. All ages welcome!',
    date: '2026-03-15T18:00:00',
    location: 'The Center - Main Hall',
  },
  {
    id: 2,
    title: 'Trans & Nonbinary Support Group',
    description: 'A safe, supportive space for transgender and nonbinary individuals to connect and share.',
    date: '2026-03-20T17:30:00',
    location: 'The Center - Meeting Room',
  },
  {
    id: 3,
    title: 'Health Screening Day',
    description: 'Free health screenings including HIV testing, blood pressure, and wellness consultations.',
    date: '2026-03-22T10:00:00',
    location: 'The Center - Health Suite',
  },
];

export default function HomeClient({ bannerImage, events, news }) {
  const displayEvents = events?.length > 0 ? events : placeholderEvents;

  return (
    <>
      {/* Hero */}
      <HeroBanner
        title="A Safe Space for Everyone"
        subtitle="The LGBT Center of Greater Reading provides inclusive services, programs, and community resources for the LGBTQ+ community in Berks County and beyond."
        ctaText="Explore Our Services"
        ctaHref="/services"
        backgroundImage={bannerImage || null}
      />

      {/* Who We Are */}
      <section className="section-padding bg-cream">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection variant="slideRight">
              <span className="text-primary font-semibold text-sm tracking-wider uppercase">Who We Are</span>
              <h2 className="text-3xl md:text-4xl font-bold text-secondary mt-3 mb-6">
                Building Community,{' '}
                <span className="gradient-text">Creating Change</span>
              </h2>
              <p className="text-secondary/70 leading-relaxed mb-4">
                The LGBT Center of Greater Reading has been serving the LGBTQ+ community in
                Berks County for over a decade. We are dedicated to fostering a safe, affirming,
                and inclusive environment where every person can be their authentic self.
              </p>
              <p className="text-secondary/70 leading-relaxed mb-8">
                Through our comprehensive services, support programs, and community events, we
                work to empower individuals, strengthen families, and build bridges of
                understanding throughout our region.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/about" className="btn-primary">
                  Learn More About Us
                </Link>
                <Link href="/about/impact" className="btn-outline">
                  Our Impact
                </Link>
              </div>
            </AnimatedSection>

            <AnimatedSection variant="slideLeft">
              <div className="relative">
                <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-primary/20 via-accent/10 to-primary-light/20" />

                {/* Floating Stats */}
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-5 border border-gray-100">
                  <div className="text-3xl font-bold gradient-text">1,000+</div>
                  <div className="text-secondary/60 text-sm">Community Members Served</div>
                </div>
                <div className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-5 border border-gray-100">
                  <div className="text-3xl font-bold gradient-text">10+</div>
                  <div className="text-secondary/60 text-sm">Years of Service</div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <AnimatedSection variant="slideUp" className="text-center mb-14">
            <span className="text-primary font-semibold text-sm tracking-wider uppercase">What We Offer</span>
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mt-3">
              Our Services & Programs
            </h2>
            <p className="text-secondary/60 mt-4 max-w-2xl mx-auto">
              From counseling and health services to community programs and cultural events,
              we offer a wide range of resources to support our community.
            </p>
          </AnimatedSection>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </motion.div>

          <AnimatedSection variant="fadeIn" className="text-center mt-12">
            <Link href="/services" className="btn-outline">
              View All Services
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="section-padding bg-cream">
        <div className="container-wide">
          <AnimatedSection variant="slideUp" className="text-center mb-14">
            <span className="text-primary font-semibold text-sm tracking-wider uppercase">What&apos;s Happening</span>
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mt-3">
              Upcoming Events
            </h2>
          </AnimatedSection>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
            }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto"
          >
            {displayEvents.slice(0, 4).map((event, i) => (
              <EventCard key={event.id || i} {...event} href="/events" />
            ))}
          </motion.div>

          <AnimatedSection variant="fadeIn" className="text-center mt-12">
            <Link href="/events" className="btn-primary">
              View All Events
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Latest News */}
      <NewsSection news={news} />

      {/* Get Involved CTA */}
      <CTASection />

      {/* Newsletter Section */}
      <section className="section-padding bg-cream">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <AnimatedSection variant="slideUp">
            <span className="text-primary font-semibold text-sm tracking-wider uppercase">Stay Updated</span>
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mt-3 mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-secondary/60 mb-8">
              Get the latest news, events, and updates delivered straight to your inbox.
            </p>
            <div className="max-w-md mx-auto">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-5 py-3 bg-white border border-gray-200 rounded-full text-secondary placeholder:text-secondary/40 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
                <button className="btn-accent px-8">Subscribe</button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
