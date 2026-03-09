'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ServiceCard({ title, description, icon: Icon, href, image }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
      }}
    >
      <Link href={href} className="group block">
        <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg shadow-black/5 border border-gray-100 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1">
          {image ? (
            <div className="aspect-video overflow-hidden">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          ) : (
            <div className="aspect-video bg-gradient-to-br from-primary/10 via-primary-light/20 to-accent/10 flex items-center justify-center">
              {Icon && <Icon className="w-16 h-16 text-primary/40" />}
            </div>
          )}
          <div className="p-6">
            <div className="flex items-center gap-3 mb-3">
              {Icon && (
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                  <Icon className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                </div>
              )}
              <h3 className="text-lg font-bold text-secondary group-hover:text-primary transition-colors">
                {title}
              </h3>
            </div>
            <p className="text-secondary/60 text-sm leading-relaxed">
              {description}
            </p>
            <div className="mt-4 text-primary font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
              Learn More
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
