import axios from "axios"
import { useUserStore } from "../store/useUserStore"

const BASE_URL = import.meta.env.VITE_API_URL + "/api" || "https://api.kitek-pg.ru/api/feedback"

const apiInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
})

const registerUser = async (user) => {
    const res = await apiInstance.post("/auth/register", user)
    return res
}

const loginUser = async (user) => {
    const res = await apiInstance.post("/auth/login", user)
    return res
}

const getMessages = async() => {
    const res = await apiInstance.get("/messages")
    return res 
}

const createMessage = async (message) => {
    const res = await apiInstance.post('/messages', message)
    return res
}

const deleteMessage = async (id) => {
    const res = await apiInstance.delete(`messages/${id}`)
    return res
}

const reportMessage = async (id)  => {
    const res = await apiInstance.post(`messages/${id}/report`)
    return res
}

const likeMessage = async (id) => {
    const res = await apiInstance.post(`messages/${id}/like`)
    return res
}

apiInstance.interceptors.request.use((config) => {
    const {session} = useUserStore.getState()

    if(session?.token) config.headers.Authorization = `Bearer ${session.token}`
    
    return config
})

export const api = {
    registerUser,
    loginUser,
    getMessages,
    createMessage,
    deleteMessage,
    reportMessage,
    likeMessage
}