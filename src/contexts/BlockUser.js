import { useSelector } from "react-redux"
import {Navigate, Outlet} from 'react-router-dom'

const BlockUser = ()=>{
    const user = useSelector(state => state.user)
    return(
        !user ? <Outlet/> : <Navigate to='/lounge' />
    )
}

export default BlockUser