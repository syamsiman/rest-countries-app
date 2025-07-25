import { Search } from "lucide-react";
import React, { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import type { Country } from "types/country";
import { getAllCountries, searchCountryByName } from "~/controllers/countryController";

const SearchComponent = ({search } : {search : React.Dispatch<SetStateAction<Country[]>>}) => {
 const [query, setQuery] = useState<string>("");

 const handleSearch = (event: React.ChangeEvent<HTMLInputElement> ) => {
    setQuery(event.target.value)
    const filteredCountry: Country[] = searchCountryByName(query);
    search(filteredCountry)
 }

  return (
    <div className="w-md flex dark:bg-blue-900 bg-white shadow shadow-gray-950/10 rounded-sm 
    p-4 justify-between items-center">
        <Search size={25} className="text-gray-400" />
        <input 
        type="text" 
        value={query}
        onChange={handleSearch}
        placeholder="search for a country.." 
        className="outline-none ml-3 text-gray-400 dark:text-white w-full h-full"/>
    </div>
  )
}

export default SearchComponent