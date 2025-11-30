const humanizeDuration = require("..");
const humanizer = humanizeDuration.humanizer;
const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const ms = require("ms");

describe("humanizer", function () {
  it("humanizes English when passed no arguments", function () {
    const h = humanizer();

    assert.strictEqual(h(1000), "1 second");
  });

  it("humanizes English when passed an empty object", function () {
    const h = humanizer({});

    assert.strictEqual(h(1000), "1 second");
  });

  it("can change the delimiter", function () {
    const h = humanizer({ delimiter: "+" });

    assert.strictEqual(h(0), "0 seconds");
    assert.strictEqual(h(1000), "1 second");
    assert.strictEqual(h(363000), "6 minutes+3 seconds");
  });

  it("can change the spacer", function () {
    const h = humanizer({ spacer: " whole " });

    assert.strictEqual(h(0), "0 whole seconds");
    assert.strictEqual(h(1000), "1 whole second");
    assert.strictEqual(h(260040000), "3 whole days, 14 whole minutes");
  });

  it("can use a conjunction", function () {
    const h = humanizer({ conjunction: " and " });

    assert.strictEqual(h(0), "0 seconds");
    assert.strictEqual(h(1000), "1 second");
    assert.strictEqual(h(260040000), "3 days and 14 minutes");
    assert.strictEqual(h(10874000), "3 hours, 1 minute, and 14 seconds");
  });

  it("can use a conjunction without a serial comma", function () {
    const h = humanizer({
      conjunction: " & ",
      serialComma: false,
    });

    assert.strictEqual(h(1000), "1 second");
    assert.strictEqual(h(260040000), "3 days & 14 minutes");
    assert.strictEqual(h(10874000), "3 hours, 1 minute & 14 seconds");
  });

  it("can change the units", function () {
    const h = humanizer({ units: ["d"] });

    assert.strictEqual(h(0), "0 days");
    assert.strictEqual(h(ms("6h")), "0.25 days");
    assert.strictEqual(h(ms("7d")), "7 days");
  });

  it("can overwrite the unit measures in the initializer", function () {
    const h = humanizer({
      unitMeasures: {
        y: 10512000000,
        mo: 864000000,
        w: 144000000,
        d: 28800000,
        h: 3600000,
        m: 60000,
        s: 1000,
        ms: 1,
      },
    });

    assert.strictEqual(h(1000), "1 second");
    assert.strictEqual(h(3600000), "1 hour");
    assert.strictEqual(h(28800000), "1 day");
    assert.strictEqual(h(144000000), "1 week");
  });

  it("can change the decimal", function () {
    const h = humanizer({
      units: ["s"],
      decimal: "what",
    });

    assert.strictEqual(h(1234), "1what234 seconds");
    assert.strictEqual(
      h(1234, {
        decimal: "!!",
      }),
      "1!!234 seconds"
    );
  });

  it("can do simple rounding", function () {
    const h = humanizer({ round: true });

    assert.strictEqual(h(0), "0 seconds");
    assert.strictEqual(h(499), "0 seconds");
    assert.strictEqual(h(500), "1 second");
    assert.strictEqual(h(1000), "1 second");
    assert.strictEqual(h(1499), "1 second");
    assert.strictEqual(h(1500), "2 seconds");
    assert.strictEqual(h(1500), "2 seconds");
    assert.strictEqual(h(121499), "2 minutes, 1 second");
    assert.strictEqual(h(121500), "2 minutes, 2 seconds");
  });

  it('can do rounding with the "units" option', function () {
    const h = humanizer({ round: true });

    assert.strictEqual(
      h(86364000, { units: ["y", "mo", "w", "d", "h"] }),
      "1 day"
    );
    assert.strictEqual(
      h(1209564000, { units: ["y", "mo", "w", "d", "h"] }),
      "2 weeks"
    );
    assert.strictEqual(h(3692131200000, { units: ["y", "mo"] }), "117 years");
    assert.strictEqual(
      h(3692131200001, { units: ["y", "mo", "w", "d", "h", "m"] }),
      "116 years, 11 months, 4 weeks, 1 day, 4 hours, 30 minutes"
    );
  });

  it('can do rounding with the "largest" option', function () {
    const h = humanizer({ round: true });

    assert.strictEqual(h(3692131200000, { largest: 1 }), "117 years");
    assert.strictEqual(h(3692131200000, { largest: 2 }), "117 years");
    assert.strictEqual(
      h(3692131200001, { largest: 100 }),
      "116 years, 11 months, 4 weeks, 1 day, 4 hours, 30 minutes"
    );
    assert.strictEqual(h(2838550, { largest: 3 }), "47 minutes, 19 seconds");
  });

  it('can do rounding with the "maxDecimalPoints" option', function () {
    var h = humanizer({ maxDecimalPoints: 2 });

    assert.strictEqual(h(8123.456789), "8.12 seconds");
    h.maxDecimalPoints = 3;
    assert.strictEqual(h(8123.456789), "8.123 seconds");
    assert.strictEqual(h(8000), "8 seconds");

    h.maxDecimalPoints = 6;
    assert.strictEqual(h(8123.45), "8.12345 seconds");

    h.maxDecimalPoints = 6;
    assert.strictEqual(h(8000), "8 seconds");

    h.maxDecimalPoints = 0;
    assert.strictEqual(h(7123.456), "7 seconds");
    h.maxDecimalPoints = 2;
    assert.strictEqual(h(7999), "7.99 seconds");
    h.maxDecimalPoints = 3;
    assert.strictEqual(h(7999), "7.999 seconds");
  });

  it("can ask for the largest units", function () {
    const h = humanizer({ largest: 2 });

    assert.strictEqual(h(0), "0 seconds");
    assert.strictEqual(h(1000), "1 second");
    assert.strictEqual(h(2000), "2 seconds");
    assert.strictEqual(h(540360012), "6 days, 6 hours");
    assert.strictEqual(
      h(540360012, { largest: 3 }),
      "6 days, 6 hours, 6 minutes"
    );
    assert.strictEqual(
      h(540360012, { largest: 100 }),
      "6 days, 6 hours, 6 minutes, 0.012 seconds"
    );
  });

  it("has properties which can be modified", function () {
    const h = humanizer();

    assert.strictEqual(h(363000), "6 minutes, 3 seconds");

    h.delimiter = "+";
    assert.strictEqual(h(363000), "6 minutes+3 seconds");

    h.language = "es";
    assert.strictEqual(h(363000), "6 minutos+3 segundos");

    h.units = ["m"];
    assert.strictEqual(h(363000), "6,05 minutos");
  });

  it("is a named function", function () {
    assert.strictEqual(humanizer().name, "humanizer");
  });

  it("can add a new language", function () {
    const h = humanizer({ language: "cool language" });
    h.languages["cool language"] = {
      y: () => "y",
      mo: () => "mo",
      w: () => "w",
      d: () => "d",
      h: () => "h",
      m: () => "m",
      s: () => "s",
      ms: () => "ms",
      delimiter: "--",
    };

    assert.strictEqual(h(1000), "1 s");
    assert.strictEqual(h(61000), "1 m--1 s");

    assert.strictEqual(h(61000, { delimiter: "&&" }), "1 m&&1 s");

    assert.strictEqual(
      h(1000, {
        language: "es",
      }),
      "1 segundo"
    );

    const anotherH = humanizer({
      language: "cool language",
    });
    assert.throws(() => {
      anotherH(1000);
    }, Error);
  });

  it("can overwrite an existing language", function () {
    const h = humanizer({ language: "en" });

    assert.strictEqual(h(1000), "1 second");

    h.languages.en = {
      y: () => "y",
      mo: () => "mo",
      w: () => "w",
      d: () => "d",
      h: () => "h",
      m: () => "m",
      s: () => "s",
      ms: () => "ms",
    };

    assert.strictEqual(h(1000), "1 s");
    assert.strictEqual(h(15600000), "4 h, 20 m");

    const anotherH = humanizer({ language: "en" });

    assert.strictEqual(anotherH(1000), "1 second");
  });

  it("can overwrite the languages property in the initializer", function () {
    const h = humanizer({
      languages: {
        en: {
          y: () => "y",
          mo: () => "mo",
          w: () => "w",
          d: () => "d",
          h: () => "h",
          m: () => "m",
          s: () => "s",
          ms: () => "ms",
          decimal: "!",
        },
      },
    });

    assert.strictEqual(h(1000), "1 s");
    assert.strictEqual(h(15600000), "4 h, 20 m");
    assert.strictEqual(h(1000, { language: "es" }), "1 segundo");
    assert.strictEqual(h(71750), "1 m, 11!75 s");
  });

  it('uses "." as a fallback for a missing decimal', function () {
    const h = humanizer({
      languages: {
        en: {
          y: () => "y",
          mo: () => "mo",
          w: () => "w",
          d: () => "d",
          h: () => "h",
          m: () => "m",
          s: () => "s",
          ms: () => "ms",
        },
      },
    });

    assert.strictEqual(h(71750), "1 m, 11.75 s");
    assert.strictEqual(h(71750, { decimal: "!" }), "1 m, 11!75 s");
  });

  it("accepts fallback languages", function () {
    const h = humanizer();

    assert.strictEqual(
      h(10000, { language: "es", fallbacks: ["en"] }),
      "10 segundos"
    );
    assert.strictEqual(
      h(10000, { language: "BAD", fallbacks: ["BAD", "es"] }),
      "10 segundos"
    );
    assert.strictEqual(
      h(10000, { language: "BAD", fallbacks: ["es", "fr"] }),
      "10 segundos"
    );
  });

  it("can replace digits", function () {
    const h = humanizer({
      digitReplacements: [
        "Zero",
        "One",
        "Two",
        "Three",
        "UNUSED",
        "UNUSED",
        "UNUSED",
        "UNUSED",
        "UNUSED",
        "UNUSED",
      ],
    });
    assert.strictEqual(h(123), "Zero.OneTwoThree seconds");
  });

  it("handles Romanian plural forms with 'de' correctly", function () {
    const h = humanizer({ language: "ro" });

    // Test "de" plural for days (using units: ["d"] to prevent conversion to weeks)
    assert.strictEqual(
      h(19 * 86400000, { units: ["d"] }),
      "19 zile",
      "19 days without 'de'"
    );
    assert.strictEqual(
      h(20 * 86400000, { units: ["d"] }),
      "20 de zile",
      "20 days with 'de'"
    );
    assert.strictEqual(
      h(100 * 86400000, { units: ["d"] }),
      "100 de zile",
      "100 days with 'de'"
    );
    assert.strictEqual(
      h(101 * 86400000, { units: ["d"] }),
      "101 zile",
      "101 days without 'de' (ends in 01)"
    );
    assert.strictEqual(
      h(119 * 86400000, { units: ["d"] }),
      "119 zile",
      "119 days without 'de' (ends in 19)"
    );
    assert.strictEqual(
      h(120 * 86400000, { units: ["d"] }),
      "120 de zile",
      "120 days with 'de' (ends in 20)"
    );

    // Test "de" plural for weeks (using units: ["w"] to prevent conversion to months)
    assert.strictEqual(
      h(19 * 604800000, { units: ["w"] }),
      "19 săptămâni",
      "19 weeks without 'de'"
    );
    assert.strictEqual(
      h(20 * 604800000, { units: ["w"] }),
      "20 de săptămâni",
      "20 weeks with 'de'"
    );
    assert.strictEqual(
      h(100 * 604800000, { units: ["w"] }),
      "100 de săptămâni",
      "100 weeks with 'de'"
    );

    // Test "de" plural for months (using units: ["mo"] to prevent conversion to years)
    assert.strictEqual(
      h(19 * 2629800000, { units: ["mo"] }),
      "19 luni",
      "19 months without 'de'"
    );
    assert.strictEqual(
      h(20 * 2629800000, { units: ["mo"] }),
      "20 de luni",
      "20 months with 'de'"
    );
    assert.strictEqual(
      h(100 * 2629800000, { units: ["mo"] }),
      "100 de luni",
      "100 months with 'de'"
    );
    assert.strictEqual(
      h(112 * 2629800000, { units: ["mo"] }),
      "112 luni",
      "112 months without 'de' (ends in 12)"
    );
  });
});
