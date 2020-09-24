import React from 'react'
import PropTypes from 'prop-types'
import Alert from 'react-bootstrap/Alert'


const Notification = ({ message, messageType }) => {
    if (message === null) {
        return null
    }

    return (
        <Alert variant={messageType}>
            {message}
        </Alert>
    )
}

Notification.propTypes = {
    message: PropTypes.string,
    messageType: PropTypes.string
}

export default Notification