'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NoteForm from '../../components/NoteForm/NoteForm';

export default function NotesClient({ initialQuery }: { initialQuery: { q: string; page: number } }) {
  const { q, page } = initialQuery;

  const { data, isLoading, error } = useQuery({
    queryKey: ['notes', { q, page }],
    queryFn: () => fetchNotes(q, page)
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error) throw error as Error;
  if (!data) return <p>Something went wrong.</p>;

  return (
    <>
      <NoteForm onCancel={() => {}} />
      <ul>
        {data.notes.map((note) => (
          <li key={note.id}>
            <a href={`/notes/${note.id}`}>View details</a> — {note.title}
          </li>
        ))}
      </ul>
    </>
  );
}