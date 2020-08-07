const filterReducer = (state = '', action) => {
    switch (action.type) {
    case 'SETFILTERVALUE':
        return action.value
    default:
        return state
    }
}

export const setFilterValue = value => {
    return {
        type: 'SETFILTERVALUE',
        value
    }
}

export default filterReducer