import Room from "./Room"
import { useDispatch, useSelector } from "react-redux"
import { openModal, setLoading } from '../../../actions/lounge'
import { useFetch } from '../../../hooks/useFetch'
import { useState } from "react"
const Rooms = () => {
    const modalState = useSelector(state => state.lounge.modalState)
    const rooms = useSelector(state => state.lounge.rooms)
    const loading = useSelector(state => state.lounge.loading)
    let [count, setCount] = useState(0)
    const dispatch = useDispatch()
    const handleClick = () => {
        dispatch(openModal(!modalState))
    }
    useFetch(`http://localhost:5000/room?refresh=${count}`)
    const reload = () => {
        setCount(++count)
        dispatch(setLoading(true))
    }
    return (
        <div className="col-sm-8 col-sm-pull-4">
            <div className="wrap">
                {/* ----------- */}
                <div className="lounge-top">
                    <span className="lounge-refresh" id="lounge-refresh" style={{ textDecoration: 'none', color: '#555' }}>
                        <b onClick={reload}> Làm mới </b>
                    </span>
                    {loading && <span className="load-placeholder load-placeholder--lounge on animate"> Loading … </span>}
                </div>
                {/* ----------- */}
                <div className="lounge-nav">
                    {/* ----------- */}
                    <div className="create-room pull-left" id="create_room">
                        <input onClick={handleClick} readOnly className="btn btn-default" value="Tạo phòng" />
                    </div>
                    {/* ----------- */}
                    <div className="lounge-links pull-left">
                        <div className="lounge-counter on">
                            {/* <span className="rooms-count" id="rooms-count">64 rooms</span>
                            <span> - </span>
                            <span className="online-count" id="online-count">181 users</span> */}
                        </div>
                    </div>
                </div>
                {/* ----------- */}
                {
                    rooms?.map((room, index) => (
                        <Room key={index} room={room} />
                    ))
                }
                {/* ----------- */}
            </div>
        </div>
    )
}

export default Rooms