import React, { useRef, useState } from 'react';
import { Icon } from './Icon';

interface UploadAreaProps {
  onImageSelected: (base64: string) => void;
}

export const UploadArea: React.FC<UploadAreaProps> = ({ onImageSelected }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (file: File | undefined) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (PNG, JPG, etc.)');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      onImageSelected(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileChange(e.dataTransfer.files[0]);
  };

  return (
    <div
      onClick={() => fileInputRef.current?.click()}
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      className={`
        w-full max-w-2xl mx-auto h-80
        bg-white rounded-[2rem] border-4 border-black
        flex flex-col items-center justify-center cursor-pointer
        transition-all duration-300 group
        shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
        relative overflow-hidden
        ${isDragging ? 'bg-blue-50 translate-y-1 shadow-none' : 'hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:bg-blue-50'}
      `}
    >
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={(e) => handleFileChange(e.target.files?.[0])}
      />
      
      <div className="z-10 bg-toon-yellow p-6 rounded-full border-4 border-black mb-6 group-hover:rotate-12 transition-transform shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <Icon name="upload" className="text-black w-10 h-10" />
      </div>
      
      <h3 className="z-10 font-heading text-3xl text-toon-dark mb-2 text-center px-4">
        Upload your Photo
      </h3>
      <p className="z-10 font-comic text-xl text-gray-600 text-center px-4">
        Click to browse or drop your file here
      </p>
    </div>
  );
};