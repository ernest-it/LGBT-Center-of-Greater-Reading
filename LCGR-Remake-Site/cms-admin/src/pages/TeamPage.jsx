import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Pencil, Trash2, UserCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import client from '../api/client';
import DataTable from '../components/DataTable';
import ConfirmDialog from '../components/ConfirmDialog';

const FILTERS = ['all', 'staff', 'board'];

export default function TeamPage() {
  const [members, setMembers] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchMembers = async () => {
    try {
      const res = await client.get('/team');
      const data = Array.isArray(res.data) ? res.data : (res.data.data || []);
      setMembers(data);
    } catch {
      toast.error('Failed to load team members');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await client.delete(`/team/${deleteTarget.id}`);
      toast.success('Team member deleted successfully');
      fetchMembers();
    } catch {
      toast.error('Failed to delete team member');
    } finally {
      setDeleteTarget(null);
    }
  };

  const filtered = filter === 'all' ? members : members.filter((m) => m.member_type === filter);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-teal"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Team Members</h1>
        <Link to="/team/new" className="btn-primary flex items-center gap-2">
          <Plus size={18} />
          Add Member
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1 mb-6 bg-gray-100 rounded-lg p-1 w-fit">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors capitalize ${
              filter === f
                ? 'bg-white text-navy shadow-sm'
                : 'text-gray-500 hover:text-navy'
            }`}
          >
            {f === 'all' ? 'All' : f === 'staff' ? 'Staff' : 'Board'}
          </button>
        ))}
      </div>

      <DataTable
        columns={['Photo', 'Name', 'Title', 'Type', 'Status', 'Actions']}
        data={filtered}
        emptyMessage="No team members found."
        renderRow={(member) => (
          <tr key={member.id} className="hover:bg-gray-50 transition-colors">
            <td className="px-6 py-4">
              {member.image_url ? (
                <img
                  src={member.image_url.startsWith('http') ? member.image_url : `http://localhost:3001${member.image_url}`}
                  alt={member.name}
                  className="w-10 h-10 rounded-full object-cover border border-gray-200"
                />
              ) : (
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <UserCircle size={20} className="text-gray-400" />
                </div>
              )}
            </td>
            <td className="px-6 py-4">
              <p className="font-medium text-navy text-sm">{member.name}</p>
            </td>
            <td className="px-6 py-4 text-sm text-gray-600">
              {member.title || '--'}
            </td>
            <td className="px-6 py-4">
              <span
                className={`badge ${
                  member.member_type === 'staff' ? 'badge-staff' : 'badge-board'
                }`}
              >
                {member.member_type === 'staff' ? 'Staff' : 'Board'}
              </span>
            </td>
            <td className="px-6 py-4">
              <span className={`badge ${member.is_active ? 'badge-active' : 'badge-inactive'}`}>
                {member.is_active ? 'Active' : 'Inactive'}
              </span>
            </td>
            <td className="px-6 py-4">
              <div className="flex items-center gap-2">
                <Link
                  to={`/team/${member.id}/edit`}
                  className="p-2 text-gray-400 hover:text-teal hover:bg-teal-50 rounded-lg transition-colors"
                  title="Edit"
                >
                  <Pencil size={16} />
                </Link>
                <button
                  onClick={() => setDeleteTarget(member)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </td>
          </tr>
        )}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete Team Member"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
