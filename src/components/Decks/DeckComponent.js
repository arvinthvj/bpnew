import React from 'react';
import { showConfirmAlert } from '../../utility/successAlert/confirmAlert';
import DeleteAlert from '../../utility/successAlert/deleteAlert';
import { address, CategoriesList, routes, SubscriptionType } from '../../utility/constants/constants';
import Oux from '../../hoc/Oux/Oux';
import { Base64 } from 'js-base64';
import { WEB_URL } from '../../config';

const DeckComponent = (props) => {

    const loadDeckServices = () => {
        return props.deck.services && props.deck.services.map(service => {
            console.log(service)
            let type = service.type
            if (type.toLowerCase() === CategoriesList.WANT_AD.key.toLowerCase()) {
                type = CategoriesList.WANT_AD.title
            } else {
                type = "Offer"
            }
            if (type === CategoriesList.WANT_AD.title) {
                return (
                    <div class="card main_re_card">
                        <a href="javascript:void(0)" style={{ right: '50px' }} className="top_icn_share_save ph_sm_cricle" data-toggle="modal" data-target="#icn_share">
                            <img src="/images/icons/icn_export.svg" alt="Export Icon" />
                        </a>
                        <a href="javascript:void(0)" onClick={() => props.deleteParticularOfferFromDeckList(props.deck.id, service.id)} className="top_icn_share_save ph_sm_cricle">
                            <img src="/images/icons/icn_trash_danger.svg" alt="Export Icon" />
                        </a>
                        <div class="card-body filter_bodyO">
                            <a style={{ pointerEvents: 'none', fontSize: '12px' }} class="theme_btn want_ad_btn">{type}: {service.category.reduce((acc, curr, index) => {
                                                    acc += acc.length ? ", " + curr.name : curr.name
                                                    if(index == service.category.length-1){
                                                        if(acc.split(",").length > 1){
                                                            acc = acc.split(",").slice(0,1).join(",") + "....."
                                                        }
                                                    } 
                                                    return acc;
                                                }, "")}</a>
                            <span class="classified_para">
                                <h5 class="card-title">
                                    <a href="javascript:void(0)" className="text-primary" onClick={() => props.onClickCards(service)}>
                                        {service.title}
                                    </a>
                                </h5>
                                <p className="card-text">
                                    <a href="javascript:void(0)" onClick={() => props.onClickCards(service)} className="text-primary">
                                        {service.description.length > 230 ? `${service.description.substring(0, 230)}...` : service.description}
                                        {/* if(str.length > 10) str = str.substring(0,10); */}
                                    </a>
                                </p>
                            </span>
                        </div>
                        <div class="card-footer ph_footer">
                            <span class="ph_flex_wrp_spw mb-1">
                                <p class="card-text mb-0">
                                    {service.compensations && service.compensations.length > 0
                                        ? service.compensations.map((compensation, index) => {
                                            return compensation.name
                                        })
                                        : null
                                    }
                                </p>
                            </span>
                            <span class="ph_flex_wrp_spw ">
                                <p className="card-text card-sm-text mb-0">{(service.address.city ? service.address.city : '') + ' ' + (service.address.zip ? service.address.zip : '')}</p>
                            </span>
                        </div>
                    </div>
                )
            } else {
                return (
                    <Oux>
                        <div class="card main_re_card">
                            <figure className="part_fig export_icn_wrp">
                                <a style={{ pointerEvents: 'none', fontSize: '12px' }} class="theme_btn want_ad_btn">{type}: {service.category.reduce((acc, curr, index) => {
                                                    acc += acc.length ? ", " + curr.name : curr.name
                                                    if(index == service.category.length-1){
                                                        if(acc.split(",").length > 1){
                                                            acc = acc.split(",").slice(0,1).join(",") + "....."
                                                        }
                                                    } 
                                                    return acc;
                                                }, "")}</a>
                                <a onClick={() => props.onClickCards(service)} href="javascript:void(0)">
                                    <img className="card-img-top" src={service.attachments.length > 0 ? service.attachments[service.attachments.length-1].photo_urls.small : '/images/thumbnails/image_grey.png'} alt="Jessica Cebral" />
                                </a>
                                <a href="javascript:void(0)" style={{ right: '50px' }}
                                    onClick={() =>
                                        props.getShareURL(
                                            `${WEB_URL()}/${service.type}/${service.id
                                            }/details`,
                                            service,
                                        )
                                    } className="top_icn_share_save ph_sm_cricle" data-toggle="modal" data-target="#icn_share">
                                    <img src="/images/icons/icn_export.svg" alt="Export Icon" />
                                </a>
                                <a href="javascript:void(0)" onClick={() => props.deleteParticularOfferFromDeckList(props.deck.id, service.id)} className="top_icn_share_save ph_sm_cricle">
                                    <img src="/images/icons/icn_trash_danger.svg" alt="Export Icon" />
                                </a>
                            </figure>
                            <div class="card-body filter_bodyO">
                                <h5 class="card-title">
                                    <a href="javascript:void(0)" className="text-primary" onClick={() => props.onClickCards(service)}>
                                        {service.title}
                                    </a>
                                </h5>
                                <p className="card-text">{service.profile_name}</p>
                            </div>
                            <div class="card-footer ph_footer">
                                <span class="ph_flex_wrp_spw mb-1">
                                    <p class="card-text mb-0">
                                        {service.compensations && service.compensations.length > 0
                                            ? service.compensations.map((compensation, index) => {
                                                return compensation.name
                                            })
                                            : null
                                        }
                                    </p>
                                </span>
                                <span class="ph_flex_wrp_spw ">
                                    <p className="card-text card-sm-text mb-0">{(service.address.city ? service.address.city : '') + ' ' + (service.address.zip ? service.address.zip : '')}</p>
                                </span>
                            </div>
                        </div>

                    </Oux>
                )
            }
        })
    }
    const loadDeckProfiles = () => {
        return props.deck.profiles && props.deck.profiles.map(profile => {
            console.log(profile)
            profile = {
                ...profile,
                type: CategoriesList.BUSINESS
            }
            return (
                <Oux>
                    <div class="card main_re_card">
                        <figure className="part_fig export_icn_wrp">
                            <a style={{ pointerEvents: 'none', fontSize: '12px' }} class="theme_btn want_ad_btn">Project Profile</a>
                            <a onClick={() => props.onClickCards(profile)} href="javascript:void(0)">
                                <img className="card-img-top" src={profile.photo_urls.small ? profile.photo_urls.small : '/images/thumbnails/image_grey.png'} alt="Jessica Cebral" />
                            </a>
                            <a href="javascript:void(0)" style={{ right: '50px' }} className="top_icn_share_save ph_sm_cricle"
                                onClick={() =>
                                    props.getShareURL(
                                        `${WEB_URL()}/${profile.type}/${profile.id
                                        }/details`,
                                        profile,
                                    )
                                } data-toggle="modal" data-target="#icn_share">
                                <img src="/images/icons/icn_export.svg" alt="Export Icon" />
                            </a>
                            <a href="javascript:void(0)" onClick={() => props.deleteParticularOfferFromDeckList(props.deck.id, profile.id)} className="top_icn_share_save ph_sm_cricle">
                                <img src="/images/icons/icn_trash_danger.svg" alt="Export Icon" />
                            </a>
                        </figure>
                        <div class="card-body filter_bodyO">
                            <h5 class="card-title">
                                <a href="javascript:void(0)" className="text-primary" onClick={() => props.onClickCards(profile)}>
                                    {profile.title}
                                </a>
                            </h5>
                            <p className="card-text">{profile.name}</p>
                        </div>
                        <div class="card-footer ph_footer">
                            {/* <span class="ph_flex_wrp_spw mb-1">
                            <p class="card-text mb-0">
                                {service.compensations && service.compensations.length > 0
                                    ? service.compensations.map((compensation, index) => {
                                        return compensation.name
                                    })
                                    : null
                                }
                            </p>
                        </span>
                        <span class="ph_flex_wrp_spw ">
                            <p className="card-text card-sm-text mb-0">{(service.address.city ? service.address.city : '') + ' ' + (service.address.zip ? service.address.zip : '')}</p>
                        </span> */}
                        </div>
                    </div>

                </Oux>
            )
        })
    }
    let highestSubscriptionType = null
    if (props.user && props.user.subscriptions && props.user.subscriptions.length > 0) {
        props.user.subscriptions.map((subscription, index) => {
            if (subscription.subcription_type.toLowerCase() === SubscriptionType.PLATINUM.toLowerCase()) {
                highestSubscriptionType = SubscriptionType.PLATINUM
            }
        })
        if (!highestSubscriptionType) {
            props.user.subscriptions.map((subscription, index) => {
                if (subscription.subcription_type.toLowerCase() === SubscriptionType.GOLD.toLowerCase()) {
                    highestSubscriptionType = SubscriptionType.GOLD
                }
            })
        }
        if (!highestSubscriptionType) {
            props.user.subscriptions.map((subscription, index) => {
                if (subscription.subcription_type.toLowerCase() === SubscriptionType.SILVER.toLowerCase()) {
                    highestSubscriptionType = SubscriptionType.SILVER
                }
            })
        }
    }

    return (
        <section className="ph_main_sec">
            <div className="container-fluid theme_px_60">
                {/* <div className="part_result_list part_result_list card_bg_300"> */}
                {props.deck.services ?
                    null
                    : highestSubscriptionType
                        ? <div class="part_result_list">
                            <div class="ph_empty_message ph_decks_empty" role="alert">
                                <img class="ph_empty_image" src="/images/thumbnails/decks_empty.png" alt="Decks are empty" />
                                <div class="ph_empty_text">No saved items</div>
                            </div>
                        </div>
                        : <div class="tab-pane fade show active" id="pills-my-services" role="tabpanel" aria-labelledby="pills-my-services-tab">
                            <div class="ph_empty_message ph_empty_msg tabs_empty_msg" role="alert">
                                <img class="ph_empty_image" src="/images/thumbnails/messages_empty.png" alt="Messages are empty" />
                                <div class="ph_empty_text">To save an Offer, you need to subscribe to the platform</div>
                                <div class="text-center mt-2">
                                    <a href="javascript:void(0)" onClick={() => {
                                        if (props.user) {
                                            let encryptedEmail = Base64.encode(props.user.email)
                                            window.open(`${routes.PRICING}`, '_self')
                                        } else {
                                            window.open(`${routes.PRICING}/?logoutfromlms=true`, '_self')
                                        }
                                    }} className="theme_btn theme_primary">Click Here To Subscribe</a>
                                </div>
                            </div>
                        </div>
                }
                <div class="part_result_list">
                    <div class="card-deck ph_card_deck">
                        {props.deck.services ?
                            <a href="#" class="text-uppercase fontS13 filter_delete"
                                onClick={() => showConfirmAlert("Please Confirm", 'Are you sure that you would like to delete?', () => {
                                    props.deleteDeck(props.deck.id);
                                })}>
                                <img src="/images/icons/icn_trash_orange.svg" alt="Delete" />
                            </a>
                            : null}
                        {loadDeckServices()}
                        {loadDeckProfiles()}
                        {/* <div className="part_gird_list wow fadeInLeft">
                            <div className="card main_re_card heightDiv">
                                <article className="part_art">
                                    <figure className="part_fig">
                                        <a href="3.4_home_talent_detail_4.html">
                                            <img className="card-img-top" src="images/thumbnails/thumbnail2.png" alt="Gordon Philips" />
                                        </a>
                                        <a href="#" className="top_icn_share_save ph_sm_cricle" data-toggle="modal" data-target="#icn_share">
                                            <img src="images/icons/icn_export.svg" alt="Export Icon" />
                                        </a>
                                    </figure>
                                    <div className="card-body filter_bodyO">
                                        <span className="ph_flex_wrp_spw ">
                                            <h4 className="card-title mb-0 ph_text_trun"><a href="3.4_home_talent_detail_4.html">Gordon Philips</a></h4>
                                        </span>
                                        <p className="card-text">Founder at BLUECIRCL</p>
                                        <span className="ph_flex_wrp_spw ">
                                            <p className="card-text card-sm-text mb-0">CA 92129</p>
                                            <a href="#" className="theme_btn theme_outline_dark theme_btn_sm text-uppercase fontS12 borderR25">JOb</a>
                                        </span>
                                    </div>
                                </article>
                            </div>
                        </div> */}
                        {/* <div className="part_gird_list wow fadeInUp">
                            <div className="card main_re_card heightDiv">
                                <article className="part_art">
                                    <figure className="part_fig">
                                        <a href="3.4_home_talent_detail_6.html">
                                            <img className="card-img-top" src="images/thumbnails/thumbnail3.png" alt="Jessica Cebral" />
                                        </a>
                                        <a href="#" className="top_icn_share_save ph_sm_cricle" data-toggle="modal" data-target="#icn_share">
                                            <img src="images/icons/icn_export.svg" alt="Export Icon" />
                                        </a>
                                    </figure>
                                    <div className="card-body filter_bodyO">
                                        <span className="ph_flex_wrp_spw ">
                                            <h4 className="card-title mb-0 ph_text_trun">
                                                <a href="3.4_home_talent_detail_6.html">Kenny Lopez</a>
                                            </h4>
                                        </span>
                                        <p className="card-text">Marketing Manager</p>
                                        <span className="ph_flex_wrp_spw ">
                                            <p className="card-text card-sm-text mb-0">Virtual</p>
                                            <a href="#" className="theme_btn theme_outline_dark theme_btn_sm text-uppercase fontS12 borderR25">Opportunity</a>
                                        </span>
                                    </div>
                                </article>
                            </div>
                        </div>
                        <div className="part_gird_list wow fadeInRight">
                            <div className="card main_re_card heightDiv">
                                <article className="part_art">
                                    <figure className="part_fig">
                                        <a href="3.5_home_store_detail_1.html">
                                            <img className="card-img-top" src="images/thumbnails/thumbnail4.png" alt="Card image cap" />
                                        </a>
                                        <a href="#" className="top_icn_share_save ph_sm_cricle" data-toggle="modal" data-target="#icn_share">
                                            <img src="images/icons/icn_export.svg" alt="Export Icon" />
                                        </a>
                                    </figure>
                                    <div className="card-body filter_bodyO">
                                        <span className="ph_flex_wrp_spw ">
                                            <h4 className="card-title mb-0 ph_text_trun">
                                                <a href="3.5_home_store_detail_1.html">
                                                    Creative Excha...
                                            </a>
                                            </h4>
                                        </span>
                                        <p className="card-text">Marketing Manager</p>
                                        <span className="ph_flex_wrp_spw ">
                                            <p className="card-text card-sm-text mb-0">CA 92129</p>
                                            <a href="#" className="theme_btn theme_outline_dark theme_btn_sm text-uppercase fontS12 borderR25">JOb</a>
                                        </span>
                                    </div>
                                </article>
                            </div>
                        </div>
                        <div className="part_gird_list wow fadeInRight">
                            <div className="card main_re_card heightDiv">
                                <article className="part_art">
                                    <figure className="part_fig">
                                        <a href="3.4_home_talent_detail_4.html">
                                            <img className="card-img-top" src="images/thumbnails/thumbnail5.png" alt="Abiah Tucker" />
                                        </a>
                                        <a href="#" className="top_icn_share_save ph_sm_cricle" data-toggle="modal" data-target="#icn_share">
                                            <img src="images/icons/icn_export.svg" alt="Export Icon" />
                                        </a>
                                    </figure>
                                    <div className="card-body filter_bodyO">
                                        <span className="ph_flex_wrp_spw ">
                                            <h4 className="card-title mb-0 ph_text_trun">
                                                <a href="3.4_home_talent_detail_4.html">Abiah Tucker</a>
                                            </h4>
                                        </span>
                                        <p className="card-text">Marketing Manager</p>
                                        <span className="ph_flex_wrp_spw ">
                                            <p className="card-text card-sm-text mb-0">CA 92129</p>
                                            <a href="#" className="theme_btn theme_outline_dark theme_btn_sm text-uppercase fontS12 borderR25">Service</a>
                                        </span>
                                    </div>
                                </article>
                            </div>
                        </div>
                        <div className="part_gird_list wow fadeInLeft">
                            <div className="card main_re_card heightDiv">
                                <article className="part_art">
                                    <figure className="part_fig">
                                        <a href="3.5_home_store_detail_1.html">
                                            <img className="card-img-top" src="images/thumbnails/thumbnail6.png" alt="Clark Street" />
                                        </a>
                                        <a href="#" className="top_icn_share_save ph_sm_cricle" data-toggle="modal" data-target="#icn_share">
                                            <img src="images/icons/icn_export.svg" alt="Export Icon" />
                                        </a>
                                    </figure>
                                    <div className="card-body filter_bodyO">
                                        <span className="ph_flex_wrp_spw ">
                                            <h4 className="card-title mb-0 ph_text_trun">
                                                <a href="3.5_home_store_detail_1.html">Clark Street</a>
                                            </h4>
                                        </span>
                                        <p className="card-text">Jaren Hammer</p>
                                        <span className="ph_flex_wrp_spw ">
                                            <p className="card-text card-sm-text mb-0">CA 92129</p>
                                            <a href="#" className="theme_btn theme_outline_dark theme_btn_sm text-uppercase fontS12 borderR25">PLACE</a>
                                        </span>
                                    </div>
                                </article>
                            </div>
                        </div>
                        <div className="part_gird_list wow fadeInLeft">
                            <div className="card main_re_card heightDiv">
                                <article className="part_art">
                                    <figure className="part_fig">
                                        <a href="3.6_home_thing_detail_1.html">
                                            <img className="card-img-top" src="images/thumbnails/thumbnail7.png" alt="DSLR Camera" />
                                        </a>
                                        <a href="#" className="top_icn_share_save ph_sm_cricle" data-toggle="modal" data-target="#icn_share">
                                            <img src="images/icons/icn_export.svg" alt="Export Icon" />
                                        </a>
                                    </figure>
                                    <div className="card-body filter_bodyO">
                                        <span className="ph_flex_wrp_spw ">
                                            <h4 className="card-title mb-0 ph_text_trun"><a href="3.6_home_thing_detail_1.html">DSLR Camera</a></h4>
                                        </span>
                                        <p className="card-text">Mario Palmer</p>
                                        <span className="ph_flex_wrp_spw ">
                                            <p className="card-text card-sm-text mb-0">CA 92129</p>
                                            <a href="#" className="theme_btn theme_outline_dark theme_btn_sm text-uppercase fontS12 borderR25">Thing</a>
                                        </span>
                                    </div>
                                </article>
                            </div>
                        </div>
                        <div className="part_gird_list wow fadeInUp">
                            <div className="card main_re_card heightDiv">
                                <article className="part_art">
                                    <figure className="part_fig">
                                        <a href="3.5_home_store_detail_1.html">
                                            <img className="card-img-top" src="images/thumbnails/thumbnail15.jpg" alt="Cafe Area" />
                                        </a>
                                        <a href="#" className="top_icn_share_save ph_sm_cricle" data-toggle="modal" data-target="#icn_share">
                                            <img src="images/icons/icn_export.svg" alt="Export Icon" />
                                        </a>
                                    </figure>
                                    <div className="card-body filter_bodyO">
                                        <span className="ph_flex_wrp_spw ">
                                            <h4 className="card-title mb-0 ph_text_trun"><a href="3.5_home_store_detail_1.html">Cafe Area</a></h4>
                                        </span>
                                        <p className="card-text">Loren Spears</p>
                                        <span className="ph_flex_wrp_spw ">
                                            <p className="card-text card-sm-text mb-0">CA 92129</p>
                                            <a href="#" className="theme_btn theme_outline_dark theme_btn_sm text-uppercase fontS12 borderR25">PLACE</a>
                                        </span>
                                    </div>
                                </article>
                            </div>
                        </div>
                        <div className="part_gird_list wow fadeInRight">
                            <div className="card main_re_card heightDiv">
                                <article className="part_art">
                                    <figure className="part_fig">
                                        <a href="3.4_home_talent_detail_4.html">
                                            <img className="card-img-top" src="images/thumbnails/user1.png" alt="Cafe Area" />
                                        </a>
                                        <a href="#" className="top_icn_share_save ph_sm_cricle" data-toggle="modal" data-target="#icn_share">
                                            <img src="images/icons/icn_export.svg" alt="Export Icon" />
                                        </a>
                                    </figure>
                                    <div className="card-body filter_bodyO">
                                        <span className="ph_flex_wrp_spw ">
                                            <h4 className="card-title mb-0 ph_text_trun"><a href="3.4_home_talent_detail_4.html">Sale Executive</a></h4>
                                        </span>
                                        <p className="card-text">Tripp Mckay</p>
                                        <span className="ph_flex_wrp_spw ">
                                            <p className="card-text card-sm-text mb-0">CA 92129</p>
                                            <a href="#" className="theme_btn theme_outline_dark theme_btn_sm text-uppercase fontS12 borderR25">Service</a>
                                        </span>
                                    </div>
                                </article>
                            </div>
                        </div>
                        <div className="part_gird_list wow fadeInRight">
                            <div className="card main_re_card heightDiv">
                                <article className="part_art">
                                    <figure className="part_fig">
                                        <a href="3.5_home_store_detail_1.html">
                                            <img className="card-img-top" src="images/thumbnails/thumbnail10.png" alt="Cafe Area" />
                                        </a>
                                        <a href="#" className="top_icn_share_save ph_sm_cricle" data-toggle="modal" data-target="#icn_share">
                                            <img src="images/icons/icn_export.svg" alt="Export Icon" />
                                        </a>
                                    </figure>
                                    <div className="card-body filter_bodyO">
                                        <span className="ph_flex_wrp_spw ">
                                            <h4 className="card-title mb-0 ph_text_trun"><a href="3.5_home_store_detail_1.html">Office Area</a></h4>
                                        </span>
                                        <p className="card-text">Alexa Rollins</p>
                                        <span className="ph_flex_wrp_spw ">
                                            <p className="card-text card-sm-text mb-0">CA 92129</p>
                                            <a href="#" className="theme_btn theme_outline_dark theme_btn_sm text-uppercase fontS12 borderR25">PLACE</a>
                                        </span>
                                    </div>
                                </article>
                            </div>
                        </div> */}
                    </div>
                </div>
                {/* </div> */}
            </div>
        </section>
    )
}

export default DeckComponent;