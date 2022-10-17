import axios from "axios"
import { useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setLoading, setRooms } from "../../../actions/lounge"
import { logout } from "../../../actions/user"

const ENDPOINT = 'http://localhost:5000/auth/logout'

const Options = () => {
    const avatar = useSelector((state) => state.user.theme.avatar)
    const username = useSelector((state) => state.user.username)
    const user = useSelector((state) => state.user)
    const searchInput = useRef()
    const dispatch = useDispatch()
    const search = async()=>{
        dispatch(setLoading(true))
        const key = searchInput.current.value
        const res = await axios.post('http://localhost:5000/room/search',{key}) 
        if(res){
            dispatch(setLoading(false))
            dispatch(setRooms(res.data.rooms))
        }
    }
    const exits = async() => {
        try {
            const res = await axios.post(ENDPOINT,user)
            if (res) {
                dispatch(logout())
                const body = document.getElementsByTagName('body')[0]
                body.className = ''
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="col-sm-4 col-sm-push-8">
            <ul id="profile" className="lounge-profile" data-avatar="setton">
                <li className="icon">
                    <div className={avatar}></div>
                    <div className="name">{username}</div>
                    <div className="profile-links">
                        <input readOnly onClick={() => exits()} type="submit" className="btn btn-invert btn-link" value="Đăng xuất" />
                    </div>
                </li>
                <li className="lang" style={{ display: 'none' }}>vi-VN</li>
                <li className="lang-friends" style={{ display: 'none' }}>vi-VN</li>
                <li className="user-ip" style={{ display: 'none' }}>MjQ3LjIxMi4xOTcuODM=</li>
            </ul>
            <div className="sidebar-box note rooms-filter-wrap" style={{ color: 'black' }}>
                <input ref={searchInput} onChange={search} type="search" className="form-control rooms-filter" id="rooms-filter" placeholder="Tìm kiếm" />
                {/* <div className="checkbox">
                    <label >
                        <input id="toggle-adult-rooms" type="checkbox" />
                        <span className='font-bold'>Hiện phòng 18+</span>
                    </label>
                </div>
                <div className="checkbox">
                    <label>
                        <input className="toggle-members" type="checkbox" />
                        <span className="font-bold">Show members</span>
                    </label>
                </div> */}
                <div className="checkbox">
                </div> 
            </div>
        </div>
    )
}

export default Options