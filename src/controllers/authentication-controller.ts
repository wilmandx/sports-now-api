import { Router, Request, Response, NextFunction } from 'express';
import { Config } from '../app-configs';
import { attributeService } from '../services/attribute-service';
import { IAttribute } from '../interfaces/attribute';
import * as jwt from 'jsonwebtoken'; 

export class AuthenticationController {
    
    public getRouter(router: Router): Router {
        router.post("/", this.login);
        return router;
    }
    
    public async login(req: Request, res: Response, next: NextFunction) {
        // usually this would be a database call:
        //var user = users[_.findIndex(users, { name: name })];
        //if (!user) {
        //    res.status(401).json({ message: "no such user found" });
        //}
        let user = {id: 777, username: 'test', password: '123'};

        if (user.password === req.body.password) {
            // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
            let payload = { id: user.id };
            let token = jwt.sign(payload, Config.jwt.secretOrKey);
            res.json({ message: "ok", token: token });
        } else {
            res.status(401).json({ message: "passwords did not match" });
        }
    }
}

export const authenticationController = new AuthenticationController();