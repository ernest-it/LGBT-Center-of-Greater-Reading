'use client';

import ContentPage from '../../../components/ContentPage';

export default function VolunteerPage() {
  return (
    <ContentPage
      title="Volunteer"
      subtitle="Share your time and talents to make a real difference in our community."
      image={null}
      imageAlt="Volunteers at the LGBT Center of Greater Reading"
      content={[
        {
          heading: 'Why Volunteer?',
          text: 'Volunteers are the heart of the LGBT Center of Greater Reading. Whether you can give a few hours a month or several days a week, your contribution helps us serve more people, run more programs, and build a stronger community.',
        },
        {
          heading: 'Volunteer Opportunities',
          list: [
            'Front Desk & Hospitality - Welcome visitors and help with daily operations',
            'Event Planning & Setup - Help organize and run community events',
            'Food Pantry - Sort donations and assist with distribution',
            'Mentorship Programs - Share your experience with LGBTQ+ youth',
            'Fundraising & Outreach - Help with campaigns and community engagement',
            'Administrative Support - Data entry, filing, and organizational tasks',
            'Social Media & Communications - Help tell our story online',
            'Special Skills - Graphic design, photography, legal aid, and more',
          ],
        },
        {
          heading: 'How to Get Started',
          text: 'Getting started is easy! Attend one of our volunteer orientation sessions, held monthly. During orientation, you will learn about our mission, tour the center, and find the best fit for your skills and interests. All volunteers must complete a brief application and background check.',
        },
        {
          heading: 'Volunteer Requirements',
          list: [
            'Must be 16 years or older (under 18 requires parental consent)',
            'Complete volunteer application and orientation',
            'Background check required for roles working with youth',
            'Commitment to our values of inclusion and respect',
          ],
        },
      ]}
      schedule={[
        'Orientation: 2nd Saturday of each month, 10am',
        'Flexible scheduling available',
        'Contact us to discuss opportunities',
      ]}
      contact={{ location: '501 Washington St, Reading, PA 19601', phone: '(610) 375-6070' }}
      relatedLinks={[
        { label: 'Donate', href: '/get-involved/donate' },
        { label: 'Work With Us', href: '/get-involved/work-with-us' },
        { label: 'Events Calendar', href: '/events' },
      ]}
    />
  );
}
