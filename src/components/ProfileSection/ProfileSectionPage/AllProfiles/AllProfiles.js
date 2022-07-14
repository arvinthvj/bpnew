/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {
    routes,
    Profile_Status,
    EMPTY_IMAGE_PATH,
    Roles,
    SubscriptionStatus,
    SubscriptionType,
} from '../../../../utility/constants/constants';
import { showConfirmAlert } from '../../../../utility/successAlert/confirmAlert';
import $ from 'jquery';
import CustomToolTip from '../../../UI/CustomToolTip/CustomToolTip';
import Oux from '../../../../hoc/Oux/Oux';
import * as actions from '../../../../redux/actions/index';
import { connect } from 'react-redux';

const AllProfiles = (props) => {
    let isSubscriptionActive = props.user.subscription_status.toLowerCase() === SubscriptionStatus.ACTIVE.toLowerCase();
    let highestSubscriptionType = null;
    if (props.user && props.user.subscriptions && props.user.subscriptions.length > 0) {
        props.user.subscriptions.map((subscription, index) => {
            if (subscription.subcription_type.toLowerCase() === SubscriptionType.PLATINUM.toLowerCase()) {
                highestSubscriptionType = SubscriptionType.PLATINUM;
            }
        });
        if (!highestSubscriptionType) {
            props.user.subscriptions.map((subscription, index) => {
                if (subscription.subcription_type.toLowerCase() === SubscriptionType.GOLD.toLowerCase()) {
                    highestSubscriptionType = SubscriptionType.GOLD;
                }
            });
        }
        if (!highestSubscriptionType) {
            highestSubscriptionType = SubscriptionType.SILVER;
        }
    }
    let personalProfile = [];
    let businessProfile = [];
    let personalProfileLeft;
    let businessProfileLeft;

    if (props.user.profiles && props.user.profiles.length >= 1) {
        businessProfile = props.user.profiles.filter((profile) => profile.type === 'company');
        personalProfile = props.user.profiles.filter((profile) => !profile.type || profile.type !== 'company');
    }
    if (
        highestSubscriptionType &&
        highestSubscriptionType.toLowerCase() === SubscriptionType.SILVER.toLowerCase() &&
        personalProfile.length < 2
    ) {
        personalProfileLeft = 2 - personalProfile.length;
    } else if (
        highestSubscriptionType &&
        highestSubscriptionType.toLowerCase() === SubscriptionType.PLATINUM.toLowerCase() &&
        personalProfile.length < 50
    ) {
        personalProfileLeft = 50 - personalProfile.length;
    } else if (
        highestSubscriptionType &&
        highestSubscriptionType.toLowerCase() === SubscriptionType.GOLD.toLowerCase() &&
        personalProfile.length < 10
    ) {
        personalProfileLeft = 10 - personalProfile.length;
    }

    if (
        highestSubscriptionType &&
        highestSubscriptionType.toLowerCase() === SubscriptionType.SILVER.toLowerCase() &&
        businessProfile.length < 2
    ) {
        businessProfileLeft = 2 - businessProfile.length;
    } else if (
        highestSubscriptionType &&
        highestSubscriptionType.toLowerCase() === SubscriptionType.PLATINUM.toLowerCase() &&
        businessProfile.length < 50
    ) {
        businessProfileLeft = 50 - businessProfile.length;
    } else if (
        highestSubscriptionType &&
        highestSubscriptionType.toLowerCase() === SubscriptionType.GOLD.toLowerCase() &&
        businessProfile.length < 10
    ) {
        businessProfileLeft = 10 - businessProfile.length;
    }

    if (!businessProfileLeft) {
        businessProfileLeft = 0;
    }
    if (!personalProfileLeft) {
        personalProfileLeft = 0;
    }

    return (
        <div className="tab-content mt-72 v_tabs_content input_pro_edit_tabs" id="v-pills-tabContent">
            <div
                className="tab-pane fade show active"
                id="all-profiles"
                role="tabpanel"
                aria-labelledby="all-profiles-tab"
            >
                {isSubscriptionActive ? (
                    <div className="ph_title_btn ph_flex_wrp_spw">
                        <h4 className="theme_sm_title">My Additional Profiles</h4>

                        <div class="btn-group">
                            <button
                                type="button"
                                class="theme_btn theme_primary dropdown-toggle"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                id="add_secondary_profile"
                                onClick={() => {
                                    setTimeout(() => {
                                        if (props.goToStep && props.goToStep.steps) {
                                            let step = props.goToStep.steps + 1
                                            props.handleStepChange(step)
                                        }
                                    }, 500)
                                }}
                                aria-expanded="false"

                            >
                                NEW PROFILE <i class="fa fa-caret-down ml-1"></i>
                            </button>
                            <div class="dropdown-menu dropDown_walk">
                                <CustomToolTip placement="right" text={`${personalProfileLeft} remaining`}>
                                    <a
                                        class="dropdown-item"
                                        id="personal_profile"
                                        href="javascript:void(0)"
                                        onClick={() => {
                                            if (
                                                highestSubscriptionType &&
                                                highestSubscriptionType.toLowerCase() ===
                                                SubscriptionType.SILVER.toLowerCase() &&
                                                personalProfile.length < 2
                                            ) {
                                                props.history.push(routes.MANAGE_PROFILE_EDIT, {
                                                    addNewProfile: true,
                                                });
                                                props.setBusinessProfile(false);
                                            } else if (
                                                highestSubscriptionType &&
                                                highestSubscriptionType.toLowerCase() ===
                                                SubscriptionType.PLATINUM.toLowerCase() &&
                                                personalProfile.length < 50
                                            ) {
                                                props.history.push(routes.MANAGE_PROFILE_EDIT, {
                                                    addNewProfile: true,
                                                });

                                                props.setBusinessProfile(false);
                                            } else if (
                                                highestSubscriptionType &&
                                                highestSubscriptionType.toLowerCase() ===
                                                SubscriptionType.GOLD.toLowerCase() &&
                                                personalProfile.length < 10
                                            ) {
                                                props.history.push(routes.MANAGE_PROFILE_EDIT, {
                                                    addNewProfile: true,
                                                });

                                                props.setBusinessProfile(false);
                                            } else {
                                                window.$('#subscription_modal').modal();
                                            }
                                            if (props.goToStep && props.goToStep.steps) {
                                                let step = props.goToStep.steps + 1
                                                props.handleStepChange(step)
                                            }
                                        }}
                                    >
                                        Personal Profile [{personalProfileLeft}]{' '}
                                    </a>
                                </CustomToolTip>
                                <div class="dropdown-divider"></div>
                                <CustomToolTip placement="right" text={`${businessProfileLeft} remaining`}>
                                    <a
                                        class="dropdown-item"
                                        href="javascript:void(0)"
                                        id="add_project_profile_walk"
                                        onClick={() => {
                                            if (
                                                highestSubscriptionType &&
                                                highestSubscriptionType.toLowerCase() ===
                                                SubscriptionType.SILVER.toLowerCase() &&
                                                businessProfile.length < 2
                                            ) {
                                                props.history.push(routes.MANAGE_PROFILE_EDIT, {
                                                    addNewProfile: true,
                                                });
                                                props.setBusinessProfile(true);
                                            } else if (
                                                highestSubscriptionType &&
                                                highestSubscriptionType.toLowerCase() ===
                                                SubscriptionType.PLATINUM.toLowerCase() &&
                                                businessProfile.length < 50
                                            ) {
                                                props.history.push(routes.MANAGE_PROFILE_EDIT, {
                                                    addNewProfile: true,
                                                });
                                                props.setBusinessProfile(true);
                                            } else if (
                                                highestSubscriptionType &&
                                                highestSubscriptionType.toLowerCase() ===
                                                SubscriptionType.GOLD.toLowerCase() &&
                                                businessProfile.length < 10
                                            ) {
                                                props.history.push(routes.MANAGE_PROFILE_EDIT, {
                                                    addNewProfile: true,
                                                });
                                                props.setBusinessProfile(true);
                                            } else {
                                                window.$('#subscription_modal').modal();
                                            }
                                        }}
                                    >
                                        Project Profile [{businessProfileLeft}]
                                    </a>
                                </CustomToolTip>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="ph_title_btn ph_flex_wrp_spw">
                        <h4 className="theme_sm_title">My Additional Profiles</h4>
                        <div class="btn-group">
                            <button
                                type="button"
                                class="theme_btn theme_primary dropdown-toggle"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                                id="add_secondary_profile"
                                onClick={() => {
                                    setTimeout(() => {
                                        if (props.goToStep && props.goToStep.steps) {
                                            let step = props.goToStep.steps + 1
                                            props.handleStepChange(step)
                                        }
                                    }, 500)
                                }}

                            >
                                NEW PROFILE <i class="fa fa-caret-down ml-1"></i>
                            </button>
                            <div class="dropdown-menu">
                                <a
                                    class="dropdown-item"
                                    href="javascript:void(0)"
                                    id="personal_profile"
                                    onClick={() => {
                                        window.$('#subscription_modal').modal();
                                        props.setBusinessProfile(false);
                                        if (props.goToStep && props.goToStep.steps) {
                                            let step = props.goToStep.steps + 1
                                            props.handleStepChange(step)
                                        }
                                    }}
                                >
                                    Personal Profile
                                </a>
                                <div class="dropdown-divider"></div>
                                <a
                                    class="dropdown-item"
                                    href="javascript:void(0)"
                                    onClick={() => {
                                        window.$('#subscription_modal').modal();
                                        props.setBusinessProfile(true);
                                    }}
                                >
                                    Project Profile
                                </a>
                            </div>
                        </div>
                    </div>
                )}
                {props.profiles && props.profiles.length > 1 ? (
                    props.profiles.map((profile, index) => {
                        if (profile.id.toString() !== props.user.primary_profile_id) {
                            return (
                                <div className="card switch_card_list card_bg_300">
                                    <div className="card-body">
                                        <div className="ph_flex_wrp_spw ph_switch_wrp">
                                            <div className="ph_switch_text">
                                                <h4 className="ph_border_bottom mb-2">
                                                    <a
                                                        href="javascript:void(0)"
                                                        onClick={() => {
                                                            if (
                                                                profile.type &&
                                                                profile.type.toLowerCase() === 'company'
                                                            ) {
                                                                props.setBusinessProfile(true);
                                                            }
                                                            debugger
                                                            props.toggleManageEditForm(profile.id);
                                                            props.history.push(routes.MANAGE_PROFILE_EDIT);
                                                        }}
                                                        className="ph_underline"
                                                    >
                                                        {profile.type && profile.type.toLowerCase() === 'company' ? (
                                                            <div>
                                                                {profile.title}
                                                                <div
                                                                    style={{
                                                                        color: '#EF5A2F',
                                                                        float: 'right',
                                                                        whiteSpace: 'pre',
                                                                    }}
                                                                >
                                                                    {' '}
                                                                    (Project Profile)
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            profile.title
                                                        )}
                                                    </a>
                                                </h4>
                                                <p className="mb-2">{profile.bio}</p>
                                                <h5 className="mb-0 text_secondary_o54">
                                                    {profile.address.state} {profile.address.zip}
                                                </h5>
                                            </div>
                                            <div className="ph_switch_con">
                                                {/* <span className="d-inline-block" tabIndex="0" data-toggle="tooltip" title="Toggle to make profile ACTIVE or HIDDEN">
                                                        <label className="ph_switch" >
                                                            <input type="checkbox" onChange={(event) => props.toggleProfile(profile.id, { active: event.target.checked })} checked={profile.active_status.toLowerCase() === Profile_Status.ACTIVE.toLowerCase()} />
                                                            <span className="ph_slider round"></span>
                                                        </label>
                                                    </span> */}
                                                {/* <h6 className="mb-0 icn_edit_delete_wrp">
                                                        <a href="javascript:void(0)" onClick={() => {
                                                            props.toggleManageEditForm()
                                                            props.history.push(routes.MANAGE_PROFILE_EDIT)
                                                        }} className="icn_edit1">
                                                            <img src="/images/icons/icn_pencil_primary.svg" alt="Icon Edit" />
                                                        </a>
                                                        <a href="javascript:void(0)" onClick={() => props.deleteProfile(profile.id)} className="ph_underline icn_delete">Delete</a>
                                                    </h6> */}
                                                <div className="ph_switch_con ph_crud_wrp experience_actions">
                                                    <a
                                                        href="javascript:void(0)"
                                                        onClick={() => {
                                                            debugger
                                                            if (
                                                                profile.type &&
                                                                profile.type.toLowerCase() === 'company'
                                                            ) {
                                                                props.setBusinessProfile(true);
                                                            } else {
                                                                props.setBusinessProfile(false);
                                                            }
                                                            props.toggleManageEditForm(profile.id);
                                                            props.history.push(routes.MANAGE_PROFILE_EDIT);
                                                        }}
                                                        className="icn_edit1"
                                                    >
                                                        <img src="/images/icons/icn_pencil.svg" alt="Edit Icon" />
                                                    </a>
                                                    <a
                                                        onClick={() =>
                                                            showConfirmAlert(
                                                                'Please Confirm',
                                                                'Are you sure that you would like to delete?',
                                                                () => {
                                                                    props.deleteProfile(profile.id);
                                                                }
                                                            )
                                                        }
                                                        href="javascript:void(0)"
                                                    >
                                                        <img
                                                            src="/images/icons/icn_trash_orange.svg"
                                                            alt="Delete Icon"
                                                        />{' '}
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        } else {
                            return;
                        }
                    })
                ) : (
                    <div className="ph_empty_message empty_secondary_profiles" role="alert">
                        <img
                            className="ph_empty_image"
                            style={{ width: '300px' }}
                            src={EMPTY_IMAGE_PATH.MESSAGES}
                            alt="No Result Found"
                        />
                        {props.user.subscription_status.toLowerCase() === SubscriptionStatus.ACTIVE.toLowerCase() ? (
                            <Oux>
                                <p>You have not created your secondary profile yet.</p>
                                <div class="btn-group">
                                    <button
                                        type="button"
                                        class="theme_btn theme_primary dropdown-toggle"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                        id="add_secondary_profile"
                                        onClick={() => {
                                            setTimeout(() => {
                                                if (props.goToStep && props.goToStep.steps) {
                                                    let step = props.goToStep.steps + 1
                                                    props.handleStepChange(step)
                                                }
                                            }, 500)
                                        }}
                                    >
                                        NEW PROFILE <i class="fa fa-caret-down ml-1"></i>
                                    </button>
                                    <div class="dropdown-menu dropDown_walk">
                                        <a
                                            class="dropdown-item"
                                            href="javascript:void(0)"
                                            id="personal_profile"
                                            onClick={() => {
                                                props.history.push(routes.MANAGE_PROFILE_EDIT, {
                                                    addNewProfile: true,
                                                });
                                                props.setBusinessProfile(false);
                                                if (props.goToStep && props.goToStep.steps) {
                                                    let step = props.goToStep.steps + 1
                                                    props.handleStepChange(step)
                                                }
                                            }}
                                        >
                                            Personal Profile
                                        </a>
                                        <div class="dropdown-divider"></div>
                                        <a
                                            class="dropdown-item"
                                            href="javascript:void(0)"
                                            onClick={() => {
                                                props.history.push(routes.MANAGE_PROFILE_EDIT, {
                                                    addNewProfile: true,
                                                });
                                                props.setBusinessProfile(true);
                                            }}
                                        >
                                            Project Profile
                                        </a>
                                    </div>
                                </div>
                            </Oux>
                        ) : (
                            <Oux>
                                <div className="ph_empty_text mb-2">
                                    To create multiple profiles, you need to subscribe to the platform.
                                </div>
                                <a
                                    href="javascript:void(0)"
                                    onClick={() => {
                                        window.$('#subscription_modal').modal()
                                        if (props.goToStep && props.goToStep.steps) {
                                            let step = props.goToStep.steps + 1
                                            props.handleStepChange(step)
                                        }
                                    }}
                                    id="add_secondary_profile"
                                    className="theme_btn theme_primary"
                                >
                                    Click Here To Choose a Subscription
                                </a>
                            </Oux>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        businessProfile: state.profileReducer.businessProfile,
        goToStep: state.walkThroughReducer.goToStep
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setBusinessProfile: (status) => dispatch(actions.businessProfile(status)),
        handleStepChange: (steps) => dispatch(actions.handleStepChange(steps))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllProfiles);
