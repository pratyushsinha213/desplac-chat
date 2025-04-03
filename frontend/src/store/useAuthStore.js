import { axiosInstance } from '@/lib/axios';
import { toast } from 'sonner';
import { create } from 'zustand'
import { io } from 'socket.io-client';

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5500" : "/";

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isRegister: false,
    isLogin: false,
    isUpdatingProfile: false,
    onlineUsers: [],
    socket: null,

    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get('/auth/user-details');
            set({ authUser: res.data });
            get().connectSocket();
        } catch (error) {
            console.log(`Error in checkAuth store: ${error}`);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    register: async (data) => {
        set({ isRegister: true });
        try {
            const res = await axiosInstance.post('/auth/register', data);
            set({ authUser: res.data });
            toast.success("Account registered successfully.");
            get().connectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isRegister: false });
        }
    },

    login: async (data) => {
        set({ isLogin: true });
        try {
            const res = await axiosInstance.post('/auth/login', data);
            set({ authUser: res.data });
            toast.success("User logged in successfully.");
            get().connectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isLogin: false });
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post('/auth/logout');
            set({ authUser: null });
            toast.success("User logged out successfully.");
            get().disconnectSocket();
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },

    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
            const res = await axiosInstance.put('/auth/update-profile', data);
            set({ authUser: res.data });
            toast.success("Profile Picture updated successfully.");
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isUpdatingProfile: false });
        }
    },

    connectSocket: async () => {
        const { authUser } = get();
        if (!authUser || get().socket?.connected) return;

        const socket = io(BASE_URL, {
            query: {
                userId: authUser._id,
            }
        });
        socket.connect();
        set({ socket: socket });

        socket.on("getOnlineUsers", (userIds) => {
            set({ onlineUsers: userIds });
        });
    },

    disconnectSocket: async () => {
        if (get().socket?.connected) {
            get().socket.disconnect();
        }
    }
}));