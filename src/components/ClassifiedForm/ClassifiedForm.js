import React, { useState } from 'react';
import ReactSelect from '../UI/ReactSelect/reactSelect';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import { Categories, routes, formInputTextErrorStyle, formInputErrorStyle, address, Roles, SubscriptionStatus, CategoriesList } from '../../utility/constants/constants';
import { validateClassification } from '../../utility/validator/formValidation/formValidation';
import MyDropZone from '../DragAndDropFiles/DragAndDropImages';
import LoadingBtn from '../UI/LoadingButton/LoadingButton';
import AddressAutoComplete from '../UI/AddressAutoComplete/AddressAutoComplete';
import ImageLoader from 'react-imageloader';
import { removeEmptyStringKeys, getEditCompensations, isSafari } from '../../utility/utility';
import CustomToolTip from '../UI/CustomToolTip/CustomToolTip';
import MultiSelectCheckBox from '../UI/MultiselectCheckBox/MultiselectCheckBox';
import { Prompt } from 'react-router-dom';
const cloneDeep = require('clone-deep');

const ClassifiedForm = (props) => {

    const Profiles = props.user.profiles;

    Profiles.sort(function (a, b) {
        if (a === parseInt(props.user.primary_profile_id)) return 1;
        else if (b === parseInt(props.user.primary_profile_id)) return 1;
        else { return 0 };
    });

    const getEditCompensationsOnCategory = (categoryId, selectedCompensations) => {
        let compensations = [];
        props.categories.map(category => {
            if (category.id.toString() === categoryId) {

                compensations = category.compensations;
                // compensations = category.compensations.map(compensation => {
                //     return {
                //         value: compensation.id,
                //         label: compensation.name
                //     }
                // })
            }
        })
        return compensations;
    }

    const [compensationList, setcompensationList] = useState(props.classified ? getEditCompensationsOnCategory(props.classified.category_id) : props.compensationsList);
    const [addressDisable, setAddressDisable] = useState(false);

    const setSkillState = (categoryId) => {
        let disabledValue = true;
        props.categories.map(category => {
            if (category.id.toString() === categoryId) {
                if (category.name === 'People' || category.name === 'Jobs/Gigs') {
                    disabledValue = false;
                }
                //  else {
                //     disabledValue = true;
                // }
            }
        })

        return disabledValue;
    }

    const [disableSkill, setDisableSkill] = useState(props.classified ? setSkillState(props.classified.category_id) : true);

    const skills = props.skills.map(skill => {
        return {
            value: skill.id,
            label: skill.name
        }
    })



    const getEditSkills = (skills) => {
        let skillsData = [];
        skills.forEach(skill => {
            skillsData.push({
                value: skill.id,
                label: skill.name
            })
        })
        return skillsData;
    }

    const setInitialValues = {
        title: props.classified ? props.classified.title : '',
        description: props.classified ? props.classified.description : '',
        skills: props.classified ? getEditSkills(props.classified.skills) : '',
        category_id: props.classified ? props.classified.category_id : '',
        compensation_ids: props.classified ? getEditCompensations(props.classified.compensations) : [],
        address: props.classified ? props.classified.address : { ...address },
        profile_id: props.classified ? props.classified.profile_id : props.user.subscription_status !== SubscriptionStatus.ACTIVE ? parseInt(props.user.primary_profile_id) : '',
        virtual: props.classified ? props.classified.virtual : false
    }


    const noOptionsMessage = (a, b) => {
        return 'Skills not found';
    }

    const addCategoryId = (myService, categories) => {
        const currentLocation = props.history.location.pathname;
        categories.forEach(categorie => {
            if (categorie.name === Categories.MY_SERVICES && (routes.MY_SERVICES === currentLocation || routes.OFFERS === currentLocation)) {
                myService['category_id'] = categorie.id;
            }
        })
    }

    const addOrUpdateClassified = (values) => {
        const classified = cloneDeep(values);
        if (!classified.address.zip || classified.address.zip === '') {
            delete classified.address;
        } else {
            removeEmptyStringKeys(classified.address);
        }
        if (values.skills && values.skills.length > 0) {
            classified.skills = values.skills && values.skills.map(skill => {
                return {
                    id: skill.value,
                    name: skill.label
                }
            })
        } else {
            delete classified.skills
        }

        const a = classified.compensation_ids;
        const set = new Set([a]);
        const b = Array.from(set);
        classified.compensation_ids = b;
        if (props.profilePicPath) {
            classified.profilePicPath = props.profilePicPath
        }
        // classified.compensation_ids = values.compensation_ids && values.compensation_ids.map(c => {
        //     return c.value
        // })

        // classified.address.zip = classified.address.zip.toString();
        // classified['profile_id'] = props.user.primary_profile_id;
        // addCategoryId(myService, props.categories);
        props.addOrUpdateClassified(classified);
    }


    function preloader() {
        return <LoadingBtn btnClassName="ph_sm_cricle transparent_bg_loading_btn delete_portfolio_image" />
    }

    const loadUploadedImages = (attachments) => {
        return attachments.map((url, i) => {
            return (
                <li className="upload_images_items">
                    <figure className="ph_fig">
                        <ImageLoader
                            style={{ width: '100%', height: '100%' }}
                            src={url.photo_urls.small}
                            wrapper={React.createFactory('div')}
                            preloader={preloader}>
                            Image load failed!
                        </ImageLoader>
                        {/* <img src={url.photo_urls.small} alt="Thumbnail" /> */}
                        <a href="javascript:void(0)" className="ph_sm_cricle" onClick={() => props.removeUplodedImage(url.id)}>
                            <img src="/images/icons/icn_trash_danger.svg" alt="Trash Icon" />
                        </a>
                    </figure>
                </li>
            )
        }
        )
    }

    const loadBase64Images = (base64Images) => {
        return base64Images.map((base64, i) => {
            return (
                <li className="upload_images_items">
                    <figure className="ph_fig">
                        <img src={base64} alt="Thumbnail" />
                        <a href="javascript:void(0)" className="ph_sm_cricle" onClick={() => props.removeBase64Image(base64, i)}>
                            <img src="/images/icons/icn_trash_danger.svg" alt="Trash Icon" />
                        </a>
                    </figure>
                </li>
            )
        }
        )
    }

    const ImageUIComponent = (
        <div className="add_itemes ph_flex_wrp_spw">
            {/* <input type="file" id="imgupload1" style={{ display: 'none' }} /> */}
            <a href="javascript:void()" id="OpenImgUpload1">
                <span className="icn_camera"><img src="/images/icons/icn_camera.svg" /> </span>
                <span className="icn_camera_text">Click to add photos or just drag and drop</span>
            </a>
        </div>
    )

    const getCompensationData = (e, formicProps) => {
        formicProps.setFieldValue('category_id', e.target.value);
        formicProps.setFieldValue('compensation_ids', []);
        let value = e.target.value;
        props.categories.map(category => {
            if (category.id.toString() === value) {
                // const compensations = category.compensations.map(compensation => {
                //     return {
                //         value: compensation.id,
                //         label: compensation.name
                //     }
                // })
                setcompensationList(category.compensations);
                if (category.name === 'People' || category.name === 'Jobs/Gigs') {
                    setDisableSkill(false);
                } else {
                    formicProps.setFieldValue('skills', '');
                    setDisableSkill(true);
                }
            }
        })
        if (props.goToStep && props.goToStep.steps) {
            let step = props.goToStep.steps + 1
            props.handleStepChange(step)
        }
    }

    let noOfRequiredImages = 4
    if (props.service && props.service.attachments && props.service.attachments.length > 0) {
        noOfRequiredImages = noOfRequiredImages - props.service.attachments.length
    }
    if (props.base64 && props.base64.length > 0) {
        noOfRequiredImages = noOfRequiredImages - props.base64.length
    }
    console.log(noOfRequiredImages, "imageRequired")

    return (
        <Formik
            enableReinitialize={true}
            initialValues={setInitialValues}
            validate={(values) => validateClassification(values, setAddressDisable)}
            onSubmit={addOrUpdateClassified}
        >
            {(formicProps) => {
                const errors = formicProps.errors
                const touched = formicProps.touched
                console.log(formicProps.values, "formicProps.values")
                return (

                    <Form className="ph_main_sec pt_83">
                        {!isSafari() && <Prompt
                            when={props.isBlocking}
                            message={location =>
                                `Do you want to leave the WantAd page?`
                            }
                        />}
                        <div className="container-fluid theme_px_60">
                            <div className="ph_hz_tabs_wrp">
                                <div className="tab-pane fade show active" id="pills-my-services" role="tabpanel" aria-labelledby="pills-my-services-tab">
                                    <div class="tab-content" id="pills-tabContent">
                                        <div className="card switch_card_list card_bg_300 mb_40">
                                            <div className="card-body">
                                                <div className="ph_title_btn border-bottom-0 pb-0">
                                                    <h4 className="theme_sm_title">My Want Ads: What I Need But Can't Find</h4>
                                                </div>
                                                <div className="form_group_modify">
                                                    <label for="Title" className="label_modify">Title <span className="text-danger">*</span></label>
                                                    <Field name='title' id="Title" type="text" className="input_modify input_modify_lg" placeholder="Try ‘Marketing Officer’, ‘CTO’ "
                                                        style={errors.title && touched.title ? formInputErrorStyle : null} />
                                                    <ErrorMessage name="title" render={msg => <span style={formInputTextErrorStyle}>{msg}</span>} />
                                                </div>
                                                <div className="form_group_modify">
                                                    <label for="ServiceDescription" className="label_modify">Description <span className="text-danger">*</span></label>
                                                    <Field name="description" as="textarea" id="ServiceDescription" className="input_modify input_modify_lg" rows="4"
                                                        style={errors.description && touched.description ? formInputErrorStyle : null}
                                                    />
                                                    <ErrorMessage name="description" render={msg => <span style={formInputTextErrorStyle}>{msg}</span>} />
                                                </div>
                                                <div className="form-row">
                                                    <div className="form_group_modify col-md-6" id="filter_list_walk">
                                                        <label for="Compensation" className="label_modify">Category <span className="text-danger">*</span></label>
                                                        <Field as="select" name='category_id' onChange={(e) => getCompensationData(e, formicProps)} className="input_modify cstSelect"
                                                            style={errors.category_id && touched.category_id ? formInputErrorStyle : null}
                                                        >
                                                            <option defaultValue>Select</option>
                                                            {props.categories.map(category => {
                                                                let categoryName = null
                                                                if (category.name.toLowerCase() === CategoriesList.JOB.toLowerCase()) {
                                                                    categoryName = "Services"
                                                                } else if (category.name.toLowerCase() === CategoriesList.OPPORTUNITY.toLowerCase()) {
                                                                    categoryName = "Information"
                                                                } else if (category.name.toLowerCase() === CategoriesList.DONATION.toLowerCase()) {
                                                                    categoryName = "Other/Misc"
                                                                }
                                                                return (
                                                                    <option value={category.id}>{categoryName ? categoryName : category.name}</option>
                                                                )
                                                            })}
                                                        </Field>
                                                        <ErrorMessage name="category_id" render={msg => <span style={formInputTextErrorStyle}>{msg}</span>} />
                                                    </div>
                                                    <div className="form_group_modify col-md-6">
                                                        <label for="Skills" className="label_modify">Skills</label>
                                                        {/* {disableSkill ? null : <span className="text-danger">*</span>} */}
                                                        <ReactSelect
                                                            disabled={disableSkill}
                                                            value={formicProps.values.skills}
                                                            noOptionsMessage={noOptionsMessage}
                                                            onChange={formicProps.setFieldValue}
                                                            name='skills' id="Skills" isMulti={true}
                                                            className=""
                                                            placeholder="Add skills"
                                                            options={skills} />
                                                    </div>

                                                </div>
                                                <div className="form-row">
                                                    <div className="form_group_modify col-md-4">
                                                        <label for="Compensation" className="label_modify">Compensation <span className="text-danger">*</span></label>
                                                        {/* <MultiSelectCheckBox
                                                options={compensationList}
                                                name={'compensation_ids'}
                                                className=""
                                                error={errors.compensation_ids && touched.compensation_ids ? true : false}
                                                value={formicProps.values.compensation_ids}
                                                onChange={formicProps.setFieldValue}
                                            /> */}
                                                        <Field as="select" name='compensation_ids' className="input_modify cstSelect"
                                                            style={errors.compensation_ids && touched.compensation_ids ? formInputErrorStyle : null}
                                                        >
                                                            {/* <option defaultValue>Select</option> */}
                                                            {compensationList.map(compensation => {
                                                                if (compensation.name === "Let's get Creative") {
                                                                    if (!formicProps.values.compensation_ids || (formicProps.values.compensation_ids && formicProps.values.compensation_ids.length === 0)) {
                                                                        formicProps.setFieldValue('compensation_ids', compensation.id)
                                                                    }
                                                                    return <option value={compensation.id} style={{ backgroundColor: '#EF5A2F', color: 'white' }}>{compensation.name}</option>
                                                                }
                                                                else {
                                                                    return <option value={compensation.id}>{compensation.name}</option>
                                                                }
                                                            })}
                                                        </Field>
                                                        <ErrorMessage name="compensation_ids" render={msg => <span style={formInputTextErrorStyle}>{msg}</span>} />
                                                    </div>

                                                    <div className="form_group_modify col-md-4">
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
                                                    <div className="form_group_modify col-md-4">
                                                        <label for="zip" className="label_modify">Zip code
                                            {formicProps.values.virtual ? null : <span className="text-danger">*</span>}
                                                        </label>
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
                                            <Field disabled={formicProps.values.virtual} style={(errors.address && errors.address['zip']) && (touched.address && touched.address['zip']) ? formInputErrorStyle : null}
                                                type="text" className="input_modify input_modify_lg" placeholder="Zipcode" name="address[zip]" id="zip" />
                                            <ErrorMessage name="address[zip]" render={msg => <span style={formInputTextErrorStyle}>{msg}</span>} />
                                        </div>
                                    </div> */}
                                                <div className="form-row">
                                                    <div className="form_group_modify col-sm-6">
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
                                                    <label className="label_modify">Upload images -  <i style={{ fontWeight: 400 }}>(Maximum 4 images) The first image is shown in searches </i>
                                                        {
                                                            props.profilePicPath
                                                                ? null
                                                                : props.classified && props.classified.attachments.length > 0
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
                                                                updateBase64={props.updateBase64}
                                                                updateImageState={props.updateImageState}
                                                                state={props.state}
                                                                UIComponent={ImageUIComponent}
                                                            />
                                                        </li>
                                                        {props.base64.length > 0 ?
                                                            loadBase64Images(props.base64)
                                                            : null}

                                                        {props.classified && props.classified.attachments.length > 0 ?
                                                            loadUploadedImages(props.classified.attachments)
                                                            : null
                                                        }
                                                        {
                                                            props.profilePicPath
                                                                ? props.user.profiles.map((profile, index) => {
                                                                    if (profile.photo_path === props.profilePicPath) {
                                                                        if (profile.photo_urls && Object.keys(profile.photo_urls).length > 0) {
                                                                            return (
                                                                                <li className="upload_images_items">
                                                                                    <figure className="ph_fig">
                                                                                        <img src={profile.photo_urls.small} alt="Thumbnail" />
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
                                                    <button className="theme_btn theme_btn_gray text-uppercase" type="button" onClick={props.cancelClassifiedClicked}>Cancel</button>
                                                    {props.addOrUpdateOrDeleteClassifiedLoading ? <LoadingBtn btnClassName="theme_btn theme_primary text-uppercase ml-2" btnTitle="Loading" /> :
                                                        <button className="theme_btn theme_primary text-uppercase ml-2" type="submit">save</button>
                                                    }
                                                </div>
                                                {/* </div> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Form>
                )
            }}
        </Formik >
    )
}

export default ClassifiedForm;