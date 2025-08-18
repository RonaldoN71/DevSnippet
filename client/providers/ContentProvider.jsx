"use client"
import React from 'react'
import Sidebar from '@/app/Components/Sidebar/Sidebar'
function ContentProvider({children}) {
  return (
    <div className="relative">
        <Sidebar/>
      <div className="mt-[8vh] ml-[15rem]">{children}</div>
    </div>
  )
}

export default ContentProvider;
