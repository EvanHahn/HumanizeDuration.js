Humanize Duration
=================
[![npm version](https://badge.fury.io/js/humanize-duration.svg)](https://npmjs.org/package/humanize-duration)
[![build status](https://travis-ci.org/EvanHahn/HumanizeDuration.js.svg?branch=master)](https://travis-ci.org/EvanHahn/HumanizeDuration.js)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

I have the time in milliseconds and I want it to become "30 minutes" or "3 days, 1 hour". Enter Humanize Duration!

**This library is actively maintained but no new features will be added.**

Basic usage
-----------

This package is available as *humanize-duration* on [npm](https://www.npmjs.com/package/humanize-duration) and Bower. You can also include the JavaScript file in the browser.

With `require` (like in Node or with common build systems):

```js
const humanizeDuration = require('humanize-duration')
humanizeDuration(12000) // '12 seconds'
```

With a `<script>` tag:

```html
<script src="humanize-duration.js"></script>
<script>
humanizeDuration(12000)
</script>
```

Usage
-----

By default, Humanize Duration will humanize down to the second, and will return a decimal for the smallest unit. It will humanize in English by default.

```js
humanizeDuration(3000)      // '3 seconds'
humanizeDuration(2250)      // '2.25 seconds'
humanizeDuration(97320000)  // '1 day, 3 hours, 2 minutes'
```

### Options

You can change the settings by passing options as the second argument:

**language**

Language for unit display (accepts an [ISO 639-1 code](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) from one of the [supported languages](#supported-languages)).

```js
humanizeDuration(3000, { language: 'es' })  // '3 segundos'
humanizeDuration(5000, { language: 'ko' })  // '5 초'
```

**delimiter**

String to display between the previous unit and the next value.

```js
humanizeDuration(22140000, { delimiter: ' and ' })  // '6 hours and 9 minutes'
humanizeDuration(22140000, { delimiter: '--' })     // '6 hours--9 minutes'
```

**spacer**

String to display between each value and unit.

```js
humanizeDuration(260040000, { spacer: ' whole ' })  // '3 whole days, 14 whole minutes'
humanizeDuration(260040000, { spacer: '' })         // '3days, 14minutes'
```

**largest**

Number representing the maximum number of units to display for the duration.

```js
humanizeDuration(1000000000000)                  // '31 years, 8 months, 1 week, 19 hours, 46 minutes, 40 seconds'
humanizeDuration(1000000000000, { largest: 2 })  // '31 years, 8 month'
```

**units**

Array of strings to define which units are used to display the duration (if needed). Can be one, or a combination of any, of the following: `['y', 'mo', 'w', 'd', 'h', 'm', 's', 'ms']`

```js
humanizeDuration(3600000, { units: ['h'] })       // '1 hour'
humanizeDuration(3600000, { units: ['m'] })       // '60 minutes'
humanizeDuration(3600000, { units: ['d', 'h'] })  // '1 hour'
```

**round**

Boolean value. Use `true` to [round](https://en.wikipedia.org/wiki/Rounding#Round_half_up) the smallest unit displayed (can be combined with `largest` and `units`).

```js
humanizeDuration(1200)                   // '1.2 seconds'
humanizeDuration(1200, { round: true })  // '1 second'
humanizeDuration(1600, { round: true })  // '2 seconds'
```

**decimal**

String to substitute for the decimal point in a decimal fraction.

```js
humanizeDuration(1200)                          // '1.2 seconds'
humanizeDuration(1200, { decimal: ' point ' })  // '1 point 2 seconds'
```

**conjunction**

String to include before the final unit. You can also set `serialComma` to `false` to eliminate the final comma.

```js
humanizeDuration(22140000, { conjunction: ' and ' })                      // '6 hours and 9 minutes'
humanizeDuration(22141000, { conjunction: ' and ' })                      // '6 hours, 9 minutes, and 1 second'
humanizeDuration(22140000, { conjunction: ' and ', serialComma: false })  // '6 hours and 9 minutes'
humanizeDuration(22141000, { conjunction: ' and ', serialComma: false })  // '6 hours, 9 minutes and 1 second'
```

**unitMeasures**

Customize the value used to calculate each unit of time.

```js
humanizeDuration(400)    // '0.4 seconds'
humanizeDuration(400, {  // '1 year, 1 month, 5 days'
  unitMeasures: {
    y: 365,
    mo: 30,
    w: 7,
    d: 1
  }
})
```

**Combined example**

```js
humanizeDuration(3602000, {
  language: 'es',
  round: true,
  spacer: ' glorioso ',
  units: ['m']
}) // '60 glorioso minutos'
```

### Humanizers

If you find yourself setting same options over and over again, you can create a *humanizer* that changes the defaults, which you can still override later.

```js
const spanishHumanizer = humanizeDuration.humanizer({
  language: 'es',
  units: ['y', 'mo', 'd']
})

spanishHumanizer(71177400000)  // '2 años, 3 meses, 2 días'
spanishHumanizer(71177400000, { units: ['d', 'h'] })  // '823 días, 19.5 horas'
```

You can also add new languages to humanizers. For example:

```js
const shortEnglishHumanizer = humanizeDuration.humanizer({
  language: 'shortEn',
  languages: {
    shortEn: {
      y: () => 'y',
      mo: () => 'mo',
      w: () => 'w',
      d: () => 'd',
      h: () => 'h',
      m: () => 'm',
      s: () => 's',
      ms: () => 'ms',
    }
  }
})

shortEnglishHumanizer(15600000)  // '4 h, 20 m'
```

You can also add languages after initializing:

```js
const humanizer = humanizeDuration.humanizer()

humanizer.languages.shortEn = {
  y: () => 'y',
  // ...
```

Internally, the main `humanizeDuration` function is just a wrapper around a humanizer.

Supported languages
-------------------

Humanize Duration supports the following languages:

| Language             | Code    |
|----------------------|---------|
| Arabic               | `ar`    |
| Bulgarian            | `bg`    |
| Catalan              | `ca`    |
| Chinese, simplified  | `zh_CN` |
| Chinese, traditional | `zh_TW` |
| Croatian             | `hr`    |
| Czech                | `cs`    |
| Danish               | `da`    |
| Dutch                | `nl`    |
| English              | `en`    |
| Farsi/Persian        | `fa`    |
| Finnish              | `fi`    |
| French               | `fr`    |
| German               | `de`    |
| Greek                | `gr`    |
| Hungarian            | `hu`    |
| Icelandic            | `is`    |
| Indonesian           | `id`    |
| Italian              | `it`    |
| Japanese             | `ja`    |
| Korean               | `ko`    |
| Lao                  | `lo`    |
| Lithuanian           | `lt`    |
| Malay                | `ms`    |
| Norwegian            | `no`    |
| Polish               | `pl`    |
| Portuguese           | `pt`    |
| Russian              | `ru`    |
| Slovak               | `sk`    |
| Spanish              | `es`    |
| Swedish              | `sv`    |
| Turkish              | `tr`    |
| Ukrainian            | `uk`    |
| Urdu                 | `ur`    |
| Vietnamese           | `vi`    |

For a list of supported languages, you can use the `getSupportedLanguages` function.

```js
humanizeDuration.getSupportedLanguages()
// ['ar', 'bg', 'ca', 'cs', da', 'de', ...]
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
* [Manh Tuan](https://github.com/J2TeaM) for Vietnamese support
* [Leonard Lee](https://github.com/sheeeng) for Indonesian & Malay support
* [Jesse Jackson](https://github.com/jsejcksn) for documentation help
* [Óli Tómas Freysson](https://github.com/olitomas) for Icelandic support
* [Saeed Ganji](https://github.com/shahabganji) for Farsi/Persian support
* [Caner Elci](https://github.com/canerelci) for Bulgarian support
* [Matej Kolesár](https://github.com/rasel-sk) for Slovak support
* [Abdul Jalil](https://github.com/abduljalilm94) for Urdu support
* Malikoun for Lao support

Licensed under the permissive [Unlicense](https://unlicense.org/). Enjoy!

Related modules
---------------

* [pretty-ms](https://github.com/sindresorhus/pretty-ms)
* [angularjs-humanize-duration](https://github.com/sebastianhaas/angularjs-humanize-duration)
* [millisec](https://github.com/sungwoncho/millisec)
* [HumanizeDuration.ts](https://github.com/Nightapes/HumanizeDuration.ts), a TypeScript version of this module
* [aurelia-time](https://github.com/shahabganji/aurelia-time)

