import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { routes } from '../utility/constants/constants';
import Home from '../container/Home/Home';
import Offers from '../container/Offers/Offers';
import OTPVerification from '../container/Register/OTPVerification/OTPVerification';
import CreatePrimaryProfile from '../container/Profile/CreateProfile/CreateProfile';
import Experience from '../container/Profile/Experience/Experience';
import Skills from '../container/Profile/Skills/Skills';
import Portfolio from '../container/Profile/Portfolio/Portfolio';
import OfferDetails from '../container/OfferDetails/OfferDetails';
import Decks from '../container/Decks/decks';
import Classifieds from '../container/Classifieds/Classifieds';
import AccountInformation from '../container/AccountInformation/AccountInformation';
import PrimaryProfileSection from '../container/Profile/PrimaryProfileSection/PrimaryProfileSection';
import ManageProfileSection from '../container/Profile/ManageProfileSection/ManageProfileSection';
import GetStarted from '../container/GetStarted/GetStarted';
import Messages from '../container/Messages/Messages';
import AboutUs from '../container/AboutUs/AboutUs';
import ContactUs from '../container/ContactUs/ContactUs';
import Help from '../container/Help/Help';
import VerifyEmail from '../container/VerifyEmail/VerifyEmail';
import BusinessProfiles from '../components/ProfileSection/ProfileSectionPage/BusinessProfile/BusinessProfile';
import PageLoader from '../components/PageLoader/PageLoader';

const loggedInRoutes = (props) => {
   let routeList = null;
   let user = props.user;
   const AboutUsRoute = (
      <Route exact path={routes.ABOUT_US} component={AboutUs} />
   );
   const ContactUsRoute = (
      <Route exact path={routes.CONTACT_US} component={ContactUs} />
   );
   const HelpRoute = <Route exact path={routes.HELP} component={Help} />;
   const PageLoadRoute = <Route exact path={'/loading'} component={PageLoader} />
   if (user && props.token) {
      //when user is logged in
      if (user.primary_profile_id) {
         routeList = (
            <Switch>
               <Route
                  exact
                  path={routes.ROOT}
                  render={(props) => <Redirect to={routes.HOME} />}
               />
               <Route exact path={routes.HOME} component={Home} />
               <Route
                  exact
                  path={routes.ADD_EXPERIENCE}
                  component={Experience}
               />
               <Route exact path={routes.ADD_PORTFOLIO} component={Portfolio} />
               <Route exact path={routes.ADD_SKILLS} component={Skills} />
               {/* <Route exact path={routes.OFFER_DETAILS} component={OfferDetails} /> */}
               <Route
                  exact
                  path={routes.OFFER_DETAILS}
                  component={OfferDetails}
               />
               <Route
                  exact
                  path={routes.PROFILE_DETAILS}
                  component={OfferDetails}
               />
               <Route path={routes.PROFILE} component={PrimaryProfileSection} />
               <Route
                  path={routes.MANAGE_PROFILE}
                  component={ManageProfileSection}
               />
               <Route
                  path={routes.ACCOUNT_INFORMATION}
                  component={AccountInformation}
               />
               <Route
                  exact
                  path={[
                     routes.OFFERS,
                     routes.MY_SERVICES,
                     routes.PLACES,
                     routes.THINGS,
                     routes.JOBS,
                     routes.SHARING_OPPORTUNITIES,
                     routes.DONATIONS_GIVEAWAYS,
                  ]}
                  component={Offers}
               />
               <Route exact path={routes.DECKS} component={Decks} />
               <Route exact path={routes.GET_STARTED} component={GetStarted} />
               <Route exact path={routes.CLASSIFIEDS} component={Classifieds} />
               <Route exact path={routes.MESSAGES} component={Messages} />
               <Route
                  exact
                  path={routes.VERIFY_EMAIL}
                  component={VerifyEmail}
               />
               <Route
                  exact
                  path={routes.EMAIL_VERIFICATION}
                  component={VerifyEmail}
               />
               <Route
                  exact
                  path={routes.BUILD}
                  component={BusinessProfiles}
               />
               {AboutUsRoute}
               {ContactUsRoute}
               {HelpRoute}
               {PageLoadRoute}
               {/* <Route exact path={routes.MY_SERVICES} component={MyServicesContainer} />
                    <Route exact path={routes.PLACES} component={PlaceContainer} />
                    <Route exact path={routes.THINGS} component={ThingsContainer} />
                    <Route exact path={routes.JOBS} component={JobsContainer} />
                    <Route exact path={routes.SHARING_OPPORTUNITIES} component={OpportunitiesContainer} />
                    <Route exact path={routes.DONATIONS_GIVEAWAYS} component={DonationsAndGiveawaysContainer} /> */}
               <Route path="*" render={() => <Redirect to={routes.HOME} />} />
            </Switch>
         );
      }
      // else if (user.phone && !user.phone_verified) {
      //     routeList = (
      //         <Switch>
      //             <Route exact path={routes.ROOT} render={(props) => <Redirect to={routes.VERIFY_OTP} />} />
      //             <Route exact path={routes.VERIFY_OTP} component={OTPVerification} />
      //             {AboutUsRoute}
      //             {ContactUsRoute}
      //             {HelpRoute}
      //             <Route path='*' render={() => <Redirect to={routes.VERIFY_OTP} />} />
      //         </Switch>
      //     )
      // }
      else {
         routeList = (
            <Switch>
               <Route
                  exact
                  path={routes.ROOT}
                  render={(props) => (
                     <Redirect to={routes.CREATE_NEW_PROFILE} />
                  )}
               />
               <Route
                  exact
                  path={routes.CREATE_NEW_PROFILE}
                  component={CreatePrimaryProfile}
               />
               {AboutUsRoute}
               {ContactUsRoute}
               {HelpRoute}
               {PageLoadRoute}
               <Route
                  path="*"
                  render={() => <Redirect to={routes.CREATE_NEW_PROFILE} />}
               />
            </Switch>
         );
      }
   }
   return routeList;
};

export default loggedInRoutes;
