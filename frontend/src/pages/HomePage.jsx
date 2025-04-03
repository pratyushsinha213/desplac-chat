import ChatContainer from '@/components/ChatContainer';
import Sidebar from '@/components/Sidebar';
import NoChatSelected from '@/components/NoChatSelected';
import { useChatStore } from '@/store/useChatStore'
import React from 'react'

const HomePage = () => {

  const {selectedUser} = useChatStore();


  return (
    <div className='h-screen'>
      <div className="flex items-center justify-center px-4 pt-20">
        <div className="w-full max-w-6xl rounded-lg shadow-lg bg-zinc-700 h-[calc(100vh-8rem)]">
          <div className="flex h-full overflow-hidden rounded-lg">
            <Sidebar />

            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage