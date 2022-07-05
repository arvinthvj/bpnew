import React, { Component } from 'react';
import ClassifedList from '../../components/ClassifiedList/ClassifiedList';
import ClassifedForm from '../../components/ClassifiedForm/ClassifiedForm';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';
import { showConfirmAlert } from '../../utility/successAlert/confirmAlert';
import { extractExtention } from '../../utility/utility';
import { decode, encode } from 'base64-arraybuffer';
import getDetailedAddress from '../../utility/getDetailedAddress';
import ClassifiedSkeleton from '../../components/Skeletons/classifiedSkeleton';
import { Roles, SubscriptionStatus, routes, SubscriptionType } from '../../utility/constants/constants';
import storage from '../../utility/storage';
import { OffersListSkeleton } from '../../components/Skeletons/offersSkeleton';
import { Base64 } from 'js-base64';

const cloneDeep = require('clone-deep');

class Classified extends Component {

    constructor(props) {
        super(props);
        this.state = {
            classified: null,
            showForm: false,
            compensationsList: this.props.compensations,
            idsToDelete: [],
            imageUrl: null,
            imageName: [],
            base64: [],
            AllFileTypes: [],
            fileType: '',
            address: null,
            isBlocking: true,
            profilePicPath: null
        }
    }

    componentDidUpdate = (prevProps, prevState, snapshot) => {
        if ((!this.props.classifiedList || this.props.classifiedList.length == 0) &&
            ((prevProps.isClassifiedloading !== this.props.isClassifiedloading) || (prevProps.addOrUpdateOrDeleteClassifiedLoading !== this.props.addOrUpdateOrDeleteClassifiedLoading))) {
            // this.setState({
            //     showForm: true
            // })
        } else if ((prevProps.isClassifiedloading && !this.props.isClassifiedloading) || (prevProps.addOrUpdateOrDeleteClassifiedLoading && !this.props.addOrUpdateOrDeleteClassifiedLoading)) {
            if (this.props.createClassifiedAddClicked) {
                // this.props.createClassifiedAdd(false);
            } else {
                this.setState({
                    showForm: false,
                    service: null,
                    idsToDelete: [],
                    base64: [],
                    compensationsList: [],
                    profilePicPath: null
                })
            }
        }

        if (this.props.createClassifiedAddClicked === true && prevProps.createClassifiedAddClicked === false) {
            this.setState({
                showForm: true,
                service: null,
                idsToDelete: [],
                base64: [],
                compensationsList: []
            })
        } else if (this.props.manageClassifiedAddClicked === true && prevProps.manageClassifiedAddClicked === false) {
            this.setState({
                showForm: false,
                service: null,
                idsToDelete: [],
                base64: [],
                compensationsList: []
            })
        }
    }

    componentDidMount = () => {

        let isEdit = storage.get('isEdit', null)
        let classified = storage.get('classified', null)
        if (isEdit && classified) {
            this.editClassified(classified)
            storage.remove('isEdit')
            storage.remove('classified')
        } else {
            if (this.props.createClassifiedAddClicked) {
                this.createClassifiedClicked();
            } else {
                this.props.manageClassifiedAdd(true)
            }
            storage.remove('navigate_to_classified');
            storage.remove('navigate_to_classified_val');
            this.props.getClassifiedList(this.props.user.primary_profile_id);
        }
    }

    componentWillUnmount = () => {

        this.props.createClassifiedAdd(false);
    }

    copyProfilePic = (path) => {
        this.setState({ profilePicPath: path })
    }

    createClassifiedClicked = () => {
        this.setState({
            showForm: true,
            classified: null
        })
    }

    cancelClicked = () => {
        this.props.createClassifiedAdd(false);
        this.setState({
            showForm: false
        })
    }

    addOrUpdateClassified = (classified) => {
        this.setState({ isBlocking: false })
        let values = cloneDeep(classified);
        if (this.state.classified) {
            if (values.address) {
                delete values.address.id;
                delete values.address.state_code;
            }
            values['delete_attachment_ids'] = this.state.idsToDelete;
            this.setState({ idsToDelete: [] })
            if (this.state.base64 && this.state.base64.length > 0) {
                const arrayBuffer = [];
                this.state.base64.map((url, i) => {
                    if (!url.photo_urls) {
                        let base_photo = null;
                        const image = url.split(',');
                        base_photo = image[1];

                        arrayBuffer.push(decode(base_photo))
                    }

                })
                const extentions = extractExtention(this.state.imageName);
                this.props.updateClassifiedWithImages(this.state.classified.id, values, extentions, arrayBuffer)
            } else if (values.profilePicPath) {
                let photo_paths = []
                photo_paths.push(values.profilePicPath)
                values['new_photo_paths'] = photo_paths
                delete values.profilePicPath
                this.props.updateClassified(this.state.classified.id, values);
            } else {
                this.props.updateClassified(this.state.classified.id, values);
            }
        } else {
            if (this.state.base64 && this.state.base64.length > 0) {
                const arrayBuffer = [];
                this.state.base64.map((url, i) => {
                    if (!url.photo_urls) {
                        let base_photo = null;
                        const image = url.split(',');
                        base_photo = image[1];

                        arrayBuffer.push(decode(base_photo))
                    }

                })
                const extentions = extractExtention(this.state.imageName);
                this.props.addClassifiedWithImages(values, extentions, arrayBuffer);
            } else if (values.profilePicPath) {
                let photo_paths = []
                photo_paths.push(values.profilePicPath)
                values['photo_paths'] = photo_paths
                delete values.profilePicPath
                this.props.addClassified(values);
            } else {
                this.props.addClassified(values);
            }
        }
    }

    updateImageState = (imageName, fileType, AllFileTypes) => {
        this.setState(prevState => ({
            imageName: [...prevState.imageName, ...imageName],
            fileType: [...prevState.fileType, ...fileType],
            AllFileTypes: [...prevState.AllFileTypes, ...AllFileTypes],
        }))
    }

    updateBase64 = (base64) => {
        this.setState(prevState => ({
            base64: [...prevState.base64, ...base64]
        })
        )
    }

    removeUplodedImage = (id) => {
        let Service = cloneDeep(this.state.classified);

        this.setState(prevState => ({
            idsToDelete: [...prevState.idsToDelete, id]
        }))

        let urlIndex = Service.attachments.findIndex(function (url) {
            return url.id === id
        })

        Service.attachments.splice(urlIndex, 1);

        this.setState({
            classified: Service,
        })
    }

    removeBase64Image = (base64, indexToRemove) => {

        let Base64Images = [...this.state.base64];
        let updatedFileTypes = [...this.state.fileType]
        let updatedImageNames = [...this.state.imageName]

        let base64Index = this.state.base64.findIndex(function (base) {
            return base === base64
        })
        Base64Images.splice(base64Index, 1);
        updatedFileTypes.splice(indexToRemove, 1)
        updatedImageNames.splice(indexToRemove, 1)

        this.setState({
            base64: Base64Images,
            fileType: updatedFileTypes,
            imageName: updatedImageNames
        })
    }

    editClassified = (classified) => {
        const index = this.props.categories.findIndex(category => category.id === classified.category.id);
        this.setState({
            showForm: true,
            compensationsList: this.props.categories[index].compensations,
            classified: classified
        })
    }

    cancelClassifiedClicked = () => {
        if (!this.props.classifiedList || (this.props.classifiedList && this.props.classifiedList.length === 0)) {
            this.props.getClassifiedList(this.props.user.primary_profile_id);
        }
        this.props.createClassifiedAdd(false);
        this.setState({
            showForm: false,
            classified: null,
            idsToDelete: [],
            base64: [],
            compensationsList: [],
            profilePicPath: null
        })
    }

    handleAddressSelect = async (address, onChange, name) => {

        const addressFields = await getDetailedAddress(address);

        this.setState({
            address: addressFields,
        })
        if (onChange && name) {
            onChange(name, address)
            onChange('address[city]', this.state.address.city)
            onChange('address[state]', this.state.address.state)
            onChange('address[zip]', this.state.address.zip)
            onChange('address[country]', this.state.address.country)
            onChange('address[latitude]', this.state.address.latitude)
            onChange('address[longitude]', this.state.address.longitude)
        }
    };

    onClickCards = (classified) => {
        this.props.history.push(`${classified.type}/${classified.id}/details`)
    }

    render() {
        let highestSubscriptionType = null
        if (this.props.user && this.props.user.subscriptions && this.props.user.subscriptions.length > 0) {
            this.props.user.subscriptions.map((subscription, index) => {
                if (subscription.subcription_type.toLowerCase() === SubscriptionType.PLATINUM.toLowerCase()) {
                    highestSubscriptionType = SubscriptionType.PLATINUM
                }
            })
            if (!highestSubscriptionType) {
                this.props.user.subscriptions.map((subscription, index) => {
                    if (subscription.subcription_type.toLowerCase() === SubscriptionType.GOLD.toLowerCase()) {
                        highestSubscriptionType = SubscriptionType.GOLD
                    }
                })
            }
            if (!highestSubscriptionType) {
                this.props.user.subscriptions.map((subscription, index) => {
                    if (subscription.subcription_type.toLowerCase() === SubscriptionType.SILVER.toLowerCase()) {
                        highestSubscriptionType = SubscriptionType.SILVER
                    }
                })
            }
        }
        if (!this.props.user || (this.props.user.subscription_status !== SubscriptionStatus.ACTIVE || !highestSubscriptionType)) {
            return (
                <section className="ph_main_sec pt_83 chat_sec">
                    <div className="container-fluid theme_px_50">
                        <div className="ph_empty_message ph_empty_msg" role="alert">
                            <img className="ph_empty_image" src="images/thumbnails/messages_empty.png" alt="Messages are empty" />
                            <div className="ph_empty_text">To use the Want Ad feature, you need to subscribe to the platform</div>
                            <div className="text-center mt-2">
                                <a href="javascript:void(0)" onClick={() => {
                                    if (this.props.user) {
                                        let encryptedEmail = Base64.encode(this.props.user.email)
                                        window.open(`${routes.PRICING}`, '_self')
                                    } else {
                                        window.open(`${routes.PRICING}/?logoutfromlms=true`, '_self')
                                    }
                                }} className="theme_btn theme_primary">Click Here To Subscribe</a>
                            </div>
                        </div>
                    </div>
                </section>)
        } else {
            if (this.props.isClassifiedloading) {
                return (
                    <section className="ph_main_sec pt_83">
                        <div className="container-fluid theme_px_60">
                            <OffersListSkeleton />
                        </div>
                    </section>)
            } else if ((!this.props.classifiedList || this.props.classifiedList.length == 0) && !this.state.showForm) {
                return (
                    <section className="ph_main_sec pt_83 chat_sec">
                        <div className="container-fluid theme_px_50">
                            <div className="ph_empty_message ph_empty_msg" role="alert">
                                <img className="ph_empty_image" src="images/thumbnails/messages_empty.png" alt="Messages are empty" />
                                <div className="ph_empty_text">You don't have any Want Ads</div>
                                <div className="text-center mt-2">
                                    <a href="javascript:void(0)" onClick={() => { this.createClassifiedClicked(); this.props.createClassifiedAdd(true); }} className="theme_btn theme_primary">Post A Want Ad</a>
                                </div>
                            </div>
                        </div>
                    </section>)
            } else {
                return (
                    this.state.showForm ?
                        <ClassifedForm
                            {...this.props}
                            {...this.state}
                            handleAddressSelect={this.handleAddressSelect}
                            cancelClassifiedClicked={this.cancelClassifiedClicked}
                            updateImageState={this.updateImageState}
                            removeBase64Image={this.removeBase64Image}
                            copyProfilePic={this.copyProfilePic}
                            updateBase64={this.updateBase64}
                            removeUplodedImage={this.removeUplodedImage}
                            addOrUpdateClassified={this.addOrUpdateClassified}
                            cancelClicked={this.cancelClicked}
                        />
                        :
                        <ClassifedList
                            {...this.props}
                            onClickCards={this.onClickCards}
                            deleteClassified={this.props.deleteClassified}
                            editClassified={this.editClassified}
                            createClassifiedAdd={this.props.createClassifiedAdd}
                            createClassifiedClicked={this.createClassifiedClicked}
                        />
                )
            }
        }
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.authReducer.user,
        categories: state.configReducer.categories,
        skills: state.configReducer.skills,
        compensations: state.configReducer.compensations,
        // servicesList: state.userReducer.servicesList,
        isClassifiedloading: state.userReducer.isClassifiedloading,
        classifiedList: state.userReducer.classifiedList,
        addOrUpdateOrDeleteClassifiedLoading: state.userReducer.addOrUpdateOrDeleteClassifiedLoading,
        createClassifiedAddClicked: state.userReducer.createClassifiedAddClicked,
        manageClassifiedAddClicked: state.userReducer.manageClassifiedAddClicked,
        goToStep: state.walkThroughReducer.goToStep
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getClassifiedList: (profileId) => dispatch(actions.getClassifiedList(profileId)),
        addClassified: (service) => dispatch(actions.addClassified(service)),
        addClassifiedWithImages: (service, extentions, arrayBuffer) => dispatch(actions.addClassifiedWithImages(service, extentions, arrayBuffer)),
        updateClassified: (id, service) => dispatch(actions.updateClassified(id, service)),
        updateClassifiedWithImages: (id, service, extentions, arrayBuffer) => dispatch(actions.updateClassifiedWithImages(id, service, extentions, arrayBuffer)),
        deleteClassified: (id) => dispatch(actions.deleteClassified(id)),
        manageClassifiedAdd: (val) => dispatch(actions.manageClassifiedAdd(val)),
        createClassifiedAdd: (val) => dispatch(actions.createClassifiedAddClicked(val)),
        toggleActiveOrInactive: (val, id) => dispatch(actions.toggleActiveOrInactive(val, id)),
        handleStepChange: (steps) => dispatch(actions.handleStepChange(steps))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Classified);