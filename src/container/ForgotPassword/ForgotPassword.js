import React, { Component } from 'react'
import ForgotPasswordForm from '../../components/ForgotPasswordForm/ForgotPasswordForm'
import { routes } from '../../utility/constants/constants'
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index'

class ForgotPassword extends Component {

    componentDidMount() {
        if (!this.props.history.location.state || !this.props.history.location.state.isForgotPasswordClicked) {
            if (!this.props.history.location.search || !this.props.history.location.search.includes('reset_password_token') ) {
                this.props.history.push(routes.LOGIN)
                return;
            }
        }
    }

    render() {
        return (
            <ForgotPasswordForm
                isLoading={this.props.isLoading}
                resetPassword={this.props.resetPassword}
                forgotPassword={this.props.forgotPassword}
                history={this.props.history} />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.authReducer.user,
        isLoading: state.authReducer.isloading,
        history: state.historyReducer.history
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        forgotPassword: (email) => dispatch(actions.forgotPassword(email)),
        resetPassword: (credentials) => dispatch(actions.resetPassword(credentials))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)