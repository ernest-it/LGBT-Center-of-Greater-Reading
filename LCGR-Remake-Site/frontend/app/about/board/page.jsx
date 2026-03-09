import BoardClient from './BoardClient';
import { getTeamMembers, getImageUrl } from '../../../lib/api';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Board of Directors' };

export default async function BoardPage() {
  const board = await getTeamMembers('board', { dynamic: true });
  const fixed = board?.map(m => ({ ...m, photo: getImageUrl(m.image_url) })) || [];
  return <BoardClient board={fixed} />;
}
