import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { address } from './constants/constants';
var tzlookup = require("tz-lookup");

const getDetailAddress = (selected_address) => {

    let addressFields = { ...address }
    return geocodeByAddress(selected_address)
        .then(results => {
            addressFields.street_address = results[0].formatted_address
            results[0].address_components.map((addressType, i) => {
                addressType.types.map(type => {
                    if (type === "postal_code") {
                        addressFields.zip = addressType.long_name
                    } else if (type === "country") {
                        addressFields.country = addressType.long_name
                    } else if (type === "administrative_area_level_1") {
                        addressFields.state = addressType.long_name
                    } else if (type === "locality") {
                        addressFields.city = addressType.long_name
                    }
                })
            })
            //  
            // this.setState({
            //     address_attributes: addressFields
            // })
            // console.log(this.state)
            return getLatLng(results[0])
        })
        .then(latLng => {
            console.log('Success', latLng)

            addressFields['timeZone'] = tzlookup(latLng.lat, latLng.lng);
            // let addressFields = { ...this.state.address_attributes };
            addressFields.latitude = latLng.lat;
            addressFields.longitude = latLng.lng;

            //  
            // this.setState({
            //     address_attributes: addressFields
            // })

            return addressFields;
        })
        .catch(error => {
            console.error('Error', error)
            return error;
        });

}

export default getDetailAddress;
