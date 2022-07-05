import React from 'react'
import { Form, Field, Formik } from 'formik'
import PhoneNumberInput from '../UI/PhoneNumberInput/PhoneNumberInput'
import { formInputErrorStyle, formInputTextErrorStyle, EmailVerificationStatus, routes } from '../../utility/constants/constants'
import { validateAccountInfoForm } from '../../utility/validator/formValidation/formValidation'
import LoadingBtn from '../UI/LoadingButton/LoadingButton'
import storage from '../../utility/storage'

const accountInformationForm = props => {

    let initialFormValues = {
        first_name: '',
        last_name: '',
        // phone: '',
        email: ''
    }

    if (props.user) {
        initialFormValues = {
            first_name: props.user.first_name,
            last_name: props.user.last_name,
            phone: props.user.phone,
            email: props.user.email
        }
    }

    return (
        <div className="wrap-login100">
            <Formik
                enableReinitialize={true}
                initialValues={initialFormValues}
                onSubmit={(values, { resetForm }) => {
                    // if (values.phone === props.user.phone) {
                    //     values = {
                    //         ...values,
                    //         phone: undefined
                    //     }
                    // }
                    values = {
                        ...values,
                        email: undefined
                    }
                    delete values.phone
                    props.updateAccountInfo({ user: { ...values } })
                        .then(response => {
                            if (response.value.success || response.value.success === "true") {
                                resetForm()
                            }
                        }).catch(error => {
                            console.log(error)
                        })
                    console.log(values, 'Values')
                }}
                validationSchema={validateAccountInfoForm}>
                {(formik_props) => {
                    const errors = formik_props.errors
                    const touched = formik_props.touched
                    console.log(errors, "erros")
                    return (
                        <Form className="login100-form ph_forms" id="login_form">
                            <article className="limiter_heading_wrp ml-auto mr-auto wow fadeInUp">
                                <h3>Account Information</h3>
                            </article>
                            <div className="inner_form">
                                <div className="fields">
                                    <div className="form-row">
                                        <div className="form_group_modify col-md-6">
                                            <label for="first_name" className="label_modify">First Name</label>
                                            <Field disabled={props.reEditPhoneNumber} type="text" name="first_name" className={props.reEditPhoneNumber ? "input_modify input_modify_lg disabled_input_field" : "input_modify input_modify_lg"} id="first_name" />
                                        </div>
                                        <div className="form_group_modify col-md-6">
                                            <label for="last_name" className="label_modify">Last Name</label>
                                            <Field disabled={props.reEditPhoneNumber} type="text" name="last_name" className={props.reEditPhoneNumber ? "input_modify input_modify_lg disabled_input_field" : "input_modify input_modify_lg"} id="last_name" />
                                        </div>
                                    </div>
                                    {/* <div className="form_group_modify">
                                        <label for="phone" className="label_modify">Phone Number</label>
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
                                                            parentDivClassName="account_update_form_phone_input"
                                                            inputClassName="account_update_form_phone_input_field"
                                                            value={formik_props.values.phone}
                                                            {...form}
                                                            {...field} />
                                                        {errors.phone && touched.phone ? <span style={formInputTextErrorStyle}>{errors.phone}</span> : null}
                                                    </div>
                                                )
                                            }}
                                        </Field>
                                    </div> */}
                                </div>
                                <label for="email" className="label_modify">Email</label>
                                <div className="form_group_modify input-group">
                                    <Field disabled={true} type="email" name="email" className="input_modify form-control input_modify_lg disabled_input_field" id="email" />
                                    {
                                        props.user.email_verification_status === EmailVerificationStatus.VERIFICATION_REQUIRED
                                            ? props.isLoading
                                                ? <LoadingBtn btnClassName="input-group-text" />
                                                : <div onClick={() => {
                                                    props.sendVerifyEduEmail()
                                                        .then(response => {
                                                            if (response.value.success === true || response.value.success === "true") {
                                                                window.$('#email_sent_modal').modal()
                                                            }
                                                        }).catch(error => {
                                                            console.log(error)
                                                        })
                                                }} class="input-group-append verify mail append">
                                                    <span class="input-group-text" id="basic-addon2">Verify</span>
                                                </div>
                                            : null
                                    }
                                </div>

                                <div className="ph_flex_wrp_spw">
                                    {
                                        props.isLoading
                                            ? <LoadingBtn btnTitle="Updating..." btnClassName="theme_primary btn-block theme_btn text-uppercase" />
                                            : routes.EDIT_ACCOUNT_INFO.includes(props.history.location.pathname)
                                                ? <button style={!formik_props.dirty || !formik_props.isValid ? { opacity: '0.5' } : null} disabled={!formik_props.dirty || !formik_props.isValid} className="theme_primary btn-block theme_btn text-uppercase" type="submit">Update</button>
                                                : <button className="theme_primary btn-block theme_btn text-uppercase" type="submit">Update</button>
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

export default accountInformationForm