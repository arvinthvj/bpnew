import React from 'react'
import MyDropZone from '../../DragAndDropFiles/DragAndDropImages';
import { routes, formInputTextErrorStyle, formInputErrorStyle } from '../../../utility/constants/constants'
import LoadingBtn from '../../UI/LoadingButton/LoadingButton';

const portfolioForm = props => {

    const ImageUIComponent = (
        <div className="add_itemes ph_flex_wrp_spw add_image">
            <a href="javascript:void(0)" id="OpenImgUpload1">
                <span className="icn_camera"><img src="/images/icons/icn_camera.svg" /> </span>
                <span className="icn_camera_text">Click to add photos or just drag and drop</span>
            </a>
        </div>
    )

    const loadBase64Images = (base64Images) => {
        return base64Images.map((base64, i) => {
            return (
                <li className="upload_images_items">
                    <figure className="ph_fig">
                        <img src={base64} alt="Thumbnail" />
                        <a href="javascript:void(0)" className="ph_sm_cricle" onClick={() => props.removeBase64Image(base64, i)}>
                            <img src="/images/icons/icn_trash_danger.svg" alt="Trash Icon" />
                        </a>
                    </figure>
                </li>
            )
        }
        )
    }

    return (
        <form className="login100-form ph_forms" id="login_form">
            {
                props.history.location.pathname.includes(routes.ADD_PORTFOLIO)
                    ? <article className="limiter_heading_wrp ml-auto mr-auto wow fadeInUp">
                        <h3>Portfolio</h3>
                    </article>
                    : null
            }
            <div className="inner_form mxW_670">
                <div className="fields">
                    <div className="form_group_modify">
                        <label className="label_modify">Add items</label>
                        <MyDropZone
                            // that={props.that}
                            updateBase64={props.updateBase64}
                            updateImageState={props.updateImageState}
                            state={props.state}
                            UIComponent={ImageUIComponent}
                        />
                        {props.base64 && props.base64.length > 0 ?
                            <div className="form_group_modify">
                                <ul className="upload_images_list mt-2" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
                                    {loadBase64Images(props.base64)}
                                </ul>
                            </div>
                            : null}
                    </div>
                </div>
                <div className="form_group_modify">
                    <label for="portfolio_url" className="label_modify">Link</label>
                    <input type="text" id="portfolio_url" style={props.invalidPortfolioUrl ? formInputErrorStyle : null} value={props.link_url} onChange={props.fieldChange} name='link_url' placeholder="www.example.com" className="input_modify input_modify_lg" />
                    <span style={formInputTextErrorStyle}>{props.invalidPortfolioUrl ? "Please enter valid url" : null}</span>
                </div>
                <div className="form_group_modify">
                    <label for="portfolio_url" className="label_modify">Video Link</label>
                    <input type="text" id="portfolio_url" style={props.invalidVideoUrl ? formInputErrorStyle : null} value={props.video_url} onChange={props.fieldChange} name='video_url' placeholder="www.example.com" className="input_modify input_modify_lg" />
                    <span style={formInputTextErrorStyle}>{props.invalidVideoUrl ? "Please enter valid url" : null}</span>
                </div>
                <div className="form-group">
                    {
                        props.isPortfolioLoading || props.isLoading
                            ? <LoadingBtn btnClassName="theme_primary btn-block theme_btn text-uppercase" btnTitle="Loading" />
                            : <button disabled={props.invalidPortfolioUrl || props.invalidVideoUrl} style={props.invalidPortfolioUrl || props.invalidVideoUrl ? { opacity: 0.6 } : null} className="theme_primary btn-block theme_btn_lg theme_btn text-uppercase" type="button"
                                onClick={
                                    props.profileDetails
                                        ? props.profileDetails.portfolio && props.profileDetails.portfolio.length > 0
                                            ? () => {
                                                props.addPortfolioImages(props.profileDetails.id, props.profileDetails.portfolio[0].id)
                                                // setTimeout(() => {
                                                //     props.togglePortfolioForm()
                                                // }, 2000)
                                            }
                                            : () => {
                                                 
                                                props.addPortfolioImages(props.profileDetails.id)
                                                // setTimeout(() => {
                                                //     props.togglePortfolioForm()
                                                // }, 2000)
                                            }

                                        : props.addPortfolioImages
                                }> {props.history.location.pathname.includes(routes.ADD_PORTFOLIO) ? "Save & Continue" : "Save"} </button>
                    }
                </div>
                <div className="text-center">
                    {
                        props.history.location.pathname.includes(routes.ADD_PORTFOLIO)
                            ? <div className="text-center">
                                <a href="javascript:void(0)" onClick={() => props.history.push(routes.ADD_SKILLS, { isSigningUp: true })} className="ph_link ph_underline">Skip</a>
                            </div>
                            : <div className="text-center">
                                <a href="javascript:void(0)" onClick={() => props.togglePortfolioForm()} className="ph_link ph_underline">Close</a>
                            </div>
                    }
                </div>
            </div>
        </form>
    )
}

export default portfolioForm