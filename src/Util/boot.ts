import * as http from 'http';
import config from './config';
import logs from './Middlewares/logs';
import db from './Middlewares/db';

export default function boot(server: http.Server) {
    server.listen(config.port, () => {
        logs.info('server', 'server is connected');
    });

    db.connect();
}
