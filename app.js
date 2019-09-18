const express = require('express');
const morgan = require('morgan');
const app = express();
const books = require('./books.js');
const cors = require('cors');

app.use(morgan('common'));
app.use(cors());

app.get('/books', (req, res) => {
  const {search = "", sort } = req.query;

  if(sort) {
    if(!['title', 'rank'].includes(sort)) {
      return res
        .status(400)
        .send('Sort must be one of title or rank');
    }
  }
  let results = books
    .filter(book =>
      book
        .title
        .toLowerCase()
        .includes(search.toLowerCase()
        .trim()));

  if(sort) {
    results
      .sort((a, b) => {
        return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
      })
  }
  res.json(results);
});

app.listen(8000, () => {
  console.log('Server started on http://localhost:8000');
});

