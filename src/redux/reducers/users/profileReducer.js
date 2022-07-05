import { de } from 'date-fns/locale';
import { ProfileActionTypes } from '../../actions/usersActions/actionType';

export const initialState = {
  photo_path: [],
  isloading: false,
  isBusinessServiceLoading: false,
  businessProfile: false,
  businessProfiles: [],
  selectedBusinessProfileId: null,
  businessProfileDetail: null,
};

const updateObject = (oldState, updatedProps) => {
  return {
    ...oldState,
    ...updatedProps,
  };
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ProfileActionTypes.PROFILE_PHOTO_UPLOAD_PENDING:
      return updateObject(state, { isloading: true });
    case ProfileActionTypes.PROFILE_PHOTO_UPLOAD_FULFILLED:
      if (action.payload.urls && action.payload.urls.length > 0) {
        action.payload.urls.map((data, index) => {
          return updateObject(state, {
            isloading:
              action.payload && action.payload.stopLoader ? false : true,
            ...state.photo_path.push(...state.photo_path, data.photo_path),
          });
        });
      } else {
        return updateObject(state, {
          isloading: action.payload && action.payload.stopLoader ? false : true,
        });
      }

    case ProfileActionTypes.UPLOAD_PROFILE_PHOTO_TO_WORDPRESS_PENDING:
      return updateObject(state, { isloading: true });
    case ProfileActionTypes.UPLOAD_PROFILE_PHOTO_TO_WORDPRESS_FULFILLED:
      if (action.payload.data && action.payload.data.media && action.payload.data.media.length > 0) {
        action.payload.data.media.map((data, index) => {
          return updateObject(state, {
            ...state.photo_path.push(...state.photo_path, data.photo_path),
          });
        });
        return updateObject(state, {
          isloading: false,
        });
      } else {
        return updateObject(state, {
          isloading: false,
        });
      }

    case ProfileActionTypes.UPLOAD_PROFILE_PHOTO_TO_S3BUCKET_PENDING:
      return updateObject(state, { isloading: true });
    case ProfileActionTypes.UPLOAD_PROFILE_PHOTO_TO_S3BUCKET_FULFILLED:
      return updateObject(state, { isloading: false });

    case ProfileActionTypes.CREATE_NEW_PROFILE_PENDING:
      return updateObject(state, { isloading: true });
    case ProfileActionTypes.CREATE_NEW_PROFILE_FULFILLED:
      return updateObject(state, { isloading: false, photo_path: [] });

    case ProfileActionTypes.TOGGLE_PROFILE_PENDING:
      return updateObject(state, { isloading: true });
    case ProfileActionTypes.TOGGLE_PROFILE_FULFILLED:
      return updateObject(state, { isloading: false });

    case ProfileActionTypes.DELETE_PROFILE_PENDING:
      return updateObject(state, { isloading: true });
    case ProfileActionTypes.DELETE_PROFILE_FULFILLED:
      return updateObject(state, { isloading: false });

    case ProfileActionTypes.CREATE_NEW_EXPERIENCE_PENDING:
      return updateObject(state, { isloading: true });
    case ProfileActionTypes.CREATE_NEW_EXPERIENCE_FULFILLED:
      return updateObject(state, { isloading: false });

    case ProfileActionTypes.CREATE_NEW_PORTFOLIO_PENDING:
      return updateObject(state, { isloading: true });
    case ProfileActionTypes.CREATE_NEW_PORTFOLIO_FULFILLED:
      return updateObject(state, { isloading: false });

    case ProfileActionTypes.CREATE_NEW_SKILL_PENDING:
      return updateObject(state, { isloading: true });
    case ProfileActionTypes.CREATE_NEW_SKILL_FULFILLED:
      return updateObject(state, { isloading: false });

    case ProfileActionTypes.UPDATE_PROFILE_PENDING:
      return updateObject(state, { isloading: true });
    case ProfileActionTypes.UPDATE_PROFILE_FULFILLED:
      return updateObject(state, { isloading: false, photo_path: [] });

    case ProfileActionTypes.UPDATE_EXPERIENCE_PENDING:
      return updateObject(state, { isloading: true });
    case ProfileActionTypes.UPDATE_EXPERIENCE_FULFILLED:
      return updateObject(state, { isloading: false });

    case ProfileActionTypes.UPDATE_PORTFOLIO_PENDING:
      return updateObject(state, { isloading: true });
    case ProfileActionTypes.UPDATE_PORTFOLIO_FULFILLED:
      return updateObject(state, { isloading: false });

    case ProfileActionTypes.DELETE_EXPERIENCE_PENDING:
      return updateObject(state, { isloading: true });
    case ProfileActionTypes.DELETE_EXPERIENCE_FULFILLED:
      return updateObject(state, { isloading: false });

    case ProfileActionTypes.DELETE_PORTFOLIO_PENDING:
      return updateObject(state, { isloading: true });
    case ProfileActionTypes.DELETE_PORTFOLIO_FULFILLED:
      return updateObject(state, { isloading: false });

    case ProfileActionTypes.BUSINESSPROFILE:
      return updateObject(state, {
        businessProfile: action.payload.status,
        selectedBusinessProfileId: action.payload.selectedBusinessProfileId,
      });

    case ProfileActionTypes.FETCHBUSINESSPROFILE_PENDING:
      return updateObject(state, {
        isloading: true,
      });
    case ProfileActionTypes.FETCHBUSINESSPROFILE_FULFILLED:
      return updateObject(state, {
        isloading: false,
        businessProfiles: action.payload.profiles,
      });

    case ProfileActionTypes.GET_PROFILE_PENDING:
      return updateObject(state, {
        isBusinessServiceLoading: true,
      });
    case ProfileActionTypes.GET_PROFILE_FULFILLED:
      return updateObject(state, {
        isBusinessServiceLoading: false,
        businessProfileDetail: action.payload
          ? {
            ...action.payload.profile,
            profile: {
              ...action.payload.profile.user.profiles[0],
              name: action.payload.profile.name,
            },
          }
          : null,
      });

    default:
      return state;
  }
};
