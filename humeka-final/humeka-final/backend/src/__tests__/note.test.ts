import request from 'supertest';
import app from '../app'
import { describe, it, expect, afterAll, beforeAll } from '@jest/globals';
import { afterAllHook, beforeAllHook, getUserToken } from './setup';

beforeAll(beforeAllHook);
afterAll(afterAllHook);

describe('Note Controller', () => {
  let token: string = '';
  let noteId: string = '';
  
  const testNote = {
    note: 'This is a test note content'
  };
  
  const updatedNote = {
    note: 'This is updated test note content'
  };

  beforeAll(async () => {
    token = await getUserToken();
  })

  it('should create a new note successfully', async () => {
    const response = await request(app)
      .post('/api/notes')
      .set('Authorization', `Bearer ${token}`)
      .send(testNote);
    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('note', testNote.note);
    
    noteId = response.body.id;
  });

  it('should get all notes', async () => {
    const response = await request(app)
      .get('/api/notes')
      .set('Authorization', `Bearer ${token}`);
    
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should update a note successfully using PATCH', async () => {
    const response = await request(app)
      .patch(`/api/notes/${noteId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updatedNote);
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('note', updatedNote.note);
  })

  it('should delete a note successfully', async () => {
    const response = await request(app)
      .delete(`/api/notes/${noteId}`)
      .set('Authorization', `Bearer ${token}`);
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Note deleted successfully');
  });

  it('should return 404 when getting a deleted note', async () => {
    const response = await request(app)
      .get(`/api/notes/${noteId}`)
      .set('Authorization', `Bearer ${token}`);
    
    expect(response.status).toBe(404)
  });

  it('should not create a note without note content', async () => {
    const invalidNote = {
      note: ''
    };
    
    const response = await request(app)
      .post('/api/notes')
      .set('Authorization', `Bearer ${token}`)
      .send(invalidNote);
    
    expect(response.status).toBe(400);
  });

  it('should return 401 when accessing notes without authentication', async () => {
    const response = await request(app)
      .get('/api/notes');
    
    expect(response.status).toBe(401)
  })
})