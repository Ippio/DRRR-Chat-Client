import RoomInfo from "./RoomInfo"
import Tooltip from '@mui/material/Tooltip';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios'
import { setRoom } from "../../../../actions/room";
import { useNavigate } from "react-router-dom";
const Room = ({ room }) => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const joinRoom = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('http://localhost:5000/room', {user,room})
            if (res) {
                dispatch(setRoom(res.data.data))
                navigate(`/room/${res.data.data.name}`, { replace: true })
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        room.limit <= room.members.length
        ?(<div className="rooms-placeholder" id="rooms-placeholder">
            <div className="rooms-wrap" id="rooms-filter-support">
                <ul className="rooms" data-music data-full data-description>
                    {/* room name */}
                    <li className="name">
                        <button className="btn btn-link select-text lounge-room-name" type="submit" name="id" value="YGexvN2o7w" style={{ display: 'inline-flex', pointerEvents:'none' }}>
                            <span className="room-badge room-badge-music">
                                <svg width={18} height={18} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="w-6 h-6" >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                                </svg>
                            </span>
                            <span className="room-badge room-badge-description">
                                <svg width={18} height={18} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                </svg>
                            </span>
                            <span className="room-name" title="MBTI的临时小屋"> {room?.name} </span>
                        </button>
                    </li>
                    {/* creator */}
                    <li className="creator">
                        <span className="symbol symbol-tanaka-2x"></span>
                        {room.host}
                    </li>
                    {/* status */}
                    <li className="status">
                        <Tooltip title={<RoomInfo room={room}></RoomInfo>}>
                            <div className="progress-bar-label-wrap">
                                <div className="progress-bar-label room-tooltip tooltipstered" >
                                    {room?.members?.length} / {room.limit}
                                </div>
                            </div>
                        </Tooltip>
                        <div className="progress progress-desktop loaded" style={{ width: `${room.limit / 20 *100}%` }}>
                            <div className="progress-bar progress-bar-danger" role="progressbar" style={{ width: `${room.members.length / room.limit * 100}%` }}></div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>)
        :(<div className="rooms-placeholder" id="rooms-placeholder">
            <div className="rooms-wrap" id="rooms-filter-support">
                <ul className="rooms" data-music data-description>
                    {/* room name */}
                    <li className="name">
                        <button onClick={(e) => joinRoom(e)} className="btn btn-link select-text lounge-room-name" type="submit" name="id" value="YGexvN2o7w" style={{ display: 'inline-flex' }}>
                            <span className="room-badge room-badge-music">
                                <svg width={18} height={18} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="w-6 h-6" >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                                </svg>
                            </span>
                            <span className="room-badge room-badge-description">
                                <svg width={18} height={18} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                </svg>
                            </span>
                            <span className="room-name" title="MBTI的临时小屋"> {room?.name} </span>
                        </button>
                    </li>
                    {/* creator */}
                    <li className="creator">
                        <span className="symbol symbol-tanaka-2x"></span>
                        {room.host}
                    </li>
                    {/* status */}
                    <li className="status">
                        <Tooltip title={<RoomInfo room={room}></RoomInfo>}>
                            <div className="progress-bar-label-wrap">
                                <div className="progress-bar-label room-tooltip tooltipstered" >
                                    {room?.members?.length} / {room.limit}
                                </div>
                            </div>
                        </Tooltip>
                        <div className="progress progress-desktop loaded" style={{ width: `${room.limit / 20 *100}%` }}>
                            <div className="progress-bar" role="progressbar" style={{ width: `${room.members.length / room.limit * 100}%` }}></div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>)
    )
}

export default Room