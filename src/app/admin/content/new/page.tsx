'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewContentPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    content_key: '',
    locale: 'nb',
    content_type: 'text',
    content_value: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        router.push('/admin/content');
      } else {
        alert(result.error || 'Failed to create content');
        setLoading(false);
      }
    } catch {
      alert('Error creating content');
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-6 text-4xl font-bold text-white">New Content</h1>

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
              value={formData.content_key}
              onChange={e => setFormData({ ...formData, content_key: e.target.value })}
              required
              placeholder="e.g., homepage.hero.title"
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-white focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="locale" className="mb-2 block text-sm font-medium text-slate-300">
              Locale *
            </label>
            <select
              id="locale"
              value={formData.locale}
              onChange={e => setFormData({ ...formData, locale: e.target.value })}
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
              value={formData.content_type}
              onChange={e => setFormData({ ...formData, content_type: e.target.value })}
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
            value={formData.content_value}
            onChange={e => setFormData({ ...formData, content_value: e.target.value })}
            required
            rows={6}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 font-mono text-sm text-white focus:border-amber-500 focus:outline-none"
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-amber-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-amber-500 disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Content'}
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



