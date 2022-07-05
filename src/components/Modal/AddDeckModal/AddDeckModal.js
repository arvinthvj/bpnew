import React, { useEffect, useRef, useState } from 'react';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import * as actions from '../../../redux/actions/index';
import {
   formInputTextErrorStyle,
   routes,
   formInputErrorStyle,
   SubscriptionStatus,
   SubscriptionType,
} from '../../../utility/constants/constants';
import { useDispatch, useSelector } from 'react-redux';
import { validateNewDeck } from '../../../utility/validator/formValidation/formValidation';
import LoadingBtn from '../../UI/LoadingButton/LoadingButton';
import Oux from '../../../hoc/Oux/Oux';

const AddDeckModal = (props) => {
   function usePrevious(value) {
      const ref = useRef();
      useEffect(() => {
         ref.current = value;
      });
      return ref.current;
   }

   const [isLoading, setIsLoading] = useState(false);
   const [disableDeckName, setDisableDeckName] = useState(false);
   const service = useSelector((state) => state.userReducer.service);
   const addDeckOrServiceLoading = useSelector(
      (state) => state.userReducer.addDeckOrServiceLoading
   );
   const deckList = useSelector((state) => state.userReducer.deckList);
   const prevDeckList = usePrevious(deckList);
   const dispatch = useDispatch();

   // const didMountRef = useRef(false);
   // useEffect(() => {
   //     if (didMountRef.current) {

   //         if ((deckList !== prevDeckList)) {

   //             setIsLoading(false);
   //         }
   //     } else {
   //         // dispatch(actions.getDeckList());
   //         didMountRef.current = true
   //     }
   // })

   const deckSelected = (deck, formikProps) => {
      // if (formikProps.values.deckId !== undefined) {
      //     if (formikProps.values.deckId[0] !== deck.id.toString() && formikProps.values.deckId !== false) {
      //         setDisableDeckName(true);
      //         delete formikProps.values.deckId[0];
      //         formikProps.setFieldValue('deckId', deck.id);
      //     } else {
      //         setDisableDeckName(false);
      //         formikProps.setFieldValue('deckId', false);
      //     }
      // } else {
      //     setDisableDeckName(true);
      // }
      // formikProps.setFieldValue('deck.name', '');
   };

   const getExistingDecks = (deckList, formikProps) => {
      if (deckList && deckList.length > 0) {
         if(formikProps.values.deckId !== undefined && formikProps.values.deck.name.length > 0){
            formikProps.values.deckId =[Math.max(...deckList.map((e) => {
               return e.id
            }))+1];
         }

         if(formikProps.values.deckId !== undefined && !formikProps.values.deck.name.length && formikProps.values.deckId.length && formikProps.values.deckId.filter((e) => 
         typeof(e) == "string").length){
            formikProps.values.deckId = formikProps.values.deckId.filter((e) => 
            typeof(e) == "string").map(
               (e) => e);
            //   return false;
         }

         return deckList.map((deck) => {
            return (
               <>
                  <li className="list-group-item">
                     <label
                        className="ph_container"
                        onClick={() => deckSelected(deck, formikProps)}
                     >
                        <span className="ph_check_title1">{deck.name}</span>
                        <Field
                           type="checkbox"
                           name="deckId"
                           value={deck.id.toString()}
                        />
                        <span className="ph_checkmark"></span>
                     </label>
                  </li>
               </>
            );
         });
      }
   };

   const addDeck = (
      values,
      { setSubmitting, setErrors, setStatus, resetForm, setFieldError }
   ) => {
      if (
         props.user.subscription_status.toLowerCase() ===
         SubscriptionStatus.ACTIVE.toLowerCase()
      ) {
         let highestSubscriptionType = null;
         props.user.subscriptions.map((subscription) => {
            if (
               props.user &&
               props.user.subscriptions &&
               props.user.subscriptions.length > 0
            ) {
               props.user.subscriptions.map((subscription, index) => {
                  if (
                     subscription.subcription_type.toLowerCase() ===
                     SubscriptionType.PLATINUM.toLowerCase()
                  ) {
                     highestSubscriptionType = SubscriptionType.PLATINUM;
                  }
               });
               if (!highestSubscriptionType) {
                  props.user.subscriptions.map((subscription, index) => {
                     if (
                        subscription.subcription_type.toLowerCase() ===
                        SubscriptionType.GOLD.toLowerCase()
                     ) {
                        highestSubscriptionType = SubscriptionType.GOLD;
                     }
                  });
               }
               if (!highestSubscriptionType) {
                  props.user.subscriptions.map((subscription, index) => {
                     if (
                        subscription.subcription_type.toLowerCase() ===
                        SubscriptionType.STARTUP_SPECIAL.toLowerCase()
                     ) {
                        highestSubscriptionType = SubscriptionType.STARTUP_SPECIAL;
                     }
                  });
               }
               if (!highestSubscriptionType) {
                  highestSubscriptionType = SubscriptionType.SILVER;
               }
            }
         });
         if (!highestSubscriptionType) {
            highestSubscriptionType = SubscriptionType.FREE;
         }
         let serviceid;

         if (service.id) {
            serviceid = service.id;
         } else if (service.profile.id) {
            serviceid = service.profile.id;
         }
         if (
            values.deckId &&
            values.deckId.length > 0 &&
            (!values.deck.name || values.deck.name === '')
         ) {
            dispatch(
               actions.addServiceToDeck(values.deckId, serviceid, resetForm)
            );
         } else {
            if (
               highestSubscriptionType.toLowerCase() ===
               SubscriptionType.SILVER.toLowerCase() &&
               deckList &&
               deckList.length >= 2
            ) {
               setFieldError(
                  'deck[name]',
                  'You need to upgrade your subscription to add more lists'
               );
            } else if (
               highestSubscriptionType.toLowerCase() ===
               SubscriptionType.GOLD.toLowerCase() &&
               deckList &&
               deckList.length >= 10
            ) {
               setFieldError(
                  'deck[name]',
                  'You have already created the maximum number of lists allowed!'
               );
            } else if (
               highestSubscriptionType.toLowerCase() ===
               SubscriptionType.PLATINUM.toLowerCase() &&
               deckList &&
               deckList.length >= 10
            ) {
               setFieldError(
                  'deck[name]',
                  'You have already created the maximum number of lists allowed!'
               );
            } else {
               if (values.deck.name === '') {
                  dispatch(
                     actions.addServiceToDeck(
                        values.deckId,
                        serviceid,
                        resetForm
                     )
                  );
               } else {
                  dispatch(actions.createDeck(values, serviceid, resetForm));
               }
            }
         }
      }
   };

   const resetForm = (resetForm) => {
      resetForm();
      setDisableDeckName(false);
   };

   return (
      <div
         data-backdrop="static"
         data-keyboard="false"
         className="modal fade p-0 show"
         id="add_deck_modal"
         tabIndex="-1"
         role="dialog"
         aria-labelledby="exampleModalCenterTitle"
         aria-hidden="true"
      >
         <div
            className="modal-dialog custom_modal modal-dialog-centered"
            role="document"
         >
            <div className="modal-content">
               {props.user ? (
                  <Formik
                     initialValues={{ deck: { name: '' }, deckId: [] }}
                     validate={validateNewDeck}
                     onSubmit={addDeck}
                  >
                     {(formikProps) => {
                        const errors = formikProps.errors;
                        const touched = formikProps.touched;
                        console.log(errors);
                        return (
                           <Form>
                              <div className="modal-header">
                                 <h5
                                    className="modal-title"
                                    id="exampleModalLongTitle"
                                 >
                                    Add to Saved List
                                 </h5>
                                 <a
                                    href="javascript:void();"
                                    type="button"
                                    className="close  p-0 m-0"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                    onClick={() =>
                                       resetForm(formikProps.resetForm)
                                    }
                                 >
                                    <img
                                       src="/images/icons/icn_close_black.svg"
                                       alt="Icon Close"
                                    />
                                 </a>
                              </div>

                              <div className="modal-body">
                                 <div className="media moblie_view">
                                    <div className="model_image_title">
                                       <div className="modal_user_image">
                                          <img
                                             className="align-self-start inner_image"
                                             src={
                                                service &&
                                                   service.profile.photo_urls.small
                                                   ? service.profile.photo_urls
                                                      .small
                                                   : '/custom_images/user.png'
                                             }
                                             alt="Jessica Cebral"
                                          />
                                       </div>
                                       <h4 className="h4_title">
                                          {service && service.profile.name}
                                       </h4>
                                       <p className="role_info">
                                          {service && service.profile.title}
                                       </p>
                                    </div>
                                    <div className="media-body">
                                       <h5 className="mt-0 deck_title pb-1">
                                          Create New List
                                       </h5>
                                       <p className="fontS13 text_gray_4">
                                          Group your items together!
                                       </p>
                                       <div className="ph_theme_form">
                                          <div className="form-group">
                                             <Field
                                                name="deck[name]"
                                                style={
                                                   errors &&
                                                      errors.deck &&
                                                      errors.deck.name
                                                      ? formInputErrorStyle
                                                      : null
                                                }
                                                disabled={
                                                   disableDeckName ||
                                                   (deckList &&
                                                      deckList.length >= 10)
                                                }
                                                type="text"
                                                className="form-control"
                                                id="inputCity"
                                                placeholder="Like team members to hire or companies I'm interested in."
                                             />
                                             <ErrorMessage
                                                name="deck[name]"
                                                render={(msg) => (
                                                   <span
                                                      style={
                                                         formInputTextErrorStyle
                                                      }
                                                   >
                                                      {msg}
                                                   </span>
                                                )}
                                             />
                                             {deckList &&
                                                deckList.length >= 10 ? (
                                                <span
                                                   style={
                                                      formInputTextErrorStyle
                                                   }
                                                >
                                                   You have already saved the
                                                   maximum number of decks
                                                   allowed!
                                                </span>
                                             ) : null}
                                          </div>
                                       </div>
                                       {deckList && deckList.length > 0 ? (
                                          <article className="accordion_head">
                                             <h5 className="acc_title">
                                                Saved Lists
                                             </h5>
                                          </article>
                                       ) : null}
                                       <ul className="list-group decks_checkbox">
                                          {getExistingDecks(
                                             deckList,
                                             formikProps
                                          )}

                                          {/* <li className="list-group-item">
                                                    <label className="ph_container">
                                                        <span className="ph_check_title1">Office Areas</span>
                                                        <input type="radio" name="deck" />
                                                        <span className="ph_checkmark"></span>
                                                    </label>
                                                </li>
                                                <li className="list-group-item">
                                                    <label className="ph_container">
                                                        <span className="ph_check_title1">Stores</span>
                                                        <input type="radio" name="deck" />
                                                        <span className="ph_checkmark"></span>
                                                    </label>
                                                </li>
                                                <li className="list-group-item">
                                                    <label className="ph_container">
                                                        <span className="ph_check_title1">Marketing Manager</span>
                                                        <input type="radio" name="deck" />
                                                        <span className="ph_checkmark"></span>
                                                    </label>
                                                </li> */}
                                       </ul>
                                    </div>
                                 </div>
                              </div>
                              <div className="modal-footer">
                                 <button
                                    href="javascript: void(0)"
                                    className="theme_btn theme_btn_gray min_w110"
                                    data-dismiss="modal"
                                    onClick={() =>
                                       resetForm(formikProps.resetForm)
                                    }
                                 >
                                    Cancel
                                 </button>
                                 {addDeckOrServiceLoading ? (
                                    <LoadingBtn
                                       btnClassName="theme_btn theme_primary text-uppercase ml-2"
                                       btnTitle="Loading"
                                    />
                                 ) : (
                                    <button
                                       type="submit"
                                       href="javascript: void(0)"
                                       className="theme_btn theme_primary min_w110"
                                    >
                                       Add
                                    </button>
                                 )}
                              </div>
                           </Form>
                        );
                     }}
                  </Formik>
               ) : (
                  <div className="modal-body text-center">
                     <p className="mb-3">
                        To create decks and add offers to it, you need to{' '}
                        <b>log in</b>.
                     </p>
                     <div className="d-flex justify-content-center">
                        <a
                           href="javascript:void(0)"
                           data-dismiss="modal"
                           className="form_link ft_Weight_500 ph_underline"
                        >
                           [Cancel]
                        </a>
                        <a
                           onClick={() => {
                              props.history.push(routes.LOGIN);
                           }}
                           data-dismiss="modal"
                           href="javascript:void(0)"
                           className="form_link ft_Weight_500 ph_underline ml-2"
                        >
                           [Login]
                        </a>
                     </div>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};

export default AddDeckModal;
