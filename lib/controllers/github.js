const { Router } = require('express');
// const jwt = require('jsonwebtoken');
// const authenticate = require('../middleware/authenticate');
// const { findByUsername } = require('../models/Github');
// const User = require('../models/Github');
// const { exchangeCodeForToken, getGitHubProfile } = require('../utils/github');

module.exports = Router()
  .get('/login', async (req, res, next) => {
    try{
      res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=user&redirect_uri=http://localhost:7890/api/v1/github/login/callback`);} catch (error) {
      next(error);
    }
  });
