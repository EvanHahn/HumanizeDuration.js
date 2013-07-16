"use strict";

var chai = require("chai");
var humanizing = require("../humanize-duration");
require("sugar");

chai.should();

describe("English humanization of duration", function() {

	beforeEach(function() {
		humanizing.language = "en";
	});

	it("humanizes 0ms", function() {
		humanizing(0).should.equal("0");
	});

	it("humanizes 1ms", function() {
		humanizing(1).should.equal("1 millisecond");
	});

	it("humanizes multiple milliseconds", function() {
		humanizing(2).should.equal("2 milliseconds");
		humanizing(5).should.equal("5 milliseconds");
		humanizing(12).should.equal("12 milliseconds");
		humanizing(420).should.equal("420 milliseconds");
	});

	it("humanizes half-second intervals", function() {
		humanizing((0.5).seconds()).should.equal("0.5 seconds");
		humanizing((1.0).seconds()).should.equal("1 second");
		humanizing((1.5).seconds()).should.equal("1.5 seconds");
		humanizing((2.0).seconds()).should.equal("2 seconds");
		humanizing((2.5).seconds()).should.equal("2.5 seconds");
		humanizing((3.0).seconds()).should.equal("3 seconds");
	});

	it("humanizes part second, part millisecond numbers", function() {
		humanizing(1001).should.equal("1 second, 1 millisecond");
		humanizing(1002).should.equal("1 second, 2 milliseconds");
		humanizing(2001).should.equal("2 seconds, 1 millisecond");
		humanizing((1.2).seconds()).should.equal("1 second, 200 milliseconds");
		humanizing((6.9).seconds()).should.equal("6 seconds, 900 milliseconds");
	});

	it("humanizes half-minute intervals", function() {
		humanizing((0.5).minutes()).should.equal("0.5 minutes");
		humanizing((1.0).minutes()).should.equal("1 minute");
		humanizing((1.5).minutes()).should.equal("1.5 minutes");
		humanizing((2.0).minutes()).should.equal("2 minutes");
		humanizing((2.5).minutes()).should.equal("2.5 minutes");
		humanizing((3.0).minutes()).should.equal("3 minutes");
	});

	it("humanizes 1 minute, part second intervals", function() {
		humanizing((1).minute() + (1).second()).should.equal("1 minute, 1 second");
		humanizing((1).minute() + (18).seconds()).should.equal("1 minute, 18 seconds");
	});

	it("humanizes 1 minute, part second, part millisecond intervals", function() {
		humanizing((1).minute() + (1).second() + 1).should.equal("1 minute, 1 second, 1 millisecond");
		humanizing((1).minute() + (1).second() + 5).should.equal("1 minute, 1 second, 5 milliseconds");
		humanizing((1).minute() + (18).seconds() + 1).should.equal("1 minute, 18 seconds, 1 millisecond");
		humanizing((1).minute() + (18).seconds() + 12).should.equal("1 minute, 18 seconds, 12 milliseconds");
	});

	it("humanizes 2 minute, part second intervals", function() {
		humanizing((2).minutes() + (1).second()).should.equal("2 minutes, 1 second");
		humanizing((2).minutes() + (18).seconds()).should.equal("2 minutes, 18 seconds");
	});

	it("humanizes 2 minute, part second, part millisecond intervals", function() {
		humanizing((2).minutes() + (1).second() + 1).should.equal("2 minutes, 1 second, 1 millisecond");
		humanizing((2).minutes() + (1).second() + 5).should.equal("2 minutes, 1 second, 5 milliseconds");
		humanizing((2).minutes() + (18).seconds() + 1).should.equal("2 minutes, 18 seconds, 1 millisecond");
		humanizing((2).minutes() + (18).seconds() + 12).should.equal("2 minutes, 18 seconds, 12 milliseconds");
	});

	it("humanizes half-hour intervals", function() {
		humanizing((0.5).hours()).should.equal("0.5 hours");
		humanizing((1.0).hours()).should.equal("1 hour");
		humanizing((1.5).hours()).should.equal("1.5 hours");
		humanizing((2.0).hours()).should.equal("2 hours");
		humanizing((2.5).hours()).should.equal("2.5 hours");
		humanizing((3.0).hours()).should.equal("3 hours");
	});

	it("humanizes 1 hour, part minute intervals", function() {
		humanizing((1).hour() + (1).minute()).should.equal("1 hour, 1 minute");
		humanizing((1).hour() + (15).minutes()).should.equal("1 hour, 15 minutes");
		humanizing((1).hour() + (45).minutes()).should.equal("1 hour, 45 minutes");
	});

	it("humanizes 2 hour, part minute intervals", function() {
		humanizing((2).hours() + (1).minute()).should.equal("2 hours, 1 minute");
		humanizing((2).hours() + (15).minutes()).should.equal("2 hours, 15 minutes");
		humanizing((2).hours() + (45).minutes()).should.equal("2 hours, 45 minutes");
	});

	it("humanizes half-day intervals", function() {
		humanizing((0.5).days()).should.equal("0.5 days");
		humanizing((1.0).days()).should.equal("1 day");
		humanizing((1.5).days()).should.equal("1.5 days");
		humanizing((2.0).days()).should.equal("2 days");
		humanizing((2.5).days()).should.equal("2.5 days");
		humanizing((3.0).days()).should.equal("3 days");
	});

	it("humanizes half-week intervals", function() {
		humanizing((0.5).weeks()).should.equal("0.5 weeks");
		humanizing((1.0).weeks()).should.equal("1 week");
		humanizing((1.5).weeks()).should.equal("1.5 weeks");
		humanizing((2.0).weeks()).should.equal("2 weeks");
		humanizing((2.5).weeks()).should.equal("2.5 weeks");
		humanizing((3.0).weeks()).should.equal("3 weeks");
	});

	it("humanizes half-month intervals", function() {
		humanizing((0.5).months()).should.equal("0.5 months");
		humanizing((1.0).months()).should.equal("1 month");
		humanizing((1.5).months()).should.equal("1.5 months");
		humanizing((2.0).months()).should.equal("2 months");
		humanizing((2.5).months()).should.equal("2.5 months");
		humanizing((3.0).months()).should.equal("3 months");
	});

	it("humanizes half-year intervals", function() {
		humanizing((0.5).years()).should.equal("0.5 years");
		humanizing((1.0).years()).should.equal("1 year");
		humanizing((1.5).years()).should.equal("1.5 years");
		humanizing((2.0).years()).should.equal("2 years");
		humanizing((2.5).years()).should.equal("2.5 years");
		humanizing((3.0).years()).should.equal("3 years");
	});

	it("keeps Number objects intact", function() {
		var duration = new Number(2012);
		humanizing(duration);
		duration.valueOf().should.equal(2012);
	});

});
