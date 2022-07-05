import React from 'react'
import { routes } from '../../utility/constants/constants'
// import LeftProfileMenu from '../ProfileSection/EditUserProfilePage/LeftProfileMenu'
import AccountInformationForm from './AccountInformationForm'
import { Switch, Route, Redirect, NavLink } from 'react-router-dom'
import ChangePassword from './ChangePassword'
import './AccountInformationPage.css'
import MembershipLevel from './MembershipLevel'
import NotificationSettings from './NotificationSettings'
import { Base64 } from 'js-base64';
import { LMS_BASE_URL } from '../../config'

const accountInformationPage = props => {
    let encryptedEmail = Base64.encode(props.user.email);
    let redeemVoucherLink = LMS_BASE_URL() + `/dashboard/redeem-voucher/`
    let fbUserDatapolicyLink = LMS_BASE_URL() + `/user-data-policy/`

    return (
        <section className="ph_main_sec pt_83 profile_sec my_offers_ser_sec">
            <div className="container">
                <div className="vertical_tabs_cont" style={{ padding: '0' }}>
                    <div className="tab_list_block">
                        <div className="tab-content" id="pills-tabContent">
                            <div className="tab-pane fade show active">
                                {/* <LeftProfileMenu history={props.history} /> */}
                                <div className="vertical_tabs_colL vertical_tabs_col">
                                    <div className="tab_list_block tab_list_block_767">
                                        <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                            <NavLink className="nav-link" to={routes.EDIT_ACCOUNT_INFO} id="personal_information_tab" >Account Information</NavLink>
                                            <NavLink className="nav-link" to={routes.CHANGE_PASSWORD} id="experience-tab">Change Password</NavLink>
                                            <NavLink className="nav-link" id="membership_level_tab" to={routes.MEMBERSHIP_LEVEL}>Membership</NavLink>
                                            <NavLink className="nav-link" id="notification_settings_tab" to={routes.NOTIFICATION_SETTINGS}>Notification settings</NavLink>
                                            <a className="nav-link" id="notification_settings_tab" href={redeemVoucherLink}>Redeem A Voucher</a>
                                            <a className="nav-link" id="fb_user_data_policy_tab" href={fbUserDatapolicyLink}>FB User Data Policy</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="vertical_tabs_colR vertical_tabs_col">
                                    <div className="tab_list_block">
                                        <div className="tab-content mt-72 v_tabs_content input_pro_edit_tabs" id="v-pills-tabContent">
                                            <Switch>
                                                <Route exact path={routes.EDIT_ACCOUNT_INFO}>
                                                    <AccountInformationForm
                                                        isLoading={props.isLoading}
                                                        history={props.history}
                                                        sendVerifyEduEmail={props.sendVerifyEduEmail}
                                                        updateAccountInfo={props.updateAccountInfo}
                                                        user={props.user} />
                                                </Route>
                                                <Route exact path={routes.CHANGE_PASSWORD}>
                                                    <ChangePassword
                                                        user={props.user}
                                                        isLoading={props.isLoading}
                                                        changePassword={props.changePassword} />
                                                </Route>
                                                <Route exact path={routes.MEMBERSHIP_LEVEL}>
                                                    <MembershipLevel
                                                        history={props.history}
                                                        user={props.user}
                                                        isLoading={props.isLoading} />
                                                </Route>
                                                <Route exact path={routes.NOTIFICATION_SETTINGS}>
                                                    <NotificationSettings
                                                        user={props.user}
                                                        isUserSettingsLoading={props.isUserSettingsLoading}
                                                        updateUserSettings={props.updateUserSettings}
                                                        isLoading={props.isLoading} />
                                                </Route>
                                                <Route path='*' render={() => <Redirect to={routes.EDIT_ACCOUNT_INFO} />} />
                                            </Switch>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default accountInformationPage