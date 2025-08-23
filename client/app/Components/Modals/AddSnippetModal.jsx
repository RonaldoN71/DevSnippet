import React from 'react'
import {useState} from 'react';
import { useGlobalContext } from "@/context/globalContext";
import { edit, plus } from "@/utils/Icons";
import {useSnippetContext} from '@/context/snippetsContext';
function AddSnippetModal() {
  const {closeModal,modalMode,activeSnippet} = useGlobalContext();
  const {createContext,tags,useTagColorMemo,updateSnippet,createSnippet} = useSnippetContext();
  const [activeTags,setActiveTags] = useState([]);
  const [code,setCode] = useState([]);
  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");
  const [language,setLanguage] = useState("javaScript");
  const [isPublic,setIsPublic] = useState("true");


    const handleTags = (tag)=>{
      const isTagActive = activeTags.some((activeTag)=> activeTag._id === tag._id);
      if(isTagActive){
        setActiveTags(activeTags.filter((activeTag)=> activeTag._id !== tag._id));
      }else{
        setActiveTags([...activeTags,tag]);
      }
    }

    const handleSubmit = (e) =>{
      e.preventDefault();

      const snippetData = {
        _id: activeSnippet?._id,
        title,
        description,
        code,
        language,
        isPublic,
        tags: activeTags.length> 0 ? activeTags.map((tag)=> tag._id) : []

      }
      if(modalMode === "edit-snippet"){
        updateSnippet(snippetData);
        closeModal();
      }else if(modalMode === "add-snippet"){
        const res = createSnippet(snippetData);
        if(res._id){
          closeModal();
          resetForm(); 
        }
      }
    }

    const resetForm = ()=>{
      setTitle("");
      setDescription("");
      setCode("");
      setLanguage("javascript");
      setIsPublic(true);
      setActiveTags([]);
    }

   const languages = [
    "c",
    "c#",
    "c++",
    "css",
    "django",
    "go",
    "haskell",
    "html",
    "java",
    "javascript",
    "json",
    "kotlin",
    "lua",
    "php",
    "python",
    "r",
    "ruby",
    "rust",
    "sql",
    "swift",
    "typescript",
  ];

  return (
    <div className="fixed top-0 left-0 z-40 h-full w-full backdrop-blur-sm bg-opacity-50 overflow-hidden">
      <div className="py-5 px-6 bg-3 max-w-[920px] w-full flex flex-col gap-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-md ">
      <button 
      className="absolute top-7 right-7 text-white hover:text-gray-500 text-xl font-bold"
      onClick={()=> {
        resetForm();
        closeModal();
      }}>
        X
      </button>
        <form onSubmit={handleSubmit} action="" className="flex flex-col gap-4">
            <h1 className="text-white text-3xl font-bold">
              {modalMode === "edit-snippet" ? 
              (<span className="flex items-center gap-4">
                {edit} Edit Snippet
              </span>): (
                <span className="flex items-center gap-4">
                  {plus} Add Snippet
                </span>)}
            </h1>

            <div className="flex justify-between gap-4">
                <div className="flex-1">
                  <input
                  type="text"
                  name="title"
                  value={title}
                  onChange={(e)=> setTitle(e.target.value)}
                  placeholder="Title"
                  className="w-full h-12 px-4 bg-1 text-white rounded-lg"
                  />
                </div>
                <div>
                  <select
                   name="language"
                   value={language}
                   onChange={(e) => setLanguage(e.target.value)}
                   className="w-full h-12 px-4 bg-1 text-white rounded-lg cursor-pointer"
                   >
                    {languages.map((lang)=>{
                      return <option key={lang} value={lang}>{lang}</option>
                    })}
                   </select>
                </div>
                <div>
                  <select
                  value={isPublic}
                  onChange={(e)=> setIsPublic(e.target.value === "true")}
                  className="bg-1 text-white w-full h-12 px-4 rounded-lg cursor-pointer"
                  >
                    <option value="true">Public</option>
                    <option value="false">Private</option>
                  </select>
                </div>
            </div> 
            <div>
                  <textarea
                  name="description"
                  value={description}
                  onChange={(e)=> setDescription(e.target.value)}
                  placeholder="Description"
                  className="w-full pt-2 px-4 bg-1 text-white rounded-lg"
                  rows = {2}
                  >
                  </textarea>
            </div>

              <div>
                <pre>
                  <code>
                    <textarea
                    name="code"
                    value={code}
                    onChange={(e)=> setCode(e.target.value)}
                    className="w-full pt-2 h-[300px] px-4 bg-1 text-white rounded-lg"
                    placeholder="// Code here..."
                    >
                    </textarea>
                  </code>
                </pre>
              </div>
              <div className="flex flex-wrap gap-4">
                {tags.map((tag)=>{
                  return <button
                  key={tag._id} 
                  type="button"
                  className="py-1 text-white text-sm h-[42px] px-4 flex items-center justify-center bg-white rounded-lg font-semibold hover:bg-white/80 transition duration-200 ease-in-out"
                  style={{
                    background: activeTags.some((activeTag)=>{
                      return activeTag._id === tag._id;
                    }) ? "#7263f3" : useTagColorMemo,
                  }}
                  onClick={()=> handleTags(tag)} 
                  >{tag.name}</button>
                })}
                
              </div>

              <div className=" flex justify-end gap-4">
                <button
                type="button"
                className="bg-red-500 text-white hover:bg-red-500/80 py-1 rounded-lg font-semibold h-[47px] px-8 "
                onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                type="submit" 
                className={`h-[47px] flex items-center justify-center px-8 py-1
                  ${modalMode === "edit" ? "bg-blue-400" : "bg-indigo-500"}
                  text-white hover:bg-indigo-500/80 rounded-md transition-all duration-300 ease-in-out
                  `}
                  style={{ fontWeight: 400}}
                >
                  {modalMode === "edit-snippet" ? "Update Snippet" : "Add Snippet"}
                </button>
              </div>
        </form>
      </div>
    </div>
  )
}

export default AddSnippetModal
