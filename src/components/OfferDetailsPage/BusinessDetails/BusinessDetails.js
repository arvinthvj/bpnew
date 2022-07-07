import React from 'react';
import {
  Banner,
  SkillSection,
  ProfileSection,
  CompensationSection,
  DescriptionSection,
  MorePhotosBlock,
} from '../OfferDetailsPage/OfferDetailsPage';
import Oux from '../../../hoc/Oux/Oux';
import SpinnerLoader from '../../UI/SpinnerLoader/SpinnerLoader';
import {
  EMPTY_IMAGE_PATH,
  CategoriesList,
} from '../../../utility/constants/constants';
import Moment from 'react-moment';
import { NavLink } from 'react-router-dom';

const businessDetails = props => {
  let content = (
    <div className="ph_empty_message" role="alert">
      <img className="ph_empty_image" src={EMPTY_IMAGE_PATH.SEARCH} alt="No Result Found"/>
      <div className="ph_empty_text">No Result Found</div>
    </div>
  );
  let sectionClassName = null;
  if (props.isServiceLoading) {
    content = (
      <div className="ph_empty_message" role="alert"><SpinnerLoader /></div>
    );
  }

  if (props.details && (!props.isServiceLoading || props.isImagesLoading)) {
    let attachments = [];
    if (
      (props.detailsType && props.detailsType.toLowerCase() === CategoriesList.BUSINESS.toLowerCase())) {
      sectionClassName ='ph_main_sec pt_83 ph_filter_sec ph_banner_sec ph_profile_banner_sec';
      let profileImage = null;
      if (
        props.details &&
        props.details.photo_urls &&
        Object.keys(props.details.photo_urls).length > 0
      ) {
        // attachments.push({ photo_path: props.details.profile.photo_path })
        profileImage = props.details.photo_urls.original;
      }
      let routeToProjectOwner = `/${props.detailsType}/${props.details.id}/profile`;
      content = (
        <Oux>
          <Banner
            setImagePreviewToEmpty={props.setImagePreviewToEmpty}
            getPortfolioPresignedUrls={props.getPortfolioPresignedUrls}
            deletePortfolio={props.deletePortfolio}
            addPortfolioImages={props.addPortfolioImages}
            updateBase64={props.updateBase64}
            imagePreview={props.imagePreview}
            profileImage={profileImage}
            setIsImageUploading={props.setIsImageUploading}
            setBase64ToEmpty={props.setBase64ToEmpty}
            isImagesLoading={props.isImagesLoading}
            fieldChange={props.fieldChange}
            isUpdatePortfolioLoading={props.isUpdatePortfolioLoading}
            isPortfolioLoading={props.isPortfolioLoading}
            updatePortfolio={props.updatePortfolio}
            updateImageState={props.updateImageState}
            idsToDelete={props.idsToDelete}
            removeBase64Image={props.removeBase64Image}
            imageUrl={props.imageUrl}
            imageName={props.imageName}
            invalidPortfolioUrl={props.invalidPortfolioUrl}
            invalidVideoUrl={props.invalidVideoUrl}
            video_url={props.video_url}
            base64={props.base64}
            link_url={props.link_url}
            AllFileTypes={props.AllFileTypes}
            fileType={props.fileType}
            isLoading={props.isLoading}
            profileDetails={props.profileDetails}
            getShareURL={props.getShareURL}
            isProfile={false}
            title={props.details.title}
            history={props.history}
            user={props.user}
            category={CategoriesList.BUSINESS.toLowerCase()}
            attachments={attachments}
            service={
              props.isBusiness
                ? { ...props.details, type: 'business' }
                : props.details
            }
            addDeckClicked={props.addDeckClicked}
            detailsType={props.detailsType}
            setBusinessProfile={props.setBusinessProfile}
          />
          <div className="container-fluid theme_px_150">
            <div className="ph_flex_wrp_spw ph_profile_pic wow fadeInUp">
              <div className="media align-items-center">
                <div className="media-body">
                  <h1 className="my-0">
                    {props.details ? props.details.title : null}{' '}
                  </h1>
                </div>
              </div>
            </div>
            <div className="ht_theme_details">
              {props.details.bio !== ' ' ? (
                <div className="ht_detail_inner">
                  <div className="row align-items-baseline">
                    <div className="col-xl-4 col-lg-5">
                      <article className="right_content">
                        <h2 className="ft_Weight_600">Bio</h2>
                      </article>
                    </div>
                    <div className="col-xl-8 col-lg-7">
                      <div className="left-content">
                        <p className="lc_info lc_inner_content">
                          {props.details.bio}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}

              {props.details.tag_line ? (
                <div className="ht_detail_inner">
                  <div className="row align-items-baseline">
                    <div className="col-xl-4 col-lg-5">
                      <article className="right_content">
                        <h2 className="ft_Weight_600">Tagline</h2>
                      </article>
                    </div>
                    <div className="col-xl-8 col-lg-7">
                      <div className="left-content">
                        <p className="lc_info lc_inner_content">
                          {props.details.tag_line}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
              {props.details.service_offered ? (
                <div className="ht_theme_details">
                  <div className="ht_detail_inner">
                    <div className="row align-items-baseline">
                      <div className="col-xl-4 col-lg-5">
                        <article className="right_content">
                          <h2 className="ft_Weight_600">Services Offered</h2>
                        </article>
                      </div>
                      <div className="col-xl-8 col-lg-7">
                        <div className="left-content">
                          <p className="lc_info lc_inner_content">
                            {props.details.service_offered}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
              {props.details.current_project ? (
                <div className="ht_theme_details">
                  <div className="ht_detail_inner">
                    <div className="row align-items-baseline">
                      <div className="col-xl-4 col-lg-5">
                        <article className="right_content">
                          <h2 className="ft_Weight_600">
                            What’s the next step in your growth?
                          </h2>
                        </article>
                      </div>
                      <div className="col-xl-8 col-lg-7">
                        <div className="left-content">
                          <p className="lc_info lc_inner_content">
                            {props.details.current_project}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
              {props.details.expectation ? (
                <div className="ht_theme_details">
                  <div className="ht_detail_inner">
                    <div className="row align-items-baseline">
                      <div className="col-xl-4 col-lg-5">
                        <article className="right_content">
                          <h2 className="ft_Weight_600">
                            What do you most want to get from PartnerHere?
                          </h2>
                        </article>
                      </div>
                      <div className="col-xl-8 col-lg-7">
                        <div className="left-content">
                          <p className="lc_info lc_inner_content">
                            {props.details.expectation}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
              {props.details.website ? (
                <div className="ht_detail_inner">
                  <div className="row">
                    <div className="col-xl-4 col-lg-5">
                      <article className="right_content">
                        <h2 className="ft_Weight_600">Website</h2>
                      </article>
                    </div>
                    <div className="col-xl-8 col-lg-7">
                      <div className="left-content">
                        <ul className="ul_list">
                          <li className="list_items ex_list">
                            <a
                              href={
                                props.details.website.includes(
                                  'http',
                                ) ||
                                props.details.website.includes('https')
                                  ? props.details.website
                                  : `https://${props.details.website}`
                              }
                              target="_blank"
                              className="ph_underline ft_Weight_600"
                            >
                              {props.details.website}
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
              {/* {props.details.profile.email ? (
                <div className="ht_detail_inner">
                  <div className="row align-items-baseline">
                    <div className="col-xl-4 col-lg-5">
                      <article className="right_content">
                        <h2 className="ft_Weight_600">Email</h2>
                      </article>
                    </div>
                    <div className="col-xl-8 col-lg-7">
                      <div className="left-content">
                        <p className="lc_info lc_inner_content">
                          {props.details.profile.email}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null} */}
              {props.details.user &&
              props.details.user.profiles && props.details.user.profiles.length > 0 ? (
                <div className="ht_detail_inner">
                  <div className="row align-items-baseline">
                    <div className="col-xl-4 col-lg-5">
                      <article className="right_content">
                        <h2 className="ft_Weight_600">Project Owner</h2>
                      </article>
                    </div>
                    <div className="col-xl-8 col-lg-7">
                      <div className="left-content">
                        <div className="project_owner_block">
                          <NavLink
                            to={routeToProjectOwner}
                            className="avatar_circle"
                          >
                            <img
                              src={
                                props.details.user.profiles[0]
                                  .photo_urls.small
                              }
                              alt={props.details.name}
                            />
                          </NavLink>
                          <NavLink
                            to={routeToProjectOwner}
                            className="lc_info lc_inner_content text-capitalize ph_underline text-primary mt-0"
                          >
                            {props.details.profile.name}
                          </NavLink>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </Oux>
      );
    }
  }
  return <section className={sectionClassName}>{content}</section>;
};

export default businessDetails;
