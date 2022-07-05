/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import ProfileSectionPage from '../../../components/ProfileSection/ProfileSectionPage/ProfileSectionPage';
import {
    routes,
    PROFILE_TYPES,
    Roles,
    SubscriptionStatus,
    SubscriptionType,
} from '../../../utility/constants/constants';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as actions from '../../../redux/actions/index';
import { resetOrientation, toastMsg, extractExtention } from '../../../utility/utility';
import imageCompression from 'browser-image-compression';
import getDetailAddress from '../../../utility/getDetailedAddress';
import { decode } from 'base64-arraybuffer';
import CustomToolTip from '../../../components/UI/CustomToolTip/CustomToolTip';
import storage from '../../../utility/storage';

class PrimaryProfileSection extends Component {
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
        if (currentPath === routes.PROFILE) {
            this.props.history.push(routes.EDIT_PROFILE);
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
        // if ((this.state.skills && this.state.skills.length > 0) && this.props.user && this.props.user.profiles && this.props.user.profiles.length > 0) {
        //     let skillListArray = [...this.state.skills]
        //     this.props.user.profiles.map((profile, index) => {
        //         if (profile.id.toString() === this.props.user.primary_profile_id && profile.skills && profile.skills.length > 0 && (this.state.selectedSkills && this.state.selectedSkills.length === 0) && !this.state.isSelectedSkillsUpdated) {
        //             let selectedSkillsArray = []
        //             profile.skills.map((skill, index) => {
        //                 let selectedSkill = {
        //                     id: skill.id,
        //                     name: skill.name
        //                 }
        //                 selectedSkillsArray.push(selectedSkill)
        //                 skillListArray = skillListArray.filter(item => item.id !== skill.id)
        //             })
        //             if (selectedSkillsArray && selectedSkillsArray.length > 0) {
        //                 this.setState({ selectedSkills: selectedSkillsArray })
        //             }
        //             if (skillListArray && skillListArray.length > 0) {
        //                 this.setState({
        //                     skills: skillListArray
        //                 })
        //             }
        //             this.setState({ isSelectedSkillsUpdated: true })
        //         }
        //     })
        // }
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
            console.log(orientation);
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
            onChange(name, this.state.address.street_address);
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
    handleStep = (steps) => {
        this.props.handleStepChange(steps)
    }

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

    render() {
        let profileDetails = null;

        if (this.props.user && this.props.user.profiles && this.props.user.profiles.length > 0) {
            this.props.user.profiles.map((profile, index) => {
                if (this.props.user.primary_profile_id === profile.id.toString()) {
                    profileDetails = profile;
                }
            });
        }

        console.log(this.state.selectedSkills, 'containerselectedskill');

        let isSubscriptionActive =
            this.props.user.subscription_status.toLowerCase() === SubscriptionStatus.ACTIVE.toLowerCase();
        let highestSubscriptionType = null;
        if (this.props.user && this.props.user.subscriptions && this.props.user.subscriptions.length > 0) {
            this.props.user.subscriptions.map((subscription, index) => {
                if (subscription.subcription_type.toLowerCase() === SubscriptionType.PLATINUM.toLowerCase()) {
                    highestSubscriptionType = SubscriptionType.PLATINUM;
                }
            });
            if (!highestSubscriptionType) {
                this.props.user.subscriptions.map((subscription, index) => {
                    if (subscription.subcription_type.toLowerCase() === SubscriptionType.GOLD.toLowerCase()) {
                        highestSubscriptionType = SubscriptionType.GOLD;
                    }
                });
            }
            if (!highestSubscriptionType) {
                highestSubscriptionType = SubscriptionType.SILVER;
            }
        }
        let personalProfile = [];
        let businessProfile = [];

        if (this.props.user.profiles && this.props.user.profiles.length >= 1) {
            businessProfile = this.props.user.profiles.filter((profile) => profile.type === 'company');
            personalProfile = this.props.user.profiles.filter((profile) => !profile.type || profile.type !== 'company');
        }

        let personalProfileLeft;
        let businessProfileLeft;
        if (
            highestSubscriptionType &&
            highestSubscriptionType.toLowerCase() === SubscriptionType.SILVER.toLowerCase() &&
            personalProfile.length < 2
        ) {
            personalProfileLeft = 2 - personalProfile.length;
        } else if (
            highestSubscriptionType &&
            highestSubscriptionType.toLowerCase() === SubscriptionType.PLATINUM.toLowerCase() &&
            personalProfile.length < 50
        ) {
            personalProfileLeft = 50 - personalProfile.length;
        } else if (
            highestSubscriptionType &&
            highestSubscriptionType.toLowerCase() === SubscriptionType.GOLD.toLowerCase() &&
            personalProfile.length < 10
        ) {
            personalProfileLeft = 10 - personalProfile.length;
        }

        if (
            highestSubscriptionType &&
            highestSubscriptionType.toLowerCase() === SubscriptionType.SILVER.toLowerCase() &&
            businessProfile.length < 2
        ) {
            businessProfileLeft = 2 - businessProfile.length;
        } else if (
            highestSubscriptionType &&
            highestSubscriptionType.toLowerCase() === SubscriptionType.PLATINUM.toLowerCase() &&
            businessProfile.length < 50
        ) {
            businessProfileLeft = 50 - businessProfile.length;
        } else if (
            highestSubscriptionType &&
            highestSubscriptionType.toLowerCase() === SubscriptionType.GOLD.toLowerCase() &&
            businessProfile.length < 10
        ) {
            businessProfileLeft = 10 - businessProfile.length;
        }

        if (!businessProfileLeft) {
            businessProfileLeft = 0;
        }
        if (!personalProfileLeft) {
            personalProfileLeft = 0;
        }

        return (
            <section className="ph_main_sec pt_83 profile_sec my_offers_ser_sec">
                <div className="container">
                    <div className="vertical_tabs_cont">
                        <ul className="nav nav-pills ph_nav_pills_hr" id="pills-tab" role="tablist">
                            <li className="nav-item">
                                <a
                                    to={routes.PROFILE}
                                    href="javascript:void(0)"
                                    onClick={() => {
                                        this.props.history.push(routes.EDIT_PROFILE);
                                        this.props.setBusinessProfile(false);
                                        if (this.props.goToStep && this.props.goToStep.steps) {
                                            let step = this.props.goToStep.steps + 1
                                            this.props.handleStepChange(step)
                                        }
                                    }}
                                    className="nav-link active"
                                    id={PROFILE_TYPES.PRIMARY}
                                >
                                    Primary Profile
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    to={routes.MANAGE_PROFILE}
                                    href="javascript:void(0)"
                                    onClick={() => {
                                        this.handleStep(2)
                                        this.props.history.push(routes.MANAGE_ALL_PROFILE)

                                    }}
                                    className="nav-link"
                                    id={PROFILE_TYPES.SECONDARY}

                                >
                                    Manage Profiles
                                </a>
                            </li>
                        </ul>
                        <div className="tab-content" id="pills-tabContent">
                            <div
                                className="tab-pane fade show active"
                                id="pills-primary-profile"
                                role="tabpanel"
                                aria-labelledby="pills-primary-profile-tab"
                            >
                                <div className="vertical_tabs_colL vertical_tabs_col">
                                    <div className="tab_list_block tab_list_block_767">
                                        <div
                                            className="nav flex-column nav-pills"
                                            id="v-pills-tab"
                                            role="tablist"
                                            aria-orientation="vertical"
                                        >
                                            <NavLink
                                                to={routes.EDIT_PROFILE}
                                                className="nav-link"
                                                id="personal_information_tab"
                                            >
                                                Profile
                                            </NavLink>
                                            <NavLink
                                                to={routes.EDIT_EXPERIENCE}
                                                className="nav-link"
                                                id="experience-tab"
                                            >
                                                Experience
                                            </NavLink>
                                            <NavLink to={routes.EDIT_PORTFOLIO} className="nav-link" id="portfolio-tab">
                                                Portfolio
                                            </NavLink>
                                            <NavLink to={routes.EDIT_SKILLS} className="nav-link" id="skills_tab">
                                                Skills
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>
                                <div className="vertical_tabs_colR vertical_tabs_col">
                                    <div className="tab_list_block">
                                        {isSubscriptionActive ? (
                                            <div className="ph_title_btn ph_flex_wrp_spw">
                                                <h4 className="theme_sm_title">My Default Personal Profile</h4>
                                                <div class="btn-group">
                                                    <button
                                                        type="button"
                                                        class="theme_btn theme_primary dropdown-toggle"
                                                        data-toggle="dropdown"
                                                        aria-haspopup="true"
                                                        aria-expanded="false"
                                                        id="newProfile_walk"

                                                    >
                                                        NEW PROFILE <i class="fa fa-caret-down ml-1"></i>
                                                    </button>
                                                    <div class="dropdown-menu">
                                                        <CustomToolTip
                                                            placement="right"
                                                            text={`${personalProfileLeft} remaining`}
                                                        >
                                                            <a
                                                                class="dropdown-item"
                                                                href="javascript:void(0)"
                                                                id="add_secondary_profile"
                                                                onClick={() => {
                                                                    if (
                                                                        highestSubscriptionType &&
                                                                        highestSubscriptionType.toLowerCase() ===
                                                                        SubscriptionType.SILVER.toLowerCase() &&
                                                                        personalProfile.length < 2
                                                                    ) {
                                                                        this.props.history.push(
                                                                            routes.MANAGE_PROFILE_EDIT,
                                                                            { addNewProfile: true }
                                                                        );
                                                                        this.props.setBusinessProfile(false);
                                                                    } else if (
                                                                        highestSubscriptionType &&
                                                                        highestSubscriptionType.toLowerCase() ===
                                                                        SubscriptionType.PLATINUM.toLowerCase() &&
                                                                        personalProfile.length < 50
                                                                    ) {
                                                                        this.props.history.push(
                                                                            routes.MANAGE_PROFILE_EDIT,
                                                                            { addNewProfile: true }
                                                                        );
                                                                        this.props.setBusinessProfile(false);
                                                                    } else if (
                                                                        highestSubscriptionType &&
                                                                        highestSubscriptionType.toLowerCase() ===
                                                                        SubscriptionType.GOLD.toLowerCase() &&
                                                                        personalProfile.length < 10
                                                                    ) {
                                                                        this.props.history.push(
                                                                            routes.MANAGE_PROFILE_EDIT,
                                                                            { addNewProfile: true }
                                                                        );
                                                                        this.props.setBusinessProfile(false);
                                                                    } else {
                                                                        window.$('#subscription_modal').modal();
                                                                    }
                                                                }}
                                                            >
                                                                Personal Profile [{personalProfileLeft}]{' '}
                                                            </a>
                                                        </CustomToolTip>
                                                        <div class="dropdown-divider"></div>
                                                        <CustomToolTip
                                                            placement="right"
                                                            text={`${businessProfileLeft} remaining`}
                                                        >
                                                            <a
                                                                class="dropdown-item"
                                                                href="javascript:void(0)"
                                                                id="add_secondary_profile"
                                                                onClick={() => {
                                                                    if (
                                                                        highestSubscriptionType &&
                                                                        highestSubscriptionType.toLowerCase() ===
                                                                        SubscriptionType.SILVER.toLowerCase() &&
                                                                        businessProfile.length < 2
                                                                    ) {
                                                                        this.props.history.push(
                                                                            routes.MANAGE_PROFILE_EDIT,
                                                                            { addNewProfile: true }
                                                                        );
                                                                        this.props.setBusinessProfile(true);
                                                                    } else if (
                                                                        highestSubscriptionType &&
                                                                        highestSubscriptionType.toLowerCase() ===
                                                                        SubscriptionType.PLATINUM.toLowerCase() &&
                                                                        businessProfile.length < 50
                                                                    ) {
                                                                        this.props.history.push(
                                                                            routes.MANAGE_PROFILE_EDIT,
                                                                            { addNewProfile: true }
                                                                        );
                                                                        this.props.setBusinessProfile(true);
                                                                    } else if (
                                                                        highestSubscriptionType &&
                                                                        highestSubscriptionType.toLowerCase() ===
                                                                        SubscriptionType.GOLD.toLowerCase() &&
                                                                        businessProfile.length < 10
                                                                    ) {
                                                                        this.props.history.push(
                                                                            routes.MANAGE_PROFILE_EDIT,
                                                                            { addNewProfile: true }
                                                                        );
                                                                        this.props.setBusinessProfile(true);
                                                                    } else {
                                                                        window.$('#subscription_modal').modal();
                                                                    }
                                                                }}
                                                            >
                                                                Project Profile [{businessProfileLeft}]{' '}
                                                            </a>
                                                        </CustomToolTip>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="ph_title_btn ph_flex_wrp_spw">
                                                <h4 className="theme_sm_title">My Default Personal Profile</h4>
                                                <div class="btn-group">
                                                    <button
                                                        type="button"
                                                        class="theme_btn theme_primary dropdown-toggle newProfile_walk"
                                                        data-toggle="dropdown"
                                                        aria-haspopup="true"
                                                        aria-expanded="false"


                                                    >
                                                        NEW PROFILE <i class="fa fa-caret-down ml-1"></i>
                                                    </button>
                                                    <div class="dropdown-menu">
                                                        <a
                                                            class="dropdown-item"
                                                            id="dropDown_walk"
                                                            href="javascript:void(0)"
                                                            id="add_secondary_profile"
                                                            onClick={() => {
                                                                window.$('#subscription_modal').modal();
                                                                this.props.setBusinessProfile(false);
                                                            }}
                                                        >
                                                            Personal Profile
                                                        </a>
                                                        <div class="dropdown-divider"></div>
                                                        <a
                                                            class="dropdown-item"
                                                            href="javascript:void(0)"
                                                            id="add_secondary_profile"
                                                            onClick={() => {
                                                                window.$('#subscription_modal').modal();
                                                                this.props.setBusinessProfile(true);
                                                            }}
                                                        >
                                                            Project Profile
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        <ProfileSectionPage
                                            //Edit Profile Props Starts
                                            updateProfile={this.props.updateProfile}
                                            profilePhotoUpload={this.props.profilePhotoUpload}
                                            createProfile={this.props.createProfile}
                                            isProfileImageUploading={this.state.isProfileImageUploading}
                                            handleAddressSelect={this.handleAddressSelect}
                                            onImageUpload={this.onImageUpload}
                                            profilePhotoPath={this.props.profilePhotoPath}
                                            file={this.state.file}
                                            profileImage={this.state.image}
                                            address={this.state.address}
                                            setBusinessProfile={this.props.setBusinessProfile}
                                            businessProfile={this.props.businessProfile}
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
                                            imageName={this.state.imageName}
                                            base64={this.state.base64}
                                            link_url={this.state.link_url}
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
                                            selectedSkills={this.state.selectedSkills}
                                            skills={this.state.skills}
                                            isSelectedSkillsUpdated={this.state.isSelectedSkillsUpdated}
                                            isConfigLoading={this.props.isConfigLoading}
                                            history={this.props.history}
                                            //Edit Skills Props Ends

                                            isLoading={
                                                this.props.isLoading ||
                                                this.props.isAuthLoading ||
                                                this.props.isPortfolioLoading
                                            }
                                            profileDetails={profileDetails}
                                            // history={this.props.history}
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
        isConfigLoading: state.configReducer.isConfigLoading,
        businessProfile: state.profileReducer.businessProfile,
        goToStep: state.walkThroughReducer.goToStep,
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
        getPortfolioPresignedUrls: (profileId, extentions, arrayBuffer, portfolioId, link_url, video_url) =>
            dispatch(
                actions.getPortfolioPresignedUrls(profileId, extentions, arrayBuffer, portfolioId, link_url, video_url)
            ),
        deletePortfolio: (profileId, portfolioId) => dispatch(actions.deletePortfolio(profileId, portfolioId)),
        createSkills: (profileId, skills) => dispatch(actions.createSkills(profileId, skills)),
        addPortfolioImages: (profileId, photopaths, link, videoLink) =>
            dispatch(actions.addPortfolioImages(profileId, photopaths, link, videoLink)),
        setBusinessProfile: (status) => dispatch(actions.businessProfile(status)),
        handleStepChange: (steps) => dispatch(actions.handleStepChange(steps)),
        showImageCropModal: (imageCropParams) => dispatch(actions.showImageCropModal(imageCropParams)),
        uploadImageOnWordpress: (file) => dispatch(actions.uploadImageOnWordpress(file))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PrimaryProfileSection);
