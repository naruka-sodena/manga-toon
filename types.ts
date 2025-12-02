export enum TransformationType {
  SKETCH = 'SKETCH',
  COLORING = 'COLORING',
  MANGA = 'MANGA',
}

export interface StyleOption {
  id: TransformationType;
  label: string;
  description: string;
  iconName: 'pencil' | 'image' | 'book';
  prompt: string;
  colorClass: string;
}

export interface ProcessingState {
  isLoading: boolean;
  error: string | null;
}