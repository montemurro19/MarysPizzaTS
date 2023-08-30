import express from 'express';
import routes from './Common/routes';
import errorResponse from './Common/Middleware/error';
import { holdRequest } from './Common/Middleware/holdRequest';

export default class Server {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
    }

    public config(): void {
        this.app.set('port', 3000);
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(holdRequest);
        routes(this.app);
        this.app.use(errorResponse);
    }

    public start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log('server started');
        });
    }
}