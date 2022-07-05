import React, { Component } from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'
import { socialMediaSignInTypes } from '../../utility/constants/constants'
import * as actions from '../../redux/actions/index'
import { connect } from 'react-redux'
import storage from '../../utility/storage'

class Login extends Component {

    state = {
        isGoogleLogin: false,
        isFBLogin: false
    }

    componentDidMount = () => {
        storage.remove('redirectToPricing');
    }

    toggleSocialMediaButtons = (values) => {
        if (values.google) {
            this.setState({ isGoogleLogin: true, isFBLogin: false })
        }
        else {
            this.setState({ isFBLogin: true, isGoogleLogin: false })
        }
    }

    socialMediaResponse = (response) => {

        if (response && response.accessToken) {
            const user = {
                provider: this.state.isGoogleLogin ? socialMediaSignInTypes.GOOGLE : socialMediaSignInTypes.FB,
                access_token: response.accessToken,
                email: response.profileObj ? response.profileObj.email : response.email,
            }
            console.log(user)
            console.log(response)
            if (this.state.isGoogleLogin) {
                this.props.googleAuth(user)
            } else {
                this.props.fbAuth(user)
            }
        }
    }

    render() {
        return (
            <LoginForm
                login={this.props.login}
                isLoading={this.props.isLoading}
                socialMediaFBText="Login With Facebook"
                socialMediaGoogleText="Login With Google"
                toggleSocialMediaButtons={this.toggleSocialMediaButtons}
                socialMediaResponse={this.socialMediaResponse}
                history={this.props.history} />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.authReducer.user,
        token: state.authReducer.token,
        isLoading: state.authReducer.isloading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (credentials) => dispatch(actions.login(credentials)),
        googleAuth: (credentials) => dispatch(actions.googleAuth(credentials)),
        fbAuth: (credentials) => dispatch(actions.fbAuth(credentials))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)