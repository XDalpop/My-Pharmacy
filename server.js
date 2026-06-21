const express = require('express');
const morgan = require('morgan');
const path = require('path');
const { getDb } = require('./db');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

getDb();

app.listen(PORT, () => {
  console.log(`My-Pharmacy running on http://localhost:${PORT}`);
});
