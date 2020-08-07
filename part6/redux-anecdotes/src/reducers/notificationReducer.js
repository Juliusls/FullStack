const notificationReducer = (state = '', action) => {
    switch (action.type) {
    case 'NOTIFICATION':
        return action.message
    default:
        return state
    }
}

export const setNotification = (message, timeOut, timeOutID) => {
    clearTimeout(timeOutID)
    return async dispatch => {
        dispatch({
            type: 'NOTIFICATION',
            message
        })
        const timeOutID = setTimeout(() => {
            dispatch({
                type: 'NOTIFICATION',
                message: null
            })
        }, timeOut * 1000)
        return timeOutID
    }
}

export default notificationReducer