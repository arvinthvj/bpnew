import React from 'react'
import { EmailVerificationStatus, routes } from '../../utility/constants/constants'
import Oux from '../../hoc/Oux/Oux'
import LoadingBtn from '../UI/LoadingButton/LoadingButton'
import successAlert from '../../utility/successAlert/successAlert'

const sendVerificationEmail = props => {
    return (
        <Oux>
            <div class="wrap-login100">
                <form class="login100-form ph_forms" id="login_form">
                    <article class="limiter_heading_wrp ml-auto mr-auto">
                        <h3>Verify Your Email</h3>
                    </article>
                    {
                        props.user.email_verification_status === EmailVerificationStatus.VERIFICATION_REQUIRED
                            ? <div class="inner_form">
                                <div class="fields text-center">
                                    {/* <img src="/custom_images/mail.svg" className="mb-2" width="30%" /> */}
                                    <p class="mb-1" style={{ fontWeight: '600' }}>Verifying your .edu email address will qualify you for a FREE, INSTANT SILVER MEMBERSHIP. If you do not have access to this edu email account you do not qualify.</p>
                                    <p class="mb-1">If you click the Yes button below, please check your .edu inbox for an email with a_ link. Click on  the link to verify the email  address._  If you do not see the email within a few minutes, please check your spam folder. If you do not receive an email please contact support for assistance. </p>
                                    <div className="d-flex justify-content-center">
                                        <a
                                            onClick={() => props.history.push(routes.HOME)}
                                            href="javascript:void(0)"
                                            className="ph_underline text-primary">[No Thanks]</a>
                                        <a
                                            onClick={() => window.$('#email_sent_modal').modal()}
                                            href="javascript:void(0)"
                                            className="ph_underline text-primary ml-2">[Yes, Verify Now]</a>
                                    </div>
                                </div>
                            </div>
                            : null
                    }
                </form>
            </div>
        </Oux>
    )
}

export default sendVerificationEmail