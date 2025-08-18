"use client";
import React from "react";
import { UserContextProvider } from "../context/userContext";
import {SnippetsProvider } from '@/context/snippetsContext';
import {GlobalProvider} from '@/context/globalContext';

function UserProvider({ children }) {
  return <UserContextProvider>
    <GlobalProvider>
      <SnippetsProvider >{children}</SnippetsProvider >
    </GlobalProvider>
    </UserContextProvider>;
}

export default UserProvider;
