export const login = (user) => {
    return {
        type: "LOGIN",
        user: user 
    }
}

export const logout = (user) => {
    return {
        type: "LOGOUT",
        user: null
    }
}

export const joinRoom = (user) => {
    return {
        type: "JOIN_ROOM",
        user: user
    }
}

export const setUser = (user) => {
    return {
        type: "SET_USER",
        user: user 
    }
}
