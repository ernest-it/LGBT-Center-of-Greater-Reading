import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import client from '../api/client';
import DataTable from '../components/DataTable';
import ConfirmDialog from '../components/ConfirmDialog';

const FILTERS = ['all', 'news', 'event'];

export default function NewsEventsPage() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchItems = async () => {
    try {
      const res = await client.get('/news-events');
      const data = Array.isArray(res.data) ? res.data : (res.data.data || []);
      setItems(data);
    } catch {
      toast.error('Failed to load news & events');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await client.delete(`/news-events/${deleteTarget.id}`);
      toast.success('Item deleted successfully');
      fetchItems();
    } catch {
      toast.error('Failed to delete item');
    } finally {
      setDeleteTarget(null);
    }
  };

  const filtered = filter === 'all' ? items : items.filter((i) => i.type === filter);

  const formatDate = (dateStr) => {
    if (!dateStr) return '--';
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

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
        <h1 className="page-title">News & Events</h1>
        <Link to="/news-events/new" className="btn-primary flex items-center gap-2">
          <Plus size={18} />
          Add New
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
            {f === 'all' ? 'All' : f === 'news' ? 'News' : 'Events'}
          </button>
        ))}
      </div>

      <DataTable
        columns={['Title', 'Type', 'Date', 'Status', 'Actions']}
        data={filtered}
        emptyMessage="No items found."
        renderRow={(item) => (
          <tr key={item.id} className="hover:bg-gray-50 transition-colors">
            <td className="px-6 py-4">
              <div>
                <p className="font-medium text-navy text-sm">{item.title}</p>
                {item.is_featured && (
                  <span className="text-xs text-purple font-medium">Featured</span>
                )}
              </div>
            </td>
            <td className="px-6 py-4">
              <span className={`badge ${item.type === 'news' ? 'badge-news' : 'badge-event'}`}>
                {item.type === 'news' ? 'News' : 'Event'}
              </span>
            </td>
            <td className="px-6 py-4 text-sm text-gray-600">
              {formatDate(item.date || item.event_date)}
            </td>
            <td className="px-6 py-4">
              <span className={`badge ${item.is_active ? 'badge-active' : 'badge-inactive'}`}>
                {item.is_active ? 'Active' : 'Inactive'}
              </span>
            </td>
            <td className="px-6 py-4">
              <div className="flex items-center gap-2">
                <Link
                  to={`/news-events/${item.id}/edit`}
                  className="p-2 text-gray-400 hover:text-teal hover:bg-teal-50 rounded-lg transition-colors"
                  title="Edit"
                >
                  <Pencil size={16} />
                </Link>
                <button
                  onClick={() => setDeleteTarget(item)}
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
        title="Delete Item"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
