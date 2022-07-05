import React from 'react'
import { Formik, Form, Field } from 'formik';
import { routes, formInputTextErrorStyle, formInputErrorStyle } from '../../../utility/constants/constants';
import { validateOTPVerificationForm, validatePhoneNumberForm } from '../../../utility/validator/formValidation/formValidation';
import LoadingBtn from '../../UI/LoadingButton/LoadingButton';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import PhoneNumberInput from '../../UI/PhoneNumberInput/PhoneNumberInput';
import AccountInformationForm from '../../AccountInformationPage/AccountInformationForm';
import storage from '../../../utility/storage';

const otpVerificationForm = props => {

    function formatPhoneNumber() {
        if (props.user.phone) {
            let parsedPhoneNumber = parsePhoneNumberFromString(props.user.phone)
            var match = parsedPhoneNumber ? parsedPhoneNumber.nationalNumber.match(/^(\d{3})(\d{3})(\d{4})$/) : props.user.phone.match(/^(\d{3})(\d{3})(\d{4})$/)
            if (match) {
                return '(' + match[1] + ') ' + match[2] + '-' + match[3]
            }
            else {
                return null
            }
        }
    }

    let formattedPhoneNumber = formatPhoneNumber()

    let form = (
        <Formik
            enableReinitialize={true}
            initialValues={{ otp_code: '' }}
            onSubmit={(values) => {
                props.verifyOTP({ code: values.otp_code })
                console.log(values, 'Values')
            }}
            validationSchema={validateOTPVerificationForm}>
            {(formik_props) => {
                const errors = formik_props.errors
                const touched = formik_props.touched
                return (
                    <Form className="login100-form ph_forms" id="login_form">
                        <article className="limiter_heading_wrp ml-auto mr-auto">
                            <h3>Verify Code</h3>
                        </article>
                        <div className="inner_form">
                            <div className="fields">
                                <div className="form_group_modify">
                                    <p className="ft_Weight_500">For added security, we need to verify your mobile number. <br />If you have not entered a valid mobile number <br /><a className="text-primary ph_underline" onClick={() => props.toggleReEditPhoneNumber(true)} href="javascript:void(0)">Click here</a> to Edit your Mobile Number.</p>
                                    <p className="ft_Weight_500">We've sent a verification code to {formattedPhoneNumber ? formattedPhoneNumber : props.user.phone}</p>
                                </div>
                                <div className="form_group_modify">
                                    {/* <!--<label for="EnterCode" className="label_modify">Enter your verification code</label>--> */}
                                    <Field id="otp_code" type="text" style={errors.otp_code && touched.otp_code ? formInputErrorStyle : null} className="input_modify input_modify_lg" name="otp_code" placeholder="Enter Code" />
                                    <span style={formInputTextErrorStyle}>{errors.otp_code && touched.otp_code && errors.otp_code}</span>
                                </div>
                            </div>
                            {
                                props.isLoading
                                    ? <div className="ph_flex_wrp_spw">
                                        <a className="form_link ft_Weight_500 ph_underline" href="javascript:void(0)">Resend Verification Code</a>
                                        <LoadingBtn btnClassName="theme_primary theme_btn text-uppercase" btnTitle="Loading" />
                                    </div>
                                    : <div className="ph_flex_wrp_spw">
                                        <a className="form_link ft_Weight_500 ph_underline" onClick={props.resendOTP} href="javascript:void(0)">Resend Verification Code</a>
                                        <button className="theme_primary theme_btn text-uppercase" type="submit">Verify </button>
                                    </div>
                            }
                            <div className="ph_flex_wrp_spw mt-2">
                                <a></a>
                                <a onClick={() => { window.$('#cancel_signup_form').modal(); }} href="javascript:void(0)" className="form_link ft_Weight_500 ph_underline">Cancel</a>
                            </div>
                        </div>
                    </Form>
                )
            }}
        </Formik>
    )
    if (!props.user.phone || props.reEditPhoneNumber) {
        form = (
            <AccountInformationForm
                isLoading={props.isLoading}
                reEditPhoneNumber={props.reEditPhoneNumber}
                toggleReEditPhoneNumber={props.toggleReEditPhoneNumber}
                updateAccountInfo={props.updateAccountInfo}
                history={props.history}
                user={props.user} />
        )
    }

    return (
        <section className="ph_main_sec pt_83">
            <div className="wrap-login100">
                {form}
            </div>
        </section>
    )
}

export default otpVerificationForm