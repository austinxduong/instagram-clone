import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import UserService from '../lib/services/UserService.js';

const agent = request.agent(app);

describe('instagram clone routes', () => {
  let user;


  //   beforeEach (async () => {

  //     user = await UserService.create({
  //       email: 'test@test.com',
  //       password: 'test',
  //       profilePhotoUrl: 'randomPhotoUrl'
  //     });

  //     await setup(pool);
  //     await agent
  //       .post('/api/v1/auth/signup')
  //       .send({
  //         email: 'test@test.com',
  //         password: 'test',
  //         profilePhotoUrl: 'randomPhotoUrl'
  //       });

  //     return user;
  //   });



  //   it('creates an instagram post, via .POST', async () => {
  //     const res = await agent
  //       .post('/api/v1/posts')
  //       .send({
  //         userId: '1',
  //         photoUrl: 'test',
  //         caption: 'selfie',
  //         tags: ['happy', 'beautiful', 'smart']
  //       });
  //     expect(res.body).toEqual({
  //       id: '1',
  //       userId: '1',
  //       photoUrl: 'test',
  //       caption: 'selfie',
  //       tags: ['happy', 'beautiful', 'smart']
  //     });
  //   }); 
  // });


  beforeEach(async() => {
    await setup(pool);

    user = await UserService.create({
      email: 'test',
      password: '123',
      profilePhotoUrl: 'selfie'
    });

    //logs in user w/ cookie + token
    await agent
      .post('/api/v1/auth/login')
      .send({
        email: 'test',
        password: '123',
        profilePhotoUrl: 'selfie'
      });
  });

  test('creates an instagram post, via .POST route', async () => {
    const res = await agent
      .post('/api/v1/posts')
      .send({
        userId: '1',
        photoUrl: 'selfie',
        caption: 'just bein me',
        tags: ['happy', 'beautiful', 'intelligent']
      });

    expect(res.body).toEqual({
      id: '1',
      userId: '1',
      photoUrl: 'selfie',
      caption: 'just bein me',
      tags: ['happy', 'beautiful', 'intelligent']
    });
  });
});

