import React, { useEffect } from 'react';
import './OfferDetailsPage.css';
import {
  routes,
  CategoriesList,
  Roles,
  SubscriptionStatus,
  SubscriptionType,

} from '../../../utility/constants/constants';
import { useSelector } from "react-redux";
import * as actions from '../../../redux/actions';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import ProgressiveImage from 'react-progressive-image';
import VideoPlayer from '../../UI/VideoPlayer/VideoPlayer';
import URLVideoPlayer from '../../UI/VideoPlayer/URLVideoPlayer/URLVideoPlayer';
import Oux from '../../../hoc/Oux/Oux';
import { WEB_URL } from '../../../config';
import MyDropzone from '../../DragAndDropFiles/DragAndDropImages';
import $ from 'jquery';
import ImageLoader from '../../UI/ImageLoader/ImageLoader';
import CustomToolTip from '../../UI/CustomToolTip/CustomToolTip';
import storage from '../../../utility/storage';
import { useDispatch } from 'react-redux';

export const Banner = props => {
  let bannerImages = null;
  let twoImagesBlock = null;
  if (props.category === CategoriesList.WANT_AD.key) {
    bannerImages = (
      <div className="ht_banner details_banner_content default_banner_bg grey_background_banner_bg classified_banner_bg" />
    );
  } else {
    console.log(props.profileImage, 'profileImageProp');
    let images = {
      firstTwoImages: [],
      nextImages: [],
      profileImage: props.profileImage,
      count: 0,
      profileImageCount: props.profileImage ? 1 : 0,
    };
    console.log(props.attachments, 'attachments');

    console.log(props.base64, 'base64 image');
    console.log(props.imagePreview, 'imagePreview image');
    // console.log(props.attachments.length, "attachments length")

    if (props.imagePreview && props.imagePreview.length > 0) {
      if (images.count === 0) {
        props.imagePreview.map((base64, index) => {
          if (props.profileImage) {
            if (index < 2) {
              images.firstTwoImages.push(base64);
              images.count += 1;
            } else if (index >= 2 && index < 3) {
              images.nextImages.push(base64);
              images.count += 1;
            }
          } else {
            if (index < 2) {
              images.firstTwoImages.push(base64);
              images.count += 1;
            } else if (index >= 2 && index < 4) {
              images.nextImages.push(base64);
              images.count += 1;
            }
          }
        });
      } else if (images.count === 1) {
        props.imagePreview.map((base64, index) => {
          if (props.profileImage) {
            if (index < 1) {
              images.firstTwoImages.push(base64);
              images.count += 1;
            } else if (index >= 1 && index < 2) {
              images.nextImages.push(base64);
              images.count += 1;
            }
          } else {
            if (index < 1) {
              images.firstTwoImages.push(base64);
              images.count += 1;
            } else if (index >= 1 && index < 3) {
              images.nextImages.push(base64);
              images.count += 1;
            }
          }
        });
      } else if (images.count >= 2) {
        props.imagePreview.map((base64, index) => {
          if (props.profileImage) {
            if (index < 1 && images.nextImages.length < 1) {
              images.nextImages.push(base64);
              images.count += 1;
            }
          } else {
            if (index < 2 && images.nextImages.length < 2) {
              images.nextImages.push(base64);
              images.count += 1;
            }
          }
        });
      }
    }
    console.log(images, 'afterBase64');

    if (props.attachments && props.attachments.length > 0) {
      if (images.count === 0) {
        props.attachments.map((attachment, index) => {
          if (props.profileImage) {
            if (index < 2 && Object.keys(attachment.photo_urls).length > 0) {
              images.firstTwoImages.push(attachment.photo_urls.medium);
              images.count += 1;
            } else if (
              index >= 2 &&
              index < 3 &&
              Object.keys(attachment.photo_urls).length > 0
            ) {
              images.nextImages.push(attachment.photo_urls.medium);
              images.count += 1;
            }
          } else {
            if (index < 2 && Object.keys(attachment.photo_urls).length > 0) {
              images.firstTwoImages.push(attachment.photo_urls.medium);
              images.count += 1;
            } else if (
              index >= 2 &&
              index < 4 &&
              Object.keys(attachment.photo_urls).length > 0
            ) {
              images.nextImages.push(attachment.photo_urls.medium);
              images.count += 1;
            }
          }
        });
      } else if (images.count === 1) {
        props.attachments.map((attachment, index) => {
          if (props.profileImage) {
            if (index < 1 && Object.keys(attachment.photo_urls).length > 0) {
              images.firstTwoImages.push(attachment.photo_urls.medium);
              images.count += 1;
            } else if (
              index >= 1 &&
              index < 2 &&
              Object.keys(attachment.photo_urls).length > 0
            ) {
              images.nextImages.push(attachment.photo_urls.medium);
              images.count += 1;
            }
          } else {
            if (index < 1 && Object.keys(attachment.photo_urls).length > 0) {
              images.firstTwoImages.push(attachment.photo_urls.medium);
              images.count += 1;
            } else if (
              index >= 1 &&
              index < 3 &&
              Object.keys(attachment.photo_urls).length > 0
            ) {
              images.nextImages.push(attachment.photo_urls.medium);
              images.count += 1;
            }
          }
        });
      } else if (images.count >= 2) {
        props.attachments.map((attachment, index) => {
          if (props.profileImage) {
            if (
              index < 1 &&
              Object.keys(attachment.photo_urls).length > 0 &&
              images.nextImages.length < 1
            ) {
              images.nextImages.push(attachment.photo_urls.medium);
              images.count += 1;
            }
          } else {
            if (
              index < 2 &&
              Object.keys(attachment.photo_urls).length > 0 &&
              images.nextImages.length < 2
            ) {
              images.nextImages.push(attachment.photo_urls.medium);
              images.count += 1;
            }
          }
        });
      }
    }
    console.log(images, 'afterAttachments');

    if (images.profileImageCount === 1) {
      images.count += images.profileImageCount;
    }

    console.log(images, 'imagesUpdated');

    console.log(images.count, 'count');

    if (props.base64 && props.base64.length > 0) {
      if (props.isProfile) {
        if (
          props.service.profile.portfolio &&
          props.service.profile.portfolio.length > 0
        ) {
          props.addPortfolioImages(
            props.service.profile.id,
            props.service.profile.portfolio[0].id,
          );
        } else {
          props.addPortfolioImages(props.service.profile.id);
        }
      } else if (
        props.category.toLowerCase() ===
        CategoriesList.WANT_AD.title.toLowerCase()
      ) {
        props.addOrUpdateClassified(props.service);
      } else {
        props.addOrUpdateService(props.service);
      }
    }

    if (props.isProfile== true || props.isProfile== false && images.count > 0 && images.profileImage) {
      bannerImages = (
        <div className="default_banner_bg grey_background_banner_bg">
          <div>
            <div className="custom_column">
              <ImageLoader src={images.profileImage} className="gallery_box" />
            </div>
          </div>
          {images.firstTwoImages && images.firstTwoImages.length > 0 ? (
            <Oux>
              <div
                className={
                  images.count === 0 || images.count <= 2
                    ? 'ph_banner_sec'
                    : 'custom_column middle_column'
                }
              >
                {images && images.firstTwoImages.length > 0 ? (
                  images.firstTwoImages.map((image, index) => {
                    if (images.count === 2) {
                      if (image === '') {
                        return (
                          <div className="ph_left_fig">
                            {/* <img src="/images/thumbnails/ph_hero6.png" className="gallery_box" alt="image" /> */}
                          </div>
                        );
                      } else {
                        return (
                          <div className="custom_column right_column">
                            <ImageLoader className="gallery_box" src={image} />
                          </div>
                        );
                      }
                    } else {
                      return (
                        <div className="middle_gallery">
                          <ImageLoader className="gallery_box" src={image} />
                        </div>
                      );
                    }
                  })
                ) : (
                  <div className="ph_left_fig">
                    <ImageLoader
                      src="/images/thumbnails/image_grey.png"
                      className="gallery_box"
                    />
                  </div>
                )}
              </div>
              {images && images.nextImages.length > 0
                ? images.nextImages.map((image, index) => {
                  return (
                    <div>
                      <div
                        className={
                          images.nextImages.length === index + 1
                            ? 'custom_column right_column pr-0'
                            : 'custom_column'
                        }
                      >
                        <ImageLoader src={image} className="gallery_box" />
                      </div>
                    </div>
                  );
                })
                : null}
            </Oux>
          ) : null}
        </div>
      );
    } else {
      if (images.firstTwoImages && images.firstTwoImages.length > 0) {
        bannerImages = (
          <div className="default_banner_bg grey_background_banner_bg">
            <div
              className={
                images.count === 0 || (images.count && images.count) <= 1
                  ? 'ph_banner_sec'
                  : 'custom_column middle_column'
              }
            >
              {images && images.firstTwoImages.length > 0 ? (
                images.firstTwoImages.map((image, index) => {
                  if (images.count === 1) {
                    if (image === '') {
                      return (
                        <div className="ph_left_fig">
                          {/* <img src="/images/thumbnails/ph_hero6.png" className="gallery_box" alt="image" /> */}
                        </div>
                      );
                    } else {
                      return (
                        <div className="custom_column">
                          <ImageLoader src={image} className="gallery_box" />
                        </div>
                      );
                    }
                  } else {
                    return (
                      <div className="middle_gallery">
                        <ImageLoader src={image} className="gallery_box" />
                      </div>
                    );
                  }
                })
              ) : (
                <div className="ph_left_fig">
                  <ImageLoader
                    src="/images/thumbnails/image_grey.png"
                    className="gallery_box"
                  />
                </div>
              )}
            </div>
            {images && images.nextImages.length > 0
              ? images.nextImages.map((image, index) => {
                return (
                  <div>
                    <div
                      className={
                        images.nextImages.length === index + 1
                          ? 'custom_column right_column pr-0'
                          : 'custom_column'
                      }
                    >
                      <ImageLoader src={image} className="gallery_box" />
                    </div>
                  </div>
                );
              })
              : null}
          </div>
        );
      } else {
        bannerImages = (
          <div
            className="ht_banner details_banner_content default_banner_bg grey_background_banner_bg"
            style={{ width: '100%', overflow: 'hidden', height: '350px' }}
          />
        );
      }
    }
  }

  let profileMatch = false;
  let totalImages = 0;
  if (props.attachments) {
    totalImages = props.attachments.length;
  }
  if (props.imagePreview) {
    if (totalImages <= 0) {
      totalImages = props.imagePreview.length;
    } else {
      totalImages = totalImages + props.imagePreview.length;
    }
  }
  if (props.profileImage) {
    totalImages++;
  }
  console.log(totalImages, 'totalImages');
  const handleBannerDoubleClick = () => {
    console.log('doubleClicked');
    if (props.user.profiles && props.user.profiles.length > 0) {
      props.user.profiles.map((profile, index) => {
        if (profile.id === props.service.profile.id) {
          $('#upload_banner_img_input').click();
        }
      });
    }
  };

  let routeToPush = null;
  let categoryName = null;
  let categoryType = 'Offer';
  let editToolTipText = 'Edit This Offer';
  let selectedCategory = []
  if (props.service && props.service.category) {
    selectedCategory = props.service.category.map(i => i.name && i.name.toLowerCase())
    // if (
    //   props.service.category.name.toLowerCase() ===
    //   CategoriesList.PEOPLE.toLowerCase()
    // ) {
    //   routeToPush = routes.MY_SERVICES;
    //   categoryName = CategoriesList.PEOPLE;
    // } else if (
    //   props.service.category.name.toLowerCase() ===
    //   CategoriesList.PLACES.toLowerCase()
    // ) {
    //   routeToPush = routes.PLACES;
    //   categoryName = CategoriesList.PLACES;
    // } else if (
    //   props.service.category.name.toLowerCase() ===
    //   CategoriesList.THING.toLowerCase()
    // ) {
    //   routeToPush = routes.THINGS;
    //   categoryName = CategoriesList.THING;
    // } else if (
    //   props.service.category.name.toLowerCase() ===
    //   CategoriesList.JOB.toLowerCase()
    // ) {
    //   routeToPush = routes.JOBS;
    //   categoryName = 'Services';
    // } else if (
    //   props.service.category.name.toLowerCase() ===
    //   CategoriesList.OPPORTUNITY.toLowerCase()
    // ) {
    //   routeToPush = routes.SHARING_OPPORTUNITIES;
    //   categoryName = 'Information';
    // } else if (
    //   props.service.category.name.toLowerCase() ===
    //   CategoriesList.DONATION.toLowerCase()
    // ) {
    //   routeToPush = routes.DONATIONS_GIVEAWAYS;
    //   categoryName = 'Other/Misc';
    // }
  } else {
    routeToPush = routes.BUILD;
    categoryType = null;
    categoryName = 'Project Profile';
    routeToPush = routes.MANAGE_PROFILE_EDIT;
    editToolTipText = 'Edit This Project Profile'
  }

  if (props.service.type === CategoriesList.WANT_AD.key) {
    categoryType = CategoriesList.WANT_AD.title;
    routeToPush = routes.CLASSIFIEDS;
    editToolTipText = 'Edit This Want Ad';
  }

  return (
    <div className="container-fluid theme_px_60">
      <nav aria-label="breadcrumb" className="theme_breadcrumb wow fadeInUp">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a
              href="javascript:void(0)"
              onClick={() => props.history.push(routes.HOME)}
            >
              Home
            </a>
          </li>
          {props.title ? (
            <li
              className="breadcrumb-item first_letter_capital"
              aria-current="page"
            >
              {props.isProfile ? (
                <a
                  href="javascript:void(0)"
                  onClick={() => {
                    props.setImagePreviewToEmpty();
                    props.history.goBack();
                  }}
                >
                  {props.title}
                </a>
              ) : (
                props.title
              )}
            </li>
          ) : null}
          {props.isProfile ? (
            <li className="breadcrumb-item" aria-current="page">
              <a href="javascript:void(0)" className="active">
                Profile
              </a>
            </li>
          ) : null}
        </ol>
      </nav>
      <div className="row sellectionNo">
        <div className="col-sm-12">
          <div
            className="ht_banner details_banner_content default_banner_bg grey_background_banner_bg"
            onDoubleClick={handleBannerDoubleClick}
          >
            <div className="overlay_content">
              <div className="top_btns banner_top_btns">
                {categoryType ? (
                  <a
                    style={{
                      pointerEvents: 'none',
                      fontSize: '13px',
                      textTransform: 'capitalize',
                    }}
                    class="theme_btn want_ad_btn"
                  >
                    {categoryType}: {selectedCategory.map((i, index) => index === (selectedCategory.length - 1) ? <span key={index}>{i}</span> : <span key={index}>{i}, </span>)}
                  </a>
                ) : (
                  <a
                    style={{
                      pointerEvents: 'none',
                      fontSize: '13px',
                      textTransform: 'capitalize',
                    }}
                    class="theme_btn want_ad_btn"
                  >
                    {categoryName ? categoryName : props.category}
                  </a>
                )}
                <div className="banner_right_btns">
                  <CustomToolTip
                    placement="top"
                    text="Add This Item (to a Saved List)"
                  >
                    <a
                      href="javascript:void(0)"
                      className="theme_btn add_to_deck_btn theme_primary theme_btn_sm text-uppercase"
                      onClick={() => {
                        let highestSubscriptionType = null;
                        props.user.subscriptions.map(subscription => {
                          if (
                            props.user &&
                            props.user.subscriptions &&
                            props.user.subscriptions.length > 0
                          ) {
                            props.user.subscriptions.map(
                              (subscription, index) => {
                                if (
                                  subscription.subcription_type.toLowerCase() ===
                                  SubscriptionType.PLATINUM.toLowerCase()
                                ) {
                                  highestSubscriptionType =
                                    SubscriptionType.PLATINUM;
                                }
                              },
                            );
                            if (!highestSubscriptionType) {
                              props.user.subscriptions.map(
                                (subscription, index) => {
                                  if (
                                    subscription.subcription_type.toLowerCase() ===
                                    SubscriptionType.GOLD.toLowerCase()
                                  ) {
                                    highestSubscriptionType =
                                      SubscriptionType.GOLD;
                                  }
                                },
                              );
                            }
                            if (!highestSubscriptionType) {
                              props.user.subscriptions.map(
                                (subscription, index) => {
                                  if (
                                    subscription.subcription_type.toLowerCase() ===
                                    SubscriptionType.SILVER.toLowerCase()
                                  ) {
                                    highestSubscriptionType =
                                      SubscriptionType.SILVER;
                                  }
                                },
                              );
                            }
                            if (!highestSubscriptionType) {
                              props.user.subscriptions.map(
                                (subscription, index) => {
                                  if (
                                    subscription.subcription_type.toLowerCase() ===
                                    SubscriptionType.STARTUP_SPECIAL.toLowerCase()
                                  ) {
                                    highestSubscriptionType =
                                      SubscriptionType.STARTUP_SPECIAL;
                                  }
                                },
                              );
                            }
                            if (!highestSubscriptionType) {
                              highestSubscriptionType = SubscriptionType.FREE;
                            }
                          }
                        });
                        if (!highestSubscriptionType) {
                          highestSubscriptionType = SubscriptionType.FREE;
                        }
                        if (
                          highestSubscriptionType.toLowerCase() ===
                          SubscriptionType.FREE.toLowerCase()
                        ) {
                          window.$('#subscription_modal').modal();
                        } else {
                          window.$('#add_deck_modal').modal();
                          props.addDeckClicked(props.service);
                        }
                      }}
                    >
                      Save
                    </a>
                  </CustomToolTip>
                  {/* <CustomToolTip placement="top" text="Share this card">
                                    <a
                                        href="javascript:void(0);"
                                        onClick={() => props.getShareURL(`${WEB_URL()}/${props.service.type}/${props.service.id}/details`, props.service)}
                                        className="theme_btn theme_light text-uppercase"
                                        data-toggle="modal"
                                        data-target="#icn_share">Share</a>
                                </CustomToolTip> */}
                  {props.user &&
                    props.user.profiles &&
                    props.user.profiles.length > 0 &&
                    props.user.profiles.map((profile, index) => {
                      if (profile.id === props.service.profile.id) {
                        return (
                          <CustomToolTip placement="top" text={editToolTipText}>
                            <a
                              href="javascript:void(0)"
                              onClick={() => {
                                storage.set('isEdit', true);
                                if (
                                  props.category.toLowerCase() ===
                                  CategoriesList.WANT_AD.title.toLowerCase()
                                ) {
                                  storage.set('classified', props.service);
                                } else if (
                                  props.category.toLowerCase() ===
                                  CategoriesList.BUSINESS.toLowerCase()
                                ) {
                                  props.setBusinessProfile(
                                    true,
                                    props.service.id,
                                  );
                                } else {
                                  storage.set('service', props.service);
                                }
                                props.history.push(routeToPush);
                              }}
                              className="top_icn_share_save ph_sm_cricle"
                            >
                              <img
                                src="/images/icons/icn_edit_orange.svg"
                                alt="Edit"
                              />
                            </a>
                          </CustomToolTip>
                        );
                      } else {
                        return;
                      }
                    })}
                  <CustomToolTip placement="top" text="Share this card">
                    <a
                      href="javascript:void(0)"
                      onClick={() =>
                        props.getShareURL(
                          `${WEB_URL()}/${props.service.type}/${props.service.id
                          }/details`,
                          props.service,
                        )
                      }
                      className="top_icn_share_save ph_sm_cricle"
                      data-toggle="modal"
                      data-target="#icn_share"
                    >
                      <img
                        src="/images/icons/icn_export.svg"
                        alt="Export Icon"
                      />
                    </a>
                  </CustomToolTip>
                </div>
              </div>
              <div className="btm_btns">
                {props.isUpdatePortfolioLoading ||
                  props.isPortfolioLoading ||
                  props.isImagesLoading ||
                  props.addOrUpdateOrDeleteServiceLoading ||
                  props.addOrUpdateOrDeleteClassifiedLoading ? (
                  <Oux>
                    {/* <a href="javascript:void(0);" className="theme_btn theme_light borderR25 text-uppercase border_black">{categoryName ? categoryName : props.category}</a> */}
                    <a
                      href="javascript:void(0);"
                      className="theme_btn theme_light borderR25 text-uppercase border_black disabled_button"
                    >
                      Uploading...
                    </a>
                  </Oux>
                ) : props.isProfile &&
                  props.user.profiles &&
                  props.user.profiles.length > 0 ? (
                  <Oux>
                    {props.user.profiles.map((profile, index) => {
                      if (profile.id === props.service.profile.id) {
                        profileMatch = true;
                        return (
                          <Oux>
                            {/* <a href="javascript:void(0);" style={{ display: 'inline-block' }} className="theme_btn theme_light borderR25 text-uppercase border_black">{categoryName ? categoryName : props.category}</a> */}
                            <div style={{ display: 'inline-block' }}>
                              {/* <MyDropzone
                                                                            // that={props.that}
                                                                            noOfRequiredImages={props.isProfile ? 3 : 4}
                                                                            updateBase64={props.updateBase64}
                                                                            isDetails={true}
                                                                            setIsImageUploading={props.setIsImageUploading}
                                                                            updateImageState={props.updateImageState}
                                                                            uploadImagesDirectly={true}
                                                                            details={props.service}
                                                                            addPortfolioImages={props.addPortfolioImages}
                                                                            state={props.state}
                                                                            UIComponent={
                                                                                <CustomToolTip placement="top" trigger="['hover']" text={<span>upload upto {props.isProfile ? 3 : 4} images</span>}>
                                                                                    <a href="javascript:void(0);" id="banner_upload_image_btn" className="theme_btn theme_light borderR25 text-uppercase border_black">Upload Photos</a>
                                                                                </CustomToolTip>}
                                                                        /> */}
                            </div>
                          </Oux>
                        );
                      } else {
                        return;
                      }
                    })}
                    {/* {
                                                    profileMatch
                                                        ? null
                                                        : <a href="javascript:void(0);" className="theme_btn theme_light borderR25 text-uppercase border_black">{categoryName ? categoryName : props.category}</a>
                                                } */}
                  </Oux>
                ) : (
                  <Oux>
                    {props.user &&
                      props.user.profiles &&
                      props.user.profiles.length > 0 &&
                      props.user.profiles.map((profile, index) => {
                        if (profile.id === props.service.profile.id) {
                          profileMatch = true;
                          return (
                            <Oux>
                              {/* <a href="javascript:void(0);" style={{ display: 'inline-block' }} className="theme_btn theme_light borderR25 text-uppercase border_black">{categoryName ? categoryName : props.category}</a> */}
                              <div
                                style={{
                                  display: 'inline-block',
                                }}
                              >
                                {/* <MyDropzone
                                                                            // that={props.that}
                                                                            noOfRequiredImages={props.isProfile ? 3 : 4}
                                                                            updateBase64={props.updateBase64}
                                                                            isDetails={true}
                                                                            setIsImageUploading={props.setIsImageUploading}
                                                                            updateImageState={props.updateImageState}
                                                                            uploadImagesDirectly={true}
                                                                            details={props.service}
                                                                            state={props.state}
                                                                            UIComponent={
                                                                                <CustomToolTip placement="top" trigger="['hover']" text={<span>upload upto {props.isProfile ? 3 : 4} images</span>}>
                                                                                    <a href="javascript:void(0);" id="banner_upload_image_btn" className="theme_btn theme_light borderR25 text-uppercase border_black">Upload Photos</a>
                                                                                </CustomToolTip>}
                                                                        /> */}
                              </div>
                            </Oux>
                          );
                        } else {
                          return;
                        }
                      })}
                    {/* {
                                                    profileMatch
                                                        ? null
                                                        : <a href="javascript:void(0);" className="theme_btn theme_light borderR25 text-uppercase border_black">{categoryName ? categoryName : props.category}</a>
                                                } */}
                  </Oux>
                )}
              </div>
            </div>
            {bannerImages}
          </div>
        </div>
      </div>
    </div>
  );
};

export const SkillSection = props => {
  return (
    <div className="ht_role_details">
      <div className="row">
        <div className="col-xl-12">
          <div className="left_content">
            {props.skills && props.skills.length > 0
              ? props.skills.map((skill, index) => {
                return (
                  <a
                    href="javascript: void(0);"
                    className="theme_btn theme_outline_secondary text-uppercase mouser_pointer_none"
                  >
                    {skill.name}
                  </a>
                );
              })
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProfileSection = props => {
  useEffect(() => {
    return () => {
      storage.remove('isMsgClicked')
    }
  }, [])
  let profilePic = '/custom_images/icn_user_placeholder.svg';
  const dispatch = useDispatch();
  const handleStep = (steps) => {
    dispatch(actions.handleStepChange(steps))
  }
  if (
    props.profile &&
    props.profile.photo_urls &&
    Object.keys(props.profile.photo_urls).length > 0
  ) {
    profilePic = props.profile.photo_urls.small;
  }
  console.log(props.detailsType, 'detailsTYPE');
  return (
    <div className="ph_flex_wrp_spw ph_profile_pic wow fadeInUp">
      <a onClick={() => { handleStep(3) }}> <div className="media align-items-center" id="profile_photo_walk">
        <div className="circle_img mr-3">
          <img src={profilePic} alt={props.profile.name} />
        </div>
        <div className="media-body">
          <h5 className="my-0">
            {props.detailsType &&
              props.detailsType.toLowerCase() ===
              CategoriesList.WANT_AD.title.toLowerCase() ? (
              <span>
                <a
                  href="javascript:void(0)"
                  onClick={() => {
                    props.setImagePreviewToEmpty();
                    props.history.push(
                      `/${props.detailsType &&
                        props.detailsType.toLowerCase() ===
                        CategoriesList.WANT_AD.title.toLowerCase()
                        ? CategoriesList.WANT_AD.key
                        : CategoriesList.SERVICE
                      }/${props.detailsId}/profile`,
                    );
                  }}
                  className="text-primary ph_underline"
                >
                  {props.profile.name}
                </a>{' '}
              </span>
            ) : (
              <span>
                <a
                  href="javascript:void(0)"
                  onClick={() => {
                    props.setImagePreviewToEmpty();
                    props.history.push(
                      `/${props.detailsType &&
                        props.detailsType.toLowerCase() ===
                        CategoriesList.WANT_AD.key.toLowerCase()
                        ? CategoriesList.WANT_AD.key
                        : CategoriesList.SERVICE
                      }/${props.detailsId}/profile`,
                    );
                  }}
                  className="text-primary ph_underline"
                >
                  {props.profile.name}
                </a>
              </span>
            )}
          </h5>
        </div>
      </div>
      </a>
      {props.profile.user_id === props.user.id.toString() ? null : (
        <a
          href="javascript:void(0)"
          className="theme_btn theme_primary theme_btn_299 text-uppercase" id="msg_btn_for_walk"
          onClick={() => {
            storage.set('isMsgClicked', true)
            props.updateConversationReceiver(props.profile)
          }}
        >
          Message
        </a>
      )}
    </div>
  );
};

export const CompensationSection = props => {
  return (
    <div className="ht_detail_inner">
      <div className="row">
        <div className="col-xl-4 col-lg-5">
          <article className="right_content">
            <h2 className="ft_Weight_600">Compensation</h2>
          </article>
        </div>
        <div className="col-xl-8 col-lg-7">
          <div className="left-content">
            <ul className="ul_list">
              <li className="list_items ex_list">
                <p className="com_info">
                  {props.compensations.map((compensation, index) => {
                    if (props.compensations.length > 1) {
                      return (
                        <div
                          style={{
                            cursor: 'default',
                            margin: '0 10px 10px 0',
                            border: '1px solid black',
                          }}
                          className="theme_btn text-uppercase"
                        >
                          {compensation.name}
                        </div>
                      );
                    } else {
                      return compensation.name;
                    }
                  })}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export const DescriptionSection = props => {
  return (
    <div className="ht_theme_details">
      <div className="ht_detail_inner">
        <div className="row align-items-baseline">
          <div className="col-xl-4 col-lg-5">
            <article className="right_content">
              <h2 className="ft_Weight_600">
                {props.heading ? props.heading : 'Description'}
              </h2>
            </article>
          </div>
          <div className="col-xl-8 col-lg-7">
            <div className="left-content">
              <p className="lc_info lc_inner_content">
                {props.description.length > 1000 ? (
                  <Oux>
                    {`${props.description.substring(0, 1000)}...`}
                    <a
                      href="javascript:void(0)"
                      onClick={() => {
                        props.storeFullDescription(
                          props.description,
                          props.descriptionTitle,
                        );
                        window.$('#description_modal').modal();
                      }}
                      className="text-primary ph_underline"
                    >
                      Read More
                    </a>
                  </Oux>
                ) : (
                  props.description
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const MorePhotosBlock = props => {
  let totalImages = 0;
  if (props.attachments) {
    totalImages = props.attachments.length;
  }
  if (props.imagePreview) {
    if (totalImages <= 0) {
      totalImages = props.imagePreview.length;
    } else {
      totalImages = totalImages + props.imagePreview.length;
    }
  }
  return (
    <div className="row">
      <div className="col-xl-4 col-lg-5">
        <article className="right_content">
          <h2 className="ft_Weight_600">{props.heading}</h2>
          {/* {
                        props.showAd
                            ? <div className="portfolio_media">
                                <a href="javascript:void()" className="circle_img1">
                                    <img src="/images/thumbnails/ad.png" alt="Tripp Mckay" />
                                </a>
                                <div className="ad_des">
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                </div>
                            </div>
                            : null
                    } */}
        </article>
      </div>
      <div className="col-xl-8 col-lg-7">
        <div
          className="owl-carousel owl-theme left-content ph_carousel"
          style={{ display: 'block' }}
          id="gallary_photos"
        >
          <OwlCarousel
            items={props.attachments.length}
            className="owl-theme"
            // loop={props.attachments.length > 4 ? true : false}
            nav
            lazyLoad={true}
            dots={false}
            navText={[
              '<img src="/images/icons/icn_gray_caret_left.svg">',
              '<img src="/images/icons/icn_gray_caret_right.svg">',
            ]}
            margin={15}
            animateOut="fadeOut"
            responsive={{
              0: {
                items: 1,
              },
              600: {
                items: 2,
              },
              1000: {
                items: 3,
              },
              1366: {
                items: 4,
              },
            }}
          >
            {props.attachments && props.attachments.length > 0
              ? props.attachments.map((attachment, index) => {
                if (
                  attachment.photo_urls &&
                  Object.keys(attachment.photo_urls).length > 0
                ) {
                  console.log(attachment.photo_urls.original, 'img');
                  return (
                    <div className="item">
                      <a
                        href={attachment.photo_urls.original}
                        className="prf_images"
                        data-lightbox="gallery"
                      >
                        <img
                          src={attachment.photo_urls.medium}
                          className="prf_inner_image"
                          alt="Portfolios"
                        />
                      </a>
                    </div>
                  );
                } else {
                  return;
                }
              })
              : null}
            {props.imagePreview && props.imagePreview.length > 0
              ? props.imagePreview.map((image, index) => {
                return (
                  <div className="item">
                    <a
                      href={image}
                      className="prf_images"
                      data-lightbox="gallery"
                    >
                      <img
                        src={image}
                        className="prf_inner_image"
                        alt="Portfolios"
                      />
                    </a>
                  </div>
                );
              })
              : null}
          </OwlCarousel>
        </div>
      </div>
    </div>
  );
};

export const ProfilePortfolioSection = props => {
  return (
    <div className="row">
      {props.length > 0 ? (
        <div className="col-xl-4 col-lg-5">
          <article className="right_content">
            <h2 className="ft_Weight_600">{props.heading}</h2>
          </article>
        </div>
      ) : null}
      <div className="col-xl-8 col-lg-7">
        <div
          className="owl-carousel owl-theme left-content ph_carousel"
          style={{ display: 'block' }}
          id="gallary_photos"
        >
          <OwlCarousel
            items={props.length}
            className="owl-theme"
            loop={props.length > 4 ? true : false}
            nav
            lazyLoad={true}
            dots={false}
            navText={[
              '<img src="/images/icons/icn_gray_caret_left.svg">',
              '<img src="/images/icons/icn_gray_caret_right.svg">',
            ]}
            margin={15}
            animateOut="fadeOut"
            responsive={{
              0: {
                items: 1,
              },
              600: {
                items: 2,
              },
              1000: {
                items: 3,
              },
              1366: {
                items: 4,
              },
            }}
          >
            {props.portfolio && props.portfolio.length > 0
              ? props.portfolio.map((portfolio, index) => {
                let video = null;
                if (portfolio.video_url) {
                  video = (
                    <div className="item" style={{ height: '100%' }}>
                      <a className="prf_images">
                        <URLVideoPlayer
                          className="prf_inner_image"
                          controlBar={false}
                          videoURL={portfolio.video_url}
                        />
                      </a>
                    </div>
                  );
                }
                if (
                  portfolio.attachments &&
                  portfolio.attachments.length > 0
                ) {
                  return (
                    <Oux>
                      {video}
                      {portfolio.attachments.map((attachment, index) => {
                        if (
                          attachment.photo_urls &&
                          Object.keys(attachment.photo_urls).length > 0
                        ) {
                          return (
                            <div className="item">
                              <a
                                href={attachment.photo_urls.original}
                                className="prf_images"
                                data-lightbox="gallery"
                              >
                                <img
                                  src={attachment.photo_urls.medium}
                                  className="prf_inner_image"
                                  alt="Portfolios"
                                />
                              </a>
                            </div>
                          );
                        } else {
                          return;
                        }
                      })}
                    </Oux>
                  );
                } else {
                  return video;
                }
              })
              : null}
          </OwlCarousel>
        </div>
      </div>
    </div>
  );
};
