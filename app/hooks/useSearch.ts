import { useCallback, useEffect, useState } from "react";
import type { Country } from "types/country";

interface UseSearchOptions {
  data: Country[]; // terima data dari luar, bukan fetch sendiri
  debounceDelay?: number;
  initialItemsPerPage?: number;
}

export const useSearch = ({
  data,
  debounceDelay = 300,
  initialItemsPerPage = 10,
}: UseSearchOptions) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredItems, setFilteredItems] = useState<Country[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Debounce searchTerm → debouncedSearchTerm
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm.trim());
    }, debounceDelay);

    return () => clearTimeout(handler);
  }, [searchTerm, debounceDelay]);

  // Reset halaman ketika user ubah kata kunci
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm]);

  const performFiltering = useCallback(
    (term: string, items: Country[]): Country[] => {
      if (!term) return [];
      const lower = term.toLowerCase();
      return items.filter((item) =>
        item.name.toLowerCase().includes(lower)
      );
    },
    []
  );

  // Filter berdasarkan debounced term
  useEffect(() => {
    const isActive = debouncedSearchTerm !== "";
    setIsSearching(isActive);

    if (!isActive) {
      setFilteredItems([]); // reset hasil pencarian
      return;
    }

    const filtered = performFiltering(debouncedSearchTerm, data);
    const endIndex = currentPage * initialItemsPerPage;
    setFilteredItems(filtered.slice(0, endIndex));
  }, [debouncedSearchTerm, currentPage, initialItemsPerPage, performFiltering, data]);

  const loadMoreFilter = () => {
    setCurrentPage((prev) => prev + 1);
  };

  return {
    searchTerm,
    setSearchTerm,
    debouncedSearchTerm,
    isSearching,
    filteredItems,
    loadMoreFilter,
  };
};
