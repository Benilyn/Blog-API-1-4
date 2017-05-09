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
		.get('/blog-post')
		.then(function(res) {
			res.should.have.status(200);
			res.should.be.json;
			res.body.should.be.a('array');
			res.body.length.should.be.at.least(1);
			res.body.forEach(function(blog) {
				blog.should.be.a('object');
			}); //.forEach function(blog)
		}); //.then function
	}); //it(should list blog on GET)

	it('should add BlogPosts on POST', function() {
		const newBlogPost = {
			title: 'Testing POST',
			content: 'This is a test for new blog post',
			author: 'Lyn'
		}; //const newBlogPost
		return chai.request(app)
		.post('/blog-post')
		.send(newBlogPost)
		.then(function(res) {
			res.should.have.status(201);
			res.should.be.json;
			res.body.should.be.a('object');
			res.body.should.include.keys(
				'title',
				'content',
				'author',
				'id',
				'publishDate'
			); //res.body.should.include.keys
			res.body.id.should.not.be.null;
			res.body.should.deep.equal(Object.assign(newBlogPost, {
				id: res.body.id,
				publishDate: res.body.publishDate
			}));
		}); //.then function
	}); //it(should add BlogPosts on POST)

	it('should delete BlogPosts on DELETE', function() {
		return chai.request(app)
		.get('/blog-post')
		.then(function(res) {
			return chai.request(app)
			.delete(`/blog-post/${res.body[0].id}`);
		}) //.then function
		.then(function(res) {
		res.should.have.status(204);
		}); //.then function status(204)
}); //it(should delete BlogPosts on DELETE)

}); //describe(Blog)








