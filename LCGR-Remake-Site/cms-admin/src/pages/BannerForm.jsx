import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import client from '../api/client';
import ImageUpload from '../components/ImageUpload';

const PAGE_SECTIONS = [
  { value: 'home_hero', label: 'Home Hero' },
  { value: 'about_hero', label: 'About Hero' },
  { value: 'events_hero', label: 'Events Hero' },
  { value: 'services_hero', label: 'Services Hero' },
  { value: 'contact_hero', label: 'Contact Hero' },
  { value: 'programs_hero', label: 'Programs Hero' },
  { value: 'resources_hero', label: 'Resources Hero' },
  { value: 'get_involved_hero', label: 'Get Involved Hero' },
];

const emptyForm = {
  page_section: 'home_hero',
  image_url: '',
  alt_text: '',
  link_url: '',
  is_active: true,
};

export default function BannerForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditing);

  useEffect(() => {
    if (isEditing) {
      client
        .get(`/banners/${id}`)
        .then((res) => {
          const data = res.data.data || res.data;
          setForm({
            page_section: data.page_section || 'home_hero',
            image_url: data.image_url || '',
            alt_text: data.alt_text || '',
            link_url: data.link_url || '',
            is_active: data.is_active ?? true,
          });
        })
        .catch(() => {
          toast.error('Failed to load banner');
          navigate('/banners');
        })
        .finally(() => setFetching(false));
    }
  }, [id, isEditing, navigate]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEditing) {
        await client.put(`/banners/${id}`, form);
        toast.success('Banner updated successfully');
      } else {
        await client.post('/banners', form);
        toast.success('Banner created successfully');
      }
      navigate('/banners');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save banner');
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
            onClick={() => navigate('/banners')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="page-title">{isEditing ? 'Edit Banner' : 'New Banner'}</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="card max-w-2xl space-y-6">
        {/* Page Section */}
        <div>
          <label className="label-text">Page Section</label>
          <select
            value={form.page_section}
            onChange={(e) => handleChange('page_section', e.target.value)}
            className="input-field"
          >
            {PAGE_SECTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Image Upload */}
        <ImageUpload
          label="Banner Image"
          value={form.image_url}
          onChange={(url) => handleChange('image_url', url)}
        />

        {/* Alt Text */}
        <div>
          <label className="label-text">Alt Text</label>
          <input
            type="text"
            value={form.alt_text}
            onChange={(e) => handleChange('alt_text', e.target.value)}
            className="input-field"
            placeholder="Describe the image for accessibility"
          />
        </div>

        {/* Link URL */}
        <div>
          <label className="label-text">Link URL (optional)</label>
          <input
            type="text"
            value={form.link_url}
            onChange={(e) => handleChange('link_url', e.target.value)}
            className="input-field"
            placeholder="e.g., /events or https://example.com"
          />
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
            onClick={() => navigate('/banners')}
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
            {isEditing ? 'Update Banner' : 'Create Banner'}
          </button>
        </div>
      </form>
    </div>
  );
}
