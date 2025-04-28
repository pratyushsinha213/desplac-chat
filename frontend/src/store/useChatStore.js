import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";
import { create } from "zustand";
import { useAuthStore } from "./useAuthStore";
import { CloudCog } from "lucide-react";


export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    getUsers: async () => {
        set({ isUsersLoading: true });
        try {
            const res = await axiosInstance.get('/messages/users');
            set({ users: res.data });
        } catch (error) {
            toast.error(error.response.data.messages);
        } finally {
            set({ isUsersLoading: false });
        }
    },

    getMessages: async (userId) => {
        set({ isMessagesLoading: true });
        try {
            const res = await axiosInstance.get(`/messages/${userId}`)
            set({ messages: res.data });
        } catch (error) {
            console.error('Error fetching messages:', error);
            toast.error(error.response.data.message);
        } finally {
            set({ isMessagesLoading: false });
        }
    },

    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get();
        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
            set({ messages: [...messages, res.data] });
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    listenToMessages: () => {
        const { selectedUser } = get();
        if (!selectedUser) {
            console.log('No selected user, skipping message listener setup');
            return;
        }

        const socket = useAuthStore.getState().socket;
        if (!socket) {
            console.log('No socket connection, skipping message listener setup');
            return;
        }

        socket.on("newMessage", (newMessage) => {
            console.log('Received new message:', newMessage);
            const { authUser } = useAuthStore.getState();
            const isRelevantMessage = 
                (newMessage.senderId === authUser._id && newMessage.recieverId === selectedUser._id) ||
                (newMessage.senderId === selectedUser._id && newMessage.recieverId === authUser._id);
            
            if (!isRelevantMessage) {
                return;
            }
            set({messages: [...get().messages, newMessage]});
        });
    },

    unlistenToMessages: () => {
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage");
    },

    setSelectedUser: (selectedUser) => set({ selectedUser }),

}));