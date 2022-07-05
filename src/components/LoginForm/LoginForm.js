import React from 'react'
import { Formik, Form, Field } from 'formik';
import { routes, formInputTextErrorStyle, formInputErrorStyle } from '../../utility/constants/constants';
import { validateLoginForm } from '../../utility/validator/formValidation/formValidation';
import { Google, FaceBook } from '../SocialMediaLogin/SocialMediaLogin';
import LoadingBtn from '../UI/LoadingButton/LoadingButton';

const loginForm = props => {

    const initialFormValues = {
        email: '',
        password: ''
    }
    return (
        <section className="ph_main_sec pt_83">
            <div className="wrap-login100">
                <Formik
                    enableReinitialize={true}
                    initialValues={initialFormValues}
                    onSubmit={(values) => {
                        props.login({ user: { ...values } })
                        console.log(values, 'Values')
                    }}
                    validationSchema={validateLoginForm}>
                    {(formik_props) => {
                        const errors = formik_props.errors
                        const touched = formik_props.touched
                        return (
                            <Form className="login100-form ph_forms" id="login_form">
                                <article className="limiter_heading_wrp ml-auto mr-auto wow fadeInUp">
                                    <h3 className="text-uppercase">Log in</h3>
                                </article>
                                <div className="inner_form">
                                    <div className="fields">
                                        <div className="form_group_modify">
                                            <Field id="email" type="email" style={errors.email && touched.email ? formInputErrorStyle : null} className="input_modify input_modify_lg" name="email" placeholder="Email" />
                                            <span style={formInputTextErrorStyle}>{errors.email && touched.email && errors.email}</span>
                                        </div>
                                        <div className="form_group_modify">
                                            <Field id="password" style={errors.password && touched.password ? formInputErrorStyle : null} type="password" className="input_modify input_modify_lg" name="password" placeholder="Password" />
                                            <span style={formInputTextErrorStyle}>{errors.password && touched.password && errors.password}</span>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        {props.isLoading ? <LoadingBtn btnClassName="theme_primary btn-block theme_btn text-uppercase" btnTitle="Loading" /> : <button className="theme_primary btn-block theme_btn text-uppercase" id="btn_loader" type="submit"> Log In </button>}
                                    </div>
                                    <div className="form-group text-center">
                                        <span className="text_or">or</span>
                                    </div>
                                    <div className="social_btn_blocks ">
                                        {/* <a href="javascript:void(0)" className="icn_fa icn_fa_fb">
                                            <img src="images/icons/icn_fb.png" alt="FACEBOOK" />
                                            Login with Facebook
                                        </a>
                                        <a href="javascript:void(0)" className="icn_fa icn_fa_gogle">
                                            <img src="images/icons/icn_google.png" alt="GOOGLE" />
                                            Login with Google
                                        </a> */}
                                        <FaceBook {...props} {...formik_props} />
                                        <Google {...props} {...formik_props} />
                                    </div>
                                    <div className="fot_link">
                                        <ul>
                                            <li>
                                                <a onClick={() => props.history.push(routes.FORGOT_PASSWORD, { isForgotPasswordClicked: true })} id="resetPassword" href="javascript:void(0)">
                                                    <span>Forgot Password</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="javascript:void(0)"><i className="fa fa-circle"></i> </a>
                                            </li>
                                            <li>
                                                <a id="signup" className="primary-action" onClick={() => props.history.push(routes.REGISTER)} href="javascript:void(0)">
                                                    <span>Sign up for an Account</span>
                                                </a>
                                            </li>
                                        </ul>
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

export default loginForm