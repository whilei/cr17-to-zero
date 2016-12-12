# Jay Martin Clojure Remote Interview

## How did you get into Clojure?

Datomic, Functional Programming, and Rich Hickey's novel ideas attracted me to Clojure. I want to build commercial and open source software systems that improve people's lives. However, I don't want the systems I create to make my own life miserable along the way. I worked in IT for a large corporation for nearly a decade. That experience has deeply influenced my research into more reliable ways to build software systems.

I first became disillusioned with object oriented programming (OOP) when my neatly organized object hierarchies needed to be functionally flattened to satisfy the performance needs of the relational database in which they were persisted.

Undeterred, I doubled-down on OOP by reading the book, [Object Thinking](https://www.goodreads.com/book/show/43940.Object_Thinking), hoping that by changing my thinking about objects I would unlock their power. The author's affinity for Smalltalk was contagious, but I was leery of the fact that a crucial pattern he was recommending (recursive self-evaluating rules) were reportedly developed, yet unpublished. Even still, perhaps I could use an object database, such as [GemStone](https://gemtalksystems.com/products/gs64/), to persist my objects without *Frankensteining* them beyond recognition? At least that would be a win!

My Smalltalk research led me to the work of [Trygve Reenskaug](https://en.wikipedia.org/wiki/Trygve_Reenskaug), the progenitor of the [MVC pattern](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller). He was working on a new approach to OOP, called [DCI](https://en.wikipedia.org/wiki/Data,_context_and_interaction). DCI looked like a promising way of supporting *object thinking* for the programmer, so I started reading more about it. 

DCI augments the MVC pattern, as they both complement each other in a system, but by this time in my learning journey, I had become frustrated with the MVC pattern. We have MVC on the server-side and MVC on the client-side. How do these models relate to each other, the mental model of the user, and the mental model of the programmer? When this thing over here changes in the user interface, what changes will that make to the model, and which changes will that model change trigger?

I for one, was confused by the whole darn mess!

I began to suspect that DCI was an additional layer of complexity on top of MVC. I was also disappointed by the sparse number of example applications that existed at the time. In a video about DCI,Trygve Reenskaug said that in his early days of working on large systems at the shipping yard, he and his colleagues were able to easily perform code reviews for each other, and thus build reliable systems, because they were using Functional Programming. He was trying to revive that experience through DCI.

Meanwhile, in my search for a better database, I found Datomic. Ironically, the blog article was quite negative, but after doing my own homework I was convinced that Datomic's universal data schema and separation of concerns was exactly what I was looking for.

This led me to Clojure. Once I saw Rich Hickey's talk [Simple Made Easy](https://www.infoq.com/presentations/Simple-Made-Easy), I felt the unmanageable weight of complexity drop away. His ideas just made sense. Even though I didn't understand everything he was saying, I knew I was in the right place. Around that time, I made a solemn decision, "Clojure or bust!"

I mean Eric, really, I could be perfectly happy being a park ranger or a tennis coach, or whatever. Anything, but an unhappy programmer, or worse, a failed entrepreneur! I'm risking my own money which makes me very keen on Rich Hickey's near constant focus on the pragmatic business value of Clojure and Datomic.

I share all this to help you understand why I'm so excited about Clojure and Datomic, and to explain my lack of interest in the many new languages and frameworks which rightfully garner much attention among programmers these days, e.g. Elixir, Red, Tulip etc. I've made a commitment to myself to master the fundamentals of Clojure and Datomic. I intend to push these technologies to their absolute limit before introducing other technologies into the mix.

## What is your talk about?

The talk is called "The Value of Learning". It's about the science of learning and teaching. Am I the best learner I can be? The best teacher? Are we?

Clojure already has a rich culture of learning, teaching and mentorship. The pace of fresh ideas pouring out of this community is breathtaking. The people are super friendly, while not afraid to question the status quo in the software industry. Why don't we direct a portion of our collective energy into improving the status quo of adult education?

Clojure, according to Rich Hickey's talk *Simple Made Easy*, has a higher learning curve than other languages and approaches. Awesome! Constraints breed innovation and creativity.

What innovations in the sciences around learning and teaching will this community discover?

## Who is your talk for?

Are you curious to learn more about the science of learning? Do you think there's still room for improvement in how we teach computer science and programming?

Then this talk is for you!

While we're talking about who's who, I want to say that I'm in awe of the programming community at large, and the creative folks I've met through Clojure. I believe this is just the group to take on the challenge of improving the state of affairs in technical education. We comprise diverse disciplines and interests, but we all share a common need -- to learn!

## What do you hope people will take away from the talk?

A fresh awareness of the role learning plays in our daily lives, and a desire to get better at learning and teaching. What if every person who hears this talk is moved to dedicate one hour per week toward the sciences around learning and teaching? How much more productive would each person be in one year? Two? Ten? How much better would each of us be at teaching?

How many innovations will be a direct result of this focused effort?

How many extra people would be attracted into Clojure based primarily on these learning innovations?

## What concepts do you recommend people be familiar with to maximize their experience with the talk?

No special requirements. This is a keynote talk. It's designed to feel conversational, and we're currently planning to follow the talk with a group discussion where you can get involved by sharing your own reactions, ideas and experiences.

## What resources are available for people who want to study up before the talk?

I've enjoyed the [Learning How To Learn](https://www.coursera.org/learn/learning-how-to-learn) course.

Also of interest:

Video: [Flow, the secret to happiness](https://www.ted.com/talks/mihaly_csikszentmihalyi_on_flow)

Book: [Deep Work](https://www.goodreads.com/book/show/25744928-deep-work)

## Where can people follow you online?

Twitter: [@webappzero](https://twitter.com/webappzero)

Blog: [webappzero.com](http://webappzero.com)

[Youtube](https://www.youtube.com/channel/UC2rHyGvXk17dGxK55uoDeFw)

## Are there any projects you'd like people to be aware of? How can people help out?

I'll be doing a major rewrite of the talk in the next couple weeks. Presently, the outline of the talk is mostly brainstorming gibberish, but you can keep an eye on the [talk's github repo](https://github.com/webappzero/cr17-to-zero), where you can get involved to any degree you like.

I'm very interested to hear any stories people have about struggling to learn to program. What has your journey been like? What were the biggest challenges?

## Where do you see the state of Clojure in 10 years?

I plan to use Clojure for at least the next 10-15 years in my business endeavors.

I think ClojureScript has great potential to break through in the land of JavaScript.

I see more and more companies realizing the pragmatic benefits that Clojure provides.

I hope Datomic will be a smashing commercial success, and will continue to innovate around the issues of data persistence.

I see a big challenge in front of us -- getting over the hump of resistance of *learning a different way* for people who've invested heavily in their present way of writing software systems. **Clojure's fate, I contend, is coupled to our response to this great challenge**.

## If Clojure were an animal, what animal would it be?

Obviously, a [cuttlefish](https://en.wikipedia.org/wiki/Cuttlefish)!
