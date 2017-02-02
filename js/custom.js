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

var usingVideo = false;
var video = document.querySelector('video');
// video.addEventListener("click", setVideoFullsize);

function setVideoNormalsize() {
    var presentSection = document.querySelector("section.present");
    console.log("removing fullsize");
    video.className = "";
    presentSection.style.display = "block";
    setUpVideo(webcamConstraints);
}

function setVideoFullsize() {
    var presentSection = document.querySelector("section.present");
    console.log("going fullsize");
    video.className += "fullsize";
    presentSection.style.display = "none";
    setUpVideo(setVideoContraints(1920 * 0.8, 1080 * 0.8));
}

var webcamConstraints = {
    audio: false, //true,
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
    audio: false, //true,
    video: true
};

function setVideoContraints(w, h) {
    var x = webcamConstraints;
    x.video.mandatory.minWidth = w;
    x.video.mandatory.minHeight = h;
    return x;
}

function setUpVideo(constraints) {
    if (typeof(constraints) === "undefined") {constraints = webcamConstraints;}
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
        }, videoErrorCallback);

        // streamVideo(gum);

    } else {
        console.log("Browser doesn't support webcamering. Bummer.");
        // video.src = 'somevideo.webm'; // fallback. TODO
    }
}

function videoErrorCallback(err) {
    // alert(err);
    console.log(err);
}


// enables url hash placeholding
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

var qrStyleBase = {
    // text: "http://jindo.dev.naver.com/collie",
    width: 256,
    height: 256,
    colorDark: "#000000", //"rgb(186,50,79)",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
};

function createQRImage(element, optsIn) {
    for (var i in optsIn) {
        if (optsIn.hasOwnProperty(i)) {
            qrStyleBase[i] = optsIn[i];
        }
    }
    console.log("building qr with data", qrStyleBase);
    var qrcode = new QRCode(element.id, qrStyleBase);
    return qrcode;
}

function checkVideoSize(event) {
    var curSlide = event.currentSlide;
    var videoSizeAttr = curSlide.getAttribute("video-size"); // full, normal
    if (videoSizeAttr === "full") {
        setVideoFullsize();
    }
    if (videoSizeAttr === "normal") {
        setVideoNormalsize();
    }
}

function formatRedpillFigures(event) {
    var curSlide = event.currentSlide;
    var redImgSrc = curSlide.getAttribute("redpill-img-src");
    var qrData = curSlide.getAttribute("qr-data");
    if (redImgSrc !== null) {
        // get all images in slide
        var slideImages = curSlide.getElementsByTagName("img");

        // iterate through images
        for (var i = 0; i < slideImages.length; i++) {

            var image = slideImages[i];

            //prepend / if not present, avoid a gotcha <--- cuz is live url
            if (redImgSrc.search("/") !== 0) {
                redImgSrc = "/" + redImgSrc;
            }

            var imageSrc = image.src;
            imageSrc = decodeURI(imageSrc); // and clear out pesky %'s

            //check amended img source is the redpill source we're looking for
            if (imageSrc === "http://" + window.location.host + redImgSrc) {

                var rpBoxCoords = getOffset(redpillBox);
                console.log("rpBoxCoords", rpBoxCoords);

                var imageFigure = findAncestor(image, ".figure");
                console.log("figure", imageFigure);

                var imageFigureCoords = getOffset(imageFigure);
                console.log("figureCoords", imageFigureCoords);

                var deltaTop, deltaLeft;
                // check if we've been through this already so not to dupe..
                if (alreadyFormatted(event, redImgSrc)) {
                    deltaTop = rpBoxCoords.top - imageFigureCoords.top;
                    deltaLeft = rpBoxCoords.left - imageFigureCoords.left;
                } else {

                    imageFigure.className += " redpill ";

                    // no idea why have to do this extra spacing...
                    deltaTop = (rpBoxCoords.top - imageFigureCoords.top) + 20;
                    deltaLeft = (rpBoxCoords.left - imageFigureCoords.left) + 76;

                    setAsFormatted(event, redImgSrc); // so don't have to add the extra spacer if there is a next time

                    if (qrData !== null && typeof(qrData) !== "undefined" && qrData !== "") {
                        var qrHere = document.createElement("div");
                        qrHere.id = getUniqueFigureID(event, redImgSrc);
                        qrHere.className += " qrcode ";
                        imageFigure.children[0].append(qrHere); // div.figure > p > img[redpill]

                        // var size = image.height < image.width ? image.height : image.width;
                        // size += -40; // smaller than smallest side of image by this much
                        // size = size > 192 ? 192 : size; //max size 256square
                        var size = 192;

                        var qr = createQRImage(qrHere, {
                            text: qrData,
                            height: size,
                            width: size
                        });
                    }
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
}




// reset func // this is ugly but...
Reveal.addEventListener('slidechanged', function(event) {

    var state = Reveal.getState();
    location.hash = state.indexh.toString();

    videoShouldHide(false);

    hideEmptyTitles(); // becuase not all are rendered upfront --

    formatRedpillFigures(event);

    // need to set, and then unset video size for full-normal toggling
    checkVideoSize(event);

});
