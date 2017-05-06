/* jshint esversion: 6 */

const chai      = require('chai');
const chaiHttp  = require('chai-http');
const should	= chai.should();

const {app, runServer, closeServer} = require('../server');

chai.use(chaiHttp);

describe('Blog', function() {
	before(function() {
		return runServer();
	}); //before function

	after(function() {
		return closeServer();
	}); //after function

	it('should list BlogPosts on GET', function() {
		return chai.request(app)
		.get('/')
		.then(function(res) {
			res.should.have.status(200);
			res.should.be.json;
			res.body.should.be.a('array');
			res.body.length.should.be.at.least(1);
			const requiredFields = [
				'title',
				'content',
				'author',
				'publishDate'
			]; //const requiredFields
			res.body.forEach(function(blog) {
				blog.should.be.a('object');
				blog.should.contain.keys(requiredFields);
			}); //.forEach function(blog)

		}); //.then
	}); //it(should list blog on GET)

}); //describe(Blog)