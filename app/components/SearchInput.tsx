import { Search } from "lucide-react";
import React, { type SetStateAction } from "react";


interface SearchInputProps {
   currentSearchTerm: string;
   onSearch: React.Dispatch<SetStateAction<string>>;
}

const SearchInput = ({onSearch, currentSearchTerm}: SearchInputProps) => {

 const handleSearch = (event: React.ChangeEvent<HTMLInputElement> ) => {
    onSearch(event.target.value)
 }

  return (
    <div className="w-full sm:w-md flex dark:bg-blue-900 bg-white shadow shadow-gray-950/10 rounded-sm 
    p-4 justify-between items-center">
        <Search size={25} className="text-gray-400" />
        <input 
        type="text" 
        value={currentSearchTerm}
        onChange={handleSearch}
        placeholder="search for a country.." 
        className="outline-none ml-3 text-gray-400 dark:text-white w-full h-full"/>
    </div>
  )
}

export default SearchInput