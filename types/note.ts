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