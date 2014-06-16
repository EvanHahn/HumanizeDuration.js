Humanize Duration
=================

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

Here's some basic usage:

    humanizeDuration(1)         // "1 millisecond"
    humanizeDuration(3000)      // "3 seconds"
    humanizeDuration(2012)      // "2 seconds, 12 milliseconds"
    humanizeDuration(97320000)  // "1 day, 3 hours, 2 minutes"

You can also change the language:

    humanizeDuration(3000, "es")  // "3 segundos"

    humanizeDuration.language = "fr"  // change language to French
    humanizeDuration(3000)            // "3 secondes"
    humanizeDuration(5000, "ko")      // "5 초"
    humanizeDuration.language = "en"  // change language back to English

You can also get the components of the humanizization, using `componentsOf`:

    var components = humanizeDuration.componentsOf(97320000);
    // components.days == "1 day"
    // components.total.days == "1 day"
    // components.hours == "3 hours"
    // components.total.hours == "27 hours"
    // components.seconds == "0 seconds"
    // components.total.seconds == "97320 seconds"

Some edge cases:

    humanizeDuration(12.34) // "12.34 milliseconds"
    humanizeDuration(-567)  // "567 milliseconds", ignores negative numbers

    humanizeDuration(new Number(8910)) // works as normal

Supported languages
-------------------

Humanize Duration supports the following languages:

* Catalan (ca)
* English (en)
* French (fr)
* German (de)
* Korean (ko)
* Norwegian (nob)
* Polish (pl)
* Portuguese (pt)
* Spanish (es)

Credits
-------

Lovingly made by [Evan Hahn](http://evanhahn.com/) with language support by [Martin Prins](https://github.com/magarcia). Thanks to [Filipi Siqueira](https://github.com/filipi777) for Portuguese support, [Peter Rekdal Sunde](https://github.com/peters) for Norwegian support, and [Michał Janiec](https://github.com/mjjaniec) for Polish support.

Licensed under the WTFPL, so you can do whatever you want.

Enjoy!
