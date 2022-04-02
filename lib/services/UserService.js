const Github = require('../models/Github');
const { exchangeCodeForToken, getGithubProfile } = require('../utils/github');

module.exports = class UserService {
  static async create(code) {
    console.log(code, 'asnalncaodc');
    const token = await exchangeCodeForToken(code);
    console.log(token);
    const profile = await getGithubProfile(token);
    
    let user = await Github.findByUsername(profile.username);
    console.log(user, 'user sercive user');
    if(!user) {
      user = await Github.insert(profile);
    }
    return user;
  }
};
