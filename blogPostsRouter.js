const express 		= require('express');
const router 		= express.Router();

const bodyParser 	= require('body-parser');
const jsonParser 	= bodyParser.json();

const {BlogPosts}  	= require('./models');


router.get('/', (req, res) => {
  res.json(BlogPosts.get());
}); //router.get


router.post('/', jsonParser, (req, res) => {
	const requiredFields = [
		'title', 
		'content', 
		'author', 
		'publishDate'
	]; //const requiredFields

	for (let i=0; i<requiredFields.legth; i++) {
		const field = requiredFields[i];
		if (!(field in req.body)) {
			const message = `Missing \`${field}\` in request body`
			console.error(message);
			return res.status(400).send(message);
		} //if (!(field in req.body))
	} //for (let i=0)

	const post = BlogPosts.create(
		req.body.title, 
		req.body.content, 
		req.body.author, 
		req.body.publishDate
	) //const post

	res.status(201).json(post);
}); //router.post


// DELETE blog post by id
router.delete('/:id', (req, res) => {
	BlogPosts.delete(req.params.id);
	console.log(`Deleted blog post \`${req.params.id}\``);
	res.status(204).end();
}); //router.delete


// PUT blog post by id
router.put('/:id', jsonParser, (req, res) => {
	const requiredFields = [
		'title', 
		'content', 
		'author', 
		'publishDate',
		'id'
	]; //const requiredFields

	for (let i=0; i<requiredFields.legth; i++) {
		const field = requiredFields[i];
		if (!(field in req.body)) {
			const message = `Missing \`${field}\` in request body`
			console.error(message);
			return res.status(400).send(message);
		} //if (!(field in req.body))
	} //for (let i=0)

	if (req.params.id !== req.body.id) {
		const message = (
			`Request path id `(${req.params.id})` and request body id 
			`(${req.body.id})` must match`
		); //const message

		console.error(message);
		return res.status(400).send(message);
	} //if (req.params.id !== req.body.id)

	console.log(`Updating blog post \`${req.params.id}\``);
	const updatedBlog = BlogPosts.update({
		id: req.params.id,
		title: req.body.title,
		content: req.body.content,
		author: req.body.author,
		publishDate: req.body.publishDate
	}); //const updatedBlog 

	res.status(204).json(updatedBlog);
}); //router.put

module.exports = router;



