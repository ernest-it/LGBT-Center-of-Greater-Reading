'use client';

import { motion } from 'framer-motion';
import HeroBanner from '../../../components/HeroBanner';
import TeamMemberCard from '../../../components/TeamMemberCard';
import AnimatedSection from '../../../components/AnimatedSection';

const placeholderTeam = [
  { id: 1, name: 'Staff Member', title: 'Executive Director', bio: 'Leading our organization with vision and dedication to serving the LGBTQ+ community.', photo: null },
  { id: 2, name: 'Staff Member', title: 'Program Director', bio: 'Overseeing our diverse programs and ensuring they meet community needs.', photo: null },
  { id: 3, name: 'Staff Member', title: 'Community Outreach Coordinator', bio: 'Building connections and partnerships across the Greater Reading area.', photo: null },
  { id: 4, name: 'Staff Member', title: 'Counseling Services Lead', bio: 'Providing compassionate, affirming mental health support.', photo: null },
  { id: 5, name: 'Staff Member', title: 'Events Coordinator', bio: 'Planning and organizing community events that bring people together.', photo: null },
  { id: 6, name: 'Staff Member', title: 'Administrative Assistant', bio: 'Keeping our center running smoothly behind the scenes.', photo: null },
];

export default function TeamClient({ team }) {
  const members = team?.length > 0 ? team : placeholderTeam;

  return (
    <>
      <HeroBanner
        title="Meet the Team"
        subtitle="The passionate individuals dedicated to serving our community every day."
        backgroundImage={null}
        compact
      />

      <section className="section-padding bg-cream">
        <div className="container-wide">
          <AnimatedSection variant="slideUp" className="text-center mb-14">
            <span className="text-primary font-semibold text-sm tracking-wider uppercase">Our People</span>
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mt-3">Our Staff</h2>
            <p className="text-secondary/60 mt-4 max-w-2xl mx-auto">
              Our team brings diverse backgrounds, skills, and perspectives united by a
              shared commitment to serving the LGBTQ+ community.
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
