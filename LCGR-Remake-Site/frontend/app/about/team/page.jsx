import TeamClient from './TeamClient';
import { getTeamMembers, getImageUrl } from '../../../lib/api';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Meet the Team' };

export default async function TeamPage() {
  const team = await getTeamMembers('staff', { dynamic: true });
  const fixed = team?.map(m => ({ ...m, photo: getImageUrl(m.image_url) })) || [];
  return <TeamClient team={fixed} />;
}
