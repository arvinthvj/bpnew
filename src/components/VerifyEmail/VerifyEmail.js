import React from 'react'
import { EmailVerificationStatus, routes } from '../../utility/constants/constants'
import Oux from '../../hoc/Oux/Oux'
import LoadingBtn from '../UI/LoadingButton/LoadingButton'
import SpinnerLoader from '../UI/SpinnerLoader/SpinnerLoader'

const verifyEmail = props => {
    return (
        <Oux>
            {
                props.isLoading
                    ? <SpinnerLoader />
                    : props.verificationError
                        ? <div class="wrap-login100">
                            <form class="login100-form ph_forms" id="login_form">
                                <article class="limiter_heading_wrp ml-auto mr-auto">
                                    <h3>Oops</h3>
                                </article>
                                <div class="inner_form">
                                    <div class="fields text-center">
                                        <img src="/custom_images/mail.svg" className="mb-2" width="30%" />
                                        <p class="mb-1">Sorry, we could not verify your email at this time.</p>
                                        <div class="ph_flex_wrp_spw">
                                            {
                                                props.isAuthLoading
                                                    ? <LoadingBtn btnClassName="theme_primary theme_btn text-uppercase btn-block upgrade_subscription_btn" btnTitle="Loading" />
                                                    : props.user
                                                        ? <button
                                                            onClick={() => {
                                                                props.sendVerifyEduEmail()
                                                                    .then(response => {
                                                                        if (response.value.success === true || response.value.success === "true") {
                                                                            window.$('#email_sent_modal').modal()
                                                                        }
                                                                    }).catch(error => {
                                                                        console.log(error)
                                                                    })
                                                            }} class="theme_primary theme_btn text-uppercase btn-block upgrade_subscription_btn" type="button">Resend Verification Mail</button>
                                                        : null
                                            }
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        : <div class="wrap-login100">
                            <form class="login100-form ph_forms" id="login_form">
                                <article class="limiter_heading_wrp ml-auto mr-auto">
                                    <h3>Thank You</h3>
                                </article>
                                <div class="inner_form">
                                    <div class="fields text-center">
                                        <img src="/custom_images/mail.svg" className="mb-2" width="30%" />
                                        <p class="mb-1">Your email has been verified</p>
                                        <div class="ph_flex_wrp_spw">
                                            {
                                                props.isAuthLoading
                                                    ? <LoadingBtn btnClassName="theme_primary theme_btn text-uppercase btn-block upgrade_subscription_btn" btnTitle="Loading" />
                                                    : props.user
                                                        ? <button onClick={() => props.history.push(routes.HOME)} class="theme_primary theme_btn text-uppercase btn-block upgrade_subscription_btn" type="button">Continue To Site</button>
                                                        : <button onClick={() => props.history.push(routes.LOGIN)} class="theme_primary theme_btn text-uppercase btn-block upgrade_subscription_btn" type="button">Login</button>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
            }
        </Oux>
    )
}

export default verifyEmail