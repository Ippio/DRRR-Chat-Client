import { useEffect }from "react"
import { useSelector, useDispatch } from "react-redux"
import axios from 'axios'
import { setUser } from "../actions/user"
import { setRoom } from "../actions/room"

const useRefresh = ()=>{
    const user = useSelector(state => state.user)
    const room = useSelector(state => state.room)
    const dispatch = useDispatch()
    useEffect(()=>{
        const refresh = async()=>{
            if(!user){
                try {
                    const response = await axios.get('http://localhost:5000/auth')
                    if(response.data.user) dispatch(setUser(response.data.user))
                    if(response.data.room) dispatch(setRoom(response.data.room))
                    return response
                } catch (error) {
                    console.log(error);
                }
            }
        }
        refresh()
    },[])
    return {user,room}
}

export default useRefresh