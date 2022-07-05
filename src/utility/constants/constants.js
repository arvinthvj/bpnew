import React from 'react'
import $ from 'jquery';
import { LMS_BASE_URL, WEB_URL } from '../../config';

export const PASSWORD_MIN_LEN = 6;
export const URL_REGEXP = /^(http|https)?:\/\/[a-zA-Z0-9-\.]+\.[a-z]{2,4}/;
export const EMAIL_REGEXP = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i;
// export const PhNoPattern = /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/;
export const URL = new RegExp(
  '^(https?:\\/\\/)?' + // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
  '(\\#[-a-z\\d_]*)?$',
  'i',
); // fragment locator
export const PhNoPattern = /^(1\s?)?((\([0-9]{3}\))|[0-9]{3})[\s\-]?[\0-9]{3}[\s\-]?[0-9]{4}$/;

export const routes = {
  ROOT: '/',
  LOGIN: `${LMS_BASE_URL()}/login`,
  REGISTER: `${LMS_BASE_URL()}/register`,
  FORGOT_PASSWORD: '/forgot-password',
  VERIFY_OTP: '/verify-otp',
  HOME: '/home',
  LOGOUT: '/logout',
  DASHBOARD: '/dashboard',
  GET_STARTED: '/get-started',
  BLOG: `${LMS_BASE_URL()}/blog/`,
  PRICING: `${LMS_BASE_URL()}/pricing/`,
  COOKIE_POLICY: `${LMS_BASE_URL()}/cookie-policy/`,
  MESSAGES: '/messages',
  AFFILIATES: `${LMS_BASE_URL()}/affiliate-area/`,
  INTERNS: `${LMS_BASE_URL()}/interns-and-internships/`,

  OFFERS: '/offers',
  MY_SERVICES: '/offers/my-services',
  PLACES: '/offers/places',
  THINGS: '/offers/things',
  JOBS: '/offers/jobs',
  SHARING_OPPORTUNITIES: '/offers/sharing-opportunities',
  DONATIONS_GIVEAWAYS: '/offers/donations-giveaways',
  LMS_DASHBOARD: `${LMS_BASE_URL()}/dashboard`,

  DECKS: '/decks',

  CLASSIFIEDS: '/want-ads',

  ABOUT_US: '/about-us',
  CONTACT_US: '/contact-us',
  HELP: '/help',

  PROFILE: '/profile',
  CREATE_NEW_PROFILE: '/create-new-profile',
  ADD_EXPERIENCE: '/add-experience',
  ADD_PORTFOLIO: '/add-portfolio',
  ADD_SKILLS: '/add-skills',
  PROFILE: '/profile',

  MANAGE_PROFILE: '/manage',
  MANAGE_ALL_PROFILE: '/manage/all-profiles',
  MANAGE_PROFILE_EDIT: '/manage/profile',
  MANAGE_SKILLS: '/manage/skills',
  MANAGE_EXPERIENCE: '/manage/experience',
  MANAGE_PORTFOLIO: '/manage/portfolio',
  MANAGE_PROFILE_PLANNER: '/manage/profile_planner',

  EDIT_PROFILE: '/profile/edit',
  EDIT_SKILLS: '/profile/skills',
  EDIT_PORTFOLIO: '/profile/portfolio',
  EDIT_EXPERIENCE: '/profile/experience',
  SEARCH_RESULT: '/search',
  RESET_PASSWORD_TOKEN: '/resetpassword',
  // OFFER_DETAILS: '/:category/details',
  OFFER_DETAILS: '/:type/:id/details',
  PROFILE_DETAILS: '/:type/:id/:detailType',

  ACCOUNT_INFORMATION: '/account',
  CHANGE_PASSWORD: '/account/change-password',
  EDIT_ACCOUNT_INFO: '/account/edit',
  MEMBERSHIP_LEVEL: '/account/membership-level',
  NOTIFICATION_SETTINGS: '/account/notification-settings',

  LEARN: `${LMS_BASE_URL()}/partnerhere-library/`,
  SUBSCRIPTION: `${LMS_BASE_URL()}/pricing/`,
  Next_STEPS: `${LMS_BASE_URL()}/next-steps`,
  LIBRARY_AND_RESOURCES: `${LMS_BASE_URL()}/free-resources/`,

  VERIFY_EMAIL: '/verify-email',
  EMAIL_VERIFICATION: '/email-verification',

  CANCELLATION_POLICY: `${LMS_BASE_URL()}/cancellation-policy/`,

  BUILD: '/business-profile',
  MANAGE_PROJECT_PLANS: `${WEB_URL()}/business-profile/`,
};

export const EMPTY_IMAGE_PATH = {
  SEARCH: '/images/thumbnails/search_results_empty.png',
  DECKS: '/images/thumbnails/decks_empty.png',
  MESSAGES: '/images/thumbnails/messages_empty.png',
};

export const MinImageResolution = {
  height: 683,
  width: 1024,
};

export const address = {
  city: '',
  state: '',
  zip: '',
  country: '',
  latitude: '',
  longitude: '',
  street_address: '',
};

export const EmailVerificationStatus = {
  VERIFICATION_NOT_REQUIRED: 0,
  VERIFICATION_REQUIRED: 1,
  VERIFIED: 2,
};

export const UserSettings = {
  NOTIFICATION_SETTINGS: {
    ENABLE: 'enable',
    DISABLE: 'disable',
  },
};

export const ImageTypes = {
  PNG: 'png',
  JPEG: 'jpeg',
};

export const Base64ImagesTypes = {
  PNG: 'data:image/png',
  JPEG: 'data:image/jpeg',
};

export const AllWeekDays = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];

export const FormatedWeekDays = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
];

export const formInputErrorStyle = {
  borderColor: 'rgb(240, 77, 83)',
  borderLeftWidth: '5px',
  borderLeftStyle: 'solid',
};

export const formInputTextErrorStyle = {
  color: 'rgb(221, 39, 38)',
  fontSize: '13px',
};

export const socialMediaSignInTypes = {
  GOOGLE: 'google',
  FB: 'fb',
};

export const CategoriesList = {
  WANT_AD: {
    key: 'wantAd',
    title: 'Want Ad',
  },
  OPPORTUNITY: 'sharing opportunities',
  PEOPLE: 'people',
  PLACES: 'places',
  THING: 'things',
  JOB: 'jobs/gigs',
  DONATION: 'donations/giveaways',
  SERVICE: 'service',
  PROFILE: 'profile',
  FEATURED: 'featured',
  BUSINESS: 'business',
  PROFILE: 'profile',
};

export const PageLimit = 20;

export const Get_Started_Sections_ID = {
  CREATE_NEW_PROFILE: 'create-new-profile',
  FIND_AND_COLLABORATE: 'find-and-collaborate',
  TOOLS_FOR_SUCCESS: 'tools-for-success',
  LAUNCH_YOUR_BUSINESS: 'launch-your-business',
};

export const Get_Started_Sections_CLASS_NAME = {
  CREATE_NEW_PROFILE: 'create_profile_div',
  FIND_AND_COLLABORATE: 'find_collaborate_div',
  TOOLS_FOR_SUCCESS: 'tools_success_div',
  LAUNCH_YOUR_BUSINESS: 'launch_business_div',
};

export const Profile_Status = {
  ACTIVE: 'active',
  IN_ACTIVE: 'inactive',
};

export const Categories = {
  MY_SERVICES: 'People',
  PLACES: 'Places',
  THINGS: 'Things',
  JOBS_GIGS: 'Jobs/Gigs',
  SHARING_OPPORTUNITIES: 'Sharing Opportunities',
  DONATIONS: 'Donations/Giveaways',
};

export const STATUS = {
  ACTIVE: 'active',
  IN_ACTIVE: 'inactive',
};

export const PROFILE_TYPES = {
  PRIMARY: 'primary_profile',
  SECONDARY: 'secondary_profile',
};

export const FOOTER_AND_SOCIAL_LINKS = {
  FB: {
    id: 'fb',
    title: 'Facebook',
    icon: '/custom_images/fb.png',
  },
  TWITTER: {
    id: 'twitter',
    title: 'Twitter',
    icon: '/custom_images/twitter.png',
  },
  LINKEDIN: {
    id: 'linkedin',
    title: 'LinkedIn',
    icon: '/images/icons/icn_white_linkedin.svg',
  },
  INSTAGRAM: {
    id: 'instagram',
    title: 'Instagram',
    icon: '/images/icons/icn_instagram.svg',
    className: 'icn_instagram',
  },
  YOUTUBE: {
    id: 'youtube',
    title: 'Youtube',
    icon: '/custom_images/youtube.png',
    className: 'icn_you_tube',
  },
  PRIVACY: {
    id: 'privacy_upload',
    title: 'Privacy Policy',
    className: 'footer_link ph_underline',
  },
  TERMS_OF_USE: {
    id: 'tos_upload',
    title: 'Terms Of Use',
    className: 'footer_link ph_underline',
  },
};

export const Roles = {
  USER: 'user',
  VISITOR: 'visitor',
  SUBSCRIBER: 'subscriber',
  MEMBER: 'member',
};

export const SubscriptionStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  NONE: 'none',
  PENDING_CANCEL: 'pending-cancel',
};

export const SubscriptionType = {
  SILVER: 'Silver',
  GOLD: 'Gold',
  PLATINUM: 'Platinum',
  FREE: 'Free',
  STARTUP_SPECIAL: 'startup_special'
};

export const walkThroughTypes = {
  PRIMARY_PROFILE_CREATE: {
    title: 'Primary Profile Created',
    description: <span>Show Me opens Manage Profiles page.</span>,
    activeKey: 'primary_profile_created',
    steps: [
      {
        selector: '[id="manage_profile_btn_walk"]',
        content: `Click on Manage profiles in the Personal menu.`,
      },
      {
        selector: '[id="primary_profile"]',
        content: `Select the Primary Profile (default) section and update it to let members know more about you.`,
      },
    ],
  },
  EDIT_DEFAULT_OFFER: {
    title: 'Edit Default Offer',
    description: <span>Show Me opens the Offers page.</span>,
    activeKey: 'edited_default_offer',
    steps: [
      {
        selector: '[id="nav-item_offers_walkThrough"]',
        content: `Click the Offers tab in the main menu to manage what you are Offering to other members...`,
      },
      {
        selector: '[id="first_offer_walk"]',
        content: `Your default Offer summarises what you do best so members can find you and read your Primary Profile.`,
      },
    ],
  },
  PLAN_YOUR_PROJECT: {
    title: 'Plan your Project',
    description: (
      <span>
        Show Me opens the{' '}
        <a href="https://secure.partnerhere.com/my-project-plans/">
          Manage Project Plans
        </a>{' '}
        page, which should be added to the Account Menu following Manage
        Profiles.
      </span>
    ),
    activeKey: 'plan_your_project',
    steps: [
      {
        selector: '[id="manage_project_plan_btn_walk"]',
        content: `Click on Manage Project Plans to work (privately) on your idea and how you will use PartnerHere...`,
      },
    ],
  },
  CREATE_A_PROJECT_PROFILE: {
    title: 'Create a Project Profile',
    description: <span>Show Me opens the Build page.</span>,
    activeKey: 'created_project_profile',
    steps: [
      {
        selector: '[id="nav-item_build-walk"]',
        content: `Click the Build tab in the main menu to browse what other Members are working on...`,
      },
      {
        selector: '[id="build_profile_title"]',
        content: `Click a profile title to view its complete details and/or Message the contact person.`,
      },
      {
        selector: '[id="add_secondary_profile"]',
        content: `Members may create a Publicly Visible Project Profile that members can browse via the Build tab. Members can view your Personal Profile and Message you.`,
      },
    ],
  },
  SEARCH_FOR_WHAT_YOU_NEED: {
    title: 'Search for what you need',
    description: <span>Show Me opens the Search page.</span>,
    activeKey: 'searched_offer',
    steps: [
      {
        selector: '[id="nav-item_search-walk"]',
        content: `Click the Search tab in the main menu to find what you need...`,
      },
      {
        selector: '[id="searchBox_walk"]',
        content: `Enter a keyword and/or location and/or compensation types you're interested in, and click SEARCH`,
      },
      {
        selector: '[id="filter_list_walk"]',
        content: `Filter your Search by selecting categories to help narrow down the results.`,
      },
      {
        selector: '[id="card_walk"]',
        content: `Click on the title to see a more detailed view.`,
      },
    ],
  },
  CONTACT_A_MEMBER: {
    title: 'Contact a Member',
    description: (
      <span>
        Show Me opens the Details page of the first Offer (not owned by current
        member) found via the Search page.
      </span>
    ),
    activeKey: 'contact_a_member',
    steps: [
      {
        selector: '[id="nav-item_search-walk"]',
        content: `Click the Search tab in the main menu to find what you need...`,
      },
      {
        selector: '[id="card_walk"]',
        content: `Click on the title to see a more detailed view.`,
      },
      {
        selector: '[id="profile_photo_walk"]',
        content: `Members may click the contact person's name to view their Profile.`,
      },
      {
        selector: '[id="msg_btn_for_walk"]',
        content: `Members may send a Message to the contact person.`,
      },
    ],
  },
  POST_A_WANT_AD: {
    title: 'Post a Want Ad',
    description: <span>Show Me opens the Search page.</span>,
    activeKey: 'posted_ad',
    steps: [
      {
        selector: '[id="nav-item_search-walk"]',
        content: `Click the Search tab in the main menu to find what you need...`,
      },
      {
        selector: '[id="post_want_add_walk"]',
        content: `Post a Want Ad to tell Members about anything you Need but can not find. That includes advice!`,
      },
      {
        selector: '[id="filter_list_walk"]',
        content: `Select the best category for what you're trying to find, .....then click on 'Post'.`,
      },
    ],
  },
  CREATE_MORE_OFFERS: {
    title: 'Create more Offers',
    description: <span>Show Me opens the Offers page.</span>,
    activeKey: 'created_more_offers',
    steps: [
      {
        selector: '[id="nav-item_offers_walkThrough"]',
        content: `Click the Offers tab in the main menu to manage what you are Offering to other members...`,
      },
      {
        selector: '[id="create_new_offer"]',
        content: `Click the Create New Offer button.`,
      },
    ],
  },
  RESPOND_TO_MESSAGES: {
    title: 'Respond to Messages',
    description: <span>Show Me opens the Messages page.</span>,
    activeKey: 'respond_to_messages',
    steps: [
      {
        selector: '[id="nav-item_message_walkThrough"]',
        content: `Click the Messages tab in the main menu to check for unread messages from other members...`,
      },
    ],
  },
  CREATE_MORE_PROFILES: {
    title: 'Create more Profiles',
    description: <span>Show Me opens Manage Profiles page.</span>,
    activeKey: 'created_more_profiles',
    steps: [
      {
        selector: '[id="manage_profile_btn_walk"]',
        content: `Click to manage profiles...`,
      },
      {
        selector: '[id="secondary_profile"]',
        content: `Select the Manage Profiles subsection to access your alternative Personal Profiles and/or additional Project Profiles..`,
      },
      //   {
      //     selector: '[id="newProfile_walk"]',
      //     content: `Select the Manage Profiles subsection to access your alternative Personal Profiles and/or additional Project Profiles..`,
      //   },
      {
        selector: '[id="add_secondary_profile"]',
        content: `Open the Create New Profile menu to choose which kind of Profile you want to create. Personal Profiles allow you to customise your profile for specific niches, attached to Offers and Want Ads.`,
      },
      {
        selector: '[id="personal_profile"]',
        content: `Personal Profiles allow you to customise your profile for specific niches, attached to Offers and Want Ads.`,
      },
      // {
      //   selector: '[id="add_project_profile_walk"]',
      //   content: `Additional Project Profiles allow you to work on multiple different business/project ideas without creating and paying for separate acocunts`,
      // },
    ],
  },
  GET_MORE_HELP: {
    title: 'Get more help',
    description: (
      <span>Show Me is probably okay on whatever page it already is.</span>
    ),
    activeKey: 'get_help',
    steps: [
      {
        selector: '[id="Respond_help_walk"]',
        content: `Click the Learn tab in the main menu to peruse the available training materials...`,
      },
      // {
      //   selector: '[id="zen_support_walk"]',
      //   content: `Select the best category for what you are going to Offer and click the Create New Offer button.`,
      // },
    ],
  },
};
