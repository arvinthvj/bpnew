/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
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
import SpinnerLoader from '../../../UI/SpinnerLoader/SpinnerLoader';
import { NavLink } from 'react-router-dom';
import storage from '../../../../utility/storage';

const BusinessProfiles = props => {
  debugger
  let isSubscriptionActive =
    props.user.subscription_status.toLowerCase() ===
    SubscriptionStatus.ACTIVE.toLowerCase();
  let highestSubscriptionType = null;

  useEffect(() => {
    props.fetchBusinessProfile()
      .then(res => {
        if (res.value.success) {
          if (storage.get('activeTour', '')) {
            props.handleStepChange(1)
          }
        }
      }).catch(err => {
        console.log(err)
      });
  }, []);

  if (
    props.user &&
    props.user.subscriptions &&
    props.user.subscriptions.length > 0
  ) {
    props.user.subscriptions.map((subscription, index) => {
      if (
        subscription.subcription_type.toLowerCase() ===
        SubscriptionType.PLATINUM.toLowerCase()
      ) {
        highestSubscriptionType = SubscriptionType.PLATINUM;
      }
    });
    if (!highestSubscriptionType) {
      props.user.subscriptions.map((subscription, index) => {
        if (
          subscription.subcription_type.toLowerCase() ===
          SubscriptionType.GOLD.toLowerCase()
        ) {
          highestSubscriptionType = SubscriptionType.GOLD;
        }
      });
    }
    if (!highestSubscriptionType) {
      highestSubscriptionType = SubscriptionType.SILVER;
    }
  }
  if (props.isLoading || props.isAuthLoading) {
    return (
      <div className="ph_empty_message" role="alert">
        <SpinnerLoader />
      </div>
    );
  }
  let projectProfilesLeft = 0;
  if (isSubscriptionActive && highestSubscriptionType) {
    let totalProjectProfiles = [];
    if (props.profiles && props.profiles.length > 0) {
      totalProjectProfiles = props.profiles.filter(
        item => item.user_id === props.user.id.toString(),
      );
    }
    if (
      highestSubscriptionType.toLowerCase() ===
      SubscriptionType.SILVER.toLowerCase() &&
      totalProjectProfiles.length < 2
    ) {
      projectProfilesLeft = 2 - totalProjectProfiles.length;
    } else if (
      highestSubscriptionType.toLowerCase() ===
      SubscriptionType.GOLD.toLowerCase() &&
      totalProjectProfiles.length < 10
    ) {
      projectProfilesLeft = 10 - totalProjectProfiles.length;
    } else if (
      highestSubscriptionType.toLowerCase() ===
      SubscriptionType.PLATINUM.toLowerCase() &&
      totalProjectProfiles.length < 50
    ) {
      projectProfilesLeft = 50 - totalProjectProfiles.length;
    }
  }
  let newProjectProfileBtn = null;
  if (!projectProfilesLeft) {
    projectProfilesLeft = 0;
    newProjectProfileBtn = (
      <div className="ph_title_btn ph_flex_wrp_spw">
        <h4 className="theme_sm_title">All Project Profiles</h4>
        <CustomToolTip
          placement="bottom"
          text={`${projectProfilesLeft} remaining`}
        >
          <a
            class="theme_btn theme_primary"
            href="javascript:void(0)"
            id="add_secondary_profile"
            onClick={() => {
              window.$('#subscription_modal').modal();
              if (props.goToStep && props.goToStep.steps) {
                let step = props.goToStep.steps + 1
                props.handleStepChange(step)
              }
            }}
          >
            + New Project Profile
          </a>
        </CustomToolTip>
      </div>
    );
  } else {
    newProjectProfileBtn = (
      <div className="ph_title_btn ph_flex_wrp_spw">
        <h4 className="theme_sm_title">All Project Profiles</h4>
        <CustomToolTip
          placement="bottom"
          text={`${projectProfilesLeft} remaining`}
        >
          <a
            class="theme_btn theme_primary"
            href="javascript:void(0)"
            id="add_secondary_profile"
            onClick={() => {
              props.history.push(routes.MANAGE_PROFILE_EDIT, {
                addNewProfile: true,
                redirectToBuild: true,
              });
              props.setBusinessProfile(true);
              if (props.goToStep && props.goToStep.steps) {
                let step = props.goToStep.steps + 1
                props.handleStepChange(step)
              }
            }}
          >
            + New Project Profile
          </a>
        </CustomToolTip>
      </div>
    );
  }
  return (
    <section className="ph_main_sec pt_83 profile_sec my_offers_ser_sec">
      <div className="container">
        <div className="vertical_tabs_cont tabs_100_manage_pro">
          <div className="tab-content" id="pills-tabContent">
            <div
              className="tab-pane fade show active"
              id="pills-manage-profile"
              role="tabpanel"
              aria-labelledby="pills-manage-profile-tab"
            >
              <div className="vertical_tabs_colL vertical_tabs_col">
                <div className="tab_list_block tab_list_block_767"></div>
              </div>
              <div className="vertical_tabs_colR vertical_tabs_col">
                <div className="tab_list_block">
                  <div
                    className="tab-content mt-72 v_tabs_content input_pro_edit_tabs"
                    id="v-pills-tabContent"
                  >
                    <div
                      className="tab-pane fade show active"
                      id="all-profiles"
                      role="tabpanel"
                      aria-labelledby="all-profiles-tab"
                    >
                      {newProjectProfileBtn}
                      {props.profiles && props.profiles.length > 0 ? (
                        props.profiles.map((profile, index) => {
                          return (
                            <div className="card switch_card_list card_bg_300">
                              <a><div className="card-body">
                                <div className="ph_flex_wrp_spw ph_switch_wrp">
                                  <div className="ph_switch_text" id="build_profile_title">
                                    <div class="media align-items-center">
                                      <img
                                        width="100px"
                                        class="mr-3"
                                        src={profile.photo_urls.small}
                                      />
                                      <div class="media-body">
                                        <h4 className="ph_border_bottom mb-2">
                                          <CustomToolTip
                                            placement="top"
                                            text="Click to read the full profile"
                                          >
                                            {
                                              props.goToStep && props.goToStep.steps > 0
                                                ? <a
                                                  href="javascript:void(0)"
                                                  onClick={() => {
                                                    debugger
                                                    let step = props.goToStep.steps + 1
                                                    props.handleStepChange(step)
                                                  }}
                                                  className="ph_underline"
                                                  style={{
                                                    color: '#EF5A2F',
                                                  }}
                                                >
                                                  {profile.title}
                                                </a>
                                                : <NavLink
                                                  to={`business/${profile.id}/details`}
                                                  className="ph_underline"
                                                  style={{
                                                    color: '#EF5A2F',
                                                  }}
                                                >
                                                  {profile.title}
                                                </NavLink>}
                                          </CustomToolTip>
                                        </h4>
                                        <p className="mb-2">
                                          {profile.bio.length <= 400 ? (
                                            profile.bio
                                          ) : (
                                            <Oux>
                                              {`${profile.bio.substring(
                                                0,
                                                400,
                                              )}...  `}
                                              <CustomToolTip
                                                placement="top"
                                                text="Click to read the full description"
                                              >
                                                <a
                                                  href="javascript:void(0)"
                                                  onClick={() => {
                                                    props.storeFullDescription(
                                                      profile.bio,
                                                      profile.title,
                                                    );
                                                    window
                                                      .$('#description_modal')
                                                      .modal();
                                                  }}
                                                  className="ph_underline"
                                                >
                                                  Read More
                                                </a>
                                              </CustomToolTip>
                                            </Oux>
                                          )}
                                        </p>
                                        <h5 className="mb-0 text_secondary_o54">
                                          {profile.address.state}{' '}
                                          {profile.address.zip}
                                        </h5>
                                      </div>
                                    </div>
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
                                    {profile.user_id ===
                                      props.user.id.toString() ? (
                                      <div className="ph_switch_con ph_crud_wrp experience_actions">
                                        <a
                                          href="javascript:void(0)"
                                          onClick={() => {
                                            props.setBusinessProfile(
                                              true,
                                              profile.id,
                                            );
                                            props.history.push(
                                              routes.MANAGE_PROFILE_EDIT,
                                              {
                                                redirectToBuild: true,
                                              },
                                            );
                                          }}
                                          className="icn_edit1"
                                        >
                                          <img
                                            src="/images/icons/icn_pencil.svg"
                                            alt="Edit Icon"
                                          />
                                        </a>
                                        <a
                                          onClick={() =>
                                            showConfirmAlert(
                                              'Please Confirm',
                                              `<h3>This can not be undone!<h3> <h5>Are you sure that you would like to delete?</h5>`,
                                              () => {
                                                props.deleteProfile(profile.id);
                                              },
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
                                    ) : null}
                                  </div>
                                </div>
                              </div>
                              </a>
                            </div>
                          );
                        })
                      ) : (
                        <div
                          className="ph_empty_message empty_secondary_profiles"
                          role="alert"
                        >
                          <img
                            className="ph_empty_image"
                            style={{ width: '300px' }}
                            src={EMPTY_IMAGE_PATH.MESSAGES}
                            alt="No Result Found"
                          />
                          {props.user.subscription_status.toLowerCase() ===
                            SubscriptionStatus.ACTIVE.toLowerCase() ? (
                            <Oux>
                              <p>
                                You have not created any project profile yet.
                              </p>
                              <a
                                class="theme_btn theme_primary"
                                href="javascript:void(0)"
                                id="add_secondary_profile"
                                onClick={() => {
                                  props.history.push(
                                    routes.MANAGE_PROFILE_EDIT,
                                    {
                                      addNewProfile: true,
                                      redirectToBuild: true,
                                    },
                                  );
                                  props.setBusinessProfile(true);
                                  if (props.goToStep && props.goToStep.steps) {
                                    let step = props.goToStep.steps + 1
                                    props.handleStepChange(step)
                                  }
                                }}
                              >
                                + New Project Profile
                              </a>
                            </Oux>
                          ) : (
                            <Oux>
                              <div className="ph_empty_text mb-2">
                                To create multiple profiles, you need to
                                subscribe to the platform.
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = state => {
  return {
    user: state.authReducer.user,
    isAuthLoading: state.authReducer.isloading,
    isLoading: state.profileReducer.isloading,
    businessProfile: state.profileReducer.businessProfile,
    profiles: state.profileReducer.businessProfiles,
    goToStep: state.walkThroughReducer.goToStep
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setBusinessProfile: (status, selectedBusinessProfileId) =>
      dispatch(actions.businessProfile(status, selectedBusinessProfileId)),
    fetchBusinessProfile: () => dispatch(actions.fetchBusinessProfile()),
    deleteProfile: profileId => dispatch(actions.deleteProfile(profileId)),
    storeFullDescription: (description, descriptionTitle) =>
      dispatch(actions.storeFullDescription(description, descriptionTitle)),
    getProfile: id => dispatch(actions.getProfile(id)),
    handleStepChange: (steps) => dispatch(actions.handleStepChange(steps))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BusinessProfiles);
