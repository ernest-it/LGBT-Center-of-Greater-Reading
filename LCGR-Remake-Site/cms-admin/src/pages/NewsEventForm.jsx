import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import client from '../api/client';
import ImageUpload from '../components/ImageUpload';

const emptyForm = {
  title: '',
  description: '',
  type: 'news',
  date: '',
  end_date: '',
  location: '',
  image_url: '',
  is_featured: false,
  is_active: true,
};

export default function NewsEventForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditing);

  useEffect(() => {
    if (isEditing) {
      client
        .get(`/news-events/${id}`)
        .then((res) => {
          const data = res.data.data || res.data;
          setForm({
            title: data.title || '',
            description: data.description || '',
            type: data.type || 'news',
            date: data.date?.split('T')[0] || data.event_date?.split('T')[0] || '',
            end_date: data.end_date?.split('T')[0] || '',
            location: data.location || '',
            image_url: data.image_url || '',
            is_featured: data.is_featured ?? false,
            is_active: data.is_active ?? true,
          });
        })
        .catch(() => {
          toast.error('Failed to load item');
          navigate('/news-events');
        })
        .finally(() => setFetching(false));
    }
  }, [id, isEditing, navigate]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      toast.error('Title is required');
      return;
    }
    setLoading(true);

    try {
      if (isEditing) {
        await client.put(`/news-events/${id}`, form);
        toast.success('Item updated successfully');
      } else {
        await client.post('/news-events', form);
        toast.success('Item created successfully');
      }
      navigate('/news-events');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save item');
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
            onClick={() => navigate('/news-events')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="page-title">
            {isEditing ? 'Edit' : 'New'} {form.type === 'news' ? 'News Article' : 'Event'}
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="card max-w-2xl space-y-6">
        {/* Title */}
        <div>
          <label className="label-text">Title *</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className="input-field"
            placeholder="Enter a title"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="label-text">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => handleChange('description', e.target.value)}
            className="input-field min-h-[150px] resize-y"
            placeholder="Enter description or content..."
            rows={6}
          />
        </div>

        {/* Type */}
        <div>
          <label className="label-text">Type</label>
          <select
            value={form.type}
            onChange={(e) => handleChange('type', e.target.value)}
            className="input-field"
          >
            <option value="news">News</option>
            <option value="event">Event</option>
          </select>
        </div>

        {/* Date Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label-text">Date</label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => handleChange('date', e.target.value)}
              className="input-field"
            />
          </div>
          {form.type === 'event' && (
            <div>
              <label className="label-text">End Date</label>
              <input
                type="date"
                value={form.end_date}
                onChange={(e) => handleChange('end_date', e.target.value)}
                className="input-field"
              />
            </div>
          )}
        </div>

        {/* Location (events only) */}
        {form.type === 'event' && (
          <div>
            <label className="label-text">Location</label>
            <input
              type="text"
              value={form.location}
              onChange={(e) => handleChange('location', e.target.value)}
              className="input-field"
              placeholder="e.g., Main Clubhouse"
            />
          </div>
        )}

        {/* Image Upload */}
        <ImageUpload
          label="Image"
          value={form.image_url}
          onChange={(url) => handleChange('image_url', url)}
        />

        {/* Toggles */}
        <div className="flex flex-wrap gap-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleChange('is_featured', !form.is_featured)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                form.is_featured ? 'bg-purple' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  form.is_featured ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <label className="text-sm font-medium text-navy">Featured</label>
          </div>

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
        </div>

        {/* Submit */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={() => navigate('/news-events')}
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
            {isEditing ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  );
}
