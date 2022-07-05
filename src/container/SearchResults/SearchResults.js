import React, { Component } from 'react'
import SearchResultsPage from '../../components/SearchResultsPage/SearchResultsPage'
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index'
import { routes, PageLimit } from '../../utility/constants/constants';
import $ from 'jquery'
import { maintainCardHeight } from '../../styles/js/custom';
import storage from '../../utility/storage';

class SearchResults extends Component {
    state = {
        showCompensationDropdown: false,
        finalSearchQuery: null,
        isNextPageLoading: false,
        currentPage: 1,
        isLoading: true,
        searchText: '',
        searchInputFocus: false,
    }

    componentWillUnmount = () => {
        document.removeEventListener('mousedown', this.handleClickOutsideServicelist);
    }

    componentDidMount = () => {
        maintainCardHeight()
        if (this.props.history.location.state && this.props.history.location.state.searchQuery) {
            this.props.search(this.props.history.location.state.searchQuery)
                .then(response => {
                    this.setState({ isLoading: false })
                }).catch(error => {
                    this.setState({ isLoading: false })
                })
            this.props.storeUserSearch({
                selectedCity: this.props.history.location.state.selectedSearch.city,
                selectedQuery: this.props.history.location.state.selectedSearch.query
            })
        } else {
            this.props.history.push(routes.ROOT)
        }
    }

    componentDidUpdate(prevProps, prevState) {
        maintainCardHeight()
        if ((this.props.cities && this.props.cities.length > 0)) {
            if ((!this.props.searchResults) && this.props.user) {
                this.props.search("page=" + this.state.currentPage + "&limit=" + PageLimit)
                    .then(response => {
                        this.setState({ isLoading: false })
                    }).catch(error => {
                        this.setState({ isLoading: false })
                    })
            }
        } else if (this.state.isLoading) {
            this.setState({ isLoading: false })
        }
    }

    makeSearchTextStateEmpty = () => {
        this.setState({ searchText: 'Invalid City' })
    }

    // City Search Starts

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
        this.setState({
            ...this.state,
            searchText: text,
            // selectedSkills: null,
            searchInputFocus: true
        })
    }

    //City Search Ends

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
        if (e.target.checked) {
            this.props.storeUserSearch({ ...userSearch, selectedCompensation: [...this.props.selectedCompensation, compensationId] })
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

    onClickCards = (details) => {
        storage.set("D_id", details.id)
        storage.set("D_type", details.type ? details.type : "profile")
        this.props.storeServiceDetails(details)
        this.props.history.push(routes.LOGIN)
        storage.set("D_route", `${details.type ? details.type : "profile"}/${details.id}/details`)
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
        this.props.shuffleSearchResults(searchArray)
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
        this.props.storeUserSearch(userSearch)
        if (search) {
            this.setState({ finalSearchQuery: search })
            search = search + "&page=1" + "&limit=" + PageLimit
        } else {
            this.setState({ finalSearchQuery: search })
            search = "page=1" + "&limit=" + PageLimit
        }
        this.props.search(search)
    }

    createClassifiedAdd = (val) => {
        this.props.history.push(routes.LOGIN);
        storage.set('navigate_to_classified', true)
        storage.set('navigate_to_classified_val', val)
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
        return (
            <SearchResultsPage
                cities={this.props.cities}
                toggleCompensationDropdown={this.toggleCompensationDropdown}
                onSelectCompensation={this.onSelectCompensation}
                onSelectClassifiedFilter={this.onSelectClassifiedFilter}
                onSelectFilter={this.onSelectFilter}
                onSubmitSearch={this.onSubmitSearch}
                onShuffleCards={this.onShuffleCards}
                toggleCityDropdown={this.toggleCityDropdown}
                onClickLoadMore={this.onClickLoadMore}
                onClickCards={this.onClickCards}
                createClassifiedAdd={this.createClassifiedAdd}
                compensations={this.props.compensations}
                isSearchLoading={this.props.isSearchLoading || this.state.isLoading}
                showCompensationDropdown={this.state.showCompensationDropdown}
                history={this.props.history}
                getShareURL={this.props.getShareURL}
                searchResults={this.props.searchResults}
                selectedClassified={this.props.selectedClassified}
                selectedCompensation={this.props.selectedCompensation}
                selectedFilter={this.props.selectedFilter}
                onSelectCompanyFilter={this.onSelectCompanyFilter}
                selectedCompany={this.props.selectedCompany}
                selectedCity={this.props.selectedCity}
                selectedQuery={this.props.selectedQuery}
                user={this.props.user}
                resetSearch={this.resetSearch}
                search={this.props.search}
                currentPage={this.state.currentPage}
                categories={this.props.categories}
                isNextPageLoading={this.state.isNextPageLoading}
                currentPage={this.state.currentPage}
                setWrapperRef={this.setWrapperRef}
                onCityFocusHandler={this.onCityFocusHandler}
                onCitySearchTextChangeHandler={this.onCitySearchTextChangeHandler}
                searchText={this.state.searchText}
                addDeckClicked={this.props.addDeckClicked}
                searchInputFocus={this.state.searchInputFocus}
                makeSearchTextStateEmpty={this.makeSearchTextStateEmpty}
                selectedCityHandler={this.selectedCityHandler}
                city_list={this.props.city_list}
                user={this.props.user} />
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.authReducer.user,
    categories: state.configReducer.categories,
    cities: state.configReducer.cities,
    compensations: state.configReducer.compensations,
    isSearchLoading: state.miscReducer.isloading,
    searchResults: state.miscReducer.searchResult,
    isAuthLoading: state.authReducer.isloading,
    selectedCompensation: state.miscReducer.selectedCompensation,
    selectedFilter: state.miscReducer.selectedFilter,
    selectedQuery: state.miscReducer.selectedQuery,
    selectedCity: state.miscReducer.selectedCity,
    selectedClassified: state.miscReducer.selectedClassified,
    selectedCompany: state.miscReducer.selectedCompany,
    city_list: state.configReducer.city_list
});

const mapStateToDispatch = (dispatch) => ({
    search: (search) => dispatch(actions.search(search)),
    loadMore: (search) => dispatch(actions.loadMore(search)),
    shuffleSearchResults: (shuffleResultsArray) => dispatch(actions.shuffleSearchResults(shuffleResultsArray)),
    navigateToDetails: (flag) => dispatch(actions.navigateToDetails(flag)),
    getShareURL: (url, service) => dispatch(actions.shareURL(url, service)),
    storeServiceDetails: (details) => dispatch(actions.storeServiceDetails(details)),
    addDeckClicked: (service) => dispatch(actions.addDeckClicked(service)),
    storeUserSearch: (userSearch) => dispatch(actions.storeUserSearch(userSearch)),
    createClassifiedAddClicked: (value) => dispatch(actions.createClassifiedAddClicked(value))
});

export default connect(mapStateToProps, mapStateToDispatch)(SearchResults)