var humanizing = require("../humanize-duration");
require("chai").should();

describe("humanization of duration using a time format", function() {

	"use strict";

	beforeEach(function() {
	});

	it("humanizes to seconds", function() {
		humanizing(1000*60*60 + 1000*5, 'en', 'S').should.equal("3605 seconds");
		humanizing(1000*60*60 + 1000*5, 'en').should.equal("1 hour, 5 seconds");
	});

	it("humanizes to minutes and seconds", function() {
		humanizing(1000*60*60 + 1000*5, 'en', 'M,S').should.equal("60 minutes, 5 seconds");
		humanizing(1000*60*60*2 + 1000*5, 'en', 'M,S').should.equal("120 minutes, 5 seconds");
		humanizing(1000*60*60*1000 + 1000*5, 'en', 'M,S').should.equal("60000 minutes, 5 seconds");
	});

	it("humanizes to hours, minutes and seconds", function() {
		humanizing(1000*60*60*2 + 1000*65, 'en', 'H,M,S').should.equal("2 hours, 1 minute, 5 seconds");
		humanizing(1000*60*60*200 + 1000*65, 'en', 'H,M,S').should.equal("200 hours, 1 minute, 5 seconds");
		humanizing(1000*60*60*1000 + 1000*65, 'en', 'H,M,S').should.equal("1000 hours, 1 minute, 5 seconds");
	});

	it("humanizes to days, hours, minutes and seconds", function() {
		humanizing(1000*60*60*24*60 + 1000*60*60*2 + 1000*65, 'en', 'D,H,M,S').should.equal("60 days, 2 hours, 1 minute, 5 seconds");
		humanizing(1000*60*60*24*1000 + 1000*60*60*2 + 1000*65, 'en', 'D,H,M,S').should.equal("1000 days, 2 hours, 1 minute, 5 seconds");
	});

	it("humanizes to weeks, days, hours, minutes and seconds", function() {
		humanizing(1000*60*60*24*7*2 + 1000*60*60*24*2 + 1000*60*60*2 + 1000*65, 'en', 'W,D,H,M,S').should.equal("2 weeks, 2 days, 2 hours, 1 minute, 5 seconds");
		humanizing(1000*60*60*24*7*1000 + 1000*60*60*24*2 + 1000*60*60*2 + 1000*65, 'en', 'W,D,H,M,S').should.equal("1000 weeks, 2 days, 2 hours, 1 minute, 5 seconds");
	});

	it("humanizes to Months, weeks, days, hours, minutes and seconds", function() {
		humanizing(1000*60*60*24*30*2 + 1000*60*60*24*7*1 +1000*60*60*24*2 + 1000*60*60*2 + 1000*65, 'en', 'Mo,W,D,H,M,S').should.equal("2 months, 1 week, 1 day, 5 hours, 1 minute, 5 seconds");
		humanizing(1000*60*60*24*30*12 + 1000*60*60*24*7*2 +1000*60*60*24*2 + 1000*60*60*2 + 1000*65, 'en', 'Mo,W,D,H,M,S').should.equal("12 months, 1 week, 3 days, 20 hours, 1 minute, 5 seconds");
	});

	it("humanizes to hours and minutes", function() {
		humanizing(1000*60*60*2 + 1000*60*2 +1, 'en', 'H,M').should.equal("2 hours, 2 minutes");
		humanizing(1000*60*60*2 + 1000*60*59 +59, 'en', 'H,M').should.equal("2 hours, 59 minutes");
	});

});
