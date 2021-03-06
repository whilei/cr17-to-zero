---
author: Isaac Ardis
...

Learning about learning together.
=================================

Notes on beginning to swim in a new language.
-   Org mode
-   Spac/Emacs
-   Clojure

The Calculus of Growth
======================

Understanding change over time. How do we visualize change? Diffs,
commit trees, fork graphs. How do we manage change? PR's and Issues,
team leads, organization members. How do we nurture growth? ie
Stackoverflow -- incredibly and wildly excellent for technicalities,
astoundingly resistant-to and empty of "architecture" or "advise".

The org mode mode.
==================

Thinking about the ( character ) of text. Get it?

Notes on building a custom project with org-mode and Reveal.js
--------------------------------------------------------------

Org-mode is about **content**. It's for this reason that it's
encouraging and intuitive to consider the joining-of-forces between the
veritable Org-mode and and the very-shiny Reveal.js. It's a match made.

With that said, both frameworks - if I can call them that - are highly
opinionated beasts, and while org-reveal does an excellent job of
shipping one to the other (respectively), there will come a time in a
developer's life when some customization is required, and from there...
opinions may differ.

The first hurdle is that since you're porting an org document to an html
document, you're working with a relatively black-boxy metamorphosis,[^1]
and it can feel at times like working on an airplane that keeps taking
off. If it would just hold still! With that said, the developer's
challenge here is also one of the great powers of the process.
Org-reveal is providing a comprehensive way to ship **dynamic** text
content to a slideshow-formatted html doc.

Our project involves a moderate degree of customization. Generally
speaking, we want to format each slide in quadrants, with the left 2
quadrants (the left half) comprising the majority of the slide content,
the top-right leaving room for a live-video stream, and the bottom-right
holding a place for supplementary images and audience-oriented content.

### Getting customize-able.

First things first: You want to customize a template? Where and how are
you going to fit your changes in?

Org-reveal provides document-specific variable precisely for this job:
\`\`\`

\#+REVEAL~EXTRAJS~

\#+REVEAL~EXTRACSS~ \`\`\` Great!

Now, hold your horses here for a second. Before you go swinging away
into a custom .css sheet, I urge you to also note that Reveal.js on its
own is prepared for this kind of thing. The instructions on the
\[Reveal.js README\](linkhere) direct us to custom template pattern in
which we can write SCSS :clap: and use the provided grunt tasks to build
the css for us.

### Getting your dirs in order.

Which brings me to the issue of reckoning parentage with regard to your
directory structure. By default, **Org-reveal** is going to look for the
**root** (yes, **root**; not script) of the Reveal.js package at
\`./reveal.js\`, where that directory contains all of what you'll find
at the \[Reveal Github repository\](linkhere). On the other hand, if we
take a peek at the reveal.js directory, we'll notice that it's set up to
treat itself as the root of the project; noting \`./demo.html\`, grunt
tasks reference base paths (by default) at \`.\`.

So there's a decision to be made here. Is your org project something
that is going to live beyond the Reveal.js show? Does it have a lot of
extra relative resources? Is it a part of a larger whole, of other docs
and projects? If it is, your best bet is probably to keep reveal.js/
where org-reveal expects it to be - as a \~\~sub\~\~sibling directory
\~\~below\~\~akin to your .org file. However, if your idea is to write a
single presentation and to use org mode to do it, then your best best is
likely to take the reveal.js/ as your root dir, and locate your .org
file alongside \`./demo.html\`. If this is the case, you'll need to
correct where org-reveal is going to look to find the reveal.js/
directory structure it expects (don't think I forgot!). Good thing
there's a variable for that! Set \`\#+REVEAL~ROOT~: ./\`, and you're off
to the races.

As for your custom JavaScript, use \`\#+REVEAL~EXTRAJS~: {src:
'./js/custom.js'}\`, pointing, of course, to wherever your actual .js
is. :TODO: because show where org-reveal actually sticks this nugget

Learning Language
=================

When we're toddlers, we make a lot of mistakes. We bump into walls,
scrape our knees, accidentally spill pasta all over our heads. Some are
simple misunderstandings - or, alternate interpretations - of
established conventions, and others less intentional. Perhaps the most
important mistakes we can make as children is in our mumblings and
cryings, our manglings, simplifications, and contortions of language.

I would pause here - mistakes is the wrong word. Children do not regret
their words, nor parents regret that "mo miks" actually means "More
milk, please." Language is forgiving like that. Language is plastic, and
can finds its most critical and characteristic triumphs in it's being
able to bend without breaking.

Again, I pause -- **human** language is plastic. Because humans are
plastic. Whatever it is that enables self-reference, self-development,
and... 'learning', shall we call it? Our language is or is able to be a
reflection of ourselves. Our languages are expressive, dynamic, and
ultimately able to acheive the impossible -- namely, to extend beyond
themselves with the dynamism of contortionist and the strength of an
army.

When a toddler makes a syntax mistake, her listeners are still able to
glean valuable information from the effort.

As a beginning programmer, I felt much the same as a toddler. But I made
one important mistake: I devalued them. I wanted to write code that
**ran**. I abhorred errors. I wanted to avoid them. The computer was not
generous with me. That is not how computers are (yet!).

What I've learned since has been from the generosity of Stackoverflow
contributors, bloggers, authors, Youtubers... the list goes on. But I
also learned to listen to the machine. I learned to love errors, because
I learned to read them. I thank my humanity for that -- somehow if you
stare a thing long enough you start to be able to read it. Whether it's
the water on the pond, the painting on the wall, or the god damned 500.

When you develop with the attitude that "errors should be avoided," one
is likely to aim towards the more-surely-achievable. That's a problem.
For one: it's not as fun. For two: it's not a challenge. For three:
you're not as likely to expose yourself to the opportunity to learn.
Make friends with errors, on the other hand, and while progress may seem
slower, or success less certain, you just might wind up holding the
impossible.

-   Code resources on the internet are often endpoint-success-oriented.
    -   I think of git init commits on Github containing 95% of
        the codebase.
    -   I think of blogs and tutorials... "Build with me a working
        thing," where each step has been planned ahead of time and there
        are no dead-ends, no oops! well, here's what we're going to have
        to do about that...
-   Code resources on the internet are focues on solving a single
    technical problem.
    -   I think of the self-imposed limits of stackoverflow. A few
        excellent "here's how and here's why" answers in a sea of
        "here's how". Practicality rules, but education does not. (Not
        that there's not something to be learned from that, too).
        -   stackexchange/codereview is a very interesting
            alernately-framed approach
-   Code resources on the internet are often single-framed.
    -   static images, stepA, stepB, stepC. I'd be curious to see more
        over-the-shoulder opportunities, where a student might be able
        to learn by watching. How does the teacher interact with his
        OS environment. From window layouts to aliases, hotkeys to
        debuggers, editors, IDEs... There is a difference between
        examining the chair and breathing the sawdust.
-   <https://www.youtube.com/watch?v=ZFV5EqpZ6_s>

We need teachers, not instruction-manual authors. We need students, not
copycats. We need hackers who can use their computer in the name of
play.

Language likes to grow.
-----------------------

Clojure, meet Learning
======================

Clojure has a lot going for it on the learning front. A vibrant,
welcoming community. A charasmatic and sharp key figure, Rich Hickey.
And REPL.

REPL! **\*REPL!!\***

Among doctors, anathesiologists have the relatively highest measurable
accuracy of 'intuition,' more so than surgeons, therapists, ENT's,
GI's... the list goes on. It's not because they are cleverer or that
they self-select as scientifically- abstractly(math)-oriented. It's
because they get feedback quickly. In fact, they weren't always so
adept. Anathesia used be a **very** clumsy science; whiskey and bullets,
chloroform and morphine were about as good as it got. And, yes, those
tools still work! But, aside from improved chemistry, what
anathesiologists have today that they didn't 100 or even 20 years ago is
exceptionally responsive monitoring devices. They can watch a patient's
blood levels, cardiac rhythms, and a variety of other bio-feedback
variables in realtime. While on the other hand, a surgeon's feedback
comes hours, days, or even months after the fact. Leave some pliers in
the abdomen? Better check your email... But anathesiologists have REPLs.

Immediate feedback is critical for learning. And that's what a REPL
does.

And not only does almost every Clojure tutorial I've found begin with
**Setting up your IDE and trying out the nREPL**, but the language
itself is built to support inline feedback and tests, ie \`(comment)\`.
The only other evironment I've found with similarly dynamic feedback
space is XCode's Playgrounds. Let's not understate this!

One of the things I love about code is that it brings abstraction to
life. It gives math tangibility. You get the same feeling when your
router misbehaves as if the transmission dropped out of your car.
**Thunk. Yep, nope, we're not going anywhere.** Math for me (at least in
school) was different. You're presented with a problem - you offer a
possible, plausibly, hopefully-probably approximately solve for it, then
you turn it and go home for the weekend. Monday morning you get a note
on your desk saying "Yes, close, but \`5.0\` should have been \`0.5\`."
But I meant that! I made a typo! Or: "Yes, but here's a another -
faster/more-elegant/more-legible way of doing it." Oh, I though of that,
but wasn't sure it would run...

Feedback is an issue for math; a red pen is not the same as a stalled
engine.

By my account, Clojure looks - weird. As a strictly functional language
it's something fundamentally different than I'm experienced with. It's
got funny, loopy-looking words and punctuation. But it looks
**responsive** - it looks like a language (and a discourse!) that was
built with "development" (great word) as a first-class priority.

The shape of teaching code.
===========================

Problem: tutorials (99% of them) looks like this: ---
1.  Alright, now we're going to add this piece of the puzzle:

\`\`\` (funny (looking (+ shape shape))) \`\`\` Got it? Good. Next step:

1.  Now we've got our describer-thingy set up. Time to install the
    bad-guys-preventers:

\`\`\` (knock :as knockknock (:equals? (or password token handshake
eyecontact))) \`\`\` And now look! No bad guys. Great.

Oh yea, it's on Github. Copy and paste at will. ---

-   Problem 1: It's chunked. I have a hard time frame-by-frame. For me,
    it's like watching a slideshow instead of a movie, or reading an
    iPad instead of flipping through a book.
-   Problem 2: It's over-under. I spend too long wondering Wait? Does
    that commentary-prose text apply to the code fence above... or
    below? And what was that thing we did two steps early? How does this
    piece fit with that one? And what was that thing we did 4 window
    heights above?

One hypothesis I've got for why so many tutorials look like this is that
I've got a suspicion that the free-agent independent-thinker
how-the-hell-do-we-measure-or-find-great-or-at-least-semi-competent-coders
orientation of the capital-I Industry genartes a possibly-sub-conscious
attitude or inclination to use so-called tutorials to demonstrate that
Yes, indeed, I do know what the hell I'm talking about. See all these
fancy words? See how friendly my prose is? I'm hirable! Or the tutorials
are articles in blog, inclined to take up mass and imply substance for a
virtual personality. My bone to pick is not with the attitudes of
bloggers and tutorialists. By and large I'm convinced that these authors
are **generous**, **curious**, and **inventive** humans. My problem is
not so much with the prose, but with the material format of the things.
Call me a formalist.

My solution is simple: side-by instead of top-bottom. Two birds, one
stone. Page 1: the code; Page 2: the commentary. Left, meet right.
This'll let you render a full snippet of code on the left and inline the
comments at their relevant lines on the right. Prose-commentary can then
walk through the code, referencing any line you want along the way, and
I can see the whole and the parts at the same time.

It might look something like this (although I'm not going to spend the
time to set up a org-table for it and so it's just going to look like a
code-commenting sometimes-antipattern): ---

(funny (looking (+ shape shape))) ;; See how funny that thing is? What
it's going to do for us is mitiage the fluxatron...

(knock :as knockknock (:equals? (or password token handshake
eyecontact))) ;; Since the fluxatron relies on capacitation, and
capacitation makes noise which attracts rodents, we've got make sure the
rodents can actually get in through the flux-tubes.

---

The problem with my solve is that our tools aren't formatted for it. Web
pages don't particularly incline to horizontally-aware layouts - they're
built to stack. Our editors are too! Now that you mention it, so it our
whole... language. We have very good excuses for such chunky code-prose.
But we also have the tools to move beyond them.

[^1]: I'm sure for many the box is less than black for many. For yours
    truly, it was more opaque than not. Our project is - at this point -
    a one-off, and it's the first of it's kind in my experience.
