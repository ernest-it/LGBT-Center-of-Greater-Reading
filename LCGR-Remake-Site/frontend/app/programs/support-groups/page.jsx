'use client';

import ContentPage from '../../../components/ContentPage';

export default function SupportGroupsPage() {
  return (
    <ContentPage
      title="Support Groups"
      subtitle="Safe, confidential spaces to share, connect, and grow together."
      image={null}
      imageAlt="Support group meeting at the LGBT Center"
      content={[
        {
          heading: 'About Our Support Groups',
          text: 'Our support groups provide a safe, confidential environment where community members can share experiences, find understanding, and build meaningful connections. Led by trained facilitators, our groups offer peer support for a variety of needs.',
        },
        {
          heading: 'Current Groups',
          list: [
            'LGBTQ+ Youth Group (ages 13-18) - Weekly meetings with activities and discussion',
            'Young Adults Group (ages 18-30) - Social support and life skills',
            'General Adult Support Group - Open to all LGBTQ+ adults',
            'Trans & Nonbinary Support Group - For transgender and nonbinary individuals',
            'Family & Friends Group - For families and allies of LGBTQ+ individuals',
            'Coming Out Support - A supportive space for those navigating coming out',
            'Grief & Loss Group - Processing loss in a supportive community',
          ],
        },
        {
          heading: 'How to Join',
          text: 'All support groups are free and open to community members. Some groups may require a brief intake meeting. Contact us to learn more about which group is right for you, or simply show up during a meeting time. All are welcome.',
        },
      ]}
      schedule={[
        'Youth Group: Tuesdays 4pm - 5:30pm',
        'Adult Group: Wednesdays 6pm - 7:30pm',
        'Trans/NB Group: Thursdays 5:30pm - 7pm',
        'Family Group: 2nd & 4th Saturdays 10am - 11:30am',
      ]}
      contact={{ location: '501 Washington St, Reading, PA 19601', phone: '(610) 375-6070' }}
      relatedLinks={[
        { label: 'Counseling Services', href: '/services/counseling' },
        { label: 'Social Groups', href: '/programs/social-groups' },
        { label: 'Trans & Nonbinary Programs', href: '/programs/trans-nonbinary' },
      ]}
    />
  );
}
