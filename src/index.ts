import express, { Express, NextFunction, Request, Response } from 'express';
import * as http from 'http';
import { RouteConfig } from './Util/route.config';
import { IUser } from './User/Entities/user.model';
import { ItemRoute } from './Item/item.route';
import mongoose from 'mongoose';
import config from './Util/config';
import { UserRoute } from './User/user.route';
import { AddressRoute } from './Address/address.route';
import errorhandle from './Util/Middlewares/error';
import { OrderRoute } from './Order/order.route';
import logs from './Util/Middlewares/logs';

const app: Express = express();
const routes: Array<RouteConfig> = [];

declare global {
    namespace Express {
        interface Request {
            user: IUser;
        }
    }
}

app.use(express.json());
app.use(errorhandle);
app.use((req: Request, res: Response, next: NextFunction) => {
    logs.info('SERVER', `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        logs.info('SERVER', `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    });

    next();
});

routes.push(new ItemRoute(app));
routes.push(new UserRoute(app));
routes.push(new AddressRoute(app));
routes.push(new OrderRoute(app));

const server: http.Server = http.createServer(app);

mongoose
    .connect(config.mongo)
    .then(() => {
        logs.info('DATABASE', 'MongoDB is connectred!');
        server.listen(config.port, () => {
            logs.info('SERVER', 'server is runnig!', config.port);
        });
    })
    .catch(() => {
        logs.error('DATABASE', 'deu ruim!');
    });
