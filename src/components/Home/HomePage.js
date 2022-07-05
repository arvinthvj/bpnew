import React from 'react'
import SearchSection from './SearchSection/SearchSection'
import ServiceSection from './ServicesSection/ServiceSection'
import Oux from '../../hoc/Oux/Oux'
import LoadingBtn from '../UI/LoadingButton/LoadingButton'
import SpinnerLoader from '../UI/SpinnerLoader/SpinnerLoader'
import { PageLimit, CategoriesList, routes, EMPTY_IMAGE_PATH, SubscriptionStatus, SubscriptionType } from '../../utility/constants/constants'
import { search } from '../../api/miscApi'
import * as actions from '../../redux/actions'
import { WEB_URL } from '../../config'
import ImageLoader from '../UI/ImageLoader/ImageLoader'
import CustomToolTip from '../UI/CustomToolTip/CustomToolTip'
import storage from '../../utility/storage'
import { useDispatch } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';


const homePage = props => {
    let featuredSection = null
    if (props.featuredTalentProfile && props.featuredTalentProfile.length > 0) {
        featuredSection = (
            <Oux>
                <header className="part_header_h wow fadeInUp">
                    <h1>Featured talent</h1>
                </header>
                <div className="part_gird_row row_H_D">
                    {
                        props.featuredTalentProfile.filter((item, index) => index < 8).map((profile, index) => {
                            let thumbnail = "/images/thumbnails/ph_hero6.png"
                            if (profile.photo_urls && Object.keys(profile.photo_urls).length > 0) {
                                thumbnail = profile.photo_urls.medium
                            }
                            return (
                                <div className="part_gird_list wow fadeInLeft">
                                    <div className="card main_re_card heightDiv">
                                        <article className="part_art">
                                            <a onClick={() => props.onClickCards({ ...profile, type: "featured" })} href="javascript:void(0)">
                                                <figure className="part_fig">
                                                    <ImageLoader className="card-img-top" src={thumbnail} />
                                                </figure>
                                            </a>
                                            <div className="card-body">
                                                <h4 className="card-title ph_text_trun" style={{ maxWidth: '250px' }}>
                                                    <a onClick={() => props.onClickCards({ ...profile, type: "featured" })} href="javascript:void(0)">{profile.name}</a>
                                                </h4>
                                                <p className="card-text">{profile.title}</p>
                                                <p className="card-text card-sm-text">{profile.address.formatted_address}</p>
                                            </div>
                                        </article>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
                <div className="part_result_list ph_featured_list">
                    <div className="row row_H_D">
                        {
                            props.success_stories && props.success_stories.length > 0
                                ? <div className="col-sm-12">
                                    <header className="part_header_h mb-4">
                                        <h1>Success Stories</h1>
                                    </header>
                                </div>
                                : null
                        }
                        {
                            props.success_stories && props.success_stories.length > 0
                                ? props.success_stories.map((story, index) => {
                                    let imgSrc = null
                                    if ((story.photo_urls && Object.keys(story.photo_urls).length > 0) || !story.photo_urls) {
                                        imgSrc = story.photo_urls.medium
                                    }
                                    if (index < 2) {
                                        return (
                                            <div className="col-lg-12 col-xl-6 wow fadeInLeft">
                                                <div className="ph_profile_card ph_mr_15 heightDiv">
                                                    <div className="row">
                                                        <div className="col-md-5">
                                                            <article className="part_art">
                                                                <a href="javascript:void(0)">
                                                                    <figure className="part_fig avatar_wrp">
                                                                        <ImageLoader className="card-img-top" src={imgSrc} />
                                                                    </figure>
                                                                </a>
                                                                <div className="ph_body">
                                                                    <h3 className="card-title ph_text_trun">{story.name}</h3>
                                                                    <p className="card-text">{story.address ? story.address.formatted_address : null}</p>
                                                                    {story.company_name ? <h6 style={{ cursor: 'default' }}>Founder at <span className="ph_underline"> {story.company_name}</span></h6> : null}
                                                                </div>
                                                            </article>
                                                        </div>
                                                        <div className="col-md-7">
                                                            <div className="ph_profile_content">
                                                                {story.description.length <= 500 ? story.description : <Oux>{`${story.description.substring(0, 500)}...`}<a href="javascript:void(0)" onClick={() => { props.storeFullDescription(story.description, story.name); window.$('#description_modal').modal() }} className="ph_underline">Read More</a></Oux>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    } else {
                                        return;
                                    }
                                })
                                : null
                        }
                    </div>
                </div>
            </Oux>
        )
    }

    if (props.success_stories && props.success_stories.length > 0 && !featuredSection) {
        featuredSection = (
            <div className="part_result_list ph_featured_list">
                <div className="row row_H_D">
                    {
                        props.success_stories && props.success_stories.length > 0
                            ? <div className="col-sm-12">
                                <header className="part_header_h mb-4">
                                    <h1>Success Stories</h1>
                                </header>
                            </div>
                            : null
                    }
                    {
                        props.success_stories && props.success_stories.length > 0
                            ? props.success_stories.map((story, index) => {
                                let imgSrc = null
                                if ((story.photo_urls && Object.keys(story.photo_urls).length > 0) || !story.photo_urls) {
                                    imgSrc = story.photo_urls.medium
                                }
                                if (index < 2) {
                                    return (
                                        <div key={index} className="col-lg-12 col-xl-6 wow fadeInLeft">
                                            <div className="ph_profile_card ph_mr_15 heightDiv">
                                                <div className="row">
                                                    <div className="col-md-5">
                                                        <article className="part_art">
                                                            <a href="javascript:void(0)">
                                                                <figure className="part_fig avatar_wrp">
                                                                    <img className="card-img-top" src={imgSrc} alt={story.name} />
                                                                </figure>
                                                            </a>
                                                            <div className="ph_body">
                                                                <h3 className="card-title ph_text_trun">{story.name}</h3>
                                                                <p className="card-text">{story.address ? story.address.formatted_address : null}</p>
                                                                {story.company_name ? <h6 style={{ cursor: 'default' }}>Founder at <span className="ph_underline"> {story.company_name}</span></h6> : null}
                                                            </div>
                                                        </article>
                                                    </div>
                                                    <div className="col-md-7">
                                                        <div className="ph_profile_content">
                                                            {story.description.length <= 500 ? story.description : <Oux>{`${story.description.substring(0, 500)}...`}<a href="javascript:void(0)" onClick={() => { props.storeFullDescription(story.description, story.name); window.$('#description_modal').modal() }} className="ph_underline">Read More</a></Oux>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                } else {
                                    return;
                                }
                            })
                            : null
                    }
                </div>
            </div>
        )
    }

    let searchSection = null
    if (props.searchResults && props.searchResults.length > 0 && props.user) {
        searchSection = (
            <Oux>
                <div class="part_result_list">
                    <div class="card-deck ph_card_deck">
                        {
                            props.searchResults.map((service, index) => {
                                let thumbnail = "/images/thumbnails/image_grey.png"
                                if ((service.attachments && service.attachments.length > 0) && (service.attachments[0].photo_urls && Object.keys(service.attachments[0].photo_urls).length > 0)) {
                                    if (service.default_image_id) {
                                        service.attachments.map(attachment => {
                                            console.log(attachment)
                                            if (attachment.id === service.default_image_id) {
                                                thumbnail = attachment.photo_urls.medium
                                            }
                                        })
                                    }
                                    else if (service.attachments[0].photo_urls.medium !== '') {
                                        thumbnail = service.attachments[0].photo_urls.medium
                                    }
                                }
                                let routeToPush = null
                                let categoryName = null
                                if (service.category.filter(e => e.name.toLowerCase() === CategoriesList.PEOPLE.toLowerCase()).length) {
                                    routeToPush = routes.MY_SERVICES
                                } else if (service.category.filter(e => e.name.toLowerCase() === CategoriesList.PLACES.toLowerCase()).length) {
                                    routeToPush = routes.PLACES
                                } else if (service.category.filter(e => e.name.toLowerCase() === CategoriesList.THING.toLowerCase()).length) {
                                    routeToPush = routes.THINGS
                                } else if (service.category.filter(e => e.name.toLowerCase() === CategoriesList.JOB.toLowerCase()).length) {
                                    routeToPush = routes.JOBS
                                    categoryName = "Services"
                                } else if (service.category.filter(e => e.name.toLowerCase() === CategoriesList.OPPORTUNITY.toLowerCase()).length) {
                                    routeToPush = routes.SHARING_OPPORTUNITIES
                                    categoryName = "Information"
                                } else if (service.category.filter(e => e.name.toLowerCase() === CategoriesList.DONATION.toLowerCase()).length) {
                                    routeToPush = routes.DONATIONS_GIVEAWAYS
                                    categoryName = "Other/Misc"
                                }
                                if (service.type.toLowerCase() === CategoriesList.WANT_AD.key.toLowerCase()) {
                                    return (
                                        <div key={service.id} class="card main_re_card">
                                            <figure className="part_fig">
                                                <div className="card_icons_section">
                                                    {
                                                        props.user && props.user.profiles && props.user.profiles.length > 0 && props.user.profiles.filter(profile => profile.id === service.profile.id).map(profile => {
                                                            return (
                                                                <CustomToolTip placement="top" text="Edit this card">
                                                                    <a href="javascript:void(0)" onClick={() => {
                                                                        storage.set('isEdit', true)
                                                                        storage.set('classified', service)
                                                                        props.history.push(routes.CLASSIFIEDS)
                                                                    }} className="top_icn_share_save ph_sm_cricle">
                                                                        <img src="/images/icons/icn_edit_orange.svg" alt="Edit" />
                                                                    </a>
                                                                </CustomToolTip>
                                                            )
                                                        })
                                                    }
                                                    <CustomToolTip placement="top" text="Share this card">
                                                        <a href="javascript:void(0)" onClick={() => { props.getShareURL(`${WEB_URL()}/${service.type}/${service.id}/details`, service); }}
                                                            className="top_icn_share_save ph_sm_cricle" data-toggle="modal" data-target="#icn_share">
                                                            <img src="images/icons/icn_export.svg" alt="Export Icon" />
                                                        </a>
                                                    </CustomToolTip>
                                                </div>
                                                <div class="card-body filter_bodyO">
                                                    <a style={{ pointerEvents: 'none', fontSize: '13px' }} class="theme_btn want_ad_btn">{CategoriesList.WANT_AD.title}: {categoryName ? categoryName : service.category.name}</a>
                                                    <span class="classified_para">
                                                        <h5 class="card-title">
                                                            <a href="javascript:void(0)" onClick={() => props.onClickCards(service)} className="text-primary">
                                                                {service.title}
                                                                {/* if(str.length > 10) str = str.substring(0,10); */}
                                                            </a>
                                                        </h5>
                                                        <p class="card-text">
                                                            <a href="javascript:void(0)" onClick={() => props.onClickCards(service)} className="text-primary">
                                                                {service.description.length > 150 ? `${service.description.substring(0, 150)}...` : service.description}
                                                                {/* if(str.length > 10) str = str.substring(0,10); */}
                                                            </a>
                                                        </p>
                                                    </span>
                                                </div>
                                            </figure>
                                            <div class="card-body filter_bodyO">
                                                <h5 class="card-title">&nbsp;</h5>
                                                <p className="card-text">{service.profile.name}</p>
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
                                                    <p className="card-text card-sm-text mb-0">{service.virtual ? <Oux>&nbsp;<br />&nbsp;</Oux> : <Oux>{service.address.city}<br />{service.address.zip}</Oux>}</p>
                                                    <CustomToolTip placement="top" text="Add This Item (to a Saved List)">
                                                        <a href="javascript:void(0)" className="theme_btn add_to_deck_btn theme_primary theme_btn_sm text-uppercase"
                                                            onClick={() => {
                                                                let highestSubscriptionType = null
                                                                props.user.subscriptions.map(subscription => {
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
                                                                        if (!highestSubscriptionType) {
                                                                            props.user.subscriptions.map((subscription, index) => {
                                                                                if (subscription.subcription_type.toLowerCase() === SubscriptionType.STARTUP_SPECIAL.toLowerCase()) {
                                                                                    highestSubscriptionType = SubscriptionType.STARTUP_SPECIAL
                                                                                }
                                                                            })
                                                                        }
                                                                        if (!highestSubscriptionType) {
                                                                            highestSubscriptionType = SubscriptionType.FREE
                                                                        }
                                                                    }
                                                                })
                                                                if (!highestSubscriptionType) {
                                                                    highestSubscriptionType = SubscriptionType.FREE
                                                                }
                                                                if (highestSubscriptionType.toLowerCase() === SubscriptionType.FREE.toLowerCase()) {
                                                                    window.$('#subscription_modal').modal()
                                                                } else {
                                                                    window.$('#add_deck_modal').modal()
                                                                    props.addDeckClicked(service)
                                                                }
                                                            }}>Save</a>
                                                    </CustomToolTip>
                                                </span>
                                            </div>
                                        </div>
                                    )
                                }
                                else {
                                    let profile = props.user.id.toString() === service.profile.user_id
                                    const dispatch = useDispatch();
                                    const handleStep = (steps) => {
                                        dispatch(actions.handleStepChange(steps))
                                    }
                                    return (
                                        <div key={service.id} class="card main_re_card" id={profile ? "" : "card_walk"}>
                                            <figure className="part_fig export_icn_wrp">
                                                <a style={{ pointerEvents: 'none', fontSize: '13px' }} class="theme_btn want_ad_btn">Offer: {categoryName ? categoryName : service.category.reduce((acc, curr, index) => {
                                                    acc += acc.length ? ", " + curr.name : curr.name
                                                    if (index == service.category.length - 1) {
                                                        if (acc.split(",").length > 2) {
                                                            acc = acc.split(",").slice(0, 2).join(",") + "....."
                                                        }
                                                    }
                                                    return acc;
                                                }, "")}</a>
                                                <a href="javascript:void(0)" onClick={() => {
                                                    props.onClickCards(service)
                                                }}>
                                                    <img className="card-img-top" src={thumbnail} alt={service.title} />
                                                </a>
                                                <div className="card_icons_section">
                                                    {
                                                        props.user && props.user.profiles && props.user.profiles.length > 0 && props.user.profiles.filter(profile => profile.id === service.profile.id).map(profile => {
                                                            return (
                                                                <CustomToolTip placement="top" text="Edit this card">
                                                                    <a
                                                                        href="javascript:void(0)"
                                                                        onClick={() => {
                                                                            storage.set('isEdit', true)
                                                                            storage.set('service', service)
                                                                            props.history.push(routeToPush)
                                                                        }}
                                                                        className="top_icn_share_save ph_sm_cricle">
                                                                        <img src="/images/icons/icn_edit_orange.svg" alt="Edit" />
                                                                    </a>
                                                                </CustomToolTip>
                                                            )
                                                        })
                                                    }
                                                    <CustomToolTip placement="top" text="Share this card">
                                                        <a href="javascript:void(0)" onClick={() => { props.getShareURL(`${WEB_URL()}/${service.type}/${service.id}/details`, service); }} className="top_icn_share_save ph_sm_cricle" data-toggle="modal" data-target="#icn_share">
                                                            <img src="/images/icons/icn_export.svg" alt="Export Icon" />
                                                        </a>
                                                    </CustomToolTip>
                                                </div>
                                            </figure>
                                            <div class="card-body filter_bodyO">
                                                <h5 class="card-title">
                                                    <a href="javascript:void(0)" className="text-primary" onClick={() => props.onClickCards(service)}>
                                                        {service.title.length > 50 ? `${service.title.substring(0, 45)}...` : service.title}
                                                    </a>
                                                </h5>
                                                <p className="card-text">{service.profile.name}</p>
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
                                                    <p className="card-text card-sm-text mb-0">{service.virtual ? null : <Oux>{
                                                        (service.address.city && service.address.city.length > 0 ? service.address.city + "," : "") + " " + (service.address.state && service.address.state.length > 0 ? (service.address.state).length > 7 ? "" : service.address.state + "," : "") + " " + (service.address.country && service.address.country.length > 0 ? (service.address.country).length > 7 ? "..." : service.address.country : "")
                                                        }<br />{service.address.zip}</Oux>}</p>
                                                    <CustomToolTip placement="top" text="Add This Item (to a Saved List)">
                                                        <a href="javascript:void(0)" className="theme_btn add_to_deck_btn theme_primary theme_btn_sm text-uppercase"
                                                            onClick={() => {
                                                                let highestSubscriptionType = null
                                                                props.user.subscriptions.map(subscription => {
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
                                                                        if (!highestSubscriptionType) {
                                                                            props.user.subscriptions.map((subscription, index) => {
                                                                                if (subscription.subcription_type.toLowerCase() === SubscriptionType.STARTUP_SPECIAL.toLowerCase()) {
                                                                                    highestSubscriptionType = SubscriptionType.STARTUP_SPECIAL
                                                                                }
                                                                            })
                                                                        }
                                                                        if (!highestSubscriptionType) {
                                                                            highestSubscriptionType = SubscriptionType.FREE
                                                                        }
                                                                    }
                                                                })
                                                                if (!highestSubscriptionType) {
                                                                    highestSubscriptionType = SubscriptionType.FREE
                                                                }
                                                                if (highestSubscriptionType.toLowerCase() === SubscriptionType.FREE.toLowerCase()) {
                                                                    window.$('#subscription_modal').modal()
                                                                } else {
                                                                    window.$('#add_deck_modal').modal()
                                                                    props.addDeckClicked(service)
                                                                }
                                                            }}>Save</a>
                                                    </CustomToolTip>
                                                </span>
                                            </div>
                                        </div>
                                    )
                                }
                            })}
                    </div>
                </div>
            </Oux>
        )
    }

    let content = null
    if (((props.isSearchLoading && !props.isAuthLoading) || (!props.searchResults && props.user && !props.error)) && !props.isNextPageLoading) {
        content = (
            <div className="ph_empty_message" role="alert">
                <SpinnerLoader />
            </div>
        )
    } else if (searchSection) {
        content = searchSection
    } else if (routes.HOME.includes(props.history.location.pathname) && searchSection) {
        content = searchSection
    } else if (!props.user && featuredSection) {
        content = featuredSection
    }
    else {
        if (props.user) {
            content = (
                <div className="ph_empty_message" role="alert">
                    <img className="ph_empty_image" src={EMPTY_IMAGE_PATH.SEARCH} alt="No Result Found" />
                    <div className="ph_empty_text">No Result Found</div>
                </div>
            )
        }
    }

    // let content = (
    //     <section className="ph_main_sec">
    //         <div className="container-fluid theme_px_100">
    //             <div className="part_result_list">
    //                 {featuredSection}
    //             </div>
    //         </div>
    //     </section>
    // )

    // if (routes.SEARCH_RESULT.includes(props.history.location.pathname)) {
    //     <section className="ph_main_sec">
    //         <div className="container-fluid theme_px_100">
    //             <div className="part_result_list">
    //                 {search}
    //             </div>
    //         </div>
    //     </section>
    // }
    return (
        <section className="ph_main_sec">
            <div className="container-fluid theme_px_60">
                <div className="part_result_list">
                    {content}
                    {
                        props.searchResults && props.searchResults.length >= (PageLimit * props.currentPage) && (!props.isSearchLoading || props.isNextPageLoading) && (props.user || props.history.location.pathname.includes(routes.HOME))
                            ? <div className="text-right" role="alert">
                                {
                                    props.isNextPageLoading
                                        ? <LoadingBtn btnClassName="theme_primary theme_btn text-uppercase" btnTitle="Loading" />
                                        : //<button className="theme_primary theme_btn text-uppercase" onClick={props.onClickLoadMore} type="button">Load More </button>
                                        <InfiniteScroll
                                            //This is important field to render the next data
                                            dataLength={props.searchResults && props.searchResults.length && props.user}
                                            next={props.onClickLoadMore}
                                            hasMore={true}
                                            endMessage={
                                                <p style={{ textAlign: 'center' }}>
                                                    <b>Yay! You have seen it all</b>
                                                </p>}
                                        >

                                        </InfiniteScroll>
                                }
                            </div>
                            : props.isNextPageLoading
                                ? <div className="text-center" role="alert">
                                    <LoadingBtn btnClassName="theme_primary theme_btn text-uppercase" />
                                </div>
                                : null
                    }
                </div>
            </div>
        </section>
    )
}


export default homePage
