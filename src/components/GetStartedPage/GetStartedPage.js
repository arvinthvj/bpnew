import React from 'react'
import Oux from '../../hoc/Oux/Oux'
import { Get_Started_Sections_ID, Get_Started_Sections_CLASS_NAME, routes } from '../../utility/constants/constants'
import './GetStartedPage.css'
import Parser from 'html-react-parser'

const getStartedPage = props => {

    const dotsBgClassNameArray = ["discover_ph", "profile_ph", "find_ph", "tools_ph", "launch_ph"]
    const classNameArray = [Get_Started_Sections_CLASS_NAME.CREATE_NEW_PROFILE, Get_Started_Sections_CLASS_NAME.FIND_AND_COLLABORATE, Get_Started_Sections_CLASS_NAME.TOOLS_FOR_SUCCESS, Get_Started_Sections_CLASS_NAME.LAUNCH_YOUR_BUSINESS]

    console.log(props.get_started, "getStarted")
    return (
        <section className="search_sec get_started_sec">
            <div className="container-fluid theme_100_per">
                {
                    props.get_started && props.get_started.length > 0
                        ? props.get_started.map((page, index) => {
                            let imgSrc = null
                            if (page.photo_urls && Object.keys(page.photo_urls).length > 0) {
                                imgSrc = page.photo_urls.original
                            }
                            if (index % 2 === 0) {
                                //even
                                return (
                                    <div className="get_started text_pre_wrap">
                                        <div className={dotsBgClassNameArray[index % 5]}>
                                            <div className={index > 0 ? `gs_sec_inner theme_120_PX ${classNameArray[(index - 1) % 5]}` : "gs_sec_inner theme_120_PX"}>
                                                <div className="row align-items-center ph_col_rev">
                                                    <div className="col-md-6 wow fadeInLeft">
                                                        <div className="image_theme_part">
                                                            <figure className="get_start_image header_ph">
                                                                <img src={imgSrc} className="gs_inner_image" />
                                                                {index === 0 ? <div class="overlay_back_img"></div> : null}
                                                            </figure>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 wow fadeInRight">
                                                        <div className="theme_content_part theme_bw">
                                                            <article className="gs_header_content">
                                                                <h5 className="h5_title">{Parser(page.title)}</h5>
                                                                <p className="rc_inner_info text-justify">
                                                                    {page.content.replace('<br />')}
                                                                </p>
                                                            </article>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            } else {
                                //odd
                                return (
                                    <div className="get_started">
                                        <div className={dotsBgClassNameArray[index % 5]}>
                                            <div className={index > 0 ? `gs_sec_inner theme_120_PX ${classNameArray[(index - 1) % 5]}` : "gs_sec_inner theme_120_PX"}>
                                                <div className="row align-items-center">
                                                    <div className="col-md-6 wow fadeInLeft">
                                                        <div className="theme_content_part">
                                                            <article className="gs_header_content">
                                                                <h5 className="h5_title">{Parser(page.title)}</h5>
                                                                <p className="rc_inner_info text-justify">
                                                                    {page.content}
                                                                </p>
                                                            </article>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 wow fadeInRight">
                                                        <div className="image_theme_part  theme_bw">
                                                            <figure className="get_start_image header_ph ">
                                                                <img src={imgSrc} className="gs_inner_image" />
                                                            </figure>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        })
                        : null
                }
                {
                    props.get_started && props.get_started.length > 0
                        ? <div className="get_started">
                            <div class="ph_flex_wrp_spw">
                                <button onClick={() => window.open(`${routes.PRICING}/?logoutfromlms=true`, '_self')} class="theme_primary theme_btn text-uppercase btn-block upgrade_subscription_btn" type="button">Click Here Now to Select Your Membership  </button>
                            </div>
                        </div>
                        : null
                }
            </div>
        </section>
    )
}

export default getStartedPage