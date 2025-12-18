
export interface AIWord {
  id: string;
  word: string;
  definition: string;
  example: string;
}

export interface WordState {
  imageUrl?: string;
  loading: boolean;
  error?: string;
}
