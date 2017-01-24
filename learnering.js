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


// // state listener
// Reveal.addEventListener( 'hide-video', function() {
//   // Called each time the slide with the "hide-video" state is made visible
//   console.log("listening to video hiding");
//   vp.style.display = 'none';
// }, false);



function setStateFromHash(hash) {
  var hash = hash;
    hash = hash.replace('#', '');
  hash = hash.split("-");
  console.log("got v, h from hash: ", hash);
    if (hash !== "") {
      Reveal.slide(parseInt(hash[0]));
        console.log('did set state', hash);
    }
}

window.onload = function () {
  if (Reveal.isReady()) {
    setStateFromHash(location.hash);
  }
}


// https://github.com/hakimel/reveal.js#slide-states
Reveal.addEventListener('hide-video', function(event) {
    // event.previousSlide, event.currentSlide, event.indexh, event.indexv
    console.log("This is video hiding.");
    console.log(event);
    vp.style.display = 'none';
    document.getElementsByTagName("h2")[0].style.visibility = 'hidden'; //for now, also hide the heading
}, false);

// reset func // this is ugly but...
Reveal.addEventListener('slidechanged', function(event) {

    // set location hash
    var state = Reveal.getState();
    console.log(state.indexh, state.indexv);
    location.hash = state.indexh.toString();

    // location.hash = event.indexh + "-" + event.indexv; //update hash
    // console.log("set state to ", state);

    // event.previousSlide, event.currentSlide, event.indexh, event.indexv
    // console.log("slide changed");
    console.log(event);
    // console.log("This is slide chaingin.");
    vp.style.display = 'inline-block';
    document.getElementsByTagName("h2")[0].style.visibility = 'visible'; //for now, also hide the heading
}, false);
