# Uploadcare on demand package with helpers for Meteor

Package to use Uploadcare in Meteor, loads on demand, optional callback.

## How to install

Add package
```
meteor add nate-strauser:uploadcare-plus
```

## Using Meteor.settings

```
{
  "public" : {
    "uploadcare": {
          "publicKey": "",
          "cdn": "http://www.ucarecdn.com",
          "tabs": "file url facebook gdrive dropbox"
        }
  }
}
```
if you specify a publickey, the call to `loadUploadcare()` does not need a key arguement, it will read from the settings


## On demand loading

Load once for your whole application at startup or as needed from template created or rendered functions
```
    var ucOptions = {
        key: Meteor.settings.public.uploadcare.publicKey,
        tabs: Meteor.settings.public.uploadcare.tabs
    };

    loadUploadcare(ucOptions, function() {

        var widget = uploadcare.Widget('[role=uploadcare-uploader]');

        uploadcare.openDialog(null, {
            publicKey: Meteor.settings.public.uploadcare.publicKey,
            imagesOnly: true,
            crop: "300x200"
        });

    });

You can call this over and over again.  It will detect if uploadcare has already been loaded, only loading the script when needed.

## Iron Router Integration

if you have specific routes that need to use uploadcare, you can load them for just these routes
```
Router.onBeforeAction(function(){
  loadUploadcare('<YOUR KEY>');
  //can leave out key if its in settings
  this.next();
},{only:['<ROUTE NAME>','<ROUTE NAME>']});
```

## Image Url Helper
Uou can use this helper to resize images on demand.  See https://uploadcare.com/documentation/cdn/#image-operations


size an image
```
{{uploadcareUUIDToImageUrl UUID '-/resize/200x200/'}}
```


-----

You can use this in an image tag
```
<img src="{{uploadcareUUIDToImageUrl UUID '-/resize/200x200/'}}">
```


### Credits
Derived from impicker and my own filepicker-plus package
