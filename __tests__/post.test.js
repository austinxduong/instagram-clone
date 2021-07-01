import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

const agent = request.agent(app);

describe('instagram clone routes', () => {
  beforeAll (async () => {
    await setup(pool);
    await agent
      .post('/api/v1/auth/signup')
      .send({
        email: 'test@test.com',
        password: 'test',
        profilePhotoUrl: 'randomPhotoUrl'
      });
  });

  it('creates an instagram post, via .POST', async () => {
    const res = await agent
      .post('/api/v1/posts')
      .send({
        userId: '1',
        photoUrl: 'test',
        caption: 'selfie',
        tag: ['happy', 'beautiful', 'smart']
      });
    expect(res.body).toEqual({
      id: '1',
      userId: '1',
      photoUrl: 'test',
      caption: 'selfie',
      tag: ['happy', 'beautiful', 'smart']
    });
  }); 
});
