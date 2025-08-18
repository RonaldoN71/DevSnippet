"use client"
import {useState} from 'react';
function SearchInput({wFull}) {
  const [searchQuery, setSearchQuery] = useState("");
  return (
   <form
      className={`relative flex gap-4 overflow-hidden ${
        wFull ? "w-full" : "md:w-[580px]"
      }`}
    >
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className={`pl-10 pr-2 py-2 bg-2 text-gray-200 font-medium border-[2px] border-rgba-2 rounded-lg outline-none transition-all duration-300 ease-in-out focus:w-full focus:border-rgba-0 ${
          wFull ? "w-full" : "w-[90%]"
        }`}
      />
      {!searchQuery && (
        <span className="absolute top-[50%] left-10 translate-y-[-50%] text-gray-400 pointer-events-none text-nowrap">
          Search for snippets e.g. Nested Loops etc.
        </span>
      )}
    </form>
  )
}

export default SearchInput
