const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Tweet = require('../models/Tweet');

module.exports = Router()
  .get('/', authenticate, async (req, res) => {
    const tweets = await Tweet.getAll();
    res.json(tweets);
  })
  .post('/', authenticate, (req, res, next) => {
    
    Tweet.insert({
      ...req.body,
      username: req.user.id,
      
    })
      .then((tweet) => res.send(tweet))
      .catch((error) => next(error));
  });
