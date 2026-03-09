'use client';

import HeroBanner from '../../components/HeroBanner';
import AnimatedSection from '../../components/AnimatedSection';
import CTASection from '../../components/CTASection';
import { Shield, Heart, Users, Lightbulb } from 'lucide-react';

const values = [
  {
    icon: Shield,
    title: 'Safety & Inclusion',
    desc: 'We create a safe, welcoming environment where everyone can be their authentic self without fear of judgment or discrimination.',
  },
  {
    icon: Heart,
    title: 'Compassion',
    desc: 'We approach every interaction with empathy, kindness, and a deep respect for the dignity of every individual.',
  },
  {
    icon: Users,
    title: 'Community',
    desc: 'We build strong connections, foster belonging, and celebrate the diversity that makes our community vibrant.',
  },
  {
    icon: Lightbulb,
    title: 'Empowerment',
    desc: 'We provide resources and support that empower individuals to thrive, grow, and become leaders in their own right.',
  },
];

export default function AboutClient({ content }) {
  return (
    <>
      <HeroBanner
        title="Who We Are"
        subtitle="Learn about our mission, our values, and the community we serve."
        backgroundImage={null}
        compact
      />

      {/* Mission */}
      <section className="section-padding bg-cream">
        <div className="container-narrow">
          <AnimatedSection variant="slideUp">
            <div className="text-center mb-16">
              <span className="text-primary font-semibold text-sm tracking-wider uppercase">Our Mission</span>
              <h2 className="text-3xl md:text-4xl font-bold text-secondary mt-3 mb-6">
                Creating a More{' '}
                <span className="gradient-text">Inclusive Community</span>
              </h2>
              <p className="text-secondary/70 text-lg leading-relaxed max-w-3xl mx-auto">
                {content?.mission ||
                  'The LGBT Center of Greater Reading is dedicated to providing a safe, inclusive, and affirming space for the LGBTQ+ community and allies in Berks County. Through comprehensive services, educational programs, and community events, we work to promote equality, support wellbeing, and foster understanding.'}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* History */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection variant="slideRight">
              <span className="text-primary font-semibold text-sm tracking-wider uppercase">Our Story</span>
              <h2 className="text-3xl md:text-4xl font-bold text-secondary mt-3 mb-6">
                A Decade of Service
              </h2>
              <div className="space-y-4 text-secondary/70 leading-relaxed">
                <p>
                  {content?.history ||
                    'Founded by a group of passionate community members who saw the need for a dedicated LGBTQ+ resource center in the Greater Reading area, the LGBT Center of Greater Reading has grown from a small grassroots organization into a vital community institution.'}
                </p>
                <p>
                  Over the years, we have expanded our services to include professional counseling, health and wellness programs, a community food pantry, support groups, social activities, and cultural events. Our center serves as a hub for connection, support, and celebration.
                </p>
                <p>
                  Today, we continue to grow and evolve, always guided by our commitment to serving the needs of our community with dignity, respect, and love.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection variant="slideLeft">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-xl relative bg-gradient-to-br from-primary/20 via-accent/10 to-primary-light/20">
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-secondary/80 to-transparent p-6">
                  <div className="text-4xl font-bold text-white">10+</div>
                  <p className="text-white/80 text-sm font-medium">Years Serving Greater Reading</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-cream">
        <div className="container-wide">
          <AnimatedSection variant="slideUp" className="text-center mb-14">
            <span className="text-primary font-semibold text-sm tracking-wider uppercase">What Guides Us</span>
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mt-3">Our Core Values</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <AnimatedSection key={v.title} variant="slideUp" delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-8 shadow-lg shadow-black/5 border border-gray-100 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-5 shadow-lg">
                    <v.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-secondary mb-3">{v.title}</h3>
                  <p className="text-secondary/60 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
