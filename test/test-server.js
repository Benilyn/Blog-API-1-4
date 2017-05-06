/* jshint esversion: 6 */

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

const {app, runServer, closeServer} = require('../server');

chai.use(chaiHttp);

describe('Blog', function() {
	before(function() {
		return runServer;
	}); //before function

	after(function() {
		return closeServer;
	}); //after function
		
}); //describe(Blog)