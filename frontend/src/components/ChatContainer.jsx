import { useChatStore } from '@/store/useChatStore'
import React, { useEffect, useRef } from 'react'
import MessageSkeleton from './skeletons/MessageSkeleton';
import MessageInput from '@/components/MessageInput';
import ChatHeader from '@/components/ChatHeader';
import { useAuthStore } from '@/store/useAuthStore';
import { formatTimeForMessage } from '@/lib/utilities';

const ChatContainer = () => {

  const { messages, isMessagesLoading, getMessages, selectedUser, listenToMessages, unlistenToMessages } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    listenToMessages();
    return () => unlistenToMessages();
  }, [selectedUser._id, getMessages, listenToMessages, unlistenToMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({behavior: "smooth"});
    }
  }, [messages])


  if (isMessagesLoading) return (
    <div className='flex flex-col flex-1 overflow-auto bg-zinc-800'>
      <ChatHeader />
      <MessageSkeleton />
      <MessageInput />
    </div>
  )

  return (
    <div className='flex flex-col flex-1 overflow-auto bg-zinc-800'>
      <ChatHeader />
      <div className='flex-1 p-4 space-y-4 overflow-y-auto'>
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
            ref={messageEndRef}
          >
            <div className="chat-image avatar">
              <div className="border rounded-full size-10">
                <img
                  src={message.senderId === authUser._id ? authUser.profilePic || "/avatar.png" : selectedUser.profilePic || "/avatar.png"}
                  alt="profile pic" />
              </div>
            </div>
            <div className="mb-1 chat-header">
              <time className='ml-1 text-xs opacity-50'>
                {formatTimeForMessage(message.createdAt)}
              </time>
            </div>
            <div className="flex flex-col chat-bubble">
              {message.image && (
                <img
                  src={message.image}
                  alt='attachment'
                  className='sm:max-w-[200px] rounded-md mb-2'
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>
      <MessageInput />
    </div>
  )
}

export default ChatContainer