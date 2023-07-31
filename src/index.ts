import express, { Express, NextFunction, Request, Response } from 'express';
import * as http from 'http';
import { RouteConfig } from './Util/Config/route.config';
import { IUser } from './User/Entities/user.model';
import { ItemRoute } from './Item/item.route';
import { UserRoute } from './User/user.route';
import { AddressRoute } from './Address/address.route';
import { OrderRoute } from './Order/order.route';
import errorhandle from './Util/Middlewares/error';
import logs from './Util/Middlewares/logs';
import boot from './Util/boot';

const app: Express = express();
const routes: Array<RouteConfig> = [];
const requestQueue: Array<Request> = [];
let canProcessRequest = false;
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
    logs.info('SERVER', `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    if (!canProcessRequest) {
        requestQueue.push(req);
    }
    next();
});

app.use((req: Request, res: Response, next: NextFunction) => {
    const requestTimer = setTimeout(() => {
        const errorMessage = 'request timeout';
        res.status(500).json({ error: errorMessage });
        logs.error('server', errorMessage);
        req.destroy();
    }, requestTimeout);

    res.on('finish', () => {
        clearTimeout(requestTimer);
    });

    next();
});

//app.use(errorhandle);

routes.push(new ItemRoute(app));
routes.push(new UserRoute(app));
routes.push(new AddressRoute(app));
routes.push(new OrderRoute(app));

const server: http.Server = http.createServer(app);

boot(server).then(() => {
    logs.info('server', `Processing ${requestQueue.length} requests...`);
    requestQueue.length = 0;
    canProcessRequest = true;
});
