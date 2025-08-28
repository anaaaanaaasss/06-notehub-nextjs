import type { Note, NotesResponse } from '@/types/note';
import axios from 'axios';

export async function fetchNotes(q = '', page = 1) {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN || process.env.NOTEHUB_TOKEN;
  const { data } = await axios.get<NotesResponse>(
    'https://notehub-public.goit.study/api/notes',
    {
      params: { q: q.toString(), page: Number(page) },
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return data;
}
export async function createNote(payload: { title: string; content: string }) {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN || process.env.NOTEHUB_TOKEN;
  const { data } = await axios.post<Note>(
    'https://notehub-public.goit.study/api/notes',
    payload,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return data;
}
export async function deleteNote(id: number) {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN || process.env.NOTEHUB_TOKEN;
  await axios.delete(`https://notehub-public.goit.study/api/notes/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
export async function fetchNoteById(id: number) {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN || process.env.NOTEHUB_TOKEN;
  const { data } = await axios.get<Note>(
    `https://notehub-public.goit.study/api/notes/${id}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return data;
}