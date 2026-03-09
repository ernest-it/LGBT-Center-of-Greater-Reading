import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Image, Newspaper, Calendar, Users, Plus, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import client from '../api/client';

const statCards = [
  { key: 'banners', label: 'Banners', icon: Image, color: 'bg-teal', link: '/banners' },
  { key: 'news', label: 'News Articles', icon: Newspaper, color: 'bg-purple', link: '/news-events' },
  { key: 'events', label: 'Events', icon: Calendar, color: 'bg-navy', link: '/news-events' },
  { key: 'team', label: 'Team Members', icon: Users, color: 'bg-teal-600', link: '/team' },
];

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ banners: 0, news: 0, events: 0, team: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [bannersRes, newsEventsRes, teamRes] = await Promise.allSettled([
          client.get('/banners'),
          client.get('/news-events'),
          client.get('/team'),
        ]);

        const banners = bannersRes.status === 'fulfilled' ? bannersRes.value.data : [];
        const newsEvents = newsEventsRes.status === 'fulfilled' ? newsEventsRes.value.data : [];
        const team = teamRes.status === 'fulfilled' ? teamRes.value.data : [];

        const newsData = Array.isArray(newsEvents) ? newsEvents : (newsEvents.data || []);
        const bannersData = Array.isArray(banners) ? banners : (banners.data || []);
        const teamData = Array.isArray(team) ? team : (team.data || []);

        setStats({
          banners: bannersData.length,
          news: newsData.filter((item) => item.type === 'news').length,
          events: newsData.filter((item) => item.type === 'event').length,
          team: teamData.length,
        });
      } catch {
        // Stats will remain at 0
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="page-title">
          Welcome back{user?.username ? `, ${user.username}` : ''}
        </h1>
        <p className="text-gray-500 mt-1">
          Manage your website content from here.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map(({ key, label, icon: Icon, color, link }) => (
          <Link
            key={key}
            to={link}
            className="card hover:shadow-md transition-shadow group"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{label}</p>
                <p className="text-3xl font-bold text-navy mt-1">
                  {loading ? (
                    <span className="inline-block w-8 h-8 bg-gray-200 rounded animate-pulse" />
                  ) : (
                    stats[key]
                  )}
                </p>
              </div>
              <div className={`${color} rounded-xl p-3`}>
                <Icon size={24} className="text-white" />
              </div>
            </div>
            <div className="mt-3 flex items-center text-sm text-teal font-medium group-hover:underline">
              View all <ArrowRight size={14} className="ml-1" />
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2 className="text-lg font-semibold text-navy mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <Link
            to="/banners/new"
            className="flex items-center gap-2 px-4 py-3 rounded-lg border border-gray-200 hover:border-teal hover:bg-teal-50/50 transition-colors text-sm font-medium text-navy"
          >
            <Plus size={16} className="text-teal" />
            Add New Banner
          </Link>
          <Link
            to="/news-events/new"
            className="flex items-center gap-2 px-4 py-3 rounded-lg border border-gray-200 hover:border-teal hover:bg-teal-50/50 transition-colors text-sm font-medium text-navy"
          >
            <Plus size={16} className="text-teal" />
            Add News / Event
          </Link>
          <Link
            to="/team/new"
            className="flex items-center gap-2 px-4 py-3 rounded-lg border border-gray-200 hover:border-teal hover:bg-teal-50/50 transition-colors text-sm font-medium text-navy"
          >
            <Plus size={16} className="text-teal" />
            Add Team Member
          </Link>
          <Link
            to="/content"
            className="flex items-center gap-2 px-4 py-3 rounded-lg border border-gray-200 hover:border-teal hover:bg-teal-50/50 transition-colors text-sm font-medium text-navy"
          >
            <ArrowRight size={16} className="text-teal" />
            Edit Page Content
          </Link>
        </div>
      </div>
    </div>
  );
}
