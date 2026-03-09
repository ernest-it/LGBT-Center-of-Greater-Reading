'use client';

import HeroBanner from './HeroBanner';
import AnimatedSection from './AnimatedSection';
import CTASection from './CTASection';
import Link from 'next/link';
import { Clock, MapPin, Phone, ArrowRight } from 'lucide-react';

export default function ContentPage({
  title,
  subtitle,
  heroImage,
  image,
  imageAlt,
  content,
  details,
  schedule,
  contact,
  relatedLinks,
  showCTA = true,
}) {
  return (
    <>
      <HeroBanner title={title} subtitle={subtitle} backgroundImage={heroImage} compact />

      <section className="section-padding bg-cream">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {image && (
                <AnimatedSection variant="slideUp" className="mb-8">
                  <div className="rounded-3xl overflow-hidden shadow-lg shadow-black/5">
                    <img
                      src={image}
                      alt={imageAlt || title}
                      className="w-full h-64 md:h-80 object-cover"
                    />
                  </div>
                </AnimatedSection>
              )}
              <AnimatedSection variant="slideUp">
                <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg shadow-black/5 border border-gray-100">
                  {content.map((block, i) => (
                    <div key={i} className={i > 0 ? 'mt-8' : ''}>
                      {block.heading && (
                        <h2 className="text-2xl font-bold text-secondary mb-4">{block.heading}</h2>
                      )}
                      {block.text && (
                        <p className="text-secondary/70 leading-relaxed">{block.text}</p>
                      )}
                      {block.list && (
                        <ul className="mt-4 space-y-3">
                          {block.list.map((item, j) => (
                            <li key={j} className="flex items-start gap-3">
                              <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                              <span className="text-secondary/70">{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Details Card */}
              {(schedule || contact) && (
                <AnimatedSection variant="slideLeft">
                  <div className="bg-white rounded-2xl p-6 shadow-lg shadow-black/5 border border-gray-100">
                    <h3 className="text-lg font-bold text-secondary mb-4">Details</h3>

                    {schedule && (
                      <div className="mb-5">
                        <div className="flex items-center gap-2 text-primary font-semibold text-sm mb-2">
                          <Clock className="w-4 h-4" />
                          Schedule
                        </div>
                        {schedule.map((s, i) => (
                          <p key={i} className="text-secondary/60 text-sm ml-6">{s}</p>
                        ))}
                      </div>
                    )}

                    {contact && (
                      <div className="space-y-3">
                        {contact.location && (
                          <div className="flex items-start gap-2">
                            <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                            <span className="text-secondary/60 text-sm">{contact.location}</span>
                          </div>
                        )}
                        {contact.phone && (
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-primary shrink-0" />
                            <a href={`tel:${contact.phone}`} className="text-secondary/60 text-sm hover:text-primary transition-colors">
                              {contact.phone}
                            </a>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </AnimatedSection>
              )}

              {/* Related Links */}
              {relatedLinks && (
                <AnimatedSection variant="slideLeft" delay={0.1}>
                  <div className="bg-white rounded-2xl p-6 shadow-lg shadow-black/5 border border-gray-100">
                    <h3 className="text-lg font-bold text-secondary mb-4">Related</h3>
                    <div className="space-y-2">
                      {relatedLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-secondary/70 hover:text-primary hover:bg-primary/5 transition-colors"
                        >
                          <ArrowRight className="w-3.5 h-3.5" />
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </AnimatedSection>
              )}

              {/* Quick CTA */}
              <AnimatedSection variant="slideLeft" delay={0.2}>
                <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-6 text-white">
                  <h3 className="text-lg font-bold mb-2">Need Help?</h3>
                  <p className="text-white/70 text-sm mb-4">
                    Contact us to learn more or get started with our services.
                  </p>
                  <a
                    href="tel:6103756070"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/20 hover:bg-white/30 rounded-full text-sm font-medium transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    (610) 375-6070
                  </a>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {showCTA && <CTASection />}
    </>
  );
}
