const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Tweet = require('../models/Tweet');

module.exports = Router()
  .get('/', authenticate, (req, res, next) => {
    return Tweet.getAll()
      .then((tweets) => res.json(tweets))
      .catch((error) => next(error));
  })
  .post('/', authenticate, (req, res, next) => {
    
    Tweet.insert({
      ...req.body,
      username: req.user.id,
      
    })
      .then((tweet) => res.send(tweet))
      .catch((error) => next(error));
  });
