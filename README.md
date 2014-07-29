Humanize Duration
=================

[![npm version](https://badge.fury.io/js/humanize-duration.svg)](https://npmjs.org/package/humanize-duration)
[![build status](https://travis-ci.org/EvanHahn/HumanizeDuration.js.svg?branch=master)](https://travis-ci.org/EvanHahn/HumanizeDuration.js)

I have the time in milliseconds and I want it to become "30 minutes" or "3 days, 1 hour". Enter Humanize Duration!

Usage
-----

To use it in the browser:

    <script src="humanize-duration.js"></script>
    <script>
    humanizeDuration(12000);
    </script>

To use in Node or Browserify (after installing [the package](https://npmjs.org/package/humanize-duration)):

    var humanizeDuration = require("humanize-duration");
    humanizeDuration(12000);

Also available for Bower as *humanize-duration*.

Here's some basic usage:

    humanizeDuration(3000)      // "3 seconds"
    humanizeDuration(2015)      // "2.25 seconds"
    humanizeDuration(97320000)  // "1 day, 3 hours, 2 minutes"

You can also change the settings:

    humanizeDuration(3000, { language: "es" })  // "3 segundos"
    humanizeDuration(5000, { language: "ko" })  // "5 초"

    humanizeDuration(22140000, { delimiter: " and " })  // "6 hours and 9 minutes"
    humanizeDuration(22140000, { delimiter: " " })      // "6 hours 9 minutes"

    humanizeDuration(3600000, { units: ["hours"] })          // 1 hour
    humanizeDuration(3600000, { units: ["days", "hours"] })  // 1 hour
    humanizeDuration(3600000, { units: ["minutes"] })        // 60 minutes

If you find yourself setting same options over and over again, you can create a humanizer that changes the defaults, which you can still override later.

    var humanizer = humanizeDuration.humanizer({
      language: "es",
      units: ["years", "months", "days"]
    });

    humanizer(71177400000)  // "2 años, 3 meses, 2 días"
    humanizer(71177400000, { units: ["days", "hours"] })  // "823 días, 19.5 horas"

Some edge cases:

    humanizeDuration(-5000)            // "5000 seconds", ignores negative numbers
    humanizeDuration(new Number(8910)) // works as normal

Supported languages
-------------------

Humanize Duration supports the following languages:

* Catalan (ca)
* Danish (da)
* English (en)
* French (fr)
* German (de)
* Korean (ko)
* Norwegian (nob)
* Polish (pl)
* Portuguese (pt)
* Spanish (es)
* Russian (ru)

Credits
-------

Lovingly made by [Evan Hahn](http://evanhahn.com/) with language support by [Martin Prins](https://github.com/magarcia). Thanks to [Filipi Siqueira](https://github.com/filipi777) for Portuguese support, [Peter Rekdal Sunde](https://github.com/peters) for Norwegian support, and [Michał Janiec](https://github.com/mjjaniec) for Polish support.

Licensed under the WTFPL, so you can do whatever you want.

Enjoy!
