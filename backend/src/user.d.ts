export interface IUser {
    id:string,
    email:string,
    role: 'counselor' | 'user',
    fullName: string
    createdAt:Date,
    updatedAt: Date,
}

declare module 'express-serve-static-core' {
    interface Request {
      user?: IUser
    }
}