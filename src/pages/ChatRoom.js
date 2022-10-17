
import { useSelector } from "react-redux"
import MessageBox from "../components/ChatRoom/MessageBox"
import Talks from "../components/ChatRoom/Talks"

const ChatRoom = () => {
    const roomName = useSelector(state => state.room.name)
    const body = document.getElementsByTagName('body')[0]
    body.className = ''

    return (
        roomName &&
        <div id='body'>
            <Talks />
            <MessageBox />
        </div>
    )
}

export default ChatRoom