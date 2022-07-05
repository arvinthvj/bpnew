import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import HomePage from '../../components/Home/HomePage';
import Oux from '../../hoc/Oux/Oux';
import SearchSection from '../../components/Home/SearchSection/SearchSection';
import ServiceSection from '../../components/Home/ServicesSection/ServiceSection';
import { maintainCardHeight } from '../../styles/js/custom';
import $ from 'jquery'
import * as actions from '../../redux/actions/index'
import { CategoriesList, routes, PageLimit, EmailVerificationStatus } from '../../utility/constants/constants';
import storage from '../../utility/storage';
import { isTokenValid } from '../../utility/utility';
import { Base64 } from 'js-base64';
import { WEB_URL } from '../../config';
import PageLoader from '../../components/PageLoader/PageLoader';


class Home extends React.Component {

    state = {
        showCompensationDropdown: false,
        finalSearchQuery: null,
        isNextPageLoading: false,
        currentPage: 1,
        isLoading: true,
        searchText: '',
        searchInputFocus: false,
        showPageLoader: true
    }

    componentWillUnmount = () => {
        document.removeEventListener('mousedown', this.handleClickOutsideServicelist);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutsideServicelist);
        // let logoutFromReact = new URLSearchParams(this.props.history.location.search, { ignoreQueryPrefix: true }).get('logoutfromreact')
        // if (logoutFromReact && this.props.user) {
        //     this.props.logout()
        // }
        let redirectTo = storage.get('redirectedFromWordpressRoute')
        let via = storage.get('via', null)
        if (redirectTo && this.props.user) {
            this.props.history.push(redirectTo)
            storage.remove('redirectedFromWordpressRoute')
        }
        if (via && this.props.user) {
            this.props.history.push(via)
            storage.remove('via')
        }
        let logoutFromReact = new URLSearchParams(this.props.history.location.search, { ignoreQueryPrefix: true }).get('logoutfromreact')
        if (!logoutFromReact) {
            let isSignedUp = storage.get('isSignedUp', null)
            let redirectToPricing = storage.get('redirectToPricing', null)
            if (redirectToPricing && this.props.user) {
                let encryptedEmail = Base64.encode(this.props.user.email);
                let redirectUrl = WEB_URL() + routes.CREATE_NEW_PROFILE
                window.open(`${routes.SUBSCRIPTION}/?redirectto=${redirectUrl}&login=${encryptedEmail}`, '_self')
                storage.remove('redirectToPricing')
            }
            if (isSignedUp && this.props.user) {
                window.$('#welcome_modal').modal() //Show this on signup
                storage.remove('isSignedUp')
            }
            let detailsType = storage.get("D_type", null)
            let detailsId = storage.get('D_id', null)
            let detailsRoute = storage.get('D_route', null)
            if (this.props.user && this.props.isNavigateToDetails) {
                if (detailsRoute) {
                    this.props.history.push(detailsRoute)
                }
                else {
                    storage.remove("D_type")
                    storage.remove("D_id")
                    storage.remove("D_route")
                }
            } else {
                storage.remove("D_type")
                storage.remove("D_id")
                storage.remove("D_route")
            }

            let navigateToClassified = storage.get('navigate_to_classified', null)
            let navigateToClassifiedVal = storage.get('navigate_to_classified_val', null)
            if (this.props.user && navigateToClassified) {
                this.props.history.push(routes.CLASSIFIEDS);
                this.props.createClassifiedAddClicked(navigateToClassifiedVal)
            }

            if (!this.props.user) {
                this.props.storeUserSearch({ userSearch: null, clearSearchResults: true })
                this.props.featuredTalent()
                    .then(response => {
                        this.setState({ isLoading: false })
                    }).catch(error => {
                        this.setState({ isLoading: false })
                    })
            }
            // if ((this.props.cities && this.props.cities.length > 0) && this.props.user && (!this.props.searchResults)) {
            //     this.props.search("city=" + this.props.cities[0].city + "&page=" + this.state.currentPage + "&limit=" + PageLimit)
            //         .then(response => {
            //             this.setState({ isLoading: false })
            //         }).catch(error => {
            //             this.setState({ isLoading: false })
            //         })
            // }

            if ((this.props.city_list && this.props.city_list.length > 0) && (!this.props.searchResults) && this.props.user && !this.props.isSearchLoading) {
                this.props.search("page=" + this.state.currentPage + "&limit=" + PageLimit)
                    .then(response => {
                        this.setState({ isLoading: false })
                    }).catch(error => {
                        this.setState({ isLoading: false })
                    })
            }
            let isValidToken = false
            if (this.props.token) {
                isValidToken = isTokenValid(this.props.token)
            }
            if (this.props.user && isValidToken) {
                this.props.getDeckList();
                this.props.fetchCurrentUser();
            }
        }
        setTimeout(() => {
            this.setState({ showPageLoader: false })
        }, 1000)
    }

    componentDidUpdate(prevProps, prevState) {
        maintainCardHeight()
        if ((this.props.city_list && this.props.city_list.length > 0) && (!this.props.searchResults && !this.props.error) && this.props.user && !this.props.isSearchLoading) {
            this.props.search("page=" + this.state.currentPage + "&limit=" + PageLimit)
                .then(response => {
                    this.setState({ isLoading: false })
                }).catch(error => {
                    this.setState({ isLoading: false })
                })
        } else if (this.state.isLoading) {
            this.setState({ isLoading: false })
        }
        // if (!this.props.user && (!this.props.featuredTalentProfile || (this.props.featuredTalentProfile && this.props.featuredTalentProfile.length === 0))) {
        //     this.props.featuredTalent()
        //         .then(response => {
        //             this.setState({ isLoading: false })
        //         }).catch(error => {
        //             this.setState({ isLoading: false })
        //         })
        // }
    }

    // City Search Starts


    handleClickOutsideServicelist = (event) => {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            if (this.state.searchInputFocus) {
                this.setState({
                    ...this.state,
                    searchInputFocus: false,
                })
            }
        }
    }

    setWrapperRef = (node) => {
        this.wrapperRef = node;
    }

    selectedCityHandler = (city, setFieldValue) => {
        console.log(city.city, "selectedCityHandler");
        setFieldValue('city', `${city.city}, ${city.state_code}`)
        this.setState({
            ...this.state,
            searchText: '',
            searchInputFocus: false,
        })
        let userSearch = {
            selectedClassified: this.props.selectedClassified,
            selectedCompensation: this.props.selectedCompensation,
            selectedFilter: this.props.selectedFilter,
            selectedQuery: this.props.selectedQuery
        }
    }

    onCityFocusHandler = () => {
        this.setState({
            ...this.state,
            searchInputFocus: true,
        })
    }

    onCitySearchTextChangeHandler = (e, setFieldValue) => {
        let text = e.target.value;
        setFieldValue('city', text)
        if (!text || text === "") {
            this.setState({ searchText: "Invalid City" })
        }
        else {
            this.setState({
                ...this.state,
                searchText: text,
                // selectedSkills: null,
                searchInputFocus: true
            })
        }
    }

    makeSearchTextStateEmpty = () => {
        this.setState({ searchText: 'Invalid City' })
    }

    //City Search Ends

    onClickLoadMore = () => {
        let nextPage = this.state.currentPage + 1
        this.setState({ currentPage: nextPage, isNextPageLoading: true })
        if (this.state.finalSearchQuery) {
            this.props.loadMore(this.state.finalSearchQuery + "&page=" + nextPage + "&limit=" + PageLimit)
                .then(response => {
                    this.setState({ isNextPageLoading: false })
                }).catch(error => {
                    this.setState({ isNextPageLoading: false })
                })
        } else {
            this.props.loadMore("page=" + nextPage + "&limit=" + PageLimit)
                .then(response => {
                    this.setState({ isNextPageLoading: false })
                }).catch(error => {
                    this.setState({ isNextPageLoading: false })
                })
        }
    }

    onSelectClassifiedFilter = (event) => {
        let userSearch = {
            selectedCity: this.props.selectedCity,
            selectedCompensation: this.props.selectedCompensation,
            selectedFilter: this.props.selectedFilter,
            selectedQuery: this.props.selectedQuery,
            selectedCompany: this.props.selectedCompany
        }
        if ($(`#${event.target.id}`).hasClass('active')) {
            this.props.storeUserSearch({ selectedClassified: false })
            this.onSubmitSearch({ ...userSearch, selectedClassified: false })
        }
        else {
            this.props.storeUserSearch({ selectedClassified: true })
            this.onSubmitSearch({ ...userSearch, selectedClassified: true })
        }
    }

    onSelectCompanyFilter = (event) => {
        let userSearch = {
            selectedCity: this.props.selectedCity,
            selectedCompensation: this.props.selectedCompensation,
            selectedFilter: this.props.selectedFilter,
            selectedQuery: this.props.selectedQuery,
            selectedClassified: this.props.selectedClassified
        }
        if ($(`#${event.target.id}`).hasClass('active')) {
            this.props.storeUserSearch({ selectedCompany: false })
            this.onSubmitSearch({ ...userSearch, selectedCompany: false })
        }
        else {
            this.props.storeUserSearch({ selectedCompany: true })
            this.onSubmitSearch({ ...userSearch, selectedCompany: true })
        }
    }

    onSelectFilter = (event, category) => {
        let userSearch = {
            selectedCity: this.props.selectedCity,
            selectedClassified: this.props.selectedClassified,
            selectedCompensation: this.props.selectedCompensation,
            selectedQuery: this.props.selectedQuery
        }
        let elementId = event.target.id
        let selectedFilterArray = [...this.props.selectedFilter]
        if ($(`#${elementId}`).hasClass('active') || selectedFilterArray.includes(category.id)) {
            selectedFilterArray = selectedFilterArray.filter(item => item != category.id)
        }
        else {
            selectedFilterArray = [...selectedFilterArray, category.id]
        }
        this.props.storeUserSearch({ ...userSearch, selectedFilter: selectedFilterArray })
        this.onSubmitSearch({ filters: selectedFilterArray })
    }

    onSelectCompensation = (e, compensationId) => {
        let userSearch = {
            selectedCity: this.props.selectedCity,
            selectedClassified: this.props.selectedClassified,
            selectedFilter: this.props.selectedFilter,
            selectedQuery: this.props.selectedQuery
        }
        if (!e.blockToggle) {
            window.$('.checkbox_list.collapse').collapse('show')
        }
        let index = this.props.compensations.findIndex(item => item.name.toLowerCase().includes('get creative'))
        let filteredCompensation = this.props.compensations[index]
        if (e.target.checked) {
            if (filteredCompensation.id.toString() === compensationId.toString()) {
                this.props.storeUserSearch({ ...userSearch, selectedCompensation: [compensationId] })
            } else {
                let selectedCompensation = [...this.props.selectedCompensation]
                let index = null
                selectedCompensation.map((item, i) => {
                    if (item === filteredCompensation.id) {
                        index = i.toString()
                    }
                })
                if (index) {
                    selectedCompensation.splice(index, 1)
                }
                this.props.storeUserSearch({ ...userSearch, selectedCompensation: [...selectedCompensation, compensationId] })
            }
        }
        else {
            let selectedCompensation = [...this.props.selectedCompensation]
            selectedCompensation = selectedCompensation.filter(item => item != compensationId)
            this.props.storeUserSearch({ ...userSearch, selectedCompensation: selectedCompensation })
        }
    }

    toggleCompensationDropdown = () => {
        if ($('.checkbox_list.collapse').hasClass('show')) {
            window.$('.checkbox_list.collapse').collapse('hide');
        } else {
            window.$('.checkbox_list.collapse').collapse('show')
        }
    }

    toggleCityDropdown = () => {
        if ($('.city_list.collapse').hasClass('show')) {
            window.$('.city_list.collapse').collapse('hide');
        } else {
            window.$('.city_list.collapse').collapse('show')
        }
    }

    onClickCards = (details) => {
        let route = routes.LOGIN
        storage.set("D_id", details.id)
        storage.set("D_type", details.type)
        if (this.props.user) {
            route = `${details.type}/${details.id}/details`
        }
        this.props.storeServiceDetails(details)
        this.props.history.push(route)
        this.props.navigateToDetails(true)
    }

    onShuffleCards = () => {
        let arrayLength = this.props.searchResults.length;
        let searchArray = [...this.props.searchResults]
        let temp;
        let index;
        if (arrayLength > 0) {
            while (0 != index) {
                index = Math.floor(Math.random() * arrayLength)
                arrayLength--
                temp = searchArray[arrayLength]
                searchArray[arrayLength] = searchArray[index]
                searchArray[index] = temp
            }
            this.props.shuffleSearchResults(searchArray)
        }
        // this.setState({ searchResults: searchArray })
    }

    resetSearch = () => {
        let userSearch = {
            selectedClassified: false,
            selectedCompensation: null,
            selectedFilter: null,
            selectedQuery: null,
            selectedCity: null
        }
        this.props.storeUserSearch(userSearch)
        this.setState({ currentPage: 1 })
        this.setState({ finalSearchQuery: null })
        this.props.search("page=1" + "&limit=" + PageLimit)
    }

    onSubmitSearch = (values) => {
        this.setState({ currentPage: 1 })
        let search = null
        let selectedSearch = {
            query: null,
            city: null
        }
        let userSearch = {
            selectedFilter: [],
            selectedCompensation: [],
            selectedClassified: false,
            selectedCity: null,
            selectedQuery: null,
            selectedCompany: false
        }
        if (values && values.city) {
            search = "city=" + values.city
            this.setState({ selectedCity: values.city })
            selectedSearch.city = values.city
            userSearch.selectedCity = values.city
        } else if (this.props.selectedCity && values.city !== '') {
            selectedSearch.city = this.props.selectedCity
            userSearch.selectedCity = this.props.selectedCity
            search = "city=" + this.props.selectedCity
        } else if (values.city === "") {
            userSearch.selectedCity = values.city
        }
        if (values && values.query) {
            if (search) {
                search = search + "&query=" + values.query
            } else {
                search = "query=" + values.query
            }
            userSearch.selectedQuery = values.query
            selectedSearch.query = values.query
        } else if (this.props.selectedQuery && values.query !== "") {
            if (search) {
                search = search + "&query=" + this.props.selectedQuery
            } else {
                search = "query=" + this.props.selectedQuery
            }
            selectedSearch.query = this.props.selectedQuery
            userSearch.selectedQuery = this.props.selectedQuery
        }
        else {
            userSearch.selectedQuery = null
        }
        if (this.props.selectedCompensation && this.props.selectedCompensation.length > 0) {
            this.props.selectedCompensation.map((compensation, index) => {
                if (search) {
                    search = search + "&compensation_ids[]=" + compensation
                } else {
                    search = "compensation_ids[]=" + compensation
                }
            })
            userSearch.selectedCompensation = this.props.selectedCompensation
        }
        if (values.filters && values.filters.length > 0) {
            values.filters.map((filter, index) => {
                if (search) {
                    search = search + "&category_ids[]=" + filter
                } else {
                    search = "category_ids[]=" + filter
                }
            })
            userSearch.selectedFilter = values.filters
        }
        else if (values.filters && values.filters.length === 0) {
            this.setState({ selectedFilter: values.filters })
            userSearch.selectedFilter = values.filters
        } else if (this.props.selectedFilter && this.props.selectedFilter.length > 0) {
            this.props.selectedFilter.map((filter, index) => {
                if (search) {
                    search = search + "&category_ids[]=" + filter
                } else {
                    search = "category_ids[]=" + filter
                }
            })
            userSearch.selectedFilter = this.props.selectedFilter
        }
        if (values.selectedClassified) {
            if (search) {
                search = search + "&classified=" + values.selectedClassified
            } else {
                search = "classified=" + values.selectedClassified
            }
            userSearch.selectedClassified = values.selectedClassified
        }
        else if (this.props.selectedClassified && (values.filters || (values.query || values.city))) {
            if (search) {
                search = search + "&classified=" + this.props.selectedClassified
            } else {
                search = "classified=" + this.props.selectedClassified
            }
            userSearch.selectedClassified = this.props.selectedClassified
        }
        if (values.selectedCompany) {
            if (search) {
                search = search + "&company=" + values.selectedCompany
            } else {
                search = "company=" + values.selectedCompany
            }
            userSearch.selectedCompany = values.selectedCompany
        }
        else if (this.props.selectedCompany && (values.filters || (values.query || values.city))) {
            if (search) {
                search = search + "&company=" + this.props.selectedCompany
            } else {
                search = "company=" + this.props.selectedCompany
            }
            userSearch.selectedCompany = this.props.selectedCompany
        }
        if (search) {
            this.setState({ finalSearchQuery: search })
            search = search + "&page=1" + "&limit=" + PageLimit
        } else {
            this.setState({ finalSearchQuery: search })
            search = "page=1" + "&limit=" + PageLimit
        }
        if (this.props.user) {
            this.props.storeUserSearch(userSearch)
            this.props.search(search)
        } else {
            this.props.history.push(routes.HOME, { searchQuery: search, selectedSearch: selectedSearch })
        }
        // this.props.search(search)
    }

    addDeckClicked = (service) => {
        this.props.addDeckClicked(service);
    }

    createClassifiedAdd = (val) => {
        this.props.history.push(routes.CLASSIFIEDS);
        this.props.createClassifiedAddClicked(val)
    }

    render() {
        if (this.props.compensations && this.props.compensations.length > 0) {
            this.props.compensations.sort((a, b) => {
                if (a.name.toLowerCase().includes('get creative')) {
                    return 1
                }
                else if (b.name.toLowerCase().includes('get creative')) {
                    return -1
                }
                else {
                    return 0
                }
            })
        }
        if (this.state.showPageLoader) {
            return <PageLoader />
        }
        return (
            <Oux>
                <SearchSection
                    cities={this.props.cities}
                    toggleCompensationDropdown={this.toggleCompensationDropdown}
                    showCompensationDropdown={this.state.showCompensationDropdown}
                    onSelectCompensation={this.onSelectCompensation}
                    compensations={this.props.compensations}
                    isSearchLoading={this.props.isSearchLoading}
                    onSubmitSearch={this.onSubmitSearch}
                    onShuffleCards={this.onShuffleCards}
                    onSelectClassifiedFilter={this.onSelectCompanyFilter}
                    toggleCityDropdown={this.toggleCityDropdown}
                    setWrapperRef={this.setWrapperRef}
                    selectedCompany={this.props.selectedCompany}
                    onCityFocusHandler={this.onCityFocusHandler}
                    onCitySearchTextChangeHandler={this.onCitySearchTextChangeHandler}
                    searchText={this.state.searchText}
                    resetSearch={this.resetSearch}
                    searchInputFocus={this.state.searchInputFocus}
                    selectedCityHandler={this.selectedCityHandler}
                    city_list={this.props.city_list}
                    history={this.props.history}
                    storeUserSearch={this.props.storeUserSearch}
                    selectedCity={this.props.selectedCity}
                    selectedQuery={this.props.selectedQuery}
                    makeSearchTextStateEmpty={this.makeSearchTextStateEmpty}
                    selectedCompensation={this.props.selectedCompensation}
                    user={this.props.user} />
                <ServiceSection
                    search={this.props.search}
                    onShuffleCards={this.onShuffleCards}
                    onSelectClassifiedFilter={this.onSelectClassifiedFilter}
                    onSelectCompanyFilter={this.onSelectCompanyFilter}
                    onSelectFilter={this.onSelectFilter}
                    selectedCompany={this.props.selectedCompany}
                    selectedFilter={this.props.selectedFilter}
                    isSearchLoading={this.props.isSearchLoading}
                    categories={this.props.categories}
                    selectedClassified={this.props.selectedClassified}
                    searchResults={this.props.searchResults}
                    history={this.props.history}
                    createClassifiedAdd={this.createClassifiedAdd}
                    resetSearch={this.resetSearch}
                    user={this.props.user} />
                <HomePage
                    searchResults={this.props.searchResults}
                    onClickLoadMore={this.onClickLoadMore}
                    history={this.props.history}
                    getShareURL={this.props.getShareURL}
                    featuredTalentProfile={this.props.featuredTalentProfile}
                    onClickCards={this.onClickCards}
                    addDeckClicked={this.addDeckClicked}
                    error={this.props.error}
                    isAuthLoading={this.props.isAuthLoading}
                    success_stories={this.props.success_stories}
                    isSearchLoading={this.props.isSearchLoading || this.state.isLoading}
                    isNextPageLoading={this.state.isNextPageLoading}
                    storeFullDescription={this.props.storeFullDescription}
                    currentPage={this.state.currentPage}
                    user={this.props.user} />
            </Oux>
        );
    }
}



const mapStateToProps = (state) => ({
    user: state.authReducer.user,
    token: state.authReducer.token,
    categories: state.configReducer.categories,
    cities: state.configReducer.cities,
    compensations: state.configReducer.compensations,
    isAuthLoading: state.authReducer.isloading,
    isSearchLoading: state.miscReducer.isloading,
    searchResults: state.miscReducer.searchResult,
    featuredTalentProfile: state.miscReducer.featuredTalent,
    isNavigateToDetails: state.userReducer.navigateToDetails,
    navigationServiceDetail: state.userReducer.navigationServiceDetail,
    deckList: state.userReducer.deckList,
    selectedCompensation: state.miscReducer.selectedCompensation,
    selectedFilter: state.miscReducer.selectedFilter,
    selectedQuery: state.miscReducer.selectedQuery,
    selectedCity: state.miscReducer.selectedCity,
    selectedClassified: state.miscReducer.selectedClassified,
    selectedCompany: state.miscReducer.selectedCompany,
    city_list: state.configReducer.city_list,
    success_stories: state.configReducer.success_stories,
    error: state.miscReducer.error
});

const mapStateToDispatch = (dispatch) => ({
    search: (search) => dispatch(actions.search(search)),
    featuredTalent: () => dispatch(actions.featuredTalent()),
    loadMore: (search) => dispatch(actions.loadMore(search)),
    shuffleSearchResults: (shuffleResultsArray) => dispatch(actions.shuffleSearchResults(shuffleResultsArray)),
    addDeckClicked: (service) => dispatch(actions.addDeckClicked(service)),
    navigateToDetails: (flag) => dispatch(actions.navigateToDetails(flag)),
    getDeckList: () => dispatch(actions.getDeckList()),
    getShareURL: (url, service) => dispatch(actions.shareURL(url, service)),
    fetchCurrentUser: () => dispatch(actions.fetchCurrentUser()),
    storeServiceDetails: (details) => dispatch(actions.storeServiceDetails(details)),
    storeUserSearch: (userSearch) => dispatch(actions.storeUserSearch(userSearch)),
    storeFullDescription: (description, descriptionTitle) => dispatch(actions.storeFullDescription(description, descriptionTitle)),
    createClassifiedAddClicked: (value) => dispatch(actions.createClassifiedAddClicked(value)),
    logout: () => dispatch(actions.logout()),
    // signout: () => dispatch(actions.signout())
});

export default connect(mapStateToProps, mapStateToDispatch)(withRouter(Home));


