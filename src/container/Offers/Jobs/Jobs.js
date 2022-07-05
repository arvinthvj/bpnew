import React, { Component } from "react";
import JobsComponent from "../../../components/JobsForm/JobsForm";
import { connect } from "react-redux";
import * as actions from "../../../redux/actions/index";
import { showConfirmAlert } from "../../../utility/successAlert/confirmAlert";
import {
  extractExtention,
  trimString,
  fetchCompensations,
  toastMsg,
} from "../../../utility/utility";
import { decode, encode } from "base64-arraybuffer";
import {
  Categories,
  routes,
  STATUS,
  SubscriptionStatus,
  SubscriptionType,
} from "../../../utility/constants/constants";
import getDetailedAddress from "../../../utility/getDetailedAddress";
import { OffersListSkeleton } from "../../../components/Skeletons/offersSkeleton";
import CustomToolTip from "../../../components/UI/CustomToolTip/CustomToolTip";
import storage from "../../../utility/storage";
import { Base64 } from "js-base64";
const cloneDeep = require("clone-deep");

class Jobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      service: null,
      showJobsOrGigs: true,
      idsToDelete: [],
      imageUrl: null,
      imageName: [],
      base64: [],
      AllFileTypes: [],
      fileType: "",
      address: null,
      isImageUploading: false,
      isBlocking: true,
      profilePicPath: null,
      defaultImagePath: null,
      defaultBase64Index: null,
    };
    // this.addJobsOrGigs = this.addJobsOrGigs.bind(this);
    // this.editJobsOrGigsClicked = this.editJobsOrGigsClicked.bind(this);
    // this.cancelJobsOrGigsClicked = this.cancelJobsOrGigsClicked.bind(this);
  }

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    let isEdit = storage.get("isEdit", null);
    let isService = storage.get("service", null);
    if (
      (!this.props.servicesList || this.props.servicesList.length == 0) &&
      (prevProps.isServiceloading !== this.props.isServiceloading ||
        prevProps.addOrUpdateOrDeleteServiceLoading !==
          this.props.addOrUpdateOrDeleteServiceLoading)
    ) {
      // this.setState({
      //     showJobsOrGigs: true
      // })
    } else if (
      (!isEdit || !isService) &&
      ((prevProps.isServiceloading && !this.props.isServiceloading) ||
        (prevProps.addOrUpdateOrDeleteServiceLoading &&
          !this.props.addOrUpdateOrDeleteServiceLoading))
    ) {
      this.setState({
        // showJobsOrGigs: false,
        service: null,
        idsToDelete: [],
        base64: [],
        profilePicPath: null,
      });
    }
  };

  componentDidMount = () => {
    let isEdit = storage.get("isEdit", null);
    let service = storage.get("service", null);
    if (isEdit && service) {
      this.editJobsOrGigsClicked(service);
      this.props.getJobsServiceList(
        this.props.user.primary_profile_id,
        this.props.categorieId
      );
      // storage.remove('service')
    } else {
      storage.remove("isEdit");
      this.props.getJobsServiceList(
        this.props.user.primary_profile_id,
        this.props.categorieId
      );
    }
  };

  copyProfilePic = (path) => {
    if (!path) {
      this.setState({ defaultImagePath: null });
    }
    this.setState({ profilePicPath: path });
  };

  createJobsOrGigs = () => {
    this.setState({
      showJobsOrGigs: true,
    });
  };

  addOrUpdateJobsOrGigs = (Jobs) => {
    this.setState({ isBlocking: false });
    let service = storage.get("service", null);
    if (service) {
      storage.remove("service");
    }
    if (
      this.state.service &&
      this.state.service.attachments &&
      this.state.service.attachments.length === 0 &&
      (!this.state.base64 ||
        (this.state.base64 &&
          this.state.base64.length === 0 &&
          !this.state.profilePicPath))
    ) {
      this.setState({ defaultImagePath: null, defaultBase64Index: null });
      toastMsg("Add a minimum of 1 image to successfully save the offer", true);
    } else if (this.state.service) {
      if (Jobs.address) {
        delete Jobs.address.id;
        delete Jobs.address.state_code;
      }
      Jobs["delete_attachment_ids"] = this.state.idsToDelete;
      this.setState({ idsToDelete: [] });
      if (this.state.base64 && this.state.base64.length > 0) {
        const arrayBuffer = [];
        this.state.base64.map((url, i) => {
          if (!url.photo_urls) {
            let base_photo = null;
            const image = url.split(",");
            base_photo = image[1];

            arrayBuffer.push(decode(base_photo));
          }
        });
        const extentions = extractExtention(this.state.imageName);
        this.props.updateJobsOrGigsServiceWithImages(
          this.state.service.id,
          Jobs,
          extentions,
          arrayBuffer
        );
      } else if (Jobs.profilePicPath) {
        let photo_paths = [];
        photo_paths.push(Jobs.profilePicPath);
        Jobs["new_photo_paths"] = photo_paths;
        delete Jobs.profilePicPath;
        this.props.updateJobsOrGigs(this.state.service.id, Jobs);
      } else {
        this.props.updateJobsOrGigs(this.state.service.id, Jobs);
      }
    } else {
      if (this.state.base64 && this.state.base64.length > 0) {
        const arrayBuffer = [];
        this.state.base64.map((url, i) => {
          if (!url.photo_urls) {
            let base_photo = null;
            const image = url.split(",");
            base_photo = image[1];

            arrayBuffer.push(decode(base_photo));
          }
        });
        const extentions = extractExtention(this.state.imageName);
        this.props.addJobsOrGigsServiceWithImages(
          Jobs,
          extentions,
          arrayBuffer
        );
      } else if (Jobs.profilePicPath) {
        let photo_paths = [];
        photo_paths.push(Jobs.profilePicPath);
        Jobs["photo_paths"] = photo_paths;
        delete Jobs.profilePicPath;
        this.props.addJobsOrGigs(Jobs);
      } else {
        // this.props.addJobsOrGigs(Jobs);
        toastMsg("Please upload a minimum of 1 image", true);
      }
    }
    this.setState({
        showJobsOrGigs: false
    });
  };

  editJobsOrGigsClicked = (Service) => {
    this.setState({
      showJobsOrGigs: true,
      service: Service,
    });
  };

  setDefaultImagePath = (event, path) => {
    if ((event && event.target.id !== "delete_image_icon") || !event) {
      this.setState({ defaultImagePath: path, defaultBase64Index: null });
    }
  };

  setDefaultBase64Index = (event, index) => {
    if ((event && event.target.id !== "delete_image_icon") || !event) {
      this.setState({ defaultBase64Index: index, defaultImagePath: null });
    }
  };

  cancelJobsOrGigsClicked = () => {
    storage.remove("isEdit");
    this.props.setSelectedCategory(Categories.MY_SERVICES);
    this.props.setIsFormOpen(false)
    if (
      !this.props.servicesList ||
      (this.props.servicesList && this.props.servicesList.length === 0)
    ) {
      this.props.getJobsServiceList(
        this.props.user.primary_profile_id,
        this.props.categorieId
      );
    } else if (this.props.servicesList && this.props.servicesList.length > 0) {
      let list = this.props.servicesList.filter(
        (service) => service.category.id === this.props.categorieId
      );
      if (list.length === 0) {
        this.props.getJobsServiceList(
          this.props.user.primary_profile_id,
          this.props.categorieId
        );
      }
    }
    this.setState({
      showJobsOrGigs: false,
      service: null,
      idsToDelete: [],
      base64: [],
      profilePicPath: null,
      isImageUploading: false,
      defaultImagePath: null,
      defaultBase64Index: null,
    });
  };

  setIsImageUploading = (value) => {
    this.setState({ isImageUploading: value });
  };

  updateImageState = (imageName, fileType, AllFileTypes) => {
    this.setState((prevState) => ({
      imageName: [...prevState.imageName, ...imageName],
      fileType: [...prevState.fileType, ...fileType],
      AllFileTypes: [...prevState.AllFileTypes, ...AllFileTypes],
    }));
  };

  updateBase64 = (base64) => {
    this.setState((prevState) => ({
      base64: [...prevState.base64, ...base64],
    }));
  };

  removeUplodedImage = (id) => {
    let Service = cloneDeep(this.state.service);

    this.setState((prevState) => ({
      idsToDelete: [...prevState.idsToDelete, id],
    }));

    let urlIndex = Service.attachments.findIndex(function (url) {
      return url.id === id;
    });
    if (this.state.defaultImagePath === Service.attachments[urlIndex].url) {
      this.setState({ defaultImagePath: null });
    }
    Service.attachments.splice(urlIndex, 1);

    this.setState({
      service: Service,
    });
  };

  removeBase64Image = (base64, indexToRemove) => {
    let Base64Images = [...this.state.base64];
    let updatedFileTypes = [...this.state.fileType];
    let updatedImageNames = [...this.state.imageName];

    let base64Index = this.state.base64.findIndex(function (base) {
      return base === base64;
    });
    if (this.state.defaultBase64Index === base64Index) {
      this.setState({ defaultBase64Index: null });
    }
    Base64Images.splice(base64Index, 1);
    updatedFileTypes.splice(indexToRemove, 1);
    updatedImageNames.splice(indexToRemove, 1);

    this.setState({
      base64: Base64Images,
      fileType: updatedFileTypes,
      imageName: updatedImageNames,
    });
  };

  toggleActiveOrInactive = (e, id) => {
    const index = this.props.servicesList.findIndex((s) => s.id === id);
    const service = cloneDeep(this.props.servicesList[index]);
    if (
      ((service.attachments && service.attachments.length === 0) ||
        !service.attachments) &&
      e.target.checked
    ) {
      toastMsg("Add a minimum of 1 image to activate the offer.", true);
    } else {
      if (
        this.props.user.subscription_status === SubscriptionStatus.ACTIVE ||
        service.is_profile
      ) {
        this.props.toggleActiveOrInactive(e.target.checked, id);
      } else {
        this.setState({
          showJobsOrGigs: true,
        });
      }
    }
  };

  handleAddressSelect = async (address, onChange, name) => {
    const addressFields = await getDetailedAddress(address);

    this.setState({
      address: addressFields,
    });
    if (onChange && name) {
      onChange(name, address);
      onChange("address[city]", this.state.address.city);
      onChange("address[state]", this.state.address.state);
      onChange("address[zip]", this.state.address.zip);
      onChange("address[country]", this.state.address.country);
      onChange("address[latitude]", this.state.address.latitude);
      onChange("address[longitude]", this.state.address.longitude);
    }
  };

  renderServicesList = () => {
    const fetchSkills = (skills) => {
      let skillList = "";
      skills.forEach((skill, i) => {
        if (skills.length - 1 === i) {
          skillList = skillList.concat(skill.name);
        } else {
          skillList = skillList.concat(skill.name + " | ");
        }
      });
      return skillList;
    };

    if (this.props.servicesList && this.props.servicesList.length > 0) {
      return this.props.servicesList.map((service) => {
        return (
          <div className="ph_title_btn ph_xs_offer_reverse">
            <div className="ph_flex_wrp_spw ph_switch_wrp align-items-start">
              <div className="ph_switch_text">
                <h4 className="ph_border_bottom mb-2">
                  {service.title}
                  {/* <a href="#" className="text-primary fontS14 ft_Weight_600"><em>Primary profile</em></a> */}
                </h4>
                <p className="text-black-50 mb-2">
                  {trimString(service.description, 100)}
                </p>
                <p className="text-black-50 mb-2">
                  Compensation -{" "}
                  <span className="text-black">
                    {fetchCompensations(service.compensations)}
                  </span>
                </p>
                <p className="text-black-50 mb-2">
                  Category - 
                  <span className="text-black">
                    {service.category.name}
                  </span>
                </p>
                <p className="mb-2">{fetchSkills(service.skills)}</p>
                {/* <p className="mb-2">March 2019 - Feb 2020</p> */}
                <h5 className="text_secondary_o54 mb-2">
                  {service.address.zip}
                </h5>
              </div>
              <div className="ph_switch_con ph_crud_wrp">
                <label className="ph_switch">
                  <input
                    type="checkbox"
                    onChange={(e) => this.toggleActiveOrInactive(e, service.id)}
                    checked={
                      service.active_status === STATUS.ACTIVE ? true : false
                    }
                  />
                  <CustomToolTip placement="top" text="Show In Searches">
                    <span className="ph_slider round"></span>
                  </CustomToolTip>
                </label>
                <a
                  href="javascript:void(0)"
                  id="edit_service_target"
                  onClick={() => this.editJobsOrGigsClicked(service)}
                >
                  <CustomToolTip placement="top" text="Edit This Offer">
                    <img src="/images/icons/icn_pencil.svg" alt="Edit Icon" />
                  </CustomToolTip>
                </a>
                {service.is_profile ? null : (
                  <a
                    href="javascript:void(0)"
                    onClick={() =>
                      showConfirmAlert(
                        "Please Confirm",
                        "Are you sure that you would like to delete?",
                        () => {
                          this.props.deleteService(service.id);
                        }
                      )
                    }
                  >
                    <CustomToolTip placement="top" text="Delete This Offer">
                      <img
                        src="/images/icons/icn_trash_orange.svg"
                        alt="Delete Icon"
                      />
                    </CustomToolTip>{" "}
                  </a>
                )}
              </div>
            </div>
          </div>
        );
      });
    }
  };

  render() {
    let highestSubscriptionType = null;
    if (
      this.props.user &&
      this.props.user.subscriptions &&
      this.props.user.subscriptions.length > 0
    ) {
      this.props.user.subscriptions.map((subscription, index) => {
        if (
          subscription.subcription_type.toLowerCase() ===
          SubscriptionType.PLATINUM.toLowerCase()
        ) {
          highestSubscriptionType = SubscriptionType.PLATINUM;
        }
      });
      if (!highestSubscriptionType) {
        this.props.user.subscriptions.map((subscription, index) => {
          if (
            subscription.subcription_type.toLowerCase() ===
            SubscriptionType.GOLD.toLowerCase()
          ) {
            highestSubscriptionType = SubscriptionType.GOLD;
          }
        });
      }
      if (!highestSubscriptionType) {
        this.props.user.subscriptions.map((subscription, index) => {
          if (
            subscription.subcription_type.toLowerCase() ===
            SubscriptionType.SILVER.toLowerCase()
          ) {
            highestSubscriptionType = SubscriptionType.SILVER;
          }
        });
      }
    }
    if (
      !this.props.isServiceloading &&
      (this.props.user.subscription_status !== SubscriptionStatus.ACTIVE ||
        !highestSubscriptionType) &&
      (this.state.service ? !this.state.service.is_profile : true)
    ) {
      return (
        <div
          class="tab-pane fade show active"
          id="pills-my-services"
          role="tabpanel"
          aria-labelledby="pills-my-services-tab"
        >
          <div
            class="ph_empty_message ph_empty_msg tabs_empty_msg"
            role="alert"
          >
            <img
              class="ph_empty_image"
              src="/images/thumbnails/messages_empty.png"
              alt="Messages are empty"
            />
            <div class="ph_empty_text">
              To create a new Offer, you need to subscribe to the platform
            </div>
            <div class="text-center mt-2">
              <a
                href="javascript:void(0)"
                onClick={() => {
                  if (this.props.user) {
                    let encryptedEmail = Base64.encode(this.props.user.email);
                    window.open(
                      `${routes.PRICING}`,
                      "_self"
                    );
                  } else {
                    window.open(
                      `${routes.PRICING}/?logoutfromlms=true`,
                      "_self"
                    );
                  }
                }}
                className="theme_btn theme_primary"
              >
                Click Here To Subscribe
              </a>
            </div>
          </div>
        </div>
      );
    } else {
      // if (this.props.isServiceloading) {
      //     return <OffersListSkeleton />
      // } else

      if (
        (!this.props.servicesList || this.props.servicesList.length == 0) &&
        !this.state.showJobsOrGigs
      ) {
        return (
          <div
            class="tab-pane fade show active"
            id="pills-my-services"
            role="tabpanel"
            aria-labelledby="pills-my-services-tab"
          >
            <div
              class="ph_empty_message ph_empty_msg tabs_empty_msg"
              role="alert"
            >
              <img
                class="ph_empty_image"
                src="/images/thumbnails/messages_empty.png"
                alt="Messages are empty"
              />
              <div class="ph_empty_text">You don't have any Offers</div>
              <div class="text-center mt-2">
                <a
                  href="javascript:void(0)"
                  onClick={this.createJobsOrGigs}
                  className="theme_btn theme_primary"
                >
                  CREATE NEW OFFER
                </a>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div
            className="tab-pane fade show active"
            id="pills-my-services"
            role="tabpanel"
            aria-labelledby="pills-my-services-tab"
          >
            {this.props.isFormOpen || this.state.showJobsOrGigs ? (
              <JobsComponent
                {...this.state}
                {...this.props}
                createJobsOrGigs={this.createJobsOrGigs}
                setDefaultBase64Index={this.setDefaultBase64Index}
                setDefaultImagePath={this.setDefaultImagePath}
                setIsImageUploading={this.setIsImageUploading}
                handleAddressSelect={this.handleAddressSelect}
                updateImageState={this.updateImageState}
                removeBase64Image={this.removeBase64Image}
                updateBase64={this.updateBase64}
                copyProfilePic={this.copyProfilePic}
                removeUplodedImage={this.removeUplodedImage}
                addOrUpdateJobsOrGigs={this.addOrUpdateJobsOrGigs}
                cancelJobsOrGigsClicked={this.cancelJobsOrGigsClicked}
              />
            ) : (
              <div className="card switch_card_list card_bg_300">
                <div className="card-body">
                  <div className="ph_title_btn ph_flex_wrp_spw ph_xs_offer_reverse">
                    <h4 className="theme_sm_title">My Offers</h4>
                    <a
                      href="javascript:void(0)"
                      id="create_new_offer"
                      className="theme_btn theme_primary text-uppercase"
                      onClick={this.createJobsOrGigs}
                    >
                      Create new offer
                    </a>
                  </div>
                  {this.renderServicesList()}
                </div>
              </div>
            )}
          </div>
        );
      }
    }
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.authReducer.user,
    categories: state.configReducer.categories,
    skills: state.configReducer.skills,
    // compensations: state.configReducer.compensations,
    servicesList: state.userReducer.servicesList,
    isServiceloading: state.userReducer.isServiceloading,
    addOrUpdateOrDeleteServiceLoading:
      state.userReducer.addOrUpdateOrDeleteServiceLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getJobsServiceList: (profileId, categorieId) =>
      dispatch(actions.getServicesList(profileId, categorieId)),
    addJobsOrGigs: (service) => dispatch(actions.addService(service)),
    addJobsOrGigsServiceWithImages: (service, extentions, arrayBuffer) =>
      dispatch(actions.addServiceWithImages(service, extentions, arrayBuffer)),
    updateJobsOrGigs: (id, service) =>
      dispatch(actions.updateService(id, service)),
    updateJobsOrGigsServiceWithImages: (id, service, extentions, arrayBuffer) =>
      dispatch(
        actions.updateServiceWithImage(id, service, extentions, arrayBuffer)
      ),
    deleteService: (id) => dispatch(actions.deleteService(id)),
    toggleActiveOrInactive: (val, id) =>
      dispatch(actions.toggleActiveOrInactive(val, id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Jobs);
