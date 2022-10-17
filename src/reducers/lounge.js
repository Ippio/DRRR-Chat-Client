const intialState = {
    modalState: false,
    showAdultRoom: false,
    rooms: [],
    count: 0,
    loading: false
}

const loungeReducer = (state = intialState, action) => {
    switch (action.type) {
        case 'OPEN_MODAL':
            {
                const modalState = action.modalState
                return { ...state, modalState }
            }
        case 'CLOSE_MODAL':
            {
                const modalState = action.modalState
                return { ...state, modalState }
            }
        case 'SET_ROOMS':
            {
                const rooms = action.rooms
                return { ...state, rooms: [...rooms] }
            }
        case 'SET_LOADING':
            {
                const state = action.state
                return { ...state, loading: state }
            }
        default:
            return state
    }
}

export default loungeReducer