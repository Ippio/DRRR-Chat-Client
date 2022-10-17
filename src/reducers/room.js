const roomReducer = (state = null, action) => {
    switch (action.type) {
        case 'SET_ROOM':
            {
                const room = action.room
                return room
            }
        case 'SET_MEMBERS':
            {
                const members = action.members
                return { ...state, members: [...members] }
            }
        case 'REMOVE_MEMBER':
            {
                const members = action.members
                return { ...state, members: [...members] }
            }
        default:
            return state;
    }
}

export default roomReducer