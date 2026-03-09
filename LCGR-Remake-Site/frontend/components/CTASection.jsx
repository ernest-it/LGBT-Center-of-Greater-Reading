'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Users, HandHeart } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary-dark via-secondary to-primary" />
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary-light/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
          }}
          className="text-center"
        >
          <motion.span
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="inline-block text-primary-light font-semibold text-sm tracking-wider uppercase mb-4"
          >
            Make a Difference
          </motion.span>
          <motion.h2
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="text-3xl md:text-5xl font-bold text-white mb-6"
          >
            Get Involved Today
          </motion.h2>
          <motion.p
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="text-white/70 text-lg max-w-2xl mx-auto mb-12"
          >
            Whether you volunteer your time, make a donation, or spread the word,
            your support helps us create a more inclusive and welcoming community for everyone.
          </motion.p>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {[
              {
                icon: Users,
                title: 'Volunteer',
                desc: 'Share your time and skills to support our community programs.',
                href: '/get-involved/volunteer',
                color: 'from-primary to-primary/80',
              },
              {
                icon: Heart,
                title: 'Donate',
                desc: 'Your generous contributions fund vital services and programs.',
                href: '/get-involved/donate',
                color: 'from-accent to-accent-light',
              },
              {
                icon: HandHeart,
                title: 'Partner',
                desc: 'Organizations can partner with us to expand community impact.',
                href: '/resources/partners',
                color: 'from-green to-green/80',
              },
            ].map((item) => (
              <Link key={item.title} href={item.href} className="group">
                <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 hover:-translate-y-1">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-5 mx-auto shadow-lg`}>
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-white/60 text-sm">{item.desc}</p>
                </div>
              </Link>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
