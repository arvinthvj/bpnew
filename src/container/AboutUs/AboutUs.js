import React, { Component } from 'react'
import AboutUsPage from '../../components/AboutUsPage/AboutUsPage'
import { connect } from 'react-redux'

class AboutUs extends Component {

    render() {
        return (
            <AboutUsPage about_us={this.props.about_us} />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        about_us: state.configReducer.about_us
    }
}

const mapDispatchToProps = (dispatch) => {
}

export default connect(mapStateToProps, mapDispatchToProps)(AboutUs)