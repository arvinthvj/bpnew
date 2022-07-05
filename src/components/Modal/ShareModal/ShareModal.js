import React, { useState, useRef, useEffect } from 'react';
import {
   FacebookShareButton,
   EmailShareButton,
   WhatsappShareButton,
   TwitterShareButton,
} from 'react-share';
import { WEB_URL } from '../../../config';
import { connect } from 'react-redux';
import {
   CategoriesList,
   routes,
   SubscriptionStatus,
} from '../../../utility/constants/constants';
import $ from 'jquery';
import * as actions from '../../../redux/actions/index';
import './ShareModal.css';
import Snackbar from '../../UI/Snackbar/Snackbar';
import Oux from '../../../hoc/Oux/Oux';

const ShareModal = (props) => {
   const [copyLinkText, setCopyLinkText] = useState('Copy Link');
   const [chatName, setChatName] = useState('');
   const textAreaRef = useRef(null);

   const onChangeChatName = (event) => {
      setChatName(event.target.value);
   };

   const onSubmitChatName = (event) => {
      //api call
      event.preventDefault();
      if (chatName.length >= 3) {
         props.searchUserByName(chatName);
      }
   };

   const onClickPartnerHereMessage = () => {
      if (
         props.user.subscription_status.toLowerCase() ===
         SubscriptionStatus.ACTIVE.toLowerCase()
      ) {
         $('#partnerHere_message_form').toggle();
      } else {
         window.$('#icn_share').modal('toggle');
         window.$('#subscription_modal').modal();
      }
   };

   const onClickUserName = (profile) => {
      console.log(shareURL);
      if (
         profile.subscription_status.toLowerCase() ===
         SubscriptionStatus.ACTIVE.toLowerCase()
      ) {
         let updatedProfile = { ...profile };
         updatedProfile.user_id = profile.id;
         props.updatedIsSharingViaMsg(true);
         props.updateConversationReceiver(updatedProfile);
         setChatName('');
         props.searchUserByNameEmpty();
         $('#partnerHere_message_form').toggle();
         window.$('#icn_share').modal('toggle');
         props.history.push(routes.MESSAGES);
      } else {
         $('#snackbar').addClass('show');
         setTimeout(() => {
            $('#snackbar').removeClass('show');
         }, 3000);
      }
   };

   const copyToClipboard = () => {
      textAreaRef.current.select();
      document.execCommand('copy');
      setCopyLinkText('Link Copied');
      setTimeout(() => {
         setCopyLinkText('Copy Link');
      }, 3000);
   };

   const sendMail = () => {
      // Construct a mailto: URL with all the details:
      let shareURL = props.shareURL
         ? props.shareURL
         : `${WEB_URL()}${window.location.pathname}`;
      let subject = null;
      let msg = null;
      if (
         props.user &&
         props.service.profile.user_id === props.user.id.toString()
      ) {
         if (
            props.service.type.toLowerCase() ===
            CategoriesList.WANT_AD.key.toLowerCase()
         ) {
            subject = ` I’m Seeking ${props.service.title} on PartnerHere.com`;
            msg = `I’m Seeking this on PartnerHere.com: ${props.service.title} ${shareURL}`;
         } else {
            subject = `I’m Offering ${props.service.title} on PartnerHere.com`;
            msg = `I’m Offering this on PartnerHere.com: ${props.service.title} ${shareURL}`;
         }
      } else {
         if (
            props.service.type.toLowerCase() ===
            CategoriesList.WANT_AD.key.toLowerCase()
         ) {
            subject = ` Someone’s Seeking ${props.service.title} on PartnerHere.com`;
            msg = `Someone’s Seeking this on PartnerHere.com: ${props.service.title} ${shareURL}`;
         } else {
            subject = `Someone’s Offering ${props.service.title} on PartnerHere.com`;
            msg = `Check out this Offer on PartnerHere.com: ${props.service.title} ${shareURL}`;
         }
      }
      window.open('mailto:?subject=' + subject + '&body=' + msg);
   };

   let shareURL = props.shareURL
      ? props.shareURL
      : `${WEB_URL()}${window.location.pathname}`;
   console.log(shareURL, 'shareURL');
   let shareMsg = null;
   if (props.service) {
      if (
         props.user &&
         props.service.profile && props.service.profile.user_id === props.user.id.toString()
      ) {
         if (
            props.service.type.toLowerCase() ===
            CategoriesList.WANT_AD.key.toLowerCase()
         ) {
            shareMsg = `I’m Seeking this on PartnerHere.com: ${props.service.title}`;
         } else {
            shareMsg = `I’m Offering this on PartnerHere.com: ${props.service.title}`;
         }
      } else {
         if (
            props.service.type.toLowerCase() ===
            CategoriesList.WANT_AD.key.toLowerCase()
         ) {
            shareMsg = `Someone’s Seeking this on PartnerHere.com: ${props.service.title}`;
         } else {
            shareMsg = `Check out this Offer on PartnerHere.com: ${props.service.title}`;
         }
      }
   }
   return (
      <Oux>
         <div
            className="modal fade p-0 ph_custom_modal"
            id="icn_share"
            tabIndex="-1"
            data-backdrop="static"
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
         >
            <div className="modal-dialog modal-dialog-centered" role="document">
               <div className="modal-content">
                  <div className="modal-body">
                     <div className="modal_close modal_close_container">
                        <div className="heading_block">
                           <h1>Share</h1>
                        </div>
                        <a
                           href="javascript:void(0);"
                           onClick={() => {
                              setChatName('');
                              props.searchUserByNameEmpty();
                              $('#partnerHere_message_form').toggle();
                           }}
                           className="custom-modal-close"
                           id="close_share_modal_btn"
                           data-dismiss="modal"
                        >
                           <svg
                              viewBox="0 0 24 24"
                              role="presentation"
                              aria-hidden="true"
                              focusable="false"
                              style={{
                                 height: '16px',
                                 width: '16px',
                                 display: 'block',
                                 fill: 'rgb(118, 118, 118)',
                              }}
                           >
                              <path
                                 d="m23.25 24c-.19 0-.38-.07-.53-.22l-10.72-10.72-10.72 10.72c-.29.29-.77.29-1.06 0s-.29-.77 0-1.06l10.72-10.72-10.72-10.72c-.29-.29-.29-.77 0-1.06s.77-.29 1.06 0l10.72 10.72 10.72-10.72c.29-.29.77-.29 1.06 0s .29.77 0 1.06l-10.72 10.72 10.72 10.72c.29.29.29.77 0 1.06-.15.15-.34.22-.53.22"
                                 fill-rule="evenodd"
                              />
                           </svg>
                        </a>
                     </div>
                     <ul className="share_list">
                        {props.user ? (
                           <li class="share_items">
                              <a
                                 class="share_links"
                                 onClick={() => onClickPartnerHereMessage()}
                                 href="javascript:void();"
                                 id="partnerHere_message"
                              >
                                 <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                    version="1.1"
                                    x="0px"
                                    y="0px"
                                    viewBox="0 0 1000 1000"
                                    enable-background="new 0 0 1000 1000"
                                    xmlSpace="preserve"
                                    style={{
                                       height: '18px',
                                       width: '18px',
                                       display: 'block',
                                       fill: 'rgb(72, 72, 72)',
                                    }}
                                 >
                                    <metadata>
                                       {' '}
                                       Svg Vector Icons :
                                       http://www.onlinewebfonts.com/icon{' '}
                                    </metadata>
                                    <g>
                                       <path d="M892,818.4h-79.3l-70.8,122.7L529.4,818.4H108c-54.1,0-98-43.9-98-98V156.9c0-54.1,43.9-98,98-98h784c54.1,0,98,43.9,98,98v563.5C990,774.5,946.1,818.4,892,818.4z M916.5,132.4h-833v612.5h463.9l170.1,98.2l56.7-98.2h142.4V132.4z M181.5,585.7c0-20.3,16.5-36.8,36.8-36.8h563.5c20.3,0,36.8,16.5,36.8,36.8c0,20.3-16.5,36.8-36.8,36.8H218.3C198,622.4,181.5,606,181.5,585.7z M781.8,475.4H218.3c-20.3,0-36.8-16.5-36.8-36.8c0-20.3,16.5-36.8,36.8-36.8h563.5c20.3,0,36.8,16.5,36.8,36.8C818.5,459,802,475.4,781.8,475.4z M585.8,328.4H218.3c-20.3,0-36.8-16.5-36.8-36.7c0-20.3,16.5-36.8,36.8-36.8h367.5c20.3,0,36.8,16.5,36.8,36.8C622.5,312,606,328.4,585.8,328.4z" />
                                    </g>
                                 </svg>
                                 <span class="share_icn_name">
                                    PartnerHere message
                                 </span>
                              </a>
                              <form
                                 onSubmit={onSubmitChatName}
                                 id="partnerHere_message_form"
                              >
                                 <div class="form_group_modify">
                                    <label class="label_modify">Name</label>
                                    <div class="input-group">
                                       <input
                                          autoComplete="off"
                                          type="text"
                                          value={chatName}
                                          onChange={onChangeChatName}
                                          class="input_modify form-control"
                                          id="name"
                                          placeholder="Name"
                                          aria-label="Recipient's username"
                                          aria-describedby="basic-addon2"
                                       />
                                       <div class="input-group-append">
                                          <span
                                             onClick={onSubmitChatName}
                                             class="input-group-text"
                                             id="basic-addon2"
                                          >
                                             <i class="fa fa-search"></i>{' '}
                                          </span>
                                       </div>
                                    </div>
                                    <div className="search_city_wrapper">
                                       <div className="city-list city_list_container">
                                          <ul
                                             className="city_result_list"
                                             id="myUL"
                                          >
                                             {props.searchUserByNameResults &&
                                                props.searchUserByNameResults
                                                   .length > 0
                                                ? props.searchUserByNameResults.map(
                                                   (profile) => {
                                                      return (
                                                         <li
                                                            className="result_items"
                                                            key={profile.id}
                                                            onClick={() =>
                                                               onClickUserName(
                                                                  profile
                                                               )
                                                            }
                                                         >
                                                            <a
                                                               href="javascript:void(0)"
                                                               className="text_result"
                                                            >
                                                               <span className="search_tagline">{`${profile.first_name} ${profile.last_name}`}</span>
                                                            </a>
                                                         </li>
                                                      );
                                                   }
                                                )
                                                : null}
                                          </ul>
                                       </div>
                                    </div>
                                 </div>
                              </form>
                           </li>
                        ) : null}
                        <li className="share_items">
                           <FacebookShareButton
                              className="icoFacebook"
                              quote={shareMsg}
                              url={shareURL}
                           >
                              <a className="share_links" data-dismiss="modal">
                                 <svg
                                    viewBox="0 0 32 32"
                                    role="presentation"
                                    aria-hidden="true"
                                    focusable="false"
                                    style={{
                                       height: '18px',
                                       width: '18px',
                                       display: 'block',
                                       fill: 'rgb(72, 72, 72)',
                                    }}
                                 >
                                    <path
                                       d="m8 14.41v-4.17c0-.42.35-.81.77-.81h2.52v-2.08c0-4.84 2.48-7.31 7.42-7.35 1.65 0 3.22.21 4.69.64.46.14.63.42.6.88l-.56 4.06c-.04.18-.14.35-.32.53-.21.11-.42.18-.63.14-.88-.25-1.78-.35-2.8-.35-1.4 0-1.61.28-1.61 1.73v1.8h4.52c.42 0 .81.42.81.88l-.35 4.17c0 .42-.35.71-.77.71h-4.21v16c0 .42-.35.81-.77.81h-5.21c-.42 0-.8-.39-.8-.81v-16h-2.52a.78.78 0 0 1 -.78-.78"
                                       fill-rule="evenodd"
                                    ></path>
                                 </svg>
                                 <span className="share_icn_name">
                                    Facebook
                                 </span>
                              </a>
                           </FacebookShareButton>
                        </li>
                        <li className="share_items">
                           <TwitterShareButton title={shareMsg} url={shareURL}>
                              <a className="share_links" data-dismiss="modal">
                                 <svg
                                    viewBox="0 0 32 32"
                                    role="presentation"
                                    aria-hidden="true"
                                    focusable="false"
                                    style={{
                                       height: '18px',
                                       width: '18px',
                                       display: 'block',
                                       fill: 'rgb(72, 72, 72)',
                                    }}
                                 >
                                    <path
                                       d="m31 6.36c-1.16.49-2.32.82-3.55.95 1.29-.76 2.22-1.87 2.72-3.38a13.05 13.05 0 0 1 -3.91 1.51c-1.23-1.28-2.75-1.94-4.51-1.94-3.41 0-6.17 2.73-6.17 6.12 0 .49.07.95.17 1.38-4.94-.23-9.51-2.6-12.66-6.38-.56.95-.86 1.97-.86 3.09 0 2.07 1.03 3.91 2.75 5.06-1-.03-1.92-.3-2.82-.76v.07c0 2.89 2.12 5.42 4.94 5.98-.63.17-1.16.23-1.62.23-.3 0-.7-.03-1.13-.13a6.07 6.07 0 0 0 5.74 4.24c-2.22 1.74-4.78 2.63-7.66 2.63-.56 0-1.06-.03-1.43-.1 2.85 1.84 6 2.76 9.41 2.76 7.29 0 12.83-4.01 15.51-9.3 1.36-2.66 2.02-5.36 2.02-8.09v-.46c-.03-.17-.03-.3-.03-.33a12.66 12.66 0 0 0 3.09-3.16"
                                       fillRule="evenodd"
                                    ></path>
                                 </svg>
                                 <span className="share_icn_name">Twitter</span>
                              </a>
                           </TwitterShareButton>
                        </li>
                        <li className="share_items">
                           <WhatsappShareButton url={`${shareMsg} ${shareURL}`}>
                              <a className="share_links" data-dismiss="modal">
                                 {/* <svg viewBox="0 0 32 32" role="presentation" aria-hidden="true" focusable="false" style={{ height: "18px", width: "18px", display: "block", fill: "rgb(72, 72, 72)" }}><path d="m17.59 19.95-4.07-4.35-7.95 4.35 8.74-9.28 4.17 4.35 7.85-4.35zm-1.59-19.95c-8.84 0-16 6.63-16 14.82 0 4.66 2.33 8.82 5.96 11.54v5.64l5.45-2.99a17.24 17.24 0 0 0 4.59.62c8.84 0 16-6.63 16-14.82 0-8.18-7.16-14.81-16-14.81z" fillRule="evenodd"></path></svg> */}
                                 <svg
                                    viewBox="0 0 32 32"
                                    role="presentation"
                                    aria-hidden="true"
                                    focusable="false"
                                    style={{
                                       height: '18px',
                                       width: '18px',
                                       display: 'block',
                                       fill: 'rgb(72, 72, 72)',
                                    }}
                                 >
                                    <path
                                       d="m23.37 21.18c-.31.87-1.8 1.66-2.52 1.77-.65.1-1.46.14-2.35-.15a21.13 21.13 0 0 1 -2.13-.78c-3.74-1.61-6.19-5.36-6.38-5.61s-1.52-2.01-1.52-3.84.97-2.73 1.31-3.1.75-.46 1-.46.5 0 .71.01c.23.01.54-.09.84.64.31.75 1.06 2.57 1.15 2.76.09.18.16.4.03.65-.12.25-.19.4-.37.62-.19.22-.39.48-.56.65-.19.19-.38.39-.16.76s.97 1.59 2.08 2.58c1.43 1.26 2.63 1.66 3 1.84.37.19.59.16.81-.09s.93-1.09 1.18-1.46.5-.31.84-.19 2.18 1.02 2.55 1.21.62.28.72.43c.09.16.09.9-.22 1.77m3.26-15.82a14.88 14.88 0 0 0 -10.57-4.36c-8.23 0-14.94 6.67-14.94 14.87a14.78 14.78 0 0 0 1.99 7.43l-2.12 7.7 7.92-2.07a14.98 14.98 0 0 0 7.14 1.81h.01c8.23 0 14.93-6.67 14.94-14.87a14.74 14.74 0 0 0 -4.37-10.52"
                                       fillRule="evenodd"
                                    ></path>
                                 </svg>
                                 {/* <svg width="18" height="18" viewBox="0 0 32 32"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" /></svg> */}
                                 <span className="share_icn_name">
                                    Whatsapp
                                 </span>
                              </a>
                           </WhatsappShareButton>
                        </li>
                        <li className="share_items">
                           <a
                              target="_blank"
                              data-dismiss="modal"
                              onClick={sendMail}
                              className="share_links"
                              style={{ cursor: 'pointer' }}
                           >
                              <svg
                                 viewBox="0 0 32 32"
                                 role="presentation"
                                 aria-hidden="true"
                                 focusable="false"
                                 style={{
                                    height: '18px',
                                    width: '18px',
                                    display: 'block',
                                    fill: 'rgb(72, 72, 72)',
                                 }}
                              >
                                 <path
                                    d="m17.42 18.99c.14-.12.86-.76 2.08-1.86l10.43 8.66h-27.76l10.35-8.67c1.24 1.1 1.98 1.74 2.12 1.85.83.65 1.93.63 2.78.02m11.89-10.67-4.83 4.34c-1.51 1.35-2.8 2.51-3.86 3.46l10.35 8.6c.01.01.01.02.02.03v-17.81c0-.04-.02-.07-.02-.11a3.73 3.73 0 0 0 -.08.07zm-25.19-.7a5347.74 5347.74 0 0 0 4.69 4.19c3.94 3.52 6.51 5.79 6.75 5.97a.76.76 0 0 0 .92.03c.21-.18 2.82-2.52 7.01-6.28l4.82-4.33 1.35-1.21h-27.37l.29.26zm3.66 5.28a4436.65 4436.65 0 0 1 -4.66-4.16c-.56-.5-1.07-.96-1.53-1.37l-.57-.51c0 .03-.01.05-.01.07v17.89l10.38-8.7c-1-.89-2.2-1.95-3.61-3.21"
                                    fillRule="evenodd"
                                 ></path>
                              </svg>
                              <span className="share_icn_name">Email</span>
                           </a>
                        </li>

                        <li className="share_items">
                           <a
                              className="share_links"
                              data-dismiss="modal"
                              href="javascript:void();"
                              onClick={() => copyToClipboard()}
                           >
                              <svg
                                 viewBox="0 0 32 32"
                                 role="presentation"
                                 aria-hidden="true"
                                 focusable="false"
                                 style={{
                                    height: '18px',
                                    width: '18px',
                                    display: 'block',
                                    fill: 'rgb(72, 72, 72)',
                                 }}
                              >
                                 <path
                                    d="m25.78 1.74c0 .41-.33.74-.74.74h-19.55v25.5a.74.74 0 1 1 -1.49 0v-25.75c0-.68.56-1.23 1.24-1.23h19.81c.41 0 .74.33.74.74zm3.22 3.46v25.76a.98.98 0 0 1 -.99.98h-19.8a.99.99 0 0 1 -.99-.98v-25.76c0-.54.44-.98.99-.98h19.81c.54 0 .99.45.99.98zm-17.82 3.47c0 .27.22.5.5.5h5.94a.49.49 0 1 0 0-.99h-5.94a.5.5 0 0 0 -.5.5zm13.86 13.87a.5.5 0 0 0 -.5-.5h-12.87a.49.49 0 1 0 0 .99h12.87a.5.5 0 0 0 .5-.5zm0-3.96a.5.5 0 0 0 -.5-.5h-12.87a.5.5 0 1 0 0 .99h12.87a.5.5 0 0 0 .5-.5zm0-3.96a.5.5 0 0 0 -.5-.5h-12.87a.5.5 0 1 0 0 .99h12.87a.5.5 0 0 0 .5-.5z"
                                    fill-rule="evenodd"
                                 ></path>
                              </svg>
                              <span className="share_icn_name">
                                 {copyLinkText}
                              </span>
                           </a>
                        </li>
                        {/* <li className="share_items">
                                <a className="share_links" href="javascript:void();" >
                                    <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" role="presentation" aria-hidden="true" focusable="false" style={{ height: '18px', width: '18px', display: 'block', fill: 'rgb(72, 72, 72)' }}><path d="m12 0c-6.63 0-12 5.37-12 12s5.37 12 12 12 12-5.37 12-12-5.37-12-12-12zm-4.19 14.05c.52.45.58 1.24.14 1.76-.25.29-.6.44-.95.44-.29 0-.58-.1-.81-.3l-3.5-3c-.28-.24-.44-.58-.44-.95s.16-.71.44-.95l3.5-3c .52-.45 1.31-.39 1.76.14.45.52.39 1.31-.14 1.76l-2.39 2.05zm6.88-6.69-3 10c-.16.54-.66.89-1.2.89-.12 0-.24-.02-.36-.05-.66-.2-1.04-.9-.84-1.56l3-10c .2-.66.9-1.04 1.56-.84s1.04.9.84 1.56zm3.12 8.59c-.52.45-1.31.39-1.76-.14s-.39-1.31.14-1.76l2.39-2.05-2.39-2.05c-.52-.45-.58-1.24-.14-1.76s1.24-.58 1.76-.14l3.5 3c .58.5.58 1.4 0 1.9z"></path></svg>
                                    <span className="share_icn_name">Embed</span>
                                </a>
                            </li> */}
                     </ul>
                     <textarea
                        style={{ opacity: '0.0' }}
                        ref={textAreaRef}
                        value={shareURL}
                     />
                  </div>
               </div>
            </div>
         </div>
         <Snackbar message="Receipient is not subscribed to the platform" />
      </Oux>
   );
};

const mapStateToProps = (state) => ({
   shareURL: state.miscReducer.shareURL,
   service: state.miscReducer.service,
   user: state.authReducer.user,
   history: state.historyReducer.history,
   searchUserByNameResults: state.userReducer.searchUserByNameResults,
});

const mapStateToDispatch = (dispatch) => ({
   searchUserByName: (name) => dispatch(actions.searchUserByName(name)),
   updateConversationReceiver: (receiver) =>
      dispatch(actions.updateConversationReceiver(receiver)),
   searchUserByNameEmpty: () => dispatch(actions.searchUserByNameEmpty()),
   updatedIsSharingViaMsg: (isSharingViaMsg) =>
      dispatch(actions.updatedIsSharingViaMsg(isSharingViaMsg)),
});

export default connect(mapStateToProps, mapStateToDispatch)(ShareModal);
