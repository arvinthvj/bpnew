import React from 'react';
import Select from "react-select";

const ReactSelect = ({ isMulti, name, value, readOnly, onChange, getValue, label, disabled, type, noOptionsMessage, className, options, placeholder }) => {
    return (
        <Select
            isDisabled={disabled}
            value={value}
            placeholder={placeholder}
            styles={{
                control: (base, state) => {
                    return {
                        ...base,
                        'min-height': '52px',
                        'border': state.isFocused ? '1px solid #EF5A2F' : '1px solid #EBEBEB',
                        '&:hover': {
                            borderColor: state.isFocused ? '#EF5A2F' : '#EBEBEB'
                        },
                        'box-shadow': 'none'
                    }
                },
            }}
            className={className}
            // blurInputOnSelect={onChange}
            onChange={val => {
                onChange(name, val);
            }}
            onBlur={event => event.preventDefault()}
            // getValue={getValue}
            // onBlur={() => input.onBlur(input.value)}
            isMulti={isMulti}
            noOptionsMessage={noOptionsMessage}
            // placeholder={placeholder}
            // styles={(touched && error) ? errorStyle : customStyles}
            options={options}
        // formatGroupLabel={formatGroupLabel}
        />
    )
}

export default ReactSelect;