import { useSelector } from 'react-redux'
import { Navigate, Outlet} from 'react-router-dom'

const RequireAuth = ()=>{
    const user = useSelector(state => state.user)
    return(
        user?<Outlet/>:<Navigate to='/' />
    )
}

export default RequireAuth