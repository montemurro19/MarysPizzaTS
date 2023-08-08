import express from 'express';
import routes from './common/routes';
import errorResponse from './common/error';
import { teste } from './common/teste';

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
        this.app.use(teste);
        routes(this.app);
        this.app.use(errorResponse);
    }

    public start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log('server started');
        });
    }
}
