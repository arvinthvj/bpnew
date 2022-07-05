import React, { Component } from 'react'
import PortfolioForm from '../../../components/ProfileSection/PortfolioForm/PortfolioForm';
import { extractExtention } from '../../../utility/utility';
import { decode, encode } from 'base64-arraybuffer';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions/index';
import $ from 'jquery';
import { routes } from '../../../utility/constants/constants';

class Portfolio extends Component {

    constructor(props) {
        super(props);
        this.state = {
            idsToDelete: [],
            imageUrl: null,
            imageName: [],
            base64: [],
            AllFileTypes: [],
            fileType: '',
            link_url: '',
            video_url: '',
            invalidPortfolioUrl: false,
            invalidVideoUrl: false
        }
    }

    componentDidMount = () => {
        $('#OpenImgUpload1').click(function () {
            $('#imgupload1').trigger('click');
        });

        if (!this.props.history.location.state || (this.props.history.location.state && !this.props.history.location.state.isSigningUp)) {
            this.props.history.push(routes.HOME)
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

    addPortfolioImages = () => {
        if (this.state.base64.length > 0) {
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
             
            this.props.getPortfolioPresignedUrls(this.props.user.primary_profile_id, extentions, arrayBuffer, null, this.state.link_url, this.state.video_url);
        } else { 
        // if (this.state.link_url !== '' || this.state.video_url !== '') {
            this.props.addPortfolioImages(this.props.user.primary_profile_id, [], this.state.link_url, this.state.video_url)
        }
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

    fieldChange = (e) => {

        let urlRegex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|([?:www.]|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/
        if (e.target.value && !urlRegex.test(e.target.value)) {

            if (e.target.name === 'link_url') {
                this.setState({ invalidPortfolioUrl: true })
            } else if (e.target.name === 'video_url') {
                this.setState({ invalidVideoUrl: true })
            }
        } else {
            this.setState({
                invalidPortfolioUrl: false,
                invalidVideoUrl: false
            })
        }
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <section className="ph_main_sec pt_83 add_new_class_sec">
                <div className="wrap-login100">
                    <PortfolioForm
                        {...this.state}
                        removeBase64Image={this.removeBase64Image}
                        addPortfolioImages={this.addPortfolioImages}
                        updateImageState={this.updateImageState}
                        updateBase64={this.updateBase64}
                        fieldChange={this.fieldChange}
                        invalidPortfolioUrl={this.state.invalidPortfolioUrl}
                        isPortfolioLoading={this.props.isPortfolioLoading}
                        history={this.props.history} />
                </div>
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.authReducer.user,
        isPortfolioLoading: state.userReducer.isPortfolioLoading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPortfolioPresignedUrls: (profileId, extentions, arrayBuffer, id, link_url, videoLink) => dispatch(actions.getPortfolioPresignedUrls(profileId, extentions, arrayBuffer, id, link_url, videoLink)),
        addPortfolioImages: (profileId, photopaths, link, videoLink) => dispatch(actions.addPortfolioImages(profileId, photopaths, link, videoLink))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);
