'use client';

import ContentPage from '../../../components/ContentPage';

export default function HealthWellnessPage() {
  return (
    <ContentPage
      title="Health & Wellness"
      subtitle="Comprehensive health services and wellness resources for our community."
      image={null}
      imageAlt="Health and wellness services at the LGBT Center"
      content={[
        {
          heading: 'Health Services',
          text: 'We provide a range of health and wellness services designed to meet the unique needs of the LGBTQ+ community. Our programs promote physical health, mental wellbeing, and access to quality healthcare.',
        },
        {
          heading: 'Available Services',
          list: [
            'HIV/STI testing and counseling (free and confidential)',
            'Health screenings and wellness checks',
            'PrEP education and navigation',
            'Health insurance enrollment assistance',
            'Harm reduction resources',
            'Wellness workshops and education',
            'Referrals to LGBTQ+-affirming healthcare providers',
            'Sexual health resources and education',
          ],
        },
        {
          heading: 'Community Health Events',
          text: 'Throughout the year, we host community health fairs, screening days, and wellness workshops. These events are free and open to all community members. Check our events calendar for upcoming health-related events.',
        },
      ]}
      schedule={['Walk-in testing: Wednesdays 2pm - 5pm', 'By appointment: Monday - Friday', 'Health fairs: Monthly (check calendar)']}
      contact={{ location: '501 Washington St, Reading, PA 19601', phone: '(610) 375-6070' }}
      relatedLinks={[
        { label: 'Counseling Services', href: '/services/counseling' },
        { label: 'Food Pantry', href: '/services/food-pantry' },
        { label: 'Community Resources', href: '/resources' },
      ]}
    />
  );
}
