import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';
import { routes } from '../utility/constants/constants';
import Home from '../container/Home/Home';
import Login from '../container/Login/Login';
import Register from '../container/Register/Register';
import ForgotPassword from '../container/ForgotPassword/ForgotPassword';
import SearchResults from '../container/SearchResults/SearchResults';
import GetStarted from '../container/GetStarted/GetStarted';
import VerifyEmail from '../container/VerifyEmail/VerifyEmail';
import AboutUs from '../container/AboutUs/AboutUs';
import ContactUs from '../container/ContactUs/ContactUs';
import Help from '../container/Help/Help';
import SpinnerLoader from '../components/UI/SpinnerLoader/SpinnerLoader';
import PageLoader from '../components/PageLoader/PageLoader';

const nonLoggedInRoutes = props => {
    let user = props.user
    const AboutUsRoute = <Route exact path={routes.ABOUT_US} component={AboutUs} />
    const ContactUsRoute = <Route exact path={routes.CONTACT_US} component={ContactUs} />
    const HelpRoute = <Route exact path={routes.HELP} component={Help} />
    if (props.isRefreshTokenLoading) {
        return (
            <div className="ph_empty_message"><SpinnerLoader /></div>
        )
    }
    return (
        <Switch>
            <Route exact path={routes.ROOT} component={Home} />
            <Route exact path={routes.LOGIN} component={Login} />
            <Route exact path={routes.REGISTER} component={Register} />
            <Route exact path={routes.FORGOT_PASSWORD} component={ForgotPassword} />
            <Route exact path={routes.HOME} component={SearchResults} />
            {/* <Route exact path={routes.SEARCH_RESULT} component={SearchResults} /> */}
            <Route exact path={routes.GET_STARTED} component={GetStarted} />
            <Route exact path={routes.VERIFY_EMAIL} component={VerifyEmail} />
            <Route exact path={routes.RESET_PASSWORD_TOKEN} render={() => <ForgotPassword history={props.history} resetPassword={props.resetPassword} user={user} />} />
            {AboutUsRoute}
            {ContactUsRoute}
            {HelpRoute}
            <Route exact path={'/loading'} component={PageLoader} />
            <Route path='*' render={(props) => <Redirect to={routes.ROOT} />} />
        </Switch>
    )
}

export default nonLoggedInRoutes