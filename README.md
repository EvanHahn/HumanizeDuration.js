Humanize Duration
=================

I have the time in milliseconds and I want it to become "30 minutes" or "3 days, 1 hour".

    humanizeDuration(1)         // "1 millisecond"
    humanizeDuration(3000)      // "3 seconds"
    humanizeDuration(2012)      // "2 seconds, 12 milliseconds"
    humanizeDuration(97320000)  // "1 day, 3 hours, 2 minutes"

    humanizeDuration(3000, "es")  // "3 segundos"

    humanizeDuration.language = "fr"  // change default language to French
    humanizeDuration(3000)            // "3 secondes"
    humanizeDuration(5000, "ko")      // "5 초"

Sometimes may get quite long results

	humanizeDuration(465472457557)            // "14 years, 8 months, 4 weeks, 2 days, 9 hours, 54 minutes, 17 seconds, 557 milliseconds"
	
	humanizeDuration.maxUnits = 3             // set default max length in units
	humanizeDuration(465472000000)            // "14 years, 8 months, 4 weeks"

You may do not like weeks so you can also
	
	humanizeDuration(9531000000)			// "3 months, 2 weeks, 5 days"
	humanizeDuration.useWeeks = false;
	humanizeDuration(9531000000)			// "3 months, 19 days"
	
	
	

In the browser:

    <script src="humanize-duration.js"></script>
    <script>
    humanizeDuration(12000);
    </script>

In Node or Browserify (after installing [the package](https://npmjs.org/package/humanize-duration)):

    var humanizeDuration = require("humanize-duration");
    humanizeDuration(12000);

Supported languages:

* Catalan (ca)
* English (en)
* French (fr)
* German (de)
* Korean (ko)
* Norwegian (nob)
* Polish (pl)
* Portuguese (pt)
* Spanish (es)

Lovingly made by [Evan Hahn](http://evanhahn.com/) with language support by [Martin Prins](https://github.com/magarcia). Thanks to [Filipi Siqueira](https://github.com/filipi777) for Portuguese support and to [Peter Rekdal Sunde](Peter Rekdal Sunde) for Norwegian support.

Enjoy!
