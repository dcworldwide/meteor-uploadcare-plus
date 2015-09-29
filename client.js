loadUploadcare = function (config, callback) {
    //todo - shift arguements to support just callback
    if (typeof uploadcare === "undefined") {

        console.log(config);

        if (config && config.key) {
            window.UPLOADCARE_PUBLIC_KEY = config.key;
            window.UPLOADCARE_LOCALE = config.lang || "en";
            window.UPLOADCARE_TABS = config.tabs || "file url facebook gdrive dropbox instagram evernote flickr skydrive box vk";
            window.UPLOADCARE_LOCALE_TRANSLATIONS = {
                buttons: {
                    //cancel: 'Cancel',
                    //remove: 'Remove',
                    choose: {
                        files: {
                            one: 'Upload',
                            other: 'Upload'
                        },
                        images: {
                            one: 'Choose an image',
                            other: 'Choose images'
                        }
                    }
                }
            };

            // Functions to run after the script tag has loaded
            var loadCallback = function () {
                if (Object.prototype.toString.call(callback) === "[object Function]")
                    callback();
            };

            // If the script doesn't load
            var errorCallback = function (error) {
                if (typeof console !== "undefined") {
                    console.log(error);
                }
            };

            // Generate a script tag
            var script = document.createElement("script");
            script.type = "text/javascript";
            script.src = "https://ucarecdn.com/widget/2.5.1/uploadcare/uploadcare.full.min.js";
            script.onload = loadCallback;
            script.onerror = errorCallback;

            // Load the script tag
            document.getElementsByTagName('head')[0].appendChild(script);

            console.log("uploadcare added to head");

        } else {
            if (typeof console !== "undefined") {
                console.log("Uploadcare Public Key not provided");
            }
        }
    }
};

UI.registerHelper("uploadcareUUIDToImageUrl", function (uuid, operations) {
    var url = "";
    if (uuid) {
        var cdn = "http://www.ucarecdn.com/"
        if (Meteor.settings && Meteor.settings.public && Meteor.settings.public.uploadcare && Meteor.settings.public.uploadcare.cdn)
            cdn = Meteor.settings.public.uploadcare.cdn;

        url = cdn + uuid + "/";
        if (operations)
            url += operations;
    }
    return url;
});


