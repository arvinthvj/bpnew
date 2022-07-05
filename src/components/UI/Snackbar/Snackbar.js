import React from 'react'
import './Snackbar.css'

const snackbar = props => {
    return (
        <div id="snackbar">{props.message}</div>
    )
}

export default snackbar