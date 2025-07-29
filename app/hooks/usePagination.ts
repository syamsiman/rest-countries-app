import { useCallback, useEffect, useMemo, useState } from "react";
import type { Country } from "types/country"


interface UsePaginationOptions {
    data: Country[];
    initialItemsPerPage?: number /// jumlah item per halaman
    dependencies?: string[];
}

export const usePagination = ({
    data,
    initialItemsPerPage = 10, // default 10 item per halaman
    dependencies = []
}: UsePaginationOptions) => {

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setCurrentPage(1)
    }, dependencies)

    // logika paginasi. ambil hanya item yang relevan untuk halaman saat ini
    const paginatedItems = useMemo(() => {
        const endIndex = currentPage * initialItemsPerPage;
        return data.slice(0, endIndex);
    }, [data, currentPage, initialItemsPerPage])

    // check apakah masih ada data yang bisa dimuat 
    const hasMore = paginatedItems.length < data.length;

    // fungsi untuk memuat halaman berikutnya
    const loadMore = () => {
       if (hasMore) setCurrentPage(prevPage => prevPage + 1);
    }

    return {
        paginatedItems,
        loadMore,
        hasMore
    }

}