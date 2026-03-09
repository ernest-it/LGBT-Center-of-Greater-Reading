'use client';

import ContentPage from '../../../components/ContentPage';

export default function CounselingPage() {
  return (
    <ContentPage
      title="Counseling Services"
      subtitle="Professional, affirming mental health support for individuals, couples, and families."
      image={null}
      imageAlt="Counseling services at the LGBT Center"
      content={[
        {
          heading: 'About Our Counseling Services',
          text: 'The LGBT Center of Greater Reading provides professional counseling services that are inclusive, affirming, and tailored to the unique experiences of LGBTQ+ individuals and their families. Our licensed counselors understand the specific challenges faced by our community and provide compassionate support.',
        },
        {
          heading: 'What We Offer',
          list: [
            'Individual counseling for adults and adolescents',
            'Couples and relationship counseling',
            'Family therapy and mediation',
            'Coming out support and guidance',
            'Gender identity exploration',
            'Anxiety, depression, and stress management',
            'Grief and loss support',
            'Referrals to specialized providers when needed',
          ],
        },
        {
          heading: 'Our Approach',
          text: 'We believe that everyone deserves access to quality mental health care. Our counselors use evidence-based approaches in a warm, non-judgmental setting. Sessions are confidential and can be scheduled at times that work for you. We offer sliding scale fees to ensure accessibility.',
        },
      ]}
      schedule={['Monday - Friday: 10am - 6pm', 'Evening appointments available', 'By appointment only']}
      contact={{ location: '501 Washington St, Reading, PA 19601', phone: '(610) 375-6070' }}
      relatedLinks={[
        { label: 'Health & Wellness', href: '/services/health-wellness' },
        { label: 'Support Groups', href: '/programs/support-groups' },
        { label: 'Trans & Nonbinary Resources', href: '/programs/trans-nonbinary' },
      ]}
    />
  );
}
