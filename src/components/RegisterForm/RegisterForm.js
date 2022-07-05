import React from 'react'
import { Formik, Form, Field } from 'formik';
import { routes, formInputTextErrorStyle, formInputErrorStyle } from '../../utility/constants/constants';
import { validateRegistrationForm, validatePhoneNumber } from '../../utility/validator/formValidation/formValidation';
import { FaceBook, Google } from '../SocialMediaLogin/SocialMediaLogin';
import PhoneNumberInput from '../UI/PhoneNumberInput/PhoneNumberInput';
import './RegisterForm.css'
import LoadingBtn from '../UI/LoadingButton/LoadingButton';
import $ from 'jquery'

const registerForm = props => {
    let initialFormValues = {
        first_name: '',
        last_name: '',
        // phone: '',
        email: '',
        password: '',
        register_checkbox: false
    }
    if (props.history.location.state && props.history.location.state.signUpFormValues) {
        initialFormValues = {
            first_name: props.history.location.state.signUpFormValues.first_name,
            last_name: props.history.location.state.signUpFormValues.last_name,
            // phone: '',
            email: props.history.location.state.signUpFormValues.email,
            password: '',
            register_checkbox: false
        }
    }
    return (
        <section className="ph_main_sec pt_83">
            <div className="wrap-login100">
                <Formik
                    enableReinitialize={true}
                    initialValues={initialFormValues}
                    onSubmit={(values) => {
                        values = {
                            ...values,
                            register_checkbox: undefined
                        }
                        props.signup({ user: { ...values } })
                        console.log(values, 'Values')
                    }}
                    validationSchema={validateRegistrationForm}>
                    {(formik_props) => {
                        const errors = formik_props.errors
                        const touched = formik_props.touched
                        if (!formik_props.values.register_checkbox && props.termsAgreedFromModal) {
                            formik_props.setFieldValue('register_checkbox', true)
                            props.toggleTermsAgreedFromModal(false)
                        }
                        // console.log(errors, 'errors')
                        console.log(formik_props, "formik props")
                        return (
                            <Form className="login100-form ph_forms" id="login_form">
                                <article className="limiter_heading_wrp ml-auto mr-auto wow fadeInUp">
                                    <h3 className="text-uppercase">Sign Up</h3>
                                </article>
                                <div className="inner_form">
                                    <div className="fields">
                                        <div className="form-row">
                                            <div className="form_group_modify">
                                                <p className="footer_sign_link terms_cond_link">
                                                    Currently available for USA Only: A valid <span style={{ fontWeight: '600' }}>Mobile Number</span> (for SMS verification) and a valid <span style={{ fontWeight: '600' }}>US Postal Code</span> (for location) are required to register at this time.
                                                </p>
                                            </div>
                                            <div className="form_group_modify col-md-6">
                                                <label htmlFor="first_name" className="label_modify">First Name <span className="text-danger">*</span></label>
                                                <Field type="text" style={errors.first_name && touched.first_name ? formInputErrorStyle : null} className="input_modify input_modify_lg" name="first_name" id="first_name" />
                                                <span style={formInputTextErrorStyle}>{errors.first_name && touched.first_name && errors.first_name}</span>
                                            </div>
                                            <div className="form_group_modify col-md-6">
                                                <label htmlFor="last_name" className="label_modify">Last Name <span className="text-danger">*</span></label>
                                                <Field type="text" style={errors.last_name && touched.last_name ? formInputErrorStyle : null} className="input_modify input_modify_lg" id="last_name" name="last_name" />
                                                <span style={formInputTextErrorStyle}>{errors.last_name && touched.last_name && errors.last_name}</span>
                                            </div>
                                        </div>
                                        {/* <div className="form_group_modify">
                                            <label htmlFor="phone" className="label_modify">Mobile Number
                                            <span className="text-danger">*</span>
                                                <br /><span style={{ fontSize: '12px' }}>(Enter a valid mobile number. We will text you to verify your ID.)</span></label>
                                            <Field name="phone">
                                                {({
                                                    field, // { name, value, onChange, onBlur }
                                                    form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                                    meta,
                                                }) => {
                                                    console.log(formik_props.errors, "formik")
                                                    console.log(form.errors, "form")
                                                    return (
                                                        <div>
                                                            <PhoneNumberInput
                                                                parentDivClassName="register_form_phone_input"
                                                                value={formik_props.values.phone}
                                                                inputClassName="register_form_phone_input_field"
                                                                {...form}
                                                                {...field} />
                                                            <span style={formInputTextErrorStyle}>{errors.phone && touched.phone && errors.phone}</span>
                                                        </div>
                                                    )
                                                }}
                                            </Field>
                                        </div> */}
                                        <div className="form_group_modify">
                                            <label htmlFor="email" className="label_modify">Email
                                            <span className="text-danger">*</span></label>
                                            <Field id="email" type="email" style={errors.email && touched.email ? formInputErrorStyle : null} className="input_modify input_modify_lg" name="email" />
                                            <span style={formInputTextErrorStyle}>{errors.email && touched.email && errors.email}</span>
                                        </div>
                                        <div className="form_group_modify">
                                            <label htmlFor="password" className="label_modify">Password
                                            <span className="text-danger">*</span></label>
                                            <Field id="password" style={errors.password && touched.password ? formInputErrorStyle : null} type="password" className="input_modify input_modify_lg" name="password" />
                                            <span style={formInputTextErrorStyle}>{errors.password && touched.password && errors.password}</span>
                                        </div>
                                        <div className="form_group_modify ">
                                            <label className="terms_condi_check">
                                                <p className="footer_sign_link terms_cond_link">
                                                    {/* Agree to PartnerHere's <a className="form_link ft_Weight_600" href={props.TermsOfUse} target="_blank">Terms and Conditions</a> */}
                                                    By creating an account, I acknowledge the <a className="form_link ft_Weight_600 ph_underline" target="_blank" href={props.PrivacyPolicy}>PARTNERHERE PRIVACY POLICY</a>
                                                    , and I agree to the <a className="form_link ft_Weight_600 ph_underline" href="javascript:void(0)" onClick={() => window.$('#terms_of_use_modal').modal()}>PARTNERHERE TERMS OF SERVICE </a>
                                                    , including the arbitration provision, and I waive the right to a trial by jury or to participate in any class action or representative proceeding
                                                </p>
                                                <Field onChange={() => window.$('#terms_of_use_modal').modal()} name="register_checkbox" type="checkbox" className="check_box" />
                                                <span style={errors.register_checkbox && touched.register_checkbox ? formInputErrorStyle : null} className="check_mark"></span>
                                                <span style={formInputTextErrorStyle}>{errors.register_checkbox && touched.register_checkbox && errors.register_checkbox}</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form_group_modify col-md-6">
                                            <a href="javascript:void(0)" onClick={() => window.$('#cancel_registration_form').modal()} className="form_link ft_Weight_500 ph_underline" >Cancel</a>
                                        </div>
                                        <div className="form_group_modify col-md-6">
                                            {
                                                props.isLoading
                                                    ? <LoadingBtn btnTitle="Please wait..." btnClassName="theme_primary btn-block theme_btn text-uppercase" />
                                                    : <button className="theme_primary btn-block theme_btn text-uppercase" type="submit">Next</button>
                                            }
                                        </div>
                                    </div>
                                    <div className="social_btn_blocks ">
                                        {/* <a href="javascript:void(0)" className="icn_fa icn_fa_fb">
                                            <img src="images/icons/icn_fb.png" alt="FACEBOOK" />
                                            Sign Up with Facebook
                                        </a>
                                        <a href="javascript:void(0)" className="icn_fa icn_fa_gogle">
                                            <img src="images/icons/icn_google.png" alt="GOOGLE" />
                                            Sign Up with Google
                                        </a> */}
                                        <FaceBook {...props} {...formik_props} />
                                        <Google {...props} {...formik_props} />
                                    </div>
                                    <div className="form-group mb-0">
                                        <p className="footer_sign_link text-center">
                                            Already have an Account? <a className="form_link ft_Weight_600" onClick={() => props.history.push(routes.LOGIN)} href="javascript:void(0)">Sign In</a>
                                        </p>
                                    </div>
                                </div>
                            </Form>
                        )
                    }}
                </Formik>
            </div>
        </section>
    )
}

export default registerForm