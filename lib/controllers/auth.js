const { Router } = require('express');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate');
const { findByUsername } = require('../models/User');
const User = require('../models/User');
const { exchangeCodeForToken, getGitHubProfile } = require('../utils/github');
