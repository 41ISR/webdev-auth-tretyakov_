import { api } from "../api/api"
import { useMessageStore } from "../store/useMessageStore"
import { useUserStore } from "../store/useUserStore"

const MessageCard = ({id, likes, likedBy, content, username, createdAt, userId, onReport }) => {
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
        try{
            await api.likeMessage(id)
            await getMessages()
        } catch(error) {
            console.error(error)
        }
    }
    const handleReport = async () => {
        try {
            await api.reportMessage(id)
            await getMessages()
        } catch(error) {
            console.error(error)
        }
    }
    return (
        <div className="message-card">
            <div className="message-content">{content}</div>
            <div className="message-meta">
                <span className="message-author">@{username}</span>
                <span className="message-time">{createdAt}</span>
            </div>
            <div className="message-actions">
                <button className="action-button" onClick={handleLike} >
                    <span>{likes} {likedBy.includes(session?.user.id) ? "💗" : "🤍"} </span>
                    <span>Нравится</span>
                </button>
                <button className="action-button" onClick={handleReport}>
                    <span>🚩</span>
                    <span>Пожаловаться</span>
                </button>
                {userId === session?.user.id && 
                    <button onClick={handleDelete} className="action-button delete">
                        <span>❌</span>
                        <span>Удалить</span>
                    </button>
                }
            </div>
        </div>
    )
}

export default MessageCard
