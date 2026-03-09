const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';

async function fetchAPI(endpoint, { dynamic = false } = {}) {
  try {
    const opts = dynamic ? { cache: 'no-store' } : { next: { revalidate: 60 } };
    const res = await fetch(`${API_BASE}${endpoint}`, opts);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

// Prefix relative image URLs with the backend URL so the browser can load them
export function getImageUrl(path) {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  return `${BACKEND_URL}${path}`;
}

export async function getBanners(pageSection) {
  return fetchAPI(`/banners?page_section=${pageSection}`);
}

export async function getNewsEvents(type) {
  return fetchAPI(`/news-events?type=${type}`);
}

export async function getContent(pageName, sectionName) {
  const query = sectionName ? `?section=${sectionName}` : '';
  return fetchAPI(`/content/${pageName}${query}`);
}

export async function getTeamMembers(type, { dynamic = false } = {}) {
  const query = type ? `?type=${type}` : '';
  return fetchAPI(`/team${query}`, { dynamic });
}

export async function getEvents() {
  return fetchAPI('/news-events?type=event');
}

export async function getNews() {
  return fetchAPI('/news-events?type=news');
}
