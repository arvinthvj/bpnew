import * as Yup from 'yup';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { address } from '../../constants/constants';

export const validateLoginForm =
    Yup.object().shape({
        email: Yup.string().email('Please Enter a Valid Email').required('This field is required').nullable(),
        password: Yup.string().min(6, "Minimum 6 characters").required("This field is required").nullable(),
    })

export const validateExperienceForm =
    Yup.object().shape({
        company: Yup.string().required('This field is required').nullable(),
        position: Yup.string().required("This field is required").nullable(),
    })

export const validateHomeSignUpForm =
    Yup.object().shape({
        email: Yup.string().email('Please Enter a Valid Email').required('This field is required').nullable(),
        // first_name: Yup.string().required('This field is required').nullable(),
        // last_name: Yup.string().required('This field is required').nullable(),
    })

export const validateRegistrationForm =
    Yup.object().shape({
        email: Yup.string().email('Please Enter a Valid Email').required('This field is required').nullable(),
        password: Yup.string().min(6, "Minimum 6 characters").required("This field is required").nullable(),
        first_name: Yup.string().required('This field is required').nullable(),
        last_name: Yup.string().required('This field is required').nullable(),
        // phone: Yup.string()
        //     .test(
        //         'phone',
        //         'Enter valid mobile number',
        //         value => {
        //             if (value) {
        //                 let parsedPhoneNumber = parsePhoneNumberFromString(value)
        //                 value = value.replace(/[^0-9]+/g, '')
        //                 return parsedPhoneNumber.nationalNumber.length >= 5 && parsedPhoneNumber.nationalNumber.length <= 10
        //             }
        //             else {
        //                 return true
        //             }
        //         }
        //     ).nullable(),
        register_checkbox: Yup.bool()
            .test(
                'register_checkbox',
                'You must agree to PartnerHere’s Terms and Conditions in order to Proceed',
                value => value === true
            ).required('You must agree to PartnerHere’s Terms and Conditions in order to Proceed')
    })

export const validatePhoneNumber = (value) => {
    let error = null
    console.log(value, 'val')
    if (!value) {
        error = 'This field is required'
    }
    return error
}

export const validateCreateProfileForm =
    Yup.object().shape({
        title: Yup.string().required('This field is required').nullable(),
        bio: Yup.string().required('This field is required').max(2000, '2000 Characters limit exceeded').nullable(),
        website: Yup.string().matches(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|([?:www.]|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/, "Please enter valid url.").nullable(),
        email: Yup.string().email('Please Enter a Valid Email').nullable(),
        address: Yup.object().shape({
            // street_address: Yup.string().required('This field is required').nullable(),
            // city: Yup.string().required('This field is required').nullable(),
            // state: Yup.string().required('This field is required').nullable(),
            zip: Yup.string().matches(/^[a-zA-Z0-9\s]+$/, "Invalid zipcode").test(
                'zip',
                'Invalid Zipcode',
                val => val && val.length <= 8
            ).nullable()
        }),
        service_offered: Yup.string().max(2000, '2000 Characters limit exceeded').nullable(),
        current_project: Yup.string().max(2000, '2000 Characters limit exceeded').nullable(),
        expectation: Yup.string().max(2000, '2000 Characters limit exceeded').nullable(),
    })

export const validateSkillsForm =
    Yup.object().shape({
        skill_description: Yup.string().max(2000, '2000 Characters limit exceeded').nullable(),
        skill_education: Yup.string().max(2000, '2000 Characters limit exceeded').nullable(),
    })

export const validateProjectPlannerForm =
    Yup.object().shape({
        about_us: Yup.string().required('This field is required').max(2000, '2000 Characters limit exceeded').nullable(),
        problem: Yup.string().max(2000, '2000 Characters limit exceeded').nullable(),
        solution: Yup.string().max(2000, '2000 Characters limit exceeded').nullable(),
        target_market: Yup.string().max(2000, '2000 Characters limit exceeded').nullable(),
        competitors: Yup.string().max(2000, '2000 Characters limit exceeded').nullable(),
        revenues: Yup.string().max(2000, '2000 Characters limit exceeded').nullable(),
        expenses: Yup.string().max(2000, '2000 Characters limit exceeded').nullable(),
        our_needs: Yup.string().max(2000, '2000 Characters limit exceeded').nullable(),
    })

export const validateForgotPasswordForm =
    Yup.object().shape({
        email: Yup.string().email('Please Enter a Valid Email').required('This field is required').nullable()
    })

export const validateResetPasswordForm =
    Yup.object().shape({
        password: Yup.string().min(6, "6 char long").required('This field is required').nullable(),
        password_confirmation: Yup.string().oneOf([Yup.ref('password'), null], "Password does not match").required('This field is required').nullable(),
    })

export const validateOTPVerificationForm =
    Yup.object().shape({
        otp_code: Yup.string().matches(/^[0-9\s]+$/, "OTP code should be in digits only").length(4, "Enter valid 4 digit otp code").required('This field is required').nullable()
    })

export const validatePhoneNumberForm =
    Yup.object().shape({
        phone: Yup.string().required('This field is required')
            .test(
                'phone',
                'Enter valid mobile number',
                value => {
                    if (value) {
                        let parsedPhoneNumber = parsePhoneNumberFromString(value)
                        value = value.replace(/[^0-9]+/g, '')
                        return parsedPhoneNumber.nationalNumber.length >= 5 && parsedPhoneNumber.nationalNumber.length <= 10
                    }
                    else {
                        return false
                    }
                }
            ).nullable(),
    })

export const validateMyService = (values, setAddressDisable) => {
    let errors = {};
    if (values) {
        if (!values.title) {
            errors.title = 'Title is required.'
        }
        if (!values.description) {
            errors.description = 'This field is required.'
        }

        if (values.categories && values.categories.length === 0 || !values.categories) {
            errors.categories = 'This field is required.'
        }

        if (values.compensation_ids && values.compensation_ids.length === 0 || values.compensation_ids === 'Select') {
            errors.compensation_ids = 'This field is required.'
        }
        if (!values.profile_id || values.profile_id === 'Select') {
            errors.profile_id = 'This field is required.'
        }
        if (values.virtual) {
            values.address.street_address = '';
            values.address.city = '';
            values.address.state = '';
            values.address.zip = '';
            // setAddressDisable(true)
        } else {
            if (values.address.city && values.address.zip && !(/^[a-zA-Z0-9\s]+$/).test(values.address.zip)) {
                delete errors.address;
            } else {
                // if (!values.address.city) {
                //     errors.address.city = 'This field is required.';
                // }
                if (!values.address.zip) {
                    errors.address = {};
                    errors.address.zip = 'This field is required.';
                } else if (!(/^[a-zA-Z0-9\s]+$/).test(values.address.zip) || !(values.address.zip.length <= 8)) {
                    // || values.address.zip.length >= 7
                    errors.address = {};
                    errors.address.zip = 'Invalid Zipcode';
                }
                // if (!values.address.street_address) {
                //     errors.address.street_address = 'This field is required.';
                // }
            }
            // setAddressDisable(false)
        }
    } else {
        errors.profile_id = 'This field is required.'
        errors.address.zip = 'This field is required.';
        errors.description = 'This field is required.';
        errors.title = 'Title is required.';
        errors.compensation_ids = 'This field is required.';
    }

    return errors;
}

export const validatePlaces = (values, setAddressDisable) => {
    let errors = {};

    if (values) {
        if (!values.title) {
            errors.title = 'Title is required.'
        }
        if (!values.description) {
            errors.description = 'This field is required.'
        }
        if (values.compensation_ids.length === 0 || values.compensation_ids === 'Select') {
            errors.compensation_ids = 'This field is required.'
        }
        if (!values.profile_id || values.profile_id === 'Select') {
            errors.profile_id = 'This field is required.'
        }
        if (values.virtual) {
            values.address.street_address = '';
            values.address.city = '';
            values.address.state = '';
            values.address.zip = '';
            // setAddressDisable(true)
        } else {
            if (values.address.city && values.address.zip && !(/^[a-zA-Z0-9\s]+$/).test(values.address.zip)) {
                delete errors.address;
            } else {

                // if (!values.address.city) {
                //     errors.address.city = 'This field is required.';
                // }
                if (!values.address.zip) {
                    errors.address = {};
                    errors.address.zip = 'This field is required.';
                } else if (!(/^[a-zA-Z0-9\s]+$/).test(values.address.zip) || !(values.address.zip.length <= 8)) {
                    errors.address = {};
                    errors.address.zip = 'Invalid Zipcode';
                }
                // if (!values.address.street_address) {
                //     errors.address.street_address = 'This field is required.';
                // }
            }
            // setAddressDisable(false);
            // if (!values.address.zip) {
            //     errors['address'] = { ...address }
            //     errors.address.zip = 'This field is required.'
            // }
        }

    } else {
        errors.profile_id = 'This field is required.'
        errors.address.zip = 'This field is required.';
        errors.description = 'This field is required.';
        errors.title = 'Title is required.';
        errors.compensation_ids = 'This field is required.';
        // errors.address.zip = 'This field is required.'
    }
    return errors;
}

export const validateThings = (values, setAddressDisable) => {
    let errors = {};

    if (values) {
        if (!values.title) {
            errors.title = 'Title is required.'
        }
        if (!values.description) {
            errors.description = 'This field is required.'
        }
        if (values.compensation_ids.length === 0 || values.compensation_ids === 'Select') {
            errors.compensation_ids = 'This field is required.'
        }
        if (!values.profile_id || values.profile_id === 'Select') {
            errors.profile_id = 'This field is required.'
        }
        if (values.virtual) {
            values.address.street_address = '';
            values.address.city = '';
            values.address.state = '';
            values.address.zip = '';
            // setAddressDisable(true)
        } else {
            if (values.address.city && values.address.zip && !(/^[a-zA-Z0-9\s]+$/).test(values.address.zip)) {
                delete errors.address;
            } else {
                // if (!values.address.city) {
                //     errors.address.city = 'This field is required.';
                // }

                if (!values.address.zip) {
                    errors.address = {};
                    errors.address.zip = 'This field is required.';
                } else if (!(/^[a-zA-Z0-9\s]+$/).test(values.address.zip) || !(values.address.zip.length <= 8)) {
                    errors.address = {};
                    errors.address.zip = 'Invalid Zipcode';
                }
                // if (!values.address.street_address) {
                //     errors.address.street_address = 'This field is required.';
                // }
            }
            // setAddressDisable(false)
        }
    } else {
        errors.profile_id = 'This field is required.'
        errors.address.zip = 'This field is required.';
        errors.description = 'This field is required.';
        errors.title = 'Title is required.';
        errors.compensation_ids = 'This field is required.';
    }

    return errors;
}

export const validateJobsOrGigs = (values, setAddressDisable) => {
    let errors = {};

    if (values) {
        if (!values.title) {
            errors.title = 'Title is required.'
        }
        if (!values.description) {
            errors.description = 'This field is required.'
        }
        if (values.compensation_ids.length === 0 || values.compensation_ids === 'Select') {
            errors.compensation_ids = 'This field is required.'
        }
        if (!values.profile_id || values.profile_id === 'Select') {
            errors.profile_id = 'This field is required.'
        }
        if (values.virtual) {
            values.address.street_address = '';
            values.address.city = '';
            values.address.state = '';
            values.address.zip = '';
            // setAddressDisable(true)
        } else {
            if (values.address.city && values.address.zip && !(/^[a-zA-Z0-9\s]+$/).test(values.address.zip)) {
                delete errors.address;
            } else {

                // if (!values.address.city) {
                //     errors.address.city = 'This field is required.';
                // }

                if (!values.address.zip) {
                    errors.address = {};
                    errors.address.zip = 'This field is required.';
                } else if (!(/^[a-zA-Z0-9\s]+$/).test(values.address.zip) || !(values.address.zip.length <= 8)) {
                    errors.address = {};
                    errors.address.zip = 'Invalid Zipcode';
                }
                // if (!values.address.street_address) {
                //     errors.address.street_address = 'This field is required.';
                // }
            }
            // setAddressDisable(false)
        }
    } else {
        errors.profile_id = 'This field is required.'
        errors.address.zip = 'This field is required.';
        errors.description = 'This field is required.';
        errors.title = 'Title is required.';
        errors.compensation_ids = 'This field is required.';
    }
    return errors;
}

export const validateOpportunities = (values, setAddressDisable) => {
    let errors = {};

    if (values) {
        if (!values.title) {
            errors.title = 'Title is required.'
        }
        if (!values.description) {
            errors.description = 'This field is required.'
        }
        if (values.compensation_ids.length === 0 || values.compensation_ids === 'Select') {
            errors.compensation_ids = 'This field is required.'
        }
        if (!values.profile_id || values.profile_id === 'Select') {
            errors.profile_id = 'This field is required.'
        }
        if (values.virtual) {
            values.address.street_address = '';
            values.address.city = '';
            values.address.state = '';
            values.address.zip = '';
            // setAddressDisable(true)
        } else {
            if (values.address.city && values.address.zip && !(/^[a-zA-Z0-9\s]+$/).test(values.address.zip)) {
                delete errors.address;
            } else {

                // if (!values.address.city) {
                //     errors.address.city = 'This field is required.';
                // }
                if (!values.address.zip) {
                    errors.address = {};
                    errors.address.zip = 'This field is required.';
                } else if (!(/^[a-zA-Z0-9\s]+$/).test(values.address.zip) || !(values.address.zip.length <= 8)) {
                    errors.address = {};
                    errors.address.zip = 'Invalid Zipcode';
                }
                // if (!values.address.street_address) {
                //     errors.address.street_address = 'This field is required.';
                // }
            }
            // setAddressDisable(false)
        }
    } else {
        errors.profile_id = 'This field is required.'
        errors.address.zip = 'This field is required.';
        errors.description = 'This field is required.';
        errors.title = 'Title is required.';
        errors.compensation_ids = 'This field is required.';
    }
    return errors;
}

export const validateDonationsOrGiveaways = (values, setAddressDisable) => {
    let errors = {};

    let urlRegex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|([?:www.]|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/
    if (values) {
        if (!values.title) {
            errors.title = 'Title is required.'
        }
        if (values.website) {
            if (!urlRegex.test(values.website)) {
                errors.website = 'Please enter valid url.'
            }
        }
        if (!values.description) {
            errors.description = 'This field is required.'
        }
        if (!values.profile_id || values.profile_id === 'Select') {
            errors.profile_id = 'This field is required.'
        }
        // if (values.compensation_ids.length === 0 || values.compensation_ids === 'Select') {
        //     errors.compensation_ids = 'This field is required.'
        // }
        if (values.virtual) {
            values.address.street_address = '';
            values.address.city = '';
            values.address.state = '';
            values.address.zip = '';
            // setAddressDisable(true)
        } else {
            if (values.address.city && values.address.zip && !(/^[a-zA-Z0-9\s]+$/).test(values.address.zip)) {
                delete errors.address;
            } else {

                // if (!values.address.city) {
                //     errors.address.city = 'This field is required.';
                // }
                if (!values.address.zip) {
                    errors.address = {};
                    errors.address.zip = 'This field is required.';
                } else if (!(/^[a-zA-Z0-9\s]+$/).test(values.address.zip) || !(values.address.zip.length <= 8)) {
                    errors.address = {};
                    errors.address.zip = 'Invalid Zipcode';
                }
                // if (!values.address.street_address) {
                //     errors.address.street_address = 'This field is required.';
                // }
            }
            // setAddressDisable(false)
        }
    } else {
        errors.profile_id = 'This field is required.'
        errors.address.zip = 'This field is required.';
        errors.description = 'This field is required.';
        errors.title = 'Title is required.';
        errors.compensation_ids = 'This field is required.';
    }
    return errors;
}

export const validateClassification = (values, setAddressDisable) => {

    let errors = {};

    if (values) {
        if (!values.title) {
            errors.title = 'Title is required.'
        }
        if (!values.description) {
            errors.description = 'This field is required.'
        }
        if (values.compensation_ids.length === 0 || values.compensation_ids === 'Select') {
            errors.compensation_ids = 'This field is required.'
        }

        if (!values.category_id || values.category_id === 'Select') {
            errors.category_id = 'This field is required.'
        }

        if (!values.profile_id || values.profile_id === 'Select') {
            errors.profile_id = 'This field is required.'
        }
        if (values.virtual) {
            values.address.street_address = '';
            values.address.city = '';
            values.address.state = '';
            values.address.zip = '';
            // setAddressDisable(true)
        } else {
            //  
            if (values.address.city && values.address.zip && !(/^[a-zA-Z0-9\s]+$/).test(values.address.zip)) {
                delete errors.address;
            } else {

                // if (!values.address.city) {
                //     errors.address.city = 'This field is required.';
                // }
                if (!values.address.zip) {
                    errors.address = {};
                    errors.address.zip = 'This field is required.';
                } else if (!(/^[a-zA-Z0-9\s]+$/).test(values.address.zip) || !(values.address.zip.length <= 8)) {
                    errors.address = {};
                    errors.address.zip = 'Invalid Zipcode';
                }
                // if (!values.address.street_address) {
                //     errors.address.street_address = 'This field is required.';
                // }
            }
            // setAddressDisable(false)
        }
    } else {
        errors.profile_id = 'This field is required.'
        errors.address.zip = 'This field is required.';
        errors.description = 'This field is required.';
        errors.title = 'Title is required.';
        errors.compensation_ids = 'This field is required.';
        errors.category_id = 'This field is required.';
        errors.address.city = 'This field is required.';
        errors.address.zip = 'This field is required.'
    }
    return errors;
}

export const validateNewDeck = (values) => {
    let errors = {};
    errors['deck'] = {};
    if (values) {
        if (!values.deck.name) {
            errors.deck.name = 'Please Create or Select a List.';
        }
        if (values.deck.name || (values.deckId && values.deckId.length && values.deckId.length > 0)) {
            errors = {};
        } else {
            errors.deck.name = 'Please Create or Select a List.';
        }
    } else {
        errors.deck.name = 'Please Create or Select a List.';
    }

    return errors;
}

export const validateChangePassword =
    Yup.object().shape({
        current_password: Yup.string().min(6, "6 char long").required("This field is required").nullable(),
        password: Yup.string().min(6, "6 char long").required('This field is required').nullable(),
        password_confirmation: Yup.string().oneOf([Yup.ref('password'), null], "Password does not match").required('This field is required').nullable(),
    })

export const validateAccountInfoForm =
    Yup.object().shape({
        first_name: Yup.string().required('This field is required'),
        last_name: Yup.string().required('This field is required'),
        // phone: Yup.string()
        //     .test(
        //         'phone',
        //         'Enter valid mobile number',
        //         value => {
        //             if (value) {
        //                 let parsedPhoneNumber = parsePhoneNumberFromString(value)
        //                 value = value.replace(/[^0-9]+/g, '')
        //                 return parsedPhoneNumber.nationalNumber.length >= 5 && parsedPhoneNumber.nationalNumber.length <= 10
        //             }
        //             else {
        //                 return false
        //             }
        //         }
        //     ).nullable(),
    })

export const validateMobileNumber =
    Yup.object().shape({
        phone: Yup.string()
            .test(
                'phone',
                'Enter valid mobile number',
                value => {
                    if (value) {
                        let parsedPhoneNumber = parsePhoneNumberFromString(value)
                        value = value.replace(/[^0-9]+/g, '')
                        return parsedPhoneNumber.nationalNumber.length >= 5 && parsedPhoneNumber.nationalNumber.length <= 10
                    }
                    else {
                        return false
                    }
                }
            ).nullable(),
    })