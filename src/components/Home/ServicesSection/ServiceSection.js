import React, { useEffect } from 'react';
import * as actions from '../../../redux/actions/index';
import { useDispatch } from 'react-redux';
import $ from 'jquery';
import Oux from '../../../hoc/Oux/Oux';
import {
   routes,
   Get_Started_Sections_ID,
   Get_Started_Sections_CLASS_NAME,
   CategoriesList,
   SubscriptionType,
} from '../../../utility/constants/constants';
import './ServiceSection.css';
import { scrollToDiv } from '../../../utility/utility';
import CustomToolTip from '../../UI/CustomToolTip/CustomToolTip';
import { NavLink } from 'react-router-dom';

const ServiceSection = (props) => {
   const dispatch = useDispatch();
   const createClassifiedAdd = (val) => {
      props.history.push(routes.CLASSIFIEDS);
      dispatch(actions.createClassifiedAddClicked(val));
   };
   const handleStep = (steps) => {
      dispatch(actions.handleStepChange(steps))
   }

   let highestSubscriptionType = null;
   if (props.user && props.user.subscriptions && props.user.subscriptions.length > 0) {
      props.user.subscriptions.map((subscription, index) => {
         if (subscription.subcription_type.toLowerCase() === SubscriptionType.PLATINUM.toLowerCase()) {
            highestSubscriptionType = SubscriptionType.PLATINUM;
         }
      });
      if (!highestSubscriptionType) {
         props.user.subscriptions.map((subscription, index) => {
            if (subscription.subcription_type.toLowerCase() === SubscriptionType.GOLD.toLowerCase()) {
               highestSubscriptionType = SubscriptionType.GOLD;
            }
         });
      }
      if (!highestSubscriptionType) {
         props.user.subscriptions.map((subscription, index) => {
            if (subscription.subcription_type.toLowerCase() === SubscriptionType.SILVER.toLowerCase()) {
               highestSubscriptionType = SubscriptionType.SILVER;
            }
         });
      }
      if (!highestSubscriptionType) {
         highestSubscriptionType = SubscriptionType.FREE;
      }
   }

   const onClickGetStartedIcons = (event) => {
      let elementClassName =
         event.target.offsetParent.firstElementChild.className;
      if (
         elementClassName.includes(
            Get_Started_Sections_CLASS_NAME.CREATE_NEW_PROFILE
         )
      ) {
         elementClassName = Get_Started_Sections_CLASS_NAME.CREATE_NEW_PROFILE;
      } else if (
         elementClassName.includes(
            Get_Started_Sections_CLASS_NAME.FIND_AND_COLLABORATE
         )
      ) {
         elementClassName =
            Get_Started_Sections_CLASS_NAME.FIND_AND_COLLABORATE;
      } else if (
         elementClassName.includes(
            Get_Started_Sections_CLASS_NAME.TOOLS_FOR_SUCCESS
         )
      ) {
         elementClassName = Get_Started_Sections_CLASS_NAME.TOOLS_FOR_SUCCESS;
      } else if (
         elementClassName.includes(
            Get_Started_Sections_CLASS_NAME.LAUNCH_YOUR_BUSINESS
         )
      ) {
         elementClassName =
            Get_Started_Sections_CLASS_NAME.LAUNCH_YOUR_BUSINESS;
      }
      props.history.push(routes.GET_STARTED, {
         elementClassName: elementClassName,
      });
   };

   let content = (
      <Oux>
         <section className="ph_main_sec service_sec">
            <div className="container">
               <div className="row">
                  <div className="col-sm-12">
                     <header className="ph_header_headings text-center wow fadeInUp">
                        <h1>The PartnerHere Process</h1>
                     </header>
                  </div>
                  <div className="col-sm">
                     <a
                        onClick={() => props.history.push(routes.REGISTER)}
                        className={`service_card text-center ${Get_Started_Sections_CLASS_NAME.CREATE_NEW_PROFILE}`}
                        href="javascript:void()"
                     >
                        <div className="service_icon shadow1 wow rotateIn">
                           <img
                              src="/images/icons/icn_profile_black.svg"
                              className="service_icon_black"
                              alt="Find your perfect partner"
                           />
                           <img
                              src="/images/icons/icn_profile_orange.svg"
                              className="service_icon_red"
                              alt="Find your perfect partner"
                           />
                        </div>
                        <div className="clearfix"></div>
                        <h4 className="card-title wow fadeInUp">
                           Create your Profile
                     </h4>
                     </a>
                  </div>
                  <div className="col-sm">
                     <a
                        onClick={() => props.history.push(routes.REGISTER)}
                        className={`service_card text-center ${Get_Started_Sections_CLASS_NAME.FIND_AND_COLLABORATE}`}
                        href="javascript:void()"
                     >
                        <div className="service_icon shadow1 wow rotateIn">
                           <img
                              src="/images/icons/icn_collaborate_black.svg"
                              className="service_icon_black"
                              alt="Validate & Collaborate"
                           />
                           <img
                              src="/images/icons/icn_collaborate_orange.svg"
                              className="service_icon_red"
                              alt="Validate & Collaborate"
                           />
                        </div>
                        <div className="clearfix"></div>
                        <h4 className="card-title wow fadeInUp">
                           Find & Collaborate
                     </h4>
                     </a>
                  </div>
                  <div className="col-sm">
                     <a
                        className={`service_card text-center ${Get_Started_Sections_CLASS_NAME.TOOLS_FOR_SUCCESS}`}
                        href={routes.BLOG}
                        target="_blank"
                     >
                        <div className="service_icon shadow1 wow rotateIn">
                           <img
                              src="/images/icons/icn_tools_success_black.svg"
                              className="service_icon_black"
                              alt="Tools for success"
                           />
                           <img
                              src="/images/icons/icn_tools_success_orange.svg"
                              className="service_icon_red"
                              alt="Tools for success"
                           />
                        </div>
                        <div className="clearfix"></div>
                        <h4 className="card-title wow fadeInUp">
                           Tools for success
                     </h4>
                     </a>
                  </div>
                  <div className="col-sm">
                     <a
                        onClick={onClickGetStartedIcons}
                        className={`service_card text-center ${Get_Started_Sections_CLASS_NAME.LAUNCH_YOUR_BUSINESS}`}
                        href="javascript:void()"
                     >
                        <div className="service_icon shadow1 wow rotateIn">
                           <img
                              src="/images/icons/icn_launch_black.svg"
                              className="service_icon_black"
                              alt="Stop Procrastinating"
                           />
                           <img
                              src="/images/icons/icn_launch_orange.svg"
                              className="service_icon_red"
                              alt="Stop Procrastinating"
                           />
                        </div>
                        <div className="clearfix"></div>
                        <h4 className="card-title wow fadeInUp">
                           Launch your Business
                     </h4>
                     </a>
                  </div>
               </div>
            </div>
         </section>
         <section class="ph_main_sec pb-0">
            <div class="container text-center">
               <NavLink to={routes.GET_STARTED} className="theme_primary theme_btn">Click Here to Get Started for Free</NavLink>
            </div>
         </section>
      </Oux>
   );
   if (props.searchResults && props.searchResults.length > 0 && props.user) {
      content = null;
   }
   if (props.user || props.history.location.pathname.includes(routes.HOME)) {
      content = (
         <section className="filter_slider">
            <div className="container-fluid theme_px_60">
               <div className="row">
                  <div className="col-sm-12">
                     <a
                        href="javascript:void()"
                        id="toggle_btn_filter"
                        onClick={() => {
                           $('#filter_list').toggle('slow');

                        }}
                        className="theme_btn theme_primary"
                     >
                        Show Only{' '}
                        <img
                           src="/images/icons/icn_filter_white.png"
                           className="icn_red"
                           alt="Filters"
                        />{' '}
                     </a>
                     <a onClick={() => { handleStep(3) }}>
                        <div className="reset_btn_wrapper">
                           <ul
                              className="filter_list ph_hidden_xs"
                              id="filter_list"
                              id="filter_list_walk"

                           >
                              {props.categories && props.categories.length > 0 ? (
                                 <Oux>
                                    <li className="filter_item filter_item_label">
                                       <a
                                          href="javascript:void(0)"
                                          className="ph_filter_link"
                                       >
                                          Show Only
                                    </a>
                                    </li>

                                    {props.categories.map((category, index) => {
                                       let tooltipText = null;
                                       let categoryName = null;
                                       if (
                                          category.name.toLowerCase() ===
                                          CategoriesList.PEOPLE.toLowerCase()

                                       ) {
                                          tooltipText =
                                             'Networking and Connections';

                                       } else if (
                                          category.name.toLowerCase() ===
                                          CategoriesList.PLACES.toLowerCase()
                                       ) {
                                          tooltipText = 'Physical Locations';
                                       } else if (
                                          category.name.toLowerCase() ===
                                          CategoriesList.THING.toLowerCase()
                                       ) {
                                          tooltipText = 'Physical Objects';
                                       } else if (
                                          category.name.toLowerCase() ===
                                          CategoriesList.JOB.toLowerCase()
                                       ) {
                                          tooltipText =
                                             'Skills, Expertise and Talent';
                                          categoryName = 'Services';
                                       } else if (
                                          category.name.toLowerCase() ===
                                          CategoriesList.OPPORTUNITY.toLowerCase()
                                       ) {
                                          tooltipText =
                                             'eBooks, Tutorials, White Papers, etc.';
                                          categoryName = 'Information';
                                       } else if (
                                          category.name.toLowerCase() ===
                                          CategoriesList.DONATION.toLowerCase()
                                       ) {
                                          tooltipText =
                                             "Anything That Doesn't Fit Another Category";
                                          categoryName = 'Other/Misc';
                                       }
                                       console.log(tooltipText, "tooltipTEXT")
                                       return (
                                          <Oux key={category.id}>
                                             {tooltipText ? (
                                                <CustomToolTip
                                                   placement="top"
                                                   text={tooltipText}
                                                >
                                                   <li
                                                      key={category.id}
                                                      className="filter_item"
                                                   >
                                                      <a
                                                         href="javascript:void(0)"
                                                         id={category.id}
                                                         onClick={
                                                            props.isSearchLoading
                                                               ? null
                                                               : (event) =>
                                                                  props.onSelectFilter(
                                                                     event,
                                                                     category
                                                                  )


                                                         }
                                                         className={
                                                            props.selectedFilter.includes(
                                                               category.id
                                                            )
                                                               ? 'ph_filter_link active'
                                                               : 'ph_filter_link'
                                                         }
                                                      >
                                                         {categoryName
                                                            ? categoryName
                                                            : category.name}
                                                      </a>
                                                   </li>
                                                </CustomToolTip>
                                             ) :  (
                                             <li
                                                key={category.id}
                                                className="filter_item"
                                             >
                                                <a
                                                   href="javascript:void(0)"
                                                   id={category.id}
                                                   onClick={
                                                      props.isSearchLoading
                                                         ? null
                                                         : (event) =>
                                                            props.onSelectFilter(
                                                               event,
                                                               category
                                                            )
                                                   }
                                                   className={
                                                      props.selectedFilter.includes(
                                                         category.id
                                                      )
                                                         ? 'ph_filter_link active'
                                                         : 'ph_filter_link'
                                                   }
                                                >
                                                   {categoryName
                                                      ? categoryName
                                                      : category.name}
                                                </a>
                                             </li>
                                          )}
                                       </Oux>
                                    );
                                 })}
                                 <CustomToolTip
                                    placement="top"
                                    text="What Others Need But Can't Find"
                                 >
                                    <li className="filter_item">
                                       <a
                                          href="javascript:void(0)"
                                          id="classified_filter"
                                          onClick={
                                             props.isSearchLoading
                                                ? null
                                                : (event) =>
                                                   props.onSelectClassifiedFilter(
                                                      event
                                                   )
                                          }
                                          className={
                                             props.selectedClassified
                                                ? 'ph_filter_link active'
                                                : 'ph_filter_link'
                                          }
                                       >
                                          Want Ads
                                       </a>
                                       </li>
                                    </CustomToolTip>
                                    {/* <CustomToolTip placement="top" text="What Others Need But Can't Find"> */}
                                    {/* <li className="filter_item">
                                    <a
                                       href="javascript:void(0)"
                                       id="company_filter"
                                       onClick={
                                          props.isSearchLoading
                                             ? null
                                             : (event) =>
                                                  props.onSelectCompanyFilter(
                                                     event
                                                  )
                                       }
                                       className={
                                          props.selectedCompany
                                             ? 'ph_filter_link active'
                                             : 'ph_filter_link'
                                       }
                                    >
                                       Businesses
                                    </a>
                                 </li> */}
                                    {/* </CustomToolTip> */}
                                 </Oux>
                              ) : null}
                           </ul>
                           <CustomToolTip
                              placement="top"
                              text="Shuffle the Offer/Want Ads cards"
                           >
                              <button
                                 type="button"
                                 onClick={props.onShuffleCards}
                                 className="rotated_btn ph_sufl_btn_xs"
                              >
                                 <img
                                    src="/images/icons/icn_exchange.svg"
                                    className="icn_red"
                                    alt="Icon"
                                 />
                              </button>
                           </CustomToolTip>
                        </div>
                     </a>
                     <div className="post_classified reset_btn_wrapper">
                        <span id="post_want_add_walk">
                           Can't find what you are looking for?{' '}
                           <CustomToolTip
                              placement="top"
                              text="Manage My Want Ads"
                           >
                              <a
                                 href="javascript:void(0)"
                                 onClick={() => {
                                    createClassifiedAdd(true)
                                    if (
                                       highestSubscriptionType &&
                                       highestSubscriptionType.toLowerCase() === SubscriptionType.SILVER.toLowerCase()
                                    ) {
                                       setTimeout(() => {
                                          handleStep(2)
                                       }, 2000)
                                    } else if (
                                       highestSubscriptionType &&
                                       highestSubscriptionType.toLowerCase() === SubscriptionType.PLATINUM.toLowerCase()
                                    ) {
                                       setTimeout(() => {
                                          handleStep(2)
                                       }, 2000)
                                    } else if (
                                       highestSubscriptionType &&
                                       highestSubscriptionType.toLowerCase() === SubscriptionType.GOLD.toLowerCase()
                                    ) {
                                       setTimeout(() => {
                                          handleStep(2)
                                       }, 2000)
                                    } else {
                                       handleStep(101)
                                    }
                                 }}
                                 className="ph_underline text-primary"
                              >
                                 Post a Want Ad.
                              </a>
                           </CustomToolTip>
                        </span>
                        {/* <button type="button" onClick={props.onShuffleCards} className="rotated_btn ph_sufl_btn_xs">
                                    <img src="/images/icons/icn_exchange.svg" className="icn_red" alt="Icon" />
                                </button> */}
                     </div>
                     {/* <a onClick={props.resetSearch} href="javascript:void(0)" style={{ fontWeight: '700' }} className="btn-block theme_btn theme_primary mobile_reset_btn">Reset Search</a> */}
                  </div>
               </div>
            </div>
         </section>
      );
   }
   return content;
};

export default ServiceSection;
