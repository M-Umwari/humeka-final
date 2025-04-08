import { AppDataSource } from "../data-source";
import request from 'supertest'
import app from '../app'


export const beforeAllHook = async() => {
    await AppDataSource.initialize();
    await AppDataSource.synchronize(true);
    console.log('DB Connected...')
}

export const afterAllHook = async() => {
   await AppDataSource.destroy()
   console.log('DB Disconnected...')
}

export const testUser = {
    fullName: 'Test User',
    email: 'testuser@gmail.com',
    password: 'bdiufgbdfoo4554'
}

export const testCounselor = {
    fullName: 'Test Counselor',
    email: 'testcounselor@gmail.com',
    password: 'bdiufgbdfoo4554'
}

export const getUserToken = async() => {
    await request(app).post('/api/auth/signup').send(testUser);
    const loginResponse = await request(app).post('/api/auth/login').send({
        email: testUser.email, 
        password: testUser.password
    });
    return loginResponse.body.token;
}

export const getCounselorToken = async() => {
    await request(app).post('/api/auth/signup').send(testCounselor);
    const loginResponse = await request(app).post('/api/auth/login').send({
        email: testCounselor.email, 
        password: testCounselor.password
    });
    const profileResponse = await request(app).get('/api/user/profile')
    .set('Authorization', `Bearer ${loginResponse.body.token}`)
    await request(app).patch(`/api/user/change_role/${profileResponse.body.id}`)
    .set('Authorization', `Bearer ${loginResponse.body.token}`)
    .send({role:'counselor'})
    const counselorLoginResponse = await request(app).post('/api/auth/login').send({
        email: testCounselor.email, 
        password: testCounselor.password
    });
    return counselorLoginResponse.body.token
}