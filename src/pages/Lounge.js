import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import NewRoomModal from "../components/Lounge/NewRoomModal"
import Options from "../components/Lounge/Options"
import Rooms from "../components/Lounge/Rooms"

const Lounge = () => {
    const room = useSelector(state => state.room)
    const scheme = useSelector(state => state.user.theme.scheme)
    const body = document.getElementsByTagName('body')[0]
    body.classList.add(scheme)
    const navigate = useNavigate()
    useEffect(()=>{
        if(room )navigate(`/room/${room.name}`,{replace:true})
    },[])
    return (
        <div id="body" className={scheme} style={{ overflowX: 'visible' }}>
            <div className="container">
                <div className="row">
                    <Options />
                    <Rooms />
                    <NewRoomModal />
                </div>
            </div>
        </div>
    )
}

export default Lounge