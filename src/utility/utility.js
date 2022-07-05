import jwtDecode from 'jwt-decode';

import { store } from 'react-notifications-component';
import storage from '../utility/storage';
import { useEffect } from 'react';
import $ from "jquery";
import { decode, encode } from 'base64-arraybuffer';
import { object } from 'yup';
import ReactGA from 'react-ga';

const { detect } = require('detect-browser');
var moment = require('moment-timezone');

export const toFloatWithDecimal = (number) => {
    return parseFloat(number).toFixed(2);
}

export const manupulatingTime = (time) => {
    const manipulatedTime = {};
    const T = time.split(':');
    manipulatedTime['hour'] = T[0];
    manipulatedTime['minute'] = T[1];
    return manipulatedTime;
}
// Replace AM and PM
export const replaceAMPM = (time) => {
    if (time.includes('AM')) {
        return time.replace('AM', '');
    } else if (time.includes('PM')) {
        return time.replace('PM', '');
    } else {
        return time;
    }
}

export const closeCompaignUI = (enable) => {
    storage.set("close_campaign_ui", enable);
}

export const isCompaignUIClosed = () => {
    return storage.get("close_campaign_ui", false);
}

//Convert 24-hour time-of-day string to 12-hour time with AM/PM 
export const timeconvert = (time) => {
    return moment(time).format('hh:mm A');
}

//Convert 12-hour time-of-day string to 24-hour time with AM/PM 
export const timeconvertFrom12To24Format = (time) => {
    return moment(time).format('HH:mm');
}

export const tConvert = (time) => {
    // Check correct time format and split into components
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) { // If time format correct
        time = time.slice(1);  // Remove full string match value
        time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
        time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(''); // return adjusted time or original string
}

// Calendar logic
export const getStartTimeAndEndTime = (startTime, endTime) => {

    const startTimeArray = startTime.split(':');
    const startTimeHour = parseInt(startTimeArray[0]);
    const startTimeMinute = parseInt(startTimeArray[1]);

    const endTimeArray = endTime.split(':');
    const endTimeHour = parseInt(endTimeArray[0]);
    const endTimeMinute = parseInt(endTimeArray[1]);
    return { startTimeHour, startTimeMinute, endTimeHour, endTimeMinute }
}

export const daysInThisMonth = (currentDate) => {
    var now = currentDate;
    return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
}

// providers Attributes Time Logic

export const EndTimeValidation = (startTime) => {
    const arr = startTime.split(':');
    let hour = parseInt(arr[0]);
    let minute = parseInt(arr[1]);

    if ((minute + 15) !== 60) {

        minute = minute + 15;
        return hour.toString().concat(":" + minute.toString())
    } else {

        hour = hour + 1
        return hour.toString().concat(":00");
    }
}

// for production removing console logs
export const removeConsoleLog = () => {
    function emptyfunc() { }
    console.log = emptyfunc;
    console.warn = emptyfunc;
    console.error = emptyfunc;
}

export const addDateTime = (date, month, year, hours, minutes) => {
    var mont = parseInt(month) + 1
    var x = year + ',' + mont + ',' + date + ' ' + hours + ':' + minutes;
    var dt = new Date(x);
    return dt
}

export const addSecondsToDate = (date, seconds) => {
    var month = parseInt(date.getMonth()) + 1
    var x = date.getFullYear() + ',' + month + ',' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + seconds;
    var dt = new Date(x);

    return dt
}

//keeping date and time intact just changing the timezone and returning the UTC
export const convertDateToDifferentTZ = (date, timezone) => {
    console.log(date, timezone);
    var now = moment(date);

    now.tz(timezone, true);
    console.log(date, timezone, now.toISOString());
    // console.log(now.format());
    // console.log(now.toISOString());
    return now.toISOString();
}

// export const convertStringToDateWithTZ = (string, timezone) => {


//     var now = moment(string);
//     // now.tz(timezone, true);
//     return now;
// }
export const convertDateToDifferentTZSansUTC = (date, timezone) => {
    var now = moment(date);
    now.tz(timezone, true);
    // console.log(now.format());
    // console.log(now.toISOString());
    return now.toDate();
}


//Converting UTC to specific timezone

export const convertUTCToDifferentTZ = (date, timezone) => {
    var d = new Date(date);

    var utc_offset = d.getTimezoneOffset();
    console.log("utc_offset:" + utc_offset);
    d.setMinutes(d.getMinutes() + utc_offset);
    console.log("utc:" + d);

    var timezone_offset = moment.tz(timezone).utcOffset()
    d.setMinutes(d.getMinutes() + timezone_offset);
    console.log("updated date" + d);

    return d;
}

///////// Service provider listing availability section - Hours computation logic 

export const getHoursBetween = (startDate, endDate) => {
    let diff = endDate.getHours() - startDate.getHours();
    var diffDates = [];
    for (var i = 0; i < diff; i++) {
        let date = new Date(startDate);
        date.setHours(startDate.getHours() + i);
        diffDates.push(date);
    }
    return diffDates;
};

export const getDateKey = date => {
    return (
        date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
    );
};

export const computeHoursForAvailability = (availabilities, timezone) => {
    var availableDates = [];
    var datesAvailabilityMapping = {};
    for (var index in availabilities) {
        let dates = availabilities[index];
        let startDate = convertUTCToDifferentTZ(dates["start_time"], timezone);
        let endDate = convertUTCToDifferentTZ(dates["end_time"], timezone);

        let dateKey = getDateKey(startDate);
        availableDates.push(dateKey);
        let computedHours = getHoursBetween(startDate, endDate);
        if (datesAvailabilityMapping[dateKey]) {
            let hours = datesAvailabilityMapping[dateKey];
            hours = hours.concat(computedHours);
            datesAvailabilityMapping[dateKey] = hours;
        } else {
            datesAvailabilityMapping[dateKey] = computedHours;
        }
    }

    availableDates = availableDates.filter((ele, index) => {
        return availableDates.indexOf(ele) === index;
    });

    return { availableDates, datesAvailabilityMapping };
};

export const pad = (num, size) => {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}


export const getFormattedTime = (date) => {
    let hrs = pad(date.getHours(), 2)
    let minutes = date.getMinutes() === 0 ? "00" : pad(date.getMinutes(), 2);
    return hrs + ":" + minutes;
}

//////////////////////////////////////////////////////////////////////////////////////
//May 04, 2019
export const dateToString = (date) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', "Aug", "Sep", "Oct", "Nov", "Dec"]
    var mm = date.getMonth();
    var dt = date.getDate();
    var year = date.getFullYear();
    return months[mm] + " " + dt + ", " + year;
}

export const dateTimeToString = (date) => {
    const weekDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', "Aug", "Sep", "Oct", "Nov", "Dec"]
    var mm = date.getMonth();
    var dt = date.getDate();
    var hr = date.getHours();
    var min = date.getMinutes();
    // const time = tConvert(hr.toString() + ":" + min.toString());
    const time = timeconvert(date);
    return months[mm] + " " + dt + ", " + time;
}

export const roundOff = (date) => {
    var offset = 15;
    var tempDate = new Date(date);
    var minutes = date.getMinutes();
    var newMin = minutes + (offset - (minutes % offset));
    tempDate.setMinutes(newMin);
    tempDate.setSeconds(0);
    return tempDate;
}

export const isSafari = () => {
    const browser = detect();
    // return /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));
    if (browser) {
        // alert(browser.name)
        if (browser.name === "ios") {
            return true;
        }
    }
    return false;
}


export const isAllDay = (startTime, endTime) => {
    let startOfTheDay = startTime.getHours() === 0 && startTime.getMinutes() === 0;
    let endOfTheDay = endTime.getHours() === 23 && endTime.getMinutes() === 59;
    return startOfTheDay && endOfTheDay;
}


//toast

export const toastMsg = (msg, error = false, autoClose = 2000) => {
    if (error) {
        store.addNotification({
            title: "Error",
            message: msg,
            type: "danger",
            insert: "top",
            container: "top-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
                duration: autoClose,
                //   onScreen: true,
                showIcon: true
            }
        });
    } else {
        store.addNotification({
            title: "Success",
            message: msg,
            type: "success",
            insert: "top",
            container: "top-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
                duration: autoClose,
                //   onScreen: true,
                showIcon: true
            }
        });
    }
}

export const isTokenValid = (token) => {
    if (token) {
        const data = jwtDecode(token);
        let Valid = true;
        if (new Date() < new Date(parseInt(data.exp * 1000))) {
            Valid = true;
        } else {
            Valid = false
        }
        return Valid;
    }
    else {
        return false
    }
}

export const toastInfo = (msg, autoClose = 2000) => {
    store.addNotification({
        title: "Info!",
        message: msg,
        type: "info",
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
            duration: autoClose,
            //   onScreen: true,
            showIcon: true
        }
    });
}

export const scrollToDivUsingID = (id) => {
    if (id) {
        $('html, body').animate({
            scrollTop: $("#" + id).offset().top
        }, 2000);
    }
}

export const scrollToDivUsingClassName = (className) => {
    if (className) {
        $('html, body').animate({
            scrollTop: $("." + className).offset().top
        }, 2000);
    }
}

export const resetOrientation = (srcBase64, srcOrientation, props, extension, file, isWordpress) => {
    var img = new Image();
    let originalImage = srcBase64.split(',');

    let base64 = null;
    img.onload = function () {
        var width = img.width,
            height = img.height,
            canvas = document.createElement('canvas'),
            ctx = canvas.getContext("2d");

        // set proper canvas dimensions before transform & export
        if (4 < srcOrientation && srcOrientation < 9) {
            canvas.width = height;
            canvas.height = width;
        } else {
            canvas.width = width;
            canvas.height = height;
        }

        // transform context before drawing image
        switch (srcOrientation) {
            case 2: ctx.transform(-1, 0, 0, 1, width, 0); break;
            case 3: ctx.transform(-1, 0, 0, -1, width, height); break;
            case 4: ctx.transform(1, 0, 0, -1, 0, height); break;
            case 5: ctx.transform(0, 1, 1, 0, 0, 0); break;
            case 6: ctx.transform(0, 1, -1, 0, height, 0); break;
            case 7: ctx.transform(0, -1, -1, 0, height, width); break;
            case 8: ctx.transform(0, -1, 1, 0, 0, width); break;
            default: break;
        }

        // draw image
        ctx.drawImage(img, 0, 0);

        // export base64
        // callback(canvas.toDataURL());

        base64 = canvas.toDataURL();
        //  
        props.setState({
            image: base64
        })
        let image = base64.split(',');
        if (isWordpress) {
            props.props.uploadImageOnWordpress(file)
        }
        else {
            props.props.profilePhotoUpload(extension, decode(originalImage[1]))
        }
        if (base64) {
            props.setIsProfileImageUploading(false)
        }
        console.log(base64);
        return base64;
    };
    img.src = srcBase64;
    //  
}

export const getSlots = (startTime, endTime) => {
    var slots = {};
    const StartTime = startTime.getHours() + (startTime.getMinutes() / 60);
    const EndTime = endTime.getHours() + (endTime.getMinutes() / 60);
    slots = { StartTime, EndTime };
    //  

    return slots;
}

export const convertCustomScheduleToCalendarAvailabilityResponse = (customSchedules, timezone) => {
    //     
    var dateTimeSlotsMapping = {}

    for (var index in customSchedules) {
        let schedule = customSchedules[index];
        let startTime = convertUTCToDifferentTZ(new Date(schedule.start_time), timezone)
        let endTime = convertUTCToDifferentTZ(new Date(schedule.end_time), timezone)
        let scheduleStatus = schedule.schedule_status
        //  
        let slots = getSlots(startTime, endTime);
        //  
        let dateKey = getDateKey(startTime);
        if (scheduleStatus === "unavailable") {
            dateTimeSlotsMapping[dateKey] = { slots: [slots] };
            dateTimeSlotsMapping[dateKey]['status'] = scheduleStatus

            //  
        } else {
            //   
            if (dateTimeSlotsMapping[dateKey]) {

                if (dateTimeSlotsMapping[dateKey]['status'] === 'available') {
                    //  
                    dateTimeSlotsMapping[dateKey]['slots'].push(slots);
                    dateTimeSlotsMapping[dateKey]['status'] = scheduleStatus;
                } else {

                    dateTimeSlotsMapping[dateKey] = { slots: [slots] };
                    dateTimeSlotsMapping[dateKey]['status'] = scheduleStatus
                }

            } else {
                dateTimeSlotsMapping[dateKey] = { slots: [slots] };
                dateTimeSlotsMapping[dateKey]['status'] = scheduleStatus;

            }
        }
        //  
    }
    return dateTimeSlotsMapping;
}

export function useOuterClickNotifier(onOuterClick, innerRef) {
    useEffect(
        () => {
            // only add listener, if the element exists
            if (innerRef.current) {
                document.addEventListener("click", handleClick);
            }

            // unmount previous first in case inputs have changed
            return () => document.removeEventListener("click", handleClick);

            function handleClick(e) {
                innerRef.current && !innerRef.current.contains(e.target) && onOuterClick(e);
            }
        },
        [onOuterClick, innerRef] // invoke again, if inputs have changed
    );
}

export const resetMultipleOrientation = (srcBase64, srcOrientation, updateBase64, base64, index, filesLength, props) => {
    base64.push(srcBase64);
    if (index === filesLength - 1) {
        updateBase64(base64);
    }
    if (base64 && props.isOffers) {
        props.setIsImageUploading(false)
    }
    console.log(base64);
    return base64;
}

export const extractExtention = (arr) => {
    let result = [];
    for (var i = 0; i < arr.length; i++) {
        result.push(arr[i].substr((arr[i].lastIndexOf('.'))))
    }
    return result;
}

export function triggerPageEvent() {
    if (window) {
        setTimeout(() => {
            // console.log("window.location.pathname:"+window.location.origin + window.location.pathname);
            ReactGA.ga('send', 'pageview', window.location.origin + window.location.pathname);
            // ReactGA.pageview(window.location.pathname + window.location.search)
        }, 0.0);
    }
}

export const closeModel = () => {
    $("[data-dismiss=modal]").trigger({ type: "click" });
}

export const removeEmptyStringKeys = (values) => {
    Object.keys({ ...values }).map((key, index) => {
        if (key !== 'virtual') {
            if (!values[key] || values[key] === '') {
                delete values[key];
            }
        }
    })
}
export const array_move = (categories) => {

    categories.map(c => {
        let index = c.compensations.findIndex(com => com.name === "Let's get Creative");
        if (index > -1) {
            const [removed] = c.compensations.splice(index, 1);
            c.compensations.splice(c.compensations.length, 0, removed);
        }
    })
    return categories;
};

export const trimString = (string, lenght) => {
    const trimmedString = string.substring(0, lenght);
    if (string.length > lenght) {
        return trimmedString + '...';
    } else {
        return trimmedString;
    }
}

export const getEditCompensations = (compensations) => {
    let compensationData = [];
    // compensations.forEach(com => {
    //     compensationData.push({
    //         value: com.id,
    //         label: com.name
    //     })
    // })

    if (compensations && compensations.length > 0) {
        compensationData = compensations[0].id;
    }
    return compensationData;
}

export const fetchCompensations = (compensations) => {
    let compensationList = '';
    compensations.forEach((c, i) => {
        if ((compensations.length - 1) === i) {
            compensationList = compensationList.concat(c.name);
        } else {
            compensationList = compensationList.concat(c.name + ' | ')
        }
    })
    return compensationList;
}

export const sortAlphabeticalOrder = (arrayObject) => {
    return arrayObject.sort(function (a, b) {
        if (a.name < b.name) { return -1; }
        if (a.name > b.name) { return 1; }
        return 0;
    })
}