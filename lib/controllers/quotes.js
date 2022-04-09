const { Router } = require('express');
const { getQuotes } = require('../models/Quote');

module.exports = Router()
  .get('/', (req, res, next) => {
    getQuotes()
      .then((quotes) => res.send(quotes))
      .catch((error) => next(error));
  });
