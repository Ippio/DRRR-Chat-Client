import { useDispatch } from 'react-redux'
import axios from 'axios'
import setTheme from '../utils/setTheme'
import { login } from '../actions/user'
import { setRoom } from '../actions/room'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
const ENDPOINT = 'http://localhost:5000/auth'
const Login = () => {
    const dispatch = useDispatch()
    const username = useRef()
    const navigate = useNavigate()
    const handleClick = async (e) => {
        e.preventDefault()
        if(username.current.value){
            const user = {
                username: username.current.value,
                theme: setTheme()
            }
            try {
                const res = await axios.post(`${ENDPOINT}/login`, user)
                dispatch(setRoom(null))
                dispatch(login(res.data.data))
                navigate('/lounge',{replace:true})
            } catch (error) {
                console.log(error);
            }
        }
    }
    const enterKeyDown = (e)=>{
        if(e.key === 'Enter'){
            handleClick(e)
        }
    }

    return (
        <div id="body" >
            <div className="homewrap">
                <div className="logo-wrapper">
                    <div className="login-logo front" />
                </div>
            </div>
            {/* ----------------- */}
            <div className="login-form field">
                {/* ----------------- */}
                <div className="home-name">
                    <label>USERNAME:</label>
                    <input onKeyDown={(e)=>enterKeyDown(e)} ref={username} type="text" id="form-name" size="10" maxLength="40" className="home-name-input" required autoComplete="off"></input>
                </div>
                {/* ----------------- */}
                <p className="text-center">
                    <span>HELLO</span>
                </p>
                {/* ----------------- */}
                <div className="home-submit">
                    <input onClick={(e) => handleClick(e)} type="submit" value='Enter' name="login" className="submit-input home-submit-input" />
                </div>
                {/* ----------------- */}
            </div>
        </div>
    )
}

export default Login