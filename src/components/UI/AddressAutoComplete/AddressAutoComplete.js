import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';

const AddressAutoComplete = (props) => {

    // const searchOptions = {
    //     componentRestrictions: { country: "us" }
    // }
    //  
    //  { name, value, onChange, handleAddressSelect, errors, touched, setFieldTouched, disabled }
    return (
        <PlacesAutocomplete
            value={props.value}
            onChange={value => {
                if (!props.touched[props.name] && props.setFieldTouched) {
                    props.setFieldTouched(props.name, true)
                }
                props.onChange(props.name, value);
                props.onChange('address[city]', '')
                props.onChange('address[state]', '')
            }}
            // searchOptions={searchOptions}
            onSelect={(value) => props.handleAddressSelect(value, props.onChange, props.name)}
        >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                    <input
                        disabled={props.disabled}
                        id="googleAddress"
                        style={{ paddingRight: '35px' }}
                        // onBlurCapture={(event) => handleAddressSelect(value)}
                        // style={props.isAddressEmpty ? { borderColor: 'rgb(240, 77, 83)', borderLeftWidth: '3px' } : null}
                        {...getInputProps({
                            placeholder: 'City',
                            className: !props.disabled && props.errors.address && props.errors.address.street_address && props.touched.address ? "input_modify input_modify_lg error_class" : "input_modify input_modify_lg",
                            autoComplete: "somedummytexttodisableautocomplete",
                            disabled: props.disabled
                        })}
                    />
                    {/* <span style={{ color: '#DD2726', fontSize: '13px' }}>{props.isAddressEmpty ? 'this field is required.' : null}</span> */}
                    <div onClick={(value) => props.handleAddressSelect(value.target.textContent)} className="autocomplete-dropdown-container" style={suggestions.length !== 0 ? { border: '1px solid #c3c3c3' } : null}>
                        {loading && <div>Loading...</div>}
                        {suggestions.map(suggestion => {
                            const className = suggestion.active
                                ? 'suggestion-item--active'
                                : 'suggestion-item';
                            // inline style for demonstration purpose
                            const style = suggestion.active
                                ? { backgroundColor: '#ebf0f7', cursor: 'pointer', fontSize: '12px', paddingLeft: '5px', fontWeight: 'bold', paddingTop: '10px', paddingBottom: '10px' }
                                : { backgroundColor: '#ffffff', cursor: 'pointer', fontSize: '12px', paddingLeft: '5px', fontWeight: 'bold', paddingTop: '10px', paddingBottom: '10px' };
                            return (
                                <div
                                    {...getSuggestionItemProps(suggestion, {
                                        className,
                                        style,
                                    })}
                                >
                                    <span>{suggestion.description}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </PlacesAutocomplete>
    )
}

export default AddressAutoComplete;