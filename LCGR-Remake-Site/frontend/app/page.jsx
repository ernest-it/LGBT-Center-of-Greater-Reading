import { getBanners, getNewsEvents, getImageUrl } from '../lib/api';
import HomeClient from './HomeClient';

export default async function HomePage() {
  const [banners, events, news] = await Promise.all([
    getBanners('home_hero'),
    getNewsEvents('event'),
    getNewsEvents('news'),
  ]);

  // Fix image URLs for all items
  const fixedEvents = events?.map(e => ({ ...e, image_url: getImageUrl(e.image_url) })) || [];
  const fixedNews = news?.map(n => ({ ...n, image_url: getImageUrl(n.image_url) })) || [];

  return (
    <HomeClient
      bannerImage={getImageUrl(banners?.[0]?.image_url) || null}
      events={fixedEvents}
      news={fixedNews}
    />
  );
}
