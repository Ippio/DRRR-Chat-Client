import { useEffect } from "react"
import axios from "axios"

const useClose = () => {
    useEffect(() => {
        window.BeforeUnloadEvent = () => {
            axios.post('http://localhost:5000/room/leave', { user, room })
            socket.emit('leave-room', user, room.name)
        }
    }, [])
}

export default useClose