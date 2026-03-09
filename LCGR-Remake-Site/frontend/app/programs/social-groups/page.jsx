'use client';

import ContentPage from '../../../components/ContentPage';

export default function SocialGroupsPage() {
  return (
    <ContentPage
      title="Social Groups"
      subtitle="Connect with community through fun activities and gatherings."
      image={null}
      imageAlt="Gaymers Unite social group at the LGBT Center"
      content={[
        {
          heading: 'About Social Groups',
          text: 'Our social groups provide opportunities for LGBTQ+ community members and allies to connect, have fun, and build friendships in a welcoming environment. From game nights to movie screenings, there is something for everyone.',
        },
        {
          heading: 'Regular Activities',
          list: [
            'Community Game Night - Board games, card games, and video games',
            'Movie Night - LGBTQ+ films and discussions',
            'Coffee & Conversation - Casual meetups for community connection',
            'Potluck Dinners - Monthly community meals',
            'Outdoor Activities - Seasonal hiking, picnics, and outings',
            'Craft Nights - Creative projects in a social setting',
            'Holiday Celebrations - Seasonal parties and celebrations',
          ],
        },
        {
          heading: 'Join Us',
          text: 'All social activities are free and open to LGBTQ+ community members and allies. No registration required for most events - just show up and have fun! Check our events calendar for specific dates and times.',
        },
      ]}
      schedule={[
        'Game Night: 1st & 3rd Fridays 6pm - 9pm',
        'Movie Night: 2nd Saturday 7pm',
        'Coffee Hour: Wednesdays 10am - 12pm',
        'See events calendar for special events',
      ]}
      contact={{ location: '501 Washington St, Reading, PA 19601', phone: '(610) 375-6070' }}
      relatedLinks={[
        { label: 'Events Calendar', href: '/events' },
        { label: 'Support Groups', href: '/programs/support-groups' },
        { label: 'Arts & Culture', href: '/programs/arts-culture' },
      ]}
    />
  );
}
