"use client";
import Image from "next/image";
import Link from "next/link";
import SearchInput from '../SearchInput/SearchInput';
import {useUserContext} from "@/context/userContext";
import { useRouter } from "next/navigation";
import { login, register } from "@/utils/Icons";
import SearchIcon from "@/public/Icons/SearchIcon";
import {useGlobalContext} from "@/context/globalContext"
function Header() {
  const {openModalForSnippet,openProfileModal,openModalForSearch} = useGlobalContext();
    const {user} = useUserContext();
    const router = useRouter();
  return (
    <div className="fixed z-20 top-0 w-full px-8 flex items-center bg-1 border-b border-1 justify-between h-[8vh]">
      <Link href="/" className="flex items-center gap-2">
      <Image
      src="/thecodedealer--logo-white.png"
      alt="logo"
      width={30}
      height={30}
      />
      <h1 className="text-white text-2xl font-bold">Snips</h1>
      </Link>
      <div className="lg:flex hidden">
        <SearchInput/>
      </div>

      {!user._id ? (
        <div className="flex items-center gap-4">
          <button
            className="btn-hover relative h-[47px] px-8 bg-[#3A3B3C] flex items-center justify-center gap-4 rounded-xl overflow-hidden"
            onClick={() => router.push("/login")}
          >
            <span className="text-xl text-gray-200">{login}</span>
            <span className="font-bold text-white">Login</span>
            <div className="blob"></div>
          </button>
          <button
            className="btn-hover relative h-[47px] px-8 bg-[#7263F3] flex items-center justify-center gap-4 rounded-xl overflow-hidden"
            onClick={() => router.push("/register")}
          >
            <span className="text-xl text-gray-200">{register}</span>
            <span className="font-bold text-white">Register</span>
            <div className="blob"></div>
          </button>
        </div>
      ):(
        <div className="flex items-center gap-2">
            <button className="mr-4 h-[42px] px-4 flex items-center justify-center bg-white rounded-lg font-semibold hover:bg-white/80 transition duration-200 ease-in-out"
            onClick={openModalForSnippet}
            >Create Snippet</button>
            <button
            className="w-[42px] h-[42px] flex items-center justify-center bg-rgba-3 rounded-lg lg:hidden"
            onClick={openModalForSearch}
            >
              <SearchIcon stroke="rgba(249,249,249,0.6)"/>
            </button>

            <button onClick={openProfileModal}
            className="w-[42px] h-[42px] flex items-center justify-center bg-rgba-3 rounded-full"
            >
              <Image
              src={user?.photo || "/thecodedealer--logo-white.png"}
              alt="profile"
              width={42}
              height={42}
              className="rounded-full"
              />
            </button>
        </div>
      )}
    </div>

    
  )
}

export default Header
