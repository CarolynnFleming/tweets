const { Router } = require('express');
const { sign } = require('../utils/jwt');
const UserService = require('../services/UserService');
// const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate');
// const { findByUsername } = require('../models/Github');
// const User = require('../models/Github');
// const { exchangeCodeForToken, getGitHubProfile } = require('../utils/github');
const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

module.exports = Router()
  .get('/login', async (req, res, next) => {
    try{
      res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=user&redirect_uri=http://localhost:7890/api/v1/github/login/callback`);} catch (error) {
      next(error);
    }
  })

  .get('/login/callback', async (req, res, next) => {
    try{
      const user = await UserService.create(req.query.code);

      res
        .cookie(process.env.COOKIE_NAME, sign(user), {
          httpOnly: true,
          maxAge: ONE_DAY_IN_MS,
        })
        .redirect('/api/v1/tweets');
    } catch(error) {
      next(error);
    }
  })

// .get('/dashboard', authenticate, async (req, res) => {
//   // require req.user
//   // get data about user and send it as json
//   console.log(req.user, 'anfalkfnaklfnalk');
//   res.json(req.user);
// })

  .get('/verify', authenticate, (req, res) => {
    res.send(req.user);
  })

  .delete('/', async (req, res) => {
    res
      .clearCookie(process.env.COOKIE_NAME)
      .json({ success: true, message: 'Signed out successfuly!' });
  });
