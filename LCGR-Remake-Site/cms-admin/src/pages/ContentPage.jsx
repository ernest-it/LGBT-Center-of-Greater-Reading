import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Pencil, ImageIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import client from '../api/client';

export default function ContentPage() {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await client.get('/content');
        const data = Array.isArray(res.data) ? res.data : (res.data.data || []);
        setContent(data);
      } catch {
        toast.error('Failed to load content');
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  // Group content by page_name
  const grouped = content.reduce((acc, item) => {
    const page = item.page_name || 'Other';
    if (!acc[page]) acc[page] = [];
    acc[page].push(item);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-teal"></div>
      </div>
    );
  }

  const formatPageName = (name) =>
    name.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Page Content</h1>
      </div>

      {Object.keys(grouped).length === 0 ? (
        <div className="card text-center py-16">
          <div className="bg-gray-100 rounded-full p-4 w-fit mx-auto mb-4">
            <FileText size={32} className="text-gray-400" />
          </div>
          <p className="text-gray-500">No content sections found.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(grouped).map(([pageName, sections]) => (
            <div key={pageName} className="card">
              <h2 className="text-lg font-semibold text-navy mb-4 flex items-center gap-2">
                <FileText size={20} className="text-teal" />
                {formatPageName(pageName)}
              </h2>
              <div className="divide-y divide-gray-100">
                {sections.map((section) => (
                  <div
                    key={section.id}
                    className="flex items-start justify-between py-3 gap-4 first:pt-0 last:pb-0"
                  >
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      {/* Image thumbnail */}
                      {section.image_url ? (
                        <img
                          src={
                            section.image_url.startsWith('http')
                              ? section.image_url
                              : `http://localhost:3001${section.image_url}`
                          }
                          alt={formatPageName(section.section_name || '')}
                          className="w-16 h-12 object-cover rounded-md border border-gray-200 flex-shrink-0"
                        />
                      ) : (
                        <div className="w-16 h-12 bg-gray-100 rounded-md flex items-center justify-center flex-shrink-0">
                          <ImageIcon size={16} className="text-gray-400" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-navy">
                          {formatPageName(section.section_name || 'Untitled Section')}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                          {section.text_content
                            ? section.text_content.substring(0, 200) + (section.text_content.length > 200 ? '...' : '')
                            : 'No content yet'}
                        </p>
                      </div>
                    </div>
                    <Link
                      to={`/content/${section.id}/edit`}
                      className="flex-shrink-0 p-2 text-gray-400 hover:text-teal hover:bg-teal-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Pencil size={16} />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
