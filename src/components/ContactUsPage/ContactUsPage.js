import React from 'react'
import { EMPTY_IMAGE_PATH } from '../../utility/constants/constants'
import Parser from 'html-react-parser'
import './ContactUsPage.css'

const contactUsPage = props => {
    return (
        <section class="ph_main_sec pt_83 ph_filter_sec about_sec ph_banner_sec pb-0">
            <div class="container-fluid theme_px_60">
                {
                    props.contact_us && props.contact_us.length > 0
                        ? props.contact_us.map((page, index) => {
                            let imgSrc = null
                            if (page.photo_urls && Object.keys(page.photo_urls).length > 0) {
                                imgSrc = page.photo_urls.original
                            }
                            return (
                                <div className="contact_us_section">
                                    <img className="contact_us_img" src={imgSrc} alt="No Result Found" />
                                    <div className="contact_us_title">{page.title}</div>
                                    <p className="contact_us_text">{Parser(page.content)}</p>
                                </div>
                            )
                        })
                        : null
                }
            </div>
        </section>
    )
}

export default contactUsPage