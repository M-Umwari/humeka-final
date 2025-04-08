import {server} from './server';
import { AppDataSource } from './data-source'
import dotenv from "dotenv";
import cron from 'node-cron'
import { autoCreateTimeSlots } from './helpers/autoCreateTimeSlots';
dotenv.config();


const appPort = process.env.PORT || 3000;
AppDataSource.initialize()
  .then(() => {
    server.listen(appPort, () => {
      console.log("Server started at " + appPort);
    });
    console.log("Connection to DB successful!");

    cron.schedule("*/5 * * * *", autoCreateTimeSlots)
  })
  .catch((error) => console.log(error));