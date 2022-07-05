import React, { Component } from 'react';
import ProfileSectionPage from '../../../components/ProfileSection/ProfileSectionPage/ProfileSectionPage';
import { routes, PROFILE_TYPES } from '../../../utility/constants/constants';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as actions from '../../../redux/actions/index';
import { resetOrientation, toastMsg, extractExtention } from '../../../utility/utility';
import imageCompression from 'browser-image-compression';
import getDetailAddress from '../../../utility/getDetailedAddress';
import { decode } from 'base64-arraybuffer';


class ManageProfileSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // Profile State Starts
            file: null,
            image: null,
            address: null,
            isProfileImageUploading: false,
            //Profile State Ends

            //Portfolio State Starts
            idsToDelete: [],
            imageUrl: null,
            imageName: [],
            base64: [],
            AllFileTypes: [],
            fileType: '',
            link_url: '',
            invalidPortfolioUrl: false,
            video_url: '',
            invalidVideoUrl: false,
            //Portfolio State Ends

            //Skills State Starts
            searchText: '',
            selectedSkills: [],
            searchInputFocus: false,
            skills: [],
            isSelectedSkillsUpdated: false,
            //Skills State Ends

            showEditForm: false,
            showAddForm: false,
            selectedProfileId: null,
        };
        this.onImageUpload = this.onImageUpload.bind(this);
        this.handleAddressSelect = this.handleAddressSelect.bind(this);
        this.selectedSkillHandler = this.selectedSkillHandler.bind(this);
    }

    componentWillUnmount = () => {
        document.removeEventListener('mousedown', this.handleClickOutsideServicelist);
    };

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutsideServicelist);
        let currentPath = this.props.history.location.pathname;
        if (currentPath === routes.MANAGE_PROFILE) {
            this.props.history.push(routes.MANAGE_ALL_PROFILE);
        }
        if (this.props.businessProfile && this.props.selectedBusinessProfileId) {
            this.setState({
                showEditForm: true,
                selectedProfileId: this.props.selectedBusinessProfileId,
            });
        }
        if (
            !this.state.selectedProfileId &&
            !this.props.selectedBusinessProfileId &&
            !this.props.history.location.state
        ) {
            this.props.history.push(routes.MANAGE_ALL_PROFILE);
        }
        if (
            this.props.skills &&
            this.props.skills.length > 0 &&
            (!this.state.skills || (this.state.skills && this.state.skills.length === 0))
        ) {
            this.setState({
                skills: this.props.skills,
            });
        }
        this.props.fetchCurrentUser();
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (
            this.props.skills &&
            this.props.skills.length > 0 &&
            (!this.state.skills || (this.state.skills && this.state.skills.length === 0))
        ) {
            this.setState({
                skills: this.props.skills,
            });
        }
    };

    /* Edit Profile Functions Starts */

    async onImageUpload(e) {
        if ((e.target && e.target.files && e.target.files.length > 0) || (e && e.length > 0)) {
            this.setIsProfileImageUploading(true);
            let reader = new FileReader();
            let file = e && e.target ? e.target.files[0] : e[0];
            let type = file.type;
            let extension = file.name.split('.').pop().toLowerCase();
            if (e && e.target) {
                e.target.value = ''
            }
            this.props.showImageCropModal({ extension: extension, imageToCrop: file, isWordpress: true })
            const orientation = await imageCompression.getExifOrientation(file);
            if (['image/png', 'image/jpeg', 'image/jpg'].includes(type)) {
                reader.onloadend = () => {
                    resetOrientation(reader.result, orientation, this, extension, file, true);

                    console.log(reader.result);
                    this.setState({
                        // image: reader.result,
                        file: file,
                    });

                    // image = reader.result.split(',');
                    // if (reader && reader.result) {
                    //     this.props.profilePhotoUpload(extension, decode(image[1]))
                    // }
                    // else {
                    //     this.props.profilePhotoUpload(extension)
                    // }
                };
                reader.readAsDataURL(file);
            } else {
                toastMsg('Please upload a valid image file!', true);
            }
        }
    }

    setIsProfileImageUploading = (value) => {
        this.setState({ isProfileImageUploading: value });
    };

    async handleAddressSelect(address, onChange, name) {
        const addressFields = await getDetailAddress(address);
        this.setState({
            address: addressFields,
        });
        if (onChange && name) {
            onChange(name, address);
            onChange('address[city]', this.state.address.city);
            onChange('address[state]', this.state.address.state);
            onChange('address[zip]', this.state.address.zip);
            onChange('address[country]', this.state.address.country);
            onChange('address[latitude]', this.state.address.latitude);
            onChange('address[longitude]', this.state.address.longitude);
        }
    }

    /* Edit Profile Functions Ends */

    /* Edit Portfolio Functions Starts */

    updateImageState = (imageName, fileType, AllFileTypes) => {
        this.setState((prevState) => ({
            imageName: [...prevState.imageName, ...imageName],
            fileType: [...prevState.fileType, ...fileType],
            AllFileTypes: [...prevState.AllFileTypes, ...AllFileTypes],
        }));
    };

    updateBase64 = (base64) => {
        this.setState((prevState) => ({
            base64: [...prevState.base64, ...base64],
        }));
    };

    addPortfolioImages = (profileId, portfolioId) => {
        if (this.state.base64.length > 0) {
            const arrayBuffer = [];
            this.state.base64.map((url, i) => {
                if (!url.photo_urls) {
                    let base_photo = null;
                    const image = url.split(',');
                    base_photo = image[1];
                    arrayBuffer.push(decode(base_photo));
                }
            });
            const extentions = extractExtention(this.state.imageName);
            this.props.getPortfolioPresignedUrls(
                profileId,
                extentions,
                arrayBuffer,
                portfolioId,
                this.state.link_url,
                this.state.video_url
            );
        } else {
            if (portfolioId) {
                this.props.updatePortfolio(profileId, portfolioId, {
                    portfolio: {
                        link_url: this.state.link_url,
                        video_url: this.state.video_url,
                    },
                });
            } else {
                this.props.addPortfolioImages(profileId, [], this.state.link_url, this.state.video_url);
            }
        }
    };

    removeBase64Image = (base64, indexToRemove) => {
        let Base64Images = [...this.state.base64];
        let updatedFileTypes = [...this.state.fileType];
        let updatedImageNames = [...this.state.imageName];

        let base64Index = this.state.base64.findIndex(function (base) {
            return base === base64;
        });
        Base64Images.splice(base64Index, 1);
        updatedFileTypes.splice(indexToRemove, 1);
        updatedImageNames.splice(indexToRemove, 1);

        this.setState({
            base64: Base64Images,
            fileType: updatedFileTypes,
            imageName: updatedImageNames,
        });
    };

    fieldChange = (e) => {
        let urlRegex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|([?:www.]|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
        if (e.target.value && !urlRegex.test(e.target.value)) {
            if (e.target.name === 'link_url') {
                this.setState({ invalidPortfolioUrl: true });
            } else if (e.target.name === 'video_url') {
                this.setState({ invalidVideoUrl: true });
            }
        } else {
            this.setState({
                invalidPortfolioUrl: false,
                invalidVideoUrl: false,
            });
        }
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    /* Edit Portfolio Functions Ends */

    /* Edit Skills Functions Starts */

    handleClickOutsideServicelist = (event) => {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            if (this.state.searchInputFocus) {
                this.setState({
                    ...this.state,
                    searchInputFocus: false,
                });
            }
        }
    };

    setWrapperRef = (node) => {
        this.wrapperRef = node;
    };

    selectedSkillHandler = (skill) => {
        if (skill.length > 0) {
            let selectedSkillsArray = [];
            let skillListArray = [...this.state.skills];
            skill.map((skill, index) => {
                let selectedSkill = {
                    id: skill.id,
                    name: skill.name,
                };
                selectedSkillsArray.push(selectedSkill);
                skillListArray = skillListArray.filter((item) => item.id !== skill.id);
            });
            if (selectedSkillsArray && selectedSkillsArray.length > 0) {
                this.setState({
                    selectedSkills: selectedSkillsArray,
                    isSelectedSkillsUpdated: true,
                });
            }
            if (skillListArray && skillListArray.length > 0) {
                this.setState({
                    skills: skillListArray,
                });
            }
        } else {
            console.log(skill.name);
            let selectedSkill = {
                id: skill.id,
                name: skill.name,
            };
            this.setState({
                ...this.state,
                selectedSkills: [...this.state.selectedSkills, selectedSkill],
                searchText: '',
                searchInputFocus: false,
            });
            let skillListArray = [...this.state.skills];
            let filteredSkillArray = skillListArray.filter((item) => item.id !== skill.id);
            this.setState({
                skills: filteredSkillArray,
            });
        }
    };

    onSkillsFocusHandler = () => {
        this.setState({
            ...this.state,
            searchInputFocus: true,
        });
    };

    onSkillSearchTextChangeHandler = (e, setFieldValue) => {
        let text = e.target.value;
        this.setState({
            ...this.state,
            searchText: text,
            // selectedSkills: null,
            searchInputFocus: true,
        });
        setFieldValue('skills', text);
    };

    onRemoveSelectedSkills = (index) => {
        let selectedSkillsArray = [...this.state.selectedSkills];
        let skillListArray = [...this.state.skills];
        let removedArray = selectedSkillsArray[index];
        let filteredSkillArray = [...skillListArray, removedArray];
        console.log(filteredSkillArray, 'filtered');
        console.log(removedArray, 'removed');
        selectedSkillsArray.splice(index, 1);
        this.setState({
            selectedSkills: selectedSkillsArray,
            skills: filteredSkillArray,
        });
    };

    handleClickOutsideServicelist = (event) => {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            if (this.state.searchInputFocus) {
                this.setState({
                    ...this.state,
                    searchInputFocus: false,
                });
            }
        }
    };
    /* Edit Skills Functions Ends */

    toggleManageEditForm = (id) => {
        this.setState({
            showEditForm: !this.state.showEditForm,
            showAddForm: false,
            selectedProfileId: id,
        });
    };

    toggleManageAddForm = () => {
        this.setState({
            showEditForm: !this.state.showAddForm,
            showEditForm: false,
        });
    };

    handleStep = (steps) => {
        this.props.handleStepChange(steps)
    }

    render() {
        let profileDetails = null;
        if (
            this.props.user &&
            this.props.user.profiles &&
            this.props.user.profiles.length > 0 &&
            this.state.selectedProfileId
        ) {
            this.props.user.profiles.map((profile, index) => {
                if (this.state.selectedProfileId === profile.id) {
                    profileDetails = profile;
                }
            });
        }

        if (this.state.showAddForm) {
            profileDetails = null;
        }
debugger
        let breadcrumb = null;
        let currentPath = this.props.history.location.pathname;
        if (currentPath === routes.MANAGE_PROFILE_EDIT) {
            breadcrumb = 'Profile';
            if (this.props.businessProfile === false) {
                breadcrumb = 'Personal Profile';
            } else if (this.props.businessProfile === true) {
                breadcrumb = 'Project Profile';
            }
        } else if (currentPath === routes.MANAGE_EXPERIENCE) {
            breadcrumb = 'Experience';
        } else if (currentPath === routes.MANAGE_PORTFOLIO) {
            breadcrumb = 'Portfolio';
        } else if (currentPath === routes.MANAGE_SKILLS) {
            breadcrumb = 'Skills';
        } else if (currentPath === routes.MANAGE_PROFILE_PLANNER) {
            breadcrumb = 'Project Planner';
        }

        return (
            <section className="ph_main_sec pt_83 profile_sec my_offers_ser_sec">
                <div className="container">
                    <div
                        className={
                            this.props.history.location.pathname.includes(routes.MANAGE_ALL_PROFILE)
                                ? 'vertical_tabs_cont tabs_100_manage_pro'
                                : 'vertical_tabs_cont'
                        }
                    >
                        <ul className="nav nav-pills ph_nav_pills_hr" id="pills-tab" role="tablist">
                            <li className="nav-item">
                                <a
                                    href="javascript:void(0)"
                                    onClick={() => {
                                        this.props.history.push(routes.EDIT_PROFILE);
                                        this.props.setBusinessProfile(false);
                                        if (this.props.goToStep && this.props.goToStep.steps) {
                                            let step = this.props.goToStep.steps + 1
                                            this.props.handleStepChange(step)
                                        }
                                    }}
                                    className="nav-link"
                                    id={PROFILE_TYPES.PRIMARY}
                                >
                                    Primary Profile
                                </a>
                            </li>
                            <li className="nav-item" id="manage_profile_walkThrough">
                                <a
                                    href="javascript:void(0)"
                                    onClick={() => {
                                        this.handleStep(2)
                                        this.props.history.push(routes.MANAGE_ALL_PROFILE)
                                    }}

                                    className="nav-link active"
                                    id={PROFILE_TYPES.SECONDARY}

                                >

                                    Manage Profiles
                                </a>
                            </li>
                        </ul>
                        <div className="tab-content" id="pills-tabContent">
                            <div
                                className="tab-pane fade show active"
                                id="pills-manage-profile"
                                role="tabpanel"
                                aria-labelledby="pills-manage-profile-tab"
                            >
                                <div className="vertical_tabs_colL vertical_tabs_col">
                                    <div className="tab_list_block tab_list_block_767">
                                        {this.props.history.location.pathname.includes(
                                            routes.MANAGE_ALL_PROFILE
                                        ) ? null : profileDetails ? (
                                            <div
                                                className="nav flex-column nav-pills"
                                                id="v-pills-tab"
                                                role="tablist"
                                                aria-orientation="vertical"
                                            >
                                                {this.props.businessProfile === false  && !(this.props.history.location.pathname.includes(routes.MANAGE_PROFILE_PLANNER)) && !(breadcrumb === 'Project Profile') ? (
                                                    <div>
                                                        {' '}
                                                        <NavLink
                                                            to={routes.MANAGE_PROFILE_EDIT}
                                                            className="nav-link"
                                                            id="personal_information_tab"
                                                        >
                                                            Profile
                                                        </NavLink>
                                                        <a
                                                            style={{ opacity: '0.5' }}
                                                            className="nav-link"
                                                            id="experience-tab"
                                                        >
                                                            Experience
                                                        </a>
                                                        <a
                                                            style={{ opacity: '0.5' }}
                                                            className="nav-link"
                                                            id="portfolio-tab"
                                                        >
                                                            Portfolio
                                                        </a>
                                                        <a
                                                            style={{ opacity: '0.5' }}
                                                            className="nav-link"
                                                            id="skills_tab"
                                                        >
                                                            Skills
                                                        </a>{' '}
                                                    </div>
                                                ) : (
                                                    <div>{this.props.businessProfile === true && this.props.history.location.pathname.includes(routes.MANAGE_PROFILE_PLANNER) ?
                                                    <div>
                                                        <NavLink
                                                            to={routes.MANAGE_PROFILE_EDIT}
                                                            className="nav-link"
                                                            // id="personal_information_tab"
                                                        >
                                                            Project/Company Info
                                                        </NavLink>
                                                        <a
                                                            style={{ color: '#EF5A2F', borderBottomColor: '#EF5A2F' }}
                                                            className="nav-link"
                                                            // id="personal_information_tab"
                                                        >
                                                            Project Planner
                                                        </a>
                                                    </div> :
                                                    <div>
                                                    <NavLink
                                                        to={routes.MANAGE_PROFILE_EDIT}
                                                        className="nav-link"
                                                        // id="personal_information_tab"
                                                    >
                                                        Project/Company Info
                                                    </NavLink>
                                                    <a
                                                        href='javascript:void(0)'
                                                        style={{ opacity: '0.5' }}
                                                        className="nav-link"
                                                        // id="personal_information_tab"
                                                    >
                                                        Project Planner
                                                    </a>
                                                </div>
                                                    }</div>
                                                )}
                                            </div>
                                        ) : (
                                            <div
                                                className="nav flex-column nav-pills"
                                                id="v-pills-tab"
                                                role="tablist"
                                                aria-orientation="vertical"
                                            >
                                                {this.props.businessProfile === false && !(this.props.history.location.pathname.includes(routes.MANAGE_PROFILE_PLANNER))  && breadcrumb === "Personal Profile" ? (
                                                    <div>
                                                        {' '}
                                                        <NavLink
                                                            to={routes.MANAGE_PROFILE_EDIT}
                                                            className="nav-link"
                                                            id="personal_information_tab"
                                                        >
                                                            Profile
                                                        </NavLink>
                                                        <a
                                                            style={{ opacity: '0.5' }}
                                                            className="nav-link"
                                                            id="experience-tab"
                                                        >
                                                            Experience
                                                        </a>
                                                        <a
                                                            style={{ opacity: '0.5' }}
                                                            className="nav-link"
                                                            id="portfolio-tab"
                                                        >
                                                            Portfolio
                                                        </a>
                                                        <a
                                                            style={{ opacity: '0.5' }}
                                                            className="nav-link"
                                                            id="skills_tab"
                                                        >
                                                            Skills
                                                        </a>{' '}
                                                    </div>
                                                ) : (
                                                    <div>
                                                        {(this.props.history.location.pathname.includes(routes.MANAGE_PROFILE_PLANNER)) &&
                                                        <div>   
                                                        <NavLink to={routes.MANAGE_PROFILE_EDIT} className="nav-link">
                                                            Project/Company Info
                                                        </NavLink>
                                                        <a href='javascript:void(0)' style={{ color: '#EF5A2F', borderBottomColor: '#EF5A2F' }} className="nav-link">
                                                            Project Planner
                                                        </a>
                                                        </div>}
                                                        {!(this.props.history.location.pathname.includes(routes.MANAGE_PROFILE_PLANNER)) &&
                                                         <div>
                                                            <NavLink to={routes.MANAGE_PROFILE_EDIT} className="nav-link">
                                                                Project/Company Info
                                                            </NavLink>
                                                            <a style={{ opacity: '0.5' }} className="nav-link">
                                                                Project Planner
                                                            </a> 
                                                        </div>
                                                        }
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="vertical_tabs_colR vertical_tabs_col">
                                    <div className="tab_list_block">
                                        {this.props.history.location.pathname.includes(
                                            routes.MANAGE_ALL_PROFILE
                                        ) ? null : (
                                            <nav
                                                aria-label="breadcrumb"
                                                className="theme_breadcrumb wow fadeInUp"
                                                style={{
                                                    visibility: 'visible',
                                                    animationName: 'fadeInUp',
                                                }}
                                            >
                                                <ol className="breadcrumb">
                                                    <li className="breadcrumb-item">
                                                        <a
                                                            onClick={() =>
                                                                this.props.history.push(routes.MANAGE_ALL_PROFILE)
                                                            }
                                                            href="javascript:void(0)"
                                                        >
                                                            Manage Profiles
                                                        </a>
                                                    </li>
                                                    <li className="breadcrumb-item" aria-current="page">
                                                        {breadcrumb}
                                                    </li>
                                                </ol>
                                            </nav>
                                        )}
                                        <ProfileSectionPage
                                            //Edit Profile Props Starts
                                            updateProfile={this.props.updateProfile}
                                            profilePhotoUpload={this.props.profilePhotoUpload}
                                            createProfile={this.props.createProfile}
                                            handleAddressSelect={this.handleAddressSelect}
                                            onImageUpload={this.onImageUpload}
                                            isProfileImageUploading={this.state.isProfileImageUploading}
                                            profilePhotoPath={this.props.profilePhotoPath}
                                            file={this.state.file}
                                            profileImage={this.state.image}
                                            address={this.state.address}
                                            businessProfile={this.props.businessProfile}
                                            setBusinessProfile={this.props.setBusinessProfile}
                                            //Edit Profile Props Ends

                                            //Edit Experience Props Start
                                            createExperience={this.props.createExperience}
                                            updateExperience={this.props.updateExperience}
                                            deleteExperience={this.props.deleteExperience}
                                            //Edit Experience Props Ends

                                            //Edit Portfolio Props Start
                                            getPortfolioPresignedUrls={this.props.getPortfolioPresignedUrls}
                                            deletePortfolio={this.props.deletePortfolio}
                                            updatePortfolio={this.props.updatePortfolio}
                                            addPortfolioImages={this.addPortfolioImages}
                                            updateBase64={this.updateBase64}
                                            updateImageState={this.updateImageState}
                                            removeBase64Image={this.removeBase64Image}
                                            fieldChange={this.fieldChange}
                                            invalidPortfolioUrl={this.state.invalidPortfolioUrl}
                                            idsToDelete={this.state.idsToDelete}
                                            imageUrl={this.state.imageUrl}
                                            link_url={this.state.link_url}
                                            imageName={this.state.imageName}
                                            base64={this.state.base64}
                                            AllFileTypes={this.state.AllFileTypes}
                                            video_url={this.state.video_url}
                                            invalidVideoUrl={this.state.invalidVideoUrl}
                                            fileType={this.state.fileType}
                                            //Edit Portfolio Props Ends

                                            //Edit Skills Props Starts
                                            searchText={this.state.searchText}
                                            searchInputFocus={this.state.searchInputFocus}
                                            onSkillsFocusHandler={this.onSkillsFocusHandler}
                                            onSkillSearchTextChangeHandler={this.onSkillSearchTextChangeHandler}
                                            setWrapperRef={this.setWrapperRef}
                                            createSkills={this.props.createSkills}
                                            selectedSkillHandler={this.selectedSkillHandler}
                                            onRemoveSelectedSkills={this.onRemoveSelectedSkills}
                                            // deletePortfolio={this.props.deletePortfolio}
                                            selectedSkills={this.state.selectedSkills}
                                            skills={this.state.skills}
                                            isSelectedSkillsUpdated={this.state.isSelectedSkillsUpdated}
                                            history={this.props.history}

                                            //Edit Skills Props Ends

                                            isLoading={
                                                this.props.isLoading ||
                                                this.props.isAuthLoading ||
                                                this.props.isPortfolioLoading
                                            }
                                            profileDetails={profileDetails}
                                            // history={this.props.history}
                                            profiles={this.props.user.profiles}
                                            deleteProfile={this.props.deleteProfile}
                                            toggleProfile={this.props.toggleProfile}
                                            toggleManageEditForm={this.toggleManageEditForm}
                                            toggleManageAddForm={this.toggleManageAddForm}
                                            user={this.props.user}

                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.authReducer.user,
        isAuthLoading: state.authReducer.isloading,
        isLoading: state.profileReducer.isloading,
        profilePhotoPath: state.profileReducer.photo_path,
        isPortfolioLoading: state.userReducer.isPortfolioLoading,
        skills: state.configReducer.skills,
        businessProfile: state.profileReducer.businessProfile,
        selectedBusinessProfileId: state.profileReducer.selectedBusinessProfileId,
        goToStep: state.walkThroughReducer.goToStep
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCurrentUser: () => dispatch(actions.fetchCurrentUser()),
        updateProfile: (profileId, profile) => dispatch(actions.updateProfile(profileId, profile)),
        profilePhotoUpload: (credentials, image) => dispatch(actions.profilePhotoUpload(credentials, image)),
        createProfile: (user) => dispatch(actions.createProfile(user)),
        createExperience: (profileId, experience) => dispatch(actions.createExperience(profileId, experience)),
        updateExperience: (profileId, experienceId, experience) =>
            dispatch(actions.updateExperience(profileId, experienceId, experience)),
        updatePortfolio: (profileId, portfolioId, portfolio) =>
            dispatch(actions.updatePortfolio(profileId, portfolioId, portfolio)),
        deleteExperience: (profileId, experienceId) => dispatch(actions.deleteExperience(profileId, experienceId)),
        getPortfolioPresignedUrls: (profileId, extentions, arrayBuffer, portfolioId, link_url) =>
            dispatch(actions.getPortfolioPresignedUrls(profileId, extentions, arrayBuffer, portfolioId, link_url)),
        deletePortfolio: (profileId, portfolioId) => dispatch(actions.deletePortfolio(profileId, portfolioId)),
        createSkills: (profileId, skills) => dispatch(actions.createSkills(profileId, skills)),
        deleteProfile: (profileId) => dispatch(actions.deleteProfile(profileId)),
        toggleProfile: (profileId, status) => dispatch(actions.toggleProfile(profileId, status)),
        addPortfolioImages: (profileId, photopaths, link, videoLink) =>
            dispatch(actions.addPortfolioImages(profileId, photopaths, link, videoLink)),
        deletePortfolio: (profileId, portfolioId) => dispatch(actions.deletePortfolio(profileId, portfolioId)),
        setBusinessProfile: (status) => dispatch(actions.businessProfile(status)),
        handleStepChange: (steps) => dispatch(actions.handleStepChange(steps)),
        showImageCropModal: (imageCropParams) => dispatch(actions.showImageCropModal(imageCropParams)),
        uploadImageOnWordpress: (file) => dispatch(actions.uploadImageOnWordpress(file))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageProfileSection);
