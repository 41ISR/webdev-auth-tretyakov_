import { api } from "../api/api"
import { useMessageStore } from "../store/useMessageStore"
import { useUserStore } from "../store/useUserStore"

const MessageCard = ({ likes, content, username, createdAt, userId }) => {
    const session = useUserStore((state) => state.session)
    const getMessages = useMessageStore(state => state.getMessages)

    const handleDelete = async () => {
        try{
            await api.deleteMessage(id)
            await getMessages()
        } catch(error) {
            console.error(error)
        }
    }
    const handleLike = async () => {

    }
    const handleReport = async () => {

    }
    return (
        <div className="message-card">
            <div className="message-content">{content}</div>
            <div className="message-meta">
                <span className="message-author">@{username}</span>
                <span className="message-time">{createdAt}</span>
            </div>
            <div className="message-actions">
                <button className="action-button">
                    <span>{likes} 💗🤍</span>
                    <span>Нравится</span>
                </button>
                <button className="action-button">
                    <span>🚩</span>
                    <span>Пожаловаться</span>
                </button>
                {userId === session?.user.id && 
                    <button className="action-button delete">
                        <span>❌</span>
                        <span>Удалить</span>
                    </button>
                }
            </div>
        </div>
    )
}

export default MessageCard
