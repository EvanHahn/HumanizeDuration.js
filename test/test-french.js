"use strict";

var chai = require("chai");
var humanizing = require("../humanize-duration");
require("sugar");

chai.should();

describe("French humanization of duration", function() {

	beforeEach(function() {
		humanizing.language = "en";
	});

	it("humanizes 0ms", function() {
		humanizing(0).should.equal("0");
	});

	it("humanizes French when passed as an argument", function() {
		humanizing((1).second(), "fr").should.equal("1 seconde");
		humanizing((2).seconds(), "fr").should.equal("2 secondes");
		humanizing((5).years(), "fr").should.equal("5 ans");
	});

	it("humanizes French when the default language is changed", function() {
		humanizing.language = "fr";
		humanizing((1).second()).should.equal("1 seconde");
		humanizing((2).seconds()).should.equal("2 secondes");
		humanizing((5).years()).should.equal("5 ans");
	});

});
