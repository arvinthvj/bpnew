import React from 'react'
import { Banner, ProfileSection, MorePhotosBlock, SkillSection, CompensationSection, DescriptionSection } from '../OfferDetailsPage/OfferDetailsPage'
import Oux from '../../../hoc/Oux/Oux'
import SpinnerLoader from '../../UI/SpinnerLoader/SpinnerLoader'
import { EMPTY_IMAGE_PATH } from '../../../utility/constants/constants'

const thingDetails = props => {
    let content = (
        <div className="ph_empty_message" role="alert">
            <img className="ph_empty_image" src={EMPTY_IMAGE_PATH.SEARCH} alt="No Result Found" />
            <div className="ph_empty_text">No Result Found</div>
        </div>
    )
    if (props.isServiceLoading) {
        content = (
            <div className="ph_empty_message" role="alert">
                <SpinnerLoader />
            </div>
        )
    }
    if (props.details && !props.isServiceLoading) {
        let attachments = null
        if (props.details.attachments && props.details.attachments.length > 0) {
            attachments = props.details.attachments
        }
        console.log(props.details)
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
                    addOrUpdateOrDeleteServiceLoading={props.addOrUpdateOrDeleteServiceLoading}
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
                />
                <div className="container-fluid theme_px_150">
                    <ProfileSection setImagePreviewToEmpty={props.setImagePreviewToEmpty} user={props.user} detailsId={props.details.id} history={props.history} details={props.details} profile={props.details.profile} updateConversationReceiver={props.updateConversationReceiver} />
                    <header className="part_header_h wow fadeInUp mt-2 ph_header_flot ph_flex_wrp_spw part_header_h1">
                        <h1 className="ft_Weight_600 d-inline-block mb-0"><span className="first_letter_capital">{props.details.title}</span></h1>
                        {/* <a href="8_Messages.html" className="theme_btn theme_primary theme_btn_100 theme_btn_299 text-uppercase">Message</a> */}
                    </header>
                    <SkillSection skills={props.details.skills} />
                    <div className="ht_theme_details">
                        {
                            props.details.description
                                ? <DescriptionSection title={props.details.title} storeFullDescription={props.storeFullDescription} description={props.details.description} />
                                : null
                        }
                        {
                            props.details.cool_feature
                                ? <div className="ht_detail_inner">
                                    <div className="row align-items-baseline">
                                        <div className="col-xl-4 col-lg-5">
                                            <article className="right_content">
                                                <h2 className="ft_Weight_600">Why it’s Cool</h2>
                                            </article>
                                        </div>
                                        <div className="col-xl-8 col-lg-7">
                                            <div className="left-content">
                                                <p className="lc_info lc_inner_content">
                                                    <span className="first_letter_capital">{props.details.cool_feature}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                : null
                        }
                        {
                            props.details.specification
                                ? <div className="ht_detail_inner">
                                    <div className="row">
                                        <div className="col-xl-4 col-lg-5">
                                            <article className="right_content">
                                                <h2 className="ft_Weight_600">Specification</h2>
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
                                : null
                        }
                        {
                            props.details.compensations && props.details.compensations.length > 0
                                ? <CompensationSection compensations={props.details.compensations} />
                                : null
                        }
                        {
                            props.details.virtual
                                ? null
                                : <div className="ht_detail_inner">
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
                                                        <p className="lc_info ex_date_info">{props.details.address.city},{props.details.address.state_code} {props.details.address.zip}</p>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        }
                    </div>
                </div>
                {
                    props.details.attachments && props.details.attachments.length > 0
                        ? <div className="container-fluid captured_photos_right">
                            <div className="ht_theme_details">
                                <div className="ht_detail_inner captured_photos">
                                    <MorePhotosBlock imagePreview={props.imagePreview} heading="Photos" attachments={props.details.attachments} />
                                </div>
                            </div>
                        </div>
                        : null
                }
            </Oux>
        )
    }
    return (
        <section className="ph_main_sec pt_83 ph_filter_sec">
            {content}
        </section>
    )
}

export default thingDetails