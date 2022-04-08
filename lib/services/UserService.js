const Github = require('../models/Github');
const { exchangeCodeForToken, getGithubProfile } = require('../utils/github');

module.exports = class UserService {
  static async create(code) {

    const token = await exchangeCodeForToken(code);
  
    const profile = await getGithubProfile(token);
    
    let user = await Github.findByUsername(profile.username);
    
    if(!user) {
      user = await Github.insert(profile);
    }
    console.log(user, 'ahhh');
    return user;
  }
};
