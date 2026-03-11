'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HeroBanner({
  title,
  subtitle,
  ctaText,
  ctaHref,
  backgroundImage,
  overlay = true,
  compact = false,
}) {
  return (
    <section
      className={`relative w-full flex items-center justify-center overflow-hidden ${
        compact ? 'min-h-[40vh]' : 'min-h-[85vh]'
      }`}
    >
      {/* Background */}
      {backgroundImage && /^(https?:\/\/|\/)/i.test(backgroundImage) ? (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage.replace(/[()'"]/g, (c) => '\\' + c)})` }}
        />
      ) : (
        <div className="absolute inset-0 bg-hero-gradient" />
      )}

      {/* Overlay */}
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-br from-secondary-dark/90 via-secondary/70 to-primary/50" />
      )}

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className={`font-bold text-white leading-tight ${
            compact
              ? 'text-3xl md:text-5xl'
              : 'text-4xl md:text-6xl lg:text-7xl'
          }`}
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="mt-6 text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}
        {ctaText && ctaHref && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
            className="mt-10 flex flex-wrap gap-4 justify-center"
          >
            <Link
              href={ctaHref}
              className="inline-flex items-center px-8 py-4 bg-accent hover:bg-accent-light text-white font-semibold rounded-full transition-all shadow-xl shadow-accent/30 hover:shadow-accent/50 hover:scale-105 text-lg"
            >
              {ctaText}
            </Link>
          </motion.div>
        )}
      </div>

      {/* Bottom Fade */}
      {!compact && (
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cream to-transparent" />
      )}
    </section>
  );
}
