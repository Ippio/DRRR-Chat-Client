// import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import useRefresh from '../hooks/useRefresh'
import ChatRoom from '../pages/ChatRoom'
import Login from '../pages/Login'
import Lounge from '../pages/Lounge'
import NotFound from '../pages/NotFound'
import BlockUser from './BlockUser'
import RequireAuth from './RequireAuth'
import RequireRoom from './RequireRoom'

const RouterSetup = () => {
    const {user,room} = useRefresh()
    return (
        <Router>
            <Routes>
                <Route element={<BlockUser />} >
                    <Route path='/' exact element={<Login />} />
                </Route>
                <Route element={<RequireAuth />} >
                    <Route path='/lounge' element={<Lounge />} />
                    <Route element={<RequireRoom />} >
                        <Route path='/room/:name' element={<ChatRoom />} />
                    </Route>
                </Route>
                <Route path='*' element={<NotFound />} />
            </Routes>
        </Router>
    )
}

export default RouterSetup