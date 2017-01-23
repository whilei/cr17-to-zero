console.log("hello, i'm learning!");

var videoPlaceholderTag = "div";

// create the placeholder
var vp = document.createElement(videoPlaceholderTag);
vp.id = "videoPlaceholder";

// insert our placeholder for where the video will go
// (placement and style attributes handled in css)
// and I think we want to have this only inserted once, vs appended to each section(aka slide)
var slides = document.getElementsByClassName("slides")[0]; // there should only be one anyway
slides.insertBefore(vp, slides.firstChild);
// document.body.insertBefore(vp, document.body.firstChild);
