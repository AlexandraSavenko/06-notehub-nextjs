"use client";
import css from "./NotesClient.module.css";

import Modal from "@/components/Modal/Modal";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import { fetchNotes } from "@/lib/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "use-debounce";

const NotesClient = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchValue] = useDebounce(searchQuery, 1000);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const queryParams = {
    searchValue,
    page,
  };
  const { data, isLoading, error } = useQuery({
    queryKey: ["notes", searchValue, page],
    queryFn: () => fetchNotes(queryParams),
    placeholderData: keepPreviousData,
  });
  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 1;
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  if (isLoading)
    return <p style={{ textAlign: "center" }}>Loading, please wait...</p>;
  if (error) {
    return (
      <p style={{ textAlign: "center" }}>
        Could not fetch the list of notes. {error.message}
      </p>
    );
  }
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={setSearchQuery} />
        <Pagination totalPages={totalPages} setPage={setPage} />
        <button onClick={openModal} className={css.button}>
          Create note +
        </button>
      </header>
      <NoteList notes={notes} />
      {isModalOpen && <Modal onClose={closeModal} />}
    </div>
  );
};

export default NotesClient;
