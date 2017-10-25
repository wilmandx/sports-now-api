import { Router, Request, Response, NextFunction } from 'express';
import { Config } from '../app-configs';
let req = require('require-yml');
let swaggerUi = require('swagger-ui-express');
let swaggerDocument = req('open-api/openapi.yaml');

function getRouter(router: Router): Router {
    let port = `:${Config.server.swaggerPort}`;
    if (port === ':') {
        port = "";
    }

    swaggerDocument.host = `${Config.server.host}${port}`;
    swaggerDocument.schemes = [Config.server.scheme];
    router.use("/ui", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    return router;
}

export let swaggerRouter = getRouter(Router());