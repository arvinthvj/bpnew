import React, { Component } from 'react'
import ExperienceForm from '../../../components/ProfileSection/ExperienceForm/ExperienceForm'
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions/index'
import { routes } from '../../../utility/constants/constants';
import storage from '../../../utility/storage';

class ExperiencePortfolio extends Component {

    componentDidMount = () => {
        if (!this.props.history.location.state || (this.props.history.location.state && !this.props.history.location.state.isSigningUp)) {
            this.props.history.push(routes.HOME)
        }
        storage.set('isSignedUp', true)
    }

    render() {
        return (
            <section className="ph_main_sec pt_83 addd_experience_form ph_profile_sec">
                <div className="wrap-login100">
                    <ExperienceForm
                        user={this.props.user}
                        profileId={this.props.user.primary_profile_id}
                        isLoading={this.props.isAuthLoading || this.props.isLoading}
                        createExperience={this.props.createExperience}
                        history={this.props.history} />
                </div>
            </section>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.authReducer.user,
    isLoading: state.profileReducer.isloading,
    isAuthLoading: state.authReducer.isloading
});

const mapStateToDispatch = (dispatch) => ({
    createExperience: (profileId, experience) => dispatch(actions.createExperience(profileId, experience))
});

export default connect(mapStateToProps, mapStateToDispatch)(ExperiencePortfolio)