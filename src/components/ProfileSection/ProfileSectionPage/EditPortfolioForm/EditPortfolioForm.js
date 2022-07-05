import React, { useState, useEffect } from 'react'
import PortfolioForm from '../../PortfolioForm/PortfolioForm'
import LoadingBtn from '../../../UI/LoadingButton/LoadingButton'
import $ from 'jquery'
import ProgressiveImage from 'react-progressive-image';
import Oux from '../../../../hoc/Oux/Oux';
import CustomToolTip from '../../../UI/CustomToolTip/CustomToolTip'
import VideoPlayer from '../../../UI/VideoPlayer/VideoPlayer';
import UrlVideoPlayer from '../../../UI/VideoPlayer/URLVideoPlayer/URLVideoPlayer';

const EditPortfolioForm = props => {

    const [showPortfolioForm, setShowPortfolioForm] = useState(false)
    const [idToDelete, setIdToDelete] = useState(null)

    useEffect(() => {
        if (showPortfolioForm) {
            togglePortfolioForm()
        }
        if (props.profileDetails && props.profileDetails.portfolio) {
            if (props.profileDetails.portfolio.length > 0) {
                props.profileDetails.portfolio.map((portfolio, index) => {
                    if (portfolio.link_url) {
                        props.fieldChange({ target: { name: 'link_url', value: portfolio.link_url } })
                    }
                    if (portfolio.video_url) {
                        props.fieldChange({ target: { name: 'video_url', value: portfolio.video_url } })
                    }
                })
            }
        }

    }, [props.profileDetails])

    const togglePortfolioForm = () => {
        if (props.profileDetails && props.profileDetails.portfolio) {
            if (props.profileDetails.portfolio.length > 0) {
                props.profileDetails.portfolio.map((portfolio, index) => {
                    if (portfolio.link_url && !showPortfolioForm) {
                        props.fieldChange({ target: { name: 'link_url', value: portfolio.link_url } })
                    }
                    if (portfolio.video_url && !showPortfolioForm) {
                        props.fieldChange({ target: { name: 'video_url', value: portfolio.video_url } })
                    }
                })
            }
        }

        setShowPortfolioForm(!showPortfolioForm)
        if (props.base64 && props.base64.length > 0) {
            props.base64.map((base64, i) => {
                props.removeBase64Image(base64, i)
            })
        }
    }

    if (props.profileDetails && props.profileDetails.portfolio) {
        if (props.profileDetails.portfolio.length === 0) {
            if (!showPortfolioForm) {
                setShowPortfolioForm(true)
            }
        }

        else {
            props.profileDetails.portfolio.map((portfolio, index) => {
                if (portfolio.attachments && portfolio.attachments.length === 0 && !portfolio.video_url) {
                    if (!showPortfolioForm) {
                        setShowPortfolioForm(true)
                    }
                }
            })
        }
    }

    return (
        <div className="tab-pane fade show active" style={{ display: 'block' }} id="experience-portfolio" role="tabpanel" aria-labelledby="experience-portfolio-tab">
            <div className="ph_title_btn ph_flex_wrp_spw">
                <h4 className="theme_sm_title">
                    Portfolio
                    <br />
                    {props.profileDetails && props.profileDetails.portfolio && props.profileDetails.portfolio.length > 0
                        ? props.profileDetails.portfolio.map((portfolio, index) => {
                            if ((portfolio.video_url && portfolio.video_url !== "") && (portfolio.link_url && portfolio.link_url !== "")) {
                                return (
                                    <Oux>
                                        <p style={{ margin: '0', marginTop: '5px' }}>
                                            <CustomToolTip placement="top" text={portfolio.link_url}>
                                                <a className="ph_underline mr-2" href={portfolio.link_url.includes('http') || portfolio.link_url.includes('https') ? portfolio.link_url : `https://${portfolio.link_url}`} target="_blank">Portfolio Link</a>
                                            </CustomToolTip>
                                            <CustomToolTip placement="bottom" text={portfolio.video_url}>
                                                <a className="ph_underline" href={portfolio.video_url.includes('http') || portfolio.video_url.includes('https') ? portfolio.video_url : `https://${portfolio.video_url}`} target="_blank">Video Link</a>
                                            </CustomToolTip>
                                        </p>
                                    </Oux>
                                )
                            }
                            else if (portfolio.link_url && portfolio.link_url !== "") {
                                return (
                                    <p style={{ margin: '0', marginTop: '5px' }}><CustomToolTip placement="top" text={portfolio.link_url}>
                                        <a className="ph_underline" href={portfolio.link_url.includes('http') || portfolio.link_url.includes('https') ? portfolio.link_url : `https://${portfolio.link_url}`} target="_blank">Portfolio Link</a>
                                    </CustomToolTip></p>
                                )
                            }
                            else if (portfolio.video_url && portfolio.video_url !== "") {
                                return (
                                    <p style={{ margin: '0', marginTop: '5px' }}><CustomToolTip placement="top" text={portfolio.video_url}>
                                        <a className="ph_underline" href={portfolio.video_url.includes('http') || portfolio.video_url.includes('https') ? portfolio.video_url : `https://${portfolio.video_url}`} target="_blank">Portfolio Video</a>
                                    </CustomToolTip></p>
                                )
                            } else {
                                return;
                            }
                        })
                        : null
                    }
                </h4>
                <a href="javascript:void(0)" onClick={togglePortfolioForm} className="theme_btn theme_primary text-uppercase add_experience">Add Portfolio</a>
            </div>
            <div className="form_group_modify">
                <ul className="upload_images_list portfolio_preview_list">
                    {props.profileDetails && props.profileDetails.portfolio && props.profileDetails.portfolio.length > 0 && !showPortfolioForm ?
                        props.profileDetails.portfolio.map((portfolio, index) => {
                            let video = null
                            if (portfolio.video_url) {
                                video = (
                                    <li className="upload_images_items">
                                        <figure className="ph_fig">
                                            <div className="item" style={{ height: '100%' }}>
                                                <UrlVideoPlayer videoURL={portfolio.video_url} />
                                            </div>
                                        </figure>
                                    </li>
                                )
                            }
                            if (portfolio.attachments && portfolio.attachments.length > 0) {
                                return (
                                    <Oux>
                                        {video}
                                        {
                                            portfolio.attachments.map((attachment, index) => {
                                                if (attachment.photo_urls && Object.keys(attachment.photo_urls).length > 0) {
                                                    return (
                                                        <li className="upload_images_items">
                                                            <figure className="ph_fig">
                                                                <ProgressiveImage delay={3000} src={attachment.photo_urls.medium} placeholder={attachment.photo_urls.small}>
                                                                    {(src, loading) => (
                                                                        <Oux>
                                                                            <div style={{
                                                                                opacity: loading ? 0.5 : 1,
                                                                                WebkitFilter: loading ? 'blur(20px)' : null
                                                                            }} className="item">
                                                                                <a href={attachment.photo_urls.original} className="prf_images" data-lightbox="gallery">
                                                                                    <img style={props.isLoading && attachment.id === idToDelete ? { opacity: '0.5' } : null} className="prf_inner_image" src={src} alt="Thumbnail" />
                                                                                </a>
                                                                            </div>
                                                                            {
                                                                                (props.isLoading && attachment.id === idToDelete) || loading
                                                                                    ? <LoadingBtn btnClassName="ph_sm_cricle transparent_bg_loading_btn delete_portfolio_image" />
                                                                                    : <a href="javascript:void(0)"
                                                                                        onClick={() => {
                                                                                            setIdToDelete(attachment.id)
                                                                                            props.updatePortfolio(props.profileDetails.id, portfolio.id, { portfolio: { delete_attachment_ids: [attachment.id] } })
                                                                                        }}
                                                                                        className="ph_sm_cricle">
                                                                                        <img src="/images/icons/icn_trash_danger.svg" alt="Trash Icon" />
                                                                                    </a>
                                                                            }
                                                                        </Oux>
                                                                    )}
                                                                </ProgressiveImage>
                                                                {/* <div className="item">
                                                            <a href={attachment.photo_urls.original} className="prf_images" data-lightbox="gallery">
                                                                <img style={props.isLoading && attachment.id === idToDelete ? { opacity: '0.5' } : null} className="prf_inner_image" src={attachment.photo_urls.medium} alt="Thumbnail" />
                                                            </a>
                                                        </div> */}
                                                            </figure>
                                                        </li>
                                                    )
                                                } else {
                                                    return;
                                                }
                                            })
                                        }
                                    </Oux>
                                )
                            }
                            else {
                                return video;
                            }
                        })
                        : null}
                </ul>
            </div>
            {
                showPortfolioForm
                    ? <div className="card switch_card_list card_bg_300 add_experience_cont">
                        <div className="card-body">
                            <PortfolioForm
                                getPortfolioPresignedUrls={props.getPortfolioPresignedUrls}
                                addPortfolioImages={props.addPortfolioImages}
                                updateBase64={props.updateBase64}
                                updateImageState={props.updateImageState}
                                idsToDelete={props.idsToDelete}
                                imageUrl={props.imageUrl}
                                imageName={props.imageName}
                                fieldChange={props.fieldChange}
                                updatePortfolio={props.updatePortfolio}
                                removeBase64Image={props.removeBase64Image}
                                base64={props.base64}
                                AllFileTypes={props.AllFileTypes}
                                fileType={props.fileType}
                                invalidPortfolioUrl={props.invalidPortfolioUrl}
                                link_url={props.link_url}
                                isLoading={props.isLoading}
                                invalidVideoUrl={props.invalidVideoUrl}
                                video_url={props.video_url}
                                profileDetails={props.profileDetails}
                                togglePortfolioForm={togglePortfolioForm}
                                history={props.history}
                                user={props.user} />
                        </div>
                    </div>
                    : null
            }
        </div>
    )
}

export default EditPortfolioForm