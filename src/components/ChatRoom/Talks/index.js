import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import io from 'socket.io-client'
import { removeMember, setMembers, setRoom } from '../../../actions/room'

const socket = io.connect('http://localhost:5000/')

const Talks = () => {
    const myUser = useSelector(state => state.user)
    const room = useSelector(state => state.room)
    let members = room.members
    const [messages, setMessages] = useState([])
    const dispatch = useDispatch()

    useEffect(()=>{
        socket.emit('join-room', myUser, room.name)
    },[])
    useEffect(() => {
        socket.on('receive-message', (user, message) => {
            setMessages((list) => [...list, <Message user={user} message={message} />])
        })
        socket.on('add-new-member', (user) => {
            const data = dispatch(setMembers(members, user))
            members = [...data.members]
            if (data.update) {
                setMessages((list) => [...list, <JoinMessage user={user} />])
            }
        })
        socket.on('remove-member', (user) => {
            if (myUser.username === user.username) {
                dispatch(setRoom(null))
                socket.emit('leave', room.name)
            }
            else {
                const data = dispatch(removeMember(members, user))
                members = [...data.members]
                setMessages((list) => [...list, <LeaveMessage user={user} />])
            }
        })
    }, [socket]) // eslint-disable-line react-hooks/exhaustive-deps
    return (
        <div id="talks" className="talks select-none" style={{ transform: 'translate3d(0px, 150px, 0px)' }}>
            {/* <JoinMessage />
            <Message />
            <LeaveMessage /> */}
            {messages.map(msg => (msg))}
        </div>
    )
}

const Message = ({ user, message }) => {
    return (
        <dl key={user.username} className={`talk ${user.theme.name}`}>
            {/* ---------------- */}
            <dt className="dropdown-user">
                <div className={user.theme.avatar} />
                <div className="name" data-toggle="dropdown">
                    <span className="select-text">{user.username}</span>
                </div>
                <ul className="dropdown-menu" role="menu"></ul>
            </dt>
            {/* ---------------- */}
            <dd className="bounce">
                <div className="bubble">
                    <div className="tail-wrap center" style={{ backgroundSize: '65px' }}>
                        <div className="tail-mask" />
                    </div>
                    <div className="body text-select">{message}</div>
                </div>
            </dd>
            {/* ---------------- */}
        </dl>
    )
}

const JoinMessage = ({ user }) => {
    return (
        <div key={user.username} className="talk join system">
            ►►
            <span className="dropdown user">
                <span className="name">{user.username} </span>
                <ul className="dropdown-menu" role="menu" />
            </span>
            đã gia nhập.
        </div>
    )
}

const LeaveMessage = ({ user }) => {
    return (
        <div key={user.username} className="talk join system">
            ►►
            <span className="dropdown user">
                <span className="name">{user.username} </span>
                <ul className="dropdown-menu" role="menu" />
            </span>
            đã rời phòng.
        </div>
    )
}

export default Talks