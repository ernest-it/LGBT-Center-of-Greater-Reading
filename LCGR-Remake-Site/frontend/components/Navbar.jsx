'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  {
    label: 'About',
    href: '/about',
    children: [
      { label: 'Who We Are', href: '/about' },
      { label: 'Meet the Team', href: '/about/team' },
      { label: 'Board of Directors', href: '/about/board' },
      { label: 'Our Impact', href: '/about/impact' },
    ],
  },
  {
    label: 'Events & Programs',
    href: '/events',
    children: [
      { label: 'Events Calendar', href: '/events' },
      { label: 'Support Groups', href: '/programs/support-groups' },
      { label: 'Social Groups', href: '/programs/social-groups' },
      { label: 'Arts & Culture', href: '/programs/arts-culture' },
      { label: 'Trans & Nonbinary', href: '/programs/trans-nonbinary' },
      { label: 'All Programs', href: '/programs' },
    ],
  },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'All Services', href: '/services' },
      { label: 'Counseling', href: '/services/counseling' },
      { label: 'Health & Wellness', href: '/services/health-wellness' },
      { label: 'Food Pantry', href: '/services/food-pantry' },
      { label: 'Library', href: '/services/library' },
    ],
  },
  {
    label: 'Resources',
    href: '/resources',
    children: [
      { label: 'Resources', href: '/resources' },
      { label: 'Partners', href: '/resources/partners' },
    ],
  },
  {
    label: 'Get Involved',
    href: '/get-involved',
    children: [
      { label: 'Overview', href: '/get-involved' },
      { label: 'Volunteer', href: '/get-involved/volunteer' },
      { label: 'Donate', href: '/get-involved/donate' },
      { label: 'Work With Us', href: '/get-involved/work-with-us' },
    ],
  },
  { label: 'Store', href: '/store' },
];

function DropdownMenu({ items, isOpen }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.2 }}
          className="absolute top-full left-0 mt-2 w-56 rounded-xl bg-white/95 backdrop-blur-xl shadow-xl shadow-black/10 border border-white/20 overflow-hidden z-50"
        >
          <div className="py-2">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-5 py-2.5 text-sm text-secondary hover:bg-primary/10 hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-xl shadow-lg shadow-black/5'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <img
              src="/images/8659e2_750ed3b7566848afa53ca40b98ae2755_mv2.png"
              alt="LGBT Center of Greater Reading"
              className="h-12 w-12 object-contain"
            />
            <span className={`text-lg font-bold leading-tight transition-colors ${scrolled ? 'text-secondary' : 'text-white'}`}>
              The LGBT Center<br />
              <span className="text-sm font-medium">of Greater Reading</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.children && setOpenDropdown(link.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={link.href}
                  className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    scrolled
                      ? 'text-secondary/80 hover:text-primary hover:bg-primary/5'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                  {link.children && <ChevronDown className="w-3.5 h-3.5" />}
                </Link>
                {link.children && (
                  <DropdownMenu items={link.children} isOpen={openDropdown === link.label} />
                )}
              </div>
            ))}
          </div>

          {/* Donate CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/get-involved/donate"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent-light text-white text-sm font-semibold rounded-full transition-all shadow-lg shadow-accent/30 hover:shadow-accent/50 hover:scale-105"
            >
              <Heart className="w-4 h-4" />
              Donate
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                scrolled ? 'text-secondary hover:bg-gray-100' : 'text-white hover:bg-white/10'
              }`}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <div key={link.label}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-3 text-secondary font-medium rounded-lg hover:bg-primary/5 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                  {link.children && (
                    <div className="pl-8 space-y-1">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                          className="block px-4 py-2 text-sm text-secondary/70 hover:text-primary transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-3 px-4">
                <Link
                  href="/get-involved/donate"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 bg-accent text-white font-semibold rounded-full"
                >
                  <Heart className="w-4 h-4" />
                  Donate
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
