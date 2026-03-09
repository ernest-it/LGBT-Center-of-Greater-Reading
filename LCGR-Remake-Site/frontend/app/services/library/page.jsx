'use client';

import ContentPage from '../../../components/ContentPage';

export default function LibraryPage() {
  return (
    <ContentPage
      title="Community Library"
      subtitle="Explore our curated collection of LGBTQ+ literature, films, and resources."
      image={null}
      imageAlt="Library and sensory space at the LGBT Center"
      content={[
        {
          heading: 'About Our Library',
          text: 'The Center\'s Community Library houses a thoughtfully curated collection of LGBTQ+ literature, films, educational materials, and resources. Our library serves as both a learning space and a safe haven for those seeking knowledge, representation, and connection through media.',
        },
        {
          heading: 'Our Collection Includes',
          list: [
            'Fiction and non-fiction by LGBTQ+ authors',
            'Young adult and children\'s books with LGBTQ+ themes',
            'Historical and academic texts on LGBTQ+ issues',
            'DVDs and films featuring LGBTQ+ stories',
            'Magazines and periodicals',
            'Educational resources for families and allies',
            'Local and national LGBTQ+ publications',
          ],
        },
        {
          heading: 'Library Programs',
          text: 'We host a monthly book club, reading events, and author visits. Our library is also available for quiet study and research. Check our events calendar for upcoming library programs.',
        },
        {
          heading: 'Borrowing',
          text: 'All community members are welcome to borrow materials from our library. Simply sign up for a free library card at the front desk. Books may be borrowed for up to three weeks.',
        },
      ]}
      schedule={['Monday - Friday: 10am - 6pm', 'Saturday: 10am - 2pm', 'Book Club: Last Tuesday of each month, 7pm']}
      contact={{ location: '501 Washington St, Reading, PA 19601', phone: '(610) 375-6070' }}
      relatedLinks={[
        { label: 'Arts & Culture', href: '/programs/arts-culture' },
        { label: 'Events Calendar', href: '/events' },
        { label: 'Resources', href: '/resources' },
      ]}
    />
  );
}
