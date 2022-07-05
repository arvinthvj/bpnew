import React from 'react';
import {
  Banner,
  SkillSection,
  ProfileSection,
  ProfilePortfolioSection,
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

const peopleDetails = props => {
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
  let sectionClassName = null;
  if (props.isServiceLoading) {
    content = (
      <div className="ph_empty_message" role="alert">
        <SpinnerLoader />
      </div>
    );
  }
  if (props.details && (!props.isServiceLoading || props.isImagesLoading)) {
    let attachments = [];
    console.log(props.details, 'detailsFromProfileDetails.js');
    if (
      props.detailsType &&
      props.detailsType.toLowerCase() === CategoriesList.PROFILE.toLowerCase()
    ) {
      sectionClassName =
        'ph_main_sec pt_83 ph_filter_sec ph_banner_sec ph_profile_banner_sec';
      let profileImage = null;
      if (
        props.details.profile &&
        props.details.profile.photo_urls &&
        Object.keys(props.details.profile.photo_urls).length > 0
      ) {
        // attachments.push({ photo_urls: props.details.profile.photo_urls })
        profileImage = props.details.profile.photo_urls.medium;
      }
      if (
        props.details.profile &&
        props.details.profile.portfolio &&
        props.details.profile.portfolio.length > 0
      ) {
        props.details.profile.portfolio.map(portfolio => {
          if (portfolio.attachments && portfolio.attachments.length > 0) {
            portfolio.attachments.map(attachment => {
              if (
                attachment.photo_urls &&
                Object.keys(attachment.photo_urls).length > 0
              ) {
                attachments.push({ photo_urls: attachment.photo_urls });
              }
            });
          }
        });
      }
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
            isProfile={true}
            title={props.details.title}
            history={props.history}
            user={props.user}
            category={props.isBusiness ? CategoriesList.BUSINESS.toLowerCase() : CategoriesList.PROFILE.toLowerCase()}
            attachments={attachments}
            service={
              props.isBusiness
                ? { ...props.details, type: 'business' }
                : props.details
            }
            detailsType={props.detailsType}
            addDeckClicked={props.addDeckClicked}
            setBusinessProfile={props.setBusinessProfile}
          />
          <div className="container-fluid theme_px_150">
            <div className="ph_flex_wrp_spw ph_profile_pic wow fadeInUp">
              <div className="media align-items-center">
                <div className="media-body">
                  <h1 className="my-0 text-capitalize">
                    {props.details.profile.name}{' '}
                  </h1>
                </div>
              </div>
              {props.details.profile.user_id ===
              props.user.id.toString() ? null : (
                <a
                  href="javascript:void(0)"
                  id="msg_btn_for_walk"
                  className="theme_btn theme_primary theme_btn_299 text-uppercase"
                  onClick={() =>
                    props.updateConversationReceiver(props.details.profile)
                  }
                >
                  Message
                </a>
              )}
            </div>
            <SkillSection skills={props.details.profile.skills} />
            <div className="ht_theme_details">
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
                        {props.details.profile.bio}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="ht_detail_inner">
                                <div className="row align-items-baseline">
                                    <div className="col-xl-4 col-lg-5">
                                        <article className="right_content">
                                            <h2 className="ft_Weight_600">Email</h2>
                                        </article>
                                    </div>
                                    <div className="col-xl-8 col-lg-7">
                                        <div className="left-content">
                                            <p className="lc_info lc_inner_content">{props.details.profile.email}</p>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
              {props.details.profile.tag_line ? (
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
                          {props.details.profile.tag_line}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
              {props.details.profile.education ? (
                <div className="ht_detail_inner">
                  <div className="row align-items-baseline">
                    <div className="col-xl-4 col-lg-5">
                      <article className="right_content">
                        <h2 className="ft_Weight_600">Education</h2>
                      </article>
                    </div>
                    <div className="col-xl-8 col-lg-7">
                      <div className="left-content">
                        <p className="lc_info lc_inner_content">
                          {props.details.profile.education}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
              {props.details.profile.experiences &&
              props.details.profile.experiences.length > 0 ? (
                <div className="ht_detail_inner">
                  <div className="row">
                    <div className="col-xl-4 col-lg-5">
                      <article className="right_content">
                        <h2 className="ft_Weight_600">Experience</h2>
                      </article>
                    </div>
                    <div className="col-xl-8 col-lg-7">
                      <div className="left-content">
                        <ul className="ul_list">
                          {props.details.profile.experiences.map(
                            (experience, index) => {
                              return (
                                <li className="list_items ex_list">
                                  <span className="ex_title mb-2">
                                    Company: {experience.company}
                                  </span>
                                  <p className="lc_info ex_date_info">
                                    Position: {experience.position}
                                  </p>
                                  <p className="lc_info ex_date_info">
                                    <Moment format="MMM DD, YYYY">
                                      {experience.from_date}
                                    </Moment>
                                    -
                                    <Moment format="MMM DD, YYYY">
                                      {experience.current
                                        ? new Date()
                                        : experience.to_date}
                                    </Moment>
                                  </p>
                                </li>
                              );
                            },
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
              {props.details.profile.address ? (
                <div className="ht_detail_inner">
                  <div className="row">
                    <div className="col-xl-4 col-lg-5">
                      <article className="right_content">
                        <h2 className="ft_Weight_600">Location</h2>
                      </article>
                    </div>
                    <div className="col-xl-8 col-lg-7">
                      <div className="left-content">
                        <ul className="ul_list">
                          <li className="list_items ex_list">
                            <p className="lc_info ex_date_info">
                              {props.details.profile.address.city},
                              {props.details.profile.address.state_code}{' '}
                              {props.details.profile.address.zip}
                            </p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
              {props.details.profile.website ? (
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
                                props.details.profile.website.includes(
                                  'http',
                                ) ||
                                props.details.profile.website.includes('https')
                                  ? props.details.profile.website
                                  : `https://${props.details.profile.website}`
                              }
                              target="_blank"
                              className="ph_underline ft_Weight_600"
                            >
                              {props.details.profile.website}
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          {props.details.profile.portfolio &&
          props.details.profile.portfolio.length > 0
            ? props.details.profile.portfolio.map((portfolio, index) => {
                let length = 0;
                if (
                  portfolio.attachments &&
                  portfolio.attachments.length > 0 &&
                  portfolio.video_url
                ) {
                  length = portfolio.attachments.length + 1;
                } else if (portfolio.video_url) {
                  length = 1;
                } else if (
                  portfolio.attachments &&
                  portfolio.attachments.length > 0
                ) {
                  length = portfolio.attachments.length;
                }
                return (
                  <div className="container-fluid captured_photos_right">
                    <div className="ht_theme_details">
                      <div className="ht_detail_inner captured_photos">
                        <ProfilePortfolioSection
                          imagePreview={props.imagePreview}
                          heading="Portfolio"
                          showAd={false}
                          length={length}
                          portfolio={props.details.profile.portfolio}
                        />
                      </div>
                    </div>
                  </div>
                );
              })
            : null}
        </Oux>
      );
    } else {
      if (props.details.attachments && props.details.attachments.length > 0) {
        attachments = props.details.attachments;
      }
      sectionClassName = 'ph_main_sec pt_83 ph_filter_sec';
      content = (
        <Oux>
          <Banner
            setImagePreviewToEmpty={props.setImagePreviewToEmpty}
            addOrUpdateService={props.addOrUpdateService}
            updateBase64={props.updateBase64}
            imagePreview={props.imagePreview}
            setIsImageUploading={props.setIsImageUploading}
            setBase64ToEmpty={props.setBase64ToEmpty}
            isImagesLoading={props.isImagesLoading}
            isUpdatePortfolioLoading={props.isUpdatePortfolioLoading}
            addOrUpdateOrDeleteServiceLoading={
              props.addOrUpdateOrDeleteServiceLoading
            }
            isPortfolioLoading={props.isPortfolioLoading}
            updateImageState={props.updateImageState}
            idsToDelete={props.idsToDelete}
            removeBase64Image={props.removeBase64Image}
            imageUrl={props.imageUrl}
            imageName={props.imageName}
            base64={props.base64}
            AllFileTypes={props.AllFileTypes}
            fileType={props.fileType}
            isLoading={props.isLoading}
            profileDetails={props.profileDetails}
            getShareURL={props.getShareURL}
            title={props.details.title}
            history={props.history}
            attachments={attachments}
            service={props.details}
            user={props.user}
            addDeckClicked={props.addDeckClicked}
            category={props.details.category.name}
            isProfile={false}
          />
          <div className="container-fluid theme_px_150">
            <ProfileSection
              setImagePreviewToEmpty={props.setImagePreviewToEmpty}
              history={props.history}
              user={props.user}
              detailsId={props.details.id}
              profile={props.details.profile}
              updateConversationReceiver={props.updateConversationReceiver}
            />
            <SkillSection skills={props.details.skills} />
            <header className="part_header_h wow fadeInUp mt-2 ph_header_flot ph_flex_wrp_spw part_header_h1">
              <h1 className="ft_Weight_600 d-inline-block mb-0">
                <span className="first_letter_capital">
                  {props.details.title}
                </span>
              </h1>
              {/* <a href="8_Messages.html" className="theme_btn theme_primary theme_btn_100 theme_btn_299 text-uppercase">Message</a> */}
            </header>
            <div className="ht_theme_details">
              {props.details.description ? (
                <DescriptionSection
                  title={props.details.title}
                  storeFullDescription={props.storeFullDescription}
                  description={props.details.description}
                />
              ) : null}
              {/* <div className="ht_detail_inner">
                                <div className="row align-items-baseline">
                                    <div className="col-xl-4 col-lg-5">
                                        <article className="right_content">
                                            <h2 className="ft_Weight_600">Email</h2>
                                        </article>
                                    </div>
                                    <div className="col-xl-8 col-lg-7">
                                        <div className="left-content">
                                            <p className="lc_info lc_inner_content">{props.details.profile.email}</p>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
              {props.details.cool_feature ? (
                <div className="ht_detail_inner">
                  <div className="row align-items-baseline">
                    <div className="col-xl-4 col-lg-5">
                      <article className="right_content">
                        <h2 className="ft_Weight_600">Why I'm Cool</h2>
                      </article>
                    </div>
                    <div className="col-xl-8 col-lg-7">
                      <div className="left-content">
                        <p className="lc_info lc_inner_content">
                          {props.details.cool_feature}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
              {props.details.specification ? (
                <div className="ht_detail_inner">
                  <div className="row align-items-baseline">
                    <div className="col-xl-4 col-lg-5">
                      <article className="right_content">
                        <h2 className="ft_Weight_600">Education</h2>
                      </article>
                    </div>
                    <div className="col-xl-8 col-lg-7">
                      <div className="left-content">
                        <p className="lc_info lc_inner_content">
                          {props.details.specification}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
              {props.details.compensations &&
              props.details.compensations.length > 0 ? (
                <CompensationSection
                  compensations={props.details.compensations}
                />
              ) : null}
              {props.details.virtual ? null : props.details.address ? (
                <div className="ht_detail_inner">
                  <div className="row">
                    <div className="col-xl-4 col-lg-5">
                      <article className="right_content">
                        <h2 className="ft_Weight_600">Location</h2>
                      </article>
                    </div>
                    <div className="col-xl-8 col-lg-7">
                      <div className="left-content">
                        <ul className="ul_list">
                          <li className="list_items ex_list">
                            <p className="lc_info ex_date_info">
                              {props.details.address.city},
                              {props.details.address.state_code}{' '}
                              {props.details.address.zip}
                            </p>
                          </li>
                        </ul>
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
                                props.details.website.includes('http') ||
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
            </div>
          </div>
          {props.details.attachments && props.details.attachments.length > 0 ? (
            <div className="container-fluid captured_photos_right">
              <div className="ht_theme_details">
                <div className="ht_detail_inner captured_photos">
                  <MorePhotosBlock
                    imagePreview={props.imagePreview}
                    heading="Photos"
                    attachments={props.details.attachments}
                  />
                </div>
              </div>
            </div>
          ) : null}
        </Oux>
      );
    }
  }
  return <section className={sectionClassName}>{content}</section>;
};

export default peopleDetails;
