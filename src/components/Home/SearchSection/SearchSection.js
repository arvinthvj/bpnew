import React, { useEffect } from 'react';
import Oux from '../../../hoc/Oux/Oux';
import { connect } from 'react-redux';
import { Form, Formik, Field } from 'formik';
import $ from 'jquery';
import {
   routes,
   PageLimit,
   formInputTextErrorStyle,
   formInputErrorStyle,
} from '../../../utility/constants/constants';
import './SearchSection.css';
import * as actions from '../../../redux/actions';
import VideoPlayer from '../../UI/VideoPlayer/VideoPlayer';
import CustomToolTip from '../../UI/CustomToolTip/CustomToolTip';
import { fetchHomePageVideoURL } from '../../../config';
import { validateHomeSignUpForm } from '../../../utility/validator/formValidation/formValidation';
import storage from '../../../utility/storage';
import { useDispatch } from 'react-redux';
import PHByRickBarrera from '../PHByRickBarrera/PHByRickBarrera';

// const NonLoggedInSearch = props => {
//    <div className="container-fluid">
//       <div className="row">
//          <div
//             className="col-sm-12"
//             style={props.style ? props.style : null}
//          >
//             <Formik
//                initialValues={{
//                   query: props.selectedQuery
//                      ? props.selectedQuery
//                      : '',
//                   city: city ? city : '',
//                }}
//                enableReinitialize={true}
//                onSubmit={(values) => {
//                   if (!error) {
//                      let search = null;
//                      if (values.city) {
//                         values = {
//                            ...values,
//                            city: values.city.split(',')[0],
//                         };
//                         if (search) {
//                            search = search + '&city=' + values.city;
//                         } else {
//                            search = 'city=' + values.city;
//                         }
//                      }
//                      if (values.query) {
//                         if (search) {
//                            search = search + '&query=' + values.query;
//                         } else {
//                            search = 'query=' + values.query;
//                         }
//                      }
//                      if (
//                         props.history.location.pathname.includes(
//                            routes.HOME
//                         )
//                      ) {
//                         props.search(
//                            search +
//                            '&page=' +
//                            props.currentPage +
//                            '&limit=' +
//                            PageLimit
//                         );
//                      } else {
//                         props.onSubmitSearch({ ...values });
//                      }
//                      console.log(values, 'Values');
//                   }
//                }}
//             >
//                {(formik_props) => {
//                   const errors = formik_props.errors;
//                   const touched = formik_props.touched;
//                   console.log(formik_props, 'props');
//                   if (props.searchText.length > 0) {
//                      getCityList(
//                         formik_props.setFieldValue,
//                         formik_props.setFieldError
//                      );
//                   }
//                   return (
//                      <div className="theme_user_inputs">
//                         <Form
//                            className={
//                               props.removeSectionMargin
//                                  ? 'ph_theme_form search_result_search_box'
//                                  : 'ph_theme_form'
//                            }
//                         >
//                            <div className="form-row">
//                               <div className="form-group col-md-7 col-lg-7 col-xl-6">
//                                  <div className="search_icon">
//                                     <img
//                                        src="/images/icons/icn_search.svg"
//                                        className="si_inner"
//                                        alt="search"
//                                     />
//                                  </div>
//                                  <Field
//                                     name="query"
//                                     type="text"
//                                     className="form-control search_field"
//                                     id="inputCity"
//                                     placeholder="Try ‘John Smith’, Advertising etc."
//                                  />
//                               </div>
//                               <div className="form-group col-md-3 col-lg-3 col-xl-4">
//                                  <div className="search_city_wrapper">
//                                     <div
//                                        className="search_icon close_icon_city_search"
//                                        onClick={() => {
//                                           formik_props.setFieldValue(
//                                              'city',
//                                              ''
//                                           );
//                                           props.makeSearchTextStateEmpty();
//                                        }}
//                                     >
//                                        <img
//                                           src="/images/icons/icn_close_gray.svg"
//                                           className="si_inner"
//                                           alt="search"
//                                        />
//                                     </div>
//                                     <Field
//                                        id="city"
//                                        type="text"
//                                        className="form-control"
//                                        name="city"
//                                        style={
//                                           error && touched.city
//                                              ? formInputErrorStyle
//                                              : null
//                                        }
//                                        value={formik_props.values.city}
//                                        onChange={(e) =>
//                                           props.onCitySearchTextChangeHandler(
//                                              e,
//                                              formik_props.setFieldValue
//                                           )
//                                        }
//                                        autoComplete="off"
//                                        placeholder="Search City"
//                                     />
//                                     <div
//                                        ref={props.setWrapperRef}
//                                        className="city-list city_list_container"
//                                        style={{
//                                           display: props.searchInputFocus
//                                              ? 'block'
//                                              : 'none',
//                                        }}
//                                     >
//                                        <ul
//                                           className="city_result_list"
//                                           id="myUL"
//                                        >
//                                           {cityList}
//                                        </ul>
//                                     </div>
//                                  </div>
//                                  <span style={formInputTextErrorStyle}>
//                                     {error && touched.city && error}
//                                  </span>
//                               </div>
//                               <div className="form-group col-md-2 col-lg-2 col-xl-2">
//                                  <button
//                                     type="submit"
//                                     className="btn btn-warning ph_theme_bg"
//                                  >
//                                     Search
//                                           </button>
//                               </div>
//                            </div>
//                         </Form>
//                      </div>
//                   );
//                }}
//             </Formik>
//          </div>
//       </div>
//    </div>
// }

const SearchSection = (props) => {
   useEffect(() => {
      $(document).ready(function () {
         $(document).click(function (event) {
            var clickover = $(event.target);
            var _openedCheckboxList = $('.checkbox_list.collapse').hasClass(
               'show'
            );
            if (
               _openedCheckboxList === true &&
               !$(clickover).is('.select_check') &&
               !$(clickover).is('.check_box') &&
               !$(clickover).is('.checkbox_list') &&
               !$(clickover).is('.label_title') &&
               !$(clickover).is('.check_mark')
            ) {
               window.$('.checkbox_list.collapse').collapse('hide');
            }
            var __openedCityList = $('.city_list.collapse').hasClass('show');
            if (__openedCityList === true) {
               window.$('.city_list.collapse').collapse('hide');
            }
         });
      });
   }, []);

   let cityList = [];
   let error = null;
   const dispatch = useDispatch();
   const handleStep = (steps) => {
      dispatch(actions.handleStepChange(steps))
   }

   const getCityList = (setFieldValue, setFieldError) => {
      if (props.city_list && props.city_list.length > 0) {
         var count = 0;
         cityList = props.city_list.map((ele, index) => {
            if (props.searchText && props.searchText.length > 0) {
               if (
                  ele.formatted
                     .toLowerCase()
                     .includes(props.searchText.toLowerCase())
               ) {
                  count = count + 1;
                  return (
                     <li
                        className="result_items"
                        key={index}
                        onClick={() =>
                           props.selectedCityHandler(ele, setFieldValue)
                        }
                     >
                        <a href="javascript:void(0)" className="text_result">
                           {/* <span className="search_icn">
                                        <i className="fa fa-search" aria-hidden="true"></i>
                                    </span> */}
                           <span className="search_tagline">{`${ele.city}, ${ele.state_code}`}</span>
                        </a>{' '}
                     </li>
                  );
               }
            } else {
               count = count + 1;
               return (
                  <li
                     className="result_items"
                     key={index}
                     onClick={() =>
                        props.selectedCityHandler(ele, setFieldValue)
                     }
                  >
                     <a href="javascript:void(0)" className="text_result">
                        {/* <span className="search_icn">
                                    <i className="fa fa-search" aria-hidden="true"></i>
                                </span> */}
                        <span className="search_tagline">{`${ele.city}, ${ele.state_code}`}</span>
                     </a>
                  </li>
               );
            }
            return null;
         });
         if (count === 0) {
            cityList = [];
            cityList.push(
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
   };

   let city = null;
   if (props.city_list && props.city_list.length > 0 && props.selectedCity) {
      props.city_list.map((cityList) => {
         if (cityList.city.toLowerCase() === props.selectedCity.toLowerCase()) {
            city = `${cityList.city}, ${cityList.state_code}`;
         }
      });
   }
   console.log(city, 'cityCity');

   let content = (
      <Oux>
         {props.removeBanner ? null : (
            <section
               className={
                  props.removeSectionMargin
                     ? 'ph_main_sec search_sec search_banner'
                     : 'ph_main_sec pt_83 search_sec search_banner'
               }
               style={{
                  backgroundImage: 'url(images/background/hero_banner.png)',
               }}
            >
               <div className="container">
                  <div className="row">
                     <div className="col-sm-6 align-self-end1">
                        <header className="part_header_h wow fadeInUp mb-3">
                           <h1 className="ft_Weight_600">
                              Who Needs To Have Cash When You Have A Community  Of Professionals {' '}
                              Willing To Do Deals Differently!
                           </h1>
                           <h3>
                              Find What You Need, Offer What You Have and Build {' '}
                              What You Want Using Various Forms Of {' '}
                              Alternative Compensation, Such As: Barter, Trade, Equity,
                              {' '}Time Sharing, Success, Fees, Slicing Pie &amp; more...
                              <br />
                              <span class="fontIncrease">Let's Get Creative!</span>
                           </h3>
                           {/* <h1>
                              <span className="who_needs_cash">Who Needs To Have Cash When You Have</span> <br />
                              <center><strong>A Community  Of Professionals</strong> <br />{' '}
                              Willing To<strong> <span class="brLineXS"></span>Do Deals Differently!</strong></center>
                           </h1>
                           <h3>
                              <span className="find_what_you_need"><strong>Find</strong> What You Need,</span>{' '}
                              <span className="offer_what_you_have"><strong>Offer</strong> What You Have, </span><span className="build_what_you_want"><strong>Build</strong> What You Want To...</span>{' '}
                              <span className="using_text"><strong>Using</strong> Various Forms of</span>
                              <span className="single_line_text"><strong class="fontIncrease">  Alternative Compensation</strong></span>{' '}
                              <span class="brLineXS"></span>Such As: Barter, Trade, Equity, Time Sharing, Success
                      Fees, Slicing Pie &amp; more... <br /><br />

                              <strong class="fontIncrease">Let's Get Creative!</strong>
                           </h3> */}
                           <div class="linkWrap">
                              <CustomToolTip placement="bottom" text="Click Here Now to Sign Up!">
                                 <a
                                    href="javascript:void(0)"
                                    onClick={() =>
                                       props.history.push(routes.REGISTER)
                                    }
                                    className="ph_underline ph_link"
                                    style={{ fontSize: '20px' }}
                                 >
                                    Join Now For Free!
                                 </a>
                              </CustomToolTip>
                              <span className="free_upgrade" style={{ fontSize: '14px' }}> (Free Upgrade for Verified .edu)</span>
                           </div>
                        </header>
                     </div>
                     <div className="col-sm-6">
                        <div className="dph_image_col">
                           <div className="dph_image overlay_effect video_player">
                              {/* <div className="play_icon">
                                                <a href="javascript:void()" className="pi_inner_theme">
                                                    <img
                                                        src="/images/icons/icn_play_white.svg"
                                                        className="py_icon"
                                                        alt="play"
                                                    />
                                                </a>
                                            </div> */}
                              {/* <img
                                                src="/images/thumbnails/thumbnail14.jpg"
                                                className="dph_inner_image"
                                            /> */}
                              <VideoPlayer
                                 controlBar={true}
                                 videoURL={fetchHomePageVideoURL()}
                                 videoPoster="/custom_images/video_poster.png"
                              />
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </section>
         )}
         <PHByRickBarrera />
         {/* <section
            className={
               props.removeSectionMargin
                  ? 'search_sec pt_83 search_sec_home'
                  : 'search_sec search_sec_home'
            }>
            <div className="container-fluid">
               <div className="row">
                  
               </div>
            </div>
         </section> */}
         <section className={props.removeSectionMargin
            ? 'search_sec pt_83 search_sec_home ph_main_sec'
            : 'search_sec search_sec_home ph_main_sec'}>
            <div class="container">
               <div class="row">
                  <div
                     className="col-lg-12 col-xl-10 mx-auto"
                     style={props.style ? props.style : null}>
                     <Formik
                        initialValues={{
                           email: '',
                           first_name: '',
                           last_name: ''
                        }}
                        enableReinitialize={true}
                        onSubmit={(values) => {
                           props.history.push(routes.REGISTER, { signUpFormValues: { ...values } })
                           storage.set('redirectToPricing', true)
                           console.log(values)
                        }}
                        validationSchema={validateHomeSignUpForm}
                     >
                        {(formik_props) => {
                           const errors = formik_props.errors;
                           const touched = formik_props.touched;
                           return (
                              <div className="theme_user_inputs non_logged_in_form_wrapper">
                                 <Form
                                    className={
                                       props.removeSectionMargin
                                          ? 'ph_theme_form search_result_search_box mx-auto'
                                          : 'ph_theme_form mx-auto'
                                    }>
                                    <div className="email_wrapper">
                                       {/* <div className="search_icon">
                                             <img
                                                src="/images/icons/icn_search.svg"
                                                className="si_inner"
                                                alt="search"
                                             />
                                          </div> */}
                                       <Field
                                          name="email"
                                          type="email"
                                          id="home_email_field"
                                          className="form-control"
                                          style={errors.email && touched.email ? formInputErrorStyle : null}
                                          placeholder="Email Address (free upgrade for verified .edu)"
                                       />
                                       <span className="email_error_msg" style={formInputTextErrorStyle}>{errors.email && touched.email && errors.email}</span>
                                    </div>
                                    <div className="btn_wrapper">
                                       <button
                                          type="submit"
                                          className="btn btn-warning ph_theme_bg"
                                       >
                                          Sign Up For Free!
                                       </button>
                                    </div>
                                 </Form>
                              </div>
                           );
                        }}
                     </Formik>
                  </div>
                  <div class="col-lg-12 col-xl-10 mx-auto">
                     <header class="ph_header_headings text-center wow fadeInUp">
                        <h3>PartnerHere is the Best Place on the Web to Start or Grow Your Business... <br />Without Cash!</h3>
                        <p>Rick's video series, downloadable books and much more are currently FREE to new members!<br />No credit card required.</p>
                     </header>
                  </div>

               </div>
            </div>
         </section>
      </Oux>
   );
   if (props.user || props.history.location.pathname.includes(routes.HOME)) {
      const initialFormValues = {
         city: city ? city : '',
         query: props.selectedQuery ? props.selectedQuery : '',
         compensationId: '',
      };
      content = (
         <section
            className={
               props.removeSectionMargin
                  ? 'ph_main_sec ph_filter_sec'
                  : 'ph_main_sec pt_83 ph_filter_sec'
            }
         >
            <div
               style={props.removeSectionMargin ? { padding: '0' } : null}
               className={'container-fluid theme_px_60'}
            >
               <Formik
                  enableReinitialize={true}
                  initialValues={initialFormValues}
                  onSubmit={(values) => {
                     if (!error) {
                        if (
                           props.selectedCompensation &&
                           props.selectedCompensation.length > 0
                        ) {
                           values = {
                              ...values,
                              compensationId: props.selectedCompensation,
                           };
                        }
                        if (values.city) {
                           values = {
                              ...values,
                              city: values.city.split(',')[0],
                           };
                        }
                        props.onSubmitSearch({ ...values });
                        console.log(values, 'Values');
                     }
                  }}
               >
                  {(formik_props) => {
                     const errors = formik_props.errors;
                     const touched = formik_props.touched;
                     console.log(formik_props);
                     if (props.searchText.length > 0) {
                        getCityList(
                           formik_props.setFieldValue,
                           formik_props.setFieldError
                        );
                     }
                     if (props.compensations && props.compensations.length > 0) {
                        let eleIndex = props.compensations.findIndex(i => i.name === "Let's get Creative")
                        if (eleIndex) {
                           let firstElement = props.compensations[eleIndex]
                           props.compensations.splice(eleIndex, 1)
                           props.compensations.unshift(firstElement)
                        }
                     }
                     return (
                        <Form className="ph_theme_form" >
                           <div className="row" id="searchBox_walk">
                              <div className="col-sm-12">
                                 <header className="ph_header_headings wow fadeInUp mb-4">
                                    <h3 className="ft_Weight_600">
                                       Search For What You Need
                                    </h3>
                                 </header>
                              </div>
                              <div className="col-md-12 col-lg-8 col-xl-9">
                                 <div className="theme_user_inputs ph_filter_f_xs"
                                 >
                                    <div className="form-row">
                                       <div className="form-group col-md-5 col-lg-5 col-xl-5 ph_pl_8">
                                          <div className="search_icon">
                                             <img
                                                src="/images/icons/icn_search_gray.svg"
                                                className="si_inner"
                                                alt="search"
                                             />
                                          </div>
                                          <Field
                                             type="text"
                                             name="query"
                                             id="search_field_walk"
                                             className="form-control search_field"
                                             placeholder="Try ‘John Smith’, Advertising etc."
                                          />
                                       </div>
                                       <div className="form-group col-md-3 col-lg-3 col-xl-4">
                                          <div className="search_city_wrapper">
                                             <div
                                                className="search_icon close_icon_city_search"
                                                onClick={() => {
                                                   formik_props.setFieldValue(
                                                      'city',
                                                      ''
                                                   );
                                                   props.makeSearchTextStateEmpty();
                                                }}
                                             >
                                                <img
                                                   src="/images/icons/icn_close_gray.svg"
                                                   className="si_inner"
                                                   alt="search"
                                                />
                                             </div>
                                             <Field
                                                id="city"
                                                // id="city_walk"
                                                type="text"
                                                className="form-control"
                                                style={
                                                   error && touched.city
                                                      ? formInputErrorStyle
                                                      : null
                                                }
                                                name="city"
                                                value={formik_props.values.city}
                                                onChange={(e) =>
                                                   props.onCitySearchTextChangeHandler(
                                                      e,
                                                      formik_props.setFieldValue
                                                   )
                                                }
                                                // onFocus={props.onCityFocusHandler}
                                                autoComplete="off"
                                                placeholder="Search City"
                                             />
                                             <div
                                                ref={props.setWrapperRef}
                                                className="city-list city_list_container"
                                                style={{
                                                   display: props.searchInputFocus
                                                      ? 'block'
                                                      : 'none',
                                                }}
                                             >
                                                <ul
                                                   className="city_result_list"
                                                   id="myUL"
                                                >
                                                   {cityList}
                                                </ul>
                                             </div>
                                          </div>
                                          <span style={formInputTextErrorStyle}>
                                             {error && touched.city && error}
                                          </span>
                                          {/* <div className="select_city">
                                                            <div className="ms_inner collapsed" onClick={props.toggleCityDropdown}>
                                                                <div name="city" className="form-control select_modify">
                                                                    {
                                                                        props.cities && props.cities.length > 0
                                                                            ? props.cities.map((city, index) => {
                                                                                if (formik_props.values.city && city.city.toLowerCase() === formik_props.values.city.toLowerCase()) {
                                                                                    return <span>{`${city.city}, ${city.state}`}</span>
                                                                                } else {
                                                                                    return
                                                                                }
                                                                            })
                                                                            : null
                                                                    }
                                                                </div>
                                                                <div className="overselect"></div>
                                                            </div>
                                                            <div id="demo" className="city_list collapse">
                                                                {
                                                                    props.cities && props.cities.length > 0
                                                                        ? props.cities.map((city, index) => {
                                                                            return (
                                                                                <span onClick={() => { props.toggleCityDropdown(); formik_props.setFieldValue('city', `${city.city}`) }} className="city_title">{city.city}, {city.state}</span>
                                                                            )
                                                                        })
                                                                        : null
                                                                }
                                                            </div>
                                                        </div> */}
                                       </div>
                                       <div className="form-group col-md-4 col-lg-4 col-xl-3">
                                          <div id="select_walk" className="select_compensation">
                                             <div
                                                className="ms_inner collapsed"
                                                onClick={
                                                   props.toggleCompensationDropdown
                                                }
                                             >
                                                <select
                                                   name="compensationId"
                                                   className="form-control select_modify"
                                                >
                                                   {props.selectedCompensation &&
                                                      props.selectedCompensation
                                                         .length > 0 &&
                                                      props.selectedCompensation
                                                         .length <= 2 ? (
                                                      <option>
                                                         {props.selectedCompensation.map(
                                                            (
                                                               compensation,
                                                               index
                                                            ) => {
                                                               return props.compensations.map(
                                                                  (
                                                                     list,
                                                                     index
                                                                  ) => {
                                                                     if (
                                                                        compensation ===
                                                                        list.id
                                                                     ) {
                                                                        return `${list.name}, `;
                                                                     }
                                                                  }
                                                               );
                                                            }
                                                         )}
                                                      </option>
                                                   ) : props.selectedCompensation &&
                                                      props.selectedCompensation
                                                         .length > 2 ? (
                                                      <option>
                                                         {props.selectedCompensation.map(
                                                            (
                                                               compensation,
                                                               mainIndex
                                                            ) => {
                                                               return props.compensations.map(
                                                                  (
                                                                     list,
                                                                     index
                                                                  ) => {
                                                                     if (
                                                                        compensation ===
                                                                        list.id &&
                                                                        mainIndex <
                                                                        2
                                                                     ) {
                                                                        return `${list.name}, `;
                                                                     }
                                                                  }
                                                               );
                                                            }
                                                         )}
                                                         +{' '}
                                                         {props
                                                            .selectedCompensation
                                                            .length - 2}{' '}
                                                         More
                                                      </option>
                                                   ) : (
                                                      <option>
                                                         Select Compensation
                                                      </option>
                                                   )}
                                                </select>
                                                <div className="overselect"></div>
                                             </div>
                                             <div
                                                id="demo"
                                                className="checkbox_list collapse compensation_dropdown"
                                             >
                                                {/* <label className="select_check select_title">All</label> */}
                                                {props.compensations &&
                                                   props.compensations.length > 0
                                                   ? props.compensations.map(
                                                      (
                                                         compensation,
                                                         index
                                                      ) => {
                                                         if (
                                                            compensation.name
                                                               .toLowerCase()
                                                               .includes(
                                                                  'get creative'
                                                               ) &&
                                                            (!props.selectedCompensation ||
                                                               (props.selectedCompensation &&
                                                                  props
                                                                     .selectedCompensation
                                                                     .length ===
                                                                  0))
                                                         ) {
                                                            props.onSelectCompensation(
                                                               {
                                                                  target: {
                                                                     checked: true,
                                                                  },
                                                                  blockToggle: true,
                                                               },
                                                               compensation.id
                                                            );
                                                         }
                                                         return (
                                                            <Field
                                                               key={
                                                                  compensation.id
                                                               }
                                                               name="compensationId"
                                                            >
                                                               {({
                                                                  field, // { name, value, onChange, onBlur }
                                                                  form: {
                                                                     touched,
                                                                     errors,
                                                                  }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                                                  meta,
                                                               }) => (
                                                                  <label
                                                                     className="select_check"
                                                                     htmlFor={
                                                                        compensation.id
                                                                     }
                                                                  >
                                                                     <span
                                                                        className={
                                                                           compensation.name
                                                                              .toLowerCase()
                                                                              .includes(
                                                                                 'get creative'
                                                                              )
                                                                              ? 'label_title text-primary'
                                                                              : 'label_title'
                                                                        }
                                                                     >
                                                                        {
                                                                           compensation.name
                                                                        }
                                                                     </span>
                                                                     <input
                                                                        type="checkbox"
                                                                        checked={
                                                                           props.selectedCompensation &&
                                                                              props
                                                                                 .selectedCompensation
                                                                                 .length >
                                                                              0
                                                                              ? props.selectedCompensation.includes(
                                                                                 compensation.id
                                                                              )
                                                                              : false
                                                                        }
                                                                        onChange={(
                                                                           event
                                                                        ) =>
                                                                           props.onSelectCompensation(
                                                                              event,
                                                                              compensation.id
                                                                           )
                                                                        }
                                                                        className="check_box"
                                                                        id={
                                                                           compensation.id
                                                                        }
                                                                     />
                                                                     <span className="check_mark"></span>
                                                                  </label>
                                                               )}
                                                            </Field>
                                                         );
                                                      }
                                                   )
                                                   : null}
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              <div className="col-md-12 col-lg-4 col-xl-3">
                                 <div className="ph_btn_wrp ph_btn_wrp_xs">
                                    <button
                                       type="submit"
                                       className="theme_btn theme_primary theme_btn_lg text-uppercase ph_sea_btn_xs search_reset_btns"
                                       onClick={() => { handleStep(2) }}

                                    >
                                       Search
                                    </button>
                                    {/* <CustomToolTip placement="top" text="Shuffle the Offer/Want Ads cards">
                                                    <button type="button" onClick={props.onShuffleCards} className="rotated_btn ph_sufl_btn_xs">
                                                        <img src="/images/icons/icn_exchange.svg" className="icn_red" alt="Icon" />
                                                    </button>
                                                </CustomToolTip> */}
                                    <button
                                       onClick={props.resetSearch}
                                       type="button"
                                       className="theme_btn theme_outline_primary theme_btn_lg search_reset_btns text-uppercase ph_sea_btn_xs"
                                    >
                                       RESET ALL
                                    </button>
                                 </div>
                              </div>
                           </div>
                        </Form>
                     );
                  }}
               </Formik>
            </div>
         </section>
      );
   }
   return content;
};
const mapStateToProps = (state) => {
   return {

      goToStep: state.walkThroughReducer.goToStep
   };
};
const mapDispatchToProps = (dispatch) => {
   return {
      handleStepChange: (steps) => dispatch(actions.handleStepChange(steps))
   };
};
//export default SearchSection;
export default connect(mapStateToProps, mapDispatchToProps)(SearchSection);