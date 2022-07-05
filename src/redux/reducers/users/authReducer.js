import { AuthActionTypes } from '../../actions/usersActions/actionType';
import storage from '../../../utility/storage';

const token = storage.get("token", null);
const refresh_token = storage.get("refresh_token", null);
const twilio_token = storage.get("twilio_token", null);
const user = storage.get("user", null);
const quickstart = storage.get("quickstart", null);

export const initialState = {
    token: token,
    refresh_token: refresh_token,
    twilio_token: twilio_token,
    user: user,
    isloading: false,
    isAdmin: user && user.role === "admin" ? true : false,
    resetPasswordToken: null,
    error: null,
    send_otp: false,
    isSigningInFromDetails: false,
    termsAgreedFromModal: false,
    isRefreshTokenLoading: false,
    quickstartItems: quickstart
}

const updateObject = (oldState, updatedProps) => {
    return {
        ...oldState,
        ...updatedProps
    }
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {

        case AuthActionTypes.LOGIN_PENDING:
            return updateObject(state, { isloading: true });
        case AuthActionTypes.LOGIN_FULFILLED:
            return updateObject(state, {
                isloading: false,
                user: action.payload ? action.payload.user : state.user,
                token: action.payload ? action.payload.token : null,
                refresh_token: action.payload ? action.payload.refreshToken : null,
                twilio_token: action.payload ? action.payload.twilio_token : null
            });

        case AuthActionTypes.SIGNUP_PENDING:
            return updateObject(state, { isloading: true });
        case AuthActionTypes.SIGNUP_FULFILLED:
            return updateObject(state, {
                isloading: false,
                user: action.payload ? action.payload.user : null,
                token: action.payload ? action.payload.token : null,
                refresh_token: action.payload ? action.payload.refreshToken : null,
                twilio_token: action.payload ? action.payload.twilio_token : null
            });

        case AuthActionTypes.REFRESH_AUTH_TOKEN_PENDING:
            return updateObject(state, { isloading: true, isRefreshTokenLoading: true });
        case AuthActionTypes.REFRESH_AUTH_TOKEN_FULFILLED:
            return updateObject(state, {
                isloading: false,
                token: action.payload ? action.payload.token : null,
                refresh_token: action.payload ? action.payload.refresh_token : null,
                twilio_token: action.payload ? action.payload.twilio_token : null,
                isRefreshTokenLoading: false
            });

        case AuthActionTypes.GOOGLE_AUTH_PENDING:
            return updateObject(state, { isloading: true });
        case AuthActionTypes.GOOGLE_AUTH_FULFILLED:
            return updateObject(state, {
                isloading: false,
                user: action.payload ? action.payload.user : null,
                token: action.payload ? action.payload.token : null,
                refresh_token: action.payload ? action.payload.refreshToken : null,
                twilio_token: action.payload ? action.payload.twilio_token : null
            });

        case AuthActionTypes.FB_AUTH_PENDING:
            return updateObject(state, { isloading: true });
        case AuthActionTypes.FB_AUTH_FULFILLED:
            return updateObject(state, {
                isloading: false,
                user: action.payload ? action.payload.user : null,
                token: action.payload ? action.payload.token : null,
                refresh_token: action.payload ? action.payload.refreshToken : null,
                twilio_token: action.payload ? action.payload.twilio_token : null
            });

        case AuthActionTypes.FETCH_CURRENT_USER_PENDING:
            return updateObject(state, { isloading: true });
        case AuthActionTypes.FETCH_CURRENT_USER_FULFILLED:
            return updateObject(state, {
                isloading: false,
                user: action.payload ? action.payload.user : null
            });

        case AuthActionTypes.RESEND_OTP_PENDING:
            return updateObject(state, { isloading: true });
        case AuthActionTypes.RESEND_OTP_FULFILLED:
            return updateObject(state, { isloading: false });

        case AuthActionTypes.VERIFY_OTP_PENDING:
            return updateObject(state, { isloading: true });
        case AuthActionTypes.VERIFY_OTP_FULFILLED:
            return updateObject(state, {
                isloading: false,
                error: action.payload && !action.payload.success ? action.payload.message : null,
                isloading: action.payload && action.payload.stopLoader ? false : true
            });

        case AuthActionTypes.FORGOT_PASSWORD_PENDING:
            return updateObject(state, { isloading: true });
        case AuthActionTypes.FORGOT_PASSWORD_FULFILLED:
            return updateObject(state, { isloading: false });

        case AuthActionTypes.RESET_PASSWORD_PENDING:
            return updateObject(state, { isloading: true });
        case AuthActionTypes.RESET_PASSWORD_FULFILLED:
            return updateObject(state, { isloading: false });

        case AuthActionTypes.UPDATE_ACCOUNT_INFO_PENDING:
            return updateObject(state, { isloading: true });
        case AuthActionTypes.UPDATE_ACCOUNT_INFO_FULFILLED:
            return updateObject(state, { isloading: action.payload && action.payload.stopLoader ? false : true });

        case AuthActionTypes.CHANGE_PASSWORD_PENDING:
            return updateObject(state, { isloading: true });
        case AuthActionTypes.CHANGE_PASSWORD_FULFILLED:
            return updateObject(state, { isloading: false });

        case AuthActionTypes.SEND_OTP:
            return updateObject(state,
                {
                    send_otp: action.payload.send_otp,
                });

        case AuthActionTypes.AUTHORIZE:
            const payload = action.payload;
            const isAdmin = payload.user_profile.role === "superadmin" ? true : false;
            return updateObject(state,
                {
                    token: payload.token,
                    user: payload.user_profile,
                    refresh_token: payload.refresh_token,
                    twilio_token: payload.twilio_token,
                    isAdmin: isAdmin
                });

        case AuthActionTypes.LOGOUT:
            return updateObject(state, {
                token: null,
                refresh_token: null,
                user: null,
                isloading: false,
                isAdmin: false,
                impersonate: false,
            });

        case AuthActionTypes.SIGNOUT_FULFILLED:
            return updateObject(state, {
                token: null,
                refresh_token: null,
                user: null,
                isloading: false,
                isAdmin: false,
                impersonate: false,
            });

        case AuthActionTypes.VERIFY_EDU_EMAIL_PENDING:
            return updateObject(state, { isloading: true });
        case AuthActionTypes.VERIFY_EDU_EMAIL_FULFILLED:
            return updateObject(state, {
                isloading: false,
            });

        case AuthActionTypes.SEND_EDU_EMAIL_PENDING:
            return updateObject(state, { isloading: true });
        case AuthActionTypes.SEND_EDU_EMAIL_FULFILLED:
            return updateObject(state, {
                isloading: false,
            });

        case AuthActionTypes.UPDATE_QUICKSTART_ITEMS:
            return updateObject(state, {
                quickstartItems: action.payload ? action.payload : false,
            });

        case AuthActionTypes.TOGGLE_TERMS_AGREED_FROM_MODAL:
            return updateObject(state, {
                termsAgreedFromModal: action.payload ? action.payload : false,
            });

        case AuthActionTypes.UPDATE_USER:
            storage.set('user', action.payload);
            return updateObject(state, {
                user: action.payload
            })
        default: return state;
    }
}