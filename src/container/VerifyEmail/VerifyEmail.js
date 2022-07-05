import React, { Component } from 'react'
import VerifyEmailPage from '../../components/VerifyEmail/VerifyEmail'
import { connect } from 'react-redux';
import { EmailVerificationStatus, routes } from '../../utility/constants/constants';
import * as actions from '../../redux/actions/index'
import { Route } from 'react-router-dom';
import SendVerificationEmail from '../../components/VerifyEmail/SendVerificationEmail';

class VerifyEmail extends Component {

    state = {
        isLoading: false,
        verificationError: false
    }

    componentDidMount = () => {
        if (this.props.user && this.props.user.email_verification_status !== EmailVerificationStatus.VERIFICATION_REQUIRED) {
            this.props.history.push(routes.HOME)
        }
        if (routes.VERIFY_EMAIL.includes(this.props.history.location.pathname)) {
            let token = new URLSearchParams(this.props.history.location.search, { ignoreQueryPrefix: true }).get('token')
            if (!token) {
                this.props.history.push(routes.HOME)
            } else {
                this.setState({ isLoading: true })
                this.props.verifyEduEmail(token)
                    .then(response => {
                        this.setState({ isLoading: false })
                        if (response.value.success === true || response.value.success === "true") {
                            this.setState({ verificationError: false })
                        } else {
                            this.setState({ verificationError: true })
                        }
                    }).catch(error => {
                        this.setState({ isLoading: false })
                        this.setState({ verificationError: true })
                    })
            }
        }
    }

    render() {
        return (
            <section className="ph_main_sec pt_83">
                <div className="ph_empty_message empty_secondary_profiles" role="alert">
                    <Route exact path={routes.EMAIL_VERIFICATION}>
                        <SendVerificationEmail sendVerifyEduEmail={this.props.sendVerifyEduEmail} isLoading={this.props.isLoading} verifyEduEmail={this.props.verifyEduEmail} user={this.props.user} history={this.props.history} />
                    </Route>
                    <Route exact path={routes.VERIFY_EMAIL}>
                        <VerifyEmailPage isAuthLoading={this.props.isLoading} verificationError={this.state.verificationError} sendVerifyEduEmail={this.props.sendVerifyEduEmail} isLoading={this.state.isLoading} verifyEduEmail={this.props.verifyEduEmail} user={this.props.user} history={this.props.history} />
                    </Route>
                </div>
            </section>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.authReducer.user,
    isLoading: state.authReducer.isloading,
});

const mapStateToDispatch = (dispatch) => ({
    verifyEduEmail: (token) => dispatch(actions.verifyEduEmail(token)),
    sendVerifyEduEmail: () => dispatch(actions.sendVerifyEduEmail())
});

export default connect(mapStateToProps, mapStateToDispatch)(VerifyEmail)