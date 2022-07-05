import React from 'react';
import MultiSelect from "react-multi-select-component";
// import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
var $ = require("jquery");

const MultiSelectCheckbox = ({ options, value, onChange, name, className, error }) => {

    if (error) {
        $("div .dropdown-container").addClass("formInputErrorStyle");
    } else {
        $("div .dropdown-container").removeClass("formInputErrorStyle");
    }

    $(".panel-content").mouseover(function () {
        $(".select-panel li:last-child").addClass("multiSelectCompensation")
        $(".select-panel li:last-child label").addClass("multiSelectCompensation")
    })

    $(".dropdown-heading").mouseup(function () {
        setTimeout(function () {
            $(".select-panel li:last-child").addClass("multiSelectCompensation")
            $(".select-panel li:last-child label").addClass("multiSelectCompensation")
        }, 100)
        // alert( "Handler for .click() called." );
    });
    return (
        <MultiSelect
            options={options}
            value={value}
            hasSelectAll={options.length === 0 ? false : true}
            // shouldToggleOnHover={true}
            // valueRenderer={focusSearchOnOpen}
            // className={className}
            onChange={val => {
                onChange(name, val);
            }}
        // labelledBy={"Select"}
        />)
}

export default MultiSelectCheckbox;