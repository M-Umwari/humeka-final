import request from 'supertest';
import app from '../app'
import { describe, it, expect, afterAll, beforeAll } from '@jest/globals';
import { afterAllHook, beforeAllHook, getUserToken, getCounselorToken } from './setup';

beforeAll(beforeAllHook);
afterAll(afterAllHook);

describe('Group Controller', () => {
  let userToken: string = '';
  let counselorToken: string = '';
  let groupId: string = '';
  

  const testGroup = {
    name: 'Test Support Group'
  };

  beforeAll(async () => {
    userToken = await getUserToken();
    counselorToken = await getCounselorToken();
  });

  it('should create a group successfully', async () => {
    const response = await request(app)
      .post('/api/groups')
      .set('Authorization', `Bearer ${counselorToken}`)
      .send(testGroup);
    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('name', testGroup.name);
    
    groupId = response.body.id;
  });

  it('should not create a group when user is not a counselor', async () => {
    const response = await request(app)
      .post('/api/groups')
      .set('Authorization', `Bearer ${userToken}`)
      .send(testGroup);
    
    expect(response.status).toBe(403);
  });

  it('should get all groups', async () => {
    const response = await request(app)
      .get('/api/groups')
      .set('Authorization', `Bearer ${userToken}`);
    
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should join a group successfully', async () => {
    const response = await request(app)
      .post('/api/groups/join')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ groupId });
    
    expect(response.status).toBe(200);
  });

  it('should not join a group that does not exist', async () => {
    const response = await request(app)
      .post('/api/groups/join')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ groupId: crypto.randomUUID() });
    
    expect(response.status).toBe(404);
  });

  it('should not join a group twice', async () => {
    const response = await request(app)
      .post('/api/groups/join')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ groupId });
    
    expect(response.status).toBe(400);
  });

  it('should leave a group successfully', async () => {
    const response = await request(app)
      .post('/api/groups/leave')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ groupId });
    
    expect(response.status).toBe(200)
  });
});