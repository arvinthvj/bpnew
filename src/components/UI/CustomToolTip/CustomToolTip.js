import React from 'react'
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';
const CustomToolTip = props => {
    return (
        <Tooltip overlayClassName={!props.overlayClassName ? "tooltip_class" : `${props.overlayClassName} tooltip_class`} trigger={props.trigger} placement={props.placement} overlay={props.text}>
            {props.children}
        </Tooltip>
    )
}

export default CustomToolTip