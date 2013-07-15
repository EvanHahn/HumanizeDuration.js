// humanizeDuration.js language configuration
// language : Catalan (ca)
// author : Martin Garcia : https://github.com/magarcia

;(function(global, undefined) {
    global.humanizeDuration.lang("ca", {
        year: function (c) { return "any" + ((c !== 1) ? 's' :'');},
        month: function (c) { return "mes" + ((c !== 1) ? 'os' :'');},
        week: function (c) { return "setman" + ((c !== 1) ? 'es' :'a');},
        day: function (c) { return "di" + ((c !== 1) ? 'es' :'a');},
        hour: function (c) { return "hor" + ((c !== 1) ? 'es' :'a');},
        minute: function (c) { return "minut" + ((c !== 1) ? 's' :'');},
        second: function (c) { return "segon" + ((c !== 1) ? 's' :'');},
        millisecond: function (c) { return "milisegon" + ((c !== 1) ? 's' :'');},
    });
})(this);