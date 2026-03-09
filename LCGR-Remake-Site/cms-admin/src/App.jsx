import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Setup from './pages/Setup';
import Dashboard from './pages/Dashboard';
import BannersPage from './pages/BannersPage';
import BannerForm from './pages/BannerForm';
import NewsEventsPage from './pages/NewsEventsPage';
import NewsEventForm from './pages/NewsEventForm';
import ContentPage from './pages/ContentPage';
import ContentForm from './pages/ContentForm';
import TeamPage from './pages/TeamPage';
import TeamForm from './pages/TeamForm';
import BoardMembersPage from './pages/BoardMembersPage';
import BoardMemberForm from './pages/BoardMemberForm';
import MeetTheTeamPage from './pages/MeetTheTeamPage';
import StaffMemberForm from './pages/StaffMemberForm';

function App() {
  const { needsSetup, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-teal"></div>
      </div>
    );
  }

  // If no users exist, show setup screen
  if (needsSetup) {
    return (
      <Routes>
        <Route path="*" element={<Setup />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="banners" element={<BannersPage />} />
        <Route path="banners/new" element={<BannerForm />} />
        <Route path="banners/:id/edit" element={<BannerForm />} />
        <Route path="news-events" element={<NewsEventsPage />} />
        <Route path="news-events/new" element={<NewsEventForm />} />
        <Route path="news-events/:id/edit" element={<NewsEventForm />} />
        <Route path="content" element={<ContentPage />} />
        <Route path="content/:id/edit" element={<ContentForm />} />
        <Route path="team" element={<TeamPage />} />
        <Route path="team/new" element={<TeamForm />} />
        <Route path="team/:id/edit" element={<TeamForm />} />
        <Route path="board" element={<BoardMembersPage />} />
        <Route path="board/new" element={<BoardMemberForm />} />
        <Route path="board/:id/edit" element={<BoardMemberForm />} />
        <Route path="staff" element={<MeetTheTeamPage />} />
        <Route path="staff/new" element={<StaffMemberForm />} />
        <Route path="staff/:id/edit" element={<StaffMemberForm />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
