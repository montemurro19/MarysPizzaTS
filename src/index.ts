import express, { Express, NextFunction, Request, Response } from 'express';
import * as http from 'http';
import { RouteConfig } from './Util/Config/route.config';
import { IUser } from './User/Entities/user.model';
import { ItemRoute } from './Item/item.route';
import { UserRoute } from './User/user.route';
import { AddressRoute } from './Address/address.route';
import { OrderRoute } from './Order/order.route';
import { errorMongoose, errorResponse } from './Util/Middlewares/error';
import logs from './Util/Middlewares/logs';
import boot from './Util/boot';
import db from './Util/Config/db';

const app: Express = express();
const routes: Array<RouteConfig> = [];
const requestTimeout = 5000;

declare global {
    namespace Express {
        interface Request {
            user: IUser;
        }
    }
}

app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
    logs.info('server', `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    if (!db.isConnected()) {
        setTimeout(() => {
            if (!db.isConnected()) {
                const errorMessage = 'request timeout';
                const error = new Error(errorMessage);
                return next(error);
            }

            next();
        }, requestTimeout);
    }

    return next();
});

routes.push(new ItemRoute(app));
routes.push(new UserRoute(app));
routes.push(new AddressRoute(app));
routes.push(new OrderRoute(app));

app.use(errorResponse);
//app.use(errorMongoose);

const server: http.Server = http.createServer(app);

boot(server);
