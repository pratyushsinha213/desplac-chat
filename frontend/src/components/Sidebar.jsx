import { useChatStore } from '@/store/useChatStore'
import React, { useEffect, useState } from 'react'
import SidebarSkeleton from './skeletons/SidebarSkeleton';
import { Users } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';

const Sidebar = () => {

  const { users, getUsers, isUsersLoading, selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  const [showOnline, setShowOnline] = useState(false);


  useEffect(() => {
    getUsers()
  }, [getUsers]);

  const filteredUsers = showOnline ? users.filter((user) => onlineUsers.includes(user._id)) : users;

  if (isUsersLoading) return <SidebarSkeleton />


  return (
    <aside className='flex flex-col w-20 h-full transition-all duration-200 border-r bg-zinc-800 lg:w-72'>
      <div className="w-full p-8 border-b">
        <div className="flex items-center gap-2">
          <Users className='size-6' />
          <span className='hidden font-medium lg:block'>Contacts</span>
        </div>
        {/* To do later for online filter */}
        <div className="items-center hidden gap-2 mt-3 lg:flex">
          <label className='flex items-center gap-2 cursor-pointer'>
            <input
              type="checkbox"
              checked={showOnline}
              onChange={(e) => setShowOnline(e.target.checked)}
              className='checkbox checkbox-sm bg-zinc-300'
            />
            <span className='text-sm'>Show online only</span>
          </label>
          <span className='text-xs text-zinc-500'>({onlineUsers.length-1} online)</span>
        </div>
      </div>

      <div className="w-full py-3 overflow-y-auto">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full p-3 flex items-center gap-3
              hover:bg-base-300 transition-colors
              ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}
            `}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.name}
                className="object-cover rounded-full size-12"
              />
              {onlineUsers.includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 bg-green-500 rounded-full size-3 ring-2 ring-zinc-900"
                />
              )}
            </div>

            {/* User info - only visible on larger screens */}
            <div className="hidden min-w-0 text-left lg:block">
              <div className="font-medium truncate">{user.name}</div>
              <div className="text-sm text-zinc-400">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="py-4 text-center text-zinc-500">No online users</div>
        )}
      </div>
    </aside>
  )
}

export default Sidebar