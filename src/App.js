import React from 'react';
import './App.css';
import AppRouter from './router/router';
import { removeConsoleLog } from './utility/utility';
import { BrowserRouter as Router } from 'react-router-dom';
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import RouteChangeListener from './utility/RouteChangeListener';
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import * as miscActions from './redux/actions/usersActions/miscAction';
import Oux from './hoc/Oux/Oux';
import * as actions from './redux/actions/index'
import './styles/js/custom'
import { routes } from './utility/constants/constants';
import storage from './utility/storage';
import Zendesk from "react-zendesk";
import { ZENDESK_KEY, Tooltip_Script } from './config';
import $ from 'jquery'
import { loadAnaylticsPageView } from './analytics/analytics';
import CookieConsent from "react-cookie-consent";
import CustomToolTip from './components/UI/CustomToolTip/CustomToolTip';
import Helmet from 'react-helmet'
import { Base64 } from 'js-base64';

// Take contact form as an example
// Let's customise our contact form appearance, launcher and add prefill content
const setting = {
  color: {
    theme: "#EF5A2F"
  },
  launcher: {
    chatLabel: {
      "en-US": "Need Help"
    }
  },
  contactForm: {
    fields: [
      { id: "description", prefill: { "*": "" } }
    ]
  }
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allowLoadingThirdParty: false
    }
  }

  loadJquery = () => {
    $(document).ready(function () {
      $(document).click(function (event) {
        var clickover = $(event.target);
        var _opened = $(".navbar-collapse").hasClass("navbar-collapse mobile_sidenav collapse show");
        // console.log(_opened, "trueOrFalse")
        // console.log(!clickover.hasClass("navbar-toggler"))
        if (_opened === true && !clickover.hasClass("navbar-toggler")) {
          if (!$(".dropdown").hasClass("dropdown show")) {
            $("button.navbar-toggler").click();
          }
        }
      });
    });
  }

  componentWillMount = () => {
    if (process.env.REACT_APP_ENV === 'production') {
      removeConsoleLog();
    }
    let login = new URLSearchParams(this.props.history.location.search, { ignoreQueryPrefix: true }).get('login')
    let via = new URLSearchParams(this.props.history.location.search, { ignoreQueryPrefix: true }).get('via')
    let plan = new URLSearchParams(this.props.history.location.search, { ignoreQueryPrefix: true }).get('plan')
    let token = new URLSearchParams(this.props.history.location.search, { ignoreQueryPrefix: true }).get('token')
    let isSignedUp = new URLSearchParams(this.props.history.location.search, { ignoreQueryPrefix: true }).get('isSignedUp')
    let wp_id = new URLSearchParams(this.props.history.location.search, { ignoreQueryPrefix: true }).get('wp_id')
    if (token) {
      token = JSON.parse(Base64.decode(token))
      this.props.history.push(this.props.history.location.pathname)
      storage.set('user', token.user)
      storage.set('token', token.token)
      storage.set('refresh_token', token.refresh_token)
      storage.set('twilio_token', token.twilio_token)
      if (isSignedUp) {
        storage.set('isSignedUp', isSignedUp)
        storage.set('wp_id', wp_id)
      }
      window.location.reload()
    }
    if (login) {
      storage.set('redirectedFromWordpressRoute', this.props.history.location.pathname)
      this.props.handleWordpressLogin(login)
    }
    if (via) {
      storage.set('via', via)
    }
    if (plan) {
      storage.set('via', via)
    }
    this.props.addHistory(this.props.history);
    loadAnaylticsPageView();
    // let currentPath = this.props.history.location.pathname
    // if (currentPath.includes("details")) {
    //   storage.set("D_route", currentPath)
    //   this.props.navigateToDetails(true)
    // }
    let logoutFromReact = new URLSearchParams(this.props.history.location.search, { ignoreQueryPrefix: true }).get('logoutfromreact')
    if (logoutFromReact && this.props.user) {
      this.props.logout()
    }
  }

  componentDidMount = () => {
    this.loadJquery()
    this.props.history.listen(() => {
      window.scroll(0, 0);
      loadAnaylticsPageView();
    });
    let logoutFromReact = new URLSearchParams(this.props.history.location.search, { ignoreQueryPrefix: true }).get('logoutfromreact')
    if (logoutFromReact && this.props.user) {
      this.props.logout()
    }
    let detailsRoute = storage.get("D_route", null)
    if (detailsRoute) {
      this.props.history.push(routes.LOGIN)
    }
    this.props.fetchConfig()
    this.props.fetchSettings()
    this.props.fetchCityList()
    this.props.fetchSuccessStories()

    setTimeout(() => {
      this.setState({
        allowLoadingThirdParty: true
      });
    }, 3000);
  }

  componentDidUpdate = () => {
    this.loadJquery()
  }

  render() {
    return (
      <Oux>
        <Helmet>
          {Tooltip_Script()}
        </Helmet>

        {this.state.allowLoadingThirdParty && <Zendesk zendeskKey={ZENDESK_KEY} {...setting} onLoaded={() => console.log('zendesk is loaded')} />}
        <RouteChangeListener />
        <ReactNotification />
        <CookieConsent buttonClasses="theme_primary theme_btn text-uppercase cookie_accept_btn" buttonId="cookie_accept_btn">
          We use cookies to recognize your preferences and for delivering the best browsing experience. By continuing to use our site, you agree to accept our
          <a href={routes.COOKIE_POLICY} target="_blank" className="form_link ft_Weight_500 ph_underline"> Cookie Policy</a>
          <CustomToolTip placement="top" text="Opens in another window">
            <img onClick={() => window.open(routes.COOKIE_POLICY, '_blank')} src="/custom_images/popout-solid.svg" className="icn_red cookie_policy_icon ml-1" alt="Icon" />
          </CustomToolTip>
        </CookieConsent>
        <AppRouter {...this.props} />
      </Oux>
    );
  }
}


const mapStateToProps = (state) => ({
  user: state.authReducer.user,
  token: state.authReducer.token,
  isRefreshTokenLoading: state.authReducer.isRefreshTokenLoading
});

const mapStateToDispatch = (dispatch) => ({
  fetchConfig: () => dispatch(actions.config()),
  fetchSettings: () => dispatch(actions.settings()),
  fetchCityList: () => dispatch(actions.fetchCityList()),
  resetPassword: (credentials) => dispatch(actions.resetPassword(credentials)),
  addHistory: (history) => dispatch(miscActions.addHistory(history)),
  navigateToDetails: (flag) => dispatch(actions.navigateToDetails(flag)),
  fetchSuccessStories: () => dispatch(actions.fetchSuccessStories()),
  logout: () => dispatch(actions.logout()),
  fetchCurrentUser: () => dispatch(actions.fetchCurrentUser()),
  handleWordpressLogin: (credentials) => dispatch(actions.handleWordpressLogin(credentials))
});

export default connect(mapStateToProps, mapStateToDispatch)(withRouter(App));
