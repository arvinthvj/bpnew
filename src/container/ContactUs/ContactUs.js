import React, { Component } from 'react'
import ContactUsPage from '../../components/ContactUsPage/ContactUsPage'
import { connect } from 'react-redux'

class ContactUs extends Component {

    render() {
        return (
            <ContactUsPage contact_us={this.props.contact_us} />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        contact_us: state.configReducer.contact_us
    }
}

const mapDispatchToProps = (dispatch) => {
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactUs)