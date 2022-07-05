import React, { Component } from 'react'
import OTPVerificationForm from '../../../components/RegisterForm/OTPVerificationForm/OTPVerificationForm'
import * as actions from '../../../redux/actions/index'
import { connect } from 'react-redux';
import storage from '../../../utility/storage';

class OTPVerification extends Component {

    state = {
        reEditPhoneNumber: false
    }

    componentDidMount = () => {
        if (this.props.send_otp) {
            this.props.resendOTP()
            this.props.sendOTP(false)
        }
        let reEditPhoneNumber = storage.get('reEditPhoneNumber', null)
        if (reEditPhoneNumber) {
            this.setState({ reEditPhoneNumber: reEditPhoneNumber })
        }
    }

    componentDidUpdate = () => {
        let reEditPhoneNumber = storage.get('reEditPhoneNumber', null)
        if (this.state.reEditPhoneNumber && !reEditPhoneNumber) {
            this.setState({ reEditPhoneNumber: reEditPhoneNumber })
        }
    }

    toggleReEditPhoneNumber = (flag) => {
        storage.set('reEditPhoneNumber', flag)
        this.setState({ reEditPhoneNumber: flag })
    }

    render() {
        return (
            <OTPVerificationForm
                user={this.props.user}
                isLoading={this.props.isLoading}
                resendOTP={this.props.resendOTP}
                apiError={this.props.error}
                updateAccountInfo={this.props.updateAccountInfo}
                verifyOTP={this.props.verifyOTP}
                toggleReEditPhoneNumber={this.toggleReEditPhoneNumber}
                reEditPhoneNumber={this.state.reEditPhoneNumber}
                history={this.props.history} />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.authReducer.user,
        token: state.authReducer.token,
        isLoading: state.authReducer.isloading,
        error: state.authReducer.error,
        send_otp: state.authReducer.send_otp
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        resendOTP: () => dispatch(actions.resendOTP()),
        verifyOTP: (code) => dispatch(actions.verifyOTP(code)),
        sendOTP: (sendOTP) => dispatch(actions.sendOTP(sendOTP)),
        updateAccountInfo: (user) => dispatch(actions.updateAccountInfo(user)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OTPVerification)