Humanize Duration
=================

[![npm version](https://badge.fury.io/js/humanize-duration.svg)](https://npmjs.org/package/humanize-duration)
[![build status](https://travis-ci.org/EvanHahn/HumanizeDuration.js.svg?branch=master)](https://travis-ci.org/EvanHahn/HumanizeDuration.js)

I have the time in milliseconds and I want it to become "30 minutes" or "3 days, 1 hour". Enter Humanize Duration!

Basic usage
-----------

This package is available as *humanize-duration* in Node and Bower. You can also include the JavaScript in the browser.

In the browser:

```html
<script src="humanize-duration.js"></script>
<script>
humanizeDuration(12000);
</script>
```

In Node or Browserify:

```js
var humanizeDuration = require("humanize-duration");
humanizeDuration(12000);
```

Usage
-----

By default, Humanize Duration will humanize down to the second, and will return a decimal for the smallest unit. It will humanize in English by default.

```js
humanizeDuration(3000)      // "3 seconds"
humanizeDuration(2015)      // "2.25 seconds"
humanizeDuration(97320000)  // "1 day, 3 hours, 2 minutes"
```

You can change the settings by passing options as the second argument:

```js
humanizeDuration(3000, { language: "es" })  // "3 segundos"
humanizeDuration(5000, { language: "ko" })  // "5 초"

humanizeDuration(22140000, { delimiter: " and " })  // "6 hours and 9 minutes"
humanizeDuration(22140000, { delimiter: "--" })     // "6 hours--9 minutes"

humanizeDuration(3600000, { units: ["hours"] })          // 1 hour
humanizeDuration(3600000, { units: ["days", "hours"] })  // 1 hour
humanizeDuration(3600000, { units: ["minutes"] })        // 60 minutes

humanizeDuration(3600000, {
  language: "es",
  units: ["minutes"]
})
// 60 minutos
```

### Humanizers

If you find yourself setting same options over and over again, you can create a *humanizer* that changes the defaults, which you can still override later.

```js
var spanishHumanizer = humanizeDuration.humanizer({
  language: "es",
  units: ["years", "months", "days"]
});

spanishHumanizer(71177400000)  // "2 años, 3 meses, 2 días"
spanishHumanizer(71177400000, { units: ["days", "hours"] })  // "823 días, 19.5 horas"
```

Internally, the main `humanizeDuration` function is just a wrapper around a humanizer.

Supported languages
--------------------

Humanize Duration supports the following languages:

* Catalan (ca)
* Chinese, simplified (zh-CN)
* Chinese, traditional (zh-TW)
* Danish (da)
* Dutch (nl)
* English (en)
* French (fr)
* German (de)
* Korean (ko)
* Norwegian (nob)
* Polish (pl)
* Portuguese (pt)
* Russian (ru)
* Spanish (es)

Credits
-------

Lovingly made by [Evan Hahn](http://evanhahn.com/) with language support by [Martin Prins](https://github.com/magarcia). Thanks to [Filipi Siqueira](https://github.com/filipi777) for Portuguese support, [Peter Rekdal Sunde](https://github.com/peters) for Norwegian support, [Michał Janiec](https://github.com/mjjaniec) for Polish support, and [Eileen Li](https://github.com/eileen3) for Chinese support.

Licensed under the WTFPL, so you can do whatever you want. Enjoy!
