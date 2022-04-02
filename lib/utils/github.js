const fetch = require('cross-fetch');

const exchangeCodeForToken = async (code) => {
  const response = await fetch('https://github.com/login/oauth/access_token', {
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
  });
  console.log(response, 'anfalkdfnladndj');
  const { access_token } = await response.json();
  return access_token;
};

const getGithubProfile = async (token) => {
  const profile = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `token ${token}`,
    },
  });
  console.log(profile);
  return await profile.json;
};

module.exports = { exchangeCodeForToken, getGithubProfile };
