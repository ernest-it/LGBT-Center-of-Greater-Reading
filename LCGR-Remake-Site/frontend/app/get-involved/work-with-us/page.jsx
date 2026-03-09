'use client';

import HeroBanner from '../../../components/HeroBanner';
import AnimatedSection from '../../../components/AnimatedSection';
import CTASection from '../../../components/CTASection';
import { Briefcase, MapPin, Clock, ArrowRight } from 'lucide-react';

const openings = [
  {
    title: 'Program Coordinator',
    type: 'Full-time',
    location: 'Reading, PA',
    desc: 'Oversee the planning, implementation, and evaluation of community programs and support groups.',
  },
  {
    title: 'Youth Outreach Specialist',
    type: 'Part-time',
    location: 'Reading, PA',
    desc: 'Develop and facilitate programming for LGBTQ+ youth, including support groups and social activities.',
  },
  {
    title: 'Development Associate',
    type: 'Full-time',
    location: 'Reading, PA',
    desc: 'Support fundraising efforts, donor relations, grant writing, and special event coordination.',
  },
];

export default function WorkWithUsPage() {
  return (
    <>
      <HeroBanner
        title="Work With Us"
        subtitle="Join our team and build a career making a difference."
        backgroundImage={null}
        compact
      />

      <section className="section-padding bg-cream">
        <div className="container-narrow">
          <AnimatedSection variant="slideUp" className="text-center mb-14">
            <span className="text-primary font-semibold text-sm tracking-wider uppercase">Careers</span>
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mt-3">
              Current Openings
            </h2>
            <p className="text-secondary/60 mt-4 max-w-2xl mx-auto">
              We are always looking for passionate individuals to join our team.
              The LGBT Center of Greater Reading is an equal opportunity employer.
            </p>
          </AnimatedSection>

          <div className="space-y-6">
            {openings.map((job, i) => (
              <AnimatedSection key={job.title} variant="slideUp" delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-8 shadow-lg shadow-black/5 border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-secondary mb-2">{job.title}</h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-secondary/50 mb-3">
                        <span className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          {job.type}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </span>
                      </div>
                      <p className="text-secondary/60 leading-relaxed">{job.desc}</p>
                    </div>
                    <button className="btn-primary shrink-0">
                      Apply
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection variant="slideUp" className="mt-12">
            <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 text-center border border-primary/10">
              <h3 className="text-xl font-bold text-secondary mb-3">Do not see a match?</h3>
              <p className="text-secondary/60 mb-6">
                We are always interested in hearing from talented individuals who share our mission.
                Send your resume and a brief cover letter to get on our radar.
              </p>
              <a
                href="mailto:info@lgbtcentergreaterreading.org"
                className="btn-outline"
              >
                Send Your Resume
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <CTASection />
    </>
  );
}
