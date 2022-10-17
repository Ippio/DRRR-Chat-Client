import { useSelector } from 'react-redux'
import { Navigate, Outlet} from 'react-router-dom'

const RequireRoom = ()=>{
    const room = useSelector(state => state.room)
    return(
        room ? <Outlet/> : <Navigate to='/lounge' />
    )
}

export default RequireRoom