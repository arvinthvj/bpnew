import React from "react";
import AllOffersContainer from "./AllOffers/AllOffers";
import PlaceContainer from "../Offers/Places/Places";
import ThingsContainer from "../Offers/Things/Things";
import JobsContainer from "../Offers/Jobs/Jobs";
import OpportunitiesContainer from "../Offers/Opportunities/Opportunities";
import DonationsAndGiveawaysContainer from "../Offers/DonationsAndGiveaways/DonationsAndGiveaways";
import { connect } from "react-redux";
import {
    Categories,
    routes,
    CategoriesList,
    walkThroughTypes,
} from "../../utility/constants/constants";
import { OffersTabsSkeleton } from "../../components/Skeletons/offersSkeleton";
import Oux from "../../hoc/Oux/Oux";
import * as actions from "../../redux/actions";
import { withRouter } from "react-router-dom";
import CustomToolTip from "../../components/UI/CustomToolTip/CustomToolTip";
import $ from "jquery";
import storage from "../../utility/storage";

// const categoriesList = (props) => {
//   const categoryNavigtion = (Name) => {
//     if (Categories.MY_SERVICES === Name) {
//       props.history.push(routes.MY_SERVICES);
//     } else if (Categories.PLACES === Name) {
//       props.history.push(routes.PLACES);
//     } else if (Categories.THINGS === Name) {
//       props.history.push(routes.THINGS);
//     } else if (Categories.JOBS_GIGS === Name) {
//       props.history.push(routes.JOBS);
//     } else if (Categories.SHARING_OPPORTUNITIES === Name) {
//       props.history.push(routes.SHARING_OPPORTUNITIES);
//     } else if (Categories.DONATIONS === Name) {
//       props.history.push(routes.DONATIONS_GIVEAWAYS);
//     }
//   };

//   const activeClass = (Name) => {
//     if (
//       (props.location.pathname === routes.MY_SERVICES ||
//         props.location.pathname === routes.OFFERS) &&
//       Categories.MY_SERVICES === Name
//     ) {
//       return "nav-link active";
//     } else if (
//       props.location.pathname === routes.PLACES &&
//       Categories.PLACES === Name
//     ) {
//       return "nav-link active";
//     } else if (
//       props.location.pathname === routes.THINGS &&
//       Categories.THINGS === Name
//     ) {
//       return "nav-link active";
//     } else if (
//       props.location.pathname === routes.JOBS &&
//       Categories.JOBS_GIGS === Name
//     ) {
//       return "nav-link active";
//     } else if (
//       props.location.pathname === routes.SHARING_OPPORTUNITIES &&
//       Categories.SHARING_OPPORTUNITIES === Name
//     ) {
//       return "nav-link active";
//     } else if (
//       props.location.pathname === routes.DONATIONS_GIVEAWAYS &&
//       Categories.DONATIONS === Name
//     ) {
//       return "nav-link active";
//     } else {
//       return "nav-link";
//     }
//   };

//   return (
//     <Oux>
//       <li class="nav-item category_tab_list">
//         <a class="nav-link" href="javascript:void(0)">
//           Categories:
//         </a>
//       </li>
//       {props.categories &&
//         props.categories.map((category) => {
//           let tooltipText = null;
//           let categoryName = null;
//           if (
//             category.name.toLowerCase() === CategoriesList.PEOPLE.toLowerCase()
//           ) {
//             tooltipText = "Networking and Connections";
//           } else if (
//             category.name.toLowerCase() === CategoriesList.PLACES.toLowerCase()
//           ) {
//             tooltipText = "Physical Locations";
//           } else if (
//             category.name.toLowerCase() === CategoriesList.THING.toLowerCase()
//           ) {
//             tooltipText = "Physical Objects";
//           } else if (
//             category.name.toLowerCase() === CategoriesList.JOB.toLowerCase()
//           ) {
//             tooltipText = "Skills, Expertise and Talent";
//             categoryName = "Services";
//           } else if (
//             category.name.toLowerCase() ===
//             CategoriesList.OPPORTUNITY.toLowerCase()
//           ) {
//             tooltipText = "eBooks, Tutorials, White Papers, etc.";
//             categoryName = "Information";
//           } else if (
//             category.name.toLowerCase() ===
//             CategoriesList.DONATION.toLowerCase()
//           ) {
//             tooltipText = "Anything That Doesn't Fit Another Category";
//             categoryName = "Other/Misc";
//           }
//           return (
//             <Oux>
//               {tooltipText ? (
//                 <CustomToolTip placement="top" text={tooltipText}>
//                   <li
//                     style={
//                       props.addOrUpdateOrDeleteServiceLoading
//                         ? { pointerEvents: "none" }
//                         : null
//                     }
//                     className="nav-item"
//                     onClick={() => categoryNavigtion(category.name)}
//                   >
//                     <a
//                       className={activeClass(category.name)}
//                       id="pills-my-services-tab"
//                       id="offer_people_walk"
//                       onClick={() => {
//                         props.handleStepChange(2);
//                       }}
//                       data-toggle="pill"
//                       href="#pills-my-services"
//                       role="tab"
//                       aria-controls="pills-my-services"
//                       aria-selected="true"
//                     >
//                       {categoryName ? categoryName : category.name}
//                     </a>
//                   </li>
//                 </CustomToolTip>
//               ) : (
//                 <li
//                   style={
//                     props.addOrUpdateOrDeleteServiceLoading
//                       ? { pointerEvents: "none" }
//                       : null
//                   }
//                   className="nav-item"
//                   onClick={() => categoryNavigtion(category.name)}
//                 >
//                   <a
//                     className={activeClass(category.name)}
//                     id="pills-my-services-tab"
//                     data-toggle="pill"
//                     href="#pills-my-services"
//                     role="tab"
//                     aria-controls="pills-my-services"
//                     aria-selected="true"
//                   >
//                     {categoryName ? categoryName : category.name}
//                   </a>
//                 </li>
//               )}
//             </Oux>
//           );
//         })}
//     </Oux>
//   );
// };

class Offers extends React.Component {
    componentDidMount = () => {
        let isSignedUp = storage.get('isSignedUp', null)
        let QS = new URLSearchParams(this.props.history.location.search, {
            ignoreQueryPrefix: true,
        }).get("qs");
        let wp_id = storage.get('wp_id', null)
        if (QS) {
            $("#click").click();
        }
        if (isSignedUp) {
            window.$('#welcome_modal').modal() //Show this on signup
            storage.remove('isSignedUp')
            storage.remove('wp_id')
            storage.set(
                "activeTour",
                walkThroughTypes.PRIMARY_PROFILE_CREATE.title
            );
            this.props.updateAccountInfo({ user: { wordpress_user_id: wp_id } })
        }

    };

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

    render() {
        const currentPath = this.props.location.pathname;
        let categorieId = null;
        let compensations = [];
        this.props.categories.forEach((categorie) => {
            if (
                categorie.name === this.props.selectedCategory
            ) {
                categorieId = categorie.id;
                compensations = categorie.compensations;
            } else if (
                categorie.name === this.props.selectedCategory
            ) {
                categorieId = categorie.id;
                compensations = categorie.compensations;
            } else if (
                categorie.name === this.props.selectedCategory
            ) {
                categorieId = categorie.id;
                compensations = categorie.compensations;
            } else if (
                categorie.name === this.props.selectedCategory
            ) {
                categorieId = categorie.id;
                compensations = categorie.compensations;
            } else if (
                categorie.name === this.props.selectedCategory
            ) {
                categorieId = categorie.id;
                compensations = categorie.compensations;
            } else if (
                categorie.name === this.props.selectedCategory
            ) {
                categorieId = categorie.id;
                compensations = categorie.compensations;
            }
        });

        const renderCategories = () => {
            return (
                <AllOffersContainer
                    {...this.props}
                    compensations={compensations}
                    categorieId={categorieId}
                    categories={this.props.categories}
                    onClickCards={this.onClickCards}
                />
            );
            // else if (this.props.selectedCategory === Categories.PLACES) {
            //   return (
            //     <PlaceContainer
            //       {...this.props}
            //       compensations={compensations}
            //       categorieId={categorieId}
            //       categories={this.props.categories}
            //     />
            //   );
            // } else if (this.props.selectedCategory === Categories.THINGS) {
            //   return (
            //     <ThingsContainer
            //       {...this.props}
            //       compensations={compensations}
            //       categorieId={categorieId}
            //       categories={this.props.categories}
            //     />
            //   );
            // } else if (this.props.selectedCategory === Categories.JOBS_GIGS) {
            //   return (
            //     <JobsContainer
            //       {...this.props}
            //       compensations={compensations}
            //       categorieId={categorieId}
            //       categories={this.props.categories}
            //     />
            //   );
            // } else if (this.props.selectedCategory === Categories.SHARING_OPPORTUNITIES) {
            //   return (
            //     <OpportunitiesContainer
            //       {...this.props}
            //       compensations={compensations}
            //       categorieId={categorieId}
            //       categories={this.props.categories}
            //     />
            //   );
            // } else if (this.props.selectedCategory === Categories.DONATIONS) {
            //   return (
            //     <DonationsAndGiveawaysContainer
            //       {...this.props}
            //       compensations={compensations}
            //       categorieId={categorieId}
            //       categories={this.props.categories}
            //     />
            //   );
            // }
        };

        if (this.props.categories && this.props.categories.length > 0) {
            return (
                <section className="ph_main_sec pt_83 my_offers_ser_sec">
                    <div className="container-fluid theme_px_60">
                        <div className="ph_hz_tabs_wrp">
                            <div className="offers_tabs_select_dk">
                                <div class="ph_flex_wrp_spw ph_category_wrp">
                                    <ul className="nav nav-pills mb-3 wow fadeInUp" id="pills-tab" role="tablist">
                                        {/* {categoriesList(this.props)} */}
                                    </ul>
                                </div>
                                <div className="tab-content tab-content-full" id="pills-tabContent">
                                    {renderCategories()}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            );
        } else {
            return (
                <section className="ph_main_sec pt_83 my_offers_ser_sec">
                    <div className="container-fluid theme_px_60">
                        <div className="ph_hz_tabs_wrp">
                            <div className="offers_tabs_select_dk">
                                <OffersTabsSkeleton />
                            </div>
                        </div>
                    </div>
                </section>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.authReducer.user,
        token: state.authReducer.token,
        categories: state.configReducer.categories,
        addOrUpdateOrDeleteServiceLoading:
        state.userReducer.addOrUpdateOrDeleteServiceLoading,
        goToStep: state.walkThroughReducer.goToStep,
        selectedCategory: state.offersReducer.selected_category,
        isNavigateToDetails: state.userReducer.navigateToDetails,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        handleStepChange: (steps) => dispatch(actions.handleStepChange(steps)),
        setSelectedCategory: (category) =>
            dispatch(actions.setSelectedCategory(category)),
        updateAccountInfo: (user) => dispatch(actions.updateAccountInfo(user)),
        storeServiceDetails: (details) => dispatch(actions.storeServiceDetails(details)),
        navigateToDetails: (flag) => dispatch(actions.navigateToDetails(flag)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Offers);
