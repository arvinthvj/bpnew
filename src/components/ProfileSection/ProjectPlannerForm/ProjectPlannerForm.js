import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { formInputErrorStyle, formInputTextErrorStyle, routes } from '../../../utility/constants/constants';
import { toastMsg } from '../../../utility/utility';
import { validateProjectPlannerForm } from '../../../utility/validator/formValidation/formValidation';
import CustomToolTip from '../../UI/CustomToolTip/CustomToolTip';
import LoadingBtn from '../../UI/LoadingButton/LoadingButton';
import './ProjectPlannerForm.css';
import * as actions from '../../../redux/actions';
import { connect } from 'react-redux';
import { boolean } from 'yup';


const ProjectPlannerForm = props => {

    const[profileUpdateDetails, setProfileUpdateDetails] = useState({});

debugger
useEffect(() => {
    if(props.history.location.state.stateToPass) {
        setProfileUpdateDetails(props.history.location.state.stateToPass)
    }
}, []);

    let initialFormValues = {
        about_us:'',
        problem:'',
        solution:'',
        target_market:'',
        competitors:'',
        revenues:'',
        expenses:'',
        our_needs:''
    }

debugger
    if (props.history.location.state.stateToPass) {
        initialFormValues = {
            about_us: props.history.location.state.stateToPass.about_us,
            problem: props.history.location.state.stateToPass.problem,
            solution: props.history.location.state.stateToPass.solution,
            target_market: props.history.location.state.stateToPass.target_market,
            competitors: props.history.location.state.stateToPass.competitors,
            revenues: props.history.location.state.stateToPass.revenues,
            expenses: props.history.location.state.stateToPass.expenses,
            our_needs: props.history.location.state.stateToPass.our_needs
        }
    }

    return (
        <Formik
            enableReinitialize={true}
            initialValues={initialFormValues}
            onSubmit={(values, { resetForm }) => {
                debugger
                Object.keys(values).map((key, index) => {
                    if(values[key] === '' || values[key] == null) {
                        values[key] = undefined
                    }
                })
                if (Object.keys(profileUpdateDetails).length) {

                    // removing null or undefined values to empty string
                    Object.keys(profileUpdateDetails).map((e) => {
                        if(profileUpdateDetails[e] == null) {
                            profileUpdateDetails[e] = undefined;
                        }
                        if(e == "address" && profileUpdateDetails[e]["id"]) {
                            profileUpdateDetails[e]["id"] = undefined;
                        }
                        if(e == "address" && profileUpdateDetails[e]["state_code"]) {
                            profileUpdateDetails[e]["state_code"] = undefined;
                        }
                        if(e == "user_id" && profileUpdateDetails[e]) {
                            profileUpdateDetails[e] = undefined;
                        }
                        if(e == "name" && profileUpdateDetails[e]) {
                            profileUpdateDetails[e] = undefined;
                        }
                        if(e == "created_at" && profileUpdateDetails[e]) {
                            profileUpdateDetails[e] = undefined;
                        }
                        if(e == "updated_at" && profileUpdateDetails[e]) {
                            profileUpdateDetails[e] = undefined;
                        }
                        if(e == "active_status" && profileUpdateDetails[e]) {
                            profileUpdateDetails[e] = undefined;
                        }
                        if(e == "type" && profileUpdateDetails[e]) {	
                            profileUpdateDetails[e] = undefined;	
                        }
                        if(e == "sort" && typeof(profileUpdateDetails[e]) === "number") {
                            profileUpdateDetails[e] = undefined;
                        }
                        if(e == "service" && typeof(profileUpdateDetails[e]) === "object") {
                            profileUpdateDetails[e] = undefined;
                        }
                        if(typeof(profileUpdateDetails[e]) === "object") {
                            Object.keys(profileUpdateDetails[e]).map((p) => {
                                if(profileUpdateDetails[e][p] == null) {
                                    profileUpdateDetails[e][p] = undefined;
                                }
                            })
                        }
                    })
                    props.updateProfile(profileUpdateDetails.id, { profile: {...profileUpdateDetails, ...values } })
                       .then((response) => {
                          console.log(response);
                          if (response.value.success || response.value.success === 'true') {
                             resetForm();
                             props.setBusinessProfile(false);
                             toastMsg('Profile updated successfully!');
                             if(props.history.location.pathname.includes(routes.MANAGE_PROFILE_PLANNER)) {
                                props.history.push(routes.MANAGE_ALL_PROFILE)
                             }
                             if (props.history.location.state && props.history.location.state.redirectToBuild) {
                                props.history.push(routes.BUILD)
                             }
                          }
                       }).catch((error) => {
                          console.log(error);
                       });
                 }
                console.log(values, 'Values')
            }}
            validationSchema={validateProjectPlannerForm}>
            {(formik_props) => {
                const errors = formik_props.errors
                const touched = formik_props.touched
                return (
                    <div className="tab-pane fade show active" style={{ display: 'block' }} id="experience-portfolio" role="tabpanel" aria-labelledby="experience-portfolio-tab">
                    <div className="card switch_card_list card_bg_300 add_experience_cont">
                    <div className="card-body">
                    <Form className="login100-form ph_forms" id="login_form">
                        <div className="inner_form mxW_670">
                            <div className="fields">
                                <div className="form_group_modify">
                                    <label className="label_modify">About Us</label>
                                    <p className="fontS13">Who we are and what we're up to</p>
                                    <Field as="textarea" rows="3" style={errors.about_us && touched.about_us ? formInputErrorStyle : null} name="about_us" className="input_modify input_modify_lg" placeholder="Max 2000 characters" />
                                    <p className='charCount-PPF'>{formik_props.values.about_us && formik_props.values.about_us.length ? `${formik_props.values.about_us.split("").length}/2000` : ""}</p>
                                    <span style={formInputTextErrorStyle}>{errors.about_us && touched.about_us && errors.about_us}</span>
                                </div>
                                <div className="form_group_modify">
                                    <label className="label_modify">The Problem</label>
                                    <p className="fontS13">The problem we are solving or opportunity we are creating</p>
                                    <Field as="textarea" rows="3" style={errors.problem && touched.problem ? formInputErrorStyle : null} name="problem" className="input_modify input_modify_lg" placeholder="Max 2000 characters" />
                                    <p className='charCount-PPF'>{formik_props.values.problem && formik_props.values.problem.length ? `${formik_props.values.problem.split("").length}/2000` : ""}</p>
                                    <span style={formInputTextErrorStyle}>{errors.problem && touched.problem && errors.problem}</span>
                                </div>
                                <div className="form_group_modify">
                                    <label className="label_modify">Our Solution</label>
                                    <p className="fontS13">How we solve The Problem and do it better than anyone else</p>
                                    <Field as="textarea" rows="3" style={errors.solution && touched.solution ? formInputErrorStyle : null} name="solution" className="input_modify input_modify_lg" placeholder="Max 2000 characters" />
                                    <p className='charCount-PPF'>{formik_props.values.solution && formik_props.values.solution.length ? `${formik_props.values.solution.split("").length}/2000` : ""}</p>
                                    <span style={formInputTextErrorStyle}>{errors.solution && touched.solution && errors.solution}</span>
                                </div>
                                <div className="form_group_modify">
                                    <label className="label_modify">Target Market</label>
                                    <p className="fontS13">Ideal clients that we serve best</p>
                                    <Field as="textarea" rows="3" style={errors.target_market && touched.target_market ? formInputErrorStyle : null} name="target_market" className="input_modify input_modify_lg" placeholder="Max 2000 characters" />
                                    <p className='charCount-PPF'>{formik_props.values.target_market && formik_props.values.target_market.length ? `${formik_props.values.target_market.split("").length}/2000` : ""}</p>
                                    <span style={formInputTextErrorStyle}>{errors.target_market && touched.target_market && errors.target_market}</span>
                                </div>
                                <div className="form_group_modify">
                                    <label className="label_modify">Competitors</label>
                                    <p className="fontS13">Who (or what) is currently serving our Target Market</p>
                                    <Field as="textarea" rows="3" style={errors.competitors && touched.competitors ? formInputErrorStyle : null} name="competitors" className="input_modify input_modify_lg" placeholder="Max 2000 characters" />
                                    <p className='charCount-PPF'>{formik_props.values.competitors && formik_props.values.competitors.length ? `${formik_props.values.competitors.split("").length}/2000` : ""}</p>
                                    <span style={formInputTextErrorStyle}>{errors.competitors && touched.competitors && errors.competitors}</span>
                                </div>
                                <div className="form_group_modify">
                                    <label className="label_modify">Revenues</label>
                                    <p className="fontS13">Revenue Sources and Anticipated Revenue</p>
                                    <Field as="textarea" rows="3" style={errors.revenues && touched.revenues ? formInputErrorStyle : null} name="revenues" className="input_modify input_modify_lg" placeholder="Max 2000 characters" />
                                    <p className='charCount-PPF'>{formik_props.values.revenues && formik_props.values.revenues.length ? `${formik_props.values.revenues.split("").length}/2000` : ""}</p>
                                    <span style={formInputTextErrorStyle}>{errors.revenues && touched.revenues && errors.revenues}</span>
                                </div>
                                <div className="form_group_modify">
                                    <label className="label_modify">Expenses</label>
                                    <p className="fontS13">Anticipated Expenses and Operating Costs</p>
                                    <Field as="textarea" rows="3" style={errors.expenses && touched.expenses ? formInputErrorStyle : null} name="expenses" className="input_modify input_modify_lg" placeholder="Max 2000 characters" />
                                    <p className='charCount-PPF'>{formik_props.values.expenses && formik_props.values.expenses.length ? `${formik_props.values.expenses.split("").length}/2000` : ""}</p>
                                    <span style={formInputTextErrorStyle}>{errors.expenses && touched.expenses && errors.expenses}</span>
                                </div>
                                <div className="form_group_modify">
                                    <label className="label_modify">Our Needs</label>
                                    <p className="fontS13">Partners and/or Resources Needed</p>
                                    <Field as="textarea" rows="3" style={errors.our_needs && touched.our_needs ? formInputErrorStyle : null} name="our_needs" className="input_modify input_modify_lg" placeholder="Max 2000 characters" />
                                    <p className='charCount-PPF'>{formik_props.values.our_needs && formik_props.values.our_needs.length ? `${formik_props.values.our_needs.split("").length}/2000` : ""}</p>
                                    <span style={formInputTextErrorStyle}>{errors.our_needs && touched.our_needs && errors.our_needs}</span>
                                </div>
                            </div>
                            <div className="form-group">
                                {
                                    props.isLoading
                                        ? <LoadingBtn btnClassName="theme_primary btn-block theme_btn text-uppercase" btnTitle="Loading" />
                                        : <button  className="theme_primary btn-block theme_btn text-uppercase" type="submit">Save</button>
                                }
                            </div>
                        </div>
                    </Form>
                    </div>
                    </div>
                    </div>
                )
            }}
        </Formik>
    )
}

const mapStateToProps = state => ({
    user: state.authReducer.user,
    businessProfileDetail: state.profileReducer.businessProfileDetail,
    isBusinessServiceLoading: state.profileReducer.isBusinessServiceLoading,
    profileDetail: state.userReducer.profileDetail,
    uploadedFromDetails: state.userReducer.uploadedFromDetails,
    goToStep: state.walkThroughReducer.goToStep,
    isAuthLoading: state.authReducer.isloading,
    isLoading: state.profileReducer.isloading,
    isLoading: state.authReducer.isloading,
    isConfigLoading: state.configReducer.isConfigLoading,
    businessProfile: state.profileReducer.businessProfile,
    isUserSettingsLoading: state.userReducer.isUserSettingsLoading
  });

  const mapDispatchToProps = (dispatch) => {
    return {
        fetchCurrentUser: () => dispatch(actions.fetchCurrentUser()),
        updateProfile: (profileId, profile) => dispatch(actions.updateProfile(profileId, profile)),
        createProfile: (user) => dispatch(actions.createProfile(user)),
        setBusinessProfile: (status) => dispatch(actions.businessProfile(status)),
        handleStepChange: (steps) => dispatch(actions.handleStepChange(steps)),
        updateAccountInfo: (user) => dispatch(actions.updateAccountInfo(user)),
        updateUserSettings: (setting) => dispatch(actions.updateUserSettings(setting)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectPlannerForm);