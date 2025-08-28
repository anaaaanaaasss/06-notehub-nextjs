import axios from 'axios';
import { Note } from '../types/note';

const BASE_URL = 'https://notehub-public.goit.study/api';

export const createNote = async (note: Omit<Note, 'id'>): Promise<Note> => {
  const response = await axios.post(`${BASE_URL}/notes`, note, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });

  return response.data;
};