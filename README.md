Humanize Duration
=================

I have the time in milliseconds and I want it to become "30 minutes" or "3 days, 1 hour".

    humanizeDuration(1)            // "1 millisecond"
    humanizeDuration(3000);        // "3 seconds"
    humanizeDuration(2012);        // "2 seconds, 12 milliseconds"
    humanizeDuration(97320000);    // "1 day, 3 hours, 2 minutes"
    humanizeDuration(3000, "es");  // "3 seconds"

    humanizeDuration.language = "fr";  // change default language to French
    humanizeDuration(3000);            // "3 secondes"

In the browser:

    <script src="humanize-duration.js"></script>
    <script>
    humanizeDuration(12000);
    </script>

In the Node (after installing [the package](https://npmjs.org/package/humanize-duration)):

    var humanizeDuration = require("humanize-duration");
    humanizeDuration(12000);

Currently supported languages:

* English (en)
* Spanish (es)
* French (fr)
* Catalan (ca)

Lovingly made by [Evan Hahn](http://evanhahn.com/) with language support by [Martin Prins](https://github.com/magarcia). Enjoy!
