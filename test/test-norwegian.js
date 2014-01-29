var humanizing = require("../humanize-duration");
require("chai").should();

describe("Norwegian humanization of duration", function() {

	"use strict";

	beforeEach(function() {
		humanizing.language = "nob";
	});

	it("humanizes 0ms", function() {
		humanizing(0).should.equal("0");
	});

	it("humanizes 1ms", function() {
		humanizing(1).should.equal("1 millisekund");
	});

	it("humanizes multiple milliseconds", function() {
		humanizing(2).should.equal("2 millisekunder");
		humanizing(5).should.equal("5 millisekunder");
		humanizing(12).should.equal("12 millisekunder");
		humanizing(420).should.equal("420 millisekunder");
	});

	it("humanizes half-second intervals", function() {
		humanizing((0.5).seconds()).should.equal("0.5 sekunder");
		humanizing((1.0).seconds()).should.equal("1 sekund");
		humanizing((1.5).seconds()).should.equal("1.5 sekunder");
		humanizing((2.0).seconds()).should.equal("2 sekunder");
		humanizing((2.5).seconds()).should.equal("2.5 sekunder");
		humanizing((3.0).seconds()).should.equal("3 sekunder");
	});

	it("humanizes part second, part millisecond numbers", function() {
		humanizing(1001).should.equal("1 sekund, 1 millisekund");
		humanizing(1002).should.equal("1 sekund, 2 millisekunder");
		humanizing(2001).should.equal("2 sekunder, 1 millisekund");
		humanizing((1.2).seconds()).should.equal("1 sekund, 200 millisekunder");
		humanizing((6.9).seconds()).should.equal("6 sekunder, 900 millisekunder");
	});

	it("humanizes half-minute intervals", function() {
		humanizing((0.5).minutes()).should.equal("0.5 minutter");
		humanizing((1.0).minutes()).should.equal("1 minutt");
		humanizing((1.5).minutes()).should.equal("1.5 minutter");
		humanizing((2.0).minutes()).should.equal("2 minutter");
		humanizing((2.5).minutes()).should.equal("2.5 minutter");
		humanizing((3.0).minutes()).should.equal("3 minutter");
	});

	it("humanizes 1 minute, part second intervals", function() {
		humanizing((1).minute() + (1).second()).should.equal("1 minutt, 1 sekund");
		humanizing((1).minute() + (18).seconds()).should.equal("1 minutt, 18 sekunder");
	});

	it("humanizes 1 minute, part second, part millisecond intervals", function() {
		humanizing((1).minute() + (1).second() + 1).should.equal("1 minutt, 1 sekund, 1 millisekund");
		humanizing((1).minute() + (1).second() + 5).should.equal("1 minutt, 1 sekund, 5 millisekunder");
		humanizing((1).minute() + (18).seconds() + 1).should.equal("1 minutt, 18 sekunder, 1 millisekund");
		humanizing((1).minute() + (18).seconds() + 12).should.equal("1 minutt, 18 sekunder, 12 millisekunder");
	});

	it("humanizes 2 minute, part second intervals", function() {
		humanizing((2).minutes() + (1).second()).should.equal("2 minutter, 1 sekund");
		humanizing((2).minutes() + (18).seconds()).should.equal("2 minutter, 18 sekunder");
	});

	it("humanizes 2 minute, part second, part millisecond intervals", function() {
		humanizing((2).minutes() + (1).second() + 1).should.equal("2 minutter, 1 sekund, 1 millisekund");
		humanizing((2).minutes() + (1).second() + 5).should.equal("2 minutter, 1 sekund, 5 millisekunder");
		humanizing((2).minutes() + (18).seconds() + 1).should.equal("2 minutter, 18 sekunder, 1 millisekund");
		humanizing((2).minutes() + (18).seconds() + 12).should.equal("2 minutter, 18 sekunder, 12 millisekunder");
	});

	it("humanizes half-hour intervals", function() {
		humanizing((0.5).hours()).should.equal("0.5 timer");
		humanizing((1.0).hours()).should.equal("1 time");
		humanizing((1.5).hours()).should.equal("1.5 timer");
		humanizing((2.0).hours()).should.equal("2 timer");
		humanizing((2.5).hours()).should.equal("2.5 timer");
		humanizing((3.0).hours()).should.equal("3 timer");
	});

	it("humanizes 1 hour, part minute intervals", function() {
		humanizing((1).hour() + (1).minute()).should.equal("1 time, 1 minutt");
		humanizing((1).hour() + (15).minutes()).should.equal("1 time, 15 minutter");
		humanizing((1).hour() + (45).minutes()).should.equal("1 time, 45 minutter");
	});

	it("humanizes 2 hour, part minute intervals", function() {
		humanizing((2).hours() + (1).minute()).should.equal("2 timer, 1 minutt");
		humanizing((2).hours() + (15).minutes()).should.equal("2 timer, 15 minutter");
		humanizing((2).hours() + (45).minutes()).should.equal("2 timer, 45 minutter");
	});

	it("humanizes half-day intervals", function() {
		humanizing((0.5).days()).should.equal("0.5 dager");
		humanizing((1.0).days()).should.equal("1 dag");
		humanizing((1.5).days()).should.equal("1.5 dager");
		humanizing((2.0).days()).should.equal("2 dager");
		humanizing((2.5).days()).should.equal("2.5 dager");
		humanizing((3.0).days()).should.equal("3 dager");
	});

	it("humanizes half-week intervals", function() {
		humanizing((0.5).weeks()).should.equal("0.5 uker");
		humanizing((1.0).weeks()).should.equal("1 uke");
		humanizing((1.5).weeks()).should.equal("1.5 uker");
		humanizing((2.0).weeks()).should.equal("2 uker");
		humanizing((2.5).weeks()).should.equal("2.5 uker");
		humanizing((3.0).weeks()).should.equal("3 uker");
	});

	it("humanizes half-month intervals", function() {
		humanizing((0.5).months()).should.equal("0.5 måneder");
		humanizing((1.0).months()).should.equal("1 måned");
		humanizing((1.5).months()).should.equal("1.5 måneder");
		humanizing((2.0).months()).should.equal("2 måneder");
		humanizing((2.5).months()).should.equal("2.5 måneder");
		humanizing((3.0).months()).should.equal("3 måneder");
	});

	it("humanizes half-year intervals", function() {
		humanizing((0.5).years()).should.equal("0.5 år");
		humanizing((1.0).years()).should.equal("1 år");
		humanizing((1.5).years()).should.equal("1.5 år");
		humanizing((2.0).years()).should.equal("2 år");
		humanizing((2.5).years()).should.equal("2.5 år");
		humanizing((3.0).years()).should.equal("3 år");
	});

});
