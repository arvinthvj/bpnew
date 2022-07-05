import React from 'react'
import { Formik, Form, Field } from 'formik';
import { routes, formInputErrorStyle, formInputTextErrorStyle } from '../../utility/constants/constants';
import { validateForgotPasswordForm, validateResetPasswordForm } from '../../utility/validator/formValidation/formValidation';
import LoadingBtn from '../UI/LoadingButton/LoadingButton';

const forgotPasswordForm = props => {
    const initialFormValues = {
        password: '',
        password_confirmation: ''
    }
    
    let step = (
        <Formik
            enableReinitialize={true}
            validationSchema={validateForgotPasswordForm}
            initialValues={{ email: '' }}
            onSubmit={(values) => {
                props.forgotPassword({ user: { ...values } })
                console.log(values, 'Values')
            }}>
            {(formik_props) => {
                const errors = formik_props.errors
                const touched = formik_props.touched
                return (
                    <Form className="login100-form ph_forms" id="login_form">
                        <article className="limiter_heading_wrp ml-auto mr-auto">
                            <h3>Forgot Password</h3>
                        </article>
                        <div className="inner_form">
                            <div className="fields">
                                <div className="form_group_modify">
                                    <p className="ft_Weight_500">All we need is your email address! You will receive an email including a link that will allow you to reset your password.</p>
                                </div>
                                <div className="form_group_modify">
                                    <Field id="email" type="email" style={errors.email && touched.email ? formInputErrorStyle : null} className="input_modify input_modify_lg" name="email" placeholder="Email Address" />
                                    <span style={formInputTextErrorStyle}>{errors.email && touched.email && errors.email}</span>
                                </div>
                            </div>
                            {
                                props.isLoading
                                    ? <div className="ph_flex_wrp_spw">
                                        <a className="form_link ft_Weight_500 ph_underline" href="javascript:void(0)">Back</a>
                                        <LoadingBtn btnClassName="theme_primary theme_btn text-uppercase" btnTitle="Loading" />
                                    </div>
                                    : <div className="ph_flex_wrp_spw">
                                        <a className="form_link ft_Weight_500 ph_underline" onClick={() => props.history.goBack()} href="javascript:void(0)">Back</a>
                                        <button className="theme_primary theme_btn text-uppercase" type="submit">Submit </button>
                                    </div>
                            }
                        </div>
                    </Form>
                )
            }}
        </Formik>
    )
    if (props.history.location.search) {
        step = (
            <Formik
                enableReinitialize={true}
                validationSchema={validateResetPasswordForm}
                initialValues={initialFormValues}
                onSubmit={(values) => {
                    let reset_password_token = props.history.location.search.split('=')[1]
                    values = {
                        ...values,
                        reset_password_token: reset_password_token
                    }
                    props.resetPassword({...values})
                    console.log(values, 'Values')
                }}>
                {(formik_props) => {
                    const errors = formik_props.errors
                    const touched = formik_props.touched
                    return (
                        <Form className="login100-form ph_forms" id="login_form">
                            <article className="limiter_heading_wrp ml-auto mr-auto">
                                <h3>Reset Password</h3>
                            </article>
                            <div className="inner_form">
                                <div className="fields">
                                    {/* <div className="form_group_modify">
                                        <p className="ft_Weight_500">All we need is your email address! You will receive an email including a link that will allow you to reset your password.</p>
                                    </div> */}
                                    <div className="form_group_modify">
                                        <Field id="password" type="password" style={errors.password && touched.password ? formInputErrorStyle : null} className="input_modify input_modify_lg" name="password" placeholder="Password" />
                                        <span style={formInputTextErrorStyle}>{errors.password && touched.password && errors.password}</span>
                                    </div>
                                    <div className="form_group_modify">
                                        <Field id="password_confirmation" type="password" style={errors.password_confirmation && touched.password_confirmation ? formInputErrorStyle : null} className="input_modify input_modify_lg" name="password_confirmation" placeholder="Confirm Password" />
                                        <span style={formInputTextErrorStyle}>{errors.password_confirmation && touched.password_confirmation && errors.password_confirmation}</span>
                                    </div>
                                </div>
                                {
                                    props.isLoading
                                        ? <div className="ph_flex_wrp_spw">
                                            <LoadingBtn btnClassName="theme_primary btn-block theme_btn text-uppercase" btnTitle="Loading" />
                                        </div>
                                        : <div className="ph_flex_wrp_spw">
                                            {/* <a className="form_link ft_Weight_500 ph_underline" onClick={() => props.history.goBack()} href="javascript:void(0)">Back</a> */}
                                            <button className="theme_primary btn-block theme_btn text-uppercase" type="submit">Submit </button>
                                        </div>
                                }
                            </div>
                        </Form>
                    )
                }}
            </Formik>
        )
    }
    return (
        <section className="ph_main_sec pt_83">
            <div className="wrap-login100">
                {step}
            </div>
        </section>
    )
}

export default forgotPasswordForm