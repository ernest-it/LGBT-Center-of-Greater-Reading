'use client';

import ContentPage from '../../../components/ContentPage';

export default function FoodPantryPage() {
  return (
    <ContentPage
      title="Food Pantry"
      subtitle="Free, nutritious food for community members in need. No questions asked."
      image={null}
      imageAlt="LGBT Center food pantry"
      content={[
        {
          heading: 'About Our Food Pantry',
          text: 'The Center\'s Food Pantry provides free, nutritious food to members of our community experiencing food insecurity. We believe that access to healthy food is a basic right, and we are committed to ensuring no one in our community goes hungry.',
        },
        {
          heading: 'What We Provide',
          list: [
            'Fresh produce and fruits (when available)',
            'Canned goods and non-perishable items',
            'Bread and baked goods',
            'Personal hygiene products',
            'Household essentials',
            'Pet food (when available)',
            'Holiday meal packages (seasonal)',
          ],
        },
        {
          heading: 'How to Access',
          text: 'Our food pantry is open to all community members. No ID, proof of income, or documentation is required. Simply visit during our distribution hours. If you need assistance outside of regular hours, please contact us and we will do our best to accommodate you.',
        },
        {
          heading: 'Donate to the Pantry',
          text: 'We are always in need of food and personal care item donations. You can drop off donations during our regular operating hours. Financial donations are also welcome and allow us to purchase items that are most needed.',
        },
      ]}
      schedule={['Distribution: Thursdays 12pm - 4pm', 'Donations accepted: Mon - Fri 10am - 6pm']}
      contact={{ location: '501 Washington St, Reading, PA 19601', phone: '(610) 375-6070' }}
      relatedLinks={[
        { label: 'Health & Wellness', href: '/services/health-wellness' },
        { label: 'Volunteer', href: '/get-involved/volunteer' },
        { label: 'Donate', href: '/get-involved/donate' },
      ]}
    />
  );
}
