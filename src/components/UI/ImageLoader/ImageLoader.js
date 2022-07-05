import React from 'react'
import Img from "react-cool-img";

const imageLoader = props => {
    return (
        <Img
            placeholder='/images/gif/loading.gif'
            src={props.src}
            alt="PartnerHere"
            error='/custom_images/image_not_found.png'
            className={props.className}
        />
    )
}

export default imageLoader