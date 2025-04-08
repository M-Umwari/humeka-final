import request from 'supertest';
import app from '../app'
import { describe, it, expect, afterAll, beforeAll } from '@jest/globals';
import { afterAllHook, beforeAllHook, getUserToken, testUser } from './setup';

beforeAll(beforeAllHook);
afterAll(afterAllHook);


describe('User Controller', () => {
    let token:string = ''

  it('should register a new user successfully', async () => {
    const response = await request(app)
      .post('/api/auth/signup')
      .send(testUser);
    
    expect(response.status).toBe(201);
    expect(response.body.data).toHaveProperty('email', testUser.email);
  });

  it('should not register a user with existing email', async () => {
    const response = await request(app)
      .post('/api/auth/signup')
      .send(testUser);
    
    expect(response.status).toBe(409)
  });

  it('should login successfully with correct credentials', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: testUser.email,
        password: testUser.password
      });
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('should not login with incorrect password', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: testUser.email,
        password: 'wrongpassword'
      });
    
    expect(response.status).toBe(401)
  });

  it('should change password successfully', async () => {
    token = await getUserToken()

    const changeResponse = await request(app)
      .post('/api/user/change_pass')
      .set('Authorization', `Bearer ${token}`)
      .send({
        oldPassword: testUser.password,
        newPassword: 'NewPassword456!'
      });
    
    expect(changeResponse.status).toBe(200)
    
    // Change back for other tests
    await request(app)
      .post('/api/user/change_pass')
      .set('Authorization', `Bearer ${token}`)
      .send({
        oldPassword: 'NewPassword456!',
        newPassword: testUser.password
      });
  });

  it('should not change password with incorrect old password', async () => {
    const changeResponse = await request(app)
      .post('/api/user/change_pass')
      .set('Authorization', `Bearer ${token}`)
      .send({
        oldPassword: 'WrongPassword!',
        newPassword: 'NewPassword456!'
      });
    
    expect(changeResponse.status).toBe(401)
  });

  it('should get user profile successfully', async () => {
    const profileResponse = await request(app)
      .get('/api/user/profile')
      .set('Authorization', `Bearer ${token}`); 
    
    expect(profileResponse.status).toBe(200);
    expect(profileResponse.body).toHaveProperty('email', testUser.email);
  });

  it('should edit user profile successfully', async () => {
    const profileResponse = await request(app)
      .patch('/api/user')
      .set('Authorization', `Bearer ${token}`)
      .send({
        fullName: testUser.fullName,
        email:testUser.email,
        profileImg:'http://testImg.png'
      }) 
    
    expect(profileResponse.status).toBe(200);
    expect(profileResponse.body).toHaveProperty('profileImg', 'http://testImg.png');
  });
});