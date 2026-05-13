export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Note {
  _id: string;
  title: string;
  content: string;
  user: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  user?: User;
  message?: string;
  errors?: Array<{ msg: string }>;
}

export interface NotesResponse {
  success: boolean;
  count?: number;
  data?: Note[];
  message?: string;
}

export interface NoteResponse {
  success: boolean;
  data?: Note;
  message?: string;
}

export type AuthMode = 'login' | 'register';