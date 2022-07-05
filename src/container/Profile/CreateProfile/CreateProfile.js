import React, { Component } from 'react';
import CreateProfileForm from '../../../components/ProfileSection/CreateProfileForm/CreateProfileForm';
import { toastMsg, resetOrientation } from '../../../utility/utility';
import imageCompression from 'browser-image-compression';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions/index';
import getDetailedAddress from '../../../utility/getDetailedAddress';
import $ from 'jquery';
import { Base64 } from 'js-base64';
import { routes } from '../../../utility/constants/constants';
import { WEB_URL } from '../../../config';
import storage from '../../../utility/storage';
import SpinnerLoader from '../../../components/UI/SpinnerLoader/SpinnerLoader';
import Oux from '../../../hoc/Oux/Oux';

class CreateProfile extends Component {
   constructor(props) {
      super(props);
      this.state = {
         file: null,
         image: null,
         address: null,
         isProfileImageUploading: false,
      };
      this.onImageUpload = this.onImageUpload.bind(this);
      this.handleAddressSelect = this.handleAddressSelect.bind(this);
   }

   componentDidMount = () => {
      // let redirectToPricing = storage.get('redirectToPricing', null);
      // let via = storage.get('via', null)
      // if (redirectToPricing) {
      //    let encryptedEmail = Base64.encode(this.props.user.email);
      //    let redirectUrl = WEB_URL() + routes.CREATE_NEW_PROFILE;
      //    let pricingPlanRoute = storage.get('pricingPlanRoute', null);
      //    if (pricingPlanRoute) {
      //       if(via){
      //          window.open(
      //             `${pricingPlanRoute}/?redirectto=${redirectUrl}&via=${via}`,
      //             '_self'
      //          );
      //       }else{
      //          window.open(
      //             `${pricingPlanRoute}/?redirectto=${redirectUrl}`,
      //             '_self'
      //          );
      //       }
      //       storage.remove('pricingPlanRoute');
      //    } else {
      //       if(via){
      //          window.open(
      //             `${routes.PRICING}/?redirectto=${redirectUrl}&via=${via}`,
      //             '_self'
      //          );
      //       }else{
      //          window.open(
      //             `${routes.PRICING}/?redirectto=${redirectUrl}`,
      //             '_self'
      //          );
      //       }
      //    }
      //    storage.remove('redirectToPricing');
      // }
   };

   async onImageUpload(e) {
      if (
         (e.target && e.target.files && e.target.files.length > 0) ||
         (e && e.length > 0)
      ) {
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
      const addressFields = await getDetailedAddress(address);
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

   render() {
      let redirectToPricing = storage.get('redirectToPricing', null);
      return (
         <Oux>
            {redirectToPricing ? (
               <section className="ph_main_sec pt_83 ph_profile_sec">
                  <SpinnerLoader />
               </section>
            ) : (
               <section className="ph_main_sec pt_83 ph_profile_sec">
                  <div className="wrap-login100">
                     <CreateProfileForm
                        profilePhotoPath={this.props.profilePhotoPath}
                        file={this.state.file}
                        profileImage={this.state.image}
                        isProfileImageUploading={
                           this.state.isProfileImageUploading
                        }
                        user={this.props.user}
                        isLoading={
                           this.props.isLoading || this.props.isAuthLoading
                        }
                        address={this.state.address}
                        history={this.props.history}
                        handleAddressSelect={this.handleAddressSelect}
                        createProfile={this.props.createProfile}
                        onImageUpload={this.onImageUpload}
                        businessProfile={this.props.businessProfile}
                        setBusinessProfile={this.props.setBusinessProfile}
                     />
                  </div>
               </section>
            )}
         </Oux>
      );
   }
}

const mapStateToProps = (state) => ({
   user: state.authReducer.user,
   isLoading: state.profileReducer.isloading,
   isAuthLoading: state.authReducer.isloading,
   profilePhotoPath: state.profileReducer.photo_path,
   businessProfile: state.profileReducer.businessProfile,
});

const mapStateToDispatch = (dispatch) => ({
   profilePhotoUpload: (credentials, image) =>
      dispatch(actions.profilePhotoUpload(credentials, image)),
   createProfile: (user) => dispatch(actions.createProfile(user)),
   setBusinessProfile: (status) => dispatch(actions.businessProfile(status)),
   showImageCropModal: (imageCropParams) => dispatch(actions.showImageCropModal(imageCropParams)),
   uploadImageOnWordpress: (file) => dispatch(actions.uploadImageOnWordpress(file))
});

export default connect(mapStateToProps, mapStateToDispatch)(CreateProfile);
