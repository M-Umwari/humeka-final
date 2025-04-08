import { DataSource } from "typeorm";
import dotenv from 'dotenv'
import Note from "./entities/Note";
import User from "./entities/User";
import { DefaultTimeSlot } from "./entities/DefaultTimeSlot";
import { TimeSlot } from "./entities/TimeSlot";
import Group from "./entities/Group";
import Message from "./entities/Message";
import { Appointment } from "./entities/Appointment";
import GroupSession from "./entities/GroupSession";
dotenv.config()


const nodeEnv = process.env.NODE_ENV

const env = {
    PROD:{
        host: process.env.DB_HOST as string,
        database: process.env.DB_NAME as string,
        port: process.env.DB_PORT ? parseInt(process.env.DB_PORT as string) : 5432,
        username: process.env.DB_USERNAME as string,
        password: process.env.DB_PASSWORD as string
    },
    DEV:{
        host: process.env.DB_HOST as string,
        database: process.env.DB_NAME as string,
        port: process.env.DB_PORT ? parseInt(process.env.DB_PORT as string) : 5432,
        username: process.env.DB_USERNAME as string,
        password: process.env.DB_PASSWORD as string
    },
    TEST:{
        host: process.env.TEST_DB_HOST as string,
        database: process.env.TEST_DB_NAME as string,
        port: process.env.TEST_DB_PORT ? parseInt(process.env.TEST_DB_PORT as string) : 5432,
        username: process.env.TEST_DB_USERNAME as string,
        password: process.env.TEST_DB_PASSWORD as string
    }
}

const dbConfig = env[nodeEnv] || env.TEST;
console.log("Database configuration:", dbConfig);


export const AppDataSource = new DataSource({
    type: "postgres",
    host: dbConfig.host,
    port: dbConfig.port,
    username: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database,
    synchronize: true,
    logging: nodeEnv === 'PROD',
    entities: [Note, User, DefaultTimeSlot, TimeSlot, Group, Message, Appointment, GroupSession],
    subscribers: [],
    migrations: [],
})