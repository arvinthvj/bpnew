import React, { useState } from 'react';
import ReactSelect from '../UI/ReactSelect/reactSelect';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import { Categories, routes, formInputTextErrorStyle, formInputErrorStyle, address, Roles, SubscriptionStatus } from '../../utility/constants/constants';
import { validatePlaces } from '../../utility/validator/formValidation/formValidation';
import MyDropZone from '../DragAndDropFiles/DragAndDropImages';
import LoadingBtn from '../UI/LoadingButton/LoadingButton';
import AddressAutoComplete from '../UI/AddressAutoComplete/AddressAutoComplete';
import ImageLoader from 'react-imageloader';
import MultiSelectCheckBox from '../UI/MultiselectCheckBox/MultiselectCheckBox';
import { removeEmptyStringKeys, getEditCompensations, isSafari } from '../../utility/utility';
import CustomToolTip from '../UI/CustomToolTip/CustomToolTip';
import { Prompt, useHistory } from 'react-router-dom';
const cloneDeep = require('clone-deep');


const PlacesForm = (props) => {

    const Profiles = props.user.profiles;
    const history = useHistory()

    const categoryNavigtion = (event) => {
        let Name = event.target.value
        props.setSelectedCategory(Name)
      };

    Profiles.sort(function (a, b) {
        if (a === parseInt(props.user.primary_profile_id)) return 1;
        else if (b === parseInt(props.user.primary_profile_id)) return 1;
        else { return 0 };
    });

    const [addressDisable, setAddressDisable] = useState(false);

    const compensations = props.compensations.map(compensation => {
        return {
            value: compensation.id,
            label: compensation.name
        }
    })

    const setInitialValues = {
        title: props.service ? props.service.title : '',
        description: props.service ? props.service.description : '',
        cool_feature: props.service ? props.service.cool_feature : '',
        compensation_ids: props.service ? getEditCompensations(props.service.compensations) : [],
        specification: props.service ? props.service.specification : '',
        address: props.service ? props.service.address : { ...address },
        profile_id: props.service ? props.service.profile_id : props.user.subscription_status !== SubscriptionStatus.ACTIVE ? parseInt(props.user.primary_profile_id) : '',
        virtual: props.service && typeof props.service.virtual === "boolean" ? props.service.virtual : false,
    }

    const addCategoryId = (Place, categories) => {
        const currentLocation = props.history.location.pathname;
        categories.forEach(categorie => {
            if (categorie.name === Categories.PLACES) {
                Place['category_id'] = categorie.id;
            }
        })
    }

    const addOrUpdatePlaceService = (values) => {
        const Place = cloneDeep(values);

        if (!Place.address && !Place.address.zip || Place.address.zip === '') {
            delete Place.address;
        } else {
            removeEmptyStringKeys(Place.address);
        }

        const a = Place.compensation_ids;
        const set = new Set([a]);
        const b = Array.from(set);
        Place.compensation_ids = b;

        if (props.profilePicPath) {
            Place.profilePicPath = props.profilePicPath
        }

        // Place.compensation_ids = values.compensation_ids && values.compensation_ids.map(c => {
        //     return c.value
        // })
        // Place.address.zip = Place.address.zip.toString();
        // Place['profile_id'] = props.user.primary_profile_id;
        addCategoryId(Place, props.categories);
        if (props.defaultImagePath) {
            Place.default_image_path = props.defaultImagePath
        }
        if (props.defaultBase64Index) {
            Place.defaultBase64Index = props.defaultBase64Index
        }
        props.addOrUpdatePlaceService(Place);
    }

    function preloader() {
        return <LoadingBtn btnClassName="ph_sm_cricle transparent_bg_loading_btn delete_portfolio_image" />
    }

    const loadUploadedImages = (attachments) => {
        return attachments.map((url, i) => {
            let selectedImageClass = "ph_fig"
            let flag = false
            if (props.defaultImagePath) {
                if (props.defaultImagePath === url.url) {
                    selectedImageClass = "ph_fig default_selected_img"
                    flag = true
                }
            } else {
                if (props.service.default_image_id && props.service.default_image_id === url.id) {
                    selectedImageClass = "ph_fig default_selected_img"
                    flag = true
                }
            }
            return (
                <li key={i} className="upload_images_items details_image_preview_wrapper">
                    {
                        flag
                            ? <CustomToolTip placement="top" text={<span>This image will be shown in searches.</span>}>
                                <figure onClick={(event) => props.setDefaultImagePath(event, url.url)} className={selectedImageClass}>
                                    <ImageLoader
                                        style={{ width: '100%', height: '100%' }}
                                        src={url.photo_urls.small}
                                        wrapper={React.createFactory('div')}
                                        preloader={preloader}>
                                        Image load failed!
                                    </ImageLoader>
                                    <a href="javascript:void(0)" className="ph_sm_cricle" onClick={() => props.removeUplodedImage(url.id)}>
                                        <img src="/images/icons/icn_trash_danger.svg" alt="Trash Icon" />
                                    </a>
                                </figure>
                            </CustomToolTip>
                            : <figure onClick={(event) => props.setDefaultImagePath(event, url.url)} className={selectedImageClass}>
                                <ImageLoader
                                    style={{ width: '100%', height: '100%' }}
                                    src={url.photo_urls.small}
                                    wrapper={React.createFactory('div')}
                                    preloader={preloader}>
                                    Image load failed!
                                </ImageLoader>
                                <a href="javascript:void(0)" id="delete_image_icon" className="ph_sm_cricle" onClick={() => props.removeUplodedImage(url.id)}>
                                    <img id="delete_image_icon" src="/images/icons/icn_trash_danger.svg" alt="Trash Icon" />
                                </a>
                            </figure>
                    }
                </li>
            )
        }
        )
    }

    const loadBase64Images = (base64Images) => {
        return base64Images.map((base64, i) => {
            let selectedImageClass = "ph_fig"
            let flag = false
            if (props.defaultBase64Index && props.defaultBase64Index.toString() === i.toString()) {
                selectedImageClass = "ph_fig default_selected_img"
                flag = true
            }
            return (
                <li className="upload_images_items">
                    {
                        flag
                            ? <CustomToolTip placement="top" text={<span>This image will be shown in searches.</span>}>
                                <figure className={selectedImageClass} onClick={(event) => props.setDefaultBase64Index(event, i.toString())}>
                                    <ImageLoader
                                        style={{ width: '100%', height: '100%' }}
                                        src={base64}
                                        wrapper={React.createFactory('div')}
                                        preloader={preloader}>
                                        Image load failed!
                                    </ImageLoader>
                                    <a href="javascript:void(0)" className="ph_sm_cricle" onClick={() => props.removeBase64Image(base64, i)}>
                                        <img src="/images/icons/icn_trash_danger.svg" alt="Trash Icon" />
                                    </a>
                                </figure>
                            </CustomToolTip>
                            : <figure className={selectedImageClass} onClick={(event) => props.setDefaultBase64Index(event, i.toString())}>
                                <ImageLoader
                                    style={{ width: '100%', height: '100%' }}
                                    src={base64}
                                    wrapper={React.createFactory('div')}
                                    preloader={preloader}>
                                    Image load failed!
                                </ImageLoader>
                                <a href="javascript:void(0)" className="ph_sm_cricle" id="delete_image_icon" onClick={() => props.removeBase64Image(base64, i)}>
                                    <img src="/images/icons/icn_trash_danger.svg" id="delete_image_icon" alt="Trash Icon" />
                                </a>
                            </figure>
                    }
                </li>
            )
        }
        )
    }

    const ImageUIComponent = (
        <div className="add_itemes ph_flex_wrp_spw">
            {/* <input type="file" id="imgupload1" style={{ display: 'none' }} /> */}
            <a href="javascript:void(0)" id="OpenImgUpload1">
                <span className="icn_camera"><img src="/images/icons/icn_camera.svg" /> </span>
                <span className="icn_camera_text">Click to add photos or just drag and drop</span>
            </a>
        </div>
    )

    let noOfRequiredImages = 4
    if (props.service && props.service.attachments && props.service.attachments.length > 0) {
        noOfRequiredImages = noOfRequiredImages - props.service.attachments.length
    }
    if (props.base64 && props.base64.length > 0) {
        noOfRequiredImages = noOfRequiredImages - props.base64.length
    }
    if (props.profilePicPath) {
        noOfRequiredImages = noOfRequiredImages - 1
    }
    console.log(noOfRequiredImages, "imageRequired")
    if (props.service && props.service.attachments && props.service.attachments.length > 0) {
        if (!props.defaultImagePath && !props.defaultBase64Index) {
            props.setDefaultImagePath(null, props.service.attachments[0].url)
        }
    }
    else if (props.base64.length > 0) {
        if (!props.defaultImagePath && !props.defaultBase64Index) {
            props.setDefaultBase64Index(null, "0")
        }
    } else if (props.profilePicPath) {
        if (!props.defaultImagePath && !props.defaultBase64Index) {
            props.setDefaultImagePath(null, props.profilePicPath)
        }
    }
    return (
        <Formik
            enableReinitialize={true}
            initialValues={setInitialValues}
            validate={(values) => validatePlaces(values, setAddressDisable)}
            onSubmit={addOrUpdatePlaceService}
        >
            {(formicProps) => {
                const errors = formicProps.errors
                const touched = formicProps.touched
                let selectedImageClass = "ph_fig"
                let flag = false
                if (props.defaultImagePath) {
                    if (props.defaultImagePath === props.profilePicPath) {
                        selectedImageClass = "ph_fig default_selected_img"
                        flag = true
                    }
                }
                return (
                    <Form className="tab-pane fade show active" id="pills-places" role="tabpanel" aria-labelledby="pills-places-tab">
                        {!isSafari() && <Prompt
                            when={props.isBlocking}
                            message={location =>
                                `Do you want to leave the offer page?`
                            }
                        />}
                        <div className="card switch_card_list card_bg_300">
                            <div className="card-body">
                                <div className="ph_title_btn ph_flex_wrp_spw">
                                    <h4 className="theme_sm_title">Create New Offer</h4>
                                    {/* <a
                                        href="javascript:void(0)"
                                        onClick={props.createPlaceClicked}
                                        className="theme_btn theme_primary"
                                        >
                                        CREATE NEW OFFER
                                        </a> */}
                                    {/* <a href="javascript:void(0)" className="text-uppercase">
                                        <img src="/images/icons/icn_trash.svg" alt="Icon Trash" />
                                    </a> */}
                                </div>
                                <div className="form_group_modify">
                                    <label for="Title" className="label_modify">Title <span className="text-danger">*</span></label>
                                    <Field name='title' type="text" className="input_modify input_modify_lg" id="Title"
                                        style={errors.title && touched.title ? formInputErrorStyle : null} placeholder="Enter the headline or title of your offer"
                                    />
                                    <ErrorMessage name="title" render={msg => <span style={formInputTextErrorStyle}>{msg}</span>} />
                                </div>
                                <div className="form_group_modify">
                                    <label for="PlaceDescription" className="label_modify">Description/Type/Size/Timeframe <span className="text-danger">*</span></label>
                                    <Field name="description" as="textarea" id="ServiceDescription" className="input_modify input_modify_lg" rows="4"
                                        style={errors.description && touched.description ? formInputErrorStyle : null}
                                        placeholder={`Description: Enter a complete description of the physical space you're offering, including keywords others will use to find it.\nType: Also, what category does your service fall within (Conference room, maker-space, art-studio, furnished office, etc)?\nTime Frame: Finally, when is it available and for how long?  Availble right now?`}
                                    />
                                    <ErrorMessage name="description" render={msg => <span style={formInputTextErrorStyle}>{msg}</span>} />
                                </div>
                                <div className="form_group_modify">
                                    <label for="WhyCool" className="label_modify">Why It's Cool</label>
                                    <Field name="cool_feature" type="text" className="input_modify input_modify_lg" id="WhyCool" placeholder="Tell us what makes your space especially unique and desirable?" />
                                </div>
                                <div className="form_group_modify">
                                    <label for="RulesRestrictions" className="label_modify">Rules/Restrictions</label>
                                    <Field as="textarea" name="specification" className="input_modify input_modify_lg" id="RulesRestrictions" rows="4" placeholder="Type here" />
                                </div>
                                <div className="form-row">
                                    <div className="form_group_modify col-md-3">
                                        <label for="Categories" className="label_modify">Categories </label>
                                        <Field as="select" className="input_modify cstSelect"
                                             value={props.selectedCategory} onChange={(e) => categoryNavigtion(e)}
                                        >
                                            {props.categories && props.categories.map((category) => {
                                                    return <option key={category.id} >{category.name}</option>
                                                
                                            })}
                                        </Field>
                                    </div>
                                    <div className="form_group_modify col-md-3">
                                        <label for="Compensation" className="label_modify">Compensation <span className="text-danger">*</span></label>
                                        {/* <MultiSelectCheckBox
                                            options={compensations}
                                            name={'compensation_ids'}
                                            className="input_modify cstSelect"
                                            error={errors.compensation_ids && touched.compensation_ids ? true : false}
                                            value={formicProps.values.compensation_ids}
                                            onChange={formicProps.setFieldValue}
                                        /> */}
                                        <Field as="select" name='compensation_ids' className="input_modify cstSelect"
                                            style={errors.compensation_ids && touched.compensation_ids ? formInputErrorStyle : null}
                                        >
                                            {/* <option defaultValue>Select</option> */}
                                            {props.compensations.map(compensation => {
                                                if (compensation.name === "Let's get Creative") {
                                                    if (!formicProps.values.compensation_ids || (formicProps.values.compensation_ids && formicProps.values.compensation_ids.length === 0)) {
                                                        formicProps.setFieldValue('compensation_ids', compensation.id)
                                                    }
                                                    return <option value={compensation.id} style={{ backgroundColor: '#EF5A2F', color: 'white' }}>{compensation.name}</option>
                                                }
                                                else {
                                                    if (!compensation.name.includes('Internship')) {
                                                        return <option value={compensation.id}>{compensation.name}</option>
                                                    }
                                                }
                                            })}
                                        </Field>
                                        <ErrorMessage name="compensation_ids" render={msg => <span style={formInputTextErrorStyle}>{msg}</span>} />
                                    </div>
                                    <div className="form_group_modify col-md-3">
                                        <label for="Address" className="label_modify">City</label>
                                        <div className="address_info_icon">
                                            <CustomToolTip placement="top" text={<span>Auto-Lookup: start typing City name</span>}>
                                                <img src="/custom_images/icn_info.svg" className="si_inner" alt="search" />
                                            </CustomToolTip>
                                        </div>
                                        {/* <Field type="text" className="input_modify input_modify_lg" name="address[street_address]" id="Address" /> */}
                                        <AddressAutoComplete
                                            name="address[street_address]"
                                            errors={errors}
                                            touched={touched}
                                            disabled={formicProps.values.virtual}
                                            setFieldTouched={formicProps.setFieldTouched}
                                            address={props.address}
                                            value={formicProps.values.address['street_address']}
                                            onChange={formicProps.setFieldValue}
                                            handleAddressSelect={props.handleAddressSelect}
                                        />
                                        <ErrorMessage name="address[street_address]" render={msg => <span style={formInputTextErrorStyle}>{msg}</span>} />
                                    </div>
                                    <div className="form_group_modify col-md-3">
                                        <label for="zip" className="label_modify">Zip code
                                            {formicProps.values.virtual ? null : <span className="text-danger">*</span>}
                                        </label>
                                        {/* && (touched.address && touched.address['zip']) */}
                                        <Field disabled={formicProps.values.virtual} style={(errors.address && errors.address['zip']) && (touched.address && touched.address['zip']) ? formInputErrorStyle : null}
                                            type="text" className="input_modify input_modify_lg" placeholder="Zipcode" name="address[zip]" id="zip" />
                                        <ErrorMessage name="address[zip]" render={msg => <span style={formInputTextErrorStyle}>{msg}</span>} />
                                    </div>
                                </div>
                                {/* <div className="form-row">
                                    <div className="form_group_modify col-md-4">
                                        <label for="City" className="label_modify">City</label>
                                        <Field disabled={true} style={(errors.address && errors.address['city']) && (touched.address && touched.address['city']) ? formInputErrorStyle : null}
                                            type="text" className="input_modify input_modify_lg" placeholder="City" name="address[city]" id="City" />
                                        <ErrorMessage name="address[city]" render={msg => <span style={formInputTextErrorStyle}>{msg}</span>} />
                                    </div>
                                    <div className="form_group_modify col-md-4">
                                        <label for="State" className="label_modify">State</label>
                                        <Field disabled={true} type="text" className="input_modify input_modify_lg" placeholder="State" name="address[state]" id="State" />
                                    </div>
                                    <div className="form_group_modify col-md-4">
                                        <label for="zip" className="label_modify">Zip code
                                            {formicProps.values.virtual ? null : <span className="text-danger">*</span>}
                                        </label>
                                        && (touched.address && touched.address['zip'])
                                        <Field disabled={formicProps.values.virtual} style={(errors.address && errors.address['zip']) && (touched.address && touched.address['zip']) ? formInputErrorStyle : null}
                                            type="text" className="input_modify input_modify_lg" placeholder="Zipcode" name="address[zip]" id="zip" />
                                        <ErrorMessage name="address[zip]" render={msg => <span style={formInputTextErrorStyle}>{msg}</span>} />
                                    </div>
                                </div> */}

                                <div className="form-row">
                                    <div class="form_group_modify col-sm-6">
                                        <label for="Compensation" class="label_modify">Posted by {/*(Orange color denotes all the business profiles)*/}: <span className="text-danger">*</span></label>
                                        <Field as="select" name='profile_id' disabled={props.user.subscription_status !== SubscriptionStatus.ACTIVE ? true : false} className={props.user.subscription_status !== SubscriptionStatus.ACTIVE ? "input_modify cstSelect disableSelect" : 'input_modify cstSelect'}
                                            style={errors.profile_id && touched.profile_id ? formInputErrorStyle : null}
                                        >
                                            <option defaultValue>Select</option>
                                            {Profiles.filter(item=>item.type!=='company').map(p => (
                                                <option className={p.type && p.type.toLowerCase() === 'company' ? 'text-primary' : null} value={p.id}>{p.title}</option>
                                            ))}
                                        </Field>
                                    </div>
                                    <div className="form_group_modify col-md-6">
                                        <div className="virtual_input_wrp">
                                            <CustomToolTip placement="top" text="Physical Location Is Not Relevant">
                                                <label className="ph_container ph_lg_container">
                                                    <span className="ph_check_title">Virtual</span>
                                                    <Field name="virtual" type="checkbox" />
                                                    <span className="ph_checkmark ph_lg_checkmark"></span>
                                                </label>
                                            </CustomToolTip>
                                        </div>
                                    </div>
                                </div>
                                <div className="form_group_modify">
                                    <label className="label_modify">Upload images <span className="text-danger">*</span> -  <i style={{ fontWeight: 400 }}>(Maximum 4 images) Please click on the image to mark it as default image for an offer. Default image will be shown in searches. Upload at least 1 offer image to successfully post this offer. </i>

                                        {
                                            props.profilePicPath
                                                ? null
                                                : formicProps.values.profile_id
                                                    ? <a onClick={(event) => {
                                                        let flag = false
                                                        props.user.profiles.map((profile, index) => {
                                                            if (profile.id.toString() === formicProps.values.profile_id.toString()) {
                                                                flag = true
                                                                if (profile.photo_urls && Object.keys(profile.photo_urls).length > 0) {
                                                                    props.copyProfilePic(profile.photo_path);
                                                                }
                                                            } else if (profile.id.toString() === props.user.primary_profile_id && !flag) {
                                                                if (profile.photo_urls && Object.keys(profile.photo_urls).length > 0) {
                                                                    props.copyProfilePic(profile.photo_path);
                                                                }
                                                            }
                                                        })
                                                    }} className="text-primary ph_underline non_href_a_tag" style={{ textDecoration: 'underline' }}>Copy Profile Pic</a>
                                                    : null
                                        }
                                    </label>
                                    <ul className="upload_images_list">
                                        <li className="upload_images_items">
                                            <MyDropZone
                                                // that={props.that}
                                                noOfRequiredImages={noOfRequiredImages}
                                                isOffers={true}
                                                setIsImageUploading={props.setIsImageUploading}
                                                updateBase64={props.updateBase64}
                                                updateImageState={props.updateImageState}
                                                state={props.state}
                                                UIComponent={ImageUIComponent}
                                            />
                                        </li>
                                        {props.service && props.service.attachments && props.service.attachments.length > 0 ?
                                            loadUploadedImages(props.service.attachments)
                                            : null
                                        }
                                        {props.base64.length > 0 ?
                                            loadBase64Images(props.base64)
                                            : props.isImageUploading
                                                ? <li className="upload_images_items">
                                                    <figure className="ph_fig">
                                                        <LoadingBtn btnClassName="ph_sm_cricle transparent_bg_loading_btn delete_portfolio_image" />
                                                        <a href="javascript:void(0)" style={{ opacity: 0.5 }} className="ph_sm_cricle disabled_btn">
                                                            <img src="/images/icons/icn_trash_danger.svg" alt="Trash Icon" />
                                                        </a>
                                                    </figure>
                                                </li>
                                                : null}
                                        {
                                            props.profilePicPath
                                                ? props.user.profiles.map((profile, index) => {
                                                    if (profile.photo_path === props.profilePicPath) {
                                                        if (profile.photo_urls && Object.keys(profile.photo_urls).length > 0) {
                                                            if (flag) {
                                                                return (
                                                                    <li className="upload_images_items details_image_preview_wrapper">
                                                                        <CustomToolTip placement="top" text={<span>This image will be shown in searches.</span>}>
                                                                            <figure onClick={(event) => props.setDefaultImagePath(event, props.profilePicPath)} className={selectedImageClass}>
                                                                                <ImageLoader
                                                                                    style={{ width: '100%', height: '100%' }}
                                                                                    src={profile.photo_urls.small}
                                                                                    wrapper={React.createFactory('div')}
                                                                                    preloader={preloader}>
                                                                                    Image load failed!
                                                                                </ImageLoader>
                                                                                <a href="javascript:void(0)" id="delete_image_icon" className="ph_sm_cricle" onClick={() => props.copyProfilePic(null)}>
                                                                                    <img src="/images/icons/icn_trash_danger.svg" id="delete_image_icon" alt="Trash Icon" />
                                                                                </a>
                                                                            </figure>
                                                                        </CustomToolTip>
                                                                    </li>
                                                                )
                                                            }
                                                            return (
                                                                <li className="upload_images_items details_image_preview_wrapper">
                                                                    <figure onClick={(event) => props.setDefaultImagePath(event, props.profilePicPath)} className={selectedImageClass}>
                                                                        <ImageLoader
                                                                            style={{ width: '100%', height: '100%' }}
                                                                            src={profile.photo_urls.small}
                                                                            wrapper={React.createFactory('div')}
                                                                            preloader={preloader}>
                                                                            Image load failed!
                                                                            </ImageLoader>
                                                                        <a href="javascript:void(0)" className="ph_sm_cricle" onClick={() => props.copyProfilePic(null)}>
                                                                            <img src="/images/icons/icn_trash_danger.svg" alt="Trash Icon" />
                                                                        </a>
                                                                    </figure>
                                                                </li>
                                                            )
                                                        }
                                                    }
                                                })
                                                : null
                                        }
                                    </ul>
                                </div>
                                <div className="actions_btns w-100 text-right">
                                    <button className="theme_btn theme_btn_gray text-uppercase" type="button" onClick={props.cancelPlaceClicked}>Cancel</button>
                                    {props.addOrUpdateOrDeleteServiceLoading ? <LoadingBtn btnClassName="theme_btn theme_primary text-uppercase ml-2" btnTitle="Loading" /> :
                                        <button className="theme_btn theme_primary text-uppercase ml-2" type="submit">save</button>
                                    }
                                </div>
                            </div>
                        </div >
                    </Form >
                )
            }}
        </Formik >
    )
}

export default PlacesForm;