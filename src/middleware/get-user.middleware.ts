import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";

import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../constants';

@Injectable()
export class GetUserMiddleware implements NestMiddleware {

    use(req: Request, res: Response, next: () => void) {

        const authJwtToken = req.headers.authorization;

        // if it's unauthorized access just pass it through and deal with it in the guard
        // as this middleware is only focused on getting User data
        if (!authJwtToken) {
            next();
            return;
        }

        try {
            const user = jwt.verify(authJwtToken, JWT_SECRET);

            if (user) {
                console.log("Found user details in JWT: ", user);
                req["user"] = user;
            }
        }
        catch (err) {
            console.log("Error handling authentication JWT: ", err);
        }

        next();
    }

}