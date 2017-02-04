var GitHub = require('github-api');
var freq = require('freq');
var fs = require('fs');
 
// basic auth 
var gh = new GitHub({
   // username: 'FOO',
   // password: 'NotFoo'
    // also acceptable:
  token: process.env.GITHUB_WHILEI_OAUTH_TOKEN
});

function handleAPIError(err) {
	console.log("Err. ", err);
}

function gotStarredRepos(repos) {
   console.log("Found ", repos.length, " starred repos.");

   var numberOfSimpleRepos = 0;
   var descriptions = [];
   for (var i = 0; i < repos.length; i++) {
      if (repos[i].description && repos[i].description.match(/simple/i)) {
      	numberOfSimpleRepos++;
      }
      if (repos[i].description) {
      	descriptions.push(repos[i].description);
      }
   }
   console.log("With 'simple' in the description: ", numberOfSimpleRepos);
   console.log("That's ", numberOfSimpleRepos/repos.length, "%");

  var f = freq(descriptions);
  //	[ 
//		{ word: 'jump', count: 2 }, 
//		{ word: 'kris', count: 1 }, 
//		{ word: 'kross', count: 1 }, 
//		{ word: 'will', count: 1 }, 
//		{ word: 'make', count: 1 }, 
//		{ word: 'you', count: 1 } 
//	] 

  // https://www.d.umn.edu/~rave0029/research/adjectives1.txt
  var adjectives = fs.readFileSync('adjectives1.txt').toString().split("\n"); // a limited source, but....

  //count all adjectives
  var countAdjsInDescs = {};
  console.log("This many unique words in descriptions: ", f.length);
  console.log("And this many adjectives in src text file: ", adjectives.length);
  
  for (var j = 0; j < f.length; j++) {
  	if (adjectives.indexOf(f[j].word.toLowerCase()) > -1) {
  		countAdjsInDescs[f[j].word] = f[j].count;
  	}
  }

  for (var prop in countAdjsInDescs) {
    if (countAdjsInDescs.hasOwnProperty(prop)) {
        console.log(prop, countAdjsInDescs[prop]);
    }
	}
}

function handleResponse(err, res) {
	if (err) { handleAPIError(err); return; }
	gotStarredRepos(res);
}

var i = gh.getUser('whilei');
i.listStarredRepos(handleResponse);