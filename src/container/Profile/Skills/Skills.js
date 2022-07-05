import React, { Component } from 'react'
import SkillsForm from '../../../components/ProfileSection/SkillsForm/SkillsForm'
import { connect } from 'react-redux'
import * as actions from '../../../redux/actions/index'
import { routes } from '../../../utility/constants/constants';


class Skills extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            selectedSkills: [],
            searchInputFocus: false,
            skills: []
        }
    }

    componentWillUnmount = () => {
        document.removeEventListener('mousedown', this.handleClickOutsideServicelist);
    }

    componentDidMount = () => {
        document.addEventListener('mousedown', this.handleClickOutsideServicelist);
        if ((this.props.skills && this.props.skills.length > 0) && (!this.state.skills || (this.state.skills && this.state.skills.length === 0))) {
            this.setState({
                skills: this.props.skills
            })
        }
        if (!this.props.history.location.state || (this.props.history.location.state && !this.props.history.location.state.isSigningUp)) {
            this.props.history.push(routes.HOME)
        }
    }

    componentDidUpdate = () => {
        if ((this.props.skills && this.props.skills.length > 0) && (!this.state.skills || (this.state.skills && this.state.skills.length === 0))) {
            this.setState({
                skills: this.props.skills
            })
        }
    }

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

    selectedSkillHandler = (skill) => {
        console.log(skill.name);
        let selectedSkill = {
            id: skill.id,
            name: skill.name
        }
        this.setState({
            ...this.state,
            selectedSkills: [...this.state.selectedSkills, selectedSkill],
            searchText: '',
            searchInputFocus: false,
        })
        let skillListArray = [...this.state.skills]
        let filteredSkillArray = skillListArray.filter(item => item.id !== skill.id)
        this.setState({
            skills: filteredSkillArray
        })
    }

    onSkillsFocusHandler = () => {
        this.setState({
            ...this.state,
            searchInputFocus: true,
        })
    }

    onSkillSearchTextChangeHandler = (e, setFieldValue) => {
        let text = e.target.value;
        this.setState({
            ...this.state,
            searchText: text,
            // selectedSkills: null,
            searchInputFocus: true
        })
        setFieldValue('skills', text)
    }

    onRemoveSelectedSkills = (index) => {
        let selectedSkillsArray = [...this.state.selectedSkills]
        let skillListArray = [...this.state.skills]
        let removedArray = selectedSkillsArray[index]
        let filteredSkillArray = [
            ...skillListArray,
            removedArray
        ]
        console.log(filteredSkillArray, "filtered")
        console.log(removedArray, "removed")
        selectedSkillsArray.splice(index, 1)
        this.setState({
            selectedSkills: selectedSkillsArray,
            skills: filteredSkillArray
        })
    }

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

    render() {
        return (
            <section className="ph_main_sec pt_83 ph_profile_sec" style={{ paddingTop: '10px' }}>
                <div className="wrap-login100">
                    <SkillsForm
                        searchText={this.state.searchText}
                        searchInputFocus={this.state.searchInputFocus}
                        onSkillsFocusHandler={this.onSkillsFocusHandler}
                        onSkillSearchTextChangeHandler={this.onSkillSearchTextChangeHandler}
                        setWrapperRef={this.setWrapperRef}
                        createSkills={this.props.createSkills}
                        selectedSkillHandler={this.selectedSkillHandler}
                        onRemoveSelectedSkills={this.onRemoveSelectedSkills}
                        selectedSkills={this.state.selectedSkills}
                        user={this.props.user}
                        profileId={this.props.user.primary_profile_id}
                        isLoading={this.props.isLoading || this.props.isAuthLoading}
                        skills={this.state.skills}
                        history={this.props.history} />
                </div>
            </section>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.authReducer.user,
    isLoading: state.profileReducer.isloading,
    isAuthLoading: state.authReducer.isloading,
    skills: state.configReducer.skills
});

const mapStateToDispatch = (dispatch) => ({
    createSkills: (profileId, skills) => dispatch(actions.createSkills(profileId, skills))
});

export default connect(mapStateToProps, mapStateToDispatch)(Skills)