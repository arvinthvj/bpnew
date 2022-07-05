import axios, { API_VERSION, LMS_BASE_URL } from '../config';
import realAxios from 'axios'
const upload = require('axios');

const apiHeaders = {
   headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
   },
};

export const profilePhotoUpload = (extension) => {
   // return axios.get(API_VERSION + 'presignedurl?ext=.' + extension, apiHeaders)
   return axios.patch(
      API_VERSION + `presignedUrl`,
      { ext: extension },
      apiHeaders
   );
};

export const uploadImageOnWordpress = (file) => {
   var bodyFormData = new FormData();
   bodyFormData.append('file[0]', file);
   bodyFormData.append('auth_key', '054e86b8f38982b32044973976716e1a942dd77fd0ddb3ca9c9421fb69146784')
   return realAxios.post(`${LMS_BASE_URL()}/wp-json/wp/v2/upload_media`, bodyFormData)
}

export const uploadImage = (url, baseImage) => {
   return upload.put(url, baseImage);
};

export const createProfile = (user) => {
   return axios.post(API_VERSION + 'user/profile', user, {
      headers: {
         'Content-Type': 'application/json',
         Accept: 'application/json',
      },
      defaultErrorHandler: true,
   });
};

export const createExperience = (profileId, experience) => {
   return axios.post(
      API_VERSION + `user/profile/${profileId}/experience`,
      experience,
      {
         headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
         },
         defaultErrorHandler: true,
      }
   );
};

export const createPortfolio = (profileId, portfolio) => {
   return axios.post(
      API_VERSION + `user/profile/${profileId}/portfolio`,
      portfolio,
      {
         headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
         },
         defaultErrorHandler: true,
      }
   );
};

export const toggleProfile = (profileId, status) => {
   return axios.put(API_VERSION + `user/profile/${profileId}/toggle`, status, {
      headers: {
         'Content-Type': 'application/json',
         Accept: 'application/json',
      },
      defaultErrorHandler: true,
   });
};

export const createSkills = (profileId, skills) => {
   //calling profile update api for creating or editing skills
   return axios.put(API_VERSION + `user/profile/${profileId}`, skills, {
      headers: {
         'Content-Type': 'application/json',
         Accept: 'application/json',
      },
      defaultErrorHandler: true,
   });
};

export const updateProfile = (profileId, profile) => {
   //calling profile update api for creating or editing skills
   return axios.put(API_VERSION + `user/profile/${profileId}`, profile, {
      headers: {
         'Content-Type': 'application/json',
         Accept: 'application/json',
      },
      defaultErrorHandler: true,
   });
};

export const deleteProfile = (profileId) => {
   //calling profile update api for creating or editing skills
   return axios.delete(API_VERSION + `user/profile/${profileId}`, {
      headers: {
         'Content-Type': 'application/json',
         Accept: 'application/json',
      },
      defaultErrorHandler: true,
   });
};

export const updateExperience = (profileId, experienceId, experience) => {
   //calling profile update api for creating or editing skills
   return axios.put(
      API_VERSION + `user/profile/${profileId}/experience/${experienceId}`,
      experience,
      {
         headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
         },
         defaultErrorHandler: true,
      }
   );
};

export const deleteExperience = (profileId, experienceId) => {
   //calling profile update api for creating or editing skills
   return axios.delete(
      API_VERSION + `user/profile/${profileId}/experience/${experienceId}`,
      {
         headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
         },
         defaultErrorHandler: true,
      }
   );
};

export const deletePortfolio = (profileId, portfolioId) => {
   //calling profile update api for creating or editing skills
   return axios.delete(
      API_VERSION + `user/profile/${profileId}/portfolio/${portfolioId}`,
      {
         headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
         },
         defaultErrorHandler: true,
      }
   );
};

export const updatePortfolio = (profileId, portfolioId, portfolio) => {
   //calling profile update api for creating or editing skills
   return axios.put(
      API_VERSION + `user/profile/${profileId}/portfolio/${portfolioId}`,
      portfolio,
      {
         headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
         },
         defaultErrorHandler: true,
      }
   );
};

export const fetchBusinessProfile = () => {
   //calling profile update api for creating or editing skills
   return axios.get(
      API_VERSION + 'user/profile?type=company',
      {},
      {
         headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
         },
         defaultErrorHandler: true,
      }
   );
};

export const getProfile = (profileId) => {
   //calling profile api for knowing the profile details
   return axios.get(API_VERSION + `user/profile/${profileId}`, {
      headers: {
         'Content-Type': 'application/json',
         Accept: 'application/json',
      },
      defaultErrorHandler: true,
   });
};
