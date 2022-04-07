const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Tweet = require('../models/Tweet');

module.exports = Router()

  .post('/tweets', authenticate, (req, res, next) => {
    Tweet.insert({
      ...req.body,
      username: req.github.username,
    })
      .then((tweet) => res.send(tweet))
      .catch((error) => next(error));
  });
