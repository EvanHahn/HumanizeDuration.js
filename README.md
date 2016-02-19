Humanize Duration
=================
[![npm version](https://badge.fury.io/js/humanize-duration.svg)](https://npmjs.org/package/humanize-duration)
[![build status](https://travis-ci.org/EvanHahn/HumanizeDuration.js.svg?branch=master)](https://travis-ci.org/EvanHahn/HumanizeDuration.js)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

I have the time in milliseconds and I want it to become "30 minutes" or "3 days, 1 hour". Enter Humanize Duration!

Basic usage
-----------

This package is available as *humanize-duration* on [npm](https://www.npmjs.com/package/humanize-duration) and Bower. You can also include the JavaScript file in the browser.

In the browser:

```html
<script src="humanize-duration.js"></script>
<script>
humanizeDuration(12000)
</script>
```

In Node (or Browserify or Webpack or anywhere with CommonJS):

```js
var humanizeDuration = require('humanize-duration')
humanizeDuration(12000)
```

Usage
-----

By default, Humanize Duration will humanize down to the second, and will return a decimal for the smallest unit. It will humanize in English by default.

```js
humanizeDuration(3000)      // '3 seconds'
humanizeDuration(2015)      // '2.25 seconds'
humanizeDuration(97320000)  // '1 day, 3 hours, 2 minutes'
```

You can change the settings by passing options as the second argument:

```js
humanizeDuration(3000, { language: 'es' })  // '3 segundos'
humanizeDuration(5000, { language: 'ko' })  // '5 초'

humanizeDuration(22140000, { delimiter: ' and ' })  // '6 hours and 9 minutes'
humanizeDuration(22140000, { delimiter: '--' })     // '6 hours--9 minutes'

humanizeDuration(260040000, { spacer: ' whole ' })  // '3 whole days, 14 whole minutes'
humanizeDuration(260040000, { spacer: '' })         // '3days, 14minutes'

humanizeDuration(1000000000000)                  // '31 years, 8 months, 1 week, 19 hours, 46 minutes, 40 seconds'
humanizeDuration(1000000000000, { largest: 2 })  // '31 years, 8 month'

humanizeDuration(3600000, { units: ['h'] })       // '1 hour'
humanizeDuration(3600000, { units: ['m'] })       // '60 minutes'
humanizeDuration(3600000, { units: ['d', 'h'] })  // '1 hour'

humanizeDuration(1200)                   // '1.2 seconds'
humanizeDuration(1200, { round: true })  // '1 second'
humanizeDuration(1600, { round: true })  // '2 seconds'

humanizeDuration(1200)                          // '1.2 seconds'
humanizeDuration(1200, { decimal: ' point ' })  // '1 point 2 seconds'

humanizeDuration(400)    // '0.4 seconds'
humanizeDuration(400, {  // '1 year, 1 month, 5 days'
  unitMeasures: {
    y: 365,
    mo: 30,
    w: 7,
    d: 1
  }
})

humanizeDuration(3600000, {
  language: 'es',
  units: ['m']
})
// '60 minutos'
```

### Humanizers

If you find yourself setting same options over and over again, you can create a *humanizer* that changes the defaults, which you can still override later.

```js
var spanishHumanizer = humanizeDuration.humanizer({
  language: 'es',
  units: ['y', 'mo', 'd']
})

spanishHumanizer(71177400000)  // '2 años, 3 meses, 2 días'
spanishHumanizer(71177400000, { units: ['d', 'h'] })  // '823 días, 19.5 horas'
```

You can also add new languages to humanizers. For example:

```js
var shortEnglishHumanizer = humanizeDuration.humanizer({
  language: 'shortEn',
  languages: {
    shortEn: {
      y: function() { return 'y'; },
      mo: function() { return 'mo'; },
      w: function() { return 'w'; },
      d: function() { return 'd'; },
      h: function() { return 'h'; },
      m: function() { return 'm'; },
      s: function() { return 's'; },
      ms: function() { return 'ms'; },
    }
  }
})

shortEnglishHumanizer(15600000)  // '4 h, 20 m'
```

You can also add languages after initializing:

```js
var humanizer = humanizeDuration.humanizer()

humanizer.languages.shortEn = {
  y: function(c) { return c + 'y'; },
  // ...
```

Internally, the main `humanizeDuration` function is just a wrapper around a humanizer.

Supported languages
-------------------

Humanize Duration supports the following languages:

| Language             | Code    |
|----------------------|---------|
| Arabic               | `ar`    |
| Catalan              | `ca`    |
| Chinese, simplified  | `zh_CN` |
| Chinese, traditional | `zh_TW` |
| Czech                | `cs`    |
| Danish               | `da`    |
| Dutch                | `nl`    |
| English              | `en`    |
| Finnish              | `fi`    |
| French               | `fr`    |
| German               | `de`    |
| Greek                | `gr`    |
| Hungarian            | `hu`    |
| Italian              | `it`    |
| Japanese             | `ja`    |
| Korean               | `ko`    |
| Lithuanian           | `lt`    |
| Norwegian            | `no`    |
| Polish               | `pl`    |
| Portuguese           | `pt`    |
| Russian              | `ru`    |
| Spanish              | `es`    |
| Swedish              | `sv`    |
| Turkish              | `tr`    |
| Ukrainian            | `uk`    |

For a list of supported languages, you can use the `getSupportedLanguages` function.

```js
humanizeDuration.getSupportedLanguages()
// ['ar', 'ca', 'da', 'de' ...]
```

This function won't return any new languages you define; it will only return the defaults supported by the library.

Credits
-------

Lovingly made by [Evan Hahn](http://evanhahn.com/) with help from:

* [Martin Prins](https://github.com/magarcia) for language support
* [Filipi Siqueira](https://github.com/filipi777) for Portuguese support
* [Peter Rekdal Sunde](https://github.com/peters) for Norwegian support
* [Michał Janiec](https://github.com/mjjaniec) for Polish support
* [Eileen Li](https://github.com/eileen3) for Chinese support
* [Tommy Brunn](https://github.com/Nevon) for Swedish support
* [Giovanni Pellerano](https://github.com/evilaliv3) for Italian support
* [Rahma Sghaier](https://twitter.com/sghaierrahma) for Arabic support
* [Evgenios Kastanias](https://github.com/evgenios) for Greek support
* [Oleksii Mylotskyi](https://github.com/spalax) for Ukrainian support
* [Patrik Simek](https://github.com/patriksimek) for Czech support
* [Toni Helminen](https://github.com/tonihelminen) for Finnish support
* [Vidmantas Drasutis](https://github.com/Drasius2) for Lithuanian support

Licensed under the permissive [Unlicense](http://unlicense.org/). Enjoy!

Related modules
---------------

* [angularjs-humanize-duration](https://github.com/sebastianhaas/angularjs-humanize-duration)
* [millisec](https://github.com/sungwoncho/millisec)
