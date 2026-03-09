import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import client from '../api/client';
import ImageUpload from '../components/ImageUpload';

const emptyForm = {
  name: '',
  title: '',
  bio: '',
  image_url: '',
  display_order: 0,
  is_active: true,
};

export default function BoardMemberForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditing);

  useEffect(() => {
    if (isEditing) {
      client
        .get(`/team/${id}`)
        .then((res) => {
          const data = res.data.data || res.data;
          setForm({
            name: data.name || '',
            title: data.title || '',
            bio: data.bio || '',
            image_url: data.image_url || '',
            display_order: data.display_order ?? 0,
            is_active: data.is_active ?? true,
          });
        })
        .catch(() => {
          toast.error('Failed to load board member');
          navigate('/board');
        })
        .finally(() => setFetching(false));
    }
  }, [id, isEditing, navigate]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error('Name is required');
      return;
    }
    setLoading(true);

    const payload = { ...form, member_type: 'board' };

    try {
      if (isEditing) {
        await client.put(`/team/${id}`, payload);
        toast.success('Board member updated successfully');
      } else {
        await client.post('/team', payload);
        toast.success('Board member created successfully');
      }
      navigate('/board');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to save board member');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-teal"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/board')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="page-title">
            {isEditing ? 'Edit Board Member' : 'New Board Member'}
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="card max-w-2xl space-y-6">
        {/* Name */}
        <div>
          <label className="label-text">Name *</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="input-field"
            placeholder="Full name"
            required
          />
        </div>

        {/* Title / Position */}
        <div>
          <label className="label-text">Title / Position</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className="input-field"
            placeholder="e.g., Board President, Vice Chair"
          />
        </div>

        {/* Bio */}
        <div>
          <label className="label-text">Biography</label>
          <textarea
            value={form.bio}
            onChange={(e) => handleChange('bio', e.target.value)}
            className="input-field min-h-[120px] resize-y"
            placeholder="Brief biography..."
            rows={5}
          />
        </div>

        {/* Image Upload */}
        <ImageUpload
          label="Photo"
          value={form.image_url}
          onChange={(url) => handleChange('image_url', url)}
        />

        {/* Display Order */}
        <div>
          <label className="label-text">Display Order</label>
          <input
            type="number"
            value={form.display_order}
            onChange={(e) => handleChange('display_order', parseInt(e.target.value) || 0)}
            className="input-field w-32"
            min={0}
          />
          <p className="text-xs text-gray-400 mt-1">Lower numbers appear first</p>
        </div>

        {/* Active Toggle */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleChange('is_active', !form.is_active)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              form.is_active ? 'bg-teal' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                form.is_active ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          <label className="text-sm font-medium text-navy">
            {form.is_active ? 'Active' : 'Inactive'}
          </label>
        </div>

        {/* Submit */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={() => navigate('/board')}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
            ) : (
              <Save size={16} />
            )}
            {isEditing ? 'Update Member' : 'Add Member'}
          </button>
        </div>
      </form>
    </div>
  );
}
