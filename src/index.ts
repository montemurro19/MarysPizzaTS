import express, { Express } from 'express';
import * as http from 'http';
import { RouteConfig } from './Common/route.config';
import { IUser } from './User/Entities/user.model';
import { ItemRoute } from './Item/item.route';
import mongoose from 'mongoose';
import config from './Common/config';
import { UserRoute } from './User/user.route';
import { AddressRoute } from './Address/address.route';
import errorhandle from './Common/error';
import { OrderRoute } from './Order/order.route';

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
routes.push(new ItemRoute(app));
routes.push(new UserRoute(app));
routes.push(new AddressRoute(app));
routes.push(new OrderRoute(app));

const server: http.Server = http.createServer(app);

mongoose
    .connect(config.mongo.url)
    .then(() => {
        console.log('MongoDB is connectred!');
        server.listen(3000, () => {
            console.log(`server is runnig!`);
        });
    })
    .catch(() => {
        console.log('deu ruim!');
    });
