import { useRef } from "react"
import { useSelector } from "react-redux"
import io from 'socket.io-client'
import axios from 'axios'
const socket = io.connect('http://localhost:5000/')

const MessageBox = () => {
    const room = useSelector(state => state.room)
    const user = useSelector(state => state.user)
    const textBox = useRef()

    // window.onunload = function(){
    //     socket.emit('leave-room', user, room.name)
    //     axios.post('http://localhost:5000/room/leave', { user, room })
    // }
    const sendMessage = () => {
        if (textBox.current.value !== '') {
            socket.emit('send-message', user, textBox.current.value, room.name)
            textBox.current.value = ''
        }
    }
    const leaveRoom = async () => {
        await axios.post('http://localhost:5000/room/leave', { user, room })
        socket.emit('leave-room', user, room.name)
    }
    const enterKeyDown = (e) => {
        if (e.code === "Enter" || e.code === "NumpadEnter") {
            e.preventDefault()
            sendMessage()
        }
    }
    return (
        <div className="message_box select-none">
            <div className="message_box_effect_wraper">
                <div className="message_box_inner">
                    {/* -------------- */}
                    <div>
                        {/* -------------- */}
                        <div className="room-input-wrap">
                            <textarea ref={textBox} onKeyDown={(e) => enterKeyDown(e)} name="message" className="form-control" maxLength="140" style={{ display: 'block' }} />
                            {/* <span className="counter">140</span> */}
                        </div>
                        {/* -------------- */}
                        <div className="room-submit-wrap">
                            <input onClick={sendMessage} type="submit" className="form-control room-submit-btn" value="POST!" />
                        </div>
                        {/* -------------- */}
                        <ul id="members" className="panel-hide">
                            <li className="member">1234 (host)</li>
                        </ul>
                        {/* -------------- */}
                        <ul className="panel-hide">
                            <li id="user_id">2315ef2d5bba16a2e0427dec7697cf86</li>
                            <li id="user_name" className="select-text">1234</li>
                            <li id="user_icon">eight</li>
                            <li id="user_tripcode"></li>
                        </ul>
                        {/* -------------- */}
                        <div className='clearfix'>
                            <h2 id="room_name" className="select-text">
                                <span className="room-title-name">Tên phòng : {room?.name}</span><br />
                                <span className="room-title-capacity">Thành viên: {room?.members?.length}/{room?.limit}</span>
                            </h2>
                            <ul className='menu'>
                                {/* <li id='members' className="image needsclick" style={{ display: 'list-item' }}>
                                    <svg width='12' height='12' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                                    </svg>
                                </li> */}
                                {/* <li id='refresh' className="image needsclick" style={{ display: 'list-item' }}>
                                    <svg width='12' height='12' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                                    </svg>
                                </li> */}
                                <li onClick={leaveRoom} id='logout' className="image needsclick" style={{ display: 'flex' }}>
                                    <svg width='12' height='12' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                                    </svg>
                                    <span className="mx-3"> {' Leave '}</span>
                                </li>
                                {/* <li id='options' className="image needsclick" style={{ display: 'list-item' }}>
                                    <svg width='12' height='12' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </li> */}
                            </ul>
                        </div>
                        {/* -------------- */}
                    </div>
                    {/* -------------- */}
                    <ListMember />
                    {/* -------------- */}
                </div>
            </div>
        </div>
    )
}

const ListMember = () => {
    const members = useSelector(state => state.room.members)
    return (
        <div id='setting_pannel' className='panel-hide is-host' style={{ top: '131px', display: 'block' }}>
            <ul className='user-list' id='user_list'>
                {members.map((member, index) => (
                    index === 0
                        ? (<li key={index} title={`${members[0].username} (host)`} className="dropdown user clearfix symbol-wrap-gaki-2x is-host" device="desktop">
                            <ul className="dropdown-menu" role="menu" />
                            <div className="name-wrap" data-toggle="dropdown">
                                <span className={member.theme.symbol} />
                                <span className="select-text name">{member.username}</span>
                            </div>
                            {/* <span className="icon-display icon-device" />
                    <span className="icon icon-users" /> */}
                        </li>)
                        : (<li key={index} title={`${members[0].username}`} className="dropdown user clearfix symbol-wrap-gaki-2x" device="desktop">
                            <ul className="dropdown-menu" role="menu" />
                            <div className="name-wrap" data-toggle="dropdown">
                                <span className={member.theme.symbol} />
                                <span className="select-text name">{member.username}</span>
                            </div>
                            {/* <span className="icon-display icon-device" />
                <span className="icon icon-users" /> */}
                        </li>)
                ))}
            </ul>
        </div>
    )
}

export default MessageBox