import React, { useEffect } from "react";
import "./Quickstart.css";
import $ from "jquery";
import { connect } from "react-redux";
import CustomToolTip from "../UI/CustomToolTip/CustomToolTip";
import { NavLink } from "react-router-dom";
import { routes, walkThroughTypes } from "../../utility/constants/constants";
import * as actions from "../../redux/actions/index";
import { useRef } from "react";
import storage from "../../utility/storage";
import { LMS_BASE_URL } from "../../config";
import { Base64 } from "js-base64";

const Quickstart = (props) => {
  const didMountRef = useRef(false);
  let quickstartItems = props.quickstartItems;
  let checkmarkTrueClass = "qs-completed-icon ph_accor_success";
  let checkmarkFalseClass = "qs-completed-icon";
  const accordion = () => {
    var Accordion = function (el, multiple) {
      this.el = el || {};
      this.multiple = multiple || false;
      // Variables privadas
      var links = this.el.find(".js-accordion-link");
      // Evento
      links.on(
        "click",
        { el: this.el, multiple: this.multiple },
        this.dropdown
      );
    };
    Accordion.prototype.dropdown = function (e) {
      var $el = e.data.el,
        $this = $(this),
        $next = $this.next();
      $next.slideToggle();
      $this.parent().toggleClass("is-open");
      if (!e.data.multiple) {
        $el
          .find(".js-accordion-submenu")
          .not($next)
          .slideUp()
          .parent()
          .removeClass("is-open");
        $el.find(".js-accordion-submenu").not($next).slideUp();
      }
    };
    var accordion = new Accordion($("#qs-items"), false);
  }
  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      accordion();
      $(document).ready(function () {
        $("#click").click(function () {
          $(".ph_dropdown_wrapper").toggleClass("ph_active");
          $("#click").css("display", "none");
        });
        $("#qs-close-icon").click(function () {
          $(".ph_dropdown_wrapper").toggleClass("ph_active");
          $("#click").css("display", "block");
        });
      });
    }
  }, []);
  const getEncryptedMail = () => {
    let encryptedEmail = Base64.encode(props.user.email);
    return encryptedEmail;
  };
  let activeTourType = storage.get("activeTour");
  return (
    <div id="qs-slideout" class="ph_dropdown_wrapper">
      <CustomToolTip placement="left" text="PartnerHere Quickstart Guide">
        <button
          type="button"
          id="click"
          class="rotated_btn ph_sufl_btn_xs ph_toggle_btn quickstart_icon_wrapper"
        >
          <img
            src="/custom_images/quickstart.svg"
            class="icn_red quickstart_icon"
            alt="Icon"
            id="click"
          />
          <span className="text-white"> Quickstart</span>
        </button>
      </CustomToolTip>
      <div id="qs-header">
        <h3 id="qs-title">
          PartnerHere Quickstart
          <a class="non_href_a_tag" id="qs-close-icon">
            &nbsp;
          </a>
        </h3>
      </div>
      <ol id="qs-items">
        <li
          onClick={() => {
            storage.set(
              "activeTour",
              walkThroughTypes.PRIMARY_PROFILE_CREATE.title
            );
          }}
          class={
            activeTourType === walkThroughTypes.PRIMARY_PROFILE_CREATE.title
              ? "qs-item is-open"
              : "qs-item"
          }
        >
          <div class="qs-item-head js-accordion-link">
            <span class="qs-selected-icon">&nbsp;</span>
            <span class="qs-completed-icon ph_accor_success">
              <svg
                id="Layer_1"
                style={{ enableBackground: "new 0 0 128 128" }}
                version="1.1"
                viewBox="0 0 128 128"
                xmlSpace="preserve"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <g>
                  <circle class="st0" cx="64" cy="64" r="64"></circle>
                </g>
                <g>
                  <path
                    class="st1"
                    d="M54.3,97.2L24.8,67.7c-0.4-0.4-0.4-1,0-1.4l8.5-8.5c0.4-0.4,1-0.4,1.4,0L55,78.1l38.2-38.2   c0.4-0.4,1-0.4,1.4,0l8.5,8.5c0.4,0.4,0.4,1,0,1.4L55.7,97.2C55.3,97.6,54.7,97.6,54.3,97.2z"
                  ></path>
                </g>
              </svg>
            </span>
            <h4 class="qs-item-title">Primary Profile Created</h4>
          </div>
          <div class="js-accordion-submenu" >
            <div class="qs-item-body">
              <p>Your Primary Profile was created when you registered!</p>
              <p>You may update your Primary Profile at any time:</p>
              <ol>
                <li>Click on your name &amp; pic to open the Account Menu</li>
                <li>Select 'Manage Profiles'</li>
                <li>Select 'Primary Profile'</li>
              </ol>
              <p></p>
            </div>
            <div class="qs-item-foot">
              <button
                onClick={() => {
                  $("#qs-close-icon").click();
                  props.openTour(
                    walkThroughTypes.PRIMARY_PROFILE_CREATE.steps,
                    "flowOfWalkSteps",
                    null,
                    walkThroughTypes.PRIMARY_PROFILE_CREATE.title,
                    walkThroughTypes.PRIMARY_PROFILE_CREATE.activeKey
                  );
                }}
              >
                <NavLink className="text-white" to={routes.EDIT_PROFILE}>
                  Show Me
                </NavLink>
              </button>
              <a
                target="_blank"
                href={`${LMS_BASE_URL()}/free-resources/`}
                title="Learn > Free Resources will open in a new tab"
              >
                <u>See All Free Resources</u>
              </a>
            </div>
          </div>
        </li>

        <li
          id="qs-default-offer"
          onClick={() => {
            storage.set(
              "activeTour",
              walkThroughTypes.EDIT_DEFAULT_OFFER.title
            );
          }}
          class={
            activeTourType === walkThroughTypes.EDIT_DEFAULT_OFFER.title
              ? "qs-item is-open"
              : "qs-item"
          }
        >
          <div class="qs-item-head js-accordion-link">
            <span class="qs-selected-icon">&nbsp;</span>
            <span
              class={
                quickstartItems && quickstartItems.edited_default_offer
                  ? checkmarkTrueClass
                  : checkmarkFalseClass
              }
            >
              <svg
                id="Layer_1"
                style={{ enableBackground: "new 0 0 128 128" }}
                version="1.1"
                viewBox="0 0 128 128"
                xmlSpace="preserve"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <g>
                  <circle class="st0" cx="64" cy="64" r="64"></circle>
                </g>
                <g>
                  <path
                    class="st1"
                    d="M54.3,97.2L24.8,67.7c-0.4-0.4-0.4-1,0-1.4l8.5-8.5c0.4-0.4,1-0.4,1.4,0L55,78.1l38.2-38.2   c0.4-0.4,1-0.4,1.4,0l8.5,8.5c0.4,0.4,0.4,1,0,1.4L55.7,97.2C55.3,97.6,54.7,97.6,54.3,97.2z"
                  ></path>
                </g>
              </svg>
            </span>
            <h4 class="qs-item-title">Edit Default Offer</h4>
          </div>
          <div class="js-accordion-submenu" >
            <div class="qs-item-body">
              <p>
                A Default 'Offer' was created in the 'People' Category of the
                search engine when you registered.
              </p>
              <p>
                <b>
                  Your Default Offer tells other members what you are best at or
                  why they should connect with you.
                </b>
              </p>
              <p>
                From there, Paid Subscribers can read your profile and contact
                you!
              </p>
              <p>
                You can update your Default Offer (or hide/show it) at any time:
              </p>
              <ol>
                <li>
                  Click the Offer tab (in the main menu) to list your Offers.
                </li>
                <li>Toggle the show/hide Switch</li>
                <li>Select the Pencil Icon to Edit it</li>
              </ol>
              <p></p>
            </div>
            <div class="qs-item-foot">
              <button
                onClick={() => {
                  $("#qs-close-icon").click();
                  props.openTour(
                    walkThroughTypes.EDIT_DEFAULT_OFFER.steps,
                    null,
                    null,
                    null,
                    walkThroughTypes.EDIT_DEFAULT_OFFER.activeKey
                  );
                }}
              >
                <NavLink className="text-white" to={routes.OFFERS}>
                  Show Me
                </NavLink>
              </button>
              <a
                target="_blank"
                href={`${LMS_BASE_URL()}/partnerhere-library/`}
                title="Learn > PartnerHere Library will open in a new tab"
              >
                Subscribers' Free Bonuses!
                <br />
                <u>The PartnerHere Library</u>
              </a>
            </div>
          </div>
        </li>

        {/* <li
          id="qs-project-plan"
          onClick={() => {
            storage.set("activeTour", walkThroughTypes.PLAN_YOUR_PROJECT.title);
          }}
          class={
            activeTourType === walkThroughTypes.PLAN_YOUR_PROJECT.title
              ? "qs-item is-open"
              : "qs-item"
          }
        >
          <div class="qs-item-head js-accordion-link">
            <span class="qs-selected-icon">&nbsp;</span>
            <span
              class={
                quickstartItems && quickstartItems.plan_your_project
                  ? checkmarkTrueClass
                  : checkmarkFalseClass
              }
            >
              <svg
                id="Layer_1"
                style={{ enableBackground: "new 0 0 128 128" }}
                version="1.1"
                viewBox="0 0 128 128"
                xmlSpace="preserve"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <g>
                  <circle class="st0" cx="64" cy="64" r="64"></circle>
                </g>
                <g>
                  <path
                    class="st1"
                    d="M54.3,97.2L24.8,67.7c-0.4-0.4-0.4-1,0-1.4l8.5-8.5c0.4-0.4,1-0.4,1.4,0L55,78.1l38.2-38.2   c0.4-0.4,1-0.4,1.4,0l8.5,8.5c0.4,0.4,0.4,1,0,1.4L55.7,97.2C55.3,97.6,54.7,97.6,54.3,97.2z"
                  ></path>
                </g>
              </svg>
            </span>
            <h4 class="qs-item-title">Plan your Business/Project</h4>
          </div>
          <div class="js-accordion-submenu" >
            <div class="qs-item-body">
              <p>
                The Business/Project Planner asks a series of questions in
                preparation for your next steps.
              </p>
              <p>
                You can create, update or delete your Private Planner at any
                time:
                <ol>
                  <li>Click your name &amp; pic to open the Account Menu</li>
                  <li>Select 'Manage Project Plans'</li>
                  <li>Click on 'Create Project Planner'</li>
                </ol>
              </p>
            </div>
            <div class="qs-item-foot">
              <button
                onClick={() => {
                  $("#qs-close-icon").click();
                  props.openTour(
                    walkThroughTypes.PLAN_YOUR_PROJECT.steps,
                    "flowOfWalkSteps",
                    "steps",
                    walkThroughTypes.PLAN_YOUR_PROJECT.title,
                    walkThroughTypes.PLAN_YOUR_PROJECT.activeKey
                  );
                }}
              >
                <NavLink
                  className="text-white"
                  to={routes.MANAGE_PROJECT_PLANS}
                >
                  Show Me
                </NavLink>
              </button>
              <a
                target="_blank"
                href={`${LMS_BASE_URL()}/affiliate-area/`}
                title="The Affiliates Information page will open in a new tab"
              >
                Join our Affiliates Program!
              </a>
            </div>
          </div>
        </li> */}

        <li
          id="qs-project-profile"
          onClick={() => {
            storage.set(
              "activeTour",
              walkThroughTypes.CREATE_A_PROJECT_PROFILE.title
            );
          }}
          class={
            activeTourType === walkThroughTypes.CREATE_A_PROJECT_PROFILE.title
              ? "qs-item is-open"
              : "qs-item"
          }
        >
          <div class="qs-item-head js-accordion-link">
            <span class="qs-selected-icon">&nbsp;</span>
            <span
              class={
                quickstartItems && quickstartItems.created_project_profile
                  ? checkmarkTrueClass
                  : checkmarkFalseClass
              }
            >
              <svg
                id="Layer_1"
                style={{ enableBackground: "new 0 0 128 128" }}
                version="1.1"
                viewBox="0 0 128 128"
                xmlSpace="preserve"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <g>
                  <circle class="st0" cx="64" cy="64" r="64"></circle>
                </g>
                <g>
                  <path
                    class="st1"
                    d="M54.3,97.2L24.8,67.7c-0.4-0.4-0.4-1,0-1.4l8.5-8.5c0.4-0.4,1-0.4,1.4,0L55,78.1l38.2-38.2   c0.4-0.4,1-0.4,1.4,0l8.5,8.5c0.4,0.4,0.4,1,0,1.4L55.7,97.2C55.3,97.6,54.7,97.6,54.3,97.2z"
                  ></path>
                </g>
              </svg>
            </span>
            <h4 class="qs-item-title">Publish a Project Profile</h4>
          </div>
          <div class="js-accordion-submenu" >
            <div class="qs-item-body">
              <p>
                <b>
                  Your Published Project Profile is how you share what you're
                  working on with the community.
                </b>
              </p>
              <p>
                Members can browse through Published Project Profiles via the
                Build tab (of the main menu) to see what others are currently
                working on.
              </p>
              <p>
                Paid Subscribers can read the Member's Personal Profile and
                initiate contact (see 'Contact a Member').
              </p>
              <p>
                Paid Subscribers can Publish their Project Profile at any time:
              </p>
              <ol>
                <li>
                  Open the Build tab
                  <br />
                  (in the main menu)
                </li>
                <li>Click the 'New Project Profile' button</li>
              </ol>
              <p></p>
            </div>
            <div class="qs-item-foot">
              <button
                onClick={() => {
                  $("#qs-close-icon").click();
                  props.openTour(
                    walkThroughTypes.CREATE_A_PROJECT_PROFILE.steps,
                    null,
                    null,
                    null,
                    walkThroughTypes.CREATE_A_PROJECT_PROFILE.activeKey
                  );
                }}
              >
                <NavLink className="text-white" to={routes.HOME}>
                  Show Me
                </NavLink>
              </button>
              <a
                target="_blank"
                href={`${LMS_BASE_URL()}/pricing/`}
                title="Opens in a new tab"
              >
                To Publish your Project
                <br />
                <u>Be a Subscriber</u>
              </a>
            </div>
          </div>
        </li>

        <li
          id="qs-use-search"
          onClick={() => {
            storage.set(
              "activeTour",
              walkThroughTypes.SEARCH_FOR_WHAT_YOU_NEED.title
            );
          }}
          class={
            activeTourType === walkThroughTypes.SEARCH_FOR_WHAT_YOU_NEED.title
              ? "qs-item is-open"
              : "qs-item"
          }
        >
          <div class="qs-item-head js-accordion-link">
            <span class="qs-selected-icon">&nbsp;</span>
            <span
              class={
                quickstartItems && quickstartItems.searched_offer
                  ? checkmarkTrueClass
                  : checkmarkFalseClass
              }
            >
              <svg
                id="Layer_1"
                style={{ enableBackground: "new 0 0 128 128" }}
                version="1.1"
                viewBox="0 0 128 128"
                xmlSpace="preserve"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <g>
                  <circle class="st0" cx="64" cy="64" r="64"></circle>
                </g>
                <g>
                  <path
                    class="st1"
                    d="M54.3,97.2L24.8,67.7c-0.4-0.4-0.4-1,0-1.4l8.5-8.5c0.4-0.4,1-0.4,1.4,0L55,78.1l38.2-38.2   c0.4-0.4,1-0.4,1.4,0l8.5,8.5c0.4,0.4,0.4,1,0,1.4L55.7,97.2C55.3,97.6,54.7,97.6,54.3,97.2z"
                  ></path>
                </g>
              </svg>
            </span>
            <h4 class="qs-item-title">Search for what you need</h4>
          </div>
          <div class="js-accordion-submenu" >
            <div class="qs-item-body">
              <p>
                <b>The Search tab</b> (on the main menu) allows you to search
                all the active Offers (and Want Ads) in the system!
              </p>
              <p>
                Specify search terms, geographical location and even
                compensation type, then click SEARCH.
              </p>
              <p>
                You can also filter your search results by Category (People,
                Places, Things...).
              </p>
              <p>
                Clicking on any Search Result's Title opens its full details.
              </p>
              <p>
                From there, Paid Subscribers can read the Member's Profile and
                initiate contact (see 'Contact a Member').
              </p>
            </div>
            <div class="qs-item-foot">
              <button
                onClick={() => {
                  $("#qs-close-icon").click();
                  props.openTour(
                    walkThroughTypes.SEARCH_FOR_WHAT_YOU_NEED.steps,
                    null,
                    null,
                    walkThroughTypes.SEARCH_FOR_WHAT_YOU_NEED.title,
                    walkThroughTypes.SEARCH_FOR_WHAT_YOU_NEED.activeKey
                  );
                }}
              >
                <NavLink className="text-white" to={routes.HOME}>
                  Show Me
                </NavLink>
              </button>
              <a
                target="_blank"
                href={`${LMS_BASE_URL()}/category-definitions/`}
                title="Category Definitions will open in a new tab"
              >
                <u>See Category Definitions</u>
              </a>
            </div>
          </div>
        </li>

        <li
          id="qs-contact-members"
          onClick={() => {
            storage.set("activeTour", walkThroughTypes.CONTACT_A_MEMBER.title);
          }}
          class={
            activeTourType === walkThroughTypes.CONTACT_A_MEMBER.title
              ? "qs-item is-open"
              : "qs-item"
          }
        >
          <div class="qs-item-head js-accordion-link">
            <span class="qs-selected-icon">&nbsp;</span>
            <span
              class={
                quickstartItems && quickstartItems.contact_a_member
                  ? checkmarkTrueClass
                  : checkmarkFalseClass
              }
            >
              <svg
                id="Layer_1"
                style={{ enableBackground: "new 0 0 128 128" }}
                version="1.1"
                viewBox="0 0 128 128"
                xmlSpace="preserve"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <g>
                  <circle class="st0" cx="64" cy="64" r="64"></circle>
                </g>
                <g>
                  <path
                    class="st1"
                    d="M54.3,97.2L24.8,67.7c-0.4-0.4-0.4-1,0-1.4l8.5-8.5c0.4-0.4,1-0.4,1.4,0L55,78.1l38.2-38.2   c0.4-0.4,1-0.4,1.4,0l8.5,8.5c0.4,0.4,0.4,1,0,1.4L55.7,97.2C55.3,97.6,54.7,97.6,54.3,97.2z"
                  ></path>
                </g>
              </svg>
            </span>
            <h4 class="qs-item-title">Contact a Member</h4>
          </div>
          <div class="js-accordion-submenu" >
            <div class="qs-item-body">
              <p>
                From any Search Result, or Published Project Profile, Paid
                Subscribers can read the Member's Profile and initiate contact.
              </p>
              <ol>
                <li>
                  Click on the Title of any Search Result or Published Project
                  Profile to view its details
                </li>
                <li>
                  Click on the Member's name to view their Personal Profile
                </li>
                <li>
                  Click the 'Message' button to initiate a direct message (this
                  will take you to the Messages tab and open a thread with the
                  Member)
                </li>
              </ol>
              <p></p>
            </div>
            <div class="qs-item-foot">
              <button
                onClick={() => {
                  $("#qs-close-icon").click();
                  props.openTour(
                    walkThroughTypes.CONTACT_A_MEMBER.steps,
                    "",
                    "steps",
                    walkThroughTypes.CONTACT_A_MEMBER.title,
                    walkThroughTypes.CONTACT_A_MEMBER.activeKey
                  );
                }}
              >
                <NavLink className="text-white" to={routes.HOME}>
                  Show Me
                </NavLink>
              </button>
              <a
                target="_blank"
                href={`${LMS_BASE_URL()}/pricing/`}
                title="Open in a new tab"
              >
                To contact Members
                <br />
                <u>Be a Subscriber</u>
              </a>
            </div>
          </div>
        </li>

        <li
          id="qs-post-wantad"
          onClick={() => {
            storage.set("activeTour", walkThroughTypes.POST_A_WANT_AD.title);
          }}
          class={
            activeTourType === walkThroughTypes.POST_A_WANT_AD.title
              ? "qs-item is-open"
              : "qs-item"
          }
        >
          <div class="qs-item-head js-accordion-link">
            <span class="qs-selected-icon">&nbsp;</span>
            <span
              class={
                quickstartItems && quickstartItems.posted_ad
                  ? checkmarkTrueClass
                  : checkmarkFalseClass
              }
            >
              <svg
                id="Layer_1"
                style={{ enableBackground: "new 0 0 128 128" }}
                version="1.1"
                viewBox="0 0 128 128"
                xmlSpace="preserve"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <g>
                  <circle class="st0" cx="64" cy="64" r="64"></circle>
                </g>
                <g>
                  <path
                    class="st1"
                    d="M54.3,97.2L24.8,67.7c-0.4-0.4-0.4-1,0-1.4l8.5-8.5c0.4-0.4,1-0.4,1.4,0L55,78.1l38.2-38.2   c0.4-0.4,1-0.4,1.4,0l8.5,8.5c0.4,0.4,0.4,1,0,1.4L55.7,97.2C55.3,97.6,54.7,97.6,54.3,97.2z"
                  ></path>
                </g>
              </svg>
            </span>
            <h4 class="qs-item-title">Post a Want Ad</h4>
          </div>
          <div class="js-accordion-submenu" >
            <div class="qs-item-body">
              <p>
                <b>Want Ads describe what you need but can not find.</b>
              </p>
              <p>
                Want Ads are meant to catch the attention of someone who has
                what you need but hasn't thought to Offer it yet. Or perhaps
                they know of someone who could Offer it.
              </p>
              <p>
                Want Ads allow a more detailed description to be shown in search
                results. Consider using terminology that people would search
                for.
              </p>
              <p>
                There is also a 'Manage Want Ads' option when you click on your
                picture (the Account Menu). Click on the pencil icon to edit an
                existing ad, or toggle the switch to show/hide ads.
              </p>
              <p>
                Paid Subscribers can create unlimited Want Ads:
                <ol>
                  <li>
                    Open the Search tab
                    <br />
                    (on the main menu)
                  </li>
                  <li>
                    Click on the 'Post a Want Ad' link (found directly below the
                    Search Bar)
                  </li>
                  <li>Toggle the switch to show/hide the Want Ad</li>
                </ol>
              </p>
            </div>
            <div class="qs-item-foot">
              <button
                onClick={() => {
                  $("#qs-close-icon").click();
                  props.openTour(
                    walkThroughTypes.POST_A_WANT_AD.steps,
                    walkThroughTypes.POST_A_WANT_AD.title,
                    "steps",
                    walkThroughTypes.POST_A_WANT_AD.title,
                    walkThroughTypes.POST_A_WANT_AD.activeKey
                  );
                }}
              >
                <NavLink className="text-white" to={routes.HOME}>
                  Show Me
                </NavLink>
              </button>
              <a
                target="_blank"
                href={`${LMS_BASE_URL()}/pricing/`}
                title="Opens in a new tab"
              >
                For unlimited Want Ads
                <br />
                <u>Be a Subscriber</u>
              </a>
            </div>
          </div>
        </li>

        <li
          id="qs-create-offers"
          onClick={() => {
            storage.set(
              "activeTour",
              walkThroughTypes.CREATE_MORE_OFFERS.title
            );
          }}
          class={
            activeTourType === walkThroughTypes.CREATE_MORE_OFFERS.title
              ? "qs-item is-open"
              : "qs-item"
          }
        >
          <div class="qs-item-head js-accordion-link">
            <span class="qs-selected-icon">&nbsp;</span>
            <span
              class={
                quickstartItems && quickstartItems.created_more_offers
                  ? checkmarkTrueClass
                  : checkmarkFalseClass
              }
            >
              <svg
                id="Layer_1"
                style={{ enableBackground: "new 0 0 128 128" }}
                version="1.1"
                viewBox="0 0 128 128"
                xmlSpace="preserve"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <g>
                  <circle class="st0" cx="64" cy="64" r="64"></circle>
                </g>
                <g>
                  <path
                    class="st1"
                    d="M54.3,97.2L24.8,67.7c-0.4-0.4-0.4-1,0-1.4l8.5-8.5c0.4-0.4,1-0.4,1.4,0L55,78.1l38.2-38.2   c0.4-0.4,1-0.4,1.4,0l8.5,8.5c0.4,0.4,0.4,1,0,1.4L55.7,97.2C55.3,97.6,54.7,97.6,54.3,97.2z"
                  ></path>
                </g>
              </svg>
            </span>
            <h4 class="qs-item-title">Create more Offers</h4>
          </div>
          <div class="js-accordion-submenu" >
            <div class="qs-item-body">
              <p>
                <b>Offers describe what you have that others might need.</b>{" "}
                Make a separate Offer for each item.
              </p>
              <p>
                Offers allow a descriptive title, but be succinct. Use
                terminology that people would most likely search for.
              </p>
              <p>
                When you click on your picture (the Account Menu) there is a
                'Manage Offers' option which opens the Offer tab,displaying your
                Offers. If have have a lot of Offers, you can filter them by
                Category. You can toggle their show/hide switches or click on
                the pencil icons to edit them.
              </p>
              <p>
                Paid Subscribers can create unlimited Offers:
                <ol>
                  <li>
                    Open the Offers tab
                    <br />
                    (on the main menu)
                  </li>
                  {/* <li>
                    <a
                      target="_blank"
                      href="https://secure.partnerhere.com/category-definitions"
                      title="Category Definitions will open in a new tab"
                    >
                      <u>Select a Category</u>
                    </a>{" "}
                    first
                    <br />
                    (you can not change it later)
                  </li> */}
                  <li>Click the 'Create Offer' button</li>
                </ol>
              </p>
            </div>
            <div class="qs-item-foot">
              <button
                onClick={() => {
                  $("#qs-close-icon").click();
                  props.openTour(
                    walkThroughTypes.CREATE_MORE_OFFERS.steps,
                    null,
                    null,
                    null,
                    walkThroughTypes.CREATE_MORE_OFFERS.activeKey
                  );
                }}
              >
                <NavLink className="text-white" to={routes.OFFERS}>
                  Show Me
                </NavLink>
              </button>
              <a
                target="_blank"
                href={`${LMS_BASE_URL()}/pricing/`}
                title="Opens in a new tab"
              >
                To create unlimited Offers
                <br />
                <u>Be a Subscriber</u>
              </a>
            </div>
          </div>
        </li>

        <li
          id="qs-use-messaging"
          onClick={() => {
            storage.set(
              "activeTour",
              walkThroughTypes.RESPOND_TO_MESSAGES.title
            );
          }}
          class={
            activeTourType === walkThroughTypes.RESPOND_TO_MESSAGES.title
              ? "qs-item is-open"
              : "qs-item"
          }
        >
          <div class="qs-item-head js-accordion-link">
            <span class="qs-selected-icon">&nbsp;</span>
            <span
              class={
                quickstartItems && quickstartItems.respond_to_messages
                  ? checkmarkTrueClass
                  : checkmarkFalseClass
              }
            >
              <svg
                id="Layer_1"
                style={{ enableBackground: "new 0 0 128 128" }}
                version="1.1"
                viewBox="0 0 128 128"
                xmlSpace="preserve"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <g>
                  <circle class="st0" cx="64" cy="64" r="64"></circle>
                </g>
                <g>
                  <path
                    class="st1"
                    d="M54.3,97.2L24.8,67.7c-0.4-0.4-0.4-1,0-1.4l8.5-8.5c0.4-0.4,1-0.4,1.4,0L55,78.1l38.2-38.2   c0.4-0.4,1-0.4,1.4,0l8.5,8.5c0.4,0.4,0.4,1,0,1.4L55.7,97.2C55.3,97.6,54.7,97.6,54.3,97.2z"
                  ></path>
                </g>
              </svg>
            </span>
            <h4 class="qs-item-title">Respond to Messages</h4>
          </div>
          <div class="js-accordion-submenu" >
            <div class="qs-item-body">
              <p>
                <b>
                  All Members can receive Direct Messages from Paid Subscribers
                  and may continue any previous conversations.
                </b>
              </p>
              <p>
                Each day that you receive new Messages you will be notified via
                email.
              </p>
              <p>
                Paid Subscribers can initiate a conversation with any other
                Member:
                <ol>
                  <li>
                    Open the Messages tab
                    <br />
                    (on the main menu)
                  </li>
                  <li>
                    On the left, select a person. Note: Threads with unread
                    messages are bold.
                  </li>
                  <li>Reply at the bottom right</li>
                </ol>
              </p>
            </div>
            <div class="qs-item-foot">
              <button
                onClick={() => {
                  $("#qs-close-icon").click();
                  props.openTour(
                    walkThroughTypes.RESPOND_TO_MESSAGES.steps,
                    null,
                    null,
                    null,
                    walkThroughTypes.RESPOND_TO_MESSAGES.activeKey
                  );
                }}
              >
                <a className="text-white non_href_a_tag" to={routes.MESSAGES}>
                  Show Me
                </a>
              </button>
              <a
                target="_blank"
                href={`${LMS_BASE_URL()}/pricing/`}
                title="Will open in a new tab"
              >
                For unrestricted Messaging
                <br />
                <u>Be a Subscriber</u>
              </a>
            </div>
          </div>
        </li>

        <li
          onClick={() => {
            storage.set(
              "activeTour",
              walkThroughTypes.CREATE_MORE_PROFILES.title
            );
          }}
          class={
            activeTourType === walkThroughTypes.CREATE_MORE_PROFILES.title
              ? "qs-item is-open"
              : "qs-item"
          }
        >
          <div class="qs-item-head js-accordion-link">
            <span class="qs-selected-icon">&nbsp;</span>
            <span
              class={
                quickstartItems && quickstartItems.created_more_profiles
                  ? checkmarkTrueClass
                  : checkmarkFalseClass
              }
            >
              <svg
                id="Layer_1"
                style={{ enableBackground: "new 0 0 128 128" }}
                version="1.1"
                viewBox="0 0 128 128"
                xmlSpace="preserve"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <g>
                  <circle class="st0" cx="64" cy="64" r="64"></circle>
                </g>
                <g>
                  <path
                    class="st1"
                    d="M54.3,97.2L24.8,67.7c-0.4-0.4-0.4-1,0-1.4l8.5-8.5c0.4-0.4,1-0.4,1.4,0L55,78.1l38.2-38.2   c0.4-0.4,1-0.4,1.4,0l8.5,8.5c0.4,0.4,0.4,1,0,1.4L55.7,97.2C55.3,97.6,54.7,97.6,54.3,97.2z"
                  ></path>
                </g>
              </svg>
            </span>
            <h4 class="qs-item-title">Create more Profiles</h4>
          </div>
          <div class="js-accordion-submenu" >
            <div class="qs-item-body">
              <p>
                <b>Published Project Profiles</b> describe the businesses or
                projects that you're Founding.
              </p>
              <p>
                <b>Alternative Personal Profiles</b> can be used to describe you
                relative to your different roles in different businesses or
                projects.{" "}
              </p>
              <p>
                <i>
                  For example: if you started a Tech company and a Fitness
                  company (2 Projects), you'd probably want a different Personal
                  Profile for each.
                </i>
              </p>
              <p>
                The number of Project &amp; Personal Profiles you are allowed to
                create depends upon your subscription level. The number
                remaining for each is displayed on the Create Profile buttons
                (see below).
              </p>
              <p>
                Paid Subscribers may create multiple Project Profiles and/or
                Personal Profiles:
                <ol>
                  <li>
                    Click on your picture
                    <br />
                    (the Account Menu)
                  </li>
                  <li>Select 'Manage Profiles'</li>
                  <li>
                    Select the 'Manage Profiles' tab (to display your extra
                    profiles)
                  </li>
                  <li>
                    Hover over the Create Profile button (displays how many you
                    have remaining of each)
                  </li>
                  <li>
                    Select the Profile type
                    <br />
                    that you want to create
                  </li>
                </ol>
              </p>
            </div>
            <div class="qs-item-foot">
              <button
                onClick={() => {
                  $("#qs-close-icon").click();
                  props.openTour(
                    walkThroughTypes.CREATE_MORE_PROFILES.steps,
                    "flowOfWalkSteps",
                    null,
                    walkThroughTypes.CREATE_MORE_PROFILES.title,
                    walkThroughTypes.CREATE_MORE_PROFILES.activeKey
                  );
                }}
              >
                <NavLink className="text-white" to={routes.EDIT_PROFILE}>
                  Show Me
                </NavLink>
              </button>
              <a
                target="_blank"
                href={`${LMS_BASE_URL()}/pricing/`}
                title="Opens in a new tab"
              >
                Need more Profiles?
                <br />
                <u>Upgrade Your Subscription</u>
              </a>
            </div>
          </div>
        </li>

        <li
          id="qs-get-help"
          onClick={() => {
            storage.set("activeTour", walkThroughTypes.GET_MORE_HELP.title);
          }}
          class={
            activeTourType === walkThroughTypes.GET_MORE_HELP.title
              ? "qs-item is-open"
              : "qs-item"
          }
        >
          <div class="qs-item-head js-accordion-link">
            <span class="qs-selected-icon">&nbsp;</span>
            <span
              class={
                quickstartItems && quickstartItems.get_help
                  ? checkmarkTrueClass
                  : checkmarkFalseClass
              }
            >
              {/* <svg
                                id="Layer_1"
                                style={{ enableBackground: 'new 0 0 128 128' }}
                                version="1.1"
                                viewBox="0 0 128 128"
                                xmlSpace="preserve"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                            >
                                <g>
                                    <circle class="st0" cx="64" cy="64" r="64"></circle>
                                </g>
                                <g>
                                    <path
                                        class="st1"
                                        d="M54.3,97.2L24.8,67.7c-0.4-0.4-0.4-1,0-1.4l8.5-8.5c0.4-0.4,1-0.4,1.4,0L55,78.1l38.2-38.2   c0.4-0.4,1-0.4,1.4,0l8.5,8.5c0.4,0.4,0.4,1,0,1.4L55.7,97.2C55.3,97.6,54.7,97.6,54.3,97.2z"
                                    ></path>
                                </g>
                            </svg> */}
            </span>
            <h4 class="qs-item-title">Get more help</h4>
          </div>
          <div class="js-accordion-submenu" >
            <div class="qs-item-body">
              <p>
                <b>We're always here to help!</b>
              </p>
              <ul>
                <li>
                  <a
                    target="_blank"
                    href="https://www.partnerhere.com/help"
                    title="This will open in a new tab!"
                  >
                    <u>Check the FAQs</u>
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="https://secure.partnerhere.com/known-issues"
                    title="Known Issues will open in a new tab!"
                  >
                    <u>Check the Known Issues</u>
                  </a>
                </li>
                <li>
                  Click the <b>orange Support button</b> (at bottom right)
                  [RECOMMENDED]
                </li>
                <li>
                  <a
                    target="_blank"
                    href="https://www.partnerhere.com/contact-us"
                    title="This will open in a new tab!"
                  >
                    <u>Other ways to Contact Us</u>
                  </a>
                </li>
              </ul>
              <br />
              <p>
                <b>Need Advice or Coaching?</b>
              </p>
              <ul>
                <li>
                  <a
                    target="_blank"
                    href="https://www.partnerhere.com/home"
                    title="Search will open in a new tab!"
                  >
                    <u>Search the community for experts</u>
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="https://secure.partnerhere.com/course/mastermind-beta-group/"
                    title="MasterMind page opens in a new tab!"
                  >
                    <u>Join our MasterMind (BETA) Group</u>
                  </a>
                </li>
              </ul>
              <br />
              <p>
                <b>Want more Training?</b>
              </p>
              <ul>
                <li>
                  <a
                    target="_blank"
                    href="https://secure.partnerhere.com/free-resources"
                    title="This will open in a new tab!"
                  >
                    <u>Check Learn &gt; Free Resources</u>
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="https://secure.partnerhere.com/partnerhere-library"
                    title="This will open in a new tab!"
                  >
                    <u>Check Learn &gt; PartnerHere Library</u>
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="https://www.partnerhere.com/contact-us"
                    title="This will open in a new tab!"
                  >
                    <u>Let us know what you need</u>
                  </a>
                  <br />
                  We want to hear from you!
                </li>
              </ul>
              <br />
            </div>
            {/* <div class="qs-item-foot">
                            <button onClick={() => { $('#qs-close-icon').click(); props.openTour(walkThroughTypes.GET_MORE_HELP.steps, null, null, null, walkThroughTypes.GET_MORE_HELP.activeKey) }}>Show Me</button>
                            <a target="_blank" style={{display:'none'}}>see more stuff</a>
                        </div> */}
          </div>
        </li>
      </ol>
      <div id="qs-footer">
        <div class="clearfix">
          <a
            className="non_href_a_tag pull-left ml-2"
            style={{ textDecoration: "underline" }}
            onClick={() => {
              let quickstart = {
                edited_default_offer: false,
                plan_your_project: false,
                created_project_profile: false,
                searched_offer: false,
                contact_a_member: false,
                posted_ad: false,
                created_more_offers: false,
                respond_to_messages: false,
                created_more_profiles: false,
                get_help: false,
              };
              storage.set("quickstart", quickstart);
              props.updateQuickstartItems(quickstart);
            }}
            title="Access via Account Menu"
          >
            Reset
          </a>
          <a
            className="non_href_a_tag pull-right mr-2"
            style={{ textDecoration: "underline" }}
            onClick={() => {
              $("#click").css("display", "none");
              $(".ph_dropdown_wrapper").toggleClass("ph_active");
            }}
            title="Access via Account Menu"
          >
            Dismiss Quickstart
          </a>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.authReducer.user,
    quickstartItems: state.authReducer.quickstartItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateQuickstartItems: (quickstart) =>
      dispatch(actions.updateQuickstartItems(quickstart)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Quickstart);
