'use client';

import HeroBanner from '../../components/HeroBanner';
import AnimatedSection from '../../components/AnimatedSection';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function StorePage() {
  return (
    <>
      <HeroBanner
        title="The Center Store"
        subtitle="Shop merchandise and support our mission at the same time."
        backgroundImage={null}
        compact
      />

      <section className="section-padding bg-cream">
        <div className="container-narrow">
          <AnimatedSection variant="slideUp">
            <div className="text-center">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-8 shadow-xl">
                <ShoppingBag className="w-12 h-12 text-white" />
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">
                Coming Soon
              </h2>
              <p className="text-secondary/60 text-lg leading-relaxed max-w-xl mx-auto mb-8">
                Our online store is currently being set up. Soon you will be able to purchase
                LGBT Center of Greater Reading merchandise, pride items, and more - with all proceeds supporting our
                programs and services.
              </p>

              <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 max-w-md mx-auto mb-8">
                <h3 className="text-lg font-bold text-secondary mb-3">In the meantime...</h3>
                <p className="text-secondary/60 text-sm mb-4">
                  Visit our center to browse available merchandise, or support us directly with a donation.
                </p>
                <div className="flex flex-col gap-3">
                  <Link href="/get-involved/donate" className="btn-accent w-full">
                    Donate Instead
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                  <Link href="/events" className="btn-outline w-full">
                    Visit Our Events
                  </Link>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
