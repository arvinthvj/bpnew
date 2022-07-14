import React, { useEffect } from 'react';
import { Form, Formik, Field } from 'formik';
import { validateCreateProfileForm } from '../../../utility/validator/formValidation/formValidation';
import {
   formInputTextErrorStyle,
   formInputErrorStyle,
   address,
   routes,
} from '../../../utility/constants/constants';
import AddressAutoComplete from '../../UI/AddressAutoComplete/AddressAutoComplete';
import './CreateProfileForm.css';
import LoadingBtn from '../../UI/LoadingButton/LoadingButton';
import $ from 'jquery';
import { toastMsg } from '../../../utility/utility';
import CustomToolTip from '../../UI/CustomToolTip/CustomToolTip';
import { connect } from 'react-redux';
import FocusError from './FocusError';
import * as actions from '../../../redux/actions';

const CreateProfileForm = (props) => {
   useEffect(() => {
      $('input[type=file]').on('change', function () {
         if (this.files && this.files.length > 0) {
            $('[for=file]').html(this.files[0].name);
            $('#preview1').attr('src', URL.createObjectURL(this.files[0]));
         }
      });
   }, []);
debugger
   let initialFormValues = {
      photo_path: '',
      first_name: props.user.first_name,
      last_name: props.user.last_name,
      title: '',
      bio: '',
      email: props.user.email,
      tag_line: '',
      website: '',
      service_offered: '',
      current_project: '',
      expectation: '',
      education: '',
      address: { ...address },
   };
   if (props.user) {
      initialFormValues = {
         photo_path: '',
         first_name: props.user.first_name,
         last_name: props.user.last_name,
         title: '',
         bio: '',
         email: props.user.email,
         tag_line: '',
         website: '',
         service_offered: '',
         current_project: '',
         expectation: '',
         education: '',
         address: { ...address },
      };
   }
   if (props.profileDetails) {
      initialFormValues = {
         photo_path: '',
         first_name: props.user.first_name,
         last_name: props.user.last_name,
         title: props.profileDetails.title,
         bio: props.profileDetails.bio,
         email: props.user.email,
         tag_line: props.profileDetails.tag_line,
         website: props.profileDetails.website,
         service_offered: props.profileDetails.service_offered,
         current_project: props.profileDetails.current_project,
         expectation: props.profileDetails.expectation,
         education: props.profileDetails.education,
         address: {
            street_address: props.profileDetails.address
               ? props.profileDetails.address.street_address
               : '',
            city: props.profileDetails.address.city,
            state: props.profileDetails.address.state,
            zip: props.profileDetails.address.zip,
         },
      };
   }
   let profilePic =
      props.profileDetails &&
         props.profileDetails.photo_urls &&
         Object.keys(props.profileDetails.photo_urls).length > 0
         ? props.profileDetails.photo_urls.medium
         : '/custom_images/icn_user_placeholder.svg';
   console.log(props.profileImage, 'profimg');
   console.log(props.isLoading, props.isProfileImageUploading);
   let profileName = props.profileDetails ? props.profileDetails.title :  null
   return (
      <Formik
         enableReinitialize={
            props.history.location.pathname.includes(routes.CREATE_NEW_PROFILE)
               ? false
               : true
         }
         initialValues={initialFormValues}
         onSubmit={(values, { resetForm }) => {
            debugger
            Object.keys(values).map((key, index) => {
               if (key === 'address' && !values[key].street_address) {
                  if (values[key].zip === '' || !values[key].zip) {
                     values[key].zip = undefined;
                  }
                  values[key].street_address = undefined;
                  values[key].city = undefined;
                  values[key].state = undefined;
                  values[key].street_address = undefined;
                  values[key].country = undefined;
                  values[key].latitude = undefined;
                  values[key].longitude = undefined;
               }
               if (!values[key] || values[key] === '' || values[key] === null) {
                  values[key] = undefined;
               }
            });

            if (values['address'].city === '' || !values['address'].city) {
               values['address'].city = undefined;
            }
            if (values['address'].state === '' || !values['address'].state) {
               values['address'].state = undefined;
            }
            if (
               values['address'].country === '' ||
               !values['address'].country
            ) {
               values['address'].country = undefined;
            }
            if (
               values['address'].latitude === '' ||
               !values['address'].latitude
            ) {
               values['address'].latitude = undefined;
            }
            if (
               values['address'].longitude === '' ||
               !values['address'].longitude
            ) {
               values['address'].longitude = undefined;
            }
            if (props.profilePhotoPath && props.profilePhotoPath.length > 0) {
               props.profilePhotoPath.map((photoPath, index) => {
                  values = {
                     ...values,
                     photo_path: photoPath,
                  };
               });
            }
            values = {
               ...values,
               primary: props.history.location.pathname.includes(
                  routes.CREATE_NEW_PROFILE
               )
                  ? true
                  : undefined,
            };
            if (
               !values.photo_path &&
               !(
                  props.profileDetails &&
                  props.profileDetails.photo_urls &&
                  Object.keys(props.profileDetails.photo_urls).length > 0 &&
                  props.profileDetails.photo_urls.medium
               )
            ) {
               toastMsg('Please upload profile picture', true);
            } 
            else {
               if (
                  props.history.location.pathname.includes(
                     routes.CREATE_NEW_PROFILE
                  )
               ) {
                  props
                     .createProfile({ profile: { ...values } })
                     .then((response) => {
                        console.log(response);
                        if (
                           response.value.success ||
                           response.value.success === 'true'
                        ) {
                           resetForm();
                        }
                     })
                     .catch((error) => {
                        console.log(error);
                     });
               } else if (props.profileDetails) {
                  props
                     .updateProfile(props.profileDetails.id, {
                        profile: { ...values },
                     })
                     .then((response) => {
                        console.log(response);
                        if (
                           response.value.success ||
                           response.value.success === 'true'
                        ) {
                           resetForm();
                           let stateToPass = response.action.payload.profile;
                           debugger
                           props.setBusinessProfile(false);
                           if(props.history.location.pathname.includes(routes.MANAGE_PROFILE_EDIT) && response.value.profile.type === "company") {
                              props.history.push({
                                 pathname: routes.MANAGE_PROFILE_PLANNER, state: {stateToPass}
                              })
                              props.setBusinessProfile(true);
                           } else if(props.history.location.pathname.includes(routes.MANAGE_PROFILE_EDIT)) {
                              props.history.push(routes.MANAGE_ALL_PROFILE)
                           }
                           toastMsg('Profile updated successfully!');
                           
                           if (props.history.location.state && props.history.location.state.redirectToBuild) {
                              props.history.push(routes.BUILD)
                           }
                        }
                     })
                     .catch((error) => {
                        console.log(error);
                     });
               } else {
                  if (props.businessProfile) {
                     values = {
                        ...values,
                        type: 'company',
                     };
                  }
                  props
                     .createProfile({ profile: { ...values } })
                     .then((response) => {
                        console.log(response);
                        if (
                           response.value.success ||
                           response.value.success === 'true'
                        ) {
                           debugger
                           let stateToPass = response.action.payload.profile
                           resetForm();
                           props.setBusinessProfile(false);
                           toastMsg('Profile updated successfully!');
                           if(props.history.location.pathname.includes(routes.MANAGE_PROFILE_EDIT) && props.businessProfile) {
                              props.history.push({
                                 pathname: routes.MANAGE_PROFILE_PLANNER, state: {stateToPass}
                              })
                              props.setBusinessProfile(true);
                           } else if(props.history.location.pathname.includes(routes.MANAGE_PROFILE_EDIT)) {
                              props.history.push(routes.MANAGE_ALL_PROFILE)
                           }
                           if (props.history.location.state && props.history.location.state.redirectToBuild) {
                              props.history.push(routes.BUILD)
                           }
                        }
                     })
                     .catch((error) => {
                        console.log(error);
                     });
               }
               if(props.user) {
                  props.updateAccountInfo({ user: { first_name : values.first_name, last_name : values.last_name } })
                  .then(response => {
                      if (response.value.success || response.value.success === "true") {
                          resetForm()
                      }
                  }).catch(error => {
                      console.log(error)
                  })
              console.log(values, 'Values')
               }
            }
            console.log(values, 'Values');
         }}
         validationSchema={validateCreateProfileForm}
      >
         {(formik_props) => {
            const errors = formik_props.errors;
            const touched = formik_props.touched;
            if (props.profilePhotoPath && props.profilePhotoPath.length > 0) {
               props.profilePhotoPath.map((photoPath, index) => {
                  if (!formik_props.values.photo_path) {
                     formik_props.setFieldValue('photo_path', photoPath);
                  }
               });
            }
            console.log(formik_props, 'btnDisabledConditionDirty');
            return (
               <Form className="login100-form ph_forms" id="login_form">
                  {props.user.primary_profile_id ? null : (
                     <article className="limiter_heading_wrp w-100 wow fadeInUp">
                        <h3 className="mb-2">Create your primary profile</h3>
                        <p className="ft_Weight_500 my-0 info_txt">
                           This is your primary profile. You can create
                           additional Profiles later.
                        </p>
                     </article>
                  )}
                  <div className="inner_form mxW_670 create_profile_form">
                     <div className="fields">
                        <div className="form_group_modify">
                           <label className="label_modify">
                              {props.businessProfile
                                 ? 'Photo or Company Logo'
                                 : 'Profile Photo'}
                              <span className="text-danger">*</span>
                           </label>
                           <div className="media align-items-center">
                              <input
                                 type="file"
                                 id="imgupload1"
                                 onChange={props.onImageUpload}
                                 style={{ display: 'none' }}
                              />
                              <div className="circle_img user-pic mr-4">
                                 <img
                                    id="preview1"
                                    src={profilePic}
                                    style={{ backgroundColor: '#fff' }}
                                    alt={profileName ? profileName : 'image'}
                                 />
                              </div>
                              <div className="media-body">
                                 {props.isProfileImageUploading ? (
                                    <LoadingBtn
                                       btnClassName="theme_btn theme_primary text_inherie"
                                       btnTitle="Uploading"
                                    />
                                 ) : (
                                       <button
                                          type="button"
                                          onClick={() =>
                                             $('#imgupload1').trigger('click')
                                          }
                                          id="OpenImgUpload1"
                                          className="theme_btn theme_primary text_inherie"
                                       >
                                          Upload photo
                                       </button>
                                    )}
                              </div>
                           </div>
                           <div className="info_txt">
                              Upload a portrait that best represents the profile
                              you are creating.
                           </div>
                        </div>
                        <div className="form-row">
                                       <div className="form_group_modify col-md-6">
                                          <label for="first_name" className="label_modify">First Name</label>
                                          {props.history.location.pathname.includes(routes.EDIT_PROFILE) ?                                      
                                             <Field disabled={props.reEditPhoneNumber} type="text" name="first_name" className={props.reEditPhoneNumber ? "input_modify input_modify_lg disabled_input_field" : "input_modify input_modify_lg"} id="first_name" /> :
                                             <CustomToolTip placement="top" text="Please edit the Name in Primary Profile">
                                             <span data-tip-disable={false}>
                                             <Field disabled={true} type="text" name="first_name" className="input_modify input_modify_lg disabled_input_field" id="first_name" />
                                             </span>
                                             </CustomToolTip>
                                          }
                                       </div>
                                        
                                       <div className="form_group_modify col-md-6">
                                          <label for="last_name" className="label_modify">Last Name</label>
                                          {props.history.location.pathname.includes(routes.EDIT_PROFILE) ?                                      
                                             <Field disabled={props.reEditPhoneNumber} type="text" name="last_name" className={props.reEditPhoneNumber ? "input_modify input_modify_lg disabled_input_field" : "input_modify input_modify_lg"} id="last_name" /> :
                                             <CustomToolTip placement="top" text="Please edit the Name in Primary Profile">
                                             <span data-tip-disable={false}>
                                             <Field disabled={true} type="text" name="last_name" className="input_modify input_modify_lg disabled_input_field" id="last_name" />
                                             </span>
                                             </CustomToolTip>
                                          }
                                       </div>
                        </div>
                        <div className="form_group_modify">
                           <label for="Title" className="label_modify">
                              {props.businessProfile ? 'Company Name' : 'Title'}{' '}
                              <span className="text-danger">*</span>
                           </label>
                           <Field
                              type="text"
                              style={
                                 errors.title && touched.title
                                    ? formInputErrorStyle
                                    : null
                              }
                              className="input_modify input_modify_lg"
                              id="title"
                              name="title"
                              placeholder={
                                 props.businessProfile
                                    ? 'Google, Microsoft etc.'
                                    : 'Try ‘Marketing Officer’, ‘CTO’ etc. '
                              }
                           />
                           <span style={formInputTextErrorStyle}>
                              {errors.title && touched.title && errors.title}
                           </span>
                        </div>
                        <div className="form-row">
                           <div className="form_group_modify col-md-6 address_input_field_wrapper">
                              <label for="Address" className="label_modify">
                                 City
                              </label>
                              {/* <Field type="text" className="input_modify input_modify_lg" name="address[street_address]" id="Address" /> */}
                              <div className="address_info_icon">
                                 <CustomToolTip
                                    placement="top"
                                    text={
                                       <span>
                                          Auto-Lookup: start typing City name
                                       </span>
                                    }
                                 >
                                    <img
                                       src="/custom_images/icn_info.svg"
                                       className="si_inner"
                                       alt="search"
                                    />
                                 </CustomToolTip>
                              </div>
                              <AddressAutoComplete
                                 name="address[street_address]"
                                 errors={errors}
                                 touched={touched}
                                 setFieldTouched={formik_props.setFieldTouched}
                                 address={props.address}
                                 value={
                                    formik_props.values.address[
                                    'street_address'
                                    ]
                                 }
                                 onChange={formik_props.setFieldValue}
                                 handleAddressSelect={props.handleAddressSelect}
                              />
                              <span style={formInputTextErrorStyle}>
                                 {errors.address &&
                                    errors.address['street_address'] &&
                                    touched.address &&
                                    touched.address['street_address'] &&
                                    errors.address['street_address']}
                              </span>
                           </div>
                           <div className="form_group_modify col-md-6">
                              <label for="zip" className="label_modify">
                                 Zip code <span className="text-danger">*</span>
                              </label>
                              <Field
                                 style={
                                    errors.address &&
                                       errors.address['zip'] &&
                                       touched.address &&
                                       touched.address['zip']
                                       ? formInputErrorStyle
                                       : null
                                 }
                                 type="text"
                                 className="input_modify input_modify_lg"
                                 placeholder="Zipcode"
                                 name="address[zip]"
                                 id="address"
                              />
                              <span style={formInputTextErrorStyle}>
                                 {errors.address &&
                                    errors.address['zip'] &&
                                    touched.address &&
                                    touched.address['zip'] &&
                                    errors.address['zip']}
                              </span>
                           </div>
                        </div>
                        {/* <div className="form-row">
                                    <div className="form_group_modify col-md-6">
                                        <label for="State" className="label_modify">State</label>
                                        <Field style={(errors.address && errors.address['state']) && (touched.address && touched.address['state']) ? formInputErrorStyle : null}
                                            type="text" disabled={true} className="input_modify input_modify_lg field_disabled" placeholder="State" name="address[state]" id="State" />
                                        <span style={formInputTextErrorStyle}>
                                            {(errors.address && errors.address['state']) && (touched.address && touched.address['state']) && errors.address['state']}
                                        </span>
                                    </div>
                                    <div className="form_group_modify col-md-6">
                                        <label for="City" className="label_modify">City</label>
                                        <Field style={(errors.address && errors.address['city']) && (touched.address && touched.address['city']) ? formInputErrorStyle : null}
                                            type="text" disabled={true} className="input_modify input_modify_lg field_disabled" placeholder="City" name="address[city]" id="City" />
                                        <span style={formInputTextErrorStyle}>
                                            {(errors.address && errors.address['city']) && (touched.address && touched.address['city']) && errors.address['city']}
                                        </span>
                                    </div>
                                </div> */}
                        <div className="form_group_modify">
                           <label for="bio" className="label_modify">
                              {props.businessProfile
                                 ? 'Company Description'
                                 : 'Summary/bio'}{' '}
                              <span className="text-danger">*</span>
                           </label>
                           <Field
                              as="textarea"
                              style={
                                 errors.bio && touched.bio
                                    ? formInputErrorStyle
                                    : null
                              }
                              className="input_modify input_modify_lg"
                              rows="3"
                              id='bio'
                              name="bio"
                              placeholder="Max 2000 characters"
                           />
                           <p className='charCount-CPF'>{formik_props.values.bio && formik_props.values.bio.length ? `${formik_props.values.bio.split("").length}/2000` : ""}</p>
                           <span style={formInputTextErrorStyle}>
                              {errors.bio && touched.bio && errors.bio}
                           </span>
                        </div>
                        <div className="form_group_modify">
                           <label for="email" className="label_modify">
                              Email
                           </label>
                           <Field
                              id="email"
                              disabled={true}
                              type="email"
                              style={
                                 errors.email && touched.email
                                    ? formInputErrorStyle
                                    : null
                              }
                              className="input_modify input_modify_lg disabled_input_field"
                              name="email"
                              placeholder="abc@example.com"
                           />
                           <span style={formInputTextErrorStyle}>
                              {errors.email && touched.email && errors.email}
                           </span>
                        </div>
                        <div className="form_group_modify">
                           <label for="website" className="label_modify">
                              Website URL
                           </label>
                           <Field
                              id="website"
                              style={
                                 errors.website && touched.website
                                    ? formInputErrorStyle
                                    : null
                              }
                              type="text"
                              name="website"
                              className="input_modify input_modify_lg"
                              placeholder="www.example.com"
                           />
                           <span style={formInputTextErrorStyle}>
                              {errors.website &&
                                 touched.website &&
                                 errors.website}
                           </span>
                        </div>
                        {!props.businessProfile ? (
                           <div className="form_group_modify">
                              <label for="Education" className="label_modify">
                                 Education
                              </label>
                              <Field
                                 id="Education"
                                 name="education"
                                 type="text"
                                 className="input_modify input_modify_lg"
                              />
                           </div>
                        ) : null}
                        <div className="form_group_modify">
                           <label
                              for="Personal_tag_line"
                              className="label_modify"
                           >
                              {props.businessProfile
                                 ? 'Company Tag Line'
                                 : 'Personal tag line'}
                           </label>
                           <Field
                              name="tag_line"
                              id="Personal_tag_line"
                              type="text"
                              className="input_modify input_modify_lg"
                              placeholder="How do you want to be known"
                           />
                        </div>

                        <div className="form_group_modify">
                           <label className="label_modify">
                              What’s the primary product or service you have to
                              offer?
                           </label>
                           <Field
                              as="textarea"
                              style={
                                 errors.service_offered &&
                                    touched.service_offered
                                    ? formInputErrorStyle
                                    : null
                              }
                              className="input_modify input_modify_lg"
                              rows="3"
                              name="service_offered"
                              id="service_offered"
                              placeholder="Max 2000 characters"
                           />
                           <p className='charCount-CPF'>{formik_props.values.service_offered && formik_props.values.service_offered.length ? `${formik_props.values.service_offered.split("").length}/2000` : ""}</p>
                           <span style={formInputTextErrorStyle}>
                              {errors.service_offered &&
                                 touched.service_offered &&
                                 errors.service_offered}
                           </span>
                        </div>
                        <div className="form_group_modify">
                           <label className="label_modify">
                              {props.businessProfile
                                 ? 'What’s the next step in your growth?'
                                 : 'What’s the project or company you’re working on?'}
                           </label>
                           <Field
                              as="textarea"
                              style={
                                 errors.current_project &&
                                    touched.current_project
                                    ? formInputErrorStyle
                                    : null
                              }
                              className="input_modify input_modify_lg"
                              rows="3"
                              name="current_project"
                              id="current_project"
                              placeholder="Max 2000 characters"
                           />
                           <p className='charCount-CPF'>{formik_props.values.current_project && formik_props.values.current_project.length ? `${formik_props.values.current_project.split("").length}/2000` : ""}</p>
                           <span style={formInputTextErrorStyle}>
                              {errors.current_project &&
                                 touched.current_project &&
                                 errors.current_project}
                           </span>
                        </div>
                        <div className="form_group_modify">
                           <label className="label_modify">
                              What do you most want to get from PartnerHere?
                           </label>
                           <Field
                              as="textarea"
                              style={
                                 errors.expectation && touched.expectation
                                    ? formInputErrorStyle
                                    : null
                              }
                              className="input_modify input_modify_lg"
                              rows="3"
                              name="expectation"
                              id="expectation"
                              placeholder="Max 2000 characters"
                           />
                           <p className='charCount-CPF'>{formik_props.values.expectation && formik_props.values.expectation.length ? `${formik_props.values.expectation.split("").length}/2000` : ""}</p>
                           <span style={formInputTextErrorStyle}>
                              {errors.expectation &&
                                 touched.expectation &&
                                 errors.expectation}
                           </span>
                        </div>
                     </div>
                     {routes.CREATE_NEW_PROFILE.includes(
                        props.history.location.pathname
                     ) ? (
                           <div className="form-row">
                              <div className="form_group_modify col-md-6">
                                 <a
                                    onClick={() =>
                                       window.$('#cancel_profile_form').modal()
                                    }
                                    href="javascript:void(0)"
                                    className="form_link ft_Weight_500 ph_underline"
                                 >
                                    Cancel
                              </a>
                              </div>
                              <div className="form_group_modify col-md-6">
                                 {props.isLoading ? (
                                    <LoadingBtn
                                       btnClassName="theme_primary btn-block theme_btn text-uppercase"
                                       btnTitle="Loading"
                                    />
                                 ) : (
                                       <button
                                          // style={
                                          //    !formik_props.dirty
                                          //       ? { opacity: '0.5' }
                                          //       : null
                                          // }
                                          // disabled={!formik_props.dirty}
                                          type="submit"
                                          className="theme_primary btn-block theme_btn text-uppercase"
                                       >
                                          {props.history.location.pathname.includes(routes.MANAGE_PROFILE_EDIT) && props.businessProfile ? "Next" : "Save"}
                                       </button>
                                    )}
                              </div>
                           </div>
                        ) : (
                           <div className="form-group">
                              {props.isLoading ? (
                                 <LoadingBtn
                                    btnClassName="theme_primary btn-block theme_btn text-uppercase"
                                    btnTitle="Loading"
                                 />
                              ) : (
                                    <button
                                       // style={
                                       //    !formik_props.dirty
                                       //       ? { opacity: '0.5' }
                                       //       : null
                                       // }
                                       // disabled={!formik_props.dirty}
                                       type="submit"
                                       className="theme_primary btn-block theme_btn text-uppercase"
                                    >
                                       {props.history.location.pathname.includes(routes.MANAGE_PROFILE_EDIT) && props.businessProfile ? "Next" : "Save"}
                                    </button>
                                 )}
                           </div>
                        )}
                  </div>
                  <FocusError />
               </Form>
            );
         }}
      </Formik>
   );
};

const mapStateToProps = (state) => ({
   user: state.authReducer.user,
   isLoading: state.authReducer.isloading,
   isUserSettingsLoading: state.userReducer.isUserSettingsLoading
});
const mapStateToDispatch = (dispatch) => ({
   addMyService: (service) => dispatch(actions.addService(service)),
   updateAccountInfo: (user) => dispatch(actions.updateAccountInfo(user)),
   changePassword: (password) => dispatch(actions.changePassword(password)),
   updateUserSettings: (setting) => dispatch(actions.updateUserSettings(setting)),
   fetchCurrentUser: () => dispatch(actions.fetchCurrentUser()),
   sendVerifyEduEmail: () => dispatch(actions.sendVerifyEduEmail())
});
export default connect(mapStateToProps, mapStateToDispatch)(CreateProfileForm)