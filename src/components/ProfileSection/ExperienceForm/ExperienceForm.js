import React from 'react'
import { Formik, Form, Field } from 'formik'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import './ExperienceForm.css'
import moment from 'moment'
import { routes, formInputTextErrorStyle, formInputErrorStyle } from '../../../utility/constants/constants';
import LoadingBtn from '../../UI/LoadingButton/LoadingButton';
import { toastMsg } from '../../../utility/utility';
import { validateExperienceForm } from '../../../utility/validator/formValidation/formValidation';

const experienceForm = props => {

    let initialFormValues = {
        company: '',
        position: '',
        city: '',
        from_date: '',
        to_date: '',
        current: false,
    }

    if (props.experienceDetails) {
        initialFormValues = {
            company: props.experienceDetails.company,
            position: props.experienceDetails.position,
            city: props.experienceDetails.city,
            from_date: moment(props.experienceDetails.from_date).toDate(),
            to_date: props.experienceDetails.current ? null : moment(props.experienceDetails.to_date).toDate(),
            current: props.experienceDetails.current ? true : false
        }
    }

    return (
        <Formik
            enableReinitialize={true}
            initialValues={initialFormValues}
            validationSchema={validateExperienceForm}
            onSubmit={(values, { setFieldError }) => {
                Object.keys(values).map((key, index) => {
                    if (!values[key] || values[key] === '') {
                        values[key] = undefined
                    }
                })
                if (!values.from_date) {
                    setFieldError('from_date', 'This field is required')
                }
                else if (values.to_date && !values.from_date) {
                    setFieldError('from_date', 'This field is required')
                }
                else if (values.from_date && (!values.to_date && !values.current)) {
                    setFieldError('to_date', 'This field is required')
                }
                else if (values.current && !values.from_date) {
                    setFieldError('from_date', 'This field is required')
                }
                else {
                    if (props.history.location.pathname.includes(routes.ADD_EXPERIENCE) || props.showAddExperienceForm) {
                        props.createExperience(props.profileId, { experience: { ...values } })
                            .then(response => {
                                if (response.value.success || response.value.success === "true") {
                                    props.toggleExperienceForm()
                                }
                            }).catch(error => {
                                console.log(error)
                            })
                    } else {
                        props.updateExperience(props.profileId, props.experienceDetails.id, { experience: { ...values } })
                            .then(response => {
                                if (response.value.success || response.value.success === "true") {
                                    props.toggleExperienceForm(null, true)
                                    toastMsg("Experience updated successfully!")
                                }
                            }).catch(error => {
                                console.log(error)
                            })
                    }
                    console.log(values, 'Values')
                }
            }}>
            {(formik_props) => {
                const errors = formik_props.errors
                const touched = formik_props.touched
                return (
                    <Form className="login100-form ph_forms" id="login_form">
                        {
                            props.history.location.pathname.includes(routes.ADD_EXPERIENCE)
                                ? <article className="limiter_heading_wrp ml-auto mr-auto wow fadeInUp">
                                    <h3>Experience</h3>
                                </article>
                                : null
                        }
                        <div className="inner_form mxW_670">
                            <div className="fields">
                                <div className="form-row">
                                    <div className="form_group_modify col-md-6">
                                        <label for="Companyname" className="label_modify">Company name</label>
                                        <Field name="company" type="text" className="input_modify input_modify_lg" id="Companyname" />
                                    </div>
                                    <div className="form_group_modify col-md-6">
                                        <label for="Position" className="label_modify">Position</label>
                                        <Field name="position" type="text" className="input_modify input_modify_lg" id="Position" />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form_group_modify col-md-6">
                                        <label for="City" className="label_modify">City</label>
                                        <Field name="city" type="text" className="input_modify input_modify_lg" id="City" />
                                    </div>
                                    <div className="form_group_modify col-md-6 experience_portfolio_date_picker_container">
                                        <label for="Fromdate" className="label_modify">From date</label>
                                        {/* <Field name="from_date" type="text" className="input_modify input_modify_lg" id="Fromdate" placeholder="03/06/2020" />
                                                <div className="icn_cal">
                                                    <img src="/images/icons/icn_cal.svg" className="si_inner" alt="search" />
                                                </div> */}
                                        {/* <Field name="from_date">
                                            {({ field, form, meta }) => (
                                                <div>
                                                    <input type="date" className={errors.from_date && touched.from_date ? "input_modify input_modify_lg to_date_picker experience_portfolio_date_picker error" : "input_modify input_modify_lg to_date_picker experience_portfolio_date_picker"} {...field} />
                                                    {meta.touched &&
                                                        meta.error && <div style={formInputTextErrorStyle} className="error">{meta.error}</div>}
                                                </div>
                                            )}
                                        </Field> */}
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <KeyboardDatePicker
                                                autoOk
                                                variant="inline"
                                                name="from_date"
                                                inputVariant="standard"
                                                className={errors.from_date && touched.from_date ? "input_modify input_modify_lg to_date_picker experience_portfolio_date_picker error" : "input_modify input_modify_lg to_date_picker experience_portfolio_date_picker"}
                                                // InputAdornmentProps={{ position: "start" }}
                                                margin="normal"
                                                id="date-picker-dialog"
                                                maxDate={new Date()}
                                                // label="Date picker dialog"
                                                format="MM/dd/yyyy"
                                                value={formik_props.values.from_date ? formik_props.values.from_date : null}
                                                onChange={(date) => {
                                                    formik_props.setFieldValue('from_date', date)
                                                }}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                            />
                                        </MuiPickersUtilsProvider>
                                        <span style={formInputTextErrorStyle}>{errors.from_date && touched.from_date && errors.from_date}</span>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form_group_modify col-md-6" id="to_date_picker">
                                        <label for="Todate" className="label_modify">To date</label>
                                        {/* <label for="Todate" className="label_modify">To date</label>
                                        <Field name="to_date" as="date" className="input_modify input_modify_lg" id="Todate" placeholder="03/06/2020" />
                                        <div className="icn_cal">
                                            <img src="/images/icons/icn_cal.svg" className="si_inner" alt="search" />
                                        </div> */}
                                        {/* <Field name="to_date">
                                            {({ field, form, meta }) => (
                                                <div>
                                                    <input type="date" placeholder="MM/DD/YYYY" className={errors.to_date && touched.to_date ? "input_modify input_modify_lg to_date_picker experience_portfolio_date_picker error" : "input_modify input_modify_lg to_date_picker experience_portfolio_date_picker"} {...field} />
                                                    {meta.touched &&
                                                        meta.error && <div style={formInputTextErrorStyle} className="error">{meta.error}</div>}
                                                </div>
                                            )}
                                        </Field> */}
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <KeyboardDatePicker
                                                autoOk
                                                variant="inline"
                                                name="to_date"
                                                inputVariant="standard"
                                                className={errors.to_date && touched.to_date ? "input_modify input_modify_lg to_date_picker experience_portfolio_date_picker error" : "input_modify input_modify_lg to_date_picker experience_portfolio_date_picker"}
                                                // InputAdornmentProps={{ position: "start" }}
                                                margin="normal"
                                                id="date-picker-dialog"
                                                // label="Date picker dialog"
                                                format="MM/dd/yyyy"
                                                minDate={formik_props.values.from_date ? formik_props.values.from_date : null}
                                                maxDate={new Date()}
                                                disabled={formik_props.values.current || !formik_props.values.from_date}
                                                value={formik_props.values.to_date ? formik_props.values.to_date : null}
                                                onChange={(date) => formik_props.setFieldValue('to_date', date)}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                            />
                                        </MuiPickersUtilsProvider>
                                        <span style={formInputTextErrorStyle}>{errors.to_date && touched.to_date && errors.to_date}</span>
                                    </div>
                                    <div className="form_group_modify col-md-6">
                                        <div className="virtual_input_wrp">
                                            <label className="ph_container ph_lg_container">
                                                <span className="ph_check_title">Current</span>
                                                <Field name="current" type="checkbox" />
                                                <span className="ph_checkmark ph_lg_checkmark"></span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                {
                                    props.isLoading
                                        ? <LoadingBtn btnClassName="theme_primary btn-block theme_btn text-uppercase" btnTitle="Loading" />
                                        : <button style={!formik_props.dirty || !formik_props.isValid ? { opacity: '0.5' } : null} disabled={!formik_props.dirty || !formik_props.isValid} className="theme_primary btn-block theme_btn text-uppercase" type="submit">Save & Continue</button>
                                }
                            </div>
                            {
                                props.history.location.pathname.includes(routes.ADD_EXPERIENCE)
                                    ? <div className="text-center">
                                        <a href="javascript:void(0)" onClick={() => props.history.push(routes.ADD_PORTFOLIO, { isSigningUp: true })} className="ph_link ph_underline">Skip</a>
                                    </div>
                                    : <div className="text-center">
                                        <a href="javascript:void(0)" onClick={(event) => props.toggleExperienceForm(event, null, true)} className="ph_link ph_underline">Close</a>
                                    </div>
                            }
                        </div>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default experienceForm