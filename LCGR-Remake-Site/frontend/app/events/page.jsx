import EventsClient from './EventsClient';
import { getEvents, getImageUrl } from '../../lib/api';

export const metadata = { title: 'Events Calendar' };

export default async function EventsPage() {
  const events = await getEvents();
  const fixed = events?.map(e => ({ ...e, image_url: getImageUrl(e.image_url) })) || [];
  return <EventsClient events={fixed} />;
}
