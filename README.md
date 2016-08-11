#PlutoRd
[![Build Status](https://api.travis-ci.org/cantide5ga/pluto-rd.svg?branch=master)](https://travis-ci.org/cantide5ga/pluto-rd)

  1. [Demo](#demo)
  1. [Usage](#usage)
    1. [Connectors](#connectors)
        1. [Entries](#entries)
        1. [Keywords](#keywords)
    1. [JSX](#jsx)
    1. [Styling](#styling)
    1. [Listeners](#listeners)
  1. [Design Considerations](#design-considerations)
    1. [Landing and Context Reset](#landing-and-context-reset)
  1. [Meta](#meta)  
  
##Demo
https://cantide5ga.github.io/pluto-rd/demo.html

Uses plain js, a Browserified bundle, and connects to static data.

## Usage

A convenience API renders each component and wires up the drivers as necessary.  See [Connectors](#connectors) for more info.  
```
plutoRd.blog(entryDriver, 2)
    .mountTo(document.getElementById('blog-mount'));

plutoRd.wordCloud(keywords, entryCount)
    .mountTo(document.getElementById('word-cloud-mount'));
    
plutoRd.home()
    .mountTo(document.getElementById('home-mount'));
```

Hit the ground running by using Typescript with its JSX support.  Both completely optional.  If you prefer vanilla Javascript, have a look at the reference folder used by the demo.  

### Connectors
Pluto Rd is isolated and very loosely coupled, having no opinions on the details of it's sources and connects to data via an aptly named **connector**.  Reasonably, however, Pluto Rd does have an expectation for how the data it uses is structured.

Lib consumers will implement a driver to return Entries and Keywords (call a database, pull from file system, static code, whatever!).  The driver would be responsible for mapping to the canonical structures.

The `PlutoRd` namespace exports a `Ds` connector singleton which exposes methods used to register drivers.  When Pluto Rd needs to do something, it executes the provided drivers.  
#### Entries
These are your blog/wiki entries, and Pluto Rd expects the structure:
```
Entry {
        title: string
        date: Date
        content: string
        keywords: string[]
}
```
The driver for fetching entries takes a function that returns an array of entries.  It has the following signature:
```
/**
* Registers a callback to be executed on click of keyword.
* @param {Ds~queryFn} queryFn - The callback to execute on keyword click. 
*/
registerEntryDriver(queryFn: (keyword: string, offset: number, count: number) => Entry[]): void

/**
* @function Ds~queryFn
* @param {string} offset - Passed in arg for the clicked Word Cloud handle 
* @param {number} offset - Passed in arg for the current result page
* @param {number} count - Passed in arg for the maxPerPage amount
* @return Entry[]
*/
```
#### Keywords
These are the primitive objects used by the Word Cloud to present tag information and interact with fetching relevant entries.  The expected structure:
```
Keyword {
        handle: string
        count: number
        lastTagged: Date
        hits: number
}
```
The signature for the driver to initialize the Word Cloud:
```
/**
* Registers a callback to be executed on click of keyword.
* @param {Keyword[]} keywords - All keywords.
* @param {number} entryCount - The total number of entries.
* @return void 
*/
registerKeywordDriver(keywords: Keyword[], entryCount: number): void
```
###JSX
PlutoRd has three reusable decoupled React components:
* The `WordCloud` presents all available tags(keywords) and allows for decoration based on a variety of attributes.
* The `Blog` presents the articles associated to the current keyword in context.
* The `Home` component allows for the reset and clearing of the current keyword in context.

Using JSX makes this very easy.

html:
```
<body>
	<h1>My Blog</h1>

	<div id="word-cloud-mount"></div>
	<div id="home-mount"></div>
	<div id="blog-mount"></div>
</body>
```

ts:
```
import {WordCloud, Home, Blog} from 'pluto-rd';

ReactDom.render(<WordCloud />, document.getElementById('word-cloud-mount'));
ReactDom.render(<Home />, document.getElementById('home-mount'))
ReactDom.render(<Blog maxPerPage="5" />, document.getElementById('blog-mount'))
```

###Styling
You may notice that a bare minimum functionally working Blog has no styling and looks terrible ([or may be exactly what you want](http://motherfuckingwebsite.com/)).  Again, Pluto Rd has no opinions on this.  Use the aptly named selectors to get that perfect juxtaposition with the rest of your site:

*Blog selectors*

selector | description
--- | ---
`#plrd-blog-entries` | The blog component container
`.plrd-entry` | A single entry
`.plrd-entry-title` | | 
`.plrd-entry-date` | | 
`.plrd-entry-content` | | 
`.plrd-tag-list` | The tag list container
`.plrd-tag` | A single tag
`.plrd-paginator` | The paginator container
`.plrd-page-number` | |
`.plrd-curr-page` | Current page number in the paginator
`.plrd-prev` | Paginator 'previous'
`.plrd-next` | Paginator 'next'


*Word Cloud*

selector | description
--- | ---
`#plrd-word-cloud` | The word cloud component container
`.plrd-word-cloud-keyword` | A normal keyword in the cloud
`.plrd-popular-keyword` | Indicates the top 5 most clicked keywords
`.plrd-keyword-highlighted` | Keyword in current context


*Other*

selector | description
---|---
`.plrd-home`|

###Listeners
When a keyword is clicked, a custom callback can be invoked per keyword.  The `PlutoRd` namespace also exports a `Listener`, allowing for two configurable listeners:
```
/**
* Sets a callback to be executed per keyword.
* @param {string} keyword - The keyword handle key that triggers the callback.
* @param {function()} fn - The callback to execute when keyword is clicked. 
*/
onKeyword(keyword: string, fn: () => void): void

/**
* Sets a callback to be executed when a selected keyword has no associated callback
* @param {function()} fn - The callback to execute when all other keywords are clicked. 
*/
onKeywordElse(fn: () => void): void
```

##Design Considerations
###Landing and Context Reset
Be sure to make considerations in your Entry Driver implementation for the initial loading of the Blog component and when the Home component (if used) is invoked.  A practical practice for both is to query for all entries, limiting the processing with the provided paging arguments `offset` and `count`.

##Meta
Fail-fast tests using npm scripts are broken up in the following order.

1. Unit: relies a lot on [Jasmine](http://jasmine.github.io/) spies and [flux-test-rig](https://www.npmjs.com/package/flux-test-rig) to verify and invoke [Flux](https://facebook.github.io/flux/) Store operations
2. Integration: relies less on [Jasmine](http://jasmine.github.io/) spies and more on [flux-test-rig](https://www.npmjs.com/package/flux-test-rig) to test the application's use of the [Flux](https://facebook.github.io/flux/) unidirectional data flow
3. Functional: verifies the high-level acceptance criteria by simulating components using [Enzyme](http://airbnb.io/enzyme/). 