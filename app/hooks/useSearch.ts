import { useCallback, useEffect, useState } from "react";
import type { Country } from "types/country";

interface UseSearchOptions {
  data: Country[]; // terima data dari luar, bukan fetch sendiri
  debounceDelay?: number;
}

export const useSearch = ({
  data,
  debounceDelay = 300,
}: UseSearchOptions) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState<Country[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Debounce searchTerm → debouncedSearchTerm
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm.trim());
    }, debounceDelay);

    return () => clearTimeout(handler);
  }, [searchTerm, debounceDelay]);

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
    setFilteredItems(filtered);
  }, [debouncedSearchTerm, performFiltering, data]);

  return {
    searchTerm,
    setSearchTerm,
    debouncedSearchTerm,
    isSearching,
    filteredItems,
  };
};
