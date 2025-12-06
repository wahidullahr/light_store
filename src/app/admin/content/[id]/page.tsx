'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

interface SiteContent {
  id: string;
  content_key: string;
  locale: string;
  content_type: string;
  content_value: string;
}

export default function EditContentPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState<SiteContent | null>(null);

  useEffect(() => {
    loadContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const loadContent = async () => {
    try {
      const response = await fetch(`/api/content/${id}`);
      const result = await response.json();
      if (result.success) {
        setContent(result.data);
      }
    } catch (error) {
      console.error('Error loading content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content) return;

    setSaving(true);
    try {
      const response = await fetch(`/api/content/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });

      const result = await response.json();

      if (result.success) {
        router.push('/admin/content');
      } else {
        alert(result.error || 'Failed to update content');
        setSaving(false);
      }
    } catch {
      alert('Error updating content');
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this content?')) return;

    setSaving(true);
    try {
      const response = await fetch(`/api/content/${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (result.success) {
        router.push('/admin/content');
      } else {
        alert(result.error || 'Failed to delete content');
        setSaving(false);
      }
    } catch {
      alert('Error deleting content');
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-white">Content not found</div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-4xl font-bold text-white">Edit Content</h1>
        <button
          type="button"
          onClick={handleDelete}
          disabled={saving}
          className="rounded-lg bg-red-600/20 px-4 py-2 text-sm font-semibold text-red-400 hover:bg-red-600/30 hover:text-red-300 disabled:opacity-50"
        >
          Delete
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-lg border border-slate-800 bg-slate-900 p-6"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="content_key" className="mb-2 block text-sm font-medium text-slate-300">
              Content Key *
            </label>
            <input
              id="content_key"
              type="text"
              value={content.content_key}
              onChange={e => setContent({ ...content, content_key: e.target.value })}
              required
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-white focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="locale" className="mb-2 block text-sm font-medium text-slate-300">
              Locale *
            </label>
            <select
              id="locale"
              value={content.locale}
              onChange={e => setContent({ ...content, locale: e.target.value })}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-white focus:border-amber-500 focus:outline-none"
            >
              <option value="nb">Norwegian (nb)</option>
              <option value="en">English (en)</option>
            </select>
          </div>

          <div>
            <label htmlFor="content_type" className="mb-2 block text-sm font-medium text-slate-300">
              Content Type *
            </label>
            <select
              id="content_type"
              value={content.content_type}
              onChange={e => setContent({ ...content, content_type: e.target.value })}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-white focus:border-amber-500 focus:outline-none"
            >
              <option value="text">Text</option>
              <option value="html">HTML</option>
              <option value="json">JSON</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="content_value" className="mb-2 block text-sm font-medium text-slate-300">
            Value *
          </label>
          <textarea
            id="content_value"
            value={content.content_value}
            onChange={e => setContent({ ...content, content_value: e.target.value })}
            required
            rows={6}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 font-mono text-sm text-white focus:border-amber-500 focus:outline-none"
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-amber-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-amber-500 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-lg border border-slate-700 bg-transparent px-8 py-3 font-semibold text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}



