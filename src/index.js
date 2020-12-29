/* global demoContainer, msInput, languageInput, resultInput */

const humanizeDuration = require("humanize-duration");
const sample = require("./lib/sample");

// Let them play in the console
window.humanizeDuration = humanizeDuration;

const LANGUAGES = {
  ar: "Arabic",
  bg: "Bulgarian",
  ca: "Catalan",
  zh_CN: "Chinese, simplified",
  zh_TW: "Chinese, traditional",
  hr: "Croatian",
  cs: "Czech",
  da: "Danish",
  nl: "Dutch",
  en: "English",
  et: "Estonian",
  fo: "Faroese",
  fa: "Farsi/Persian",
  fi: "Finnish",
  fr: "French",
  de: "German",
  el: "Greek",
  he: "Hebrew",
  hi: "Hindi",
  hu: "Hungarian",
  is: "Icelandic",
  id: "Indonesian",
  it: "Italian",
  ja: "Japanese",
  ko: "Korean",
  lo: "Lao",
  lv: "Latvian",
  lt: "Lithuanian",
  ms: "Malay",
  no: "Norwegian",
  pl: "Polish",
  pt: "Portuguese",
  ro: "Romanian",
  ru: "Russian",
  sk: "Slovak",
  sl: "Slovenian",
  es: "Spanish",
  sw: "Swahili",
  sv: "Swedish",
  th: "Thai",
  tr: "Turkish",
  uk: "Ukrainian",
  ur: "Urdu",
  vi: "Vietnamese",
};

const state = {
  ms: 1209600000 + 345600000 + 288000 + 150000,
  language: sample(humanizeDuration.getSupportedLanguages()),
};

{
  function updateState() {
    const ms = Number(msInput.value);
    if (!isNaN(ms)) {
      state.ms = ms;
    }
    state.language = languageInput.value;
    render();
  }

  demoContainer.addEventListener("input", updateState);
  demoContainer.addEventListener("change", updateState);
}

{
  const languageOptions = document.createDocumentFragment();
  humanizeDuration.getSupportedLanguages().forEach((code) => {
    const option = document.createElement("option");
    option.value = code;
    option.innerText = Object.prototype.hasOwnProperty.call(LANGUAGES, code)
      ? `${LANGUAGES[code]} (${code})`
      : code;
    languageOptions.appendChild(option);
  });
  languageInput.appendChild(languageOptions);

  msInput.value = state.ms;
  languageInput.value = state.language;

  render();

  demoContainer.removeAttribute("hidden");
}

function render() {
  resultInput.value = humanizeDuration(state.ms, { language: state.language });
}
