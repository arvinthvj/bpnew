import React from "react";
import axios from "axios";

export const BASE_URL = () => {
  let url;
  if (process.env.REACT_APP_ENV === "development") {
    url = "https://stage-api.partnerhere.com/";
  }
  if (process.env.REACT_APP_ENV === "staging") {
    url = "https://stage-api.partnerhere.com/";
  }
  if (process.env.REACT_APP_ENV === "production") {
    console.log("production if");
    url = "https://api.partnerhere.com/";
  }
  if (process.env.REACT_APP_ENV === "new_staging") {
    url = "https://stage1-api.partnerhere.com/";
  }
  return url;
};

export const LMS_BASE_URL = () => {
  let url;
  if (process.env.REACT_APP_ENV === "development") {
    url = "https://stage.partnerhere.com";
  }
  if (process.env.REACT_APP_ENV === "staging") {
    url = "https://stage.partnerhere.com";
  }
  if (process.env.REACT_APP_ENV === "new_staging") {
    url = "https://stage1.partnerhere.com";
  }
  if (process.env.REACT_APP_ENV === "production") {
    console.log("production if");
    url = "https://www.partnerhere.com";
  }
  return url;
};

export const WEB_URL = () => {
  let url;
  if (process.env.REACT_APP_ENV === "development") {
    url = "https://qa-lms.partnerhere.com";
  }
  if (process.env.REACT_APP_ENV === "staging") {
    url = "https://qa-lms.partnerhere.com";
  }
  if (process.env.REACT_APP_ENV === "new_staging") {
    url = "https://qa1-lms.partnerhere.com";
  }
  if (process.env.REACT_APP_ENV === "production") {
    console.log("production if");
    url = "https://secure.partnerhere.com";
  }
  return url;
};

export const fetchHomePageVideoURL = () => {
  let url;
  if (process.env.REACT_APP_ENV === "development") {
    url =
      "https://partnerhere-staging-media.s3-us-west-1.amazonaws.com/PartnerHere.mp4";
  }
  if (process.env.REACT_APP_ENV === "staging") {
    url =
      "https://partnerhere-staging-media.s3-us-west-1.amazonaws.com/PartnerHere.mp4";
  }
  if (process.env.REACT_APP_ENV === "production") {
    console.log("production if");
    url =
      "https://partnerhere-media.s3-us-west-2.amazonaws.com/PartnerHere.mp4";
  }
  return url;
};

export const API_VERSION = "v1/";

export const GATrackingID = () => {
  if (process.env.REACT_APP_ENV === "development") {
    return "UA-172375616-1";
  } else if (process.env.REACT_APP_ENV === "staging") {
    return "UA-172375616-1";
  } else {
    //production
    return "UA-172375616-2";
  }
};

export const FB_LOGIN_APP_ID = () => {
  if (process.env.REACT_APP_ENV === "development") {
    return "512415546363619";
  } else if (process.env.REACT_APP_ENV === "staging") {
    return "512415546363619";
  } else {
    return "533897440619844";
    // 153939689234893
  }
};
export const GOOGLE_LOGIN_CLIENT_ID = () => {
  if (process.env.REACT_APP_ENV === "development") {
    return "699921898285-7nk47oiaq5io5mv2vlaif6mrlb6d7415.apps.googleusercontent.com";
  } else if (process.env.REACT_APP_ENV === "staging") {
    return "699921898285-7nk47oiaq5io5mv2vlaif6mrlb6d7415.apps.googleusercontent.com";
  } else {
    return "108196289065-522koqbuqc3277tm5cks4j5gpi5s47p7.apps.googleusercontent.com";
  }
};

export const GOOGLE_PLACES_API_KEY = () => {
  if (process.env.REACT_APP_ENV === "development") {
    return "AIzaSyA7mQPZZBPOWpse53-VXly9TOxKcLHkbSg";
  } else if (process.env.REACT_APP_ENV === "staging") {
    return "AIzaSyA7mQPZZBPOWpse53-VXly9TOxKcLHkbSg";
  } else {
    return "AIzaSyDTwzF1bJyqpst_KLNh7zN81yQqcC0zVp8";
  }
};

export const Tooltip_Script = () => {
  console.log("tooltipENV");
  if (process.env.REACT_APP_ENV === "development") {
    console.log("devEnv");
    return (
      <script>
        {`window.Tooltip || function (t, e) {
          var o = {
            url: "https://cdn.tooltip.io/static/player.js",
            key: "553ad3f1-ff4c-46b1-9438-e7abc953b1b6",
            async: true
          };
          window.Tooltip = { cs: [], _apiKey: o.key }; for (
            var r = ["identify", "goal", "updateUserData", "start", "stop", "refresh", "show", "hide", "on"],
            i = {}, n = 0; n < r.length; n++) {
            var a = r[n]; i[a] = function (t) {
              return function () {
                var e = Array.prototype.slice.call(arguments);
                window.Tooltip.cs.push({ method: t, args: e })
              }
            }(a)
          } window.Tooltip.API = i; var n = t.createElement(e), s = t.getElementsByTagName(e)[0];
          n.type = "text/javascript"; n.async = o.async; s.parentNode.insertBefore(n, s); n.src = o.url;
        }(document, "script")`}
      </script>
    );
  } else if (process.env.REACT_APP_ENV === "staging") {
    console.log("stageENV");
    return (
      <script>
        {`window.Tooltip || function (t, e) {
          var o = {
            url: "https://cdn.tooltip.io/static/player.js",
            key: "553ad3f1-ff4c-46b1-9438-e7abc953b1b6",
            async: true
          };
          window.Tooltip = { cs: [], _apiKey: o.key }; for (
            var r = ["identify", "goal", "updateUserData", "start", "stop", "refresh", "show", "hide", "on"],
            i = {}, n = 0; n < r.length; n++) {
            var a = r[n]; i[a] = function (t) {
              return function () {
                var e = Array.prototype.slice.call(arguments);
                window.Tooltip.cs.push({ method: t, args: e })
              }
            }(a)
          } window.Tooltip.API = i; var n = t.createElement(e), s = t.getElementsByTagName(e)[0];
          n.type = "text/javascript"; n.async = o.async; s.parentNode.insertBefore(n, s); n.src = o.url;
        }(document, "script")`}
      </script>
    );
  } else {
    console.log("prodEnv");
    return (
      <script>
        {`window.Tooltip || function (t, e) {
          var o = {
            url: "https://cdn.tooltip.io/static/player.js",
            key: "923f22f5-fa81-4a93-bc58-714db448b778",
            async: true
          };
          window.Tooltip = { cs: [], _apiKey: o.key }; for (
            var r = ["identify", "goal", "updateUserData", "start", "stop", "refresh", "show", "hide", "on"],
            i = {}, n = 0; n < r.length; n++) {
            var a = r[n]; i[a] = function (t) {
              return function () {
                var e = Array.prototype.slice.call(arguments);
                window.Tooltip.cs.push({ method: t, args: e })
              }
            }(a)
          }
          window.Tooltip.API = i; var n = t.createElement(e), s = t.getElementsByTagName(e)[0];
          n.type = "text/javascript";
          n.async = o.async;
          s.parentNode.insertBefore(n, s);
          n.src = o.url;
        }(document, "script")`}
      </script>
    );
  }
};

export const ZENDESK_KEY = "a9e1708c-6198-4806-a379-77a71f9fc824";

const instance = axios.create({
  baseURL: BASE_URL(),
});

export default instance;
