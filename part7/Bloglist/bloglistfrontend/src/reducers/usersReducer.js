import userService from '../services/users'

const usersReducer = (state = [], action) => {
    switch (action.type) {
    case 'GET_USERS':
        return action.data
    default:
        return state
    }
}

export const initUsers = () => {
    return async dispatch => {
        const allUsers = await userService.getAll()
        dispatch({
            type: 'GET_USERS',
            data: allUsers
        })
    }
}

export default usersReducer