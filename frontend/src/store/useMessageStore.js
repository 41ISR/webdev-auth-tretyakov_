import { create } from "zustand";
import { api } from "../api/api";

export const useMessageStore = create((set) => ({
    messages: [],
    getMessages: async () => {
        const res = await api.getMessages()
        set({messages: res.data})
    },
    createMessage: async (message) => {
        const res = await api.createMessage(message)
        set((state) => ({message: [...state.messages, res.data]}))
    }
}))