import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

const agent = request.agent(app);

describe('instagram clone routes', () => {
  beforeAll(() => {
    return setup(pool);
  });


  it('signs up a user via POST', async() => {
    const res = await request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'test@test.com',
        password: 'test',
        profilePhotoUrl: 'randomPhotoUrl'
      });


    expect(res.body).toEqual({
      id: '1',
      email: 'test@test.com',
      profilePhotoUrl: 'randomPhotoUrl'
    // i believe we don't pass the 'password' key/value because it gets hashed....
    // UPDATED, yes the password does get returned hashed inside the object
    });
  });

  it('login a user via POST', async() => {
    const res = await agent
      .post('/api/v1/auth/login')
      .send({
        email: 'test@test.com',
        password: 'test',
        profilePhotoUrl: 'randomPhotoUrl'
      });

    expect(res.body).toEqual({
      id: '1',
      email: 'test@test.com',
      profilePhotoUrl: 'randomPhotoUrl'
    });
  });

});

