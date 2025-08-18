"use client"
import React from 'react';
import AddSnippetModal from '@/app/Components/Modals/AddSnippetModal';
import {useGlobalContext} from '@/context/globalContext';

function ModalProvider() {
    const {modalMode,isEditing} = useGlobalContext();
  return (
    <>
        {isEditing && <AddSnippetModal/>}
    </>
  )
}

export default ModalProvider
