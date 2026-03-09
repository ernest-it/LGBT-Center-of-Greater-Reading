import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Image,
  Newspaper,
  FileText,
  Users,
  Shield,
  UserCheck,
  LogOut,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/banners', icon: Image, label: 'Banners' },
  { to: '/news-events', icon: Newspaper, label: 'News & Events' },
  { to: '/content', icon: FileText, label: 'Page Content' },
  { to: '/board', icon: Shield, label: 'Board Members' },
  { to: '/staff', icon: UserCheck, label: 'Meet the Team' },
  { to: '/team', icon: Users, label: 'All Members' },
];

export default function Sidebar() {
  const { logout, user } = useAuth();

  return (
    <aside className="w-64 bg-navy min-h-screen flex flex-col shadow-lg">
      {/* Branding */}
      <div className="px-6 py-5 border-b border-navy-300/20 flex items-center gap-3">
        <img
          src="/images/8659e2_750ed3b7566848afa53ca40b98ae2755_mv2.png"
          alt="LGBT Center of Greater Reading"
          className="h-10 w-10 object-contain flex-shrink-0"
        />
        <div>
          <p className="text-white text-sm font-semibold leading-tight">LGBT Center</p>
          <p className="text-teal-200 text-xs">Admin Dashboard</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ to, icon: Icon, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-teal text-white shadow-sm'
                  : 'text-gray-300 hover:bg-navy-400/30 hover:text-white'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* User / Logout */}
      <div className="px-3 py-4 border-t border-navy-300/20">
        {user && (
          <p className="text-gray-400 text-xs px-4 mb-2 truncate">
            Signed in as <span className="text-teal-200">{user.username}</span>
          </p>
        )}
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-300 hover:bg-red-600/20 hover:text-red-300 transition-colors w-full"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}
