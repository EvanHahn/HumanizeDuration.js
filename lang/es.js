// humanizeDuration.js language configuration
// language : Spanish (es)
// author : Martin Garcia : https://github.com/magarcia

;(function(global, undefined) {
    global.humanizeDuration.lang("es", {
        year: function (c) { return "año" + ((c !== 1) ? 's' :'');},
        month: function (c) { return "mes" + ((c !== 1) ? 'es' :'');},
        week: function (c) { return "semana" + ((c !== 1) ? 's' :'');},
        day: function (c) { return "día" + ((c !== 1) ? 's' :'');},
        hour: function (c) { return "hora" + ((c !== 1) ? 's' :'');},
        minute: function (c) { return "minuto" + ((c !== 1) ? 's' :'');},
        second: function (c) { return "segundo" + ((c !== 1) ? 's' :'');},
        millisecond: function (c) { return "milisegundo" + ((c !== 1) ? 's' :'');},
    });
})(this);