import React, { Component, useState } from 'react';
import Aux from '../Oux/Oux';
import {
    routes,
    Categories,
    FOOTER_AND_SOCIAL_LINKS,
    EmailVerificationStatus,
    walkThroughTypes
} from '../../utility/constants/constants';
import { withRouter, NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import storage from '../../utility/storage';
import WelcomeModal from '../../components/Modal/WelcomeModal/WelcomeModal';
import AddDeckModal from '../../components/Modal/AddDeckModal/AddDeckModal';
import ShareModal from '../../components/Modal/ShareModal/ShareModal';
import Oux from '../Oux/Oux';
import { Base64 } from 'js-base64';
import ViewDescriptionModal from '../../components/Modal/ViewDescriptionModal/ViewDescriptionModal';
import SubscriptionModal from '../../components/Modal/SubscriptionModal/SubscriptionModal';
import TermsOfUseModal from '../../components/Modal/TermsOfUseModal/TermsOfUseModal';
import EmailSentModal from '../../components/Modal/EmailSendModal/EmailSentModal';
import $ from 'jquery';
import './Layout.css';
import CancelRegistrationModal from '../../components/Modal/CancelSignUpModal/CancelRegistrationModal';
import CancelSignUpModal from '../../components/Modal/CancelSignUpModal/CancelSignUpModal';
import CancelProfileModal from '../../components/Modal/CancelSignUpModal/CancelProfileModal';
import CustomToolTip from '../../components/UI/CustomToolTip/CustomToolTip';
import Quickstart from '../../components/Quickstart/Quickstart';
import WalkThrough from '../../components/WalkThrough/WalkThrough'
import ImageCropModal from '../../components/Modal/ImageCropModal/ImageCropModal';
import { LMS_BASE_URL } from '../../config';

const Header = (props) => {
    console.log(props);
    let currentPath = props.history.location.pathname;

    //default when user is not logged in
    let headerListContent = (
        <Oux>
            <li
                className={
                    currentPath.includes(routes.HOME) || routes.ROOT.includes(currentPath)
                        ? 'nav-item active'
                        : 'nav-item'
                }
            >
                {' '}
                <a className="nav-link" href={`${LMS_BASE_URL()}`}>
                    Home <span className="sr-only">(current)</span>
                </a>{' '}
            </li>
            <li className={currentPath.includes(routes.GET_STARTED) ? 'nav-item active' : 'nav-item'}>
                {' '}
                <NavLink className="nav-link" to={routes.GET_STARTED}>
                    {' '}
                    Get Started
                </NavLink>{' '}
            </li>
            <li className="nav-item">
                {' '}
                <a
                    onClick={() => storage.set('redirectToPricing', true)}
                    className="nav-link header_links_list"
                    href={`${routes.PRICING}/?logoutfromlms=true`}
                >
                    {' '}
                    Pricing{' '}
                </a>{' '}
            </li>
            <CustomToolTip overlayClassName="header_tooltip" placement="top" text="Free Articles, Latest News and more!">
                <li className="nav-item">
                    {' '}
                    <a className="nav-link header_links_list" href={`${routes.BLOG}/?logoutfromlms=true`}>
                        {' '}
                        Blog{' '}
                    </a>{' '}
                </li>
            </CustomToolTip>
        </Oux>
    );
    let headerTabsContent = (
        <Aux>
            {
                !props.user
                    ? <a className="navbar-brand" href={`${LMS_BASE_URL()}`}>
                        <img src="/images/thumbnails/partner_logo.png" alt="Logo" />
                    </a>
                    : <NavLink className={"navbar-brand"} to={'/'}>
                        <img src="/images/thumbnails/partner_logo.png" alt="Logo" />
                    </NavLink>
            }
            <button onClick={props.opennav} className="navbar-toggler" type="button">
                <span className="navbar-toggler-icon navbar-toggler"></span>
            </button>
            <div className="collapse1 navbar-collapse mobile_sidenav" id="mobile_sidenav">
                <a href="javascript:void(0)" className="closebtn closeNavbarIcon" onClick={props.closeNav}>
                    <img src="/images/icons/icn_close_black.svg" alt="Close Icon" />
                </a>
                <div className="mobile_top_header">
                    <a
                        className="nav-link text-primary ph_underline next_step_link"
                        href={`${routes.INTERNS}/?logoutfromlms=true`}
                    >
                        {' '}
                        Interns
                    </a>
                    <a
                        // onClick={() => storage.set('redirectToPricing', true)}
                        className="btn_sigup top_header_links"
                        href={routes.REGISTER}
                    >
                        {' '}
                        Sign Up{' '}
                    </a>
                    <a
                        onClick={() => storage.remove('redirectToPricing')}
                        className="btn_login top_header_links"
                        href={routes.LOGIN}
                    >
                        {' '}
                        Log In{' '}
                    </a>
                </div>
                <ul className="navbar-nav justify-content-start">{headerListContent}</ul>
                <ul className="navbar-nav justify-content-end align-items-center theme_nav_right mobile_nav_right_hidden">
                    <CustomToolTip overlayClassName="header_tooltip" placement="top" text="More about Interns and Internship">
                        <li className="nav-item">
                            {' '}
                            <a
                                className="nav-link text-primary ph_underline next_step_link"
                                href={`${routes.INTERNS}/?logoutfromlms=true`}
                            >
                                {' '}
                                Interns
                            </a>{' '}
                        </li>
                    </CustomToolTip>
                    <li className="nav-item">
                        {' '}
                        <a
                            // onClick={() => storage.set('redirectToPricing', true)}
                            className="nav-link btn_sigup bottom_border"
                            href={routes.REGISTER}
                        >
                            {' '}
                            Sign Up{' '}
                        </a>{' '}
                    </li>
                    <li className="nav-item">
                        {' '}
                        <a
                            onClick={() => storage.remove('redirectToPricing')}
                            className="nav-link btn_login"
                            href={routes.LOGIN}
                        >
                            {' '}
                            Log In{' '}
                        </a>{' '}
                    </li>
                </ul>
            </div>
        </Aux>
    );

    if (props.user) {
        let userProfilePic = '/custom_images/icn_user_placeholder.svg';

        if (props.user.profiles && props.user.profiles.length > 0) {
            props.user.profiles.map((profile, index) => {
                if (profile.id.toString() === props.user.primary_profile_id) {
                    if (profile.photo_urls && Object.keys(profile.photo_urls).length > 0) {
                        userProfilePic = profile.photo_urls.small;
                    }
                }
            });
        }

        let rightDropDownMenuContent = (
            <li role="presentation" className="list_item">
                <a role="menuitem" tabIndex="-1" onClick={props.logout} href="javascript:void(0)">
                    Log Out
                </a>
            </li>
        );

        //If Phone Number Field is present -> props.user.phone_verified && props.user.primary_profile_id && ![routes.ADD_SKILLS, routes.ADD_EXPERIENCE, routes.ADD_PORTFOLIO, routes.EMAIL_VERIFICATION, routes.VERIFY_EMAIL].includes(props.history.location.pathname)
        if (
            props.user.primary_profile_id &&
            ![
                routes.ADD_SKILLS,
                routes.ADD_EXPERIENCE,
                routes.ADD_PORTFOLIO,
                routes.EMAIL_VERIFICATION,
                routes.VERIFY_EMAIL,
            ].includes(props.history.location.pathname)
        ) {
            let encryptedEmail = Base64.encode(props.user.email);
            console.log(props.createClassifiedAddClicked, 'createClassifiedAddClicked');
            headerListContent = (
                <Oux>
                    <CustomToolTip overlayClassName="header_tooltip" placement="top" text="Search For What You Need">
                        <li className={currentPath.includes(routes.HOME) ? 'nav-item active' : 'nav-item'}>
                            {' '}
                            <NavLink id="nav-item_search-walk" className="nav-link ph-relative" to={routes.HOME} onClick={() => props.handleStep(1)}>
                                <span class="topmenutext ">BETA</span>
                                Search <span className="sr-only">(current)</span>
                            </NavLink>{' '}
                        </li>
                    </CustomToolTip>
                    <CustomToolTip overlayClassName="header_tooltip" placement="top" text="Offer What You Have">
                        <li className={currentPath.includes(routes.OFFERS) ? 'nav-item active' : 'nav-item'}>
                            {' '}
                            <NavLink id="nav-item_offers_walkThrough" className="nav-link" to={routes.OFFERS} onClick={() => props.handleStep(1)}>
                                {' '}
                                Offer{' '}
                            </NavLink>{' '}
                        </li>
                    </CustomToolTip>
                    <li className="nav-item border-bottom-0" style={{ margin: '0' }}>
                        <ul className="profile_dropdown ph_avatar_dropdown">
                            <li className="nav-item border-bottom-0" style={{ margin: '0' }}>
                                <ul className="profile_dropdown ph_avatar_dropdown">
                                    <Oux>
                                        <li className="dropdown border-bottom-0">
                                            <CustomToolTip overlayClassName="header_tooltip" placement="right" text="Learn What To Do">
                                                <li className="nav-item">
                                                    <a
                                                        href="javascript:void(0)"
                                                        className="dropdown-toggle nav-link user_menu_dropdown"
                                                        id="Respond_help_walk"
                                                        data-toggle="dropdown"
                                                        onClick={() => props.handleStepChange(1)}
                                                        aria-haspopup="true"
                                                        role="button"
                                                        aria-expanded="false"
                                                    >
                                                        Learn
                                                    </a>
                                                </li>
                                            </CustomToolTip>
                                            <ul className="dropdown-menu dropdown-menu-left">
                                                <li role="presentation" className="list_item">
                                                    <a
                                                        className="btn_sigup top_header_links non_href_a_tag"
                                                        onClick={props.navigateToLibraryAndResources}
                                                    >
                                                        {' '}
                                                        Free Resources{' '}
                                                    </a>
                                                </li>
                                                <li role="presentation" className="list_item">
                                                    <a
                                                        className="btn_sigup top_header_links non_href_a_tag"
                                                        onClick={props.navigateToLearn}
                                                    >
                                                        {' '}
                                                        PartnerHere Library{' '}
                                                    </a>
                                                </li>
                                                <li role="presentation" className="list_item">
                                                    {' '}
                                                    <a
                                                        className="btn_sigup top_header_links"
                                                        href={`${routes.LMS_DASHBOARD}/`}
                                                    >
                                                        {' '}
                                                        My Dashboard{' '}
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                    </Oux>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <CustomToolTip overlayClassName="header_tooltip" placement="top" text="Browse Project Profiles">
                        <li className={currentPath.includes(routes.BUILD) ? 'nav-item active' : 'nav-item'}>
                            {' '}
                            <NavLink id="nav-item_build-walk" className="nav-link" to={routes.BUILD}>
                                {' '}
                                Build
                            </NavLink>{' '}
                        </li>
                    </CustomToolTip>
                    <li className="nav-item border-bottom-0" style={{ margin: '0' }}>
                        <ul className="profile_dropdown ph_avatar_dropdown">
                            <li className="nav-item border-bottom-0" style={{ margin: '0' }}>
                                <ul className="profile_dropdown ph_avatar_dropdown">
                                    <Oux>
                                        <li className="dropdown border-bottom-0">
                                            {/* <CustomToolTip overlayClassName="header_tooltip" placement="right" text=""> */}
                                            <li className="nav-item">
                                                <a
                                                    href="javascript:void(0)"
                                                    className="dropdown-toggle nav-link user_menu_dropdown"
                                                    id="Respond_help_walk"
                                                    data-toggle="dropdown"
                                                    aria-haspopup="true"
                                                    role="button"
                                                    aria-expanded="false"
                                                >
                                                    Community
                                                </a>
                                            </li>
                                            {/* </CustomToolTip> */}
                                            <ul className="dropdown-menu dropdown-menu-left">
                                                <li role="presentation" className="list_item">
                                                    <a
                                                        className="btn_sigup top_header_links non_href_a_tag"
                                                        href={`${LMS_BASE_URL()}/news-feed/`}
                                                    >
                                                        {' '}
                                                        Activity{' '}
                                                    </a>
                                                </li>
                                                {/* <li role="presentation" className="list_item">
                                                    <a
                                                        className="btn_sigup top_header_links non_href_a_tag"
                                                        href={`${LMS_BASE_URL()}/members/`}
                                                    >
                                                        {' '}
                                                        Members{' '}
                                                    </a>
                                                </li> */}
                                                <li role="presentation" className="list_item">
                                                    {' '}
                                                    <a
                                                        className="btn_sigup top_header_links"
                                                        href={`${LMS_BASE_URL()}/groups/`}
                                                    >
                                                        {' '}
                                                        Groups{' '}
                                                    </a>
                                                </li>
                                                <li role="presentation" className="list_item">
                                                    {' '}
                                                    <a
                                                        className="btn_sigup top_header_links"
                                                        href={`${LMS_BASE_URL()}/forums/`}
                                                    >
                                                        {' '}
                                                        Forums{' '}
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                    </Oux>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <CustomToolTip overlayClassName="header_tooltip" placement="top" text="Favorite Offers & Want Ads (in Lists)">
                        <li className={currentPath.includes(routes.DECKS) ? 'nav-item active' : 'nav-item'}>
                            {' '}
                            <NavLink className="nav-link" to={routes.DECKS}>
                                {' '}
                                Saved
                            </NavLink>{' '}
                        </li>
                    </CustomToolTip>
                    {/* <li className={currentPath.includes(routes.CLASSIFIEDS) ? "nav-item active" : "nav-item"}> <NavLink className="nav-link" to={routes.CLASSIFIEDS}> Classifieds </NavLink> </li> */}
                    {props.user
                        ? <CustomToolTip overlayClassName="header_tooltip" placement="top" text="Direct Messaging With Other Members">
                            <li className={currentPath.includes(routes.MESSAGES) ? 'nav-item active' : 'nav-item'}>
                                {' '}
                                <a href="javascript:void(0)" className="nav-link" id="nav-item_message_walkThrough" onClick={() => {
                                    let encryptedEmail = Base64.encode(props.user.email);
                                    console.log('encodedMail', encryptedEmail);
                                    window.open(`${LMS_BASE_URL()}/members/?message=true`, '_self')
                                }}>
                                    {' '}
                                    Messages{' '}
                                </a>{' '}
                            </li>
                        </CustomToolTip>
                        : <CustomToolTip overlayClassName="header_tooltip" placement="top" text="Direct Messaging With Other Members">
                            <li className={currentPath.includes(routes.MESSAGES) ? 'nav-item active' : 'nav-item'}>
                                {' '}
                                <NavLink className="nav-link" id="nav-item_message_walkThrough"
                                    onClick={() => {
                                        props.handleStepChange(1)
                                    }} to={routes.MESSAGES}>
                                    {' '}
                                    Messages{' '}
                                </NavLink>{' '}
                            </li>
                        </CustomToolTip>}
                    <CustomToolTip overlayClassName="header_tooltip" placement="top" text="Free Articles, Latest News and more!">
                        <li className="nav-item">
                            {' '}
                            <a className="nav-link" href={`${routes.BLOG}/`}>
                                {' '}
                                Blog{' '}
                            </a>{' '}
                        </li>
                    </CustomToolTip>
                </Oux>
            );
            rightDropDownMenuContent = (
                <Oux>
                    {/* <li role="presentation" className="list_item">
                        <a className="active" role="menuitem" tabIndex="-1" href="javascript:void(0)">Create Profile</a>
                    </li> */}
                    <div className="dropdown-divider m-0"></div>
                    <li role="presentation" className="list_item">
                        <a
                            className="non_href_a_tag"
                            tabIndex="-1"
                            onClick={() => { $('#click').css('display', 'block'); $('#click').click() }}
                        // to={routes.PROFILE}
                        >
                            Quickstart
                        </a>
                    </li>
                    <div className="dropdown-divider m-0"></div>

                    <li role="presentation" className="list_item list_walkThrough">
                        <NavLink
                            role="menuitem"
                            tabIndex="-1"
                            onClick={() => {
                                props.setBusinessProfile(false);
                                props.handleStep(1)
                            }
                            }
                            to={routes.PROFILE}
                        >
                            Manage Profiles
                        </NavLink>
                    </li>
                    {/* <li role="presentation" className="list_item">
                        <a role="menuitem" tabIndex="-1" href="javascript:void(0)" onClick={() => props.history.push(routes.OFFERS)}>Create Offers</a>
                    </li> */}
                    <li role="presentation" className="list_item project_plan_walk">
                        <a
                            role="menuitem"
                            tabIndex="-1"
                            onClick={() => {
                                let quickstart = { ...props.quickstartItems, plan_your_project: true }
                                props.updateQuickstartItems(quickstart)
                                storage.set('quickstart', quickstart)
                            }}
                            href={`${routes.MANAGE_PROJECT_PLANS}`}
                        >
                            Manage Project Plans
                        </a>
                    </li>
                    <li role="presentation" className="list_item">
                        <NavLink role="menuitem" tabIndex="-1" to={routes.OFFERS}>
                            Manage Offers
                        </NavLink>
                    </li>
                    {props.createClassifiedAddClickedValue || props.manageClassifiedAddClicked ? (
                        <li role="presentation" className="list_item post_want_ad_walk">
                            <a
                                role="menuitem"
                                tabIndex="-1"
                                href="javascript:void(0)"
                                className={
                                    routes.CLASSIFIEDS.includes(props.history.location.pathname)
                                        ? props.manageClassifiedAddClicked && !props.createClassifiedAddClickedValue
                                            ? 'active'
                                            : null
                                        : null
                                }
                                onClick={

                                    !props.classifiedList || (props.classifiedList && props.classifiedList.length === 0)
                                        ? () => props.createClassifiedAdd(true)
                                        // : () => props.manageClassifiedAdd(true)
                                        : () => props.manageClassifiedAdd(true)

                                }
                            >
                                Manage Want Ads
                            </a>
                        </li>
                    ) : (
                        <li role="presentation" className="list_item">
                            <a
                                role="menuitem"
                                tabIndex="-1"
                                href="javascript:void(0)"
                                className={
                                    routes.CLASSIFIEDS.includes(props.history.location.pathname)
                                        ? props.manageClassifiedAddClicked && !props.createClassifiedAddClickedValue
                                            ? 'active'
                                            : null
                                        : null
                                }
                                onClick={() => {
                                    props.manageClassifiedAdd(true)
                                    // props.handleAdsClick()

                                }}
                            >
                                Manage Want Ads
                            </a>
                        </li>
                    )}
                    <li role="presentation" className="list_item">
                        <a
                            role="menuitem"
                            target="_self"
                            tabIndex="-1"
                            href={`${routes.AFFILIATES}/`}
                        >
                            Affiliates Program
                        </a>
                    </li>
                    {/* <li role="presentation" className="list_item">
                        <a role="menuitem" tabIndex="-1" href="javascript:void(0)" className={routes.CLASSIFIEDS.includes(props.history.location.pathname) ? props.createClassifiedAddClickedValue && !props.manageClassifiedAddClicked ? "active" : null : null} onClick={() => props.createClassifiedAdd(true)}>Create a Want Ad</a>
                    </li> */}
                    <li role="presentation" className="list_item">
                        <NavLink role="menuitem" tabIndex="-1" to={routes.EDIT_ACCOUNT_INFO}>
                            My Account
                        </NavLink>
                    </li>
                    <li role="presentation" className="list_item">
                        <a role="menuitem" className="non_href_a_tag" tabIndex="-1" onClick={props.logout}>
                            Log Out
                        </a>
                    </li>
                </Oux>
            );

            headerTabsContent = (
                <Aux>
                    {
                        !props.user
                            ? <a className="navbar-brand" href={`${LMS_BASE_URL()}`}>
                                <img src="/images/thumbnails/partner_logo.png" alt="Logo" />
                            </a>
                            : <NavLink className={"navbar-brand"} to={'/'}>
                                <img src="/images/thumbnails/partner_logo.png" alt="Logo" />
                            </NavLink>
                    }
                    <button onClick={props.opennav} className="navbar-toggler" type="button">
                        <span className="navbar-toggler-icon navbar-toggler"></span>
                    </button>
                    <div className="collapse1 navbar-collapse mobile_sidenav" id="mobile_sidenav">
                        <a href="javascript:void(0)" className="closebtn closeNavbarIcon" onClick={props.closeNav}>
                            <img src="/images/icons/icn_close_black.svg" alt="Close Icon" />
                        </a>
                        <div className="mobile_top_header">
                            {props.user ? (
                                <Oux>
                                    {/* <a
                                        className="nav-link text-primary ph_underline next_step_link"
                                        href={`${routes.Next_STEPS}/`}
                                    >
                                        {' '}
                                        Next Steps
                                    </a> */}
                                    <a
                                        className="nav-link text-primary ph_underline next_step_link"
                                        href={`${routes.INTERNS}/`}
                                    >
                                        {' '}
                                        Interns
                                    </a>
                                    <a
                                        className="btn_sigup top_header_links"
                                        href={`${routes.PRICING}/`}
                                    >
                                        {' '}
                                        Upgrades{' '}
                                    </a>
                                </Oux>
                            ) : (
                                <a
                                    className="btn_sigup top_header_links"
                                    href={`${routes.PRICING}/`}
                                >
                                    {' '}
                                    Pricing{' '}
                                </a>
                            )}
                            <ul className="navbar-nav theme_nav_right">
                                <li className="nav-item border-bottom-0">
                                    <ul className="profile_dropdown ph_avatar_dropdown">
                                        <li className="nav-item border-bottom-0">
                                            <ul className="profile_dropdown ph_avatar_dropdown">
                                                {props.user.primary_profile_id ? (
                                                    <Oux>
                                                        <li className="dropdown border-bottom-0">
                                                            <a
                                                                href="#"
                                                                className="dropdown-toggle nav-link user_menu_dropdown"
                                                                data-toggle="dropdown"
                                                                aria-haspopup="true"
                                                                role="button"
                                                                aria-expanded="false"
                                                            >
                                                                <span className="avatar_circle">
                                                                    <img src={userProfilePic} alt={props.user.last_name} />
                                                                </span>
                                                                <span className="user_pro_txt">
                                                                    {props.user.first_name} {props.user.last_name}
                                                                </span>
                                                            </a>
                                                            <ul className="dropdown-menu dropdown-menu-right">
                                                                {rightDropDownMenuContent}
                                                            </ul>
                                                        </li>
                                                    </Oux>
                                                ) : null}
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        <ul className="navbar-nav justify-content-start">{headerListContent}</ul>
                        <ul className="navbar-nav justify-content-end align-items-center theme_nav_right mobile_nav_right_hidden">
                            {props.user.primary_profile_id ? (
                                <Oux>
                                    {props.user ? (
                                        <Oux>
                                            {/* <CustomToolTip overlayClassName="header_tooltip" placement="top" text="Wondering what to do next?">
                                                <li className="nav-item">
                                                    {' '}
                                                    <a
                                                        className="nav-link text-primary ph_underline next_step_link"
                                                        href={`${routes.Next_STEPS}/`}
                                                    >
                                                        {' '}
                                                        Next Steps
                                                    </a>{' '}
                                                </li>
                                            </CustomToolTip> */}
                                            <CustomToolTip overlayClassName="header_tooltip" placement="top" text="More about Interns and Internship">
                                                <li className="nav-item">
                                                    {' '}
                                                    <a
                                                        className="nav-link text-primary ph_underline next_step_link"
                                                        href={`${routes.INTERNS}/`}
                                                    >
                                                        {' '}
                                                        Interns
                                                    </a>{' '}
                                                </li>
                                            </CustomToolTip>
                                            <li className="nav-item">
                                                {' '}
                                                <a
                                                    className="nav-link btn_sigup bottom_border"
                                                    href={`${routes.PRICING}/`}
                                                >
                                                    {' '}
                                                    Upgrades{' '}
                                                </a>{' '}
                                            </li>
                                        </Oux>
                                    ) : (
                                        <li className="nav-item">
                                            {' '}
                                            <a
                                                className="nav-link btn_sigup bottom_border"
                                                href={`${routes.PRICING}/`}
                                            >
                                                {' '}
                                                Pricing{' '}
                                            </a>{' '}
                                        </li>
                                    )}
                                </Oux>
                            ) : null}
                            <li className="nav-item mobile_nav_right_hidden">
                                <ul className="profile_dropdown ph_avatar_dropdown">
                                    {props.user.primary_profile_id ? (
                                        <Oux>
                                            <li className="my-drop walkThrough dropdown" id="walk">
                                                <ul className="my-drop-ul dropdown-menu dropdown-menu-right">
                                                    {rightDropDownMenuContent}
                                                </ul>
                                                <a
                                                    href="#"
                                                    className="dropdown-toggle nav-link user_menu_dropdown"
                                                    id="avtar_for_walkThrough"
                                                    data-toggle="dropdown"
                                                    aria-haspopup="true"
                                                    role="button"
                                                    aria-expanded="false"
                                                >
                                                    <span className="avatar_circle">
                                                        <img src={userProfilePic} alt={props.user.last_name} />
                                                    </span>
                                                    <span className="user_pro_txt">
                                                        {props.user.first_name} {props.user.last_name}
                                                    </span>
                                                </a>

                                            </li>
                                        </Oux>
                                    ) : null}
                                </ul>
                            </li>
                        </ul>
                    </div>
                </Aux>
            );
        } else {
            headerListContent = null;

            headerTabsContent = (
                <Aux>
                    {
                        !props.user
                            ? <a className="navbar-brand" href={`${LMS_BASE_URL()}`}>
                                <img src="/images/thumbnails/partner_logo.png" alt="Logo" />
                            </a>
                            : <NavLink className={"navbar-brand"} to={'/'}>
                                <img src="/images/thumbnails/partner_logo.png" alt="Logo" />
                            </NavLink>
                    }
                    <button onClick={props.opennav} className="navbar-toggler" type="button">
                        <span className="navbar-toggler-icon navbar-toggler"></span>
                    </button>
                    <div className="collapse1 navbar-collapse mobile_sidenav" id="mobile_sidenav">
                        <a href="javascript:void(0)" className="closebtn closeNavbarIcon" onClick={props.closeNav}>
                            <img src="/images/icons/icn_close_black.svg" alt="Close Icon" />
                        </a>
                        <div className="mobile_top_header">
                            <ul className="navbar-nav theme_nav_right">
                                <li className="nav-item border-bottom-0">
                                    <ul className="profile_dropdown ph_avatar_dropdown">
                                        <li className="nav-item border-bottom-0">
                                            <ul className="profile_dropdown ph_avatar_dropdown">
                                                {props.user.primary_profile_id ? (
                                                    <li className="dropdown">
                                                        <a
                                                            href="javascript:void(0)"
                                                            className="dropdown-toggle nav-link user_menu_dropdown"
                                                            data-toggle="dropdown"
                                                            aria-haspopup="true"
                                                            role="button"
                                                            aria-expanded="false"
                                                        >
                                                            <span className="avatar_circle">
                                                                <img src={userProfilePic} alt={props.user.last_name} />
                                                            </span>
                                                            <span className="user_pro_txt">
                                                                {props.user.first_name} {props.user.last_name}
                                                            </span>
                                                        </a>
                                                        <ul className="dropdown-menu dropdown-menu-right">
                                                            {rightDropDownMenuContent}
                                                        </ul>
                                                    </li>
                                                ) : null}
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        <ul className="navbar-nav justify-content-start">{headerListContent}</ul>
                        <ul className="navbar-nav justify-content-end theme_nav_right">
                            <li className="nav-item">
                                <ul className="profile_dropdown ph_avatar_dropdown">
                                    {props.user.primary_profile_id ? (
                                        <li className="dropdown">
                                            <a
                                                href="javascript:void(0)"
                                                className="dropdown-toggle nav-link user_menu_dropdown"
                                                data-toggle="dropdown"
                                                aria-haspopup="true"
                                                role="button"
                                                aria-expanded="false"
                                            >
                                                <span className="avatar_circle">
                                                    <img src={userProfilePic} alt={props.user.last_name} />
                                                </span>
                                                <span className="user_pro_txt">
                                                    {props.user.first_name} {props.user.last_name}
                                                </span>
                                            </a>
                                            <ul className="dropdown-menu dropdown-menu-right">
                                                {rightDropDownMenuContent}
                                            </ul>
                                        </li>
                                    ) : null}
                                </ul>
                            </li>
                        </ul>
                    </div>
                </Aux>
            );
        }
    }

    return (
        <header className="main_header">
            <nav className="navbar navbar-expand-lg navbar-light theme_px_40">{headerTabsContent}</nav>
        </header>
    );
};

const Footer = (props) => {
    const fetchSocialMediaObjects = (key) => {
        let value = null;
        if (props.links && props.links.length > 0) {
            props.links.map((link, index) => {
                if (link.title.toLowerCase() === key.id.toLowerCase()) {
                    if (key.icon) {
                        value = (
                            <a className='social_icons' href={link.content} target="_blank">
                                <img src={key.icon} alt={key.title} />
                            </a>
                        );
                    } else {
                        value = (
                            <a href={link.content} className="footer_link ph_underline">
                                {key.title}
                            </a>
                        );
                    }
                }
            });
        }
        return value;
    };

    let socialMediaLinks = {
        FB: fetchSocialMediaObjects(FOOTER_AND_SOCIAL_LINKS.FB),
        YOUTUBE: fetchSocialMediaObjects(FOOTER_AND_SOCIAL_LINKS.YOUTUBE),
        INSTAGRAM: fetchSocialMediaObjects(FOOTER_AND_SOCIAL_LINKS.INSTAGRAM),
        LINKEDIN: fetchSocialMediaObjects(FOOTER_AND_SOCIAL_LINKS.LINKEDIN),
        TWITTER: fetchSocialMediaObjects(FOOTER_AND_SOCIAL_LINKS.TWITTER),
    };

    let PrivacyPolicy = fetchSocialMediaObjects(FOOTER_AND_SOCIAL_LINKS.PRIVACY);
    let TermsOfUse = fetchSocialMediaObjects(FOOTER_AND_SOCIAL_LINKS.TERMS_OF_USE);

    if (!PrivacyPolicy && props.privacy_policy && props.privacy_policy.length > 0) {
        props.privacy_policy.map((policy) => {
            PrivacyPolicy = (
                <a href={policy.image_url} className="footer_link ph_underline">
                    Privacy Policy
                </a>
            );
        });
    }

    if (!TermsOfUse && props.terms_of_use && props.terms_of_use.length > 0) {
        props.terms_of_use.map((terms) => {
            TermsOfUse = (
                <a href={terms.image_url} className="footer_link ph_underline">
                    Terms of Use
                </a>
            );
        });
    }

    let encryptedEmail = null;
    if (props.user) {
        encryptedEmail = Base64.encode(props.user.email);
    }

    return (
        <footer className="main_footer wow fadeIn">
            <div className="link_list_group">
                <span className="ph_textcopy footer_link">© {new Date().getFullYear()} PartnerHere</span>
                {
                    !props.user
                        ? <a href={`${LMS_BASE_URL()}`} className="footer_link ph_underline">
                            {' '}
                            Home
                        </a>
                        : <NavLink className={"footer_link ph_underline"} to={'/'}>
                            {' '}
                            Home
                        </NavLink>
                }

                <NavLink to={routes.CONTACT_US} className="footer_link ph_underline">
                    {' '}
                    Contact Us
                </NavLink>
                <NavLink to={routes.ABOUT_US} className="footer_link ph_underline">
                    {' '}
                    About Us
                </NavLink>
                <a
                    href={props.user ? `${routes.BLOG}/` : `${routes.BLOG}/?logoutfromlms=true`}
                    className="footer_link ph_underline"
                >
                    {' '}
                    Blog
                </a>
                <NavLink to={routes.HELP} className="footer_link ph_underline">
                    FAQ
                </NavLink>
                <a
                    href={
                        props.user
                            ? `${routes.AFFILIATES}/`
                            : `${routes.AFFILIATES}/?logoutfromlms=true`
                    }
                    target="_self"
                    className="footer_link ph_underline"
                >
                    Affiliates
                </a>
                {PrivacyPolicy}
                {TermsOfUse}

                <div className="social_links footer_link">
                    {socialMediaLinks.FB}
                    {socialMediaLinks.INSTAGRAM}
                    {socialMediaLinks.TWITTER}
                    {socialMediaLinks.YOUTUBE}
                    {socialMediaLinks.LINKEDIN}
                </div>

            </div>


        </footer>
    );
};

class Layout extends Component {
    // state = {
    //     onThirdStep: false,
    //     goToStep: null
    // }
    componentDidMount = () => {
        $(window).scroll(function () {
            var height = $(window).scrollTop();
            if (height > 100) {
                $('#back2Top').fadeIn();
            } else {
                $('#back2Top').fadeOut();
            }
        });
        $(document).ready(function () {
            $('#back2Top').click(function (event) {
                event.preventDefault();
                $('html, body').animate({ scrollTop: 0 }, 'slow');
                return false;
            });
        }); /*Scroll to top when arrow up clicked BEGIN*/
        $(window).scroll(function () {
            var height = $(window).scrollTop();
            if (height > 100) {
                $('#back2Top').fadeIn();
            } else {
                $('#back2Top').fadeOut();
            }
        });
        $(document).ready(function () {
            $('#back2Top').click(function (event) {
                event.preventDefault();
                $('html, body').animate({ scrollTop: 0 }, 'slow');
                return false;
            });
        });
    };

    createClassifiedAdd = (val) => {
        this.props.history.push(routes.CLASSIFIEDS);
        this.props.createClassifiedAddClicked(val);
    };
    handleStep = (steps) => {
        this.props.handleStepChange(steps)
    }
    handleProfileSteps = () => {
        $(".my-drop").removeClass("dropdown");
        $(".my-drop .list_walkThrough").attr("id", "manage_profile_btn_walk");
        $(".my-drop .project_plan_walk").attr(
            "id",
            "manage_project_plan_btn_walk"
        );
        $(".my-drop .dropdown-menu").addClass("show");
        this.handleStep(1)

    }
    manageClassifiedAdd = (val) => {
        this.props.history.push(routes.CLASSIFIEDS);
        this.props.manageClassifiedAdd(val);
    };

    fetchSocialMediaObjects = (key) => {
        let value = null;
        if (this.props.links && this.props.links.length > 0) {
            this.props.links.map((link, index) => {
                if (link.title.toLowerCase() === key.id.toLowerCase()) {
                    value = link.content;
                }
            });
        }
        return value;
    };

    navigateToLearn = () => {
        let encryptedEmail = Base64.encode(this.props.user.email);
        console.log('encodedMail', encryptedEmail);
        window.open(`${routes.LEARN}`, '_self');
    };

    navigateToLibraryAndResources = () => {
        let encryptedEmail = Base64.encode(this.props.user.email);
        console.log('encodedMail', encryptedEmail);
        window.open(`${routes.LIBRARY_AND_RESOURCES}`, '_self');
    };

    openNav = () => {
        var _opened =
            $('.navbar-collapse').hasClass('navbar-collapse mobile_sidenav collapse show') &&
            !$('.dropdown').hasClass('dropdown show');
        if (_opened) {
            this.closeNav();
        } else {
            document.getElementById('mobile_sidenav').style.width = '250px';
            document.getElementById('main_content').style.marginLeft = '250px';
            $('#mobile_sidenav').addClass('collapse show');
        }
    };
    closeNav = () => {
        document.getElementById('mobile_sidenav').style.width = '0';
        document.getElementById('main_content').style.marginLeft = '0';
        $('#mobile_sidenav').removeClass('collapse show');
    };

    render() {
        let currentPath = this.props.history.location.pathname;
        let mainBodyClassName = null;
        if (
            [
                routes.REGISTER,
                routes.LOGIN,
                routes.VERIFY_OTP,
                routes.CREATE_NEW_PROFILE,
                routes.ADD_EXPERIENCE,
                routes.ADD_PORTFOLIO,
                routes.ADD_SKILLS,
                routes.FORGOT_PASSWORD,
                routes.RESET_PASSWORD_TOKEN,
            ].includes(currentPath)
        ) {
            mainBodyClassName = 'signin_body';
        } else if ([routes.MESSAGES].includes(currentPath)) {
            mainBodyClassName = 'ph_messages';
        }
        let TermsOfUse = this.fetchSocialMediaObjects(FOOTER_AND_SOCIAL_LINKS.TERMS_OF_USE);
        TermsOfUse = null;
        if (!TermsOfUse && this.props.terms_of_use && this.props.terms_of_use.length > 0) {
            this.props.terms_of_use.map((terms) => {
                TermsOfUse = terms.image_url;
            });
        }
        return (
            <Aux>
                {this.props.user && this.props.user.primary_profile_id ? <WalkThrough
                    history={this.props.history}
                    handleStepUpdate={this.handleStep}
                    updateQuickstartItems={this.props.updateQuickstartItems}
                    quickstartItems={this.props.quickstartItems}
                    // onThirdStep={this.state.onThirdStep}
                    goToStep={this.props.goToStep}
                // onStepChange={() => {
                //     console.log("onstepchange called");
                //     this.setState({
                //         onThirdStep: false,
                //         goToStep: null
                //     })
                // }} 
                />
                    : null
                }
                <div className={mainBodyClassName}>
                    <div className="limiter">
                        <div className="container-login100">
                            <Header
                                opennav={this.openNav}
                                closeNav={this.closeNav}
                                {...this.props}
                                navigateToLearn={this.navigateToLearn}
                                navigateToLibraryAndResources={this.navigateToLibraryAndResources}
                                createClassifiedAdd={this.createClassifiedAdd}
                                manageClassifiedAdd={this.manageClassifiedAdd}
                                handleStep={this.handleStep}
                                handleProfileSteps={this.handleProfileSteps}
                            // handleProfileClick={() => this.setState({
                            //     onThirdStep:true,
                            //     goToStep:2
                            // })}
                            // handleStepChange={(step) => this.setState({
                            //     goToStep: step
                            // })}
                            />
                            {/* <Header navigateToLearn={this.navigateToLearn} {...this.props} createClassifiedAdd={this.createClassifiedAdd} /> */}
                            <div className="clearfix"></div>
                            <div className="ph_wrp" id="main_content">

                                {this.props.children}
                            </div>
                            <div className="clearfix"></div>
                            <Footer {...this.props} />
                        </div>
                    </div>
                    <a id="back2Top" title="Back to top" href="javascript:void(0)">
                        &#10148;
                    </a>
                </div>
                <WelcomeModal />

                <AddDeckModal
                    user={this.props.user}
                    history={this.props.history}
                    showAddToDeck={this.props.showAddToDeck}
                />

                <ShareModal />
                <ViewDescriptionModal
                    descriptionTitle={this.props.descriptionTitle}
                    fullDescription={this.props.fullDescription}
                />
                <SubscriptionModal
                    isLoading={this.props.isLoading}
                    history={this.props.history}
                    user={this.props.user}
                />
                <EmailSentModal isLoading={this.props.isLoading} history={this.props.history} user={this.props.user} />
                <CancelRegistrationModal history={this.props.history} logout={this.props.logout} />
                <CancelSignUpModal history={this.props.history} logout={this.props.logout} />
                <CancelProfileModal history={this.props.history} logout={this.props.logout} />
                <ImageCropModal
                    showImageCropModal={this.props.showImageCropModal}
                    imageCropParams={this.props.imageCropParams}
                    profilePhotoUpload={this.props.profilePhotoUpload}
                    uploadImageOnWordpress={this.props.uploadImageOnWordpress} />
                {this.props.history.location.pathname.includes(routes.REGISTER) ? (
                    <TermsOfUseModal
                        toggleTermsAgreedFromModal={this.props.toggleTermsAgreedFromModal}
                        termsOfUse={TermsOfUse}
                    />
                ) : null}
            </Aux>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.authReducer.user,
        token: state.authReducer.token,
        categories: state.configReducer.categories,
        showAddToDeck: state.userReducer.showAddToDeck,
        links: state.configReducer.links,
        privacy_policy: state.configReducer.privacy_policy,
        terms_of_use: state.configReducer.terms_of_use,
        fullDescription: state.miscReducer.fullDescription,
        descriptionTitle: state.miscReducer.descriptionTitle,
        isLoading: state.authReducer.isLoading,
        createClassifiedAddClickedValue: state.userReducer.createClassifiedAddClicked,
        manageClassifiedAddClicked: state.userReducer.manageClassifiedAddClicked,
        classifiedList: state.userReducer.classifiedList,
        quickstartItems: state.authReducer.quickstartItems,
        isServiceLoading: state.userReducer.isServiceloading,
        isClassifiedloading: state.userReducer.isClassifiedloading,
        goToStep: state.walkThroughReducer.goToStep,
        imageCropParams: state.miscReducer.imageCropParams,
        isWordpress: state.miscReducer.isWordpress
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(actions.logout()),
        createClassifiedAddClicked: (value) => dispatch(actions.createClassifiedAddClicked(value)),
        manageClassifiedAdd: (val) => dispatch(actions.manageClassifiedAdd(val)),
        toggleTermsAgreedFromModal: (flag) => dispatch(actions.toggleTermsAgreedFromModal(flag)),
        setBusinessProfile: (status) => dispatch(actions.businessProfile(status)),
        updateQuickstartItems: (quickstart) => dispatch(actions.updateQuickstartItems(quickstart)),
        handleStepChange: (steps) => dispatch(actions.handleStepChange(steps)),
        profilePhotoUpload: (credentials, image) => dispatch(actions.profilePhotoUpload(credentials, image)),
        showImageCropModal: (imageCropParams) => dispatch(actions.showImageCropModal(imageCropParams)),
        uploadImageOnWordpress: (file) => dispatch(actions.uploadImageOnWordpress(file))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));
