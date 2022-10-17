import axios from 'axios'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const axiosPrivate = axios.create(
    {
        baseURL: 'http://localhost:5000/auth',
        headers: {'Content-Type' : 'application/json'}

    }
)

const useAxiosPrivate = ()=>{
    const user = useSelector(state => state.user)
    const room = useSelector(state => state.room)

    useEffect(()=>{

        const requestIntercep = axiosPrivate.interceptors.request.use(
            config =>{
                if(!config.headers['Authorization']){}
            }
        )

        const responseIntercep = axiosPrivate.interceptors.response.use(
            response => response,
            (error)=>{

            }
        )
    },[user,room])
    
    return axiosPrivate
}

export default useAxiosPrivate