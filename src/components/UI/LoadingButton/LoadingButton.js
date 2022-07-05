import React from 'react'
import './LoadingButton.css'

const loadingBtn = props => {
    return (
        <button disabled={true} className={`loadingBtn ${props.btnClassName}`}>
            <i className="fa fa-spinner fa-spin"></i> {props.btnTitle}
        </button>
    )
}

export default loadingBtn