import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setLoading, setRooms } from "../actions/lounge"

export const useFetch = (url) => {
    const [error, setError] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(url)
                dispatch((setLoading(false)))
                dispatch(setRooms(res.data.rooms))
            } catch (error) {
                setError(error)
            }
        }
        fetchData()
    }, [url])

    return { error }
}