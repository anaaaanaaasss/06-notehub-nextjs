export interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}
export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface NewNote {
  title: string;
  content: string;
  category: string;
}