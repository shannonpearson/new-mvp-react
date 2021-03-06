const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database-mysql/schema.js');

const app = express();

app.use(express.static(`${__dirname}/../react-client/dist`));
app.use(bodyParser.json());


// app.get('/books/find', function(req, res) {
// 	const searchQuery = req.body.query.split(' ').join('+');
// 	const url = 'http://openlibrary.org/search.json?q=' + searchQuery;
// 	axios.get(url)
// 		.catch((error) => {
// 			console.log('search error', error);
// 		})
// 		.then((response) => {
// 			const docs = response.data.docs.slice(0, 4);
// 			const books = [];
// 			docs.forEach((obj) => {
// 				const bookObj = {
// 					isbn: obj.isbn ? obj.isbn[0] : null,
// 					title: obj.title_suggest || obj.title || null,
// 					author: obj.author_name ? obj.author_name[0] : null,
// 					year: obj.publish_year ? Math.min(obj.publish_year) : null,
// 					cover: obj.cover_i || null,
// 					key: obj.key || null,
// 				};
// 				books.push(bookObj);
// 			})
// 			res.send(books);
// 		})
// });

// calls db method to add book to db
app.post('/books/save', (req, res) => {
  db.save(req.body.book, () => { 
    res.sendStatus(201);
  });
});

app.get('/books/shelf', (req, res) => {
  db.getAllBooks((response) => {
    const items = JSON.parse(JSON.stringify(response));
    const books = {
      favorites: [],
      interested: [],
      myshelf: [],
    };
    items.forEach((book) => {
      books[book.shelf].push(book);
    });
    res.send(books);
  });
});

app.listen(3000, () => {
  console.log('listening on port 3000!');
});

