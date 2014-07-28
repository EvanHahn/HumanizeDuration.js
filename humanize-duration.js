/*

HumanizeDuration.js
http://git.io/j0HgmQ

*/

/* global console */

;(function() {

  function humanizeDuration(ms, passedOptions) {

    var options = {};
    extend(options, humanizeDuration.defaults, passedOptions || {});
    
    if (humanizeDuration.language) {
      warn("Setting the .language property is deprecated. Please use .defaults.language.");
      options.language = humanizeDuration.language;
    }
    if (isString(passedOptions)) {
      warn("Setting the language as the second argument is deprecated. Please use { language: 'foo' }.");
      options.language = passedOptions;
    }

    var dictionary = languages[options.language];
    if (!dictionary) {
      throw new Error("No language " + options.language + ".");
    }

    // Make sure we have a positive number.
    // Has the nice sideffect of turning Number objects into primitives.
    ms = Math.abs(ms);

    if (ms === 0)
      return "0";

    var result = [];

    // Start at the top and keep removing units, bit by bit.
    var unit, unitCount, mightBeHalfUnit;
    for (var i = 0, len = UNITS.length; i < len; i ++) {

      unit = UNITS[i];

      // If it's a half-unit interval, we're done.
      if (result.length === 0) {
        mightBeHalfUnit = (ms / unit.ms) * 2;
        if (mightBeHalfUnit === Math.floor(mightBeHalfUnit))
          return render(mightBeHalfUnit / 2, unit.name, dictionary);
      }

      // What's the number of full units we can fit?
      if (unit.name === "millisecond") {
        unitCount = ms / unit.ms;
      } else {
        unitCount = Math.floor(ms / unit.ms);
      }

      // Add the string.
      if (unitCount)
        result.push(render(unitCount, unit.name, dictionary));

      // Remove what we just figured out.
      ms -= unitCount * unit.ms;

    }

    return result.join(options.delimiter);

  }

  humanizeDuration.componentsOf = function componentsOf(total, language) {

    warn("componentsOf is deprecated and will soon be removed.");
    language = language || humanizeDuration.language || humanizeDuration.defaults.language;

    var dictionary = languages[language];
    if (!dictionary) {
      throw new Error("No language named " + language + ".");
    }

    var result = { total: {} };

    // Make sure we have positive numbers.
    // Has the nice sideffect of turning Number objects into primitives.
    total = Math.abs(total);
    var ms = total;

    var unit, unitName, unitTotal, unitCount;
    for (var i = 0, len = UNITS.length; i < len; i ++) {

      unit = UNITS[i];
      unitName = unit.name + "s";

      // What are the totals and the rest?
      if (unitName === "milliseconds") {
        unitCount = ms / unit.ms;
        unitTotal = total / unit.ms;
      } else {
        unitCount = Math.floor(ms / unit.ms);
        unitTotal = Math.floor(total / unit.ms);
      }

      // Put them in the result.
      result[unitName] = render(unitCount, unit.name, dictionary);
      result.total[unitName] = render(unitTotal, unit.name, dictionary);

      // Lower the number of milliseconds.
      ms -= unitCount * unit.ms;

    }

    return result;

  };

  humanizeDuration.addLanguage = function addLanguage(name, definition) {
    if (languages[name]) {
      throw new Error("Language " + name + " already defined. If you think" +
                      "there is an error, please submit a patch!");
    }
    languages[name] = definition;
  };

  humanizeDuration.defaults = {
    language: "en",
    delimiter: ", "
  };

  if ((typeof module !== "undefined") && (module.exports))
    module.exports = humanizeDuration;
  else
    this.humanizeDuration = humanizeDuration;

  // Internal utility function for warning on console.warn (if defined).
  function warn() {
    if (typeof console !== "undefined" && console.warn) {
      console.warn.apply(console, arguments);
    }
  }

  function render(count, word, dictionary) {
    return count + " " + dictionary[word](count);
  }

  function isString(thing) {
    return Object.prototype.toString.call(thing) === "[object String]";
  }

  function extend(destination) {
    var source;
    for (var i = 1; i < arguments.length; i ++) {
      source = arguments[i];
      for (var prop in source) {
        destination[prop] = source[prop];
      }
    }
  }

  var UNITS = [
    { name: "year", ms: 31557600000 },
    { name: "month", ms: 2629800000 },
    { name: "week", ms: 604800000 },
    { name: "day", ms: 86400000 },
    { name: "hour", ms: 3600000 },
    { name: "minute", ms: 60000 },
    { name: "second", ms: 1000 },
    { name: "millisecond", ms: 1 }
  ];

  var languages = {
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
    da: {
      year: function() { return "år"; },
      month: function(c) { return "måned" + ((c !== 1) ? "er" : ""); },
      week: function(c) { return "uge" + ((c !== 1) ? "r" : ""); },
      day: function(c) { return "dag" + ((c !== 1) ? "e" : ""); },
      hour: function(c) { return "time" + ((c !== 1) ? "r" : ""); },
      minute: function(c) { return "minut" + ((c !== 1) ? "ter" : ""); },
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
    zhCN: {
      year: function() { return "年"; },
      month: function() { return "个月"; },
      week: function() { return "周"; },
      day: function() { return "天"; },
      hour: function() { return "小时"; },
      minute: function() { return "分钟"; },
      second: function() { return "秒"; },
      millisecond: function() { return "毫秒"; }
    },
    zhTW: {
      year: function() { return "年"; },
      month: function() { return "個月"; },
      week: function() { return "周"; },
      day: function() { return "天"; },
      hour: function() { return "小時"; },
      minute: function() { return "分鐘"; },
      second: function() { return "秒"; },
      millisecond: function() { return "毫秒"; }
    },
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
    pl: {
      year: function(c) { return ["rok", "roku", "lata", "lat"][getPolishForm(c)]; },
      month: function(c) { return ["miesiąc", "miesiąca", "miesiące", "miesięcy"][getPolishForm(c)]; },
      week: function(c) { return ["tydzień", "tygodnia", "tygodnie", "tygodni"][getPolishForm(c)]; },
      day: function(c) { return ["dzień", "dnia", "dni", "dni"][getPolishForm(c)]; },
      hour: function(c) { return ["godzina", "godziny", "godziny", "godzin"][getPolishForm(c)]; },
      minute: function(c) { return ["minuta", "minuty", "minuty", "minut"][getPolishForm(c)]; },
      second: function(c) { return ["sekunda", "sekundy", "sekundy", "sekund"][getPolishForm(c)]; },
      millisecond: function(c) { return ["milisekunda", "milisekundy", "milisekundy", "milisekund"][getPolishForm(c)]; }
    },
    pt: {
      year: function(c) { return "ano" + ((c !== 1) ? "s" : ""); },
      month: function(c) { return (c !== 1) ? "meses" : "mês"; },
      week: function(c) { return "semana" + ((c !== 1) ? "s" : ""); },
      day: function(c) { return "dia" + ((c !== 1) ? "s" : ""); },
      hour: function(c) { return "hora" + ((c !== 1) ? "s" : ""); },
      minute: function(c) { return "minuto" + ((c !== 1) ? "s" : ""); },
      second: function(c) { return "segundo" + ((c !== 1) ? "s" : ""); },
      millisecond: function(c) { return "milissegundo" + ((c !== 1) ? "s" : ""); }
    },
    ru: {
      year: function(c) { return ["лет", "год", "года"][getRussianForm(c)]; },
      month: function(c) { return ["месяцев", "месяц", "месяца"][getRussianForm(c)]; },
      week: function(c) { return ["недель", "неделя", "недели"][getRussianForm(c)]; },
      day: function(c) { return ["дней", "день", "дня"][getRussianForm(c)]; },
      hour: function(c) { return ["часов", "час", "часа"][getRussianForm(c)]; },
      minute: function(c) { return ["минут", "минута", "минуты"][getRussianForm(c)]; },
      second: function(c) { return ["секунд", "секунда", "секунды"][getRussianForm(c)]; },
      millisecond: function(c) { return ["миллисекунд", "миллисекунда", "миллисекунды"][getRussianForm(c)]; }
    }
  };

  // Internal helper function for Polish language.
  function getPolishForm(c) {
    if (c === 1) {
      return 0;
    } else if (Math.floor(c) !== c) {
      return 1;
    } else if (2 <= c % 10 && c % 10 <= 4 && !(10 < c % 100 && c % 100 < 20)) {
      return 2;
    } else {
      return 3;
    }
  }

    // Internal helper function for Russian language.
    function getRussianForm(c) {
        if (Math.floor(c) !== c) {
            return 2;
        } else if (c === 0 || (c >= 5 && c <= 20) || (c % 10 >= 5 && c % 10 <= 9) || (c % 10 === 0) ) {
            return 0;
        } else if (c === 1 || c % 10 === 1) {
            return 1;
        } else if (c > 1) {
            return 2;
        } else {
            return 0;
        }
    }

})();
