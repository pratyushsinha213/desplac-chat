import { useAuthStore } from '@/store/useAuthStore'
import { LogOut, MessageSquare, Settings, User } from 'lucide-react';
import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {

  const { logout, authUser } = useAuthStore();



  return (
    <header className="fixed top-0 z-40 w-full border-b border-base-300 backdrop-blur-1g bg-[#1F2021]">
      <div className='container px-4 mx-auto h-18'>
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-3">
            {/* Could work on this later on for the logo */}
            <Link to={"/"} className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              <div className="flex items-center justify-center rounded-lg size-9 bg-blue-700/30">
                <MessageSquare className="w-5 h-5 text-yellow-600" />
              </div>
              <h1 className="text-lg font-bold text-yellow-600">Desplac Chat</h1>
            </Link>
          </div>
          <div className='flex items-center gap-3'>
            {/* <Link
              to={"/settings"}
              className={`btn btn-sm gap-2 bg-[#1F2021]`}
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link> */}
            {authUser && (
              <>
                <Link to={"/profile"} className={`btn btn-sm gap-2 bg-[#1F2021]`}>
                  <User className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>
                <button className="flex items-center gap-2 cursor-pointer btn btn-sm bg-[#1F2021]" onClick={logout}>
                  <LogOut className="font-semibold text-red-500 size-5" />
                  <span className="hidden text-red-500 sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div >
    </header >
  )
}

export default Navbar