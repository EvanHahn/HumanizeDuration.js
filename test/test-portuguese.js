var humanizing = require("../humanize-duration");
require("chai").should();

describe("French humanization of duration", function() {

	"use strict";

	beforeEach(function() {
		humanizing.language = "en";
	});

	it("humanizes 0ms", function() {
		humanizing(0).should.equal("0");
	});

	it("humanizes French when passed as an argument", function() {
		humanizing((1).second(), "pt").should.equal("1 segundo");
		humanizing((2).seconds(), "pt").should.equal("2 segundos");
		humanizing((5).years(), "pt").should.equal("5 anos");
	});

	it("humanizes French when the default language is changed", function() {
		humanizing.language = "pt";
		humanizing((1).second()).should.equal("1 segundo");
		humanizing((2).seconds()).should.equal("2 segundos");
		humanizing((5).years()).should.equal("5 anos");
	});

});
