/**
 * Seed script - populates the database with sample data using real site images.
 * Run with: npm run seed
 */
require('dotenv').config({ path: require('path').resolve(__dirname, '..', '.env') });
const bcrypt = require('bcryptjs');
const getDb = require('./db');
const createTables = require('./schema');

function seed() {
  // Ensure tables exist
  createTables();

  const db = getDb();

  // Clear existing data (preserve users - those are created via setup screen)
  db.exec(`
    DELETE FROM banners;
    DELETE FROM news_events;
    DELETE FROM static_content;
    DELETE FROM team_members;
  `);

  console.log('Note: Admin account is created via the CMS setup screen on first boot.');

  // --- Banners (using real site images) ---
  const insertBanner = db.prepare(`
    INSERT INTO banners (page_section, image_url, alt_text, link_url, display_order, is_active)
    VALUES (?, ?, ?, ?, ?, 1)
  `);

  const banners = [
    ['home_hero', '', 'LGBT Center community group photo', null, 1],
    ['about_hero', '', 'About the LGBT Center of Greater Reading', null, 1],
    ['events_hero', '', 'Events calendar at the Center', null, 1],
    ['services_hero', '', 'Services offered at the Center', null, 1],
    ['programs_hero', '', 'Programs and groups at the Center', null, 1],
  ];

  const insertBanners = db.transaction(() => {
    for (const b of banners) insertBanner.run(...b);
  });
  insertBanners();
  console.log(`Inserted ${banners.length} banners.`);

  // --- News & Events (with real images) ---
  const insertNewsEvent = db.prepare(`
    INSERT INTO news_events (title, description, image_url, date, end_date, type, location, is_featured, is_active)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)
  `);

  const newsEvents = [
    [
      'Pride Month Kickoff Celebration',
      'Join us for our Pride Month kickoff with guest speakers, community activities, and a celebration of LGBTQ+ culture and history.',
      null,
      '2026-06-01',
      '2026-06-03',
      'event',
      'Community Hall',
      1,
    ],
    [
      'Rainbow Alliance Support Group',
      'Every Saturday evening, join our peer-led support group for LGBTQ+ individuals and allies in a safe, welcoming space.',
      null,
      '2026-03-14',
      null,
      'event',
      'Meeting Room A',
      1,
    ],
    [
      'Art Club Meeting',
      'Express yourself through art! Our weekly art club welcomes all skill levels for a creative and supportive session.',
      null,
      '2026-03-18',
      null,
      'event',
      'Activity Room',
      0,
    ],
    [
      'Trailgayzers Hiking Group',
      'Explore the outdoors with our hiking group! All fitness levels welcome. Meet at the Center for carpool.',
      null,
      '2026-03-22',
      null,
      'event',
      'Meet at the Center',
      0,
    ],
    [
      'Community Game Night',
      'Board games, card games, and video games in a welcoming environment. Snacks provided. All ages welcome!',
      null,
      '2026-03-15',
      null,
      'event',
      'Community Hall',
      1,
    ],
    [
      'Trans Day of Visibility Event',
      'Join us for an evening of storytelling, art, and community connection in honor of Trans Day of Visibility.',
      null,
      '2026-03-31',
      null,
      'event',
      'Community Hall',
      1,
    ],
    [
      'New Youth Program Launching',
      'We are excited to announce a new youth program offering mentorship, workshops, and safe social activities for LGBTQ+ teens.',
      null,
      '2026-03-10',
      null,
      'news',
      null,
      0,
    ],
  ];

  const insertAllNewsEvents = db.transaction(() => {
    for (const ne of newsEvents) insertNewsEvent.run(...ne);
  });
  insertAllNewsEvents();
  console.log(`Inserted ${newsEvents.length} news/events.`);

  // --- Static Content ---
  const upsertContent = db.prepare(`
    INSERT INTO static_content (page_name, section_name, text_content)
    VALUES (?, ?, ?)
    ON CONFLICT(page_name, section_name) DO UPDATE SET
      text_content = excluded.text_content,
      updated_at = CURRENT_TIMESTAMP
  `);

  const staticContent = [
    ['home', 'welcome_title', 'Welcome to the LGBT Center of Greater Reading'],
    ['home', 'welcome_text', 'The LGBT Center of Greater Reading provides support, advocacy, and resources to the Greater Reading LGBTQ+ Community and its allies and will be the leading expert resource to the LGBTQ+ community and allies for advocacy, support, services and fellowship.'],
    ['home', 'services_title', 'What We Offer'],
    ['home', 'programs_description', 'Support groups, youth programs, social events, and educational workshops for the LGBTQ+ community.'],
    ['home', 'resources_description', 'Counseling referrals, legal aid resources, health services information, and community connections.'],
    ['home', 'advocacy_description', 'Community advocacy, policy engagement, and awareness campaigns throughout the year.'],
    ['about', 'hero_title', 'About Us'],
    ['about', 'history_title', 'Our Story'],
    ['about', 'history_text', 'The LGBT Center of Greater Reading has been a cornerstone of support and advocacy in the region since its founding. We are committed to fostering an inclusive community where every individual is welcomed, affirmed, and empowered.'],
    ['about', 'mission_title', 'Our Mission'],
    ['about', 'mission_text', 'To support, empower, and celebrate the LGBTQ+ community of Greater Reading through advocacy, education, and inclusive programming.'],
    ['about', 'values_title', 'Our Values'],
    ['about', 'values_text', 'Inclusivity, respect, community engagement, and social justice are at the core of everything we do.'],
    ['services', 'counseling_title', 'Counseling Services'],
    ['services', 'counseling_text', 'Our counseling services provide a safe and affirming space for LGBTQ+ individuals to explore their identities, work through challenges, and build resilience. We offer individual and group counseling with licensed professionals.'],
    ['services', 'health_title', 'Health & Wellness'],
    ['services', 'health_text', 'Free health screenings including HIV testing, blood pressure checks, and wellness consultations. We connect community members with affirming healthcare providers.'],
    ['services', 'food_pantry_title', 'Food Pantry'],
    ['services', 'food_pantry_text', 'The Center\'s Food Pantry provides free, nutritious food to members of our community experiencing food insecurity. We believe access to healthy food is a basic right.'],
    ['services', 'library_title', 'Library & Sensory Space'],
    ['services', 'library_text', 'The Center\'s Community Library houses a curated collection of LGBTQ+ literature, films, educational materials, and resources. Our sensory space provides a calming environment for those who need it.'],
    ['programs', 'support_groups_title', 'Support Groups'],
    ['programs', 'support_groups_text', 'Peer-led support groups for LGBTQ+ individuals, including groups for youth, adults, and specific identities. A safe space to share, listen, and grow together.'],
    ['programs', 'social_groups_title', 'Social Groups'],
    ['programs', 'social_groups_text', 'Connect with community through our social groups including Trailgayzers (hiking), Gaymers (gaming), book clubs, and more.'],
    ['programs', 'arts_culture_title', 'Arts & Culture'],
    ['programs', 'arts_culture_text', 'Express yourself through our arts and culture programming including writing groups, art club, movie nights, and creative workshops.'],
    ['programs', 'trans_nonbinary_title', 'Trans & Nonbinary Programs'],
    ['programs', 'trans_nonbinary_text', 'Dedicated programs and resources for transgender and nonbinary community members, including support groups, social events, and advocacy.'],
    ['contact', 'address', '640 Centre Ave, Reading, PA 19601'],
    ['contact', 'phone', '(610) 375-6070'],
    ['contact', 'email', 'info@lgbtcentergreaterreading.org'],
    ['contact', 'hours', 'Monday - Friday: 10 AM - 6 PM, Saturday: 10 AM - 2 PM, Sunday: Closed'],
  ];

  const insertAllContent = db.transaction(() => {
    for (const c of staticContent) upsertContent.run(...c);
  });
  insertAllContent();
  console.log(`Inserted ${staticContent.length} static content entries.`);

  // --- Team Members (using real board photos) ---
  const insertMember = db.prepare(`
    INSERT INTO team_members (name, title, bio, image_url, display_order, is_active, member_type)
    VALUES (?, ?, ?, ?, ?, 1, ?)
  `);

  const teamMembers = [
    ['Jen', 'Board Member', 'Dedicated board member serving the LGBT Center of Greater Reading community.', null, 1, 'board'],
    ['Charles Corbit', 'Board Member', 'Committed to advancing the mission and outreach of the Center.', null, 2, 'board'],
    ['M. Medina', 'Board Member', 'Passionate advocate for LGBTQ+ rights and community empowerment.', null, 3, 'board'],
  ];

  const insertAllMembers = db.transaction(() => {
    for (const m of teamMembers) insertMember.run(...m);
  });
  insertAllMembers();
  console.log(`Inserted ${teamMembers.length} team members.`);

  console.log('\nSeed complete!');
}

seed();
