import { useState, useEffect, useRef } from "react";
import Card from "~/components/Card";
import ToggleTheme from "~/components/ToggleTheme";
import SearchInput from "~/components/SearchInput";
import { usePagination } from "~/hooks/usePagination";
import { useSearch } from "~/hooks/useSearch";
import type { Country } from "types/country";
import type { Route } from "./+types/home";

const regions = ["Africa", "America", "Asia", "Europe", "Oceania"];

export function meta({}: Route.MetaArgs) {
  return [
    { title: "rest countries" },
    { name: "description", content: "the app for countries list" },
  ];
}

export default function Home() {
  const [dataCountries, setDataCountries] = useState<Country[]>([]);
  const [selectedRegion, setSelectedRegion] = useState("default");
  const [loading, setLoading] = useState(true);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Fetch all countries once
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch("/data.json");
        const data: Country[] = await res.json();
        setDataCountries(data);
      } catch (err) {
        console.error("Gagal mengambil data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);

  // Search logic
  const {
    searchTerm,
    setSearchTerm,
    debouncedSearchTerm,
    isSearching,
    filteredItems,
  } = useSearch({
    data: dataCountries
  });

  // Determine final items (search or paginated)
  const baseItems = isSearching ? filteredItems : dataCountries;

  // Apply region filter (if any)
  const displayItems =
    selectedRegion === "default"
      ? baseItems
      : baseItems.filter((item) => item.region.toLowerCase().includes(selectedRegion.toLowerCase()));

  // Pagination logic
  const {
    paginatedItems,
    loadMore,
    hasMore,
  } = usePagination({
    data: displayItems,
    dependencies: [debouncedSearchTerm, selectedRegion]
  });

  // Infinite scroll for pagination only
  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMore()
      }
    });

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [debouncedSearchTerm, hasMore, loadMore]);

  return (
    <main className="dark:bg-blue-950 bg-grey-50 min-h-screen">
      {/* Header */}
      <div className="dark:bg-blue-900 bg-white shadow shadow-blue-950/10">
        <div className="container flex items-center justify-between py-4 text-grey-950 dark:text-white">
          <h2 className="text-2xl font-bold">Where in the world?</h2>
          <ToggleTheme />
        </div>
      </div>

      {/* Search & Filter */}
      <div className="container mt-15 flex flex-col sm:flex-row justify-between">
        <SearchInput currentSearchTerm={searchTerm} onSearch={setSearchTerm} />

        <div className="max-sm:mt-10 text-gray-950 dark:text-white dark:bg-blue-900 p-4 w-[200px] shadow rounded-sm">
          <select
            name="filter"
            className="outline-0 cursor-pointer bg-white dark:bg-blue-900 w-full"
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
          >
            <option value="default">Filter by region</option>
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Content */}
      <div className="container mt-10 gap-15 grid justify-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {loading ? (
          <p>Loading data...</p>
        ) : paginatedItems.length === 0 ? (
          <p>Tidak ada hasil ditemukan.</p>
        ) : (
          paginatedItems.map((item) => (
            <Card
              key={item.name}
              img={item.flags.svg}
              population={item.population}
              name={item.name}
              capital={item.capital}
              region={item.region}
            />
          ))
        )}
      </div>

      {/* Infinite Scroll Trigger */}
      <div ref={loadMoreRef} className="h-50 w-full" />
    </main>
  );
}
