import React from 'react'
import { Base64 } from 'js-base64';
import { WEB_URL, LMS_BASE_URL } from '../../config';
import { routes, SubscriptionType, SubscriptionStatus } from '../../utility/constants/constants';
import Oux from '../../hoc/Oux/Oux';
import Moment from 'react-moment';
import 'moment-timezone';
import moment from 'moment'
import { showConfirmAlert } from '../../utility/successAlert/confirmAlert';
import CustomToolTip from '../UI/CustomToolTip/CustomToolTip';
import storage from '../../utility/storage';

const membershipLevel = props => {

    const onClickUpgradeMembership = () => {
        let encryptedEmail = Base64.encode(props.user.email);
        console.log('encodedMail', encryptedEmail)
        let redirectUrl = WEB_URL() + props.history.location.pathname + props.history.location.hash
        window.open(`${routes.SUBSCRIPTION}/?redirectto=${redirectUrl}`, '_self')
    }

    let isPlatinumSubscribed = false
    let encryptedEmail = null
    if (props.user) {
        encryptedEmail = Base64.encode(props.user.email);
    }
    let isMsgClicked = storage.get('isMsgClicked', '')
    return (
        <Oux>
            <div class="wrap-login100">
                <form class="login100-form ph_forms" id="login_form">
                    <article class="limiter_heading_wrp ml-auto mr-auto">
                        <h3>Membership</h3>
                    </article>
                    {
                        props.user && props.user.subscriptions && props.user.subscriptions.length > 0 && props.user.subscription_status.toLowerCase() === SubscriptionStatus.ACTIVE.toLowerCase()
                            ? props.user.subscriptions.map((subscription, index) => {
                                let allowCancellationTime = new Date(subscription.subscription_start_date)
                                allowCancellationTime.setMinutes(allowCancellationTime.getMinutes() + 60)
                                let convertedAllowCancellationTime = moment(allowCancellationTime).format('YYYY-MM-DDTHH:mm:ss.000Z')
                                let currentDateTime = moment(new Date()).format('YYYY-MM-DDTHH:mm:ss.000Z')
                                if (subscription.subcription_type.toLowerCase() === SubscriptionType.PLATINUM.toLowerCase()) {
                                    isPlatinumSubscribed = true
                                }
                                let isStartupSpecial = false
                                if ((subscription.subcription_type.toLowerCase() === SubscriptionType.SILVER.toLowerCase() && subscription.subscription_period === 'unlimited') || subscription.subcription_type.toLowerCase() === SubscriptionType.STARTUP_SPECIAL.toLowerCase()) {
                                    isStartupSpecial = true
                                }
                                if (subscription.subscription_status.toLowerCase() === SubscriptionStatus.ACTIVE.toLowerCase() && subscription.subcription_type.toLowerCase() !== SubscriptionType.FREE.toLowerCase()) {
                                    return (
                                        <div class="inner_form" key={index}>
                                            <div class="fields text-center">
                                                <p class="mb-1">You are currently subscribed to "<span style={{ textTransform: 'capitalize' }}>{isStartupSpecial ? 'StartUp Special' : subscription.subcription_type}</span>" plan.</p>
                                                {
                                                    subscription.subcription_type.toLowerCase() === SubscriptionType.PLATINUM.toLowerCase()
                                                        ? null
                                                        : <Oux>
                                                            {
                                                                subscription.subscription_period.toLowerCase() === 'unlimited'
                                                                    ? null
                                                                    : <p>This subscription automatically renews annually until cancelled. Next Payment date is <Moment date={subscription.subscription_end_date} format="DD/MM/YYYY" /></p>
                                                            }
                                                            <div className="d-flex justify-content-between">
                                                                <a
                                                                    href="javascript:void(0)"
                                                                    className="ph_underline text-primary"
                                                                    onClick={() => window.open(routes.CANCELLATION_POLICY, '_self')}>Read More</a>
                                                                {
                                                                    currentDateTime > convertedAllowCancellationTime
                                                                        ? <a
                                                                            href="javascript:void(0)"
                                                                            className="ph_underline text-primary"
                                                                            onClick={() => showConfirmAlert("Please Confirm", 'Are you sure you want to cancel the subscription?', () => {
                                                                                if (subscription.order_id) {
                                                                                    window.open(`${LMS_BASE_URL()}/dashboard/orders/${subscription.order_id}/`, '_self')
                                                                                } else {
                                                                                    window.open(`${LMS_BASE_URL()}/dashboard/orders/`, '_self')
                                                                                }
                                                                            })}>Cancel Subscription</a>
                                                                        : <a className="ph_underline text-primary"><span style={{ opacity: 0.6 }}>Cancel Subscription</span> <CustomToolTip placement="top" trigger="['hover']" text={<span>This option will be enabled within an hour. Contact Support if you need assistance.</span>}><img src="/custom_images/icn_info.svg" className="si_inner" alt="search" /></CustomToolTip></a>
                                                                }
                                                            </div>
                                                        </Oux>
                                                }
                                            </div>
                                        </div>
                                    )
                                } else if (subscription.subscription_status.toLowerCase() === SubscriptionStatus.PENDING_CANCEL.toLowerCase()) {
                                    return (
                                        <div class="inner_form" key={index}>
                                            <div class="fields text-center">
                                                <p class="mb-1">You are currently subscribed to "<span style={{ textTransform: 'capitalize' }}>{subscription.subcription_type}</span>" plan.</p>
                                                <p class="mb-1">You have cancelled the auto-renewal for this subscription.</p>
                                                <p class="mb-1">Your subscription ends on <Moment date={subscription.subscription_end_date} format="DD/MM/YYYY" /></p>
                                            </div>
                                        </div>
                                    )
                                }

                            })
                            : <div class="inner_form">
                                <div class="fields text-center">
                                    <p class="mb-1">You are currently subscribed to Free membership plan.</p>
                                    <p>Would you like to Upgrade your subscription?</p>
                                    {
                                        isMsgClicked
                                            ? <p>If you are trying to access an ongoing conversation, please open 'Messages' page to access it.</p>
                                            : null
                                    }
                                </div>
                            </div>
                    }
                </form>
                {
                    props.user && isPlatinumSubscribed
                        ? null
                        : <div class="ph_flex_wrp_spw">
                            <button onClick={onClickUpgradeMembership} class="theme_primary theme_btn text-uppercase btn-block upgrade_subscription_btn" type="button">Upgrade or Find Out More </button>
                        </div>
                }
            </div>
        </Oux>
    )
}

export default membershipLevel