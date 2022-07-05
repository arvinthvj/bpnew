import React from 'react'
import { UserSettings } from '../../utility/constants/constants'
import LoadingBtn from '../UI/LoadingButton/LoadingButton'

const notificationSettings = props => {
    return (
        <div className="wrap-login100">
            <form className="login100-form ph_forms" id="login_form">
                <article className="limiter_heading_wrp ml-auto mr-auto wow fadeInUp">
                    <h3>Notification setting</h3>
                </article>
                <div className="inner_form">
                    <div className="fields">
                        <div className="ph_flex_wrp_spw ph_switch_wrp align-items-start switch_wrp">
                            <div className="ph_switch_text">
                                <p className="mb-2">
                                    Notify me via email when someone messages me (maximum once daily)
                                </p>
                                <p>
                                    <i>
                                        {
                                            props.user.user_settings.email_notification.toLowerCase() === UserSettings.NOTIFICATION_SETTINGS.ENABLE
                                                ? "Current status: You WILL be notified via email when someone messages you (maximum once daily)"
                                                : "Current status: You WILL not be notified via email when someone messages you (maximum once daily)"
                                        }
                                    </i>
                                </p>
                            </div>
                            <div className="ph_switch_con ph_crud_wrp">
                                {
                                    props.isUserSettingsLoading || props.isLoading
                                        ? <label className="ph_switch">
                                            <LoadingBtn btnClassName="ph_sm_cricle transparent_bg_loading_btn delete_portfolio_image notification_setting" />
                                        </label>
                                        : <label className="ph_switch">
                                            <input type="checkbox" checked={props.user.user_settings.email_notification.toLowerCase() === UserSettings.NOTIFICATION_SETTINGS.ENABLE}
                                                onChange={(event) => {

                                                    if (event.target.checked) {
                                                        props.updateUserSettings({
                                                            user_settings: {
                                                                "email_notification": UserSettings.NOTIFICATION_SETTINGS.ENABLE
                                                            }
                                                        })
                                                    } else {
                                                        props.updateUserSettings({
                                                            user_settings: {
                                                                "email_notification": UserSettings.NOTIFICATION_SETTINGS.DISABLE
                                                            }
                                                        })
                                                    }
                                                }} />
                                            <span className="ph_slider round"></span>
                                        </label>
                                }
                            </div>
                        </div>
                    </div>
                    {/* <div className="ph_flex_wrp_spw">
                        <button className="theme_primary theme_btn text-uppercase btn-block" type="button">Update </button>
                    </div> */}
                </div>
            </form>
        </div>
    )
}

export default notificationSettings