const Github = require('../models/Github');
const { exchangeCodeForToken, getGithubProfile } = require('../utils/github');

module.exports = class UserService {
  static create(code) {

    // const token = await exchangeCodeForToken(code);
  
    // const profile = await getGithubProfile(token);
    
    // let user = await Github.findByUsername(profile.username);
    
    // if(!user) {
    //   user = await Github.insert(profile);
    // }
    // return user;
    let gitHubProfile;
    return exchangeCodeForToken(code)
      .then((token) => getGithubProfile(token))
      .then((profile) => {
        gitHubProfile = profile;
        return Github.findByUsername(profile.login);
      })
      .then((user) => 
      {
        if(!user) {
          return Github.insert(gitHubProfile);
        }
        return user;});
  }
};
