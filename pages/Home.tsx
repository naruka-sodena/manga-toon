import React, { useState, useCallback } from 'react';
import { Icon } from '../components/Icon';
import { StyleCard } from '../components/StyleCard';
import { UploadArea } from '../components/UploadArea';
import { ComparisonSlider } from '../components/ComparisonSlider';
import { STYLE_OPTIONS } from '../constants';
import { transformImage } from '../services/geminiService';
import { StyleOption, ProcessingState } from '../types';

export const Home: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<StyleOption | null>(null);
  const [processingState, setProcessingState] = useState<ProcessingState>({
    isLoading: false,
    error: null,
  });

  const handleTransform = async () => {
    if (!originalImage || !selectedStyle) return;

    setProcessingState({ isLoading: true, error: null });
    
    try {
      const result = await transformImage(originalImage, selectedStyle.prompt);
      setGeneratedImage(result);
    } catch (err: any) {
      setProcessingState({ isLoading: false, error: err.message });
      setGeneratedImage(null);
    } finally {
      setProcessingState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const resetApp = useCallback(() => {
    setOriginalImage(null);
    setGeneratedImage(null);
    setSelectedStyle(null);
    setProcessingState({ isLoading: false, error: null });
  }, []);

  return (
    <div className="container mx-auto px-4 animate-fade-in-up">
      {/* Intro Text - Only shown when no image is uploaded */}
      {!originalImage && (
        <div className="text-center mb-12">
          <div className="flex flex-col items-center justify-center mb-6">
             <h1 className="flex items-center justify-center gap-1 md:gap-2 text-toon-dark">
               <span className="font-sketch text-6xl md:text-9xl tracking-tighter">mangat</span>
               <div className="flex gap-1">
                 <Icon name="smile" className="w-12 h-12 md:w-20 md:h-20 stroke-[2.5]" />
                 <Icon name="smile" className="w-12 h-12 md:w-20 md:h-20 stroke-[2.5]" />
               </div>
               <span className="font-sketch text-6xl md:text-9xl tracking-tighter">n</span>
             </h1>
          </div>
        </div>
      )}

      {/* State 1: Upload Area */}
      {!originalImage && (
        <UploadArea onImageSelected={setOriginalImage} />
      )}

      {/* State 2: Editor (Compact Single Column) */}
      {originalImage && (
        <div className="max-w-2xl mx-auto flex flex-col gap-8">
          
          {/* Main Display Frame */}
          <div className="relative bg-white p-3 rounded-2xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rotate-1 transition-all duration-300">
            
            {/* Badge */}
            <div className="absolute -top-4 -left-2 bg-toon-yellow text-black font-bold px-4 py-1 border-2 border-black rounded-full z-20 shadow-sm flex items-center gap-2">
              {processingState.isLoading ? (
                <Icon name="refresh" className="animate-spin" size={16} />
              ) : generatedImage ? (
                <Icon name="compare" size={16} />
              ) : (
                <Icon name="image" size={16} />
              )}
              {processingState.isLoading ? 'Drawing...' : generatedImage ? 'Compare Result' : 'Original Photo'}
            </div>

            {/* Close/Reset Button */}
            <button 
              onClick={resetApp}
              className="absolute -top-4 -right-2 bg-red-500 text-white p-2 rounded-full border-2 border-black hover:scale-110 hover:rotate-90 transition z-20 shadow-sm"
              title="Start Over"
            >
              <Icon name="close" size={20} />
            </button>

            {/* Image Content Area */}
            <div className="relative rounded-xl overflow-hidden bg-gray-100 min-h-[300px] flex items-center justify-center border-2 border-black">
              
              {/* 1. Loading Overlay */}
              {processingState.isLoading && (
                <div className="absolute inset-0 z-10 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center">
                  <div className="animate-spin mb-4 text-toon-blue">
                    <Icon name="refresh" size={64} />
                  </div>
                  <h3 className="font-heading text-3xl text-toon-dark animate-pulse">Toonifying...</h3>
                  <p className="font-comic text-xl text-gray-500 mt-2">Making it look awesome!</p>
                </div>
              )}

              {/* 2. Error Message */}
              {processingState.error && (
                <div className="absolute inset-0 z-10 bg-white flex flex-col items-center justify-center p-8 text-center">
                  <div className="bg-red-100 p-4 rounded-full mb-4 border-2 border-red-500">
                    <span className="text-4xl">😵</span>
                  </div>
                  <h3 className="font-heading text-2xl text-red-500 mb-2">Oops!</h3>
                  <p className="font-comic text-gray-600">{processingState.error}</p>
                  <button 
                    onClick={() => setProcessingState({isLoading: false, error: null})}
                    className="mt-4 px-6 py-2 bg-toon-dark text-white rounded-lg font-bold hover:bg-black"
                  >
                    Try Again
                  </button>
                </div>
              )}

              {/* 3. Image Display Logic */}
              {generatedImage && !processingState.isLoading ? (
                 /* Result: Comparison Slider */
                <ComparisonSlider 
                  beforeImage={originalImage} 
                  afterImage={generatedImage} 
                />
              ) : (
                 /* Original Image */
                <img 
                  src={originalImage} 
                  alt="Original" 
                  className="w-full h-auto object-contain max-h-[600px]"
                />
              )}
            </div>
          </div>

          {/* Controls Section */}
          <div className="bg-white p-6 rounded-3xl border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] -rotate-1">
            
            {/* Style Selector */}
            <div className="mb-6">
              <h3 className="font-heading text-2xl mb-4 text-center">Choose Style</h3>
              <div className="grid grid-cols-3 gap-3">
                {STYLE_OPTIONS.map((option) => (
                  <StyleCard
                    key={option.id}
                    option={option}
                    isSelected={selectedStyle?.id === option.id}
                    onSelect={setSelectedStyle}
                    disabled={processingState.isLoading}
                  />
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4">
              <button
                onClick={handleTransform}
                disabled={!selectedStyle || processingState.isLoading}
                className={`
                  w-full py-4 rounded-2xl font-heading text-2xl uppercase tracking-widest border-4 border-black transition-all flex items-center justify-center gap-2
                  ${!selectedStyle || processingState.isLoading 
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                    : 'bg-toon-green text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:bg-green-500 active:translate-y-0 active:shadow-none'
                  }
                `}
              >
                <Icon name="pencil" className={processingState.isLoading ? 'animate-bounce' : ''} />
                {generatedImage ? 'Toonify Again' : 'Toonify Me!'}
              </button>

              {/* Download Button - Only appears when result is ready */}
              {generatedImage && !processingState.isLoading && (
                <a 
                  href={generatedImage} 
                  download={`mangatoon-${selectedStyle?.id.toLowerCase()}.png`}
                  className="w-full py-3 bg-toon-blue text-white rounded-xl font-heading text-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-center flex items-center justify-center gap-2 hover:bg-blue-400 transition-all cursor-pointer"
                >
                  <Icon name="download" /> Download Result
                </a>
              )}
            </div>

          </div>

        </div>
      )}
    </div>
  );
};