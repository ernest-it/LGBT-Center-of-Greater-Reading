import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Pencil, Trash2, ImageIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import client from '../api/client';
import DataTable from '../components/DataTable';
import ConfirmDialog from '../components/ConfirmDialog';

export default function BannersPage() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchBanners = async () => {
    try {
      const res = await client.get('/banners');
      const data = Array.isArray(res.data) ? res.data : (res.data.data || []);
      setBanners(data);
    } catch {
      toast.error('Failed to load banners');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await client.delete(`/banners/${deleteTarget.id}`);
      toast.success('Banner deleted successfully');
      fetchBanners();
    } catch {
      toast.error('Failed to delete banner');
    } finally {
      setDeleteTarget(null);
    }
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
        <h1 className="page-title">Banners</h1>
        <Link to="/banners/new" className="btn-primary flex items-center gap-2">
          <Plus size={18} />
          Add New Banner
        </Link>
      </div>

      <DataTable
        columns={['Image', 'Page Section', 'Alt Text', 'Status', 'Actions']}
        data={banners}
        emptyMessage="No banners yet. Add your first banner!"
        renderRow={(banner) => (
          <tr key={banner.id} className="hover:bg-gray-50 transition-colors">
            <td className="px-6 py-4">
              {banner.image_url ? (
                <img
                  src={banner.image_url.startsWith('http') ? banner.image_url : `http://localhost:3001${banner.image_url}`}
                  alt={banner.alt_text || ''}
                  className="w-20 h-12 object-cover rounded-lg border border-gray-200"
                />
              ) : (
                <div className="w-20 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <ImageIcon size={18} className="text-gray-400" />
                </div>
              )}
            </td>
            <td className="px-6 py-4">
              <span className="font-medium text-navy text-sm">
                {banner.page_section?.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) || 'N/A'}
              </span>
            </td>
            <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
              {banner.alt_text || '--'}
            </td>
            <td className="px-6 py-4">
              <span className={`badge ${banner.is_active ? 'badge-active' : 'badge-inactive'}`}>
                {banner.is_active ? 'Active' : 'Inactive'}
              </span>
            </td>
            <td className="px-6 py-4">
              <div className="flex items-center gap-2">
                <Link
                  to={`/banners/${banner.id}/edit`}
                  className="p-2 text-gray-400 hover:text-teal hover:bg-teal-50 rounded-lg transition-colors"
                  title="Edit"
                >
                  <Pencil size={16} />
                </Link>
                <button
                  onClick={() => setDeleteTarget(banner)}
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
        title="Delete Banner"
        message={`Are you sure you want to delete this banner? This action cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
