import React from 'react';
import DeckComponent from '../../components/Decks/DeckComponent';
import { connect } from 'react-redux';
import DecksSkeleton from '../../components/Skeletons/deckSkeleton';
import * as actions from '../../redux/actions/index';

class Decks extends React.Component {

    componentDidMount = () => {
        this.props.fetchCurrentUser()
        this.props.getDecks();
    }

    getDecksList = () => {
        const deckObject = this.props.deck;
        return this.props.deckList && this.props.deckList.map((deck, i) => {
            return (
                <li className={"nav-item"}
                    onClick={() => this.props.filterDeckClicked(deck)}>
                    <a className={deckObject ?
                        this.props.deck.id === deck.id ? "nav-link active" : "nav-link "
                        : i === 0 ? "nav-link active" : "nav-link"} id="pills-places-tab" data-toggle="pill" href="#pills-places" role="tab" aria-controls="pills-places" aria-selected="false">{deck.name}</a>
                </li>
            )
        })
    }

    deleteDeck = (id) => {
        this.props.deleteDeck(id);
    }

    onClickCards = (service) => {
        // let route = routes.LOGIN
        // storage.set("D_id", service.id)
        // storage.set("D_type", service.type)
        // if (this.props.user) {
        // route = `${service.type}/${service.id}/details`
        // }

        // this.props.storeServiceDetails(service)
        this.props.history.push(`${service.type}/${service.id}/details`)
        // this.props.navigateToDetails(true)
    }

    render() {

        return (
            !this.props.deckList || this.props.isDeckLoading ?
                <section className="ph_main_sec pt_83 ph_filter_sec all_decks_sec">
                    <div className="container-fluid theme_px_60 ">
                        <DecksSkeleton />
                    </div>
                </section>
                :
                <>
                    <section className="ph_main_sec pt_83 ph_filter_sec all_decks_sec ">
                        <div className="container-fluid theme_px_60 ">
                            <ul className="nav nav-pills mb-3 wow fadeInUp" id="pills-tab" role="tablist">
                                {this.getDecksList()}
                            </ul>
                            {/* {this.props.deckList && this.props.deckList.length > 0 ?
                                <a href="#" class="text-uppercase fontS13 filter_delete">
                                    <img src="/images/icons/icn_trash_black.svg" alt="Delete" />
                                </a>
                                : null} */}
                        </div>
                    </section>
                    <DeckComponent
                        user={this.props.user}
                        deleteDeck={this.deleteDeck}
                        deleteParticularOfferFromDeckList={this.props.deleteParticularOfferFromDeckList}
                        onClickCards={this.onClickCards}
                        getShareURL={this.props.getShareURL}
                        deck={this.props.deck ? this.props.deck : this.props.deckList.length > 0 ? this.props.deckList[0] : {}}
                    />
                </>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        user: state.authReducer.user,
        deckList: state.userReducer.deckList,
        isDeckLoading: state.userReducer.isDeckLoading,
        deck: state.userReducer.deck
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getDecks: () => dispatch(actions.getDeckList()),
        filterDeckClicked: (deck) => dispatch(actions.filterDeckClicked(deck)),
        deleteDeck: (id) => dispatch(actions.deleteDeck(id)),
        storeServiceDetails: (service) => dispatch(actions.storeServiceDetails(service)),
        deleteParticularOfferFromDeckList: (deckId, offerId) => dispatch(actions.deleteParticularOfferFromDeckList(deckId, offerId)),
        getShareURL: (url, service) => dispatch(actions.shareURL(url, service)),
        fetchCurrentUser: () => dispatch(actions.fetchCurrentUser()),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Decks);