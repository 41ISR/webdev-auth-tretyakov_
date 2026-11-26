import { useEffect } from "react"
import Feed from "../components/Feed"
import MessageField from "../components/MessageField"
import { useUserStore} from '../store/useUserStore'
import { useMessageStore } from "../store/useMessageStore"

const Board = () => {
    const session = useUserStore((state) => state.session)
    const {getMessages, messages} = useMessageStore()
    useEffect(() => {
        getMessages()
    }, [])
    return (
        <>
            <h1>Board</h1>
            {session && <MessageField />}
            <Feed messages={messages} title="Последние сообщения" />
        </>
    )
}



export default Board
