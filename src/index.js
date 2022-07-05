import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import authInterceptor from './utility/interceptors/authInterceptor';
import tokenInterceptor from './utility/interceptors/tokenInterceptor';
import errorHandler from './utility/errorHandler/errorHandler';
import axios, { API_VERSION } from './config';
import * as serviceWorker from './serviceWorker';
import store from './redux/store/store';
import { Provider } from 'react-redux';
// import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { BrowserRouter as Router } from 'react-router-dom';
import * as actions from './redux/actions/index'

import './styles/custom.css';
import './styles/stylesheets/style.css';
import './index.css';
import storage from './utility/storage';
import { GAinitialize } from './analytics/analytics';

GAinitialize();

let refresh_token = storage.get('refresh_token', null)

// const refreshAuthLogic = failedRequest =>
//     axios.post(API_VERSION + 'auth/refresh_token', {}, {
//         headers: {
//             'x-refreshtoken': refresh_token
//         }
//     })
//         .then(tokenRefreshResponse => {
//             if (tokenRefreshResponse.data.success) {
//                 storage.set('token', tokenRefreshResponse.data.token);
//                 storage.set('refresh_token', tokenRefreshResponse.data.refresh_token);
//                 storage.set('twilio_token', tokenRefreshResponse.data.twilio_token);
//                 failedRequest.response.config.headers['Authorization'] = 'Bearer ' + tokenRefreshResponse.data.token;
//             } else {
//                 store.dispatch(actions.logout())
//             }
//             return Promise.resolve();
//         }).catch(error => {
//             store.dispatch(actions.logout())
//         });

// createAuthRefreshInterceptor(axios, refreshAuthLogic);

axios.interceptors.request.use(authInterceptor, error => Promise.reject(error));
axios.interceptors.response.use(tokenInterceptor, errorHandler);

const app = (
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
);



ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
