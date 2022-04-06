const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('../lib/utils/github');

describe('github-oauth routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should redirect to the github oauth page upon login', async () => {
    const req = await request(app).get('/api/v1/github/login');

    expect(req.header.location).toMatch(
      /https:\/\/github.com\/login\/oauth\/authorize\?client_id=[\w\d]+&scope=user&redirect_uri=http:\/\/localhost:7890\/api\/v1\/github\/login\/callback/i
    );
  });

  it('should login and redirect users to /api/v1/github/dashboard', async () => {
    const req = await request
      .agent(app)
      .get('/api/v1/github/login/callback?code=42')
      .redirects(1);

    expect(req.body).toEqual({
      username: 'fake_github_user',
      email: 'not-real@example.com',
      photo:expect.any(String),
      iat: expect.any(Number),
      exp: expect.any(Number),
    });
  });

  it('should remove a users cookie upon sign out', async () => {
    const agent = request.agent(app);

    await agent.get('/api/v1/github/login/callback?code=42').redirects(1);

    const res = await agent.delete('/api/v1/github');

    expect(res.body).toEqual({
      success: true,
      message: 'Signed out successfuly!',
    });
    expect.addSnapshotSerializer(res.status).toEqual(200);
  });
});
