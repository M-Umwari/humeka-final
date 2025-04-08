import "reflect-metadata";
import express from "express";
import routes from './routes/index'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './documentation/swaggerConfig'
import cors from 'cors'

const app = express();
app.use(cors())
app.use(express.json());
app.use("/api", routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app