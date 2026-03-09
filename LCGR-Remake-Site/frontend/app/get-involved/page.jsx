'use client';

import { motion } from 'framer-motion';
import { Users, Heart, Briefcase, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import HeroBanner from '../../components/HeroBanner';
import AnimatedSection from '../../components/AnimatedSection';

const options = [
  {
    icon: Users,
    title: 'Volunteer',
    desc: 'Give your time and talents to support our programs, events, and daily operations. Every hour makes a difference.',
    href: '/get-involved/volunteer',
    color: 'from-primary to-primary/80',
  },
  {
    icon: Heart,
    title: 'Donate',
    desc: 'Your financial support funds vital services and programs that directly impact the lives of LGBTQ+ community members.',
    href: '/get-involved/donate',
    color: 'from-accent to-accent-light',
  },
  {
    icon: Briefcase,
    title: 'Work With Us',
    desc: 'Join our team and make a career out of making a difference. View current openings and opportunities.',
    href: '/get-involved/work-with-us',
    color: 'from-green to-green/80',
  },
];

export default function GetInvolvedPage() {
  return (
    <>
      <HeroBanner
        title="Get Involved"
        subtitle="There are many ways to support our mission and make a positive impact in the community."
        backgroundImage={null}
        compact
      />

      <section className="section-padding bg-cream">
        <div className="container-wide">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            {options.map((opt) => (
              <motion.div
                key={opt.title}
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
              >
                <Link href={opt.href} className="group block h-full">
                  <div className="bg-white rounded-3xl p-8 shadow-lg shadow-black/5 border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 h-full flex flex-col text-center">
                    <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${opt.color} flex items-center justify-center mx-auto mb-6 shadow-xl`}>
                      <opt.icon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-secondary mb-4">{opt.title}</h3>
                    <p className="text-secondary/60 leading-relaxed flex-1">{opt.desc}</p>
                    <div className="mt-6 flex items-center justify-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                      Learn More
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
