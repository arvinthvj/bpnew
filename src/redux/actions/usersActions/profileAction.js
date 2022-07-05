import { ProfileActionTypes } from './actionType';
import * as API from '../../../api/profileAPI';
import storage from '../../../utility/storage';
import { toastMsg } from '../../../utility/utility';
import {
   routes,
   EmailVerificationStatus,
} from '../../../utility/constants/constants';
import store from '../../../redux/store/store';
import { fetchCurrentUser } from './authAction';

function getHistory() {
   const storeState = store.getState();
   const history = storeState.historyReducer.history;
   return history;
}

export const profilePhotoUpload = (extension, image) => {
   let extensionArray = [];
   extensionArray.push(extension);
   return (dispatch) => {
      dispatch({
         type: ProfileActionTypes.PROFILE_PHOTO_UPLOAD,
         payload: API.profilePhotoUpload(extensionArray)
            .then((response) => {
               if (response.data.success || response.data.success === 'true') {
                  // toastMsg("Photo Added Successfully")
                  if (response.data.urls && response.data.urls.length > 0) {
                     response.data.urls.map((url, index) => {
                        dispatch(
                           uploadProfilePhotoToS3(url.presigned_url, image)
                        );
                     });
                  }
                  return { ...response.data, stopLoader: false };
               } else {
                  return { ...response.data, stopLoader: true };
               }
            })
            .catch((error) => {
               console.log(error);
               return { ...error, stopLoader: true };
            }),
      });
   };
};

export const uploadProfilePhotoToS3 = (url, baseImage) => (dispatch) =>
   dispatch({
      type: ProfileActionTypes.UPLOAD_PROFILE_PHOTO_TO_S3BUCKET,
      payload: API.uploadImage(url, baseImage)
         .then((response) => {
            return response.data;
         })
         .catch((error) => {
            return error;
         }),
   });

export const uploadImageOnWordpress = (file) => (dispatch) =>
   dispatch({
      type: ProfileActionTypes.UPLOAD_PROFILE_PHOTO_TO_WORDPRESS,
      payload: API.uploadImageOnWordpress(file)
         .then((response) => {
            return response.data;
         })
         .catch((error) => {
            return error;
         }),
   });

export const createProfile = (user) => (dispatch) =>
   dispatch({
      type: ProfileActionTypes.CREATE_NEW_PROFILE,
      payload: API.createProfile(user)
         .then((response) => {
            if (
               response.data.success === true ||
               response.data.success === 'true'
            ) {
               let history = getHistory();
               let oldUser = storage.get('user', null);
               dispatch(fetchCurrentUser())
                  .then((response) => {
                     debugger
                     if (
                        !oldUser.primary_profile_id &&
                        response.value.user.primary_profile_id
                     ) {
                        history.push(routes.ADD_EXPERIENCE, {
                           isSigningUp: true,
                        });
                     } 
                     else if (
                        history.location.pathname.includes(
                           routes.MANAGE_PROFILE_PLANNER
                        ) && response.data.success === true ||
                        response.data.success === 'true'
                     ) {
                        history.push(routes.MANAGE_ALL_PROFILE);
                     }
                     console.log(response);
                  })
                  .catch((error) => {
                     console.log(error);
                  });
            }
            return response.data;
         })
         .catch((error) => {
            return error;
         }),
   });

export const toggleProfile = (profileId, status) => (dispatch) =>
   dispatch({
      type: ProfileActionTypes.TOGGLE_PROFILE,
      payload: API.toggleProfile(profileId, status)
         .then((response) => {
            if (
               response.data.success === true ||
               response.data.success === 'true'
            ) {
               dispatch(fetchCurrentUser())
                  .then((response) => {
                     console.log(response);
                  })
                  .catch((error) => {
                     console.log(error);
                  });
            }
            return response.data;
         })
         .catch((error) => {
            return error;
         }),
   });

export const updateProfile = (profileId, profile) => (dispatch) =>
   dispatch({
      type: ProfileActionTypes.UPDATE_PROFILE,
      payload: API.updateProfile(profileId, profile)
         .then((response) => {
            if (
               response.data.success === true ||
               response.data.success === 'true'
            ) {
               dispatch(fetchCurrentUser())
                  .then((response) => {
                     console.log(response);
                  })
                  .catch((error) => {
                     console.log(error);
                  });
            }
            return response.data;
         })
         .catch((error) => {
            return error;
         }),
   });

export const deleteProfile = (profileId) => (dispatch) =>
   dispatch({
      type: ProfileActionTypes.DELETE_PROFILE,
      payload: API.deleteProfile(profileId)
         .then((response) => {
            if (
               response.data.success === true ||
               response.data.success === 'true'
            ) {
               let history = getHistory();
               if (routes.BUILD.includes(history.location.pathname)) {
                  dispatch(fetchBusinessProfile())
                     .then((response) => {
                        console.log(response);
                     })
                     .catch((error) => {
                        console.log(error);
                     });
               } else {
                  dispatch(fetchCurrentUser())
                     .then((response) => {
                        console.log(response);
                     })
                     .catch((error) => {
                        console.log(error);
                     });
               }
            }
            return response.data;
         })
         .catch((error) => {
            return error;
         }),
   });

export const updateExperience = (profileId, experienceId, experience) => (
   dispatch
) =>
   dispatch({
      type: ProfileActionTypes.UPDATE_EXPERIENCE,
      payload: API.updateExperience(profileId, experienceId, experience)
         .then((response) => {
            if (
               response.data.success === true ||
               response.data.success === 'true'
            ) {
               dispatch(fetchCurrentUser())
                  .then((response) => {
                     console.log(response);
                  })
                  .catch((error) => {
                     console.log(error);
                  });
            }
            return response.data;
         })
         .catch((error) => {
            return error;
         }),
   });

export const updatePortfolio = (profileId, portfolioId, portfolio) => (
   dispatch
) =>
   dispatch({
      type: ProfileActionTypes.UPDATE_PORTFOLIO,
      payload: API.updatePortfolio(profileId, portfolioId, portfolio)
         .then((response) => {
            if (
               response.data.success === true ||
               response.data.success === 'true'
            ) {
               let history = getHistory();
               if (
                  routes.EDIT_PORTFOLIO.includes(history.location.pathname) ||
                  routes.MANAGE_PORTFOLIO.includes(history.location.pathname)
               ) {
                  toastMsg('Portfolio updated successfully!');
               }
               dispatch(fetchCurrentUser())
                  .then((response) => {
                     console.log(response);
                  })
                  .catch((error) => {
                     console.log(error);
                  });
            }
            return response.data;
         })
         .catch((error) => {
            return error;
         }),
   });

export const deleteExperience = (profileId, experienceId) => (dispatch) =>
   dispatch({
      type: ProfileActionTypes.DELETE_EXPERIENCE,
      payload: API.deleteExperience(profileId, experienceId)
         .then((response) => {
            if (
               response.data.success === true ||
               response.data.success === 'true'
            ) {
               dispatch(fetchCurrentUser())
                  .then((response) => {
                     console.log(response);
                  })
                  .catch((error) => {
                     console.log(error);
                  });
            }
            return response.data;
         })
         .catch((error) => {
            return error;
         }),
   });

export const deletePortfolio = (profileId, experienceId) => (dispatch) =>
   dispatch({
      type: ProfileActionTypes.DELETE_PORTFOLIO,
      payload: API.deletePortfolio(profileId, experienceId)
         .then((response) => {
            if (
               response.data.success === true ||
               response.data.success === 'true'
            ) {
               dispatch(fetchCurrentUser())
                  .then((response) => {
                     console.log(response);
                  })
                  .catch((error) => {
                     console.log(error);
                  });
            }
            return response.data;
         })
         .catch((error) => {
            return error;
         }),
   });

export const createExperience = (profileId, experience) => (dispatch) =>
   dispatch({
      type: ProfileActionTypes.CREATE_NEW_EXPERIENCE,
      payload: API.createExperience(profileId, experience)
         .then((response) => {
            if (
               response.data.success === true ||
               response.data.success === 'true'
            ) {
               let history = getHistory();
               dispatch(fetchCurrentUser())
                  .then((response) => {
                     console.log(response);
                     if (
                        history.location.pathname.includes(
                           routes.ADD_EXPERIENCE
                        )
                     ) {
                        history.push(routes.ADD_PORTFOLIO, {
                           isSigningUp: true,
                        });
                     }
                  })
                  .catch((error) => {
                     console.log(error);
                  });
            }
            return response.data;
         })
         .catch((error) => {
            return error;
         }),
   });

export const createPortfolio = (profileId, portfolio) => (dispatch) =>
   dispatch({
      type: ProfileActionTypes.CREATE_NEW_PORTFOLIO,
      payload: API.createPortfolio(profileId, portfolio)
         .then((response) => {
            if (
               response.data.success === true ||
               response.data.success === 'true'
            ) {
               let history = getHistory();
               dispatch(fetchCurrentUser())
                  .then((response) => {
                     console.log(response);
                     if (
                        history.location.pathname.includes(routes.ADD_PORTFOLIO)
                     ) {
                        history.push(routes.ADD_SKILLS, { isSigningUp: true });
                     }
                  })
                  .catch((error) => {
                     console.log(error);
                  });
            }
            return response.data;
         })
         .catch((error) => {
            return error;
         }),
   });

export const createSkills = (profileId, skills) => (dispatch) =>
   dispatch({
      type: ProfileActionTypes.CREATE_NEW_SKILL,
      payload: API.createSkills(profileId, skills)
         .then((response) => {
            if (
               response.data.success === true ||
               response.data.success === 'true'
            ) {
               let history = getHistory();
               dispatch(fetchCurrentUser())
                  .then((response) => {
                     console.log(response);
                     let user = storage.get('user', null);
                     if (
                        user.email_verification_status ===
                        EmailVerificationStatus.VERIFICATION_REQUIRED
                     ) {
                        history.push(routes.EMAIL_VERIFICATION);
                     } else {
                        history.push(routes.HOME);
                     }
                  })
                  .catch((error) => {
                     console.log(error);
                  });
            }
            return response.data;
         })
         .catch((error) => {
            return error;
         }),
   });

export const businessProfile = (status, selectedBusinessProfileId) => (
   dispatch
) =>
   dispatch({
      type: ProfileActionTypes.BUSINESSPROFILE,
      payload: {
         status: status,
         selectedBusinessProfileId: selectedBusinessProfileId,
      },
   });

export const fetchBusinessProfile = () => (dispatch) =>
   dispatch({
      type: ProfileActionTypes.FETCHBUSINESSPROFILE,
      payload: API.fetchBusinessProfile()
         .then((response) => {
            if (response.data.success || response.data.success === 'true') {
            }
            return response.data;
         })
         .catch((error) => {
            console.log(error);
            // errorHandler(error);
            return error;
         }),
   });

export const getProfile = (id) => (dispatch) =>
   dispatch({
      type: ProfileActionTypes.GET_PROFILE,
      payload: API.getProfile(id)
         .then((response) => {
            if (response.data.success || response.data.success === 'true') {
            }
            return response.data;
         })
         .catch((error) => {
            console.log(error);
         }),
   });
