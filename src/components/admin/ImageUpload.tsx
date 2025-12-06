'use client';

import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase/client';

interface ImageUploadProps {
  bucket: string;
  path: string;
  onUpload: (url: string) => void;
  onRemove?: (url: string) => void;
  value?: string;
  label?: string;
  className?: string;
}

export default function ImageUpload({
  bucket,
  path,
  onUpload,
  onRemove,
  value,
  label,
  className = '',
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      const file = event.target.files?.[0];
      if (!file) return;

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${path}/${fileName}`;

      const { error: uploadError } = await supabase.storage.from(bucket).upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from(bucket).getPublicUrl(filePath);

      onUpload(publicUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className={className}>
      {label && <label className="mb-2 block text-sm font-medium text-slate-300">{label}</label>}

      <div className="flex items-start gap-4">
        {value ? (
          <div className="relative h-40 w-40 overflow-hidden rounded-lg border border-slate-700 bg-slate-800">
            <Image src={value} alt="Uploaded image" fill className="object-cover" />
            {onRemove && (
              <button
                type="button"
                onClick={() => onRemove(value)}
                className="absolute top-2 right-2 rounded-full bg-red-500/80 p-1 text-white hover:bg-red-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        ) : (
          <div className="flex h-40 w-40 items-center justify-center rounded-lg border-2 border-dashed border-slate-700 bg-slate-800/50 text-slate-500">
            <ImageIcon className="h-10 w-10" />
          </div>
        )}

        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 disabled:opacity-50"
          >
            <Upload className="h-4 w-4" />
            {uploading ? 'Uploading...' : value ? 'Change Image' : 'Upload Image'}
          </button>
          <p className="text-xs text-slate-500">Supported formats: JPG, PNG, WEBP</p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
}



