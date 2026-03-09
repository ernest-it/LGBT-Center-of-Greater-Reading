'use client';

import ContentPage from '../../../components/ContentPage';

export default function ArtsCulturePage() {
  return (
    <ContentPage
      title="Arts & Culture"
      subtitle="Creative expression, cultural celebrations, and artistic community."
      image={null}
      imageAlt="Writing group at the LGBT Center"
      content={[
        {
          heading: 'Arts & Culture at the LGBT Center of Greater Reading',
          text: 'The arts have always been a powerful tool for self-expression, community building, and social change. Our Arts & Culture programs provide opportunities for LGBTQ+ community members to explore their creativity, share their stories, and celebrate queer art and culture.',
        },
        {
          heading: 'Programs & Events',
          list: [
            'Art workshops and classes (painting, drawing, mixed media)',
            'Creative writing groups and open mic nights',
            'Photography workshops',
            'Art exhibitions featuring local LGBTQ+ artists',
            'Performance events (drag shows, theater, music)',
            'Film screenings and discussions',
            'Cultural celebrations and heritage events',
            'Pride Month programming',
          ],
        },
        {
          heading: 'Get Involved',
          text: 'Whether you are an experienced artist or just curious about creative expression, our programs welcome all skill levels. We are also always looking for local LGBTQ+ artists who would like to exhibit their work or lead workshops.',
        },
      ]}
      schedule={[
        'Art Workshop: Saturdays 1pm - 3pm',
        'Writing Group: 2nd & 4th Wednesdays 6pm',
        'Open Mic: Monthly (check calendar)',
        'Exhibitions: Rotating monthly',
      ]}
      contact={{ location: '501 Washington St, Reading, PA 19601', phone: '(610) 375-6070' }}
      relatedLinks={[
        { label: 'Social Groups', href: '/programs/social-groups' },
        { label: 'Events Calendar', href: '/events' },
        { label: 'Community Library', href: '/services/library' },
      ]}
    />
  );
}
