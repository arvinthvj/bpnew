import React from 'react'
import { routes, formInputTextErrorStyle, formInputErrorStyle, EmailVerificationStatus } from '../../../utility/constants/constants'
import { Form, Formik, Field } from 'formik'
import './SkillsForm.css'
import LoadingBtn from '../../UI/LoadingButton/LoadingButton'
import { validateSkillsForm } from '../../../utility/validator/formValidation/formValidation'
import { toastMsg } from '../../../utility/utility'
import CustomToolTip from '../../UI/CustomToolTip/CustomToolTip'

const skillsForm = props => {

    let initialFormValues = {
        skill_education: '',
        skill_description: '',
        skills: ''
    }

    let skillsList = []

    if (props.profileDetails) {
        initialFormValues = {
            skill_education: props.profileDetails.skill_education,
            skill_description: props.profileDetails.skill_description,
            skills: ''
        }
    }

    if (props.skills && props.skills.length > 0) {
        var count = 0;
        skillsList = props.skills.map((ele, index) => {
            if (props.searchText && props.searchText.length > 0) {
                if (ele.name.toLowerCase().includes(props.searchText.toLowerCase())) {
                    count = count + 1;
                    return <li className="result_items" key={index} onClick={() => props.selectedSkillHandler(ele)}>
                        <a href="javascript:void(0)" className="text_result">
                            {/* <span className="search_icn">
                                    <i className="fa fa-search" aria-hidden="true"></i>
                                </span> */}
                            <span className="search_tagline">{ele.name}</span>
                        </a>                        </li>
                }
            } else {
                count = count + 1;
                return <li className="result_items" key={index} onClick={() => props.selectedSkillHandler(ele)}>
                    <a href="javascript:void(0)" className="text_result">
                        {/* <span className="search_icn">
                                <i className="fa fa-search" aria-hidden="true"></i>
                            </span> */}
                        <span className="search_tagline">{ele.name}</span>
                    </a>
                </li>
            }
            return null;
        });

        if (count === 0) {
            skillsList = [];
            skillsList.push(
                // <li className="result_items" key={0}>
                //     <a href="javascript:void(0)" onClick={() => props.selectedSkillHandler({ name: props.searchText, id: Math.floor(Math.random() * 1000) + 1000 })} className="text_result">
                //         {/* <span className="search_icn">
                //             <i className="fa fa-search" aria-hidden="true"></i>
                //         </span> */}
                //         <span className="search_tagline">Add Custom Skill</span>
                //     </a>
                // </li>
                <li className="result_items" key={0}>
                    <a href="javascript:void(0)" className="text_result">
                        {/* <span className="search_icn">
                            <i className="fa fa-search" aria-hidden="true"></i>
                        </span> */}
                        <span className="search_tagline">No Results</span>
                    </a>
                </li>
            );
        }
    }

    console.log(props.selectedSkills, "selectedSKills")
    return (
        <Formik
            enableReinitialize={true}
            initialValues={initialFormValues}
            onSubmit={(values, { resetForm }) => {
                Object.keys(values).map((key, index) => {
                    if (!values[key] || values[key] === '') {
                        values[key] = undefined
                    }
                })
                if (props.selectedSkills && props.selectedSkills.length > 0) {
                    values = {
                        ...values,
                        skills: props.selectedSkills
                    }
                }
                if (props.history.location.pathname.includes(routes.ADD_SKILLS)) {
                    props.createSkills(props.profileId, { profile: { ...values } })
                } else {
                    props.updateProfile(props.profileDetails.id, { profile: { ...values } })
                        .then(response => {
                            if (response.value.success || response.value.success === "true") {
                                resetForm()
                                toastMsg("Skills updated successfully!")
                            }
                        }).catch(error => {
                            console.log(error)
                        })
                }
                console.log(values, 'Values')
            }}
            validationSchema={validateSkillsForm}>
            {(formik_props) => {
                const errors = formik_props.errors
                const touched = formik_props.touched
                return (
                    <Form className="login100-form ph_forms" id="login_form">
                        {
                            props.history.location.pathname.includes(routes.ADD_SKILLS)
                                ? <article className="limiter_heading_wrp ml-auto mr-auto wow fadeInUp">
                                    <h3>Skills</h3>
                                </article>
                                : null
                        }
                        <div className="inner_form mxW_670">
                            <div className="fields">
                                <div className="form_group_modify add_skills_wrapper">
                                    <div className="skills_info_icon">
                                        <CustomToolTip placement="top" text={<span>Please choose the relevant skills from the provided list</span>}>
                                            <img src="/custom_images/icn_info.svg" className="si_inner" alt="search" />
                                        </CustomToolTip>
                                    </div>
                                    <label for="Skills" className="label_modify">Skills</label>
                                    <Field
                                        id="Skills"
                                        type="text"
                                        className="input_modify input_modify_lg"
                                        name="skills"
                                        value={props.searchText}
                                        onChange={(e) => props.onSkillSearchTextChangeHandler(e, formik_props.setFieldValue)}
                                        onFocus={props.onSkillsFocusHandler}
                                        autoComplete="off"
                                        placeholder="Add Skills" />
                                    <div ref={props.setWrapperRef} className="skills-list skills_list_container" style={{ display: props.searchInputFocus ? "block" : "none" }}>
                                        <ul className="skills_result_list" id="myUL">
                                            {skillsList}
                                        </ul>
                                    </div>
                                </div>
                                <div className="form_group_modify skills_preview">
                                    <ul className="skills_preview_list">
                                        {
                                            props.selectedSkills && props.selectedSkills.length > 0
                                                ? props.selectedSkills.map((skill, index) => {
                                                    return (
                                                        <li key={skill.id}>
                                                            <span className="theme_outline_secondary borderR25">
                                                                {skill.name}
                                                                <a href="javascript:void(0)" onClick={() => { props.onRemoveSelectedSkills(index); formik_props.setFieldValue('skills', index) }}><img src="/images/icons/icn_close_danger.svg" alt="Close Icon" /></a>
                                                            </span>
                                                        </li>
                                                    )
                                                })
                                                : null
                                        }
                                    </ul>
                                </div>
                                <div className="form_group_modify">
                                    <label className="label_modify">Other Details</label>
                                    <p className="fontS13">Education (GED, High School Diploma, Bachelors, Masters, Doctorate, Post Doctorate)</p>
                                    <Field as="textarea" rows="3" style={errors.skill_education && touched.skill_education ? formInputErrorStyle : null} name="skill_education" className="input_modify input_modify_lg" placeholder="Max 2000 characters" />
                                    <p className='charCount-SF'>{formik_props.values.skill_education && formik_props.values.skill_education.length ? `${formik_props.values.skill_education.split("").length}/2000` : ""}</p>
                                    <span style={formInputTextErrorStyle}>{errors.skill_education && touched.skill_education && errors.skill_education}</span>
                                </div>
                                <div className="form_group_modify">
                                    <label className="label_modify">Additional info</label>
                                    <Field as="textarea" style={errors.skill_description && touched.skill_description ? formInputErrorStyle : null} rows="3" name="skill_description" className="input_modify input_modify_lg" placeholder="Max 2000 characters" />
                                    <p className='charCount-SF'>{formik_props.values.skill_education && formik_props.values.skill_education.length ? `${formik_props.values.skill_education.split("").length}/2000` : ""}</p>
                                    <span style={formInputTextErrorStyle}>{errors.skill_description && touched.skill_description && errors.skill_description}</span>
                                </div>
                            </div>
                            <div className="form-group">
                                {
                                    props.isLoading
                                        ? <LoadingBtn btnClassName="theme_primary btn-block theme_btn text-uppercase" btnTitle="Loading" />
                                        : <button style={!formik_props.dirty || !formik_props.isValid ? { opacity: '0.5' } : null} disabled={!formik_props.dirty || !formik_props.isValid} className="theme_primary btn-block theme_btn text-uppercase" type="submit">Save & Continue</button>
                                }
                            </div>
                            <div className="text-center">
                                {
                                    props.history.location.pathname.includes(routes.ADD_SKILLS)
                                        ? <a href="javascript:void(0)" onClick={props.user.email_verification_status === EmailVerificationStatus.VERIFICATION_REQUIRED ? () => props.history.push(routes.EMAIL_VERIFICATION) : () => props.history.push(routes.HOME)} className="ph_link ph_underline">Skip</a>
                                        : null
                                }
                            </div>
                        </div>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default skillsForm