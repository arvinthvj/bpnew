import React from 'react'
import Oux from '../../hoc/Oux/Oux'
import SearchSection from '../Home/SearchSection/SearchSection'
import LoadingBtn from '../UI/LoadingButton/LoadingButton'
import SpinnerLoader from '../UI/SpinnerLoader/SpinnerLoader'
import { PageLimit, CategoriesList, EMPTY_IMAGE_PATH, SubscriptionType } from '../../utility/constants/constants'
import ServiceSection from '../Home/ServicesSection/ServiceSection'
import { WEB_URL } from '../../config'
import CustomToolTip from '../UI/CustomToolTip/CustomToolTip'

const searchResultsPage = props => {
    return (
        <Oux>
            <section className="ph_main_sec pt_83 ph_filter_sec all_decks_sec">
                <div className="container-fluid theme_px_60">
                    <SearchSection
                        cities={props.cities}
                        removeSectionMargin={true}
                        search={props.search}
                        removeBanner={true}
                        style={{ paddingLeft: '0' }}
                        setExistingSearch={props.setExistingSearch}
                        currentPage={props.currentPage}
                        existingSearch={props.existingSearch}
                        history={props.history}
                        onShuffleCards={props.onShuffleCards}
                        onSubmitSearch={props.onSubmitSearch}
                        toggleCityDropdown={props.toggleCityDropdown}
                        isSearchLoading={props.isSearchLoading}
                        selectedQuery={props.selectedQuery}
                        selectedCity={props.selectedCity}
                        makeSearchTextStateEmpty={props.makeSearchTextStateEmpty}
                        toggleCompensationDropdown={props.toggleCompensationDropdown}
                        showCompensationDropdown={props.showCompensationDropdown}
                        onSelectCompensation={props.onSelectCompensation}
                        compensations={props.compensations}
                        selectedCompensation={props.selectedCompensation}
                        setWrapperRef={props.setWrapperRef}
                        onCityFocusHandler={props.onCityFocusHandler}
                        onCitySearchTextChangeHandler={props.onCitySearchTextChangeHandler}
                        searchText={props.searchText}
                        resetSearch={props.resetSearch}
                        searchInputFocus={props.searchInputFocus}
                        selectedCityHandler={props.selectedCityHandler}
                        city_list={props.city_list}
                        onSelectClassifiedFilter={props.onSelectCompanyFilter}
                        selectedCompany={props.selectedCompany}
                        user={props.user} />
                </div>
            </section>
            <ServiceSection
                search={props.search}
                onSelectClassifiedFilter={props.onSelectClassifiedFilter}
                onSelectFilter={props.onSelectFilter}
                selectedFilter={props.selectedFilter}
                onShuffleCards={props.onShuffleCards}
                selectedClassified={props.selectedClassified}
                categories={props.categories}
                resetSearch={props.resetSearch}
                isSearchLoading={props.isSearchLoading}
                searchResults={props.searchResults}
                createClassifiedAdd={props.createClassifiedAdd}
                history={props.history}
                onSelectCompanyFilter={props.onSelectCompanyFilter}
                selectedCompany={props.selectedCompany}
                user={props.user} />
            <section className="ph_main_sec">
                <div className="container-fluid theme_px_60">
                    <div className="part_result_list">
                        {
                            props.isSearchLoading && !props.isNextPageLoading
                                ? <div className="ph_empty_message" role="alert">
                                    <SpinnerLoader />
                                </div>
                                : props.searchResults && props.searchResults.length > 0
                                    ? <Oux>
                                        <div class="part_result_list">
                                            <div class="card-deck ph_card_deck">
                                                {
                                                    props.searchResults.map((service, index) => {
                                                        let thumbnail = "/images/thumbnails/image_grey.png"
                                                        if ((service.attachments && service.attachments.length > 0) && (service.attachments[0].photo_urls && Object.keys(service.attachments[0].photo_urls).length > 0)) {
                                                            if (service.attachments[0].photo_urls.medium !== '') {
                                                                thumbnail = service.attachments[0].photo_urls.medium
                                                            }
                                                        }
                                                        if (service.type.toLowerCase() === CategoriesList.WANT_AD.key.toLowerCase()) {
                                                            return (
                                                                <div className="card main_re_card">
                                                                    <figure className="part_fig">
                                                                        <CustomToolTip placement="top" text="Share this card">
                                                                            <a href="javascript:void(0)" onClick={() => { props.getShareURL(`${WEB_URL()}/${service.type}/${service.id}/details`, service); }}
                                                                                className="top_icn_share_save ph_sm_cricle" data-toggle="modal" data-target="#icn_share">
                                                                                <img src="images/icons/icn_export.svg" alt="Export Icon" />
                                                                            </a>
                                                                        </CustomToolTip>
                                                                        <div class="card-body filter_bodyO">
                                                                            <a style={{ pointerEvents: 'none', fontSize: '13px' }} class="theme_btn want_ad_btn">{CategoriesList.WANT_AD.title}: {service.category.name}</a>
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
                                                                        <h5 class="card-title">
                                                                            &nbsp;
                                                                        </h5>
                                                                        <p className="card-text">{service.profile.name}</p>
                                                                    </div>
                                                                    <div class="card-footer ph_footer">
                                                                        <span class="ph_flex_wrp_spw mb-1">
                                                                            <p class="card-text mb-0">{service.compensations && service.compensations.length > 0
                                                                                ? service.compensations.map((compensation, index) => {
                                                                                    return compensation.name
                                                                                })
                                                                                : null
                                                                            }</p>
                                                                        </span>
                                                                        <span class="ph_flex_wrp_spw ">
                                                                            <p className="card-text card-sm-text mb-0">{service.virtual ? <Oux>&nbsp;<br />&nbsp;</Oux> : <Oux>{service.address.city}<br />{service.address.zip}</Oux>}</p>
                                                                            <CustomToolTip placement="top" text="Add This Item (to a Saved List)">
                                                                                <a href="javascript:void(0)" className="theme_btn theme_primary add_to_deck_btn theme_btn_sm text-uppercase" data-toggle="modal" data-target="#add_deck_modal" onClick={() => props.addDeckClicked(service)}>Save</a>
                                                                            </CustomToolTip>
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            )
                                                        }
                                                        else {
                                                            return (
                                                                <div class="card main_re_card">
                                                                    <figure className="part_fig export_icn_wrp">
                                                                        <a style={{ pointerEvents: 'none', fontSize: '13px' }} class="theme_btn want_ad_btn">Offer: {service.category.name}</a>
                                                                        <a href="javascript:void(0)" onClick={() => props.onClickCards(service)}>
                                                                            <img className="card-img-top" src={thumbnail} alt={service.title} />
                                                                        </a>
                                                                        <CustomToolTip placement="top" text="Share this card">
                                                                            <a href="javascript:void(0)" onClick={() => { props.getShareURL(`${WEB_URL()}/${service.type}/${service.id}/details`, service); }} className="top_icn_share_save ph_sm_cricle" data-toggle="modal" data-target="#icn_share">
                                                                                <img src="/images/icons/icn_export.svg" alt="Export Icon" />
                                                                            </a>
                                                                        </CustomToolTip>
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
                                                                            <p className="card-text card-sm-text mb-0">{service.virtual ? null : <Oux>{service.address.city}<br />{service.address.zip}</Oux>}</p>
                                                                            <CustomToolTip placement="top" text="Add This Item (to a Saved List)">
                                                                                <a href="javascript:void(0)" className="theme_btn theme_primary add_to_deck_btn theme_btn_sm text-uppercase" data-toggle="modal" data-target="#add_deck_modal" onClick={() => props.addDeckClicked(service)}>Save</a>
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
                                    : <div className="ph_empty_message" role="alert">
                                        <img className="ph_empty_image" src={EMPTY_IMAGE_PATH.SEARCH} alt="No Result Found" />
                                        <div className="ph_empty_text">No Result Found</div>
                                    </div>
                        }
                        {
                            props.searchResults && props.searchResults.length >= (PageLimit * props.currentPage) && (!props.isSearchLoading || props.isNextPageLoading)
                                ? <div className="text-right" role="alert">
                                    {
                                        props.isNextPageLoading
                                            ? <LoadingBtn btnClassName="theme_primary theme_btn text-uppercase" btnTitle="Loading" />
                                            : <button className="theme_primary theme_btn text-uppercase" onClick={props.onClickLoadMore} type="button">Load More </button>
                                    }
                                </div>
                                : props.isNextPageLoading
                                    ? <LoadingBtn btnClassName="theme_primary theme_btn text-uppercase" btnTitle="Loading" />
                                    : null
                        }
                    </div>
                </div>
            </section>
        </Oux>
    )
}

export default searchResultsPage