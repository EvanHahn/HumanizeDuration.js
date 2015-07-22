// HumanizeDuration.js - http://git.io/j0HgmQ

(function(global) {
  var UNITS = {
    y: 31557600000,
    mo: 2629800000,
    w: 604800000,
    d: 86400000,
    h: 3600000,
    m: 60000,
    s: 1000,
    ms: 1
  };

  var languages = {
    ar: {
      y: function(c) { return ((c === 1) ? "سنة" : "سنوات"); },
      mo: function(c) { return ((c === 1) ? "شهر" : "أشهر"); },
      w: function(c) { return ((c === 1) ? "أسبوع" : "أسابيع"); },
      d: function(c) { return ((c === 1) ? "يوم" : "أيام"); },
      h: function(c) { return ((c === 1) ? "ساعة" : "ساعات"); },
      m: function(c) { return ((c === 1) ? "دقيقة" : "دقائق"); },
      s: function(c) { return ((c === 1) ? "ثانية" : "ثواني"); },
      ms: function(c) { return ((c === 1) ? "جزء من الثانية" : "أجزاء من الثانية"); },
      decimal: ","
    },
    ca: {
      y: function(c) { return "any" + ((c !== 1) ? "s" : ""); },
      mo: function(c) { return "mes" + ((c !== 1) ? "os" : ""); },
      w: function(c) { return "setman" + ((c !== 1) ? "es" : "a"); },
      d: function(c) { return "di" + ((c !== 1) ? "es" : "a"); },
      h: function(c) { return "hor" + ((c !== 1) ? "es" : "a"); },
      m: function(c) { return "minut" + ((c !== 1) ? "s" : ""); },
      s: function(c) { return "segon" + ((c !== 1) ? "s" : ""); },
      ms: function(c) { return "milisegon" + ((c !== 1) ? "s" : "" ); },
      decimal: ","
    },
    da: {
      y: "år",
      mo: function(c) { return "måned" + ((c !== 1) ? "er" : ""); },
      w: function(c) { return "uge" + ((c !== 1) ? "r" : ""); },
      d: function(c) { return "dag" + ((c !== 1) ? "e" : ""); },
      h: function(c) { return "time" + ((c !== 1) ? "r" : ""); },
      m: function(c) { return "minut" + ((c !== 1) ? "ter" : ""); },
      s: function(c) { return "sekund" + ((c !== 1) ? "er" : ""); },
      ms: function(c) { return "millisekund" + ((c !== 1) ? "er" : ""); },
      decimal: ","
    },
    de: {
      y: function(c) { return "Jahr" + ((c !== 1) ? "e" : ""); },
      mo: function(c) { return "Monat" + ((c !== 1) ? "e" : ""); },
      w: function(c) { return "Woche" + ((c !== 1) ? "n" : ""); },
      d: function(c) { return "Tag" + ((c !== 1) ? "e" : ""); },
      h: function(c) { return "Stunde" + ((c !== 1) ? "n" : ""); },
      m: function(c) { return "Minute" + ((c !== 1) ? "n" : ""); },
      s: function(c) { return "Sekunde" + ((c !== 1) ? "n" : ""); },
      ms: function(c) { return "Millisekunde" + ((c !== 1) ? "n" : ""); },
      decimal: ","
    },
    en: {
      y: function(c) { return "year" + ((c !== 1) ? "s" : ""); },
      mo: function(c) { return "month" + ((c !== 1) ? "s" : ""); },
      w: function(c) { return "week" + ((c !== 1) ? "s" : ""); },
      d: function(c) { return "day" + ((c !== 1) ? "s" : ""); },
      h: function(c) { return "hour" + ((c !== 1) ? "s" : ""); },
      m: function(c) { return "minute" + ((c !== 1) ? "s" : ""); },
      s: function(c) { return "second" + ((c !== 1) ? "s" : ""); },
      ms: function(c) { return "millisecond" + ((c !== 1) ? "s" : ""); },
      decimal: "."
    },
    es: {
      y: function(c) { return "año" + ((c !== 1) ? "s" : ""); },
      mo: function(c) { return "mes" + ((c !== 1) ? "es" : ""); },
      w: function(c) { return "semana" + ((c !== 1) ? "s" : ""); },
      d: function(c) { return "día" + ((c !== 1) ? "s" : ""); },
      h: function(c) { return "hora" + ((c !== 1) ? "s" : ""); },
      m: function(c) { return "minuto" + ((c !== 1) ? "s" : ""); },
      s: function(c) { return "segundo" + ((c !== 1) ? "s" : ""); },
      ms: function(c) { return "milisegundo" + ((c !== 1) ? "s" : "" ); },
      decimal: ","
    },
    fr: {
      y: function(c) { return "an" + ((c !== 1) ? "s" : ""); },
      mo: "mois",
      w: function(c) { return "semaine" + ((c !== 1) ? "s" : ""); },
      d: function(c) { return "jour" + ((c !== 1) ? "s" : ""); },
      h: function(c) { return "heure" + ((c !== 1) ? "s" : ""); },
      m: function(c) { return "minute" + ((c !== 1) ? "s" : ""); },
      s: function(c) { return "seconde" + ((c !== 1) ? "s" : ""); },
      ms: function(c) { return "milliseconde" + ((c !== 1) ? "s" : ""); },
      decimal: ","
    },
    gr: {
      y: function(c) { return ((c === 1) ? "χρόνος" : "χρόνια"); },
      mo: function(c) { return ((c === 1) ? "μήνας" : "μήνες"); },
      w: function(c) { return ((c === 1) ? "εβδομάδα" : "εβδομάδες"); },
      d: function(c) { return ((c === 1) ? "μέρα" : "μέρες"); },
      h: function(c) { return ((c === 1) ? "ώρα" : "ώρες"); },
      m: function(c) { return ((c === 1) ? "λεπτό" : "λεπτά"); },
      s: function(c) { return ((c === 1) ? "δευτερόλεπτο" : "δευτερόλεπτα"); },
      ms: function(c) { return ((c === 1) ? "χιλιοστό του δευτερολέπτου" : "χιλιοστά του δευτερολέπτου"); },
      decimal: ","
    },
    hu: {
      y: "év",
      mo: "hónap",
      w: "hét",
      d: "nap",
      h: "óra",
      m: "perc",
      s: "másodperc",
      ms: "ezredmásodperc",
      decimal: ","
    },
    it: {
      y: function(c) { return "ann" + ((c !== 1) ? "i" : "o"); },
      mo: function(c) { return "mes" + ((c !== 1) ? "i" : "e"); },
      w: function(c) { return "settiman" + ((c !== 1) ? "e" : "a"); },
      d: function(c) { return "giorn" + ((c !== 1) ? "i" : "o"); },
      h: function(c) { return "or" + ((c !== 1) ? "e" : "a"); },
      m: function(c) { return "minut" + ((c !== 1) ? "i" : "o"); },
      s: function(c) { return "second" + ((c !== 1) ? "i" : "o"); },
      ms: function(c) { return "millisecond" + ((c !== 1) ? "i" : "o" ); },
      decimal: ","
    },
    ja: {
      y: "年",
      mo: "月",
      w: "週",
      d: "日",
      h: "時間",
      m: "分",
      s: "秒",
      ms: "ミリ秒",
      decimal: "."
    },
    ko: {
      y: "년",
      mo: "개월",
      w: "주일",
      d: "일",
      h: "시간",
      m: "분",
      s: "초",
      ms: "밀리 초",
      decimal: "."
    },
    nl: {
      y: "jaar",
      mo: function(c) { return (c === 1) ? "maand" : "maanden"; },
      w: function(c) { return (c === 1) ? "week" : "weken"; },
      d: function(c) { return (c === 1) ? "dag" : "dagen"; },
      h: "uur",
      m: function(c) { return (c === 1) ? "minuut" : "minuten"; },
      s: function(c) { return (c === 1) ? "seconde" : "seconden"; },
      ms: function(c) { return (c === 1) ? "milliseconde" : "milliseconden"; },
      decimal: ","
    },
    no: {
      y: "år",
      mo: function(c) { return "måned" + ((c !== 1) ? "er" : ""); },
      w: function(c) { return "uke" + ((c !== 1) ? "r" : ""); },
      d: function(c) { return "dag" + ((c !== 1) ? "er" : ""); },
      h: function(c) { return "time" + ((c !== 1) ? "r" : ""); },
      m: function(c) { return "minutt" + ((c !== 1) ? "er" : ""); },
      s: function(c) { return "sekund" + ((c !== 1) ? "er" : ""); },
      ms: function(c) { return "millisekund" + ((c !== 1) ? "er" : ""); },
      decimal: ","
    },
    pl: {
      y: function(c) { return ["rok", "roku", "lata", "lat"][getPolishForm(c)]; },
      mo: function(c) { return ["miesiąc", "miesiąca", "miesiące", "miesięcy"][getPolishForm(c)]; },
      w: function(c) { return ["tydzień", "tygodnia", "tygodnie", "tygodni"][getPolishForm(c)]; },
      d: function(c) { return ["dzień", "dnia", "dni", "dni"][getPolishForm(c)]; },
      h: function(c) { return ["godzina", "godziny", "godziny", "godzin"][getPolishForm(c)]; },
      m: function(c) { return ["minuta", "minuty", "minuty", "minut"][getPolishForm(c)]; },
      s: function(c) { return ["sekunda", "sekundy", "sekundy", "sekund"][getPolishForm(c)]; },
      ms: function(c) { return ["milisekunda", "milisekundy", "milisekundy", "milisekund"][getPolishForm(c)]; },
      decimal: ","
    },
    pt: {
      y: function(c) { return "ano" + ((c !== 1) ? "s" : ""); },
      mo: function(c) { return (c !== 1) ? "meses" : "mês"; },
      w: function(c) { return "semana" + ((c !== 1) ? "s" : ""); },
      d: function(c) { return "dia" + ((c !== 1) ? "s" : ""); },
      h: function(c) { return "hora" + ((c !== 1) ? "s" : ""); },
      m: function(c) { return "minuto" + ((c !== 1) ? "s" : ""); },
      s: function(c) { return "segundo" + ((c !== 1) ? "s" : ""); },
      ms: function(c) { return "milissegundo" + ((c !== 1) ? "s" : ""); },
      decimal: ","
    },
    ru: {
      y: function(c) { return ["лет", "год", "года"][getSlavicForm(c)]; },
      mo: function(c) { return ["месяцев", "месяц", "месяца"][getSlavicForm(c)]; },
      w: function(c) { return ["недель", "неделя", "недели"][getSlavicForm(c)]; },
      d: function(c) { return ["дней", "день", "дня"][getSlavicForm(c)]; },
      h: function(c) { return ["часов", "час", "часа"][getSlavicForm(c)]; },
      m: function(c) { return ["минут", "минута", "минуты"][getSlavicForm(c)]; },
      s: function(c) { return ["секунд", "секунда", "секунды"][getSlavicForm(c)]; },
      ms: function(c) { return ["миллисекунд", "миллисекунда", "миллисекунды"][getSlavicForm(c)]; },
      decimal: ","
    },
    uk: {
      y: function(c) { return ["років", "рік", "роки"][getSlavicForm(c)]; },
      mo: function(c) { return ["місяців", "місяць", "місяці"][getSlavicForm(c)]; },
      w: function(c) { return ["неділь", "неділя", "неділі"][getSlavicForm(c)]; },
      d: function(c) { return ["днів", "день", "дні"][getSlavicForm(c)]; },
      h: function(c) { return ["годин", "година", "години"][getSlavicForm(c)]; },
      m: function(c) { return ["хвилин", "хвилина", "хвилини"][getSlavicForm(c)]; },
      s: function(c) { return ["секунд", "секунда", "секунди"][getSlavicForm(c)]; },
      ms: function(c) { return ["мілісекунд", "мілісекунда", "мілісекунди"][getSlavicForm(c)]; },
      decimal: ","
    },
    sv: {
      y: "år",
      mo: function(c) { return "månad" + ((c !== 1) ? "er" : ""); },
      w: function(c) { return "veck" + ((c !== 1) ? "or" : "a"); },
      d: function(c) { return "dag" + ((c !== 1) ? "ar" : ""); },
      h: function(c) { return "timm" + ((c !== 1) ? "ar" : "e"); },
      m: function(c) { return "minut" + ((c !== 1) ? "er" : ""); },
      s: function(c) { return "sekund" + ((c !== 1) ? "er" : ""); },
      ms: function(c) { return "millisekund" + ((c !== 1) ? "er" : ""); },
      decimal: ","
    },
    tr: {
      y: "yıl",
      mo: "ay",
      w: "hafta",
      d: "gün",
      h: "saat",
      m: "dakika",
      s: "saniye",
      ms: "milisaniye",
      decimal: ","
    },
    zh_CN: {
      y: "年",
      mo: "个月",
      w: "周",
      d: "天",
      h: "小时",
      m: "分钟",
      s: "秒",
      ms: "毫秒",
      decimal: "."
    },
    zh_TW: {
      y: "年",
      mo: "個月",
      w: "周",
      d: "天",
      h: "小時",
      m: "分鐘",
      s: "秒",
      ms: "毫秒",
      decimal: "."
    }
  };

  // You can create a humanizer, which returns a function with defaults
  // parameters.
  function humanizer(passedOptions) {
    var result = function humanizer(ms, humanizerOptions) {
      var options = extend({}, result, humanizerOptions || {});
      return doHumanization(ms, options);
    };

    return extend(result, {
      language: "en",
      delimiter: ", ",
      spacer: " ",
      units: ["y", "mo", "w", "d", "h", "m", "s"],
      languages: {},
      round: false
    }, passedOptions);
  }

  // The main function is just a wrapper around a default humanizer.
  var defaultHumanizer = humanizer({});
  function humanizeDuration() {
    return defaultHumanizer.apply(defaultHumanizer, arguments);
  }

  // doHumanization does the bulk of the work.
  function doHumanization(ms, options) {

    // Make sure we have a positive number.
    // Has the nice sideffect of turning Number objects into primitives.
    ms = Math.abs(ms);

    var dictionary = options.languages[options.language] || languages[options.language];
    if (!dictionary) {
      throw new Error("No language " + dictionary + ".");
    }

    var result = [];

    // Start at the top and keep removing units, bit by bit.
    var unitName, unitMS, unitCount;
    for (var i = 0, len = options.units.length; i < len; i++) {

      unitName = options.units[i];
      unitMS = UNITS[unitName];

      // What's the number of full units we can fit?
      if ((i + 1) === len) {
        unitCount = ms / unitMS;
        if (options.round) {
          unitCount = Math.round(unitCount);
        }
      } else {
        unitCount = Math.floor(ms / unitMS);
      }

      // Add the string.
      if (unitCount) {
        result.push(render(unitCount, unitName, dictionary, options));
      }

      // Do we have enough units?
      if (options.largest && (options.largest <= result.length)) {
        break;
      }

      // Remove what we just figured out.
      ms -= unitCount * unitMS;

    }

    if (result.length) {
      return result.join(options.delimiter);
    } else {
      return render(0, options.units[options.units.length - 1], dictionary, options);
    }

  }

  function render(count, type, dictionary, options) {
    var decimal;
    if (options.decimal === void 0) {
      decimal = dictionary.decimal;
    } else {
      decimal = options.decimal;
    }

    var countStr = count.toString().replace(".", decimal);

    var dictionaryValue = dictionary[type];
    var word;
    if (typeof dictionaryValue === "function") {
      word = dictionaryValue(count);
    } else {
      word = dictionaryValue;
    }

    return countStr + options.spacer + word;
  }

  function extend(destination) {
    var source;
    for (var i = 1; i < arguments.length; i++) {
      source = arguments[i];
      for (var prop in source) {
        if (source.hasOwnProperty(prop)) {
          destination[prop] = source[prop];
        }
      }
    }
    return destination;
  }

  // Internal helper function for Polish language.
  function getPolishForm(c) {
    if (c === 1) {
      return 0;
    } else if (Math.floor(c) !== c) {
      return 1;
    } else if (c % 10 >= 2 && c % 10 <= 4 && !(c % 100 > 10 && c % 100 < 20)) {
      return 2;
    } else {
      return 3;
    }
  }

  // Internal helper function for Russian and Ukranian languages.
  function getSlavicForm(c) {
    if (Math.floor(c) !== c) {
      return 2;
    } else if (c === 0 || (c >= 5 && c <= 20) || (c % 10 >= 5 && c % 10 <= 9) || (c % 10 === 0)) {
      return 0;
    } else if (c === 1 || c % 10 === 1) {
      return 1;
    } else if (c > 1) {
      return 2;
    } else {
      return 0;
    }
  }

  function getSupportedLanguages() {
    var result = [];
    for (var language in languages) {
      if (languages.hasOwnProperty(language)) {
        result.push(language);
      }
    }
    return result;
  }

  humanizeDuration.humanizer = humanizer;
  humanizeDuration.getSupportedLanguages = getSupportedLanguages;

  if (typeof define === "function" && define.amd) {
    define(function() {
      return humanizeDuration;
    });
  } else if (typeof module !== "undefined" && module.exports) {
    module.exports = humanizeDuration;
  } else {
    global.humanizeDuration = humanizeDuration;
  }

})(this);
