import React, { Component } from 'react'
import RegisterForm from '../../components/RegisterForm/RegisterForm'
import { socialMediaSignInTypes, FOOTER_AND_SOCIAL_LINKS } from '../../utility/constants/constants'
import { connect } from 'react-redux'
import * as actions from '../../redux/actions/index'
import storage from '../../utility/storage'

class Register extends Component {

    state = {
        isGoogleLogin: false,
        isFBLogin: false
    }

    componentDidMount = () => {
        let pricingPlanRoute = new URLSearchParams(this.props.history.location.search, { ignoreQueryPrefix: true }).get('plan')
        let via = new URLSearchParams(this.props.history.location.search, { ignoreQueryPrefix: true }).get('via')
        if (pricingPlanRoute) {
            storage.set('pricingPlanRoute', pricingPlanRoute)
            storage.set('redirectToPricing', true)
        }
        if(via){
            storage.set('via', via)
        }
    }

    toggleSocialMediaButtons = (values) => {
        if (values.google) {
            this.setState({ isGoogleLogin: true, isFBLogin: false })
        }
        else {
            this.setState({ isFBLogin: true, isGoogleLogin: false })
        }
    }

    fetchSocialMediaObjects = (key) => {
        let value = null
        if (this.props.links && this.props.links.length > 0) {
            this.props.links.map((link, index) => {
                if (link.title.toLowerCase() === key.id.toLowerCase()) {
                    value = link.content
                }
            })
        }
        return value
    }

    socialMediaResponse = (response) => {

        if (response && response.accessToken) {
            const user = {
                // provider: this.state.isGoogleLogin ? socialMediaSignInTypes.GOOGLE : socialMediaSignInTypes.FB,
                access_token: response.accessToken,
                // email: response.profileObj ? response.profileObj.email : response.email,
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
        let TermsOfUse = this.fetchSocialMediaObjects(FOOTER_AND_SOCIAL_LINKS.TERMS_OF_USE)
        let PrivacyPolicy = this.fetchSocialMediaObjects(FOOTER_AND_SOCIAL_LINKS.PRIVACY)
        if (!TermsOfUse && this.props.terms_of_use && this.props.terms_of_use.length > 0) {
            this.props.terms_of_use.map(terms => {
                TermsOfUse = terms.image_url
            })
        }
        if (!PrivacyPolicy && this.props.privacy_policy && this.props.privacy_policy.length > 0) {
            this.props.privacy_policy.map(policy => {
                PrivacyPolicy = <a href={policy.image_url} className="footer_link ph_underline">Privacy Policy</a>
            })
        }
        return (
            <RegisterForm
                signup={this.props.signup}
                isLoading={this.props.isLoading}
                socialMediaFBText="Sign UP With Facebook"
                socialMediaGoogleText="Sign UP With Google"
                toggleSocialMediaButtons={this.toggleSocialMediaButtons}
                socialMediaResponse={this.socialMediaResponse}
                TermsOfUse={TermsOfUse}
                termsAgreedFromModal={this.props.termsAgreedFromModal}
                toggleTermsAgreedFromModal={this.props.toggleTermsAgreedFromModal}
                PrivacyPolicy={PrivacyPolicy}
                history={this.props.history} />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.authReducer.user,
        token: state.authReducer.token,
        isLoading: state.authReducer.isloading,
        terms_of_use: state.configReducer.terms_of_use,
        privacy_policy: state.configReducer.privacy_policy,
        links: state.configReducer.links,
        termsAgreedFromModal: state.authReducer.termsAgreedFromModal
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signup: (credentials) => dispatch(actions.signup(credentials)),
        googleAuth: (credentials) => dispatch(actions.googleAuth(credentials)),
        fbAuth: (credentials) => dispatch(actions.fbAuth(credentials)),
        toggleTermsAgreedFromModal: (flag) => dispatch(actions.toggleTermsAgreedFromModal(flag))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)