"use client";

import { useSnippetContext } from "@/context/snippetsContext";
import Snippet from "./Components/Snippet/Snippet";
import { ISnippet } from "@/types/types";
import { next, prev } from "@/utils/Icons";
import { useEffect, useState } from "react";

export default function Home() {
  const { publicSnippets, getTags, getPublicSnippets } = useSnippetContext();
  const [currentPage, setCurrentPage] = useState(1);
  
  
  useEffect(()=>{
    getPublicSnippets();
    getTags();
  },[]);

  return (
    <div className="">
      <div
        className={`px-8 pt-[6.3rem] pb-8 grid grid-cols-1 lg:grid-cols-2 gap-6`}
      >
        {publicSnippets.map((snippet) => {
          return <Snippet key={snippet._id} snippet={snippet} />;
        })}
      </div>

      
    </div>
  );
}