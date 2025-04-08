import request from 'supertest';
import app from '../app'
import { describe, it, expect, afterAll, beforeAll } from '@jest/globals';
import { afterAllHook, beforeAllHook, getUserToken, getCounselorToken } from './setup';

beforeAll(beforeAllHook);
afterAll(afterAllHook);

describe('Group Message Controller', () => {
  let userToken: string = '';
  let counselorToken: string = '';
  let groupId: string = '';
  let messageId: string = '';
  
  const testGroup = {
    name: 'Test Group for Messages',
  };
  
  const testMessage = {
    content: 'This is a test group message',
    groupId: ''
  };

  beforeAll(async () => {
    userToken = await getUserToken();
    counselorToken = await getCounselorToken();
    
    const groupResponse = await request(app)
      .post('/api/groups')
      .set('Authorization', `Bearer ${counselorToken}`)
      .send(testGroup);
    
    groupId = groupResponse.body.id;
    testMessage.groupId = groupId;
    
    await request(app)
      .post('/api/groups/join')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ groupId });
  });

  it('should send a group message successfully', async () => {
    const response = await request(app)
      .post('/api/messages')
      .set('Authorization', `Bearer ${userToken}`)
      .send(testMessage);
    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('content', testMessage.content);
    messageId = response.body.id;
  });

  it('should get messages for a group', async () => {
    const response = await request(app)
      .get(`/api/messages/${groupId}`)
      .set('Authorization', `Bearer ${userToken}`);
    
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
    
    const messages = response.body;
    console.log(messages)
    const sentMessage = messages.find(msg => msg.id === messageId);
    expect(sentMessage).toBeDefined();
    expect(sentMessage.content).toBe(testMessage.content);
  });

  it('should return 401 when accessing group messages without authentication', async () => {
    const response = await request(app)
      .get(`/api/messages/${groupId}`);
    
    expect(response.status).toBe(401);
  });
});