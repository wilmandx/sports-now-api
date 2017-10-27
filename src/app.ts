import { Timer } from "./utils/timer";

import * as express from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';

import * as passport from 'passport'; 
import * as passportJWT from 'passport-jwt';  

import { swaggerRouter } from './controllers/swagger-controller';
import { itemsRouter } from './controllers/items-controller';
import { attributesRouter } from './controllers/attributes-controller';
import { authenticationController } from './controllers/authentication-controller';
import { Config } from './app-configs';

export async function createApp(): Promise<express.Express> {

    const app = express();

    app.use(morgan('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    //Initialize passportStrategy
    initPassportJWT();
    app.use(passport.initialize());

    app.use('/api-auth/v1/authentication', authenticationController.getRouter());
    app.use('/api-docs', swaggerRouter);

    let baseApi = Config.server.baseApiPath;

    app.use(`/${baseApi}`, passport.authenticate('jwt', { session: false }))
        .use(`/${baseApi}/v1/attributes`, attributesRouter)
        .use(`/${baseApi}/v1/items`, itemsRouter);

    return app;
}

function initPassportJWT() {
    
        let ExtractJwt = passportJWT.ExtractJwt;
        let JwtStrategy = passportJWT.Strategy;
        let jwtOptions = {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: Config.jwt.secretOrKey
        };
        
        let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
          //console.log('payload received', jwt_payload.id);//propertiers pendant la creation du token
          //TODO: FIND THE USER usually this would be a database call:
          // var user = users[_.findIndex(users, {id: jwt_payload.id})];
          if (jwt_payload.id) {
            next(null, {id: 1, username: 'jonathanmh', password: '%2yx4'});
          } else {
            next(null, false);
          }
        });
        
        passport.use(strategy);

    }