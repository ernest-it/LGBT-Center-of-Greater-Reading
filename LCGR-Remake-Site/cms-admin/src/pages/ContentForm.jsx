import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import client from '../api/client';
import ImageUpload from '../components/ImageUpload';

export default function ContentForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    page_name: '',
    section_name: '',
    text_content: '',
    image_url: '',
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    client
      .get(`/content/by-id/${id}`)
      .then((res) => {
        const data = res.data.data || res.data;
        setForm({
          page_name: data.page_name || '',
          section_name: data.section_name || '',
          text_content: data.text_content || '',
          image_url: data.image_url || '',
        });
      })
      .catch(() => {
        toast.error('Failed to load content');
        navigate('/content');
      })
      .finally(() => setFetching(false));
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await client.put(
        `/content/${encodeURIComponent(form.page_name)}/${encodeURIComponent(form.section_name)}`,
        {
          text_content: form.text_content,
          image_url: form.image_url || null,
        }
      );
      toast.success('Content updated successfully');
      navigate('/content');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to save content');
    } finally {
      setLoading(false);
    }
  };

  const formatName = (name) =>
    (name || '').replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

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
            onClick={() => navigate('/content')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="page-title">Edit Content</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              {formatName(form.page_name)} &mdash; {formatName(form.section_name)}
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="card max-w-3xl space-y-6">
        {/* Read-only info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label-text">Page</label>
            <input
              type="text"
              value={formatName(form.page_name)}
              className="input-field bg-gray-50"
              disabled
            />
          </div>
          <div>
            <label className="label-text">Section</label>
            <input
              type="text"
              value={formatName(form.section_name)}
              className="input-field bg-gray-50"
              disabled
            />
          </div>
        </div>

        {/* Section Image */}
        <ImageUpload
          label="Section Image"
          value={form.image_url}
          onChange={(url) => setForm((prev) => ({ ...prev, image_url: url }))}
        />

        {/* Content Editor */}
        <div>
          <label className="label-text">Content</label>
          <textarea
            value={form.text_content}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, text_content: e.target.value }))
            }
            className="input-field min-h-[300px] resize-y font-mono text-sm"
            placeholder="Enter page content..."
            rows={12}
          />
        </div>

        {/* Submit */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={() => navigate('/content')}
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
            Save Content
          </button>
        </div>
      </form>
    </div>
  );
}
