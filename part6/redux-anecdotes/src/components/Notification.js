import React from 'react'
import { useSelector } from 'react-redux'
// import { useDispatch } from 'react-redux'

const Notification = () => {
    const notification = useSelector(state => state.notifications)
    // const dispatch = useDispatch()
    const displayValue = notification === null ? 'none' : ''
    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1,
        display: displayValue
    }
    return (
        <div style={style} >
            {notification}
        </div>
    )
}

export default Notification