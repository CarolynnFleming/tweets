const fetch = require('cross-fetch');

const exchangeCodeForToken = (code) => {
  // const response = await fetch('https://github.com/login/oauth/access_token', {
  //   method: 'POST',
  //   headers: {
  //     accept: 'application/json',
  //     'Content-type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     client_id: process.env.CLIENT_ID,
  //     client_secret: process.env.CLIENT_SECRET,
  //     code,
  //   })
  // });
  // const { access_token } = await response.json();
  // return access_token;

  return fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      code,
    })
  })
    .then((response) => response.json())
    .then(({ access_token }) => {
      return access_token;
    });
};

const getGithubProfile = (token) => {
  // const profile = await fetch('https://api.github.com/user', {
  //   headers: {
  //     Authorization: `token ${token}`,
  //   },
  // });
  
  // return await profile.json;

  return fetch('https://api.github.com/user', {
    headers: {
      Authorization: `token ${token}`,
    },
  })
    .then((profile) => {profile.json;});
};

module.exports = { exchangeCodeForToken, getGithubProfile };
