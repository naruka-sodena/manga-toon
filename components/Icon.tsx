import React from 'react';
import { Pencil, Image as ImageIcon, BookOpen, UploadCloud, Download, RefreshCw, X, ArrowLeftRight, Smile } from 'lucide-react';

interface IconProps {
  name: string;
  className?: string;
  size?: number;
}

export const Icon: React.FC<IconProps> = ({ name, className, size = 24 }) => {
  switch (name) {
    case 'pencil': return <Pencil className={className} size={size} />;
    case 'image': return <ImageIcon className={className} size={size} />;
    case 'book': return <BookOpen className={className} size={size} />;
    case 'upload': return <UploadCloud className={className} size={size} />;
    case 'download': return <Download className={className} size={size} />;
    case 'refresh': return <RefreshCw className={className} size={size} />;
    case 'close': return <X className={className} size={size} />;
    case 'compare': return <ArrowLeftRight className={className} size={size} />;
    case 'smile': return <Smile className={className} size={size} />;
    default: return null;
  }
};