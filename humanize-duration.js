/*

HumanizeDuration.js
http://git.io/j0HgmQ

*/

;(function() {

	// The main function.
	function humanizeDuration(ms, language) {

		// Turn Number objects into primitives.
		if (ms instanceof Number)
			ms = ms.valueOf();

		// Humanizing zero, I see.
		if (ms === 0)
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
					return render(mightBeHalfUnit / 2, unit.name, language);
			}

			// What's the number of full units we can fit?
			unitCount = Math.floor(ms / unit.milliseconds);

			// Add the string.
			if (unitCount)
				result.push(render(unitCount, unit.name, language));

			// Remove what we just figured out.
			ms -= unitCount * unit.milliseconds;

		}

		// All done! Turn the array into a string.
		return result.join(", ");

	}

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
	// render(12, "hour") == "12 hours"
	// render(2, "hour", "es") == "2 horas"
	var render = function(count, word, language) {
		var dictionary = humanizeDuration.LANGUAGES[language || humanizeDuration.language];
		return count + " " + dictionary[word](count);
	};
	
	// Helper function for Polish language
	var getPolishForm = function(c) {
		if (c === 1) {
			return 0;
		} else if (Math.floor(c) !== c) {
			return 1;
		} else if (2 <= c % 10 && c % 10 <= 4 && !(10 < c % 100 && c % 100 < 20)) {
			return 2;
		} else {
			return 3;
		}
	};	

	// What are the languages?
	humanizeDuration.LANGUAGES = {
		en: {
			year: function(c) { return "year" + ((c !== 1) ? "s" : ""); },
			month: function(c) { return "month" + ((c !== 1) ? "s" : ""); },
			week: function(c) { return "week" + ((c !== 1) ? "s" : ""); },
			day: function(c) { return "day" + ((c !== 1) ? "s" : ""); },
			hour: function(c) { return "hour" + ((c !== 1) ? "s" : ""); },
			minute: function(c) { return "minute" + ((c !== 1) ? "s" : ""); },
			second: function(c) { return "second" + ((c !== 1) ? "s" : ""); },
			millisecond: function(c) { return "millisecond" + ((c !== 1) ? "s" : ""); }
		},
		ca: {
			year: function(c) { return "any" + ((c !== 1) ? "s" : ""); },
			month: function(c) { return "mes" + ((c !== 1) ? "os" : ""); },
			week: function(c) { return "setman" + ((c !== 1) ? "es" :"a"); },
			day: function(c) { return "di" + ((c !== 1) ? "es" :"a"); },
			hour: function(c) { return "hor" + ((c !== 1) ? "es" :"a"); },
			minute: function(c) { return "minut" + ((c !== 1) ? "s" : ""); },
			second: function(c) { return "segon" + ((c !== 1) ? "s" : ""); },
			millisecond: function(c) { return "milisegon" + ((c !== 1) ? "s" : "" ); }
		},
		es: {
			year: function(c) { return "año" + ((c !== 1) ? "s" : ""); },
			month: function(c) { return "mes" + ((c !== 1) ? "es" : ""); },
			week: function(c) { return "semana" + ((c !== 1) ? "s" : ""); },
			day: function(c) { return "día" + ((c !== 1) ? "s" : ""); },
			hour: function(c) { return "hora" + ((c !== 1) ? "s" : ""); },
			minute: function(c) { return "minuto" + ((c !== 1) ? "s" : ""); },
			second: function(c) { return "segundo" + ((c !== 1) ? "s" : ""); },
			millisecond: function(c) { return "milisegundo" + ((c !== 1) ? "s" : "" ); }
		},
		fr: {
			year: function(c) { return "an" + ((c !== 1) ? "s" : ""); },
			month: function() { return "mois"; },
			week: function(c) { return "semaine" + ((c !== 1) ? "s" : ""); },
			day: function(c) { return "jour" + ((c !== 1) ? "s" : ""); },
			hour: function(c) { return "heure" + ((c !== 1) ? "s" : ""); },
			minute: function(c) { return "minute" + ((c !== 1) ? "s" : ""); },
			second: function(c) { return "seconde" + ((c !== 1) ? "s" : ""); },
			millisecond: function(c) { return "milliseconde" + ((c !== 1) ? "s" : ""); }
		},
		pt: {
			year: function(c) { return "ano" + ((c !== 1) ? "s" : ""); },
			month: function(c) { return "mês" + ((c !== 1) ? "es" : ""); },
			week: function(c) { return "semana" + ((c !== 1) ? "s" : ""); },
			day: function(c) { return "dia" + ((c !== 1) ? "s" : ""); },
			hour: function(c) { return "hora" + ((c !== 1) ? "s" : ""); },
			minute: function(c) { return "minuto" + ((c !== 1) ? "s" : ""); },
			second: function(c) { return "segundo" + ((c !== 1) ? "s" : ""); },
			millisecond: function(c) { return "milesegundo" + ((c !== 1) ? "s" : ""); }
		},
		ko: {
			year: function() { return "년"; },
			month: function() { return "개월"; },
			week: function() { return "주일"; },
			day: function() { return "일"; },
			hour: function() { return "시간"; },
			minute: function() { return "분"; },
			second: function() { return "초"; },
			millisecond: function() { return "밀리 초"; }
		},
		nob: {
			year: function() { return "år"; },
			month: function(c) { return "måned" + ((c !== 1) ? "er" : ""); },
			week: function(c) { return "uke" + ((c !== 1) ? "r" : ""); },
			day: function(c) { return "dag" + ((c !== 1) ? "er" : ""); },
			hour: function(c) { return "time" + ((c !== 1) ? "r" : ""); },
			minute: function(c) { return "minutt" + ((c !== 1) ? "er" : ""); },
			second: function(c) { return "sekund" + ((c !== 1) ? "er" : ""); },
			millisecond: function(c) { return "millisekund" + ((c !== 1) ? "er" : ""); }
		},
		de: {
			year: function(c) { return "jahr" + ((c !== 1) ? "e" : ""); },
			month: function(c) { return "monat" + ((c !== 1) ? "e" : ""); },
			week: function(c) { return "woche" + ((c !== 1) ? "n" : ""); },
			day: function(c) { return "tag" + ((c !== 1) ? "e" : ""); },
			hour: function(c) { return "stunde" + ((c !== 1) ? "n" : ""); },
			minute: function(c) { return "minute" + ((c !== 1) ? "n" : ""); },
			second: function(c) { return "sekunde" + ((c !== 1) ? "n" : ""); },
			millisecond: function(c) { return "millisekunde" + ((c !== 1) ? "n" : ""); }
		},		
		pl: {			
			year: function(c) { return ["rok", "roku", "lata", "lat"][getPolishForm(c)]; },
			month: function(c) { return ["miesiąc", "miesiąca", "miesiące", "miesięcy"][getPolishForm(c)]; },
			week: function(c) { return ["tydzień", "tygodnia", "tygodnie", "tygodni"][getPolishForm(c)]; },
			day: function(c) { return ["dzień", "dnia", "dni", "dni"][getPolishForm(c)]; },
			hour: function(c) { return ["godzina", "godziny", "godziny", "godzin"][getPolishForm(c)]; },
			minute: function(c) { return ["minuta", "minuty", "minuty", "minut"][getPolishForm(c)]; },
			second: function(c) { return ["sekunda", "sekundy", "sekundy", "sekund"][getPolishForm(c)]; },
			millisecond: function(c) { return ["milisekunda", "milisekundy", "milisekundy", "milisekund"][getPolishForm(c)]; }
		}
	};

	// What's the default language?
	humanizeDuration.language = "en";

	// Export this baby.
	if ((typeof module !== "undefined") && (module.exports))
		module.exports = humanizeDuration;
	else
		this.humanizeDuration = humanizeDuration;

})();
