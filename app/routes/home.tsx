import Card from "~/components/Card";
import type { Route } from "./+types/home";
import ToggleTheme from '../components/ToggleTheme'
import SearchComponent from "~/components/SearchComponent";
import { useState, useEffect, useRef } from "react";
import type { Country } from "types/country";
import { usePagination } from "~/hooks/usePagination";

type Regions = {
  id: number;
  name: string;
}

const regions: Regions[] = [
  {
    id: 1,
    name: "Africa"
  },
  {
    id: 2,
    name: "America"
  },
  {
    id: 3,
    name: "Asia"
  },
  {
    id: 4,
    name: "Europe"
  },
  {
    id: 5,
    name: "Oceania"
  }
]


export function meta({}: Route.MetaArgs) {
  return [
    { title: "rest countries" },
    { name: "description", content: "the app for countries list" },
  ];
}

export default function Home() {

const [dataCountries, setDataCountries] = useState<Country[] | []>([])
const loadMoreRef = useRef<HTMLDivElement>(null); 

const {
  paginatedItems,
  loadMore,
  hasMore
} = usePagination({
  data: dataCountries
})

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch('/data.json');
        const data = await res.json();
        setDataCountries(data)

      } catch (err) {
        console.log('gagal mengambil data', err);
      }
    }

    fetchCountries()
  }, [])

  useEffect(() => {
    if (!hasMore) return // jangan observe jika tidak ada lagi data

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMore();
      }
    }, { threshold: [0, 1.0] }) // elemen 1px atau 100% terlihat

    // jika target elemen sudah muncul di viewport maka trigger observer
    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current)
    }

    return () => {
      // cleanup function dijalankan ketika target elemen muncul kembali ke viewport
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current)
      }
    }

  }, [hasMore, loadMore]) // jalankan ulang efek jika hasMore / LoadMore berubah


return (
    <main className="dark:bg-blue-950 bg-grey-50">
      <div className="dark:bg-blue-900 bg-white shadow shadow-blue-950/10">
        <div className="container flex items-center justify-between py-4 text-grey-950 dark:text-white">
          <h2 className="text-2xl font-bold">Where in the world?</h2>
          <ToggleTheme />
        </div>
      </div>

      <div className="container mt-15 flex flex-col sm:flex-row justify-between">
       <SearchComponent search={setDataCountries}/>

        <div className="max-sm:mt-10 text-gray-950 dark:text-white dark:bg-blue-900 p-4 w-[200px] shadow rounded-sm">
          <select name="filter" 
            className="outline-0 cursor-pointer bg-white dark:bg-blue-900 w-full"
            >
            <option value="default">Filter by region</option>
            {regions.map(({id, name}) => (
              <option key={id} value={name}>{name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="container mt-10 gap-15 grid justify-center
       sm:grid-cols-2 
      md:grid-cols-3 lg:grid-cols-4">
        {paginatedItems.length === 0 && (
          <p>tidak ada data </p>
        )}
          {
            paginatedItems.map(data => (
              <Card 
                key={data.name}
                img={data.flags.svg}
                population={data.population}
                name={data.name}
                capital={data.capital}
                region={data.region}
              />
            ))
          }
      </div>
      <div 
        ref={loadMoreRef}
        className="h-50 w-full"
      ></div>
    </main>
  );
}
