'use client';

import { useState, useRef } from 'react';
import { X, Plus } from 'lucide-react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase/client';

interface MultiImageUploadProps {
  bucket: string;
  path: string;
  images: { src: string; alt: string }[];
  onChange: (images: { src: string; alt: string }[]) => void;
  label?: string;
}

export default function MultiImageUpload({
  bucket,
  path,
  images,
  onChange,
  label,
}: MultiImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      const files = event.target.files;
      if (!files || files.length === 0) return;

      const newImages = [...images];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `${path}/${fileName}`;

        const { error: uploadError } = await supabase.storage.from(bucket).upload(filePath, file);

        if (uploadError) throw uploadError;

        const {
          data: { publicUrl },
        } = supabase.storage.from(bucket).getPublicUrl(filePath);

        newImages.push({ src: publicUrl, alt: '' });
      }

      onChange(newImages);
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Error uploading images');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    onChange(newImages);
  };

  const updateAltText = (index: number, alt: string) => {
    const newImages = [...images];
    newImages[index].alt = alt;
    onChange(newImages);
  };

  return (
    <div>
      {label && <label className="mb-2 block text-sm font-medium text-slate-300">{label}</label>}

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="group relative rounded-lg border border-slate-700 bg-slate-800 p-2"
          >
            <div className="relative mb-2 h-32 w-full overflow-hidden rounded bg-slate-900">
              <Image
                src={image.src}
                alt={image.alt || 'Product image'}
                fill
                className="object-cover"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 rounded-full bg-red-500/80 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-red-600"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
            <input
              type="text"
              placeholder="Alt text"
              value={image.alt}
              onChange={e => updateAltText(index, e.target.value)}
              className="w-full rounded bg-slate-900 px-2 py-1 text-xs text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 focus:outline-none"
            />
          </div>
        ))}

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="flex h-full min-h-[160px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-700 bg-slate-800/30 text-slate-400 transition-colors hover:border-amber-500/50 hover:bg-slate-800/50 hover:text-amber-500"
        >
          {uploading ? (
            <span className="text-sm">Uploading...</span>
          ) : (
            <>
              <Plus className="mb-2 h-8 w-8" />
              <span className="text-sm">Add Images</span>
            </>
          )}
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleUpload}
        className="hidden"
      />
    </div>
  );
}
