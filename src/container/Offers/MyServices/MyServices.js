import React, { Component } from "react";
import { connect } from "react-redux";
import { showConfirmAlert } from "../../../utility/successAlert/confirmAlert";
import MyServicesComponent from "../../../components/MyServicesForm/MyServicesForm";
import * as actions from "../../../redux/actions/index";
import {
  STATUS,
  SubscriptionStatus,
  SubscriptionType,
} from "../../../utility/constants/constants";
import Toggle from "react-toggle";
import { Categories, routes, CategoriesList } from '../../../utility/constants/constants';
import { withRouter } from "react-router-dom";
import { OffersListSkeleton } from "../../../components/Skeletons/offersSkeleton";
import getDetailedAddress from "../../../utility/getDetailedAddress";
import "react-toggle/style.css";
import {
  trimString,
  fetchCompensations,
  extractExtention,
  toastMsg,
} from "../../../utility/utility";
import categoriesList from "../Offers"
import { decode, encode } from "base64-arraybuffer";
import CustomToolTip from "../../../components/UI/CustomToolTip/CustomToolTip";
import storage from "../../../utility/storage";
import Oux from "../../../hoc/Oux/Oux";
import { thisTypeAnnotation } from "@babel/types";
const cloneDeep = require("clone-deep");

var $ = require("jquery");




class MyServices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMyServiceForm: false,
      isLoading: true,
      service: null,
      address: null,
      idsToDelete: [],
      imageUrl: null,
      imageName: [],
      base64: [],
      AllFileTypes: [],
      fileType: "",
      isImageUploading: false,
      isBlocking: true,
      profilePicPath: null,
      defaultImagePath: null,
      defaultBase64Index: null,
      // showMyServiceList: true
    };
    this.createNewService = this.createNewService.bind(this);
    this.editServiceClicked = this.editServiceClicked.bind(this);
    this.cancelServiceClicked = this.cancelServiceClicked.bind(this);
  }
  
  

  createNewService = () => {
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
    if (!highestSubscriptionType) {
      window.$("#subscription_modal").modal();
    } else {
      this.setState({
        showMyServiceForm: true,
      });
    }
    this.props.setIsFormOpen(true)
  };

  editServiceClicked = (service) => {
    this.setState({
      showMyServiceForm: true,
      service: service,
    });
  };

  copyProfilePic = (path) => {
    if (!path) {
      this.setState({ defaultImagePath: null });
    }
    this.setState({ profilePicPath: path });
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

  cancelServiceClicked = () => {
    storage.remove("isEdit");
    this.props.setSelectedCategory(Categories.MY_SERVICES)
    this.props.setIsFormOpen(false)
    if (
      !this.props.servicesList ||
      (this.props.servicesList && this.props.servicesList.length === 0)
    ) {
      this.props.getMyServiceList(
        this.props.user.primary_profile_id,
        this.props.categorieId
      );
    } else if (this.props.servicesList && this.props.servicesList.length > 0) {
      let list = this.props.servicesList.filter(
        (service) => service.category.id === this.props.categorieId
      );
      if (list.length === 0) {
        this.props.getMyServiceList(
          this.props.user.primary_profile_id,
          this.props.categorieId
        );
      }
    }
    this.setState({
      showMyServiceForm: false,
      service: null,
      profilePicPath: null,
      base64: [],
      isImageUploading: false,
      defaultBase64Index: null,
      defaultImagePath: null,
    });
  };
  setIsImageUploading = (value) => {
    this.setState({ isImageUploading: value });
  };

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
      //     showMyServiceForm: true
      // })
    } else if (
      (!isEdit || !isService) &&
      ((prevProps.isServiceloading && !this.props.isServiceloading) ||
        (prevProps.addOrUpdateOrDeleteServiceLoading &&
          !this.props.addOrUpdateOrDeleteServiceLoading))
    ) {
      this.setState({
        showMyServiceForm: false,
        base64: [],
        imageName: [],
        profilePicPath: null,
        defaultImagePath: null,
        defaultBase64Index: null,
      });
    }
  };

  componentDidMount = () => {
    let isEdit = storage.get("isEdit", null);
    let service = storage.get("service", null);
    if (isEdit && service) {
      this.editServiceClicked(storage.get("service", null));
      this.props.getMyServiceList(
        this.props.user.primary_profile_id,
        this.props.categorieId
      );
      // storage.remove('service')
    } else {
      storage.remove("isEdit");
      this.props.getMyServiceList(
        this.props.user.primary_profile_id,
        this.props.categorieId
      );
    }
  };

  addOrUpdateMyService = (myService) => {
    console.log(myService, "service");
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
      if (myService.address) {
        delete myService.address.id;
        delete myService.address.state_code;
      }
      myService["delete_attachment_ids"] = this.state.idsToDelete;
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
        this.props.updateMyServiceWithImages(
          this.state.service.id,
          myService,
          extentions,
          arrayBuffer
        );
      } else if (myService.profilePicPath) {
        let photo_paths = [];
        photo_paths.push(myService.profilePicPath);
        myService["new_photo_paths"] = photo_paths;
        delete myService.profilePicPath;
        this.props.updateMyService(this.state.service.id, myService);
      } else {
        this.props.updateMyService(this.state.service.id, myService);
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
        this.props.addMyServiceWithImages(myService, extentions, arrayBuffer);
      } else if (myService.profilePicPath) {
        let photo_paths = [];
        photo_paths.push(myService.profilePicPath);
        myService["photo_paths"] = photo_paths;
        delete myService.profilePicPath;
        this.props.addMyService(myService);
      } else {
        // this.props.addMyService(myService);
        toastMsg("Please upload a minimum of 1 image", true);
      }
    }
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
          showMyServiceForm: true,
          service: null,
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
            <div
              className="ph_flex_wrp_spw ph_switch_wrp align-items-start"
              onClick={() => {
                if (this.props.goToStep && this.props.goToStep.steps) {
                  let step = this.props.goToStep.steps + 1;
                  this.props.handleStepChange(step);
                }
              }}
              id="first_offer_walk"
            >
              <div className="ph_switch_text">
                <h4 className="ph_border_bottom mb-2">
                  {service.title}
                  {/* <a href="#" className="text-primary fontS14 ft_Weight_600"><em>Primary profile</em></a> */}
                </h4>
                <p className="text-black-50 mb-2">
                  {trimString(service.description, 100)}
                </p>
                <p className="text-black-50 mb-2">
                  Compensation -
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
                  onClick={() => this.editServiceClicked(service)}
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
    if (
      this.state.showMyServiceForm &&
      !this.props.isServiceloading &&
      this.props.user.subscription_status !== SubscriptionStatus.ACTIVE &&
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
                onClick={() => window.$("#subscription_modal").modal()}
                className="theme_btn theme_primary"
              >
                Click Here To Subscribe
              </a>
            </div>
          </div>
        </div>
      );
    } else {
      if (this.props.isServiceloading) {
        return <OffersListSkeleton />;
      } else 
      if (
        (!this.props.servicesList || this.props.servicesList.length == 0) &&
        !this.state.showMyServiceForm
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
                  onClick={this.createNewService}
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
            {this.props.isFormOpen || this.state.showMyServiceForm ? (
              <MyServicesComponent
                {...this.props}
                {...this.state}
                createNewService = {this.createNewService}
                setIsImageUploading={this.setIsImageUploading}
                handleAddressSelect={this.handleAddressSelect}
                updateImageState={this.updateImageState}
                setDefaultBase64Index={this.setDefaultBase64Index}
                setDefaultImagePath={this.setDefaultImagePath}
                removeBase64Image={this.removeBase64Image}
                updateBase64={this.updateBase64}
                removeUplodedImage={this.removeUplodedImage}
                copyProfilePic={this.copyProfilePic}
                addOrUpdateMyService={this.addOrUpdateMyService}
                cancelServiceClicked={this.cancelServiceClicked}
                categorieNavigation={this.categoryNavigtion}
              />
            ) : (
              <div className="card switch_card_list card_bg_300">
                <div className="card-body">
                  <div className="ph_title_btn ph_flex_wrp_spw ph_xs_offer_reverse">
                    <h4 className="theme_sm_title">My Offers</h4>
                        <a
                          href="javascript:void(0)"
                          id="create_new_offer"
                          onClick={this.createNewService}
                          className="theme_btn theme_primary text-uppercase"
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
    goToStep: state.walkThroughReducer.goToStep,
    selectedCategory: state.offersReducer.selected_category,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMyServiceList: (profileId, categorieId) =>
      dispatch(actions.getServicesList(profileId, categorieId)),
    addMyService: (service) => dispatch(actions.addService(service)),
    addMyServiceWithImages: (service, extentions, arrayBuffer) =>
      dispatch(actions.addServiceWithImages(service, extentions, arrayBuffer)),
    updateMyService: (id, service) =>
      dispatch(actions.updateService(id, service)),
    updateMyServiceWithImages: (id, service, extentions, arrayBuffer) =>
      dispatch(
        actions.updateServiceWithImage(id, service, extentions, arrayBuffer)
      ),
    deleteService: (id) => dispatch(actions.deleteService(id)),
    toggleActiveOrInactive: (val, id) =>
      dispatch(actions.toggleActiveOrInactive(val, id)),
    handleStepChange: (steps) => dispatch(actions.handleStepChange(steps)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyServices));
