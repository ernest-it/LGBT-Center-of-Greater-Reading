import AboutClient from './AboutClient';
import { getContent } from '../../lib/api';

export const metadata = { title: 'About Us' };

export default async function AboutPage() {
  const content = await getContent('about');
  return <AboutClient content={content} />;
}
