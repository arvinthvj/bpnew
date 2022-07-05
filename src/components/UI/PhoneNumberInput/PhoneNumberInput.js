import React, { useState } from 'react'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { formInputErrorStyle } from '../../../utility/constants/constants'

const phoneNumberInput = props => {

    const onChange = (value) => {
        if (!props.touched.phone) {
            props.setFieldTouched('phone', true)
        }
        props.setFieldValue('phone', value)
    }

    const onBlur = () => {
        props.setFieldTouched('phone', true)
    }

    return (
        <PhoneInput
            defaultCountry="US"
            style={props.errors.phone && props.touched.phone ? formInputErrorStyle : null}
            className={props.parentDivClassName}
            disabled={props.disabled}
            numberInputProps={props.inputClassName ? {
                className: props.inputClassName
            } : null}
            placeholder={props.placeholder}
            onBlur={onBlur}
            value={props.values.phone}
            onChange={onChange} />
    )
}

export default phoneNumberInput