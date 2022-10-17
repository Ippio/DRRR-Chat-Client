export const openModal = (modalState)=>{
    return {
        type : 'OPEN_MODAL',
        modalState : modalState,
    }
}

export const closeModal = (modalState)=>{
    return {
        type : 'CLOSE_MODAL',
        modalState : modalState
    }
}

export const setRooms = (rooms)=>{
    return {
        type : 'SET_ROOMS',
        rooms : rooms
    }
}

export const setLoading = (state)=>{
    return {
        type : 'SET_LOADING',
        state : state
    }
}
