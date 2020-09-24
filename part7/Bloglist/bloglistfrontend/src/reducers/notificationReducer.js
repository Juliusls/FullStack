const notificationReducer = (state='', action) => {
    switch (action.type) {
    case 'NOTIFICATION':
        return action.data
    default:
        return state
    }
}

export const setNotification = (message, messageType) => {
    return async dispatch => {
        dispatch({
            type: 'NOTIFICATION',
            data: {
                message,
                messageType
            }
        })
        setTimeout(() => {
            dispatch({
                type: 'NOTIFICATION',
                data: ''
            })
        }, 5000)
    }
}

export default notificationReducer