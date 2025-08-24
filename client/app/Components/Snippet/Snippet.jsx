'use client';
import {useEffect,useState} from 'react';
import {useSnippetContext} from '@/context/snippetsContext';
import {
    bookmarkEmpty,
    copy,
    heart,
    heartOutline,
    trash,
} from '@/utils/icons';
import Link from 'next/link';
import Image from 'next/image';
import {formatDate} from '@/utils/dates';
import {ISnippetPropType} from '@/types/types.js';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';

Snippet.propType = {
  snippet : ISnippetPropType.isRequired,
}

function Snippet({snippet,height="400px"}) {
  const {useBtnColorMemo,useTagColorMemo} = useSnippetContext();
  const codeString = snippet?.code;
  const languageLogo =  (language) =>{
    switch(language){
      case "javascript" : return "/logos/javascript.svg";
      case "C++" : return "/logos/cpp.svg";
      case "rust" : return "/logos/rust.svg";
      case "R" : return "/logos/r.svg";
      case "SQL" : return "/logos/sql.svg";
      case "CSS" : return "/logos/css.svg";
    }
  }
  const [copied,setCopied] = useState(false);
const handleCopy = async () => {
    if (!codeString) return;
    try {
      await navigator.clipboard.writeText(codeString);
      setCopied(true);

      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };
  return (
    <div className="shadow-sm flex flex-col border-2 border-rgba-3 rounded-lg">
     <div className="px-6 py-4 bg-4 flex items-center justify-between rounded-t-lg border-b-2 border-rgba-3 text-white">
       <Link
       href= {`/user/${snippet?.user?.name?.toLowerCase().split(" ").join("-")}-${snippet?.user?._id}`}
       className="group transition-all ease-in-out duration-200"
       >
         <div className="flex items-center">
            <Image
            src={snippet?.user?.photo || "/thecodedealer--logo-white.png"}
            alt="user"
            width={30}
            height={30}
            className="rounded-full"
            />
            <h3 className="ml-2 text-gray-300 font-semibold group-hover:text-green-400">
                <span className="group-hover:underline transition-all ease-in-out duration-200">
                    {snippet?.user?.name}
                </span>
                <span className="text-sm text-gray-400 font-normal group-hover:text-green-400 group-hover:underline transition-all ease-in-out duration-200">
                    , {formatDate(snippet?.createdAt)}
                </span>
            </h3>
         </div>
       </Link>

       <div className="flex items-center gap-2 text-gray-200">
            <button className="w-10 h-10 rounded-md text-green-400 text-lg flex items-center justify-center"
            style={{background:copied ? "" : useBtnColorMemo,}}
            onClick={handleCopy}
            >
                {copied ? (<span className="text-gray-300 text-sm font-medium">Copied!</span>): copy}
            </button>
            <button className="w-10 h-10 rounded-md text-green-400 text-lg flex items-center justify-center"
            style = {{background: useTagColorMemo}}
            >
                {bookmarkEmpty}
            </button>
       </div>
    </div>
    <div>
      <SyntaxHighlighter
       language={snippet?.language}
       showLineNumbers = {true}
       style={vs2015}
       customStyle={
        {
          background: "#181818",
          borderRadius: "0 0 6px 6px",
          height: height,
          overflowX: "scroll",
          scrollbarColor: "#888 black" 
        }
       }
      >
        {codeString}
      </SyntaxHighlighter>
    </div>
    <div className="flex-1 px-6 py-2 bg-4 rounded-b-lg border-t-2 border-rgba-3">
       <div className="flex justify-between gap-2">
        <div className="flex-1 flex flex-col">
          <Link
          href={`/snippet/${snippet?.title
            .toLowerCase()
            .split(" ")
            .join("-")}-${snippet?._id}
          }`}
          >
          <div className="flex items-center gap-2">
            <Image
            src ={languageLogo(snippet?.language) || "/logos/cpp.svg"}
            width={20}
            height={20}
            alt="user"
            />
            <h2 className="text-xl font-semibold text-gray-300 cursor-pointer hover:text-green-400 hover:underline transition-all ease-in-out duration-300">{snippet?.title}</h2>
          </div>
          </Link>
          <p className="pb-1 text-gray-400">{snippet?.description}</p>
        </div>
            <button className={`flex flex-col items-center text-2xl text-gray-300`}>
              <span>{heartOutline}</span>
              <span className="text-sm font-bold text-gray-300">0 likes</span>
            </button>
       </div>
         <div className="pt-2 pb-3 flex justify-between">
          <ul className="items-start flex gap-2 flex-wrap">
            {snippet?.tags.map((tag)=>{
              return <li 
              key={tag._id}
              className="tag-item px-4 py-1 border border-rgba-2 text-gray-300 rounded-md cursor-pointer"
              style = {{background: useTagColorMemo}}
              >{tag.name}</li>
            })}
          </ul>
         </div>
    </div>
    </div>
    
  )
}

export default Snippet
