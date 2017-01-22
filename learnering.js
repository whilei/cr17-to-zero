console.log("hello, i'm learning!");

var videoPlaceholderTag = "div";

// create the placeholder
var vp = document.createElement(videoPlaceholderTag);
vp.id = "videoPlaceholder";

// insert our placeholder for where the video will go
// (placement and style attributes handled in css)
document.body.insertBefore(vp, document.body.firstChild);
