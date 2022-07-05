import React from 'react'
import { Banner, SkillSection } from '../OfferDetailsPage/OfferDetailsPage'
import Oux from '../../../hoc/Oux/Oux'
import SpinnerLoader from '../../UI/SpinnerLoader/SpinnerLoader'
import { CategoriesList, EMPTY_IMAGE_PATH } from '../../../utility/constants/constants'

const featuredDetails = props => {
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
        let attachments = []
        if (props.details && props.details.photo_urls && Object.keys(props.details.photo_urls).length > 0) {
            attachments.push({ photo_urls: props.details.photo_urls })
        }
        console.log(props.details, "details")
        content = (
            <Oux>
                <div className="container-fluid theme_px_60">
                    <Banner
                        setImagePreviewToEmpty={props.setImagePreviewToEmpty}
                        getShareURL={props.getShareURL} isProfile={true} title={props.details.title} history={props.history} category={CategoriesList.FEATURED} attachments={attachments}
                        service={props.details}
                        addDeckClicked={props.addDeckClicked}
                    />
                </div>
                <div className="container-fluid theme_px_150">
                    <div className="ph_flex_wrp_spw ph_profile_pic">
                        <div className="media align-items-center">
                            <div className="media-body">
                                <h1 className="my-0"><a href="javascript:void(0)" className="text_secondary">{props.details.name}</a> </h1>
                            </div>
                        </div>
                        <a href="javascript:void(0)" className="theme_btn theme_primary theme_btn_299 text-uppercase" onClick={() => props.updateConversationReceiver(props.details.profile)}>Message</a>
                    </div>
                    <SkillSection skills={props.details.skills} />
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
                                        <span className="lc_info ft_Weight_500">
                                            {props.details.tag_line}
                                        </span>
                                        <p className="lc_info lc_inner_content">
                                            {props.details.bio}
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
                                        <p className="lc_info lc_inner_content">{props.details.email}</p>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                        <div className="ht_detail_inner">
                            <div className="row align-items-baseline">
                                <div className="col-xl-4 col-lg-5">
                                    <article className="right_content">
                                        <h2 className="ft_Weight_600">Education</h2>
                                    </article>
                                </div>
                                <div className="col-xl-8 col-lg-7">
                                    <div className="left-content">
                                        <p className="lc_info lc_inner_content">{props.details.education}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                                            {
                                                props.details.experience && props.details.experience.length > 0
                                                    ? props.details.experience.map((experience, index) => {
                                                        return (
                                                            <li className="list_items ex_list">
                                                                <span className="ex_title mb-2">{experience.company}</span>
                                                                <p className="lc_info ex_date_info">{experience.position}</p>
                                                                <p className="lc_info ex_date_info">{`${experience.from_date}-${experience.to_date}`}</p>
                                                            </li>
                                                        )
                                                    })
                                                    : null
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                        {
                            props.details.website
                                ? <div className="ht_detail_inner">
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
                                                        <a href={props.details.website.includes('http') || props.details.website.includes('https') ? props.details.website : `https://${props.details.website}`} target="_blank" className="ph_underline ft_Weight_600">{props.details.website}</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                : null
                        }
                    </div>
                </div>
            </Oux>
        )
    }
    return (
        <section className="ph_main_sec pt_83 ph_filter_sec ph_banner_sec ph_profile_banner_sec">
            {content}
        </section>
    )
}

export default featuredDetails