import React from 'react'
import SpinnerLoader from '../UI/SpinnerLoader/SpinnerLoader'
import './PageLoader.css'

const PageLoader = props => {
    return (
        <section className="page-loader">
            <SpinnerLoader />
        </section>
    )
}

export default PageLoader