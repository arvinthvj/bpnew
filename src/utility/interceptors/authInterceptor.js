import store from '../../redux/store/store';
import storage from '../storage';

const authInterceptor = (config) => {
    const state = store.getState();
    const redirectTo = storage.get('redirectedFromWordpressRoute')
    if (state.authReducer.token) {
        config.headers.common['Authorization'] = 'Bearer ' + state.authReducer.token;
    } else if (redirectTo) {
        config.headers.common['x-auth-key'] = 'eyJwcm9qZWN0IjoicGFydG5lcmhlcmUifQ==';
    }
    return config;
}

export default authInterceptor;