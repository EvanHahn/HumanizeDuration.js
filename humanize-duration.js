/*

HumanizeDuration.js

Lovingly made by Evan Hahn. Unlicensed.

*/

;(function(global, undefined) {

	// Start by defining the units and how many ms is in each.
	var UNITS = [
		{ name: "year", milliseconds: 31557600000 },
		{ name: "month", milliseconds: 2629800000 },
		{ name: "week", milliseconds: 604800000 },
		{ name: "day", milliseconds: 86400000 },
		{ name: "hour", milliseconds: 3600000 },
		{ name: "minute", milliseconds: 60000 },
		{ name: "second", milliseconds: 1000 },
		{ name: "millisecond", milliseconds: 1 }
	];

	// A utility function for creating the strings.
	// render(1, "minute") == "1 minute"
	// render(12, "hours") == "12 hours"
	var render = function(count, word) {
		return count + " " + humanizeDuration.lang()[word](count);
	};

	// The moment (ha) you've all been waiting for: the main function.
	var humanizeDuration = function(ms) {

		// Humanizing zero, I see.
		if (ms == 0)
			return "0";

		// We'll put everything in an array and turn that into a string at the end.
		var result = [];

		// Start at the top and keep removing units, bit by bit.
		var unit, unitCount, mightBeHalfUnit;
		for (var i = 0, len = UNITS.length; (i < len) && (ms); i ++) {

			// Store the current unit.
			unit = UNITS[i];

			// If it's a half-unit interval, we're done.
			if (result.length === 0) {
				mightBeHalfUnit = (ms / unit.milliseconds) * 2;
				if (mightBeHalfUnit === Math.floor(mightBeHalfUnit))
					return render(mightBeHalfUnit / 2, unit.name);
			}

			// What's the number of full units we can fit?
			unitCount = Math.floor(ms / unit.milliseconds);

			// Add the string.
			if (unitCount)
				result.push(render(unitCount, unit.name));

			// Remove what we just figured out.
			ms -= unitCount * unit.milliseconds;

		}

		// All done! Turn the array into a string.
		return result.join(", ");

	};

	humanizeDuration.prototype._languages = {
		"en": {
			year: function (c) { return "year" + ((c !== 1) ? 's' :'');},
			month: function (c) { return "month" + ((c !== 1) ? 's' :'');},
			week: function (c) { return "week" + ((c !== 1) ? 's' :'');},
			day: function (c) { return "day" + ((c !== 1) ? 's' :'');},
			hour: function (c) { return "hour" + ((c !== 1) ? 's' :'');},
			minute: function (c) { return "minute" + ((c !== 1) ? 's' :'');},
			second: function (c) { return "second" + ((c !== 1) ? 's' :'');},
			millisecond: function (c) { return "millisecond" + ((c !== 1) ? 's' :'');},
		}
	}

	humanizeDuration.prototype._lang = humanizeDuration.prototype._languages["en"]

	humanizeDuration.lang = function (key, values) {
		if (!key) return humanizeDuration.prototype._lang;

		if (typeof values !== "undefined")
			humanizeDuration.prototype._languages[key] = values
		else
			humanizeDuration.prototype._lang = humanizeDuration.prototype._languages[key]
	}

	// Export this baby.
	if ((typeof module !== "undefined") && (module.exports))
		module.exports = humanizeDuration;
	else
		global.humanizeDuration = humanizeDuration;

})(this);
