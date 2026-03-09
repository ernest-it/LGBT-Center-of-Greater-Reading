'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import HeroBanner from '../../components/HeroBanner';
import EventCard from '../../components/EventCard';
import AnimatedSection from '../../components/AnimatedSection';
import { Calendar } from 'lucide-react';

const placeholderEvents = [
  { id: 1, title: 'Community Game Night', description: 'Board games, card games, and snacks in a welcoming environment. All ages welcome!', date: '2026-03-15T18:00:00', location: 'The Center - Main Hall' },
  { id: 2, title: 'Trans & Nonbinary Support Group', description: 'A safe, supportive space for transgender and nonbinary individuals.', date: '2026-03-20T17:30:00', location: 'The Center - Meeting Room' },
  { id: 3, title: 'Health Screening Day', description: 'Free health screenings including HIV testing, blood pressure checks, and wellness consultations.', date: '2026-03-22T10:00:00', location: 'The Center - Health Suite' },
  { id: 4, title: 'Book Club Meeting', description: 'Discussing this month\'s LGBTQ+ literature selection. New members welcome!', date: '2026-03-25T19:00:00', location: 'The Center - Library' },
  { id: 5, title: 'Art Workshop: Watercolors', description: 'Express yourself through watercolor painting. No experience needed!', date: '2026-04-02T14:00:00', location: 'The Center - Activity Room' },
  { id: 6, title: 'Youth Group Social', description: 'Fun social activities for LGBTQ+ youth ages 13-18. Snacks provided.', date: '2026-04-05T16:00:00', location: 'The Center - Youth Space' },
  { id: 7, title: 'Volunteer Orientation', description: 'Learn about volunteer opportunities and how you can make a difference.', date: '2026-04-10T11:00:00', location: 'The Center - Main Hall' },
  { id: 8, title: 'Pride Planning Committee', description: 'Help plan our annual Pride celebration! All ideas welcome.', date: '2026-04-12T18:00:00', location: 'The Center - Conference Room' },
];

const months = ['All', 'March', 'April', 'May', 'June', 'July', 'August'];

export default function EventsClient({ events }) {
  const [filter, setFilter] = useState('All');
  const items = events?.length > 0 ? events : placeholderEvents;

  const filtered = filter === 'All'
    ? items
    : items.filter((e) => {
        const d = new Date(e.date);
        return d.toLocaleString('en-US', { month: 'long' }) === filter;
      });

  return (
    <>
      <HeroBanner
        title="Events Calendar"
        subtitle="Discover upcoming events, gatherings, and activities at the center."
        backgroundImage={null}
        compact
      />

      <section className="section-padding bg-cream">
        <div className="container-wide">
          {/* Filters */}
          <AnimatedSection variant="slideUp" className="mb-10">
            <div className="flex flex-wrap gap-2 justify-center">
              {months.map((m) => (
                <button
                  key={m}
                  onClick={() => setFilter(m)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                    filter === m
                      ? 'bg-primary text-white shadow-lg shadow-primary/30'
                      : 'bg-white text-secondary/60 hover:text-primary hover:bg-primary/5 border border-gray-200'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </AnimatedSection>

          {/* Events */}
          {filtered.length > 0 ? (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
              }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto"
            >
              {filtered.map((event, i) => (
                <EventCard key={event.id || i} {...event} />
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-16">
              <Calendar className="w-16 h-16 text-primary/20 mx-auto mb-4" />
              <p className="text-secondary/50 text-lg">No events found for this month.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
