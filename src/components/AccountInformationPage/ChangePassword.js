import React from 'react'
import { Form, Field, Formik } from 'formik'
import PhoneNumberInput from '../UI/PhoneNumberInput/PhoneNumberInput'
import { validateChangePassword } from '../../utility/validator/formValidation/formValidation'
import { formInputTextErrorStyle, formInputErrorStyle } from '../../utility/constants/constants'
import LoadingBtn from '../UI/LoadingButton/LoadingButton'

const changePassword = props => {
    let initialFormValues = {
        current_password: '',
        password: '',
        password_confirmation: ''
    }

    return (
        <div className="wrap-login100">
            <Formik
                enableReinitialize={true}
                initialValues={initialFormValues}
                onSubmit={(values, { resetForm, setFieldError }) => {
                    if (values.current_password === values.password) {
                        setFieldError('password', 'New Password Cannot Be Same As Old Password')
                    }
                    else {
                        props.changePassword({ ...values })
                        resetForm({ ...initialFormValues })
                    }
                    console.log(values, 'Values')
                }}
                validationSchema={validateChangePassword}>
                {(formik_props) => {
                    const errors = formik_props.errors
                    const touched = formik_props.touched
                    return (
                        <Form className="login100-form ph_forms" id="login_form">
                            <article className="limiter_heading_wrp ml-auto mr-auto wow fadeInUp">
                                <h3>Change Password</h3>
                            </article>
                            <div className="inner_form">
                                <div className="fields">
                                    <div className="form_group_modify">
                                        <label for="current_password" className="label_modify">Current Password</label>
                                        <Field type="password" style={errors.current_password && touched.current_password ? formInputErrorStyle : null} name="current_password" className="input_modify input_modify_lg" id="first_name" />
                                        <span style={formInputTextErrorStyle}>
                                            {errors.current_password && touched.current_password && errors.current_password}
                                        </span>
                                    </div>
                                    {/* <div className="form-row">
                                        <div className="form_group_modify col-md-6">
                                            <label for="password" className="label_modify">New Password</label>
                                            <Field type="password" name="password" className="input_modify input_modify_lg" id="last_name" />
                                        </div>
                                        <div className="form_group_modify col-md-6">
                                            <label for="password_confirmation" className="label_modify">Confirm New Password</label>
                                            <Field type="password" name="password_confirmation" className="input_modify input_modify_lg" id="last_name" />
                                        </div>
                                    </div> */}
                                    <div className="form_group_modify">
                                        <label for="password" className="label_modify">New Password</label>
                                        <Field type="password" style={errors.password && touched.password ? formInputErrorStyle : null} name="password" className="input_modify input_modify_lg" id="last_name" />
                                        <span style={formInputTextErrorStyle}>
                                            {errors.password && touched.password && errors.password}
                                        </span>
                                    </div>
                                    <div className="form_group_modify">
                                        <label for="password_confirmation" className="label_modify">Confirm New Password</label>
                                        <Field type="password" style={errors.password_confirmation && touched.password_confirmation ? formInputErrorStyle : null} name="password_confirmation" className="input_modify input_modify_lg" id="last_name" />
                                        <span style={formInputTextErrorStyle}>
                                            {errors.password_confirmation && touched.password_confirmation && errors.password_confirmation}
                                        </span>
                                    </div>
                                </div>
                                <div className="ph_flex_wrp_spw">
                                    {
                                        props.isLoading
                                            ? <LoadingBtn btnTitle="Updating..." btnClassName="theme_primary btn-block theme_btn text-uppercase" />
                                            : <button style={!formik_props.dirty || !formik_props.isValid ? { opacity: '0.5' } : null} disabled={!formik_props.dirty || !formik_props.isValid} className="theme_primary btn-block theme_btn text-uppercase" type="submit">Update</button>
                                    }
                                </div>
                            </div>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}

export default changePassword