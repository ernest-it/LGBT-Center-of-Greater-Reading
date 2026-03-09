'use client';

import { motion } from 'framer-motion';
import HeroBanner from '../../../components/HeroBanner';
import TeamMemberCard from '../../../components/TeamMemberCard';
import AnimatedSection from '../../../components/AnimatedSection';

const placeholderBoard = [
  { id: 1, name: 'Board Member', title: 'Board Chair', bio: 'Providing strategic leadership and guidance to our organization.', photo: null },
  { id: 2, name: 'Board Member', title: 'Vice Chair', bio: 'Supporting organizational governance and community advocacy.', photo: null },
  { id: 3, name: 'Board Member', title: 'Treasurer', bio: 'Ensuring sound financial management and transparency.', photo: null },
  { id: 4, name: 'Board Member', title: 'Secretary', bio: 'Maintaining organizational records and communications.', photo: null },
  { id: 5, name: 'Board Member', title: 'Member at Large', bio: 'Bringing diverse perspectives and community connections.', photo: null },
  { id: 6, name: 'Board Member', title: 'Member at Large', bio: 'Advocating for our community with passion and dedication.', photo: null },
];

export default function BoardClient({ board }) {
  const members = board?.length > 0 ? board : placeholderBoard;

  return (
    <>
      <HeroBanner
        title="Board of Directors"
        subtitle="The dedicated leaders guiding our mission and vision."
        backgroundImage={null}
        compact
      />

      <section className="section-padding bg-cream">
        <div className="container-wide">
          <AnimatedSection variant="slideUp" className="text-center mb-14">
            <span className="text-primary font-semibold text-sm tracking-wider uppercase">Leadership</span>
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mt-3">Our Board</h2>
            <p className="text-secondary/60 mt-4 max-w-2xl mx-auto">
              Our volunteer board members contribute their expertise and passion to advance
              our mission and serve the community.
            </p>
          </AnimatedSection>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {members.map((member, i) => (
              <TeamMemberCard key={member.id || i} {...member} />
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
