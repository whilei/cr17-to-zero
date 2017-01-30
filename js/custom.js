console.log("hello, i'm learning!");

var videoPlaceholderTag = "video";

// create the placeholder
var vp = document.createElement(videoPlaceholderTag);
vp.id = "videoPlaceholder";
vp.setAttribute("data-autoplay", "");
vp.setAttribute("autoplay", "");

var redpillBox = document.createElement("div");
redpillBox.id = "redpill-box";

// insert our placeholder for where the video will go
// (placement and style attributes handled in css)
// and I think we want to have this only inserted once, vs appended to each section(aka slide)
var rev = document.getElementsByClassName("slides")[0]; //("reveal")[0]; // there should only be one anyway

// first insert redpillbox, then video before that
rev.insertBefore(redpillBox, rev.firstChild);
rev.insertBefore(vp, rev.firstChild); //vs slides



var webcamConstraints = {
    audio: true,
    video: {
        mandatory: {
            maxWidth: 640, //this may be able to be enlarged, depending on cam resolution
            maxHeight: 360
                // minWidth: 1280,
                // minHeight: 720
        }
    }
};
var noConstraints = {
    audio: true,
    video: true
};

var video = document.querySelector('video');
var usingVideo = false;

function setUpVideo() {
    // usingVideo = true;
    // for jay, not for other people...
    //check for user video media
    navigator.getUserMedia = navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia;
    // gum = navigator.getUserMedia;
    if (navigator.getUserMedia) {
        usingVideo = true;
        navigator.getUserMedia(webcamConstraints, function(stream) {
            console.log(stream);
            video.src = window.URL.createObjectURL(stream);
        }, errorCallback);

        // streamVideo(gum);

    } else {
        video.src = 'somevideo.webm'; // fallback. TODO
    }

}

function errorCallback(err) {
    alert(err);
}

function setStateFromHash(hash) {
    var hash = hash;
    hash = hash.replace('#', '');
    hash = hash.split("-");
    // console.log("got v, h from hash: ", hash);
    if (hash !== "") {
        Reveal.slide(parseInt(hash[0]));
        console.log('did set state', hash);
    }
}

window.onload = function() {

    if (Reveal.isReady()) {
        if (location.hash !== "" && location.hash !== null && typeof(location.hash) !== "undefined") {
            setStateFromHash(location.hash);
        }

    }
    hideEmptyTitles();

    //see if you want to look at yourself
    // if (confirm("Want to use webcam video?")) {
    setUpVideo();
    // } else {
    //     vp.style.background = "white"; // for now
    // }

}

function hideEmptyTitles() {
    var currentSlide = document.getElementsByClassName("present")[0];
    var headings = currentSlide.querySelectorAll("h1,h2,h3,h4,h5");
    for (var i = 0; i < headings.length; i++) {
        var t = headings[i].textContent;
        t = t.replace(" ", ""); //cuz 'member we use spaces to fake orgmode out?
        // console.log("heading content", t);
        if (t.length === 0) {
            headings[i].style.border = "none";
            headings[i].style.visiblity = "hidden";

        }
    }
}

var videoIsHiding = false;

function videoShouldHide(yes) {
    if (yes && !videoIsHiding) {
        // console.log("This is video hiding.");
        videoIsHiding = true;
        // vp.style.display = 'none';
        vp.style.visibility = "hidden";

    } else if (videoIsHiding) {
        // console.log("Unhiding video.");
        videoIsHiding = false;
        // vp.style.display = 'inline-block';
        vp.style.visibility = "visible";
    }
}
// http://stackoverflow.com/questions/442404/retrieve-the-position-x-y-of-an-html-element
function getOffset(el) {
    var _x = 0;
    var _y = 0;
    while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return {
        top: _y,
        left: _x
    };
}

// https://github.com/hakimel/reveal.js#slide-states
Reveal.addEventListener('hide-video', function(event) {
    videoShouldHide(true);
}, true);

function findAncestor(el, cls) {
    // while ((el = el.parentElement) && !el.classList.contains(cls));
    // return el;
    return el.closest(cls);
}

function getOffset(el) {
    var _x = 0;
    var _y = 0;
    while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return {
        top: _y,
        left: _x
    };
}

var formattedFigures = {};

function getUniqueFigureID(event, src) {
    return event.indexh + "-" + event.indexv + "-" + src;
}

function setAsFormatted(event, src) {
    formattedFigures[getUniqueFigureID(event, src)] = true;
}

function alreadyFormatted(event, src) {
    return formattedFigures[getUniqueFigureID(event, src)];
}

function formatRedpillFigures(event) {
    var curSlide = event.currentSlide;
    // var slides = document.getElementsByTagName("section");
    // console.log("slides", slides);
    // console.log("slides count", slides.length);
    // for (var i = 0; i < slides.length - 1; i++) {
        // var curSlide = slides[i];
        var redImgSrc = curSlide.getAttribute("redpill-img-src");
        if (redImgSrc !== null) {
            // get all images in slide
            var slideImages = curSlide.getElementsByTagName("img");

            // iterate through images
            for (var i = 0; i < slideImages.length; i++) {

                var image = slideImages[i];
                // console.log("Iterating through slide image: ", image);
                // console.log("Image source is: ", image.src);

                //find image in slide.
                //*have to prepend proto + host + src

                //prepend / if not present, avoid a gotcha <--- cuz is live url
                if (redImgSrc.search("/") !== 0) {
                    redImgSrc = "/" + redImgSrc;
                }

                var imageSrc = image.src;
                imageSrc = decodeURI(imageSrc); // and clear out pesky %'s


                //check amended img source is the redpill source we're looking for
                if (imageSrc === "http://" + window.location.host + redImgSrc) {

                    //apply css rules to that image (found via src) to move it to the right spot.
                    console.log("Found redpill image. Appending class 'redpill-image'");

                    // get coords of redpillBox.
                    // redpillBox.append(image); // we'll have to clear this out, too

                    // sets max height+width
                    // image.className += " redpill-image "; //TODO: don't just apply css; create video-esque fixed div and move the image there to make position independent of slide text... or use "anchor" div in that quadrant to fixed-position the image

                    var rpBoxCoords = getOffset(redpillBox);
                    console.log("rpBoxCoords", rpBoxCoords);

                    var imageFigure = findAncestor(image, ".figure");
                    console.log("figure", imageFigure);

                    var imageCoords = getOffset(imageFigure);
                    console.log("figureCoords", imageCoords);

                    var deltaTop, deltaLeft;
                    if (alreadyFormatted(event, redImgSrc)) {
                        deltaTop = rpBoxCoords.top - imageCoords.top;
                        deltaLeft = rpBoxCoords.left - imageCoords.left;
                    } else {
                        // no idea why have to do this...
                        deltaTop = ( rpBoxCoords.top - imageCoords.top ) + 20;
                        deltaLeft = ( rpBoxCoords.left - imageCoords.left ) + 76;
                        setAsFormatted(event, redImgSrc); // so don't have to add the extra spacer
                    }

                    imageFigure.style.position = "absolute";
                    imageFigure.style.width = redpillBox.offsetWidth + "px";
                    imageFigure.style.transform = "translate(" + deltaLeft + "px," + deltaTop + "px)";

                } else {
                    console.log(image.src + " <- image.src doesn't match redpillsrc -> " + redImgSrc);
                }

            }
        } else {
            console.log("No redpill. As you were.");
        }
    // }
}




// reset func // this is ugly but...
Reveal.addEventListener('slidechanged', function(event) {
    // event.previousSlide, event.currentSlide, event.indexh, event.indexv
    // set location hash
    var state = Reveal.getState();
    // console.log(state.indexh, state.indexv);
    location.hash = state.indexh.toString();
    videoShouldHide(false);
    hideEmptyTitles(); // becuase not all are rendered upfront --
    // console.log("slidechanged", event);

    // check for redpill images
    // var curSlide = event.currentSlide;
    formatRedpillFigures(event);
    // var redImgSrc = curSlide.getAttribute("redpill-img-src");
    // console.log("REDPILL imgSrc", redImgSrc);

});
