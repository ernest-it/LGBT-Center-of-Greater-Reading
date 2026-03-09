'use client';

import { motion } from 'framer-motion';
import { MapPin, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function EventCard({ title, description, date, location, image, href }) {
  const eventDate = date ? new Date(date) : null;
  const month = eventDate ? eventDate.toLocaleString('en-US', { month: 'short' }).toUpperCase() : 'TBD';
  const day = eventDate ? eventDate.getDate() : '--';

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
      }}
    >
      <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg shadow-black/5 border border-gray-100 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1">
        <div className="flex flex-col sm:flex-row">
          {/* Date Badge */}
          <div className="sm:w-24 shrink-0 bg-gradient-to-br from-primary to-secondary flex sm:flex-col items-center justify-center p-4 gap-2 sm:gap-0">
            <span className="text-primary-light text-xs font-bold tracking-wider">{month}</span>
            <span className="text-white text-3xl font-bold">{day}</span>
          </div>

          {/* Content */}
          <div className="flex-1 p-5">
            <h3 className="text-lg font-bold text-secondary group-hover:text-primary transition-colors mb-2">
              {title}
            </h3>
            <p className="text-secondary/60 text-sm leading-relaxed line-clamp-2 mb-3">
              {description}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-secondary/50">
              {date && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {eventDate.toLocaleString('en-US', { weekday: 'long', hour: 'numeric', minute: '2-digit' })}
                </span>
              )}
              {location && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {location}
                </span>
              )}
            </div>
            {href && (
              <Link
                href={href}
                className="inline-block mt-3 text-primary font-medium text-sm hover:text-accent transition-colors"
              >
                Learn More &rarr;
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
