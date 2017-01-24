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
    if (location.hash !== "" && location.hash !== null && typeof(location.hash) !== "undefined") {
      setStateFromHash(location.hash);
    }
  }
  hideEmptyTitles();
}

function hideEmptyTitles() {
  var currentSlide = document.getElementsByClassName("present")[0];
  var headings = currentSlide.querySelectorAll("h1,h2,h3,h4,h5");
  for (var i = 0; i < headings.length; i++) {
    var t = headings[i].textContent;
    t = t.replace(" ", ""); //cuz 'member we use spaces to fake orgmode out?
    console.log("heading content", t);
    if ( t.length === 0 ) {
      headings[i].style.border = "none";
      headings[i].style.visiblity = "hidden";

    }
  }
}


// function showTitles() {
//   var headings = document.querySelectorAll("h1,h2,h3,h4,h5");
//   for (var i = 0; i < headings.length; i++) {
//     headings[i].style.visiblity = "visible";
//   }
// }

// https://github.com/hakimel/reveal.js#slide-states
Reveal.addEventListener('hide-video', function(event) {
    // event.previousSlide, event.currentSlide, event.indexh, event.indexv
    console.log("This is video hiding.");
    console.log(event);
    vp.style.display = 'none';
  //   document.getElementsByTagName("h2")[0].style.visibility = 'hidden'; //for now, also hide the heading
  // document.getElementsByTagName("h3")[0].style.visibility = 'hidden'; //for now, also hide the heading
  // document.getElementsByTagName("h4")[0].style.visibility = 'hidden'; //for now, also hide the heading
  // hideTitles();
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
    // document.getElementsByTagName("h2")[0].style.visibility = 'visible'; //for now, also hide the heading
  // showTitles();

  hideEmptyTitles();
  // // set p,ul,bqs to height
  // // get sections (slides)
  // var allsections = document.getElementsByTagName("section");
  // // get current one
  // var currentsection = document.getElementsByClassName("present")[0];
  // console.log(currentsection);
  // // text elements need to be moved
  // var firstTextElem = currentsection.querySelectorAll("p,ul,blockquote")[0];
  // console.log(firstTextElem);
  // firstTextElem.className += "quadrantized";

}, false);
