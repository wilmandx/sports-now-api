import { Timer } from "./utils/timer";

import * as express from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';

import { swaggerRouter } from './controllers/swagger-controller';
import { itemsRouter } from './controllers/items-controller';
import { attributesRouter } from './controllers/attributes-controller';

export async function createApp(): Promise<express.Express> {

    const app = express();

    app.use(morgan('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.use('/api/v1/attributes', attributesRouter);
    app.use('/api/v1/items', itemsRouter);
    app.use('/api-docs', swaggerRouter);

    return app;
}