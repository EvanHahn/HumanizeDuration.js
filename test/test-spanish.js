var chai = require("chai");
var humanizing = require("../humanize-duration");
require("sugar");

chai.should();

describe("Spanish humanization of duration", function() {

	"use strict";

	beforeEach(function() {
		humanizing.language = "en";
	});

	it("humanizes 0ms", function() {
		humanizing(0).should.equal("0");
	});

	it("humanizes Spanish when passed as an argument", function() {
		humanizing((1).second(), "es").should.equal("1 segundo");
		humanizing((2).seconds(), "es").should.equal("2 segundos");
		humanizing((5).years(), "es").should.equal("5 años");
	});

	it("humanizes Spanish when the default language is changed", function() {
		humanizing.language = "es";
		humanizing((1).second()).should.equal("1 segundo");
		humanizing((2).seconds()).should.equal("2 segundos");
		humanizing((5).years()).should.equal("5 años");
	});

});
