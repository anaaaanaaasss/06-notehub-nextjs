'use client';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NoteForm from '../../components/NoteForm/NoteForm';
import SearchBox from '../../components/SearchBox/SearchBox';
import Pagination from '../../components/Pagination/Pagination';
import Modal from '../../components/Modal/Modal';
import NoteList from '../../components/NoteList/NoteList';
import { useDebounce } from 'use-debounce';

export default function NotesClient() {
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 500);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Ensure modal-root div exists in DOM for portals
  useEffect(() => {
    if (!document.getElementById('modal-root')) {
      const modalRoot = document.createElement('div');
      modalRoot.id = 'modal-root';
      document.body.appendChild(modalRoot);
    }
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const { data, isLoading, error } = useQuery({
    queryKey: ['notes', { q: debouncedSearch, page: currentPage }],
    queryFn: () => fetchNotes(debouncedSearch, currentPage),
    placeholderData: (previousData) => previousData,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error) throw error as Error;
  if (!data) return <p>Something went wrong.</p>;

  return (
    <>
      <button onClick={() => setIsModalOpen(true)}>Add new note</button>
      <SearchBox value={search} onSearch={(value) => setSearch(value)} />
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onCancel={() => setIsModalOpen(false)} />
        </Modal>
      )}
      <NoteList notes={data.notes} />
      {data.totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={data.totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </>
  );
}