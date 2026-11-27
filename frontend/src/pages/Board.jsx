import { useEffect, useState } from "react"
import Feed from "../components/Feed"
import MessageField from "../components/MessageField"
import { useUserStore} from '../store/useUserStore'
import { useMessageStore } from "../store/useMessageStore"

const Board = () => {
    const session = useUserStore((state) => state.session)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setIsError] = useState(null)
    const {getMessages, messages} = useMessageStore()
    useEffect(() => {
        const load = async () => {
            setIsError(null)
            setIsLoading(true)
            try {
                await getMessages()
            } catch (error) {
                console.error(error)
                setIsError(error.message || "Что-то пошло не так")
            } finally {
                setIsLoading(false)
            }
            
        }
        load()
    }, [])
    return (
        <>
            <h1>Board</h1>
            {session && <MessageField />}
            {isLoading && <p>Загрузка...</p>}
            {error && !isLoading && <p className="error">{error}</p>}
            {!error && !isLoading && (
            <Feed messages={messages} title="Последние сообщения" />
            )}
        </>
    )
}



export default Board
