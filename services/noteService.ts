import axios from 'axios';
import { Note, NewNote } from '../types/note';

const BASE_URL = 'https://notehub-public.goit.study/api';

export const createNote = async (note: NewNote): Promise<Note> => {
  const response = await axios.post(`${BASE_URL}/notes`, note, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });

  return response.data;
};

export const deleteNote = async (id: number): Promise<void> => {
  await axios.delete(`${BASE_URL}/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });
};

export const updateNote = async (note: Note): Promise<Note> => {
  const response = await axios.put(`${BASE_URL}/notes/${note.id}`, note, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });

  return response.data;
};