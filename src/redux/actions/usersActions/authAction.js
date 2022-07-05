import { AuthActionTypes, MiscActionTypes } from './actionType';
import * as API from '../../../api/authAPI';
import storage from '../../../utility/storage';
import { toastMsg } from '../../../utility/utility';
import { routes, SubscriptionStatus } from '../../../utility/constants/constants';
import store from '../../../redux/store/store';
import axios, { LMS_BASE_URL } from '../../../config'
import $ from 'jquery'

function getHistory() {
    const storeState = store.getState();
    const history = storeState.historyReducer.history;
    return history;
}


export const login = (credentials) => dispatch => dispatch({
    type: AuthActionTypes.LOGIN,
    payload: API.login(credentials)
        .then(response => {
            if (response.data.success === true || response.data.success === "true") {
                storage.set('token', response.data.token)
                storage.set('refresh_token', response.data.refresh_token)
                storage.set('twilio_token', response.data.twilio_token)
                storage.set('user', response.data.user)
                let quickstart = storage.get('quickstart')
                setTimeout(() => {
                    $('#click').click()
                }, 3000)
                if (!quickstart) {
                    quickstart = {
                        edited_default_offer: false,
                        plan_your_project: false,
                        created_project_profile: false,
                        searched_offer: false,
                        contact_a_member: false,
                        posted_ad: false,
                        created_more_offers: false,
                        respond_to_messages: false,
                        created_more_profiles: false,
                        get_help: false
                    }
                    storage.set('quickstart', quickstart)
                }
                if (!response.data.user.phone_verified) {
                    dispatch(sendOTP(true))
                }
            }
            return response.data;
        })
        .catch(error => {
            console.log(error);
            // errorHandler(error);
            return error;
        })
});

export const handleWordpressLogin = (credentials) => dispatch => dispatch({
    type: AuthActionTypes.LOGIN,
    payload: API.handleWordpressLogin(credentials)
        .then(response => {
            debugger
            if (response.data.success === true || response.data.success === "true") {
                storage.set('token', response.data.token)
                storage.set('refresh_token', response.data.refresh_token)
                storage.set('twilio_token', response.data.twilio_token)
                storage.set('user', response.data.user)
                let quickstart = storage.get('quickstart')
                setTimeout(() => {
                    $('#click').click()
                }, 3000)
                if (!quickstart) {
                    quickstart = {
                        edited_default_offer: false,
                        plan_your_project: false,
                        created_project_profile: false,
                        searched_offer: false,
                        contact_a_member: false,
                        posted_ad: false,
                        created_more_offers: false,
                        respond_to_messages: false,
                        created_more_profiles: false,
                        get_help: false
                    }
                    storage.set('quickstart', quickstart)
                }
                if (!response.data.user.phone_verified) {
                    dispatch(sendOTP(true))
                }
            } else {
                let redirectTo = storage.get('redirectedFromWordpressRoute')
                if (redirectTo) {
                    storage.remove('redirectedFromWordpressRoute')
                }
            }
            return response.data;
        })
        .catch(error => {
            let redirectTo = storage.get('redirectedFromWordpressRoute')
            if (redirectTo) {
                storage.remove('redirectedFromWordpressRoute')
            }
            console.log(error);
            // errorHandler(error);
            return error;
        })
});

export const signup = (credentials) => dispatch => dispatch({
    type: AuthActionTypes.SIGNUP,
    payload: API.signup(credentials)
        .then(response => {
            if (response.data.success === true || response.data.success === "true") {
                storage.set('token', response.data.token)
                storage.set('refresh_token', response.data.refresh_token)
                storage.set('twilio_token', response.data.twilio_token)
                storage.set('user', response.data.user)
                storage.remove('via')
                let quickstart = storage.get('quickstart')
                if (!quickstart) {
                    quickstart = {
                        edited_default_offer: false,
                        plan_your_project: false,
                        created_project_profile: false,
                        searched_offer: false,
                        contact_a_member: false,
                        posted_ad: false,
                        created_more_offers: false,
                        respond_to_messages: false,
                        created_more_profiles: false,
                        get_help: false
                    }
                    storage.set('quickstart', quickstart)
                }
            }
            return response.data;
        }).catch(error => {
            console.log(error);
            // errorHandler(error);
            return error;
        })
});

export const googleAuth = (credentials) => dispatch => dispatch({
    type: AuthActionTypes.GOOGLE_AUTH,
    payload: API.googleAuth(credentials)
        .then(response => {
            if (response.data.success === true || response.data.success === "true") {
                storage.set('token', response.data.token)
                storage.set('refresh_token', response.data.refresh_token)
                storage.set('twilio_token', response.data.twilio_token)
                storage.set('user', response.data.user)
                let quickstart = storage.get('quickstart')
                if (!quickstart) {
                    quickstart = {
                        edited_default_offer: false,
                        plan_your_project: false,
                        created_project_profile: false,
                        searched_offer: false,
                        contact_a_member: false,
                        posted_ad: false,
                        created_more_offers: false,
                        respond_to_messages: false,
                        created_more_profiles: false,
                        get_help: false
                    }
                    storage.set('quickstart', quickstart)
                }
            }
            return response.data;
        }).catch(error => {
            console.log(error);
            // errorHandler(error);
            return error;
        })
});

export const fbAuth = (credentials) => dispatch => dispatch({
    type: AuthActionTypes.FB_AUTH,
    payload: API.fbAuth(credentials)
        .then(response => {
            if (response.data.success === true || response.data.success === "true") {
                storage.set('token', response.data.token)
                storage.set('refresh_token', response.data.refresh_token)
                storage.set('twilio_token', response.data.twilio_token)
                storage.set('user', response.data.user)
                let quickstart = storage.get('quickstart')
                if (!quickstart) {
                    quickstart = {
                        edited_default_offer: false,
                        plan_your_project: false,
                        created_project_profile: false,
                        searched_offer: false,
                        contact_a_member: false,
                        posted_ad: false,
                        created_more_offers: false,
                        respond_to_messages: false,
                        created_more_profiles: false,
                        get_help: false
                    }
                    storage.set('quickstart', quickstart)
                } else {
                    setTimeout(() => {
                        $('#click').click()
                    }, 3000)
                }
            }
            return response.data;
        }).catch(error => {
            console.log(error);
            // errorHandler(error);
            return error;
        })
});

export const verifyOTP = (credentials) => dispatch => dispatch({
    type: AuthActionTypes.VERIFY_OTP,
    payload: API.verifyOTP(credentials)
        .then(response => {
            if (response.data.success || response.data.success === "true") {
                dispatch(fetchCurrentUser())
                return { ...response.data, stopLoader: false };
            }
            else {
                return { ...response.data, stopLoader: true };
            }
        }).catch(error => {
            console.log(error);
            // errorHandler(error);
            return { error, stopLoader: true };
        })
});

export const sendOTP = (send_otp) => {
    return {
        type: AuthActionTypes.SEND_OTP,
        payload: {
            send_otp: send_otp
        }
    }
};

export const updateQuickstartItems = (quickstartItems) => {
    return {
        type: AuthActionTypes.UPDATE_QUICKSTART_ITEMS,
        payload: quickstartItems
    }
};

export const resendOTP = () => dispatch => dispatch({
    type: AuthActionTypes.RESEND_OTP,
    payload: API.resendOTP()
        .then(response => {
            let user = storage.get('user', null)
            if (user.subscription_status !== SubscriptionStatus.ACTIVE) {
                storage.set('redirectToPricing', true)
            }
            return response.data;
        }).catch(error => {
            console.log(error);
            // errorHandler(error);
            return error;
        })
});

export const signout = () => dispatch => dispatch({
    type: AuthActionTypes.SIGNOUT,
    payload: API.signout()
        .then(response => {
            dispatch(logout())
            return response.data;
        }).catch(error => {
            console.log(error);
            // errorHandler(error);
            return error;
        })
});

export const fetchCurrentUser = () => dispatch => dispatch({
    type: AuthActionTypes.FETCH_CURRENT_USER,
    payload: API.fetchCurrentUser()
        .then(response => {
            if (response.data.success || response.data.success === "true") {
                storage.set('user', response.data.user)
            }
            return response.data;
        }).catch(error => {
            console.log(error);
            // errorHandler(error);
            return error;
        })
});

export const forgotPassword = (email) => dispatch => dispatch({
    type: AuthActionTypes.FORGOT_PASSWORD,
    payload: API.forgotPassword(email)
        .then(response => {

            if (response.data.success || response.data.success === "true") {
                toastMsg("Please check your email to reset your password!")
                const history = getHistory();
                history.push(routes.LOGIN);
            } else {
                // toastMsg(response.data);
            }
            return response.data;
        })
        .catch(error => {
            console.log(error);
            // errorHandler(error);
            return error;
        })
});

export const resetPassword = (credentials) => dispatch => dispatch({
    type: AuthActionTypes.RESET_PASSWORD,
    payload: API.resetPassword(credentials)
        .then(response => {

            if (response.data.error) {
                toastMsg(response.data);
            } else {
                if (response.data.success) {
                    storage.remove('reset_password_token');
                    toastMsg("Your Password has been reset sucuessfully. Please login to continue");
                    const history = getHistory();
                    history.push(routes.LOGIN);
                }
            }

            return response.data;
        })
        .catch(error => {
            console.log(error);
            // errorHandler(error);
            return error;
        })
});

export const isSigningInFromDetails = (flag, details) => dispatch => dispatch({
    type: AuthActionTypes.IS_SIGNING_IN_FROM_DETAILS,
    payload: {
        flag: flag,
        details: details
    }
});

export const storeSessionData = ({ user, refresh_token, token, twilio_token }) => {

    storage.set('token', token);
    storage.set('refresh_token', refresh_token);
    storage.set('twilio_token', twilio_token)
    storage.set('user', user);
    let user_profile = user
    return {
        type: AuthActionTypes.AUTHORIZE,
        payload: {
            token,
            user_profile,
            refresh_token,
            twilio_token
        }
    }
}

export const authorizeUser = (user_profile) => {
    console.log("authorize:" + user_profile.access_token);
    console.log("user:" + user_profile);

    storage.set('token', user_profile.access_token);
    storage.set('refresh_token', user_profile.refresh_token);
    storage.set('twilio_token', user_profile.twilio_token)
    storage.set('user', user_profile);

    const token = user_profile.access_token;
    const refresh_token = user_profile.refresh_token;
    const twilio_token = user_profile.twilio_token;
    return {
        type: AuthActionTypes.AUTHORIZE,
        payload: {
            token,
            user_profile,
            refresh_token,
            twilio_token
        }
    }
};

export const logout = () => dispatch => {
    storage.remove('token');
    storage.remove('user');
    storage.remove('refresh_token');
    storage.remove('D_id');
    storage.remove('D_type');
    storage.remove('D_route');
    storage.remove('twilio_token');
    storage.remove('isSignedUp');
    storage.remove('reEditPhoneNumber');
    storage.remove('redirectToPricing');
    storage.remove('isEdit');
    storage.remove('classified');
    storage.remove('service');
    storage.remove('activeTour')
    let history = getHistory();
    history.push('/loading');
    dispatch({
        type: MiscActionTypes.STORE_USER_SEARCH,
        payload: {
            userSearch: {
                selectedCompensation: [],
                selectedFilter: [],
                selectedQuery: null,
                selectedCity: null,
                selectedClassified: false,
            },
            isUserLoggedOut: true
        }
    })
    dispatch({
        type: AuthActionTypes.LOGOUT,
    })
    window.open(`${LMS_BASE_URL()}?logoutfromlms=true`, '_self')
};

export const updateUserProfile = (user) => dispatch => dispatch({
    type: AuthActionTypes.UPDATE_USER,
    payload: user
})

export const updateAccountInfo = (user) => {
    return (dispatch, getState) => {
        dispatch({
            type: AuthActionTypes.UPDATE_ACCOUNT_INFO,
            payload: API.updateAccountInfo(user)
                .then(response => {
                    if (!response.data.error) {
                        let reEditPhoneNumber = storage.get('reEditPhoneNumber', null)
                        if (reEditPhoneNumber) {
                            storage.remove('reEditPhoneNumber');
                        }
                        dispatch(fetchCurrentUser())
                        return { ...response.data, stopLoader: false };
                    } else {
                        return { ...response.data, stopLoader: true };
                    }
                })
                .catch(error => {
                    console.log(error);
                    return { ...error, stopLoader: true }
                })
        })
    }
}

export const changePassword = (password) => {
    return (dispatch, getState) => {
        dispatch({
            type: AuthActionTypes.CHANGE_PASSWORD,
            payload: API.changePassword(password)
                .then(response => {
                    if (response.data.success || response.data.success === "true") {
                        toastMsg('Password changed successfully')
                        return response.data;
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        })
    }
}

export const verifyEduEmail = (token) => dispatch => dispatch({
    type: AuthActionTypes.VERIFY_EDU_EMAIL,
    payload: API.verifyEduEmail(token)
        .then(response => {
            if (response.data.success === true || response.data.success === "true") {
                //success
                let user = storage.get('user', null)
                if (user) {
                    dispatch(fetchCurrentUser())
                }
            }
            return response.data;
        }).catch(error => {
            console.log(error);
            // errorHandler(error);
            return error;
        })
});

export const sendVerifyEduEmail = () => dispatch => dispatch({
    type: AuthActionTypes.SEND_EDU_EMAIL,
    payload: API.sendEduVerificationEmail()
        .then(response => {
            if (response.data.success === true || response.data.success === "true") {
                //success
            }
            return response.data;
        }).catch(error => {
            console.log(error);
            // errorHandler(error);
            return error;
        })
});

export const toggleTermsAgreedFromModal = (flag) => {

    return {
        type: AuthActionTypes.TOGGLE_TERMS_AGREED_FROM_MODAL,
        payload: flag
    }
}

//Refresh Token API

export const refreshAuthToken = (refresh_token, config) => {
    return (dispatch, getState) => {
        dispatch({
            type: AuthActionTypes.REFRESH_AUTH_TOKEN,
            payload: API.refreshAuthToken(refresh_token)
                .then(tokenRefreshResponse => {
                    if (tokenRefreshResponse.data.success) {
                        storage.set('token', tokenRefreshResponse.data.token);
                        storage.set('refresh_token', tokenRefreshResponse.data.refresh_token);
                        storage.set('twilio_token', tokenRefreshResponse.data.twilio_token);
                        config.headers.Authorization = `Bearer ${tokenRefreshResponse.data.token}`;
                        axios.request(config)
                        // failedRequest.response.config.headers['Authorization'] = 'Bearer ' + tokenRefreshResponse.data.token;
                    } else {
                        dispatch(logout())
                    }
                    return tokenRefreshResponse.data;
                }).catch(error => {
                    dispatch(logout())
                })
        })
    }
}