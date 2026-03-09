'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const placeholderNews = [
  {
    id: 1,
    title: 'Pride Month Celebrations Coming This June',
    excerpt: 'Join us for a month of celebration, community events, and togetherness as we honor Pride Month with special programming.',
    date: '2026-03-01',
    category: 'Events',
  },
  {
    id: 2,
    title: 'New Support Group for LGBTQ+ Youth Launching',
    excerpt: 'We are excited to announce a new weekly support group designed specifically for LGBTQ+ youth ages 13-18.',
    date: '2026-02-28',
    category: 'Programs',
  },
  {
    id: 3,
    title: 'Community Health Fair Results',
    excerpt: 'Our recent health fair served over 200 community members with free health screenings and wellness resources.',
    date: '2026-02-15',
    category: 'Health',
  },
];

export default function NewsSection({ news }) {
  const items = news?.length > 0 ? news : placeholderNews;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
          }}
        >
          {/* Header */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="flex items-end justify-between mb-12"
          >
            <div>
              <span className="text-primary font-semibold text-sm tracking-wider uppercase">Stay Informed</span>
              <h2 className="text-3xl md:text-4xl font-bold text-secondary mt-2">Latest News</h2>
            </div>
            <Link
              href="/events"
              className="hidden sm:flex items-center gap-2 text-primary hover:text-accent font-medium transition-colors"
            >
              View All News
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {items.slice(0, 3).map((item, i) => (
              <motion.article
                key={item.id || i}
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                className="group"
              >
                <div className="rounded-2xl overflow-hidden bg-cream border border-gray-100 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1">
                  {item.image_url ? (
                    <div className="aspect-video overflow-hidden">
                      <img src={item.image_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  ) : (
                    <div className="aspect-video bg-gradient-to-br from-primary/10 via-accent/5 to-primary-light/20" />
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                        {item.category || 'News'}
                      </span>
                      <span className="text-secondary/40 text-xs">
                        {item.date ? new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-secondary group-hover:text-primary transition-colors mb-2">
                      {item.title}
                    </h3>
                    <p className="text-secondary/60 text-sm leading-relaxed line-clamp-2">
                      {item.excerpt || item.description}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/events"
              className="inline-flex items-center gap-2 text-primary font-medium"
            >
              View All News
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
