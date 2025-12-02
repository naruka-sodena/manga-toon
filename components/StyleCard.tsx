import React from 'react';
import { StyleOption } from '../types';
import { Icon } from './Icon';

interface StyleCardProps {
  option: StyleOption;
  isSelected: boolean;
  onSelect: (option: StyleOption) => void;
  disabled?: boolean;
}

export const StyleCard: React.FC<StyleCardProps> = ({ option, isSelected, onSelect, disabled }) => {
  return (
    <button
      onClick={() => onSelect(option)}
      disabled={disabled}
      className={`
        relative group flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-300
        border-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
        ${option.colorClass}
        ${isSelected ? 'scale-105 -translate-y-2 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ring-4 ring-yellow-400' : 'hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]'}
        ${disabled ? 'opacity-50 cursor-not-allowed grayscale' : 'cursor-pointer'}
      `}
    >
      <div className="bg-white p-3 rounded-full border-2 border-black mb-2">
        <Icon name={option.iconName} size={32} className="text-black" />
      </div>
      <h3 className="font-heading text-lg leading-tight">{option.label}</h3>
      <p className="text-xs font-bold opacity-80 mt-1">{option.description}</p>
      
      {isSelected && (
        <div className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-1 border-2 border-black animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      )}
    </button>
  );
};