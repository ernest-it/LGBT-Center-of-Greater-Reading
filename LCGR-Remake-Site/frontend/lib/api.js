// Server-side rendering uses an internal URL (for Docker networking),
// falling back to the public URL. Client-side always uses the public URL.
const isServer = typeof window === 'undefined';
const API_BASE = isServer
  ? (process.env.INTERNAL_API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api')
  : (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api');
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
  return fetchAPI(`/banners?page_section=${encodeURIComponent(pageSection)}`);
}

export async function getNewsEvents(type) {
  return fetchAPI(`/news-events?type=${encodeURIComponent(type)}`);
}

export async function getContent(pageName, sectionName) {
  const query = sectionName ? `?section=${encodeURIComponent(sectionName)}` : '';
  return fetchAPI(`/content/${encodeURIComponent(pageName)}${query}`);
}

export async function getTeamMembers(type, { dynamic = false } = {}) {
  const query = type ? `?type=${encodeURIComponent(type)}` : '';
  return fetchAPI(`/team${query}`, { dynamic });
}

export async function getEvents() {
  return fetchAPI('/news-events?type=event');
}

export async function getNews() {
  return fetchAPI('/news-events?type=news');
}
