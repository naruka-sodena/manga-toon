import React, { useState, useRef, useEffect } from 'react';
import { Icon } from './Icon';

interface ComparisonSliderProps {
  beforeImage: string;
  afterImage: string;
}

export const ComparisonSlider: React.FC<ComparisonSliderProps> = ({ beforeImage, afterImage }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const position = ((clientX - rect.left) / rect.width) * 100;
    setSliderPosition(Math.min(100, Math.max(0, position)));
  };

  const onMouseMove = (e: MouseEvent) => handleMove(e.clientX);
  const onTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('touchmove', onTouchMove);
      window.addEventListener('mouseup', () => setIsDragging(false));
      window.addEventListener('touchend', () => setIsDragging(false));
    }
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('mouseup', () => setIsDragging(false));
      window.removeEventListener('touchend', () => setIsDragging(false));
    };
  }, [isDragging]);

  const handleInteractionStart = (clientX: number) => {
    setIsDragging(true);
    handleMove(clientX);
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-auto rounded-xl overflow-hidden border-4 border-black select-none group cursor-col-resize bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
      onMouseDown={(e) => handleInteractionStart(e.clientX)}
      onTouchStart={(e) => handleInteractionStart(e.touches[0].clientX)}
    >
      {/* After Image (Background) */}
      <img src={afterImage} alt="After" className="w-full h-auto block" />

      {/* Before Image (Foreground - Clipped) */}
      <div 
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img src={beforeImage} alt="Before" className="w-full h-full object-cover" />
      </div>

      {/* Slider Handle Line */}
      <div 
        className="absolute inset-y-0 w-1 bg-black z-20 pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Handle Circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-toon-yellow border-2 border-black rounded-full p-2 shadow-lg transition-transform group-hover:scale-110">
           <Icon name="compare" size={20} className="text-black" />
        </div>
      </div>

      {/* Labels */}
      <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full font-bold text-sm border-2 border-white/50 pointer-events-none shadow-lg backdrop-blur-sm z-30">
        Original
      </div>
      <div className="absolute bottom-4 right-4 bg-toon-green/90 text-white px-3 py-1 rounded-full font-bold text-sm border-2 border-white/50 pointer-events-none shadow-lg backdrop-blur-sm z-30">
        Result
      </div>
    </div>
  );
};