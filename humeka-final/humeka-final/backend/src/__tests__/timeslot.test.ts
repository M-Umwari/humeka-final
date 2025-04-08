import request from 'supertest';
import app from '../app'
import { describe, it, expect, afterAll, beforeAll } from '@jest/globals';
import { afterAllHook, beforeAllHook, getUserToken, getCounselorToken } from './setup';

beforeAll(beforeAllHook);
afterAll(afterAllHook);

describe('TimeSlot Controller', () => {
  let userToken: string = '';
  let counselorToken: string = '';
  let timeSlotId: string = '';
  let defaultTimeSlotId: string = '';
  let counselorId: string = '';
  
  const testTimeSlot = {
    from: new Date().toISOString(),
    to: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    date: new Date().toISOString().split('T')[0]
  };

  const testDefaultTimeSlot = {
    from: new Date().toISOString(), 
    to: new Date(Date.now() + 60 * 60 * 1000).toISOString()
  };

  beforeAll(async () => {
    userToken = await getUserToken();
    counselorToken = await getCounselorToken();
    
    const response = await request(app)
      .get('/api/user/profile')
      .set('Authorization', `Bearer ${counselorToken}`);
    
    counselorId = response.body.id;
  });

  it('should create a timeSlot successfully when counselor', async () => {
    const response = await request(app)
      .post('/api/timeslots')
      .set('Authorization', `Bearer ${counselorToken}`)
      .send(testTimeSlot);
    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('from');
    expect(response.body).toHaveProperty('to');
    
    timeSlotId = response.body.id;
  });

  it('should not create a timeSlot when user is not a counselor', async () => {
    const response = await request(app)
      .post('/api/timeslots')
      .set('Authorization', `Bearer ${userToken}`)
      .send(testTimeSlot);
    
    expect(response.status).toBe(403);
  });

  it('should get all timeslots for a counselor', async () => {
    console.log(counselorId)
    const response = await request(app)
      .get(`/api/timeslots/counselor/${counselorId}`)
      .set('Authorization', `Bearer ${counselorToken}`);
    
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should update a timeSlot successfully', async () => {
    const updatedTimeSlot = {
      from: new Date().toISOString(),
      to: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
      date: new Date().toISOString().split('T')[0]
    };
    
    const response = await request(app)
      .patch(`/api/timeslots/${timeSlotId}`)
      .set('Authorization', `Bearer ${counselorToken}`)
      .send(updatedTimeSlot);
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('from');
    expect(response.body).toHaveProperty('to');
  });

  it('should not update a timeSlot when user is not a counselor', async () => {
    const updatedTimeSlot = {
      from: new Date().toISOString(),
      to: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
      date: new Date().toISOString().split('T')[0]
    };
    
    const response = await request(app)
      .patch(`/api/timeslots/${timeSlotId}`)
      .set('Authorization', `Bearer ${userToken}`)
      .send(updatedTimeSlot);
    
    expect(response.status).toBe(403)
  });

  it('should create a default timeSlot successfully', async () => {
    const response = await request(app)
      .post('/api/timeslots/default')
      .set('Authorization', `Bearer ${counselorToken}`)
      .send(testDefaultTimeSlot);
    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('from');
    
    defaultTimeSlotId = response.body.id;
  });

  it('should get default timeSlots successfully when counselor', async () => {
    const response = await request(app)
      .get('/api/timeslots/default')
      .set('Authorization', `Bearer ${counselorToken}`);
    
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should update a default timeSlot successfully when counselor', async () => {
    console.log(defaultTimeSlotId)
    const updatedDefaultTimeSlot = {
      from: new Date().toISOString(),
      to: new Date(Date.now() + 90 * 60 * 1000).toISOString()
    };
    
    const response = await request(app)
      .patch(`/api/timeslots/default/${defaultTimeSlotId}`)
      .set('Authorization', `Bearer ${counselorToken}`)
      .send(updatedDefaultTimeSlot);
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('from');
  });

  it('should get timeSlots for a specific date and counselor', async () => {
    const date = new Date().toISOString().split('T')[0];
    
    const response = await request(app)
      .get(`/api/timeslots/activedates/${counselorId}/${date}`)
      .set('Authorization', `Bearer ${userToken}`);
    
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should delete a timeSlot successfully', async () => {
    const response = await request(app)
      .delete(`/api/timeslots/${timeSlotId}`)
      .set('Authorization', `Bearer ${counselorToken}`);
    
    expect(response.status).toBe(204);
  });

  it('should delete a default timeSlot successfully when counselor', async () => {
    const response = await request(app)
      .delete(`/api/timeslots/default/${defaultTimeSlotId}`)
      .set('Authorization', `Bearer ${counselorToken}`);
    
    expect(response.status).toBe(204);
  });
});