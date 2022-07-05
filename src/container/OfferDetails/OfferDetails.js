import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import {
  routes,
  CategoriesList,
  EMPTY_IMAGE_PATH,
  SubscriptionType,
} from '../../utility/constants/constants';
import { connect } from 'react-redux';
import Oux from '../../hoc/Oux/Oux';
import $ from 'jquery';
import ClassifiedDetails from '../../components/OfferDetailsPage/ClassifiedDetails/ClassifiedDetails';
import OpportunityDetails from '../../components/OfferDetailsPage/OpportunityDetails/OpportunityDetails';
import PeopleDetails from '../../components/OfferDetailsPage/PeopleDetails/PeopleDetails';
import PlacesDetails from '../../components/OfferDetailsPage/PlacesDetails/PlacesDetails';
import ThingDetails from '../../components/OfferDetailsPage/ThingDetails/ThingDetails';
import JobDetails from '../../components/OfferDetailsPage/JobDetails/JobDetails';
import DonationDetails from '../../components/OfferDetailsPage/DonationDetails/DonationDetails';
import BusinessDetails from '../../components/OfferDetailsPage/BusinessDetails/BusinessDetails';
import * as actions from '../../redux/actions/index';
import storage from '../../utility/storage';
import SpinnerLoader from '../../components/UI/SpinnerLoader/SpinnerLoader';
import FeaturedDetails from '../../components/OfferDetailsPage/FeaturedDetails/FeaturedDetails';
import { extractExtention } from '../../utility/utility';
import { decode } from 'base64-arraybuffer';
import { LMS_BASE_URL } from '../../config';
import { Base64 } from 'js-base64';

class OfferDetails extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    //Portfolio State Starts
    idsToDelete: [],
    imageUrl: null,
    imageName: [],
    base64: [],
    AllFileTypes: [],
    fileType: '',
    link_url: '',
    invalidPortfolioUrl: false,
    video_url: '',
    invalidVideoUrl: false,
    //Portfolio State Ends
    isImagesLoading: false,
    imagePreview: [],
  };

  componentWillUnmount = () => {
    let detailsType = this.props.match.params.type;
    let detailsId = this.props.match.params.id;
    if (detailsId && detailsType) {
      if (detailsType.toLowerCase() === 'business') {
        this.props.getProfile(detailsId).then(response => {
          if (response.value) {
            if (
              !response.value.success ||
              (response.value.success && response.value.success === false)
            ) {
              this.props.history.push(routes.HOME);
            }
          }
        });
      } else if (
        detailsType.toLowerCase() === CategoriesList.WANT_AD.key.toLowerCase()
      ) {
        this.props.getClassifiedByID(detailsId).then(response => {
          if (response.value) {
            if (
              !response.value.success ||
              (response.value.success && response.value.success === false)
            ) {
              this.props.history.push(routes.HOME);
            }
          }
        });
      } else if (
        detailsType.toLowerCase() === CategoriesList.FEATURED.toLowerCase()
      ) {
        this.props.getFeaturedProfile(detailsId).then(response => {
          if (response.value) {
            if (
              !response.value.success ||
              (response.value.success && response.value.success === false)
            ) {
              this.props.history.push(routes.HOME);
            }
          }
        });
      }
      // else if (detailsType.toLowerCase() === CategoriesList.PROFILE.toLowerCase()) {
      //      this.props.getProfileById(detailsId.split('_')[0], detailsId.split('_')[1])
      //           .then(response => {
      //                if (!response.value.success || (response.value.success && response.value.success === false)) {
      //                     this.props.history.push(routes.HOME)
      //                }
      //           })
      // }
      else {
        this.props.getServiceByID(detailsId).then(response => {
          if (response.value) {
            if (
              !response.value.success ||
              (response.value.success && response.value.success === false)
            ) {
              this.props.history.push(routes.HOME);
            }
          }
        });
      }
    } else {
      this.props.history.push(routes.HOME);
    }
  };

  componentDidMount() {
    let detailsType = this.props.match.params.type;
    let detailsId = this.props.match.params.id;
    this.props.navigateToDetails(false, null);
    console.log(this.props.history.location.pathname);
    //  if (
    //     !this.props.serviceDetail ||
    //     (this.props.serviceDetail &&
    //        this.props.serviceDetail.id.toString() !== detailsId)
    //  ) {
    if (detailsId && detailsType) {
      if (detailsType.toLowerCase() === 'business') {
        this.props.getProfile(detailsId).then(response => {
          if (response.value) {
            if (
              !response.value.success ||
              (response.value.success && response.value.success === false)
            ) {
              this.props.history.push(routes.HOME);
            } else {
              if (this.props.goToStep && this.props.goToStep.steps) {
                let step = this.props.goToStep.steps + 1
                setTimeout(() => {
                  this.props.handleStepChange(step)
                }, 2000)
              }
            }
          }
        });
      } else if (
        detailsType.toLowerCase() === CategoriesList.WANT_AD.key.toLowerCase()
      ) {
        this.props.getClassifiedByID(detailsId).then(response => {
          if (response.value) {
            if (
              !response.value.success ||
              (response.value.success && response.value.success === false)
            ) {
              this.props.history.push(routes.HOME);
            } else {
              if (this.props.goToStep && this.props.goToStep.steps) {
                let step = this.props.goToStep.steps + 1
                setTimeout(() => {
                  this.props.handleStepChange(step)
                }, 2000)
              }
            }
          }
        });
      } else if (
        detailsType.toLowerCase() === CategoriesList.FEATURED.toLowerCase()
      ) {
        this.props.getFeaturedProfile(detailsId).then(response => {
          if (response.value) {
            if (
              !response.value.success ||
              (response.value.success && response.value.success === false)
            ) {
              this.props.history.push(routes.HOME);
            }
          }
        });
      }
      // else if (detailsType.toLowerCase() === CategoriesList.PROFILE.toLowerCase()) {
      //      this.props.getProfileById(detailsId.split('_')[0], detailsId.split('_')[1])
      //           .then(response => {
      //                if (!response.value.success || (response.value.success && response.value.success === false)) {
      //                     this.props.history.push(routes.HOME)
      //                }
      //           })
      // }
      else {
        this.props.getServiceByID(detailsId).then(response => {
          if (response.value) {
            if (
              !response.value.success ||
              (response.value.success && response.value.success === false)
            ) {
              this.props.history.push(routes.HOME);
            } else {
              let oldQuickstart = storage.get('quickstart');
              let contact_a_member = oldQuickstart ? oldQuickstart.contact_a_member : false
              if (!contact_a_member) {
                let quickstart = {
                  ...this.props.quickstartItems,
                  contact_a_member: true,
                };
                this.props.updateQuickstartItems(quickstart)
                storage.set('quickstart', quickstart);
              }
              if (this.props.goToStep && this.props.goToStep.steps) {
                let step = this.props.goToStep.steps + 1
                this.props.handleStepChange(step)
              }
            }
          }
        });
      }
    } else {
      this.props.history.push(routes.HOME);
    }
    //  }
    storage.remove('D_type');
    storage.remove('D_id');
    storage.remove('D_route');
    if (this.props.user) {
      this.props.getDeckList();
      this.props.fetchCurrentUser();
    }
  }

  addDeckClicked = service => {
    this.props.addDeckClicked(service);
  };

  /* Edit Portfolio Functions Starts */

  /* Services Functions Starts */
  addOrUpdateService = service => {
    let serviceToUpdate = { service: service.new_photo_paths };
    if (this.state.base64 && this.state.base64.length > 0) {
      const arrayBuffer = [];
      this.state.base64.map((url, i) => {
        if (!url.photo_urls) {
          let base_photo = null;
          const image = url.split(',');
          base_photo = image[1];

          arrayBuffer.push(decode(base_photo));
        }
      });
      const extentions = extractExtention(this.state.imageName);
      this.props.updateServiceWithImage(
        service.id,
        serviceToUpdate,
        extentions,
        arrayBuffer,
      );
      this.setBase64ToEmpty();
      this.setImageNameToEmpty();
      this.setIsImageUploading(false);
    }
  };
  /* Services Functions Ends */

  /* Classified Functions Starts */

  addOrUpdateClassified = classified => {
    let classifiedToUpdate = { classified: classified.new_photo_paths };
    if (this.state.base64 && this.state.base64.length > 0) {
      const arrayBuffer = [];
      this.state.base64.map((url, i) => {
        if (!url.photo_urls) {
          let base_photo = null;
          const image = url.split(',');
          base_photo = image[1];

          arrayBuffer.push(decode(base_photo));
        }
      });
      const extentions = extractExtention(this.state.imageName);
      this.props.updateClassifiedWithImages(
        classified.id,
        classifiedToUpdate,
        extentions,
        arrayBuffer,
      );
      this.setBase64ToEmpty();
      this.setImageNameToEmpty();
      this.setIsImageUploading(false);
    }
  };

  /* Classified Functions Ends */

  updateImageState = (imageName, fileType, AllFileTypes) => {
    this.setState(prevState => ({
      imageName: [...prevState.imageName, ...imageName],
      fileType: [...prevState.fileType, ...fileType],
      AllFileTypes: [...prevState.AllFileTypes, ...AllFileTypes],
    }));
  };

  updateBase64 = base64 => {
    this.setState(prevState => ({
      base64: [...prevState.base64, ...base64],
    }));
    this.setState(prevState => ({
      imagePreview: [...prevState.imagePreview, ...base64],
    }));
  };

  setIsImageUploading = value => {
    this.setState({ isImagesLoading: value });
  };

  setBase64ToEmpty = () => {
    this.setState({ base64: [] });
  };

  setImagePreviewToEmpty = () => {
    this.setState({ imagePreview: [] });
  };

  setImageNameToEmpty = () => {
    this.setState({ imageName: [] });
  };

  addPortfolioImages = (profileId, portfolioId) => {
    if (this.state.base64.length > 0) {
      const arrayBuffer = [];
      this.state.base64.map((url, i) => {
        if (!url.photo_urls) {
          let base_photo = null;
          const image = url.split(',');
          base_photo = image[1];
          arrayBuffer.push(decode(base_photo));
        }
      });
      const extentions = extractExtention(this.state.imageName);
      this.props.getPortfolioPresignedUrls(
        profileId,
        extentions,
        arrayBuffer,
        portfolioId,
      );
      this.setBase64ToEmpty();
      this.setImageNameToEmpty();
      this.setIsImageUploading(false);
    }
  };

  removeBase64Image = (base64, indexToRemove) => {
    let Base64Images = [...this.state.base64];
    let updatedFileTypes = [...this.state.fileType];
    let updatedImageNames = [...this.state.imageName];

    let base64Index = this.state.base64.findIndex(function (base) {
      return base === base64;
    });
    Base64Images.splice(base64Index, 1);
    updatedFileTypes.splice(indexToRemove, 1);
    updatedImageNames.splice(indexToRemove, 1);

    this.setState({
      base64: Base64Images,
      fileType: updatedFileTypes,
      imageName: updatedImageNames,
    });
  };

  /* Edit Portfolio Functions Ends */

  msgClickHandler = receiver => {
    let highestSubscriptionType = null;
    this.props.user.subscriptions.map(subscription => {
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
        if (!highestSubscriptionType) {
          this.props.user.subscriptions.map((subscription, index) => {
            if (
              subscription.subcription_type.toLowerCase() ===
              SubscriptionType.STARTUP_SPECIAL.toLowerCase()
            ) {
              highestSubscriptionType = SubscriptionType.STARTUP_SPECIAL;
            }
          });
        }
      }
    });
    if (!highestSubscriptionType) {
      window.$('#subscription_modal').modal();
    } else {
      if (receiver && receiver.user && receiver.user.wordpress_user_id) {
        let encryptedEmail = Base64.encode(this.props.user.email);
        console.log('encodedMail', encryptedEmail);
        window.open(`${LMS_BASE_URL()}/members/?message=true&r=${receiver.user.wordpress_user_id}`, '_self')
      } else if (this.props.user) {
        let encryptedEmail = Base64.encode(this.props.user.email);
        console.log('encodedMail', encryptedEmail);
        window.open(`${LMS_BASE_URL()}/members/?message=true`, '_self')
      } else {
        this.props.updateConversationReceiver(receiver);
        this.props.history.push(routes.MESSAGES);
      }
    }
    if (this.props.goToStep && this.props.goToStep.steps) {
      let step = this.props.goToStep.steps + 1
      this.props.handleStepChange(step)
    }
  };

  render() {
    console.log(this.props.match.params, 'categoryParam');
    let detailsId = this.props.match.params.id;
    let detailsType = this.props.match.params.type;
    let profileDetail = this.props.match.params.detailType;
    let content = (
      <div className="ph_empty_message" role="alert">
        <img
          className="ph_empty_image"
          src={EMPTY_IMAGE_PATH.SEARCH}
          alt="No Result Found"
        />
        <div className="ph_empty_text">No Result Found</div>
      </div>
    );
    if (this.props.isServiceLoading) {
      content = (
        <div className="ph_empty_message" role="alert">
          <SpinnerLoader />
        </div>
      );
    }
    if (
      profileDetail &&
      profileDetail.toLowerCase() === CategoriesList.PROFILE.toLowerCase()
    ) {
      content = (
        <PeopleDetails
          //Edit Portfolio Props Start
          getPortfolioPresignedUrls={this.props.getPortfolioPresignedUrls}
          deletePortfolio={this.props.deletePortfolio}
          updatePortfolio={this.props.updatePortfolio}
          addPortfolioImages={this.addPortfolioImages}
          updateBase64={this.updateBase64}
          setIsImageUploading={this.setIsImageUploading}
          imagePreview={this.state.imagePreview}
          isImagesLoading={this.state.isImagesLoading}
          isPortfolioLoading={this.props.isPortfolioLoading}
          isUpdatePortfolioLoading={this.props.isUpdatePortfolioLoading}
          setBase64ToEmpty={this.setBase64ToEmpty}
          setImagePreviewToEmpty={this.setImagePreviewToEmpty}
          updateImageState={this.updateImageState}
          removeBase64Image={this.removeBase64Image}
          invalidPortfolioUrl={this.state.invalidPortfolioUrl}
          idsToDelete={this.state.idsToDelete}
          imageUrl={this.state.imageUrl}
          imageName={this.state.imageName}
          base64={this.state.base64}
          link_url={this.state.link_url}
          AllFileTypes={this.state.AllFileTypes}
          video_url={this.state.video_url}
          invalidVideoUrl={this.state.invalidVideoUrl}
          fileType={this.state.fileType}
          //Edit Portfolio Props Ends
          user={this.props.user}
          updateConversationReceiver={this.msgClickHandler}
          isServiceLoading={this.props.isServiceLoading}
          addDeckClicked={this.addDeckClicked}
          history={this.props.history}
          getShareURL={this.props.getShareURL}
          detailsType={profileDetail}
          storeFullDescription={this.props.storeFullDescription}
          details={
            this.props.profileDetail
              ? this.props.profileDetail
              : this.props.serviceDetail
          }
        />
      );
    } else if (detailsType.toLowerCase() === 'business') {
      content = (
        <BusinessDetails
          getPortfolioPresignedUrls={this.props.getPortfolioPresignedUrls}
          deletePortfolio={this.props.deletePortfolio}
          updatePortfolio={this.props.updatePortfolio}
          addPortfolioImages={this.addPortfolioImages}
          updateBase64={this.updateBase64}
          setIsImageUploading={this.setIsImageUploading}
          imagePreview={this.state.imagePreview}
          isImagesLoading={this.state.isImagesLoading}
          isPortfolioLoading={this.props.isPortfolioLoading}
          isUpdatePortfolioLoading={this.props.isUpdatePortfolioLoading}
          setBase64ToEmpty={this.setBase64ToEmpty}
          setImagePreviewToEmpty={this.setImagePreviewToEmpty}
          updateImageState={this.updateImageState}
          removeBase64Image={this.removeBase64Image}
          invalidPortfolioUrl={this.state.invalidPortfolioUrl}
          idsToDelete={this.state.idsToDelete}
          imageUrl={this.state.imageUrl}
          imageName={this.state.imageName}
          base64={this.state.base64}
          link_url={this.state.link_url}
          AllFileTypes={this.state.AllFileTypes}
          video_url={this.state.video_url}
          invalidVideoUrl={this.state.invalidVideoUrl}
          fileType={this.state.fileType}
          //Edit Portfolio Props Ends
          user={this.props.user}
          updateConversationReceiver={this.msgClickHandler}
          isServiceLoading={this.props.isBusinessServiceLoading}
          addDeckClicked={this.addDeckClicked}
          history={this.props.history}
          getShareURL={this.props.getShareURL}
          detailsType="business"
          storeFullDescription={this.props.storeFullDescription}
          details={this.props.businessProfileDetail}
        />
      );
    } else if (
      detailsType.toLowerCase() === CategoriesList.FEATURED.toLowerCase()
    ) {
      content = (
        <FeaturedDetails
          user={this.props.user}
          updateConversationReceiver={this.msgClickHandler}
          isServiceLoading={this.props.isServiceLoading}
          addDeckClicked={this.addDeckClicked}
          getShareURL={this.props.getShareURL}
          history={this.props.history}
          storeFullDescription={this.props.storeFullDescription}
          details={
            this.props.profileDetail
              ? this.props.profileDetail
              : this.props.serviceDetail
          }
        />
      );
    } else if (this.props.serviceDetail && !this.props.isServiceLoading) {
      let selectedCategory = this.props.serviceDetail.category
        // ? this.props.serviceDetail.category.name.toLowerCase()
        ? this.props.serviceDetail.category.filter(e => e.name.toLowerCase())
        : null;
      if (
        this.props.serviceDetail.type.toLowerCase() ===
        CategoriesList.WANT_AD.key.toLowerCase()
      ) {
        selectedCategory = this.props.serviceDetail.type.toLowerCase();
      }
      console.log(selectedCategory, 'category');
      if (selectedCategory && selectedCategory.length > 0 && Array.isArray(selectedCategory)) {
        debugger
        if (selectedCategory.filter(i => i.name && i.name.toLowerCase() === CategoriesList.OPPORTUNITY.toLowerCase()).length > 0) {
          content = (
            <OpportunityDetails
              //Edit Service Props Start
              getPortfolioPresignedUrls={this.props.getPortfolioPresignedUrls}
              deletePortfolio={this.props.deletePortfolio}
              updatePortfolio={this.props.updatePortfolio}
              updateBase64={this.updateBase64}
              setIsImageUploading={this.setIsImageUploading}
              imagePreview={this.state.imagePreview}
              updateServiceWithImage={this.props.updateServiceWithImage}
              isImagesLoading={this.state.isImagesLoading}
              isPortfolioLoading={this.props.isPortfolioLoading}
              isUpdatePortfolioLoading={this.props.isUpdatePortfolioLoading}
              addOrUpdateService={this.addOrUpdateService}
              setBase64ToEmpty={this.setBase64ToEmpty}
              setImagePreviewToEmpty={this.setImagePreviewToEmpty}
              updateImageState={this.updateImageState}
              removeBase64Image={this.removeBase64Image}
              invalidPortfolioUrl={this.state.invalidPortfolioUrl}
              idsToDelete={this.state.idsToDelete}
              imageUrl={this.state.imageUrl}
              imageName={this.state.imageName}
              base64={this.state.base64}
              link_url={this.state.link_url}
              AllFileTypes={this.state.AllFileTypes}
              video_url={this.state.video_url}
              invalidVideoUrl={this.state.invalidVideoUrl}
              fileType={this.state.fileType}
              //Edit Service Props Ends
              user={this.props.user}
              updateConversationReceiver={this.msgClickHandler}
              isServiceLoading={this.props.isServiceLoading}
              history={this.props.history}
              storeFullDescription={this.props.storeFullDescription}
              addDeckClicked={this.addDeckClicked}
              details={this.props.serviceDetail}
            />
          );
        } else if (selectedCategory.filter(i => i.name && i.name.toLowerCase() === CategoriesList.PEOPLE.toLowerCase()).length > 0) {
          content = (
            <PeopleDetails
              //Edit Service Props Start
              getPortfolioPresignedUrls={this.props.getPortfolioPresignedUrls}
              deletePortfolio={this.props.deletePortfolio}
              updatePortfolio={this.props.updatePortfolio}
              updateBase64={this.updateBase64}
              setIsImageUploading={this.setIsImageUploading}
              imagePreview={this.state.imagePreview}
              updateServiceWithImage={this.props.updateServiceWithImage}
              isImagesLoading={this.state.isImagesLoading}
              isPortfolioLoading={this.props.isPortfolioLoading}
              isUpdatePortfolioLoading={this.props.isUpdatePortfolioLoading}
              addOrUpdateService={this.addOrUpdateService}
              setBase64ToEmpty={this.setBase64ToEmpty}
              setImagePreviewToEmpty={this.setImagePreviewToEmpty}
              updateImageState={this.updateImageState}
              removeBase64Image={this.removeBase64Image}
              invalidPortfolioUrl={this.state.invalidPortfolioUrl}
              idsToDelete={this.state.idsToDelete}
              imageUrl={this.state.imageUrl}
              imageName={this.state.imageName}
              base64={this.state.base64}
              link_url={this.state.link_url}
              AllFileTypes={this.state.AllFileTypes}
              video_url={this.state.video_url}
              invalidVideoUrl={this.state.invalidVideoUrl}
              fileType={this.state.fileType}
              //Edit Service Props Ends
              user={this.props.user}
              getShareURL={this.props.getShareURL}
              updateConversationReceiver={this.msgClickHandler}
              isServiceLoading={this.props.isServiceLoading}
              addDeckClicked={this.addDeckClicked}
              // setImagePreviewToEmpty={this.setImagePreviewToEmpty}
              history={this.props.history}
              profileId={detailsId}
              getProfileById={this.props.getProfileById}
              storeFullDescription={this.props.storeFullDescription}
              details={this.props.serviceDetail ? this.props.serviceDetail : null}
            />
          );
        } else if (selectedCategory.filter(i => i.name && i.name.toLowerCase() === CategoriesList.PLACES.toLowerCase()).length > 0) {
          content = (
            <PlacesDetails
              //Edit Service Props Start
              getPortfolioPresignedUrls={this.props.getPortfolioPresignedUrls}
              deletePortfolio={this.props.deletePortfolio}
              updatePortfolio={this.props.updatePortfolio}
              updateBase64={this.updateBase64}
              setIsImageUploading={this.setIsImageUploading}
              imagePreview={this.state.imagePreview}
              updateServiceWithImage={this.props.updateServiceWithImage}
              isImagesLoading={this.state.isImagesLoading}
              isPortfolioLoading={this.props.isPortfolioLoading}
              isUpdatePortfolioLoading={this.props.isUpdatePortfolioLoading}
              addOrUpdateService={this.addOrUpdateService}
              setBase64ToEmpty={this.setBase64ToEmpty}
              setImagePreviewToEmpty={this.setImagePreviewToEmpty}
              updateImageState={this.updateImageState}
              removeBase64Image={this.removeBase64Image}
              invalidPortfolioUrl={this.state.invalidPortfolioUrl}
              idsToDelete={this.state.idsToDelete}
              imageUrl={this.state.imageUrl}
              imageName={this.state.imageName}
              base64={this.state.base64}
              link_url={this.state.link_url}
              AllFileTypes={this.state.AllFileTypes}
              video_url={this.state.video_url}
              invalidVideoUrl={this.state.invalidVideoUrl}
              fileType={this.state.fileType}
              //Edit Service Props Ends
              user={this.props.user}
              getShareURL={this.props.getShareURL}
              updateConversationReceiver={this.msgClickHandler}
              isServiceLoading={this.props.isServiceLoading}
              history={this.props.history}
              addDeckClicked={this.addDeckClicked}
              storeFullDescription={this.props.storeFullDescription}
              details={this.props.serviceDetail}
            />
          );
        } else if (selectedCategory.filter(i => i.name && i.name.toLowerCase() === CategoriesList.THING.toLowerCase()).length > 0) {
          content = (
            <ThingDetails
              //Edit Service Props Start
              getPortfolioPresignedUrls={this.props.getPortfolioPresignedUrls}
              deletePortfolio={this.props.deletePortfolio}
              updatePortfolio={this.props.updatePortfolio}
              updateBase64={this.updateBase64}
              setIsImageUploading={this.setIsImageUploading}
              imagePreview={this.state.imagePreview}
              addOrUpdateOrDeleteServiceLoading={
                this.props.addOrUpdateOrDeleteServiceLoading
              }
              updateServiceWithImage={this.props.updateServiceWithImage}
              isImagesLoading={this.state.isImagesLoading}
              isPortfolioLoading={this.props.isPortfolioLoading}
              isUpdatePortfolioLoading={this.props.isUpdatePortfolioLoading}
              addOrUpdateService={this.addOrUpdateService}
              setBase64ToEmpty={this.setBase64ToEmpty}
              setImagePreviewToEmpty={this.setImagePreviewToEmpty}
              updateImageState={this.updateImageState}
              removeBase64Image={this.removeBase64Image}
              invalidPortfolioUrl={this.state.invalidPortfolioUrl}
              idsToDelete={this.state.idsToDelete}
              imageUrl={this.state.imageUrl}
              imageName={this.state.imageName}
              base64={this.state.base64}
              link_url={this.state.link_url}
              AllFileTypes={this.state.AllFileTypes}
              video_url={this.state.video_url}
              invalidVideoUrl={this.state.invalidVideoUrl}
              fileType={this.state.fileType}
              //Edit Service Props Ends
              user={this.props.user}
              getShareURL={this.props.getShareURL}
              updateConversationReceiver={this.msgClickHandler}
              isServiceLoading={this.props.isServiceLoading}
              history={this.props.history}
              addDeckClicked={this.addDeckClicked}
              storeFullDescription={this.props.storeFullDescription}
              details={this.props.serviceDetail}
            />
          );
        } else if (selectedCategory.filter(i => i.name && i.name.toLowerCase() === CategoriesList.JOB.toLowerCase()).length > 0) {
          content = (
            <JobDetails
              //Edit Service Props Start
              getPortfolioPresignedUrls={this.props.getPortfolioPresignedUrls}
              deletePortfolio={this.props.deletePortfolio}
              updatePortfolio={this.props.updatePortfolio}
              updateBase64={this.updateBase64}
              setIsImageUploading={this.setIsImageUploading}
              imagePreview={this.state.imagePreview}
              updateServiceWithImage={this.props.updateServiceWithImage}
              isImagesLoading={this.state.isImagesLoading}
              isPortfolioLoading={this.props.isPortfolioLoading}
              isUpdatePortfolioLoading={this.props.isUpdatePortfolioLoading}
              addOrUpdateService={this.addOrUpdateService}
              setBase64ToEmpty={this.setBase64ToEmpty}
              setImagePreviewToEmpty={this.setImagePreviewToEmpty}
              updateImageState={this.updateImageState}
              removeBase64Image={this.removeBase64Image}
              invalidPortfolioUrl={this.state.invalidPortfolioUrl}
              idsToDelete={this.state.idsToDelete}
              imageUrl={this.state.imageUrl}
              imageName={this.state.imageName}
              base64={this.state.base64}
              link_url={this.state.link_url}
              AllFileTypes={this.state.AllFileTypes}
              video_url={this.state.video_url}
              invalidVideoUrl={this.state.invalidVideoUrl}
              fileType={this.state.fileType}
              //Edit Service Props Ends
              user={this.props.user}
              getShareURL={this.props.getShareURL}
              updateConversationReceiver={this.msgClickHandler}
              isServiceLoading={this.props.isServiceLoading}
              history={this.props.history}
              addDeckClicked={this.addDeckClicked}
              storeFullDescription={this.props.storeFullDescription}
              details={this.props.serviceDetail}
            />
          );
        } else if (selectedCategory.filter(i => i.name && i.name.toLowerCase() === CategoriesList.DONATION.toLowerCase()).length > 0) {
          content = (
            <DonationDetails
              //Edit Service Props Start
              getPortfolioPresignedUrls={this.props.getPortfolioPresignedUrls}
              deletePortfolio={this.props.deletePortfolio}
              updatePortfolio={this.props.updatePortfolio}
              updateBase64={this.updateBase64}
              setIsImageUploading={this.setIsImageUploading}
              imagePreview={this.state.imagePreview}
              updateServiceWithImage={this.props.updateServiceWithImage}
              isImagesLoading={this.state.isImagesLoading}
              isPortfolioLoading={this.props.isPortfolioLoading}
              isUpdatePortfolioLoading={this.props.isUpdatePortfolioLoading}
              addOrUpdateService={this.addOrUpdateService}
              setBase64ToEmpty={this.setBase64ToEmpty}
              setImagePreviewToEmpty={this.setImagePreviewToEmpty}
              updateImageState={this.updateImageState}
              removeBase64Image={this.removeBase64Image}
              invalidPortfolioUrl={this.state.invalidPortfolioUrl}
              idsToDelete={this.state.idsToDelete}
              imageUrl={this.state.imageUrl}
              imageName={this.state.imageName}
              base64={this.state.base64}
              link_url={this.state.link_url}
              AllFileTypes={this.state.AllFileTypes}
              video_url={this.state.video_url}
              invalidVideoUrl={this.state.invalidVideoUrl}
              fileType={this.state.fileType}
              //Edit Service Props Ends
              user={this.props.user}
              getShareURL={this.props.getShareURL}
              updateConversationReceiver={this.msgClickHandler}
              isServiceLoading={this.props.isServiceLoading}
              history={this.props.history}
              storeFullDescription={this.props.storeFullDescription}
              addDeckClicked={this.addDeckClicked}
              details={this.props.serviceDetail}
            />
          );
        }
        else {
          content = <Redirect to={routes.HOME} />;
        }
      } else if (selectedCategory && selectedCategory.toLowerCase() === CategoriesList.WANT_AD.key.toLowerCase()) {
        content = (
          <ClassifiedDetails
            //Edit Service Props Start
            updateBase64={this.updateBase64}
            addOrUpdateOrDeleteClassifiedLoading={
              this.props.addOrUpdateOrDeleteClassifiedLoading
            }
            setIsImageUploading={this.setIsImageUploading}
            imagePreview={this.state.imagePreview}
            addOrUpdateClassified={this.addOrUpdateClassified}
            isImagesLoading={this.state.isImagesLoading}
            isPortfolioLoading={this.props.isPortfolioLoading}
            isUpdatePortfolioLoading={this.props.isUpdatePortfolioLoading}
            setBase64ToEmpty={this.setBase64ToEmpty}
            setImagePreviewToEmpty={this.setImagePreviewToEmpty}
            updateImageState={this.updateImageState}
            removeBase64Image={this.removeBase64Image}
            invalidPortfolioUrl={this.state.invalidPortfolioUrl}
            idsToDelete={this.state.idsToDelete}
            imageUrl={this.state.imageUrl}
            imageName={this.state.imageName}
            base64={this.state.base64}
            link_url={this.state.link_url}
            AllFileTypes={this.state.AllFileTypes}
            video_url={this.state.video_url}
            invalidVideoUrl={this.state.invalidVideoUrl}
            fileType={this.state.fileType}
            //Edit Service Props Ends
            user={this.props.user}
            getShareURL={this.props.getShareURL}
            updateConversationReceiver={this.msgClickHandler}
            isServiceLoading={this.props.isServiceLoading}
            history={this.props.history}
            storeFullDescription={this.props.storeFullDescription}
            addDeckClicked={this.addDeckClicked}
            details={this.props.serviceDetail ? this.props.serviceDetail : null}
          />
        );
      }
      else {
        content = <Redirect to={routes.HOME} />;
      }
    }
    return content;
  }
}

const mapStateToProps = state => ({
  user: state.authReducer.user,
  categories: state.configReducer.categories,
  businessProfileDetail: state.profileReducer.businessProfileDetail,
  serviceDetail: state.userReducer.serviceDetail,
  isServiceLoading: state.userReducer.isServiceloading,
  isBusinessServiceLoading: state.profileReducer.isBusinessServiceLoading,
  profileDetail: state.userReducer.profileDetail,
  uploadedFromDetails: state.userReducer.uploadedFromDetails,
  isUpdatePortfolioLoading: state.profileReducer.isloading,
  isPortfolioLoading: state.userReducer.isPortfolioLoading,
  addOrUpdateOrDeleteServiceLoading:
    state.userReducer.addOrUpdateOrDeleteServiceLoading,
  addOrUpdateOrDeleteClassifiedLoading:
    state.userReducer.addOrUpdateOrDeleteClassifiedLoading,
  quickstartItems: state.authReducer.quickstartItems,
  goToStep: state.walkThroughReducer.goToStep
});

const mapStateToDispatch = dispatch => ({
  getProfile: id => dispatch(actions.getProfile(id)),
  fetchCurrentUser: () => dispatch(actions.fetchCurrentUser()),
  updateConversationReceiver: receiver =>
    dispatch(actions.updateConversationReceiver(receiver)),
  getServiceByID: serviceId => dispatch(actions.getServiceById(serviceId)),
  getClassifiedByID: ClassifiedId =>
    dispatch(actions.getClassifiedById(ClassifiedId)),
  addDeckClicked: service => dispatch(actions.addDeckClicked(service)),
  navigateToDetails: flag => dispatch(actions.navigateToDetails(flag)),
  getShareURL: (url, service) => dispatch(actions.shareURL(url, service)),
  getDeckList: () => dispatch(actions.getDeckList()),
  getFeaturedProfile: profileId =>
    dispatch(actions.getFeaturedProfile(profileId)),
  getProfileById: (userId, profileId) =>
    dispatch(actions.getProfileById(userId, profileId)),
  updateProfile: (profileId, profile) =>
    dispatch(actions.updateProfile(profileId, profile)),
  updatePortfolio: (profileId, portfolioId, portfolio) =>
    dispatch(actions.updatePortfolio(profileId, portfolioId, portfolio)),
  storeFullDescription: (description, descriptionTitle) =>
    dispatch(actions.storeFullDescription(description, descriptionTitle)),
  getPortfolioPresignedUrls: (
    profileId,
    extentions,
    arrayBuffer,
    id,
    link_url,
    videoLink,
  ) =>
    dispatch(
      actions.getPortfolioPresignedUrls(
        profileId,
        extentions,
        arrayBuffer,
        id,
        link_url,
        videoLink,
      ),
    ),
  addPortfolioImages: (profileId, photopaths, link, videoLink) =>
    dispatch(
      actions.addPortfolioImages(profileId, photopaths, link, videoLink),
    ),
  updateServiceWithImage: (id, service, extentions, arrayBuffer) =>
    dispatch(
      actions.updateServiceWithImage(id, service, extentions, arrayBuffer),
    ),
  updateClassifiedWithImages: (id, service, extentions, arrayBuffer) =>
    dispatch(
      actions.updateClassifiedWithImages(id, service, extentions, arrayBuffer),
    ),
  updateQuickstartItems: quickstart =>
    dispatch(actions.updateQuickstartItems(quickstart)),
  handleStepChange: (steps) => dispatch(actions.handleStepChange(steps))
});

export default connect(mapStateToProps, mapStateToDispatch)(OfferDetails);
