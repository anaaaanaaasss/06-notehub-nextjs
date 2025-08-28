import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NotesClient from './NotesClient';

export default async function NotesPage({ searchParams }: { searchParams: { q?: string; page?: string } }) {
  const q = searchParams?.q ?? '';
  const page = Number(searchParams?.page ?? 1);

  const qc = new QueryClient();
  await qc.prefetchQuery({ queryKey: ['notes', { q, page }], queryFn: () => fetchNotes(q, page) });

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <NotesClient initialQuery={{ q, page }} />
    </HydrationBoundary>
  );
}