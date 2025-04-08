import request from 'supertest';
import app from '../app'
import { describe, it, expect, afterAll, beforeAll } from '@jest/globals';
import { afterAllHook, beforeAllHook, getCounselorToken, getUserToken, testUser } from './setup';

beforeAll(beforeAllHook);
afterAll(afterAllHook);


describe('Validation tests', () => {
    let userToken: string;
    let counselorToken: string;

    beforeAll(async () => {
        userToken = await getUserToken()
        counselorToken = await getCounselorToken()
    })

    it('should fail to register a new user if validation fails', async () => {
        const response = await request(app)
        .post('/api/auth/signup')
        .send(
            {...testUser, email:''}
        );
        
        expect(response.status).toBe(400);
    });

    it('should fail to create a group if validation fails', async () => {
        const response = await request(app)
          .post('/api/groups')
          .set('Authorization', `Bearer ${counselorToken}`)
          .send({
            name:''
        });
    
        expect(response.status).toBe(400);
    });

    it('should fail to create a new note if validation fails', async () => {
        const response = await request(app)
          .post('/api/notes')
          .set('Authorization', `Bearer ${userToken}`)
          .send({
            note:''
          });
        
          expect(response.status).toBe(400);
      });

    it('should fail to create a default timeSlot if validation fails', async () => {
    const response = await request(app)
        .post('/api/timeslots/default')
        .set('Authorization', `Bearer ${counselorToken}`)
        .send({})
    
        expect(response.status).toBe(400);
    });
    
});