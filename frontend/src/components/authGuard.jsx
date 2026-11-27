import { useEffect } from "react"
import { useUserStore } from "../store/useUserStore"
import { Navigate, useNavigate } from "react-router-dom"

export const AuthGuard = ({children}) => {
    const session = useUserStore(state => state.session)
    const navigate = useNavigate()
    
    useEffect(() => {
        if (!session.token) Navigate('/signin')
    }, [])

    if (!session.token) return <></>

    return children
}