/* global demoContainer, msInput, languageInput, resultInput */

const humanizeDuration = require("humanize-duration");
const sample = require("./lib/sample");
const hljs = require("highlight.js");

// Let them play in the console
window.humanizeDuration = humanizeDuration;

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
    option.innerText = code;
    languageOptions.appendChild(option);
  });
  languageInput.appendChild(languageOptions);

  msInput.value = state.ms;
  languageInput.value = state.language;

  demoContainer.removeAttribute("hidden");

  hljs.initHighlightingOnLoad();

  render();
}

function render() {
  resultInput.value = humanizeDuration(state.ms, { language: state.language });
}
