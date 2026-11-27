import { useEffect, useState } from 'react'
import Feed from '../components/Feed'
import { api } from '../api/api'
import { useUserStore } from '../store/useUserStore'

const MyMessages = () => {
    const [myMessages, setMyMessages] = useState([])
    const session = useUserStore (state => state.session)
    const getMessages = useMessageStore(state => state.getMessages)
    useEffect(() => {
        const load = async () => {
        try {
            const res = await api.getMessages();
            const myMessages = res.data.filter(msg => msg.userId === session.user.id)
            setMyMessages(myMessages)
        } catch(error) {
            console.error(error)
        }
    }

    load();
}, [])
    
    return <Feed title="Мои сообщения" messages={myMessages} />
}

export default MyMessages
