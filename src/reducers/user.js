// const  initialState = {
//     username: String,
//     theme: Object,
//     dmChannel: String,
//     room: String,
//     privateChannel: String,
//     boardcastChannel: String,
// }

const userReducer = (state = null, action) => {
    switch (action.type) {
        case "LOGIN":
            {
                const user = action.user
                return user
            }
        case "LOGOUT":
            {
                const user = action.user
                return user;
            }
        case "SET_USER":
            {
                const user = action.user
                return user
            }
        case "JOIN_ROOM":
            return state;
        default:
            return state;
    }
}

export default userReducer