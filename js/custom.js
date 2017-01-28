console.log("hello, i'm learning!");

var videoPlaceholderTag = "video";

// create the placeholder
var vp = document.createElement(videoPlaceholderTag);
vp.id = "videoPlaceholder";
vp.setAttribute("data-autoplay", "");
vp.setAttribute("autoplay", "");

// insert our placeholder for where the video will go
// (placement and style attributes handled in css)
// and I think we want to have this only inserted once, vs appended to each section(aka slide)
var rev = document.getElementsByClassName("slides")[0]; //("reveal")[0]; // there should only be one anyway
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


// https://github.com/hakimel/reveal.js#slide-states
Reveal.addEventListener('hide-video', function(event) {
    videoShouldHide(true);
}, true);


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
    var curSlide = event.currentSlide;
    var redImgSrc = curSlide.getAttribute("redpill-img-src");
    // console.log("REDPILL imgSrc", redImgSrc);

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
      if (redImgSrc.search("/") !== 0) { redImgSrc = "/" + redImgSrc; }

      var imageSrc = image.src;
      imageSrc = decodeURI(imageSrc); // and clear out pesky %'s

      if (imageSrc === "http://" + window.location.host + redImgSrc) {
        //apply css rules to that image (found via src) to move it to the right spot.
        console.log("Found redpill image. Appending class 'redpill-image'");
        image.className += " redpill-image "; //TODO: don't just apply css; create video-esque fixed div and move the image there to make position independent of slide text... or use "anchor" div in that quadrant to fixed-position the image
      } else {
        console.log(image.src + " <- image.src doesn't match redpillsrc -> " + redImgSrc);
      }
    }
  }


});
