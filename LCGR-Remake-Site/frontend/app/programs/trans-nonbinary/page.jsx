'use client';

import ContentPage from '../../../components/ContentPage';

export default function TransNonbinaryPage() {
  return (
    <ContentPage
      title="Trans & Nonbinary Programs"
      subtitle="Dedicated support, resources, and community for transgender and nonbinary individuals."
      image={null}
      imageAlt="Trans and nonbinary resources at the LGBT Center"
      content={[
        {
          heading: 'Trans & Nonbinary Services',
          text: 'The LGBT Center of Greater Reading is committed to providing dedicated, affirming services and programming for transgender and nonbinary community members. We understand the unique challenges and joys of the trans experience, and we are here to support you every step of the way.',
        },
        {
          heading: 'What We Offer',
          list: [
            'Trans & Nonbinary Support Group - Weekly peer-led group',
            'Gender-affirming counseling with experienced therapists',
            'Name and gender marker change resources and guidance',
            'Referrals to trans-affirming healthcare providers',
            'Clothing exchange and gender-affirming resources',
            'Family support and education for loved ones',
            'Advocacy and know-your-rights information',
            'Social events and community building activities',
          ],
        },
        {
          heading: 'A Safe Space',
          text: 'Our center is a safe, welcoming space for people of all gender identities and expressions. Whether you are questioning, beginning your transition, or well along your journey, you belong here. Our staff and volunteers are trained in trans-inclusive practices and use affirming language.',
        },
        {
          heading: 'Resources',
          text: 'We maintain an updated list of trans-friendly healthcare providers, legal resources, and support services in the Greater Reading area. Contact us to request a resource guide or to connect with a knowledgeable staff member.',
        },
      ]}
      schedule={[
        'Support Group: Thursdays 5:30pm - 7pm',
        'Drop-in Hours: Mon - Fri 10am - 6pm',
        'Counseling: By appointment',
      ]}
      contact={{ location: '501 Washington St, Reading, PA 19601', phone: '(610) 375-6070' }}
      relatedLinks={[
        { label: 'Counseling Services', href: '/services/counseling' },
        { label: 'Support Groups', href: '/programs/support-groups' },
        { label: 'Health & Wellness', href: '/services/health-wellness' },
        { label: 'Resources', href: '/resources' },
      ]}
    />
  );
}
