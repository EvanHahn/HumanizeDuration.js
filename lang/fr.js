// humanizeDuration.js language configuration
// language : French (fr)
// author : Martin Garcia : https://github.com/magarcia

;(function(global, undefined) {
    global.humanizeDuration.lang("fr", {
        year: function (c) { return "an" + ((c !== 1) ? 's' :'');},
        month: function (c) { return "mois";},
        week: function (c) { return "semaine" + ((c !== 1) ? 's' :'');},
        day: function (c) { return "jour" + ((c !== 1) ? 's' :'');},
        hour: function (c) { return "heure" + ((c !== 1) ? 's' :'');},
        minute: function (c) { return "minute" + ((c !== 1) ? 's' :'');},
        second: function (c) { return "seconde" + ((c !== 1) ? 's' :'');},
        millisecond: function (c) { return "milliseconde" + ((c !== 1) ? 's' :'');},
    });
})(this);