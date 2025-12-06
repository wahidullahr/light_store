'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface SiteContent {
  id: string;
  content_key: string;
  locale: string;
  content_type: string;
  content_value: string;
}

export default function ContentPage() {
  const [contentList, setContentList] = useState<SiteContent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const response = await fetch('/api/content');
      const result = await response.json();
      if (result.success) {
        setContentList(result.data || []);
      }
    } catch (error) {
      console.error('Error loading content:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-4xl font-bold text-white">Site Content</h1>
        <Link
          href="/admin/content/new"
          className="rounded-lg bg-amber-600 px-4 py-2 font-semibold text-white hover:bg-amber-500"
        >
          Add Content
        </Link>
      </div>

      <div className="rounded-lg border border-slate-800 bg-slate-900">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-800">
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Key</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Locale</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Type</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Preview</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contentList.map(content => (
              <tr key={content.id} className="border-b border-slate-800">
                <td className="px-6 py-4 text-sm font-medium text-white">{content.content_key}</td>
                <td className="px-6 py-4 text-sm text-slate-300 uppercase">{content.locale}</td>
                <td className="px-6 py-4 text-sm text-slate-300">{content.content_type}</td>
                <td className="max-w-xs truncate px-6 py-4 text-sm text-slate-400">
                  {content.content_value}
                </td>
                <td className="px-6 py-4 text-sm">
                  <Link
                    href={`/admin/content/${content.id}`}
                    className="text-amber-400 hover:text-amber-300"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
            {contentList.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-slate-400">
                  No content found. Add some content to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}



