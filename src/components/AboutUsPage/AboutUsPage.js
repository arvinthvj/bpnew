import React from 'react'
import Oux from '../../hoc/Oux/Oux'
import './AboutUsPage.css'
import { Get_Started_Sections_CLASS_NAME } from '../../utility/constants/constants'

const aboutUsPage = props => {
    const dotsBgClassNameArray = ["profile_ph", "find_ph", "tools_ph"]
    const classNameArray = [Get_Started_Sections_CLASS_NAME.CREATE_NEW_PROFILE, Get_Started_Sections_CLASS_NAME.FIND_AND_COLLABORATE, Get_Started_Sections_CLASS_NAME.TOOLS_FOR_SUCCESS]
    return (
        <Oux>
            {
                props.about_us && props.about_us.length > 0
                    ? <Oux>
                        <section class="ph_main_sec pt_83 ph_filter_sec about_sec ph_banner_sec pb-0 text_pre_wrap">
                            <div class="container-fluid theme_px_60">
                                <div class="row">
                                    <div class="col-sm-12">
                                        <div class="ht_banner">
                                            <div class="ph_hero_gradient">
                                                <img src={props.about_us[0].photo_urls && Object.keys(props.about_us[0].photo_urls).length > 0 ? props.about_us[0].photo_urls.original : null} class="gallery_box" alt="image" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-12">
                                        <header class="ph_header_headings text-center wow fadeInUp">
                                            <h1 class="ft_Weight_600 text-center">
                                                <span style={{ animation: 'none', border: 'none' }} class="about_text">{props.about_us[0].title}</span>
                                            </h1>
                                            <p class="ft_Weight_600 text-justify">
                                                {props.about_us[0].content}
                                            </p>
                                        </header>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section class="get_started_sec get_about_sec  pt-0 text_pre_wrap">
                            <div class="container-fluid theme_100_per">
                                {
                                    props.about_us.map((page, index) => {
                                        if (index > 0) {
                                            let imgSrc = null
                                            if (page.photo_urls && Object.keys(page.photo_urls).length > 0) {
                                                imgSrc = page.photo_urls.original
                                            }
                                            if (index % 2 === 1) {
                                                return (
                                                    <div class="get_started">
                                                        <div class={dotsBgClassNameArray[(index - 1) % 3]}>
                                                            <div class={`gs_sec_inner theme_120_PX ${classNameArray[(index - 1) % 4]}`}>
                                                                <div class="row align-items-center">
                                                                    <div class="col-md-6 wow fadeInLeft">
                                                                        <div class="theme_content_part">
                                                                            <article class="gs_header_content">
                                                                                <h5 class="h5_title">{page.title}</h5>
                                                                                <p class="rc_inner_info text-justify">
                                                                                    {page.content}
                                                                                </p>
                                                                            </article>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-md-6 wow fadeInRight">
                                                                        <div class="image_theme_part  theme_bw">
                                                                            <figure class="get_start_image header_ph ">
                                                                                <img src={imgSrc} class="gs_inner_image" />
                                                                            </figure>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            } else {
                                                return (
                                                    <div class="get_started">
                                                        <div class={dotsBgClassNameArray[(index - 1) % 3]}>
                                                            <div class={`gs_sec_inner theme_120_PX ${classNameArray[(index - 1) % 4]}`}>
                                                                <div class="row align-items-center ph_col_rev">
                                                                    <div class="col-md-6 wow fadeInLeft">
                                                                        <div class="image_theme_part">
                                                                            <figure class="get_start_image header_ph">
                                                                                <img src={imgSrc} class="gs_inner_image" />
                                                                            </figure>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-md-6 wow fadeInRight">
                                                                        <div class="theme_content_part theme_bw">
                                                                            <article class="gs_header_content">
                                                                                <h5 class="h5_title">{page.title}</h5>
                                                                                <p class="rc_inner_info text-justify">
                                                                                    {page.content}
                                                                                </p>
                                                                            </article>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        } else {
                                            return
                                        }
                                    })
                                }
                            </div>
                        </section>
                    </Oux>
                    : null
            }
        </Oux>
    )
}

export default aboutUsPage