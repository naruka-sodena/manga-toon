import { StyleOption, TransformationType } from './types';

export const STYLE_OPTIONS: StyleOption[] = [
  {
    id: TransformationType.SKETCH,
    label: 'Rustic Sketch',
    description: 'Raw pencil texture',
    iconName: 'pencil',
    prompt: 'Transform this image into a rustic, raw pencil sketch art style. Use graphite textures, loose lines, and high contrast shading. Keep the background simple or white.',
    colorClass: 'bg-stone-300 border-stone-600 text-stone-900 hover:bg-stone-200',
  },
  {
    id: TransformationType.COLORING,
    label: 'Coloring Page',
    description: 'Clean outline for kids',
    iconName: 'image',
    prompt: 'Transform this image into a high-quality children\'s coloring book page. Create strictly black and white outlines with no shading, no greyscale, and a pure white background. Thick, clean lines.',
    colorClass: 'bg-white border-blue-500 text-blue-500 hover:bg-blue-50',
  },
  {
    id: TransformationType.MANGA,
    label: 'Manga Style',
    description: 'Japanese comic style',
    iconName: 'book',
    prompt: 'Transform this image into a high-quality Japanese manga panel. Use anime character aesthetics, traditional manga shading, screentones, and dramatic ink lines. Black and white manga style.',
    colorClass: 'bg-purple-400 border-purple-800 text-white hover:bg-purple-300',
  },
];