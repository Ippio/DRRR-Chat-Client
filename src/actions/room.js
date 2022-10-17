export const setRoom = (room) => {
    return {
        type: 'SET_ROOM',
        room: room
    }
}

export const setMembers = (members,user) => {
    const isExist = members.find(item=>item.username === user.username)
    const listMembers = isExist ? [...members] : [...members,user]
    return {
        type: 'SET_MEMBERS',
        members: listMembers,
        update : isExist ? false : true
    }
}

export const removeMember = (oldListMembers, removedMember) => {
    const members = oldListMembers.filter(member => member.username !== removedMember.username)
    return {
        type: 'REMOVE_MEMBER',
        members: members
    }
}